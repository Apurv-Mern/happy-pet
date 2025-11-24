import axios from 'axios'

// DeepL API configuration
const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY || ''
const DEEPL_API_URL =
  import.meta.env.VITE_DEEPL_API_URL ||
  'https://api-free.deepl.com/v2/translate'

// Language code mapping (your app code -> DeepL code)
const LANGUAGE_MAP: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  ar: 'AR',
  ms: 'MS', // Malay
  th: 'TH', // Thai
  id: 'ID', // Indonesian
}

export interface TranslateOptions {
  text: string | string[]
  targetLang: string
  sourceLang?: string
  preserveFormatting?: boolean
  formality?: 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less'
}

export interface TranslationResult {
  text: string
  detected_source_language?: string
}

/**
 * Translate text using DeepL API
 */
export async function translateWithDeepL(
  options: TranslateOptions
): Promise<string | string[]> {
  if (!DEEPL_API_KEY) {
    console.warn('DeepL API key not configured. Returning original text.')
    return options.text
  }

  try {
    const targetLang =
      LANGUAGE_MAP[options.targetLang] || options.targetLang.toUpperCase()
    const sourceLang = options.sourceLang
      ? LANGUAGE_MAP[options.sourceLang] || options.sourceLang.toUpperCase()
      : undefined

    const params = new URLSearchParams()

    // Handle both single text and array of texts
    const texts = Array.isArray(options.text) ? options.text : [options.text]
    texts.forEach(text => params.append('text', text))

    params.append('target_lang', targetLang)
    if (sourceLang) {
      params.append('source_lang', sourceLang)
    }
    if (options.preserveFormatting) {
      params.append('preserve_formatting', '1')
    }
    if (options.formality) {
      params.append('formality', options.formality)
    }

    const response = await axios.post(DEEPL_API_URL, params, {
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const translations = response.data.translations.map(
      (t: TranslationResult) => t.text
    )

    return Array.isArray(options.text) ? translations : translations[0]
  } catch (error) {
    console.error('DeepL translation error:', error)
    return options.text
  }
}

/**
 * Translate dynamic content (from API responses)
 */
export async function translateDynamicContent(
  content: string,
  targetLang: string
): Promise<string> {
  if (targetLang === 'en') {
    return content // No translation needed for English
  }

  const result = await translateWithDeepL({
    text: content,
    targetLang,
    sourceLang: 'en',
    preserveFormatting: true,
  })

  return Array.isArray(result) ? result[0] : result
}

/**
 * Translate multiple dynamic contents at once (batch translation)
 */
export async function translateDynamicContents(
  contents: string[],
  targetLang: string
): Promise<string[]> {
  if (targetLang === 'en') {
    return contents // No translation needed for English
  }

  const result = await translateWithDeepL({
    text: contents,
    targetLang,
    sourceLang: 'en',
    preserveFormatting: true,
  })

  return Array.isArray(result) ? result : [result]
}

/**
 * Check DeepL API usage
 */
export async function checkDeepLUsage(): Promise<{
  character_count: number
  character_limit: number
}> {
  if (!DEEPL_API_KEY) {
    throw new Error('DeepL API key not configured')
  }

  try {
    const response = await axios.get('https://api-free.deepl.com/v2/usage', {
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error checking DeepL usage:', error)
    throw error
  }
}
