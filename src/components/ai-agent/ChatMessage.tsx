import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLink, FileText, Loader2 } from 'lucide-react'
import { FileRecommendation } from '@/api/chat'
import { AudioWaveform } from './AudioWaveform'

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
        className={`${
          message.type === 'user'
            ? 'max-w-[70%] px-4 py-3 bg-[#003863] text-white rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px]'
            : 'max-w-full sm:max-w-full md:max-w-[75%] lg:max-w-[55%]  xl:max-w-[45%] 2xl:max-w-[35%] px-4 py-3 border-[1px] bg-[#fff] border-[#003863] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px]'
        }`}
      >
        {/* Audio Waveform */}
        {message.isVoice && message.audioUrl && (
          <div className="">
            <AudioWaveform
              audioUrl={message.audioUrl}
              isUser={message.type === 'user'}
            />
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
            <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-[#003863] prose-headings:font-bold prose-headings:mb-2 prose-p:text-gray-700 prose-p:mb-2 prose-strong:text-[#003863] prose-strong:font-bold prose-ul:text-gray-700 prose-ul:list-disc prose-ul:ml-4 prose-ul:mb-2 prose-ol:text-gray-700 prose-ol:list-decimal prose-ol:ml-4 prose-ol:mb-2 prose-li:mb-1">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold text-[#003863] mb-2 mt-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold text-[#003863] mb-2 mt-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold text-[#003863] mb-1 mt-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-2 leading-relaxed">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-[#003863]">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-4 mb-2 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-4 mb-2 text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1 leading-relaxed">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-gray-100 text-[#003863] px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-100 text-[#003863] p-2 rounded text-xs font-mono overflow-x-auto">
                        {children}
                      </code>
                    )
                  },
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#003863] underline hover:text-[#002d4d]"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse border border-gray-300">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-[#003863] text-white">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="bg-white">{children}</tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-b border-gray-300">{children}</tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 text-left font-bold border border-gray-300">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">
                      {children}
                    </td>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )
        ) : (
          !message.audioUrl && (
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {message.content}
            </p>
          )
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
