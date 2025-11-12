import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Trash2, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isVoice?: boolean
  audioUrl?: string
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Cleaning the Smart Feeder is straightforward. I found a video tutorial and a detailed manual that might help:\n\nCleaning Guide Video\nSmart Feeder Troubleshooting Manual",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [messages])

  const handleSendMessage = () => {
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => {
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

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const sendVoiceMessage = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob)
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: "I'm having trouble setting up the automatic feeding schedule. Can you help?",
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
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-[900px]">
        {/* Header */}
        <motion.div
          className="bg-[#d4e7f6] rounded-t-3xl px-6 py-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#003863]">AI Agent</h1>
            <p className="text-sm text-gray-600">Ask me anything about pet care</p>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          className="bg-white rounded-b-3xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-auto overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${message.type === 'user'
                    ? 'bg-[#003863] text-white'
                    : 'bg-[#e1eef4] text-gray-800'
                    }`}
                >
                  {message.isVoice && message.audioUrl && (
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => toggleAudioPlayback(message.audioUrl!, message.id)}
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
            <div className="border-t border-gray-200 bg-[#e1eef4] px-6 py-4">
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
          <div className="border-t border-gray-200 px-6 py-4">
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
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isRecording ? 'Recording...' : 'Type your message...'}
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
          </div>
        </motion.div>
      </div>
      <audio ref={audioRef} onEnded={() => setIsPlayingAudio(null)} />
    </motion.div>
  )
}
