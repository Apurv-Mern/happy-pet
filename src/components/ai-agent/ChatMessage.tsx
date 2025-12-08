import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { ExternalLink, FileText, Loader2 } from 'lucide-react'
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

interface ChatMessageProps {
  message: Message
  index: number
  showSkeleton: boolean
  recommendations: FileRecommendation[]
  isLastMessage: boolean
}

export const ChatMessage = ({
  message,
  index,
  showSkeleton,
  recommendations,
  isLastMessage,
}: ChatMessageProps) => {
  return (
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
            : 'border-[1px] bg-[#fff] border-[#003863] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px]'
        }`}
      >
        {/* Audio Player */}
        {message.isVoice && message.audioUrl && (
          <div className="mb-3">
            <audio
              controls
              className="w-full rounded-lg"
              src={message.audioUrl}
              style={{
                height: '40px',
                filter:
                  message.type === 'user'
                    ? 'invert(1) grayscale(1) contrast(0.8)'
                    : 'none',
              }}
            />
          </div>
        )}

        {/* Hidden text to determine bubble width */}
        {message.type === 'ai' && message.audioUrl && message.content && (
          <div className="invisible h-0 overflow-hidden text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {/* Message Content */}
        {message.status === 'pending' && message.type === 'ai' ? (
          <div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-full animate-spin text-[#003863]" />
              <span className="text-sm text-[#003863] animate-pulse">
                AI is thinking...
              </span>
            </div>
          </div>
        ) : message.type === 'ai' ? (
          !message.audioUrl && (
            <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-[#003863] prose-p:text-gray-700 prose-strong:text-[#003863] prose-ul:text-gray-700 prose-ol:text-gray-700">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {message.content}
          </p>
        )}

        {/* Video Player */}
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

        {/* Recommendations */}
        {message.type === 'ai' &&
          isLastMessage &&
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

        {/* Timestamp */}
        <p className="text-xs opacity-70 mt-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}
