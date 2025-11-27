import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Trash2,
  Pause,
  Play,
  ChevronDown,
  Video,
  Headphones,
  MessageCircle,
  Loader2,
  ExternalLink,
  FileText,
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  chatApi,
  type ChatMessage as ApiChatMessage,
  type FileRecommendation,
} from '@/api/chat'
import { useChatRealtime } from '@/hooks/useChatRealtime'
import { useTranslation } from '@/contexts/I18nContext'

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
  const [recommendations, setRecommendations] = useState<FileRecommendation[]>(
    []
  )

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
          const messagesResponse = await chatApi.getMessages(
            existingSession._id,
            { page: 1, limit: 50 }
          )
          const convertedMessages = await Promise.all(
            messagesResponse.messages.map(convertApiMessageToMessage)
          )
          setMessages(convertedMessages)
          setIsLoadingMessages(false)
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
    setMessages(prev => [...prev, tempUserMessage])

    // Emit typing indicator
    emitTyping(false)

    try {
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
        newMessages.push(await convertApiMessageToMessage(response.userMessage))
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
    setMessages(prev => [...prev, tempMessage])

    try {
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

      // Convert Blob to File
      const audioFile = new File([audioBlob], 'recording.webm', {
        type: 'audio/webm',
      })

      const response = await chatApi.sendAudioMessage(sessionId, audioFile, {
        requestedFormat,
        responseFormat,
        language,
      })

      // Replace temp message with real messages
      const newMessages: Message[] = []
      if (response.userMessage) {
        newMessages.push(await convertApiMessageToMessage(response.userMessage))
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

  const speakText = (text: string, messageId: string) => {
    // Stop if another is playing
    if (isPlayingAudio === messageId) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(null)
      return
    }

    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = language === 'en' ? 'en-US' : 'hi-IN'

    utter.onend = () => {
      setIsPlayingAudio(null)
    }

    setIsPlayingAudio(messageId)
    window.speechSynthesis.speak(utter)
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
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        {/* Chat Messages */}
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-auto overflow-y-auto py-10">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-[#003863]" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center py-10">
                <p className="text-gray-500">Start a conversation...</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{
                    opacity: 0,
                    x: message.type === 'user' ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-[#003863] text-white rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px]'
                        : 'border-[1px] border-[#003863] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px]'
                    }`}
                  >
                    {message.isVoice && message.audioUrl && (
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => speakText(message.content, message.id)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {isPlayingAudio === message.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                        <div className="flex-grow h-1 bg-white/30 rounded-full">
                          <div className="h-full w-0 bg-white rounded-full transition-all" />
                        </div>
                      </div>
                    )}
                    {message.status === 'pending' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs">Processing...</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>

                    {/* Video player for video messages */}
                    {message.videoUrl && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <video
                          src={message.videoUrl}
                          controls
                          className="w-full max-h-96 rounded-lg"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Show recommendations for the last AI message */}
                    {message.type === 'ai' &&
                      index === messages.length - 1 &&
                      recommendations.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          <p className="text-xs font-semibold text-[#003863] mb-1.5">
                            📄 Recommended Documents
                          </p>
                          {recommendations.map((rec, recIndex) => (
                            <a
                              key={rec.documentId || recIndex}
                              href={rec.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 bg-white/50 border border-[#003863]/30 rounded-lg hover:bg-[#E8F4FF] transition-colors group text-left"
                            >
                              <FileText className="h-3.5 w-3.5 text-[#003863] flex-shrink-0" />
                              <span className="text-xs text-[#003863] font-medium truncate flex-1">
                                {rec.fileName}
                              </span>
                              <ExternalLink className="h-3 w-3 text-[#003863] flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </a>
                          ))}
                        </div>
                      )}

                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Recording Preview */}
          {audioBlob && (
            <div className="bg-[#e1eef4] px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={deleteVoiceMessage}
                  className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors"
                  disabled={isSendingMessage}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="flex-grow flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#003863] rounded-full"
                        style={{
                          height: `${Math.random() * 30 + 10}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={sendVoiceMessage}
                  className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors disabled:opacity-50"
                  disabled={isSendingMessage}
                >
                  {isSendingMessage ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Recording indicator when no audio blob yet */}
          {isRecording && !audioBlob && (
            <div className="bg-[#e1eef4] px-6 py-4">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[#003863] font-medium">
                  Recording... Click to stop
                </span>
                <button
                  onClick={stopRecording}
                  className="ml-4 px-4 py-2 rounded-full bg-[#003863] text-white hover:bg-[#002d4d] transition-colors"
                >
                  Stop Recording
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="w-full bg-[#E3E6ED] border-[2px] border-[#003863] rounded-[20px] flex items-center px-4 py-3 relative">
        {/* Plus Icon Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#003863] hover:bg-white/50 transition-colors"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1254_29576)">
                <path
                  d="M17.7474 0C7.94582 0 0 7.94582 0 17.7474C0 27.5494 7.94582 35.4947 17.7474 35.4947C27.5494 35.4947 35.4947 27.5494 35.4947 17.7474C35.4947 7.94582 27.5494 0 17.7474 0ZM17.7474 33.3112C9.18481 33.3112 2.21842 26.3099 2.21842 17.7473C2.21842 9.18474 9.18481 2.21835 17.7474 2.21835C26.3099 2.21835 33.2763 9.18478 33.2763 17.7473C33.2763 26.3098 26.3099 33.3112 17.7474 33.3112ZM25.5118 16.6381H18.8566V9.98289C18.8566 9.3706 18.3596 8.87368 17.7474 8.87368C17.1351 8.87368 16.6381 9.3706 16.6381 9.98289V16.6381H9.98289C9.3706 16.6381 8.87368 17.1351 8.87368 17.7474C8.87368 18.3596 9.3706 18.8566 9.98289 18.8566H16.6381V25.5118C16.6381 26.1241 17.1351 26.621 17.7474 26.621C18.3596 26.621 18.8566 26.1241 18.8566 25.5118V18.8566H25.5118C26.1241 18.8566 26.621 18.3596 26.621 17.7474C26.621 17.1351 26.1241 16.6381 25.5118 16.6381Z"
                  fill="#003863"
                />
              </g>
              <defs>
                <clipPath id="clip0_1254_29576">
                  <rect width="35.4947" height="35.4947" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Chat Type Dropdown */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 z-50">
              <div className="bg-white rounded-[20px] border-2 border-[#003863] shadow-lg p-2 min-w-[200px]">
                {/* Selected Chat Type Display */}
                <div
                  className={`flex items-center justify-between gap-3 px-4 py-2 rounded-[15px] mb-2 ${
                    selectedChatType === 'audio' || selectedChatType === 'video'
                      ? 'bg-[#E8F4FF]'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedChatType === 'audio' && (
                      <>
                        <Headphones className="h-5 w-5 text-[#003863]" />
                        <span className="text-[#003863] font-medium">
                          Audio Chat
                        </span>
                      </>
                    )}

                    {selectedChatType === 'video' && (
                      <>
                        <Video className="h-5 w-5 text-[#003863]" />
                        <span className="text-[#003863] font-medium">
                          Video Chat
                        </span>
                      </>
                    )}

                    {selectedChatType === 'chat' && (
                      <>
                        <MessageCircle className="h-5 w-5 text-[#003863]" />
                        <span className="text-[#003863] font-medium">Chat</span>
                      </>
                    )}
                  </div>

                  <div className="bg-[#0066CC] rounded-full p-1">
                    <ChevronDown className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="space-y-1">
                  {selectedChatType !== 'chat' && (
                    <button
                      onClick={() => {
                        setSelectedChatType('chat')
                        setIsDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-[15px] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-[#003863]" />
                      <span className="text-[#003863] font-medium">Chat</span>
                    </button>
                  )}
                  {selectedChatType !== 'audio' && (
                    <button
                      onClick={() => {
                        setSelectedChatType('audio')
                        setIsDropdownOpen(false)
                        // Recording will auto-start via useEffect
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-[15px] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <Headphones className="h-5 w-5 text-[#003863]" />
                      <span className="text-[#003863] font-medium">
                        Audio Chat
                      </span>
                    </button>
                  )}
                  {selectedChatType !== 'video' && (
                    <button
                      onClick={() => {
                        setSelectedChatType('video')
                        setIsDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-[15px] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <Video className="h-5 w-5 text-[#003863]" />
                      <span className="text-[#003863] font-medium">
                        Video Chat
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={
            isRecording
              ? 'Recording...'
              : selectedChatType === 'audio'
                ? 'Audio Chat - Voice input...'
                : selectedChatType === 'video'
                  ? 'Video Chat - Type here...'
                  : 'Chat - Type here...'
          }
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isRecording || isSendingMessage}
          className="flex-1 bg-transparent px-4 text-[#003863] text-lg focus:outline-none disabled:opacity-50"
        />
        <div className="h-8 w-[1px] bg-[#003863]"></div>
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isSendingMessage || !sessionId}
          className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSendingMessage ? (
            <Loader2 className="h-6 w-6 animate-spin text-[#003863]" />
          ) : (
            <svg
              width="46"
              height="48"
              viewBox="0 0 46 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9652 0C25.981 0 28.9673 0.620779 31.7536 1.82689C34.5398 3.033 37.0715 4.80083 39.204 7.02944C41.3365 9.25804 43.0281 11.9038 44.1822 14.8156C45.3363 17.7274 45.9303 20.8483 45.9303 24C45.9303 30.3652 43.5108 36.4697 39.204 40.9706C34.8972 45.4714 29.0559 48 22.9652 48C19.9493 48 16.963 47.3792 14.1768 46.1731C11.3905 44.967 8.85885 43.1992 6.72634 40.9706C2.41954 36.4697 0 30.3652 0 24C0 17.6348 2.41954 11.5303 6.72634 7.02944C11.0331 2.52856 16.8744 0 22.9652 0ZM13.7791 13.704V21.72L30.1762 24L13.7791 26.28V34.296L36.7443 24L13.7791 13.704Z"
                fill="#003863"
              />
            </svg>
          )}
        </button>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlayingAudio(null)} />
    </motion.div>
  )
}
