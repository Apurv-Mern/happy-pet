/**
 * Language Selector Component
 *
 * A reusable component for switching between languages.
 * Can be used in Header or anywhere in your application.
 *
 * Usage:
 * import { LanguageSelector } from '@/components/LanguageSelector'
 *
 * <LanguageSelector />
 */

import { useState, useRef, useEffect } from 'react'
import { MdLanguage } from 'react-icons/md'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelectLanguage = (code: string) => {
    setLanguage(code)
    setIsOpen(false)
  }

  // Get current language details
  const currentLanguage = availableLanguages.find(
    lang => lang.code === language
  )

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors text-white"
        aria-label={t('header.selectLanguage')}
      >
        <MdLanguage className="h-5 w-5" />
        <span className="hidden sm:inline text-sm">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <span className="sm:hidden text-xl">{currentLanguage?.flag}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              {t('header.selectLanguage')}
            </p>
          </div>
          {availableLanguages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors ${
                language === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span
                className={`text-sm flex-1 text-left ${
                  language === lang.code
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {lang.name}
              </span>
              {language === lang.code && (
                <span className="text-blue-600 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Compact Language Selector (Mobile-friendly)
 * Shows only flag icon on small screens
 */
export function CompactLanguageSelector() {
  const { language, setLanguage, availableLanguages } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentLanguage = availableLanguages.find(
    lang => lang.code === language
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Select Language"
      >
        <span className="text-2xl">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
          {availableLanguages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                language === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span
                className={`text-sm ${
                  language === lang.code
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {lang.name}
              </span>
              {language === lang.code && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Inline Language Selector (for settings pages)
 * Displays as a form select dropdown
 */
export function InlineLanguageSelector() {
  const { language, setLanguage, availableLanguages, t } = useTranslation()

  return (
    <div className="space-y-2">
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-gray-700"
      >
        {t('signupPage.preferredLanguage')}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {availableLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
