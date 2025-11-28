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
  Mic,
  Loader2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { chatApi, type ChatMessage as ApiChatMessage } from '@/api/chat'
import { useChatRealtime } from '@/hooks/useChatRealtime'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()
  
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
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // WebSocket connection for real-time updates
  const { emitTyping } = useChatRealtime(sessionId, {
    onNewMessage: (message: ApiChatMessage) => {
      // Add new message from WebSocket
      setMessages(prev => [...prev, convertApiMessageToMessage(message)])
      scrollToBottom()
    },
    onMessageUpdate: (message: ApiChatMessage) => {
      // Update existing message (e.g., when media is ready)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message._id ? convertApiMessageToMessage(message) : msg
        )
      )
    },
    onAssetUpdate: (data: { messageId: string; assetType: string; status: string; url?: string }) => {
      // Update message when audio/video is generated
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id === data.messageId) {
            return {
              ...msg,
              status: data.status as 'pending' | 'ready' | 'failed',
              audioUrl: data.assetType === 'audio' && data.url ? data.url : msg.audioUrl,
              videoUrl: data.assetType === 'video' && data.url ? data.url : msg.videoUrl,
            }
          }
          return msg
        })
      )
    },
  })

  // Convert API message to UI message format
  const convertApiMessageToMessage = (apiMessage: ApiChatMessage): Message => {
    const audioVariant = apiMessage.variants?.find(v => v.format === 'audio' && v.status === 'ready')
    const videoVariant = apiMessage.variants?.find(v => v.format === 'video' && v.status === 'ready')
    const textVariant = apiMessage.variants?.find(v => v.format === 'text')
    
    return {
      id: apiMessage._id,
      type: apiMessage.senderType === 'user' ? 'user' : 'ai',
      content: textVariant?.content || apiMessage.text || '',
      timestamp: new Date(apiMessage.createdAt),
      isVoice: !!audioVariant,
      audioUrl: audioVariant?.url,
      videoUrl: videoVariant?.url,
      status: audioVariant?.status || videoVariant?.status,
    }
  }

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
        const sessionsResponse = await chatApi.getSessions({ page: 1, limit: 1, status: 'active' })
        
        if (sessionsResponse.sessions.length > 0) {
          // Use existing session
          const existingSession = sessionsResponse.sessions[0]
          setSessionId(existingSession._id)
          
          // Load message history
          setIsLoadingMessages(true)
          const messagesResponse = await chatApi.getMessages(existingSession._id, { page: 1, limit: 50 })
          setMessages(messagesResponse.messages.map(convertApiMessageToMessage).reverse())
          setIsLoadingMessages(false)
        } else {
          // Create new session
          const newSession = await chatApi.createSession('AI Agent Chat')
          setSessionId(newSession._id)
        }
      } catch (error) {
        console.error('Failed to initialize session:', error)
      } finally {
        setIsLoadingSession(false)
      }
    }

    initializeSession()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      const requestedFormat = selectedChatType === 'audio' ? 'audio' : selectedChatType === 'video' ? 'video' : 'text'
      const responseFormat = selectedChatType === 'audio' ? 'audio' : selectedChatType === 'video' ? 'video' : 'text'
      
      const response = await chatApi.sendTextMessage(sessionId, {
        text: userMessageText,
        requestedFormat,
        responseFormat,
        language: i18n.language,
      })

      // Remove temp message and add real messages
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== tempUserMessage.id)
        const newMessages: Message[] = []
        
        if (response.userMessage) {
          newMessages.push(convertApiMessageToMessage(response.userMessage))
        }
        if (response.assistantMessage) {
          newMessages.push(convertApiMessageToMessage(response.assistantMessage))
        }
        
        return [...filtered, ...newMessages]
      })
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
      const requestedFormat = selectedChatType === 'audio' ? 'audio' : selectedChatType === 'video' ? 'video' : 'text'
      const responseFormat = selectedChatType === 'audio' ? 'audio' : selectedChatType === 'video' ? 'video' : 'text'
      
      const response = await chatApi.sendAudioMessage(
        sessionId,
        audioBlob,
        {
          requestedFormat,
          responseFormat,
          language: i18n.language,
        }
      )

      // Replace temp message with real messages
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== tempId)
        const newMessages: Message[] = []
        
        if (response.userMessage) {
          newMessages.push(convertApiMessageToMessage(response.userMessage))
        }
        if (response.assistantMessage) {
          newMessages.push(convertApiMessageToMessage(response.assistantMessage))
        }
        
        return [...filtered, ...newMessages]
      })

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

  const toggleAudioPlayback = (audioUrl: string, messageId: string) => {
    if (isPlayingAudio === messageId) {
      audioRef.current?.pause()
      setIsPlayingAudio(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setIsPlayingAudio(messageId)
      }
    }
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
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
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
                        onClick={() =>
                          toggleAudioPlayback(message.audioUrl!, message.id)
                        }
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
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Recording Preview */}
          {audioBlob && (
            <div className="bg-[#e1eef4] px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={deleteVoiceMessage}
                  className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors"
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
                  className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          {/* <div className="">
            <div className="flex items-center gap-3">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors animate-pulse"
                >
                  <Pause className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors"
                >
                  <Mic className="h-5 w-5" />
                </button>
              )}

              <Input
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isRecording ? 'Recording...' : 'Type your message...'
                }
                disabled={isRecording}
                className="flex-grow border-2 border-gray-200 rounded-full h-11 px-4 focus:border-[#003863] focus:ring-0"
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRecording}
                className="w-10 h-10 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div> */}
        </motion.div>
      </div>

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
              <g clip-path="url(#clip0_1254_29576)">
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
                  {selectedChatType !== 'audio' && (
                    <button
                      onClick={() => {
                        setSelectedChatType('audio')
                        setIsDropdownOpen(false)
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
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Type here..."
          className="flex-1 bg-transparent px-4 text-[#003863] text-lg focus:outline-none"
        />
        <div className="h-8 w-[1px] bg-[#003863]"></div>
        <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-white">
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
        </button>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlayingAudio(null)} />
    </motion.div>
  )
}
