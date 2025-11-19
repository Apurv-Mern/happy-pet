# DeepL Translation Integration Guide

## Overview

This guide explains how to integrate DeepL API for translating both static and dynamic content in your Happy Pet website.

---

## 🎯 What is DeepL?

DeepL is a professional translation service that provides high-quality, AI-powered translations. It offers:

- **Better translation quality** than Google Translate
- **Support for 31+ languages**
- **API for automatic translations**
- **Context-aware translations**

---

## 📋 Prerequisites

### 1. Get DeepL API Key

1. Sign up at [DeepL API](https://www.deepl.com/pro-api)
2. Choose a plan:
   - **Free**: 500,000 characters/month
   - **Pro**: Pay as you go or subscription
3. Get your API key from the dashboard

### 2. Install DeepL SDK

```bash
npm install deepl-node
# or
yarn add deepl-node
```

---

## 🏗️ Architecture

### Current Setup (Custom i18n)

```
src/
├── locales/
│   ├── en.json          # English (source)
│   └── de.json          # German (manually translated)
├── contexts/
│   └── I18nContext.tsx  # Translation provider
```

### With DeepL Integration

```
src/
├── locales/
│   ├── en.json          # English (source)
│   ├── de.json          # Auto-generated from DeepL
│   ├── ar.json          # Auto-generated from DeepL
│   └── ...
├── contexts/
│   └── I18nContext.tsx  # Translation provider
├── utils/
│   └── deepl.ts         # DeepL translation utilities
└── scripts/
    └── translate.ts     # Script to auto-translate locales
```

---

## 🔧 Implementation

### Step 1: Create DeepL Utility

Create `src/utils/deepl.ts`:

```typescript
import * as deepl from 'deepl-node'

const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY

if (!DEEPL_API_KEY) {
  console.warn('DeepL API key not found. Translation features will be limited.')
}

const translator = DEEPL_API_KEY
  ? new deepl.Translator(DEEPL_API_KEY)
  : null

// Language mapping: our codes -> DeepL codes
const languageMap: Record<string, deepl.TargetLanguageCode> = {
  de: 'de',
  ar: 'ar',
  ms: 'ms', // Malay - Not directly supported, use 'id' (Indonesian) as fallback
  th: 'th', // Thai - Not directly supported in DeepL
  id: 'id',
  es: 'es',
  fr: 'fr',
  pt: 'pt-BR',
  ja: 'ja',
  zh: 'zh',
}

/**
 * Translate a single text string
 */
export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string> {
  if (!translator) {
    console.warn('DeepL translator not initialized')
    return text
  }

  try {
    const targetLangCode = languageMap[targetLang] || targetLang as deepl.TargetLanguageCode
    const result = await translator.translateText(
      text,
      sourceLang as deepl.SourceLanguageCode,
      targetLangCode
    )
    return result.text
  } catch (error) {
    console.error(`Translation error for "${text}":`, error)
    return text
  }
}

/**
 * Translate an entire object recursively
 */
export async function translateObject(
  obj: any,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<any> {
  if (typeof obj === 'string') {
    return await translateText(obj, targetLang, sourceLang)
  }

  if (Array.isArray(obj)) {
    return await Promise.all(
      obj.map(item => translateObject(item, targetLang, sourceLang))
    )
  }

  if (typeof obj === 'object' && obj !== null) {
    const translated: any = {}
    for (const [key, value] of Object.entries(obj)) {
      translated[key] = await translateObject(value, targetLang, sourceLang)
    }
    return translated
  }

  return obj
}

/**
 * Translate JSON locale file
 */
export async function translateLocaleFile(
  sourceJson: any,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<any> {
  console.log(`Translating to ${targetLang}...`)
  return await translateObject(sourceJson, targetLang, sourceLang)
}

/**
 * Check if translation service is available
 */
export function isTranslationAvailable(): boolean {
  return translator !== null
}

/**
 * Get supported languages
 */
export async function getSupportedLanguages() {
  if (!translator) return []
  
  try {
    const languages = await translator.getTargetLanguages()
    return languages.map(lang => ({
      code: lang.code,
      name: lang.name,
    }))
  } catch (error) {
    console.error('Error fetching supported languages:', error)
    return []
  }
}
```

---

### Step 2: Create Translation Script

Create `scripts/translate.ts`:

```typescript
import * as fs from 'fs'
import * as path from 'path'
import { translateLocaleFile } from '../src/utils/deepl'

const LOCALES_DIR = path.join(__dirname, '../src/locales')
const SOURCE_LOCALE = 'en'

// Languages to translate to
const TARGET_LANGUAGES = ['de', 'ar', 'id', 'es', 'fr']

async function translateAllLocales() {
  console.log('🌍 Starting translation process...\n')

  // Read source (English) locale file
  const sourceFilePath = path.join(LOCALES_DIR, `${SOURCE_LOCALE}.json`)
  const sourceContent = fs.readFileSync(sourceFilePath, 'utf-8')
  const sourceJson = JSON.parse(sourceContent)

  for (const targetLang of TARGET_LANGUAGES) {
    console.log(`📝 Translating to ${targetLang}...`)
  
    try {
      const translatedJson = await translateLocaleFile(
        sourceJson,
        targetLang,
        SOURCE_LOCALE
      )

      const targetFilePath = path.join(LOCALES_DIR, `${targetLang}.json`)
      fs.writeFileSync(
        targetFilePath,
        JSON.stringify(translatedJson, null, 2),
        'utf-8'
      )

      console.log(`✅ ${targetLang}.json created successfully\n`)
    } catch (error) {
      console.error(`❌ Error translating to ${targetLang}:`, error)
    }
  }

  console.log('🎉 Translation complete!')
}

// Run the script
translateAllLocales().catch(console.error)
```

Add to `package.json`:

```json
{
  "scripts": {
    "translate": "tsx scripts/translate.ts"
  }
}
```

---

### Step 3: Environment Variables

Create `.env` file:

```env
VITE_DEEPL_API_KEY=your-deepl-api-key-here
```

Add to `.env.example`:

```env
VITE_DEEPL_API_KEY=your_deepl_api_key
```

---

## 🔄 Translation Workflows

### A. Static Content Translation

**For JSON locale files (static UI text):**

1. **Manual Update** - Edit `src/locales/en.json`
2. **Auto-Translate** - Run translation script:
   ```bash
   npm run translate
   ```
3. **Review** - Check generated translation files
4. **Commit** - Add all locale files to git

**Advantages:**

- ✅ Translations done once
- ✅ No API calls at runtime
- ✅ Fast page loads
- ✅ Works offline

---

### B. Dynamic Content Translation

**For user-generated content or API data:**

#### Option 1: On-Demand Translation Hook

Create `src/hooks/useDeepLTranslation.ts`:

```typescript
import { useState, useEffect } from 'react'
import { translateText } from '@/utils/deepl'
import { useTranslation } from '@/contexts/I18nContext'

export function useDeepLTranslation(originalText: string, sourceLang: string = 'en') {
  const { language } = useTranslation()
  const [translatedText, setTranslatedText] = useState(originalText)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // If target language is same as source, no translation needed
    if (language === sourceLang) {
      setTranslatedText(originalText)
      return
    }

    setIsTranslating(true)

    translateText(originalText, language, sourceLang)
      .then(translated => {
        setTranslatedText(translated)
      })
      .catch(error => {
        console.error('Translation error:', error)
        setTranslatedText(originalText) // Fallback to original
      })
      .finally(() => {
        setIsTranslating(false)
      })
  }, [originalText, language, sourceLang])

  return { translatedText, isTranslating }
}
```

**Usage in Components:**

```tsx
import { useDeepLTranslation } from '@/hooks/useDeepLTranslation'

function BlogPost({ content }: { content: string }) {
  const { translatedText, isTranslating } = useDeepLTranslation(content)

  if (isTranslating) {
    return <div>Translating...</div>
  }

  return <div>{translatedText}</div>
}
```

#### Option 2: Backend Translation with Caching

**Better approach for production:**

1. **Backend API** - Translate on server
2. **Cache translations** - Store in database
3. **Return cached** - Reuse translations

Example backend endpoint:

```typescript
// Express.js example
app.post('/api/translate', async (req, res) => {
  const { text, targetLang, sourceLang } = req.body

  // Check cache first
  const cached = await db.translations.findOne({
    text,
    targetLang,
    sourceLang,
  })

  if (cached) {
    return res.json({ translation: cached.translation })
  }

  // Translate using DeepL
  const translation = await translateText(text, targetLang, sourceLang)

  // Cache for future use
  await db.translations.create({
    text,
    targetLang,
    sourceLang,
    translation,
  })

  res.json({ translation })
})
```

---

## 📊 Content Types & Strategies

### 1. Static UI Text (Menus, Buttons, Labels)

- **Method**: Pre-translate JSON locale files
- **Tool**: Translation script
- **Frequency**: When UI changes
- **Cost**: One-time per update

### 2. Dynamic Content (Articles, Descriptions)

- **Method**: On-demand or cached translation
- **Tool**: DeepL API + backend caching
- **Frequency**: On user request
- **Cost**: Per unique text + language combo

### 3. User-Generated Content (Comments, Reviews)

- **Method**: Backend translation with caching
- **Tool**: DeepL API + database
- **Frequency**: On creation/update
- **Cost**: Per item + language

---

## 🎨 Enhanced I18n Context with DeepL

Update `src/contexts/I18nContext.tsx`:

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { translateText, isTranslationAvailable } from '@/utils/deepl'
import en from '@/locales/en.json'
import de from '@/locales/de.json'

type Translations = typeof en

const translations: Record<string, Translations> = {
  en,
  de,
  // More languages...
}

interface I18nContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => any
  translateDynamic: (text: string, sourceLang?: string) => Promise<string>
  availableLanguages: { code: string; name: string; flag: string }[]
  canTranslateDynamic: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('language') || 'en'
  })

  const canTranslateDynamic = isTranslationAvailable()

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

  const translateDynamic = async (text: string, sourceLang: string = 'en') => {
    if (language === sourceLang) return text
    if (!canTranslateDynamic) return text
  
    return await translateText(text, language, sourceLang)
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateDynamic,
        availableLanguages: [
          { code: 'en', name: 'English', flag: '🇬🇧' },
          { code: 'de', name: 'German', flag: '🇩🇪' },
          { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
          { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
        ],
        canTranslateDynamic,
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
```

---

## 💡 Usage Examples

### Example 1: Learning Module with Dynamic Translation

```tsx
import { useLearningModulesQuery } from '@/api/learningModule'
import { useDeepLTranslation } from '@/hooks/useDeepLTranslation'

function LearningModuleCard({ module }) {
  const { translatedText: title } = useDeepLTranslation(module.title)
  const { translatedText: content } = useDeepLTranslation(module.content)

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}
```

### Example 2: Knowledge Hub Videos

```tsx
function VideoCard({ video }) {
  const { translateDynamic } = useTranslation()
  const [translatedTitle, setTranslatedTitle] = useState(video.title)

  useEffect(() => {
    translateDynamic(video.title).then(setTranslatedTitle)
  }, [video.title])

  return <h3>{translatedTitle}</h3>
}
```

---

## 📈 Best Practices

### 1. **Cache Translations**

```typescript
const translationCache = new Map<string, string>()

async function translateWithCache(text: string, lang: string) {
  const key = `${text}:${lang}`
  
  if (translationCache.has(key)) {
    return translationCache.get(key)!
  }

  const translated = await translateText(text, lang)
  translationCache.set(key, translated)
  return translated
}
```

### 2. **Batch Translations**

```typescript
async function translateBatch(texts: string[], lang: string) {
  return await Promise.all(
    texts.map(text => translateText(text, lang))
  )
}
```

### 3. **Error Handling**

```typescript
async function safeTranslate(text: string, lang: string) {
  try {
    return await translateText(text, lang)
  } catch (error) {
    console.error('Translation failed:', error)
    return text // Return original on error
  }
}
```

### 4. **Loading States**

```tsx
{isTranslating ? (
  <div className="animate-pulse">Translating...</div>
) : (
  <div>{translatedText}</div>
)}
```

---

## 💰 Cost Management

### Free Tier Limits

- **500,000 characters/month**
- Calculate: Average webpage = ~5,000 chars
- **~100 page translations/month**

### Optimization Tips

1. **Translate only when needed**

   - Check if target lang = source lang
   - Don't re-translate cached content
2. **Batch requests**

   - Combine multiple texts in one API call
3. **Cache aggressively**

   - Store in localStorage
   - Use Redis/Database for backend
4. **Prioritize static content**

   - Pre-translate UI text
   - Translate dynamic content on-demand

---

## 🚀 Implementation Checklist

- [ ] Sign up for DeepL API
- [ ] Install `deepl-node` package
- [ ] Create `src/utils/deepl.ts`
- [ ] Create `scripts/translate.ts`
- [ ] Add `VITE_DEEPL_API_KEY` to `.env`
- [ ] Run translation script: `npm run translate`
- [ ] Create `useDeepLTranslation` hook
- [ ] Update components to use translations
- [ ] Test all languages
- [ ] Implement caching strategy
- [ ] Monitor API usage

---

## 🔗 Resources

- [DeepL API Documentation](https://www.deepl.com/docs-api)
- [DeepL Node.js SDK](https://github.com/DeepLcom/deepl-node)
- [Supported Languages](https://www.deepl.com/docs-api/translate-text/)
- [Pricing](https://www.deepl.com/pro-api)

---

## ⚠️ Important Notes

1. **API Key Security**: Never commit API keys to git
2. **Rate Limits**: Monitor your usage to avoid hitting limits
3. **Fallbacks**: Always provide original text as fallback
4. **Quality**: Review auto-translations for critical content
5. **Legal**: Check DeepL terms for your use case

---

## 🎯 Summary

### For Static Content (UI Text)

✅ Use translation script to auto-generate locale files
✅ Commit translated JSON files to repository
✅ Fast, no runtime API calls

### For Dynamic Content (User Data)

✅ Use DeepL API with caching
✅ Implement backend translation endpoint
✅ Store translations in database

### Best Approach

**Hybrid**: Static content pre-translated, dynamic content on-demand with aggressive caching.

---

**Ready to make your Happy Pet website multilingual with DeepL! 🌍🐾**
