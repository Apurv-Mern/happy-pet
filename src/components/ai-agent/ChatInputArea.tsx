import { Loader2, Mic, MicOff } from 'lucide-react'
import { AudioRecordingPreview } from './AudioRecordingPreview'
import { ChatTypeDropdown } from './ChatTypeDropdown'

type ChatType = 'audio' | 'video' | 'chat'

interface ChatInputAreaProps {
  selectedChatType: ChatType
  inputMessage: string
  isRecording: boolean
  isSendingMessage: boolean
  audioBlob: Blob | null
  isDropdownOpen: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSendMessage: () => void
  onToggleRecording: () => void
  onDeleteAudio: () => void
  onSendAudio: () => void
  onToggleDropdown: () => void
  onSelectChatType: (type: ChatType) => void
  sessionId: string | null
  inputRef: React.RefObject<HTMLInputElement>
}

export const ChatInputArea = ({
  selectedChatType,
  inputMessage,
  isRecording,
  isSendingMessage,
  audioBlob,
  isDropdownOpen,
  onInputChange,
  onKeyPress,
  onSendMessage,
  onToggleRecording,
  onDeleteAudio,
  onSendAudio,
  onToggleDropdown,
  onSelectChatType,
  sessionId,
  inputRef,
}: ChatInputAreaProps) => {
  return (
    <div className="w-full bg-[#E3E6ED] border-[2px] border-[#003863] rounded-[20px] px-4 py-3 relative mt-10">
      {/* Recording Indicator */}
      {isRecording && !audioBlob && (
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#003863]/20">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-[#003863] font-medium text-sm">
            Recording...
          </span>
        </div>
      )}

      {/* Audio Recording Preview */}
      {audioBlob && (
        <AudioRecordingPreview
          onDelete={onDeleteAudio}
          onSend={onSendAudio}
          isSending={isSendingMessage}
        />
      )}

      <div className="flex items-center">
        {/* Plus Icon Button with Dropdown */}
        <div className="relative">
          <button
            onClick={onToggleDropdown}
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

          <ChatTypeDropdown
            selectedChatType={selectedChatType}
            isOpen={isDropdownOpen}
            onSelect={onSelectChatType}
          />
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
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          disabled={
            selectedChatType === 'audio' || isRecording || isSendingMessage
          }
          className="flex-1 bg-transparent px-4 text-[#003863] text-lg focus:outline-none disabled:opacity-50"
        />
        <div className="h-8 w-[1px] bg-[#003863]"></div>

        {selectedChatType === 'audio' ? (
          <button
            onClick={onToggleRecording}
            disabled={isSendingMessage}
            className={`ml-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-[#003863] hover:bg-[#002d4d]'
            }`}
          >
            {isRecording ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </button>
        ) : (
          <button
            onClick={onSendMessage}
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
        )}
      </div>
    </div>
  )
}
