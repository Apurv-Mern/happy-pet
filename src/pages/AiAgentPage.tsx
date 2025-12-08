import { useState, useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  chatApi,
  type ChatMessage as ApiChatMessage,
  type FileRecommendation,
} from '@/api/chat'
import { useChatRealtime } from '@/hooks/useChatRealtime'
import { useTranslation } from '@/contexts/I18nContext'
import { ChatMessagesContainer, ChatInputArea } from '@/components/ai-agent'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isVoice?: boolean
  audioUrl?: string
  videoUrl?: string
  status?: 'pending' | 'ready' | 'failed'
}

type ChatType = 'audio' | 'video' | 'chat'

export default function AIAgentPage() {
  const { language } = useTranslation()

  // Session and message state
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  // UI state
  const [selectedChatType, setSelectedChatType] = useState<ChatType>('chat')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [recommendations, setRecommendations] = useState<FileRecommendation[]>(
    []
  )

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  // Convert API message to UI message format
  const convertApiMessageToMessage = async (
    apiMessage: ApiChatMessage
  ): Promise<Message> => {
    const audioVariant = apiMessage.variants?.find(
      v => v.type === 'audio' && v.status === 'ready'
    )
    const videoVariant = apiMessage.variants?.find(
      v => v.type === 'video' && v.status === 'ready'
    )
    const textVariant = apiMessage.variants?.find(v => v.type === 'text')

    // Fetch presigned URL for video if available
    let videoUrl: string | undefined
    if (videoVariant?.mediaId) {
      try {
        videoUrl = await chatApi.getPresignedUrl(videoVariant.mediaId)
      } catch (error) {
        console.error('Failed to fetch video presigned URL:', error)
      }
    }

    return {
      id: apiMessage._id,
      type: apiMessage.senderType === 'user' ? 'user' : 'ai',
      content: textVariant?.text || apiMessage.text || '',
      timestamp: new Date(apiMessage.createdAt),
      isVoice: !!audioVariant,
      audioUrl: audioVariant?.mediaId,
      videoUrl: videoUrl,
      status: audioVariant?.status || videoVariant?.status,
    }
  }

  // WebSocket connection for real-time updates
  const { emitTyping } = useChatRealtime({
    sessionId,
    onNewMessage: async (message: ApiChatMessage) => {
      // Add new message from WebSocket
      const convertedMessage = await convertApiMessageToMessage(message)
      setMessages(prev => [...prev, convertedMessage])
      scrollToBottom()
    },
    onMessageUpdate: async (message: ApiChatMessage) => {
      // Update existing message (e.g., when media is ready)
      const convertedMessage = await convertApiMessageToMessage(message)
      setMessages(prev =>
        prev.map(msg => (msg.id === message._id ? convertedMessage : msg))
      )
    },
    onAssetUpdate: data => {
      // Update message when audio/video is generated
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id === data.messageId) {
            return {
              ...msg,
              status: data.asset.status,
              audioUrl:
                data.asset.type === 'audio' && data.asset.url
                  ? data.asset.url
                  : msg.audioUrl,
              videoUrl:
                data.asset.type === 'video' && data.asset.url
                  ? data.asset.url
                  : msg.videoUrl,
            }
          }
          return msg
        })
      )
    },
  })

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth', // or 'auto'
      })
    }
  }

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        setIsLoadingSession(true)

        // Try to get existing sessions
        const sessionsResponse = await chatApi.getSessions({
          page: 1,
          limit: 1,
          status: 'active',
        })

        if (sessionsResponse.sessions.length > 0) {
          // Use existing session
          const existingSession = sessionsResponse.sessions[0]
          setSessionId(existingSession._id)
          localStorage.setItem('ai_agent_session_id', existingSession._id)

          // Load message history
          setIsLoadingMessages(true)
          try {
            const messagesResponse = await chatApi.getMessages(
              existingSession._id,
              { page: 1, limit: 50 }
            )

            console.log('Messages response:', messagesResponse)

            // Convert API messages to UI messages
            const convertedMessages: Message[] = []
            for (const msg of messagesResponse.messages) {
              // Add user message
              convertedMessages.push({
                id: `${msg._id}-user`,
                type: 'user',
                content: msg.user,
                timestamp: new Date(msg.timestamp),
                isVoice: msg.reqType === 'audio',
                audioUrl:
                  msg.resType === 'audio' && msg.reqAudioUrl
                    ? msg.reqAudioUrl
                    : undefined,
              })
              // Add assistant message
              convertedMessages.push({
                id: `${msg._id}-assistant`,
                type: 'ai',
                content: msg.assistant,
                timestamp: new Date(msg.timestamp),
                isVoice: msg.resType === 'audio',
                audioUrl: msg.resType === 'audio' ? msg.audioUrl : undefined,
              })
            }

            console.log('Converted messages:', convertedMessages)
            setMessages(convertedMessages)
          } catch (error) {
            console.error('Failed to load messages:', error)
          } finally {
            setIsLoadingMessages(false)
          }
        } else {
          // Create new session
          const newSession = await chatApi.createSession('AI Agent Chat')
          setSessionId(newSession._id)
          localStorage.setItem('ai_agent_session_id', newSession._id)
        }
      } catch (error) {
        console.error('Failed to initialize session:', error)
      } finally {
        setIsLoadingSession(false)
      }
    }

    initializeSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll page to center and chat to bottom on mount
  useEffect(() => {
    // Only scroll when session is loaded and we're not currently loading messages
    if (!isLoadingSession && !isLoadingMessages) {
      // Scroll browser window to center the page
      const scrollToPageCenter = () => {
        const pageHeight = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight
        const centerPosition = (pageHeight - windowHeight) / 2
        window.scrollTo({
          top: centerPosition,
          behavior: 'smooth',
        })
      }

      // Small delay to ensure layout is rendered
      const timer = setTimeout(() => {
        scrollToPageCenter()
        // Scroll chat to bottom with instant behavior for initial load
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight
        }
      }, 300)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSession, isLoadingMessages])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Warn user before closing tab if there are messages
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (messages.length > 0) {
        e.preventDefault()
        e.returnValue =
          'Your chat history will be cleared if you leave this page. Are you sure?'

        // Delete session when page reloads
        if (sessionId) {
          // Use sendBeacon for reliable cleanup during page unload
          navigator.sendBeacon(
            `${import.meta.env.VITE_API_BASE_URL || 'https://happypet-backend.24livehost.com/api'}/v1/chat/sessions/${sessionId}`,
            JSON.stringify({ _method: 'DELETE' })
          )
        }

        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [messages, sessionId])

  // Auto-start recording when Audio Chat is selected
  useEffect(() => {
    if (
      selectedChatType === 'audio' &&
      !isRecording &&
      !audioBlob &&
      !isSendingMessage
    ) {
      startRecording()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatType])

  // Auto-play audio responses
  useEffect(() => {
    if (selectedChatType === 'audio') {
      // Find the last AI message with audio that's ready
      const lastAiMessage = messages
        .slice()
        .reverse()
        .find(
          msg => msg.type === 'ai' && msg.audioUrl && msg.status === 'ready'
        )

      if (
        lastAiMessage &&
        lastAiMessage.audioUrl &&
        isPlayingAudio !== lastAiMessage.id
      ) {
        // Auto-play the audio
        if (audioRef.current) {
          audioRef.current.src = lastAiMessage.audioUrl
          audioRef.current
            .play()
            .catch(err => console.log('Auto-play failed:', err))
          setIsPlayingAudio(lastAiMessage.id)
        }
      }
    }
  }, [messages, selectedChatType, isPlayingAudio])

  // Handle sending text message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || isSendingMessage) return

    const userMessageText = inputMessage.trim()
    setInputMessage('')
    setIsSendingMessage(true)

    // Add optimistic user message
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      type: 'user',
      content: userMessageText,
      timestamp: new Date(),
    }

    // Add AI thinking message
    const thinkingMessage: Message = {
      id: `thinking-${Date.now()}`,
      type: 'ai',
      content: 'AI is thinking...',
      timestamp: new Date(),
      status: 'pending',
    }

    setMessages(prev => [...prev, tempUserMessage, thinkingMessage])
    setShowSkeleton(false)

    // Switch to skeleton after 2 seconds
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true)
    }, 2000)

    // Emit typing indicator
    emitTyping(false)

    try {
      // Use new assistant API for text messages only
      if (selectedChatType === 'chat') {
        const response = await chatApi.sendAssistantMessage({
          query: userMessageText,
          reqType: 'text',
          resType: 'text',
          reqLang: language,
          resLang: language,
          isStream: false,
          sessionId: sessionId,
        })

        // Create user message with permanent ID
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          type: 'user',
          content: userMessageText,
          timestamp: new Date(),
        }

        // Create AI response message from new API
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: response.msg,
          timestamp: new Date(),
        }

        // Clear skeleton timer and reset
        clearTimeout(skeletonTimer)
        setShowSkeleton(false)

        // Replace temp and thinking messages with permanent messages
        setMessages(prev => {
          const filtered = prev.filter(
            msg =>
              msg.id !== tempUserMessage.id && msg.id !== thinkingMessage.id
          )
          return [...filtered, userMessage, aiMessage]
        })

        // Update recommendations if available
        if (response.recommend && response.recommend.length > 0) {
          setRecommendations(response.recommend)
        }
      } else {
        // Keep old API for audio/video
        const requestedFormat =
          selectedChatType === 'audio'
            ? 'audio'
            : selectedChatType === 'video'
              ? 'video'
              : 'text'
        const responseFormat: 'text' | 'audio' | 'video' =
          selectedChatType === 'video'
            ? 'video'
            : selectedChatType === 'audio'
              ? 'audio'
              : 'text'

        const response = await chatApi.sendTextMessage(sessionId, {
          text: userMessageText,
          requestedFormat,
          responseFormat,
          language,
        })

        // Remove temp message and add real messages
        const newMessages: Message[] = []
        if (response.userMessage) {
          newMessages.push(
            await convertApiMessageToMessage(response.userMessage)
          )
        }
        if (response.assistantMessage) {
          newMessages.push(
            await convertApiMessageToMessage(response.assistantMessage)
          )
        }

        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== tempUserMessage.id)
          return [...filtered, ...newMessages]
        })

        // Update recommendations if available
        if (response.recommendations && response.recommendations.length > 0) {
          setRecommendations(response.recommendations)
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      // Remove temp message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id))
    } finally {
      setIsSendingMessage(false)
    }
  }

  // Handle audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      emitTyping(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      emitTyping(false)
    }
  }

  // Send voice message
  const sendVoiceMessage = async () => {
    if (!audioBlob || !sessionId || isSendingMessage) return

    setIsSendingMessage(true)
    const tempId = `temp-${Date.now()}`

    // Add optimistic message
    const audioUrl = URL.createObjectURL(audioBlob)
    const tempMessage: Message = {
      id: tempId,
      type: 'user',
      content: 'Voice message...',
      timestamp: new Date(),
      isVoice: true,
      audioUrl,
      status: 'pending',
    }

    // Add AI thinking message
    const thinkingMessage: Message = {
      id: `thinking-${Date.now()}`,
      type: 'ai',
      content: 'AI is thinking...',
      timestamp: new Date(),
      status: 'pending',
    }

    setMessages(prev => [...prev, tempMessage, thinkingMessage])
    setShowSkeleton(false)

    // Switch to skeleton after 2 seconds
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true)
    }, 2000)

    try {
      // Convert Blob to File
      const audioFile = new File([audioBlob], 'recording.webm', {
        type: 'audio/webm',
      })

      // Use new audio API for audio chat
      if (selectedChatType === 'audio') {
        const response = await chatApi.sendAssistantAudio({
          audio: audioFile,
          reqType: 'audio',
          resType: 'audio',
          reqLang: language,
          resLang: language,
          isStream: false,
          sessionId: sessionId,
        })

        // Create user message
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          type: 'user',
          content: 'Voice message',
          timestamp: new Date(),
          isVoice: true,
          audioUrl,
        }

        // Create AI response message
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: response.msg,
          timestamp: new Date(),
          isVoice: true,
          audioUrl: response.audioUrl,
        }

        // Clear skeleton timer and reset
        clearTimeout(skeletonTimer)
        setShowSkeleton(false)

        // Replace temp and thinking messages with real messages
        setMessages(prev => {
          const filtered = prev.filter(
            msg => msg.id !== tempId && msg.id !== thinkingMessage.id
          )
          return [...filtered, userMessage, aiMessage]
        })

        // Update recommendations if available
        if (response.recommend && response.recommend.length > 0) {
          setRecommendations(response.recommend)
        }
      } else {
        // Use old API for video and text with audio input
        const requestedFormat = selectedChatType === 'video' ? 'video' : 'text'
        const responseFormat: 'text' | 'audio' | 'video' =
          selectedChatType === 'video' ? 'video' : 'text'

        const response = await chatApi.sendAudioMessage(sessionId, audioFile, {
          requestedFormat,
          responseFormat,
          language,
        })

        // Replace temp message with real messages
        const newMessages: Message[] = []
        if (response.userMessage) {
          newMessages.push(
            await convertApiMessageToMessage(response.userMessage)
          )
        }
        if (response.assistantMessage) {
          newMessages.push(
            await convertApiMessageToMessage(response.assistantMessage)
          )
        }

        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== tempId)
          return [...filtered, ...newMessages]
        })

        // Update recommendations if available
        if (response.recommendations && response.recommendations.length > 0) {
          setRecommendations(response.recommendations)
        }
      }

      setAudioBlob(null)
    } catch (error) {
      console.error('Failed to send voice message:', error)
      setMessages(prev => prev.filter(msg => msg.id !== tempId))
    } finally {
      setIsSendingMessage(false)
    }
  }

  const deleteVoiceMessage = () => {
    setAudioBlob(null)
    emitTyping(false)
  }

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelectChatType = (type: ChatType) => {
    setSelectedChatType(type)
    setIsDropdownOpen(false)
  }

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
    if (e.target.value.trim()) {
      emitTyping(true)
    } else {
      emitTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Function to delete current session (called on logout)
  const deleteCurrentSession = async () => {
    if (sessionId) {
      try {
        await chatApi.deleteSession(sessionId)
        localStorage.removeItem('ai_agent_session_id')
        console.log('Session deleted successfully')
      } catch (error) {
        console.error('Failed to delete session:', error)
      }
    }
  }

  // Expose deleteCurrentSession globally for logout handler
  useEffect(() => {
    // Store function reference in window for access from Header
    ;(window as any).deleteAiAgentSession = deleteCurrentSession

    return () => {
      // Cleanup on unmount
      delete (window as any).deleteAiAgentSession
    }
  }, [sessionId])

  if (isLoadingSession) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#003863]" />
      </div>
    )
  }

  return (
    <motion.div
      className="h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Messages */}
        <ChatMessagesContainer
          messages={messages}
          isLoadingMessages={isLoadingMessages}
          showSkeleton={showSkeleton}
          recommendations={recommendations}
          scrollContainerRef={scrollContainerRef}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0">
        <ChatInputArea
          selectedChatType={selectedChatType}
          inputMessage={inputMessage}
          isRecording={isRecording}
          isSendingMessage={isSendingMessage}
          audioBlob={audioBlob}
          isDropdownOpen={isDropdownOpen}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSendMessage={handleSendMessage}
          onToggleRecording={handleToggleRecording}
          onDeleteAudio={deleteVoiceMessage}
          onSendAudio={sendVoiceMessage}
          onToggleDropdown={handleToggleDropdown}
          onSelectChatType={handleSelectChatType}
          sessionId={sessionId}
          inputRef={inputRef}
        />
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlayingAudio(null)} />
    </motion.div>
  )
}
