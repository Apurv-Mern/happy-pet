import { memo } from 'react'

interface PageHeaderProps {
  title: string
  searchQuery: string
  searchPlaceholder: string
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
}

export const PageHeader = memo(
  ({
    title,
    searchQuery,
    searchPlaceholder,
    onSearchChange,
    onSearchSubmit,
  }: PageHeaderProps) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearchSubmit()
      }
    }

    return (
      <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px]">
        <h2 className="text-[#003863] text-[28px] heading-line">{title}</h2>
        <div className="w-full max-w-[380px] bg-[#003863] rounded-full px-4 py-3 flex items-center mb-5">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-3 bg-transparent text-white text-lg w-full focus:outline-none placeholder-white"
            autoComplete="off"
          />
          <button className="ml-3" onClick={onSearchSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }
)

PageHeader.displayName = 'PageHeader'
