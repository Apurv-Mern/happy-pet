import { Trash2, Send, Loader2 } from 'lucide-react'

interface AudioRecordingPreviewProps {
  onDelete: () => void
  onSend: () => void
  isSending: boolean
}

export const AudioRecordingPreview = ({
  onDelete,
  onSend,
  isSending,
}: AudioRecordingPreviewProps) => {
  return (
    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#003863]/20">
      <button
        onClick={onDelete}
        className="w-8 h-8 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors flex-shrink-0"
        disabled={isSending}
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <div className="flex-grow flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-[#003863] rounded-full flex-shrink-0"
            style={{
              height: `${Math.random() * 20 + 8}px`,
            }}
          />
        ))}
      </div>
      <button
        onClick={onSend}
        className="w-8 h-8 rounded-full bg-[#003863] text-white flex items-center justify-center hover:bg-[#002d4d] transition-colors disabled:opacity-50 flex-shrink-0"
        disabled={isSending}
      >
        {isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
