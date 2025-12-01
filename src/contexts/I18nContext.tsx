import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '@/locales/en.json'
import de from '@/locales/de.json'
import ar from '@/locales/ar.json'
import ms from '@/locales/ms.json'
import th from '@/locales/th.json'
import id from '@/locales/id.json'

type Translations = typeof en

const translations: Record<string, Translations> = {
  en,
  de,
  ar,
  ms,
  th,
  id,
}

interface I18nContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => any
  availableLanguages: { code: string; name: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('language') || 'en'
  })

  // Get translated language names based on current language
  const getAvailableLanguages = () => {
    const currentTranslations = translations[language] || translations['en']
    return [
      {
        code: 'en',
        name: currentTranslations.languages.en,
        flag: 'https://flagcdn.com/w40/gb.png',
      },
      {
        code: 'de',
        name: currentTranslations.languages.de,
        flag: 'https://flagcdn.com/w40/de.png',
      },
      {
        code: 'ar',
        name: currentTranslations.languages.ar,
        flag: 'https://flagcdn.com/w40/ae.png',
      },
      {
        code: 'ms',
        name: currentTranslations.languages.ms,
        flag: 'https://flagcdn.com/w40/my.png',
      },
      {
        code: 'th',
        name: currentTranslations.languages.th,
        flag: 'https://flagcdn.com/w40/th.png',
      },
      {
        code: 'id',
        name: currentTranslations.languages.id,
        flag: 'https://flagcdn.com/w40/id.png',
      },
    ]
  }

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang)
    } else {
      console.warn(`Language '${lang}' not found. Falling back to English.`)
      setLanguageState('en')
    }
  }

  const t = (key: string): any => {
    const keys = key.split('.')
    let value: any = translations[language] || translations['en']

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        let fallback: any = translations['en']
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk]
          } else {
            console.warn(`Translation key '${key}' not found`)
            return key
          }
        }
        return fallback
      }
    }

    return value
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages: getAvailableLanguages(),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}
