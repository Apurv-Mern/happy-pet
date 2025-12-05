import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'
import {
  usePresignedUrlForViewingMutation,
  useLearningKnowledgeQuery,
  usePresignedUrls,
} from '@/api/learningModule'
import {
  PageHeader,
  CategorySidebar,
  DocumentsGrid,
  DocumentGridSkeleton,
} from '@/components/learning'
import { useCategories } from '@/hooks/useCategories'

export default function LearningModePage() {
  const navigate = useNavigate()
  const { t, language } = useTranslation()
  const [selectedCategory, setSelectedCategory] =
    useState<string>('all-categories')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingModule, setViewingModule] = useState<any>(null)
  const [documentUrl, setDocumentUrl] = useState<string>('')
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)

  // Fetch categories from API with contentType=document for learning modules
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategoriesQuery('other', 'document', language)

  const { mutate: fetchPresignedUrl } = usePresignedUrlForViewingMutation()

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
    ...(searchTerm && { search: searchTerm }),
    language,
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

  // Process categories using custom hook
  const categories = useCategories(categoriesResponse)

  // Helper function to get file extension
  const getFileExtension = (url: string) => {
    const urlWithoutQuery = url.split('?')[0]
    const parts = urlWithoutQuery.split('.')
    return parts[parts.length - 1].toLowerCase()
  }

  // Helper function to get viewer URL based on file type
  const getViewerUrl = (fileUrl: string) => {
    const extension = getFileExtension(fileUrl)

    // PDF files can be displayed directly
    if (extension === 'pdf') {
      return `${fileUrl}#view=FitH`
    }

    // DOC, DOCX, XLS, XLSX, PPT, PPTX - use Google Docs Viewer
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`
    }

    // Default: return the URL as-is
    return fileUrl
  }

  // Category click handler
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'happy-dog' || categoryId === 'happy-cat') {
      navigate(`/learning-module/${categoryId}`)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  const handleView = (module: any) => {
    setViewingModule(module)
    setIsViewModalOpen(true)
    setIsLoadingContent(true)
    setIframeLoading(true)
    setDocumentUrl('') // Reset URL

    // If presignedFileUrl is already available, use it directly
    if (module.presignedFileUrl) {
      const viewerUrl = getViewerUrl(module.presignedFileUrl)

      // Add a small delay to ensure modal is rendered
      setTimeout(() => {
        setDocumentUrl(viewerUrl)
        setIsLoadingContent(false)

        // Timeout fallback - if iframe doesn't load in 10 seconds, hide loading
        setTimeout(() => {
          if (iframeLoading) {
            console.log('Iframe load timeout - hiding spinner')
            setIframeLoading(false)
          }
        }, 10000)
      }, 100)
      return
    }

    // Fallback: fetch presigned URL if not available
    const fileUrl = module.fileUrl
    if (!fileUrl) {
      console.error('No file URL available for module', module)
      setDocumentUrl('')
      setIsLoadingContent(false)
      setIframeLoading(false)
      return
    }

    fetchPresignedUrl(fileUrl, {
      onSuccess: resp => {
        const url = resp?.data?.presignedUrl
        if (!url) {
          console.error('Presigned URL missing in response', resp)
          setDocumentUrl('')
          setIsLoadingContent(false)
          setIframeLoading(false)
          return
        }

        const viewerUrl = getViewerUrl(url)
        setDocumentUrl(viewerUrl)
        setIsLoadingContent(false)

        // Timeout fallback - if iframe doesn't load in 10 seconds, hide loading
        setTimeout(() => {
          setIframeLoading(false)
        }, 10000)
      },
      onError: () => {
        console.error('Failed to fetch presigned URL')
        setDocumentUrl('')
        setIsLoadingContent(false)
        setIframeLoading(false)
      },
    })
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setViewingModule(null)
    setDocumentUrl('')
    setIsLoadingContent(false)
    setIframeLoading(true)
  }

  const handleDownload = async (module: any) => {
    try {
      // Get the presigned URL (either already available or fetch it)
      let downloadUrl = module.presignedFileUrl

      if (!downloadUrl) {
        // Need to fetch presigned URL first
        const fileUrl = module.fileUrl
        if (!fileUrl) {
          console.error('No fileUrl available for download', module)
          return
        }

        // Fetch presigned URL synchronously for download
        const resp = await new Promise<any>((resolve, reject) => {
          fetchPresignedUrl(fileUrl, {
            onSuccess: resolve,
            onError: reject,
          })
        })

        downloadUrl = resp?.data?.presignedUrl
        if (!downloadUrl) {
          console.error('Failed to get presigned URL for download')
          return
        }
      }

      // Get file extension from URL
      const extension = getFileExtension(downloadUrl)
      const fileName = `${module.title}.${extension}`

      try {
        // Try to fetch the file as a blob (works if CORS is properly configured)
        const response = await fetch(downloadUrl, {
          mode: 'cors',
        })

        if (!response.ok) throw new Error('Fetch failed')

        const blob = await response.blob()

        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob)

        // Create a temporary anchor element to trigger download
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = fileName

        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up the blob URL
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
      } catch (fetchError) {
        // Fallback: direct download link (works for same-origin or CORS-enabled URLs)
        console.log('Blob fetch failed, using direct download', fetchError)

        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileName
        link.target = '_blank'
        link.rel = 'noopener noreferrer'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error downloading document:', error)
    }
  }

  // Skeleton loader component for initial page load
  if (categoriesLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px] mb-10">
          <div className="h-14 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-[#E3E6ED] rounded-[15px] overflow-hidden">
              <div className="bg-[#003863] h-16"></div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="px-6 py-4 border-b border-gray-300">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
          {/* Grid skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-[#E1EEF4] rounded-2xl p-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div className="flex-grow space-y-3">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      <div className="flex gap-3 mt-4">
                        <div className="h-9 bg-gray-300 rounded-full w-20"></div>
                        <div className="h-9 bg-gray-300 rounded-full w-28"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="">
        <PageHeader
          title={t('header.learningModule')}
          searchQuery={searchQuery}
          searchPlaceholder={t('knowledgeHub.searchPlaceholder')}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => setSearchTerm(searchQuery)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <CategorySidebar
              title={t('knowledgeHub.categoriesTitle')}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          {/* Main Content - Documents Grid */}
          <div className="lg:col-span-3">
            {isLoadingDocuments || isLoadingPresignedUrls ? (
              <DocumentGridSkeleton />
            ) : modules.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No documents found in this category.
                </p>
              </div>
            ) : (
              <DocumentsGrid
                modules={modules}
                handleView={handleView}
                handleDownload={handleDownload}
              />
            )}
          </div>
        </div>
      </div>

      {/* View Document Modal */}
      {isViewModalOpen && viewingModule && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeViewModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#003863] text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold pr-8">{viewingModule.title}</h2>
              <button
                onClick={closeViewModal}
                className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-hidden max-h-[calc(85vh-180px)] relative">
              {isLoadingContent ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mb-4"></div>
                  <p className="text-gray-600">Loading document...</p>
                </div>
              ) : documentUrl ? (
                <>
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mb-4"></div>
                      <p className="text-gray-600">Loading content...</p>
                    </div>
                  )}
                  <iframe
                    key={documentUrl}
                    src={documentUrl}
                    className="w-full h-[calc(85vh-180px)] border-0"
                    title={viewingModule.title}
                    allow="autoplay"
                    onLoad={() => {
                      console.log('Iframe loaded successfully')
                      setIframeLoading(false)
                    }}
                    onError={e => {
                      console.error('Iframe error:', e)
                      setIframeLoading(false)
                    }}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center py-12 px-6">
                  <p className="text-gray-600">
                    Unable to load document. Please try downloading it instead.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => handleDownload(viewingModule)}
                className="bg-white text-[#003863] border border-[#003863] px-6 py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                Download
              </button>
              <button
                onClick={closeViewModal}
                className="bg-[#003863] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004c82] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
