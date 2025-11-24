import { useQuery } from '@tanstack/react-query'
import {
  translateDynamicContent,
  translateDynamicContents,
} from '@/utils/deepl'
import { useTranslation } from '@/contexts/I18nContext'

/**
 * Hook to translate a single dynamic text
 */
export function useTranslateDynamic(text: string, enabled = true) {
  const { language } = useTranslation()

  return useQuery({
    queryKey: ['translate', text, language],
    queryFn: () => translateDynamicContent(text, language),
    enabled: enabled && !!text && language !== 'en',
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

/**
 * Hook to translate multiple dynamic texts (batch)
 */
export function useTranslateDynamics(texts: string[], enabled = true) {
  const { language } = useTranslation()

  return useQuery({
    queryKey: ['translate-batch', texts, language],
    queryFn: () => translateDynamicContents(texts, language),
    enabled: enabled && texts.length > 0 && language !== 'en',
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

/**
 * Hook to translate object properties dynamically
 */
export function useTranslateObject<T extends Record<string, any>>(
  obj: T | undefined,
  fieldsToTranslate: (keyof T)[]
) {
  const { language } = useTranslation()

  const textsToTranslate = obj
    ? fieldsToTranslate.map(field => String(obj[field] || ''))
    : []

  const { data: translatedTexts, isLoading } = useQuery({
    queryKey: ['translate-object', textsToTranslate, language],
    queryFn: () => translateDynamicContents(textsToTranslate, language),
    enabled: !!obj && textsToTranslate.length > 0 && language !== 'en',
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  })

  if (!obj) return { data: undefined, isLoading: false }
  if (language === 'en') return { data: obj, isLoading: false }

  if (!translatedTexts) return { data: obj, isLoading }

  const translatedObj = { ...obj }
  fieldsToTranslate.forEach((field, index) => {
    translatedObj[field] = translatedTexts[index] as any
  })

  return { data: translatedObj, isLoading }
}

/**
 * Hook to translate array of objects
 */
export function useTranslateObjects<T extends Record<string, any>>(
  items: T[] | undefined,
  fieldsToTranslate: (keyof T)[]
) {
  const { language } = useTranslation()

  const textsToTranslate = items
    ? items.flatMap(item =>
        fieldsToTranslate.map(field => String(item[field] || ''))
      )
    : []

  const { data: translatedTexts, isLoading } = useQuery({
    queryKey: ['translate-objects', textsToTranslate, language],
    queryFn: () => translateDynamicContents(textsToTranslate, language),
    enabled: !!items && items.length > 0 && language !== 'en',
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  })

  if (!items) return { data: undefined, isLoading: false }
  if (language === 'en') return { data: items, isLoading: false }
  if (!translatedTexts) return { data: items, isLoading }

  const translatedItems = items.map((item, itemIndex) => {
    const translatedItem = { ...item }
    fieldsToTranslate.forEach((field, fieldIndex) => {
      const translationIndex = itemIndex * fieldsToTranslate.length + fieldIndex
      translatedItem[field] = translatedTexts[translationIndex] as any
    })
    return translatedItem
  })

  return { data: translatedItems, isLoading }
}
