/**
 * Content Translation Utilities
 *
 * This module provides utilities for translating dynamic content from APIs
 * There are multiple approaches depending on your backend setup:
 */

import { useTranslation } from '@/contexts/I18nContext'

/**
 * APPROACH 1: Backend Returns Multi-language Content
 * ===================================================
 * Backend stores translations in database and returns all languages
 *
 * Example API Response:
 * {
 *   id: "123",
 *   title: {
 *     en: "Dog Training Basics",
 *     de: "Grundlagen der Hundeausbildung",
 *     ar: "أساسيات تدريب الكلاب",
 *     ms: "Asas Latihan Anjing",
 *     th: "พื้นฐานการฝึกสุนัข",
 *     id: "Dasar Pelatihan Anjing"
 *   },
 *   description: {
 *     en: "Learn the basics...",
 *     de: "Lernen Sie die Grundlagen...",
 *     // ... other languages
 *   }
 * }
 */

export interface MultiLangContent {
  en: string
  de: string
  ar: string
  ms: string
  th: string
  id: string
}

/**
 * Extract content based on current language
 */
export const getLocalizedContent = (
  content: MultiLangContent | string | undefined,
  currentLanguage: string,
  fallbackLanguage: string = 'en'
): string => {
  if (!content) return ''

  // If content is already a string, return it
  if (typeof content === 'string') return content

  // Try to get content in current language
  if (content[currentLanguage as keyof MultiLangContent]) {
    return content[currentLanguage as keyof MultiLangContent]
  }

  // Fallback to English or first available language
  return (
    content[fallbackLanguage as keyof MultiLangContent] ||
    content.en ||
    Object.values(content)[0] ||
    ''
  )
}

/**
 * APPROACH 2: Backend API with Language Parameter
 * ================================================
 * Send language preference in API request
 * Backend returns already-translated content
 *
 * Example Usage in API:
 * GET /api/content?lang=de
 *
 * Response:
 * {
 *   id: "123",
 *   title: "Grundlagen der Hundeausbildung",
 *   description: "Lernen Sie die Grundlagen..."
 * }
 */

export const createApiClientWithLanguage = (baseClient: any) => {
  return {
    get: (url: string, config = {}) => {
      const language = localStorage.getItem('language') || 'en'
      const separator = url.includes('?') ? '&' : '?'
      const urlWithLang = `${url}${separator}lang=${language}`
      return baseClient.get(urlWithLang, config)
    },
    post: (url: string, data: any, config = {}) => {
      const language = localStorage.getItem('language') || 'en'
      return baseClient.post(url, { ...data, language }, config)
    },
  }
}

/**
 * APPROACH 3: Client-Side AI Translation (Future Enhancement)
 * ============================================================
 * Use AI services to translate content on-the-fly
 * Good for user-generated content or when backend doesn't support translations
 *
 * Services you can integrate:
 * - Google Translate API
 * - DeepL API
 * - OpenAI GPT for context-aware translations
 * - Azure Translator
 */

interface TranslationCache {
  [key: string]: {
    [lang: string]: string
  }
}

const translationCache: TranslationCache = {}

export const translateContent = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string> => {
  // Check cache first
  const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`
  if (translationCache[cacheKey]?.[targetLanguage]) {
    return translationCache[cacheKey][targetLanguage]
  }

  // TODO: Implement actual translation API call
  // For now, return original text
  console.warn('Translation API not implemented. Returning original text.')
  return text

  // Example implementation with Google Translate:
  /*
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }),
      }
    )
    const data = await response.json()
    const translated = data.data.translations[0].translatedText
    
    // Cache the result
    if (!translationCache[cacheKey]) {
      translationCache[cacheKey] = {}
    }
    translationCache[cacheKey][targetLanguage] = translated
    
    return translated
  } catch (error) {
    console.error('Translation failed:', error)
    return text
  }
  */
}

/**
 * APPROACH 4: Hybrid Approach with Fallback Categories
 * =====================================================
 * Translate category names and UI elements locally
 * Keep dynamic content in original language or use backend translations
 */

export const getCategoryTranslations = () => {
  return {
    'happy-dog': {
      en: 'Happy Dog',
      de: 'Glücklicher Hund',
      ar: 'كلب سعيد',
      ms: 'Anjing Gembira',
      th: 'สุนัขมีความสุข',
      id: 'Anjing Bahagia',
    },
    'happy-cat': {
      en: 'Happy Cat',
      de: 'Glückliche Katze',
      ar: 'قطة سعيدة',
      ms: 'Kucing Gembira',
      th: 'แมวมีความสุข',
      id: 'Kucing Bahagia',
    },
    'pet-health': {
      en: 'Pet Health',
      de: 'Haustiergesundheit',
      ar: 'صحة الحيوانات الأليفة',
      ms: 'Kesihatan Haiwan Kesayangan',
      th: 'สุขภาพสัตว์เลี้ยง',
      id: 'Kesehatan Hewan Peliharaan',
    },
    nutrition: {
      en: 'Nutrition',
      de: 'Ernährung',
      ar: 'التغذية',
      ms: 'Pemakanan',
      th: 'โภชนาการ',
      id: 'Nutrisi',
    },
    training: {
      en: 'Training',
      de: 'Training',
      ar: 'التدريب',
      ms: 'Latihan',
      th: 'การฝึก',
      id: 'Pelatihan',
    },
    grooming: {
      en: 'Grooming',
      de: 'Pflege',
      ar: 'العناية',
      ms: 'Dandanan',
      th: 'การดูแลขนและเล็บ',
      id: 'Perawatan',
    },
  }
}

/**
 * React Hook for translating categories
 */
export const useLocalizedCategory = (categoryId: string): string => {
  const { language } = useTranslation()
  const categories = getCategoryTranslations()

  const category = categories[categoryId as keyof typeof categories]
  if (!category) return categoryId

  return (
    category[language as keyof typeof category] || category.en || categoryId
  )
}

/**
 * APPROACH 5: Static Content Mapping
 * ===================================
 * For frequently used phrases or limited content
 * Store translations in your locales files under a 'dynamic' section
 */

export const getDynamicContentKey = (
  contentType: string,
  id: string
): string => {
  return `dynamic.${contentType}.${id}`
}

/**
 * Usage Examples:
 * ===============
 *
 * 1. Multi-language content from backend:
 * const title = getLocalizedContent(video.title, language)
 *
 * 2. Category translation:
 * const categoryName = useLocalizedCategory('happy-dog')
 *
 * 3. With translation function:
 * const label = t('knowledgeHub.searchPlaceholder')
 *
 * 4. Mixed approach:
 * <h2>{getLocalizedContent(course.title, language)}</h2>
 * <p>{t('knowledgeHub.duration')}: {course.duration} minutes</p>
 */
