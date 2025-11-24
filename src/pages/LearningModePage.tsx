import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'
import { FileText, Eye, Download } from 'lucide-react'
import {
  usePresignedUrlForViewingMutation,
  useLearningKnowledgeQuery,
  usePresignedUrls,
} from '@/api/learningModule'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  name: string
  count: number
}

export default function LearningModePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<string>('all-categories')

  // Fetch categories from API with contentType=document for learning modules
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategoriesQuery('other', 'document')

  const { mutate: fetchPresignedUrl } = usePresignedUrlForViewingMutation()
  const newWindowRef = useRef<Window | null>(null)

  // Map route category IDs to API category IDs
  const categoryMap: { [key: string]: string } = {
    'happy-dog': 'DOG',
    'happy-cat': 'CAT',
  }

  // Build API filters based on selected category
  const apiFilters = {
    page: 1,
    limit: 50,
    type: 'document' as const,
    categoryId:
      selectedCategory === 'all-categories'
        ? 'ALL'
        : categoryMap[selectedCategory] || undefined,
  }

  // Fetch documents from API
  const { data: learningData, isLoading: isLoadingDocuments } =
    useLearningKnowledgeQuery(apiFilters)

  // Fetch presigned URLs for documents
  const {
    items: documentsWithPresignedUrls,
    isLoading: isLoadingPresignedUrls,
  } = usePresignedUrls(learningData?.data?.items, !isLoadingDocuments)

  const modules = documentsWithPresignedUrls || []

  // Build categories array from API
  const categories: Category[] = [
    {
      id: 'all-categories',
      name: t('knowledgeHub.categories.allCategories'),
      count:
        categoriesResponse?.data?.reduce((sum, cat) => sum + cat.count, 0) || 0,
    },
    ...(categoriesResponse?.data
      ?.filter(
        category =>
          category.id !== 'ALL_CATEGORIES' &&
          category.id !== 'all-categories' &&
          category.name?.toLowerCase() !== 'all categories'
      ) // Filter out API's all categories
      ?.map(category => ({
        id:
          category.id === 'DOG'
            ? 'happy-dog'
            : category.id === 'CAT'
              ? 'happy-cat'
              : category.id.toLowerCase(),
        name: category.name,
        count: category.count,
      })) || []),
  ]

  const handleView = (module: any) => {
    // If presignedFileUrl is already available, use it directly
    if (module.presignedFileUrl) {
      window.open(module.presignedFileUrl, '_blank')
      return
    }

    // Fallback: fetch presigned URL if not available
    const fileUrl = module.fileUrl
    if (!fileUrl) {
      console.error('No file URL available for module', module)
      return
    }

    try {
      newWindowRef.current = window.open('', '_blank')
    } catch (err) {
      console.warn('Could not open new window/tab immediately', err)
      newWindowRef.current = null
    }

    fetchPresignedUrl(fileUrl, {
      onSuccess: resp => {
        const url = resp?.data?.presignedUrl
        if (!url) {
          console.error('Presigned URL missing in response', resp)
          if (newWindowRef.current) {
            try {
              newWindowRef.current.close()
            } catch {}
            newWindowRef.current = null
          }
          return
        }

        if (newWindowRef.current) {
          try {
            newWindowRef.current.location.href = url
          } catch (err) {
            window.open(url, '_blank')
          }
        } else {
          window.open(url, '_blank')
        }

        newWindowRef.current = null
      },
      onError: () => {
        if (newWindowRef.current) {
          try {
            newWindowRef.current.close()
          } catch {}
          newWindowRef.current = null
        }
        console.error('Failed to fetch presigned URL')
      },
    })
  }

  const handleDownload = (module: any) => {
    // If presignedFileUrl is already available, use it directly
    if (module.presignedFileUrl) {
      const link = document.createElement('a')
      link.href = module.presignedFileUrl
      link.download = module.title || 'document'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Fallback to old method
    const blob = new Blob([module.content || ''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${module.title}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (categoriesLoading || isLoadingDocuments || isLoadingPresignedUrls) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading learning modules...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        <div>
          <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px]">
            <h2 className="text-[#003863] text-[28px] heading-line">
              {t('header.learningModule')}
            </h2>
            <div className="w-full max-w-[380px] bg-[#003863] rounded-full px-4 py-3 flex items-center mb-5">
              <input
                type="text"
                placeholder={t('knowledgeHub.searchPlaceholder')}
                className="pl-3 bg-transparent text-white text-lg w-full focus:outline-none placeholder-white"
              />
              <button className="ml-3">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-[#E3E6ED] rounded-[15px] overflow-hidden sticky top-4">
              <div className="bg-[#003863] text-white px-6 py-4">
                <h2 className="text-xl font-bold">
                  {t('knowledgeHub.categoriesTitle')}
                </h2>
              </div>
              <div className="">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (
                        category.id === 'happy-dog' ||
                        category.id === 'happy-cat'
                      ) {
                        // Navigate to subcategory page
                        navigate(`/learning-module/${category.id}`)
                      } else {
                        setSelectedCategory(category.id)
                      }
                    }}
                    className={`w-full text-left px-6 py-4 hover:bg-[#D0D2D9] transition-colors ${
                      index === categories.length - 1
                        ? 'rounded-b-[15px]'
                        : 'border-b border-gray-300'
                    } ${
                      selectedCategory === category.id ? 'bg-[#D0D2D9]' : ''
                    }`}
                  >
                    <span className="text-[#003863] text-[18px] font-semibold">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Documents Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  className="bg-[#E3E6ED] rounded-2xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex gap-4">
                    {/* Document Icon */}
                    <div className="flex-shrink-0">
                      <div className="border-[2px] border-[#003863] rounded-full p-3">                        
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.33301" y="5.86401" width="20.5314" height="24.9218" rx="2" stroke="#003863" stroke-width="2"/>
                        <path d="M13.1992 13.1938H21.9984" stroke="#003863" stroke-width="2" stroke-linecap="round"/>
                        <path d="M13.1992 19.0579H21.9984" stroke="#003863" stroke-width="2" stroke-linecap="round"/>
                        <path d="M13.1992 24.9219H19.0653" stroke="#003863" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-[#003863] mb-2">
                        {module.title}
                      </h3>
                      <p className="text-[#003863] text-sm leading-relaxed mb-4 line-clamp-3">
                        {module.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => handleView(module)}
                          className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#fff] rounded-full px-4 h-9 text-sm font-medium"
                        >
                          
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.59863 7.39697C10.8138 7.39697 11.7987 8.38148 11.7988 9.59521C11.7988 10.8091 10.8138 11.7944 9.59863 11.7944C8.38364 11.7942 7.39941 10.8089 7.39941 9.59521C7.39957 8.38164 8.38374 7.39724 9.59863 7.39697Z" stroke="#003860" stroke-width="2"/>
                          <path d="M15.9751 8.53651C16.3677 8.99697 16.564 9.2272 16.564 9.59564C16.564 9.96407 16.3677 10.1943 15.9751 10.6548C14.7704 12.0677 12.3671 14.3934 9.59875 14.3934C6.83044 14.3934 4.42706 12.0677 3.2224 10.6548C2.82981 10.1943 2.63351 9.96407 2.63351 9.59564C2.63351 9.2272 2.82981 8.99697 3.2224 8.53651C4.42706 7.12359 6.83044 4.79785 9.59875 4.79785C12.3671 4.79785 14.7704 7.12359 15.9751 8.53651Z" stroke="#003860" stroke-width="2"/>
                          </svg>

                          View
                        </Button>
                        <Button
                          onClick={() => handleDownload(module)}
                          className="flex items-center gap-2 bg-[#fff] hover:bg-[#fff] text-[#003863] border border-[#003863] rounded-full px-4 h-9 text-sm font-medium"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.59924 11.1948L8.89226 11.9021L9.59924 12.6088L10.3062 11.9021L9.59924 11.1948ZM10.5992 3.99815C10.5992 3.44586 10.1515 2.99815 9.59924 2.99815C9.04696 2.99815 8.59924 3.44586 8.59924 3.99815L9.59924 3.99815L10.5992 3.99815ZM5.59961 7.19667L4.89263 7.90391L8.89226 11.9021L9.59924 11.1948L10.3062 10.4876L6.30659 6.48943L5.59961 7.19667ZM9.59924 11.1948L10.3062 11.9021L14.3058 7.90391L13.5989 7.19667L12.8919 6.48943L8.89226 10.4876L9.59924 11.1948ZM9.59924 11.1948L10.5992 11.1948L10.5992 3.99815L9.59924 3.99815L8.59924 3.99815L8.59924 11.1948L9.59924 11.1948Z" fill="#003863"/>
                          <path d="M4 12.7942L4 13.5938C4 14.4771 4.71628 15.1931 5.59985 15.1931L13.5991 15.1931C14.4827 15.1931 15.199 14.4771 15.199 13.5938V12.7942" stroke="#003863" stroke-width="2"/>
                          </svg>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
