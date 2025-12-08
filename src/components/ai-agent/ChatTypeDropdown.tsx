import { ChevronDown, Headphones, MessageCircle } from 'lucide-react'

type ChatType = 'audio' | 'video' | 'chat'

interface ChatTypeDropdownProps {
  selectedChatType: ChatType
  isOpen: boolean
  onSelect: (type: ChatType) => void
}

export const ChatTypeDropdown = ({
  selectedChatType,
  isOpen,
  onSelect,
}: ChatTypeDropdownProps) => {
  if (!isOpen) return null

  return (
    <div className="absolute bottom-full left-0 mb-2 z-50">
      <div className="bg-[#E3E6ED] rounded-[20px] border-2 border-[#003863] shadow-lg p-2 min-w-[300px]">
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
                <span className="text-[#003863] font-medium">Audio Chat</span>
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
              onClick={() => onSelect('chat')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-[15px] hover:bg-[#F5F5F5] transition-colors"
            >
              <MessageCircle className="h-5 w-5 text-[#003863]" />
              <span className="text-[#003863] font-medium">Chat</span>
            </button>
          )}
          {selectedChatType !== 'audio' && (
            <button
              onClick={() => onSelect('audio')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-[15px] hover:bg-[#F5F5F5] transition-colors"
            >
              <Headphones className="h-5 w-5 text-[#003863]" />
              <span className="text-[#003863] font-medium">Audio Chat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
