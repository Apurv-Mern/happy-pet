import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { FileRecommendation } from '@/api/chat'

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

interface ChatMessagesContainerProps {
  messages: Message[]
  isLoadingMessages: boolean
  showSkeleton: boolean
  recommendations: FileRecommendation[]
  scrollContainerRef: React.RefObject<HTMLDivElement>
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export const ChatMessagesContainer = ({
  messages,
  isLoadingMessages,
  showSkeleton,
  recommendations,
  scrollContainerRef,
  messagesEndRef,
}: ChatMessagesContainerProps) => {
  return (
    <motion.div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="custom-scrollbar pr-10 py-10">
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
            <ChatMessage
              key={message.id}
              message={message}
              index={index}
              showSkeleton={showSkeleton}
              recommendations={recommendations}
              isLastMessage={index === messages.length - 1}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  )
}
