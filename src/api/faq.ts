import { apiClient } from './axios'

export interface FAQ {
  _id: string
  question: string
  answer: string
  status: string
  languageId: {
    _id: string
    code: string
    name: string
    nativeName: string
    isRTL: boolean
    isActive: boolean
    isDefault: boolean
  }
  translationGroup: string
  originalFAQId: string | null
  translatedFrom: string | null
  availableTranslations: string[]
  createdBy: {
    _id: string
    email: string
    name: string
  }
  updatedBy: {
    _id: string
    email: string
    name: string
  }
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  __v: number
  language: string
  id: string
}

export interface FAQResponse {
  success: boolean
  message: string
  data: {
    faqs: FAQ[]
  }
}

export const faqApi = {
  getFAQs: async (lang?: string): Promise<FAQResponse> => {
    const currentLang = lang || localStorage.getItem('language') || 'en'

    const response = await apiClient.get(
      `/public/v1/faqs?lang=${currentLang}`,
      {
        headers: {
          accept: 'application/json',
          'Accept-Language': currentLang,
          'x-platform': 'web',
        },
      }
    )

    // Filter FAQs by language code
    const filteredFaqs = response.data.data.faqs.filter(
      (faq: FAQ) => faq.languageId.code === currentLang
    )

    return {
      ...response.data,
      data: {
        faqs: filteredFaqs,
      },
    }
  },
}
