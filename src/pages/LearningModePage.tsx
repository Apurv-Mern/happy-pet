import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'
import { FileText, Eye, Download } from 'lucide-react'
import { usePresignedUrlForViewingMutation } from '@/api/learningModule'
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

  // Mock documents data - will be replaced with API later
  const modules = [
    {
      id: '1',
      _id: '1',
      title: 'Complete Guide to Pet Nutrition',
      content:
        'Comprehensive guide covering all aspects of pet nutrition and dietary requirements for your pets...',
    },
    {
      id: '2',
      _id: '2',
      title: "Understanding Your Pet's Dietary Needs",
      content:
        'Learn about the specific nutritional requirements and feeding schedules for different pets...',
    },
  ]

  // Build categories array from API
  const categories: Category[] = [
    {
      id: 'all-categories',
      name: t('knowledgeHub.categories.allCategories'),
      count:
        categoriesResponse?.data?.reduce((sum, cat) => sum + cat.count, 0) || 0,
    },
    ...(categoriesResponse?.data?.map(category => ({
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

  const handleView = (module: {
    id?: string
    _id?: string
    title: string
    content: string
  }) => {
    const docId = module._id ?? module.id
    if (!docId) {
      console.error('No document id available for module', module)
      return
    }

    try {
      newWindowRef.current = window.open('', '_blank')
    } catch (err) {
      console.warn('Could not open new window/tab immediately', err)
      newWindowRef.current = null
    }

    fetchPresignedUrl(String(docId), {
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

  const handleDownload = (module: {
    id: string
    title: string
    content: string
  }) => {
    const blob = new Blob([module.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${module.title}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (categoriesLoading) {
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
            <h2 className="text-[#003863] text-[55px] heading-line">
              {t('header.learningModule')}
            </h2>
            <div className="w-full max-w-[380px] bg-[#003863] rounded-[15px] px-4 py-3 flex items-center mb-5">
              <input
                type="text"
                placeholder={t('knowledgeHub.searchPlaceholder')}
                className="bg-transparent text-white text-lg w-full focus:outline-none placeholder-white"
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
                  className="bg-[#E1EEF4] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex gap-4">
                    {/* Document Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#d4e7f6] rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-[#003863]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-[#003863] mb-2">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {module.content}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => handleView(module)}
                          className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4] rounded-full px-4 h-9 text-sm font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownload(module)}
                          className="flex items-center gap-2 bg-[#003863] text-white hover:bg-[#002d4d] rounded-full px-4 h-9 text-sm font-medium"
                        >
                          <Download className="h-4 w-4" />
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
