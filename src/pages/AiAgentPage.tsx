import { useState, useRef } from 'react'
import {
  Send,
  Trash2,
  Pause,
  Play,
  ChevronDown,
  Video,
  Headphones,
  MessageCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isVoice?: boolean
  audioUrl?: string
}

type ChatType = 'audio' | 'video' | 'chat'
export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        'Cleaning the Smart Feeder is straightforward. I found a video tutorial and a detailed manual that might help:\n\nCleaning Guide Video\nSmart Feeder Troubleshooting Manual',
      timestamp: new Date(),
    },
  ])
  const [selectedChatType, setSelectedChatType] = useState<ChatType>('audio')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // const [inputMessage, setInputMessage] = useState('')
  // const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [messages])

  // Commented out unused functions - can be enabled when voice/send functionality is implemented
  /*
  const _handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content:
            'Certainly! To set up the automatic feeding schedule, you can refer to the quick start guide. Would you like me to show you the relevant section?',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const _startRecording = async () => {
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
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const _stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }
  */

  const sendVoiceMessage = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob)
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content:
          "I'm having trouble setting up the automatic feeding schedule. Can you help?",
        timestamp: new Date(),
        isVoice: true,
        audioUrl,
      }
      setMessages([...messages, newMessage])
      setAudioBlob(null)
    }
  }

  const deleteVoiceMessage = () => {
    setAudioBlob(null)
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
