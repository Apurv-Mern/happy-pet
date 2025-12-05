import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'
import {
  useLearningKnowledgeQuery,
  usePresignedUrls,
} from '@/api/learningModule'
import {
  PageHeader,
  CategorySidebar,
  VideosGrid,
  VideoGridSkeleton,
} from '@/components/learning'
import { useCategories } from '@/hooks/useCategories'

export default function KnowledgeHubPage() {
  const { t, language } = useTranslation()
  const { categoryId, tierId, subcategoryId } = useParams<{
    categoryId?: string
    tierId?: string
    subcategoryId?: string
  }>()
  const [selectedCategory, setSelectedCategory] =
    useState<string>('all-categories')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()

  // Fetch categories from API
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategoriesQuery('other', 'video', language)

  // Update selectedCategory when route params change
  useEffect(() => {
    if (categoryId && tierId && subcategoryId) {
      // If we have all params, we're viewing a specific product line's videos
      setSelectedCategory(subcategoryId)
    } else if (categoryId) {
      setSelectedCategory(categoryId)
    } else {
      setSelectedCategory('all-categories')
    }
  }, [categoryId, tierId, subcategoryId])

  // Map route category IDs to API category IDs
  const categoryMap: { [key: string]: string } = {
    'happy-dog': 'DOG',
    'happy-cat': 'CAT',
  }

  // Build API filters based on selected category
  const apiFilters = {
    page: 1,
    limit: 50,
    type: 'video' as const,
    categoryId:
      selectedCategory === 'all-categories'
        ? 'ALL'
        : categoryMap[selectedCategory] || undefined,
    ...(searchTerm && { search: searchTerm }),
    language,
  }

  // Fetch videos from API
  const { data: learningData, isLoading: isLoadingVideos } =
    useLearningKnowledgeQuery(apiFilters)

  // Fetch presigned URLs for videos
  const { items: videosWithPresignedUrls, isLoading: isLoadingPresignedUrls } =
    usePresignedUrls(learningData?.data?.items, !isLoadingVideos)

  const videos = videosWithPresignedUrls || []

  // Process categories using custom hook
  const categories = useCategories(categoriesResponse)

  // Memoized category click handler
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'happy-dog' || categoryId === 'happy-cat') {
      navigate(`/knowledge-hub/${categoryId}`)
    } else {
      setSelectedCategory(categoryId)
      navigate('/knowledge-hub')
    }
  }

  const memoizedHandleCategoryClick = useMemo(
    () => handleCategoryClick,
    [navigate]
  )

  // Get breadcrumb information
  const getBreadcrumb = () => {
    if (!categoryId || !tierId || !subcategoryId) return null

    const categoryName =
      categoryId === 'happy-dog'
        ? t('knowledgeHub.categories.happyDog')
        : t('knowledgeHub.categories.happyCat')

    const tierName =
      tierId === 'premium'
        ? t('knowledgeHub.premium')
        : t('knowledgeHub.superPremium')

    // Capitalize subcategory name
    const subcategoryName =
      subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1)

    return { categoryName, tierName, subcategoryName }
  }

  const breadcrumb = getBreadcrumb()

  // Skeleton loader component for initial page load
  if (categoriesLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px] mb-10">
          <div className="h-14 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
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
          <div className="lg:col-span-3">
            <VideoGridSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      {/* Breadcrumb - Show only when viewing specific product line videos */}
      {breadcrumb && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-lg">
              <button
                onClick={() => navigate('/knowledge-hub')}
                className="text-[#003863] hover:underline font-medium"
              >
                {t('knowledgeHub.categoriesTitle')}
              </button>
              <span className="text-gray-400">›</span>
              <button
                onClick={() => navigate(`/knowledge-hub/${categoryId}`)}
                className="text-[#003863] hover:underline font-medium"
              >
                {breadcrumb.categoryName}
              </button>
              <span className="text-gray-400">›</span>
              <button
                onClick={() =>
                  navigate(`/knowledge-hub/${categoryId}/${tierId}`)
                }
                className="text-[#003863] hover:underline font-medium"
              >
                {breadcrumb.tierName}
              </button>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600 font-medium">
                {breadcrumb.subcategoryName}
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <PageHeader
          title={t('header.knowledgeHub')}
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
              onCategoryClick={memoizedHandleCategoryClick}
            />
          </div>

          {/* Main Content - Video List */}
          <div className="lg:col-span-3">
            {isLoadingVideos || isLoadingPresignedUrls ? (
              <VideoGridSkeleton />
            ) : (
              <VideosGrid videos={videos} navigate={navigate} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
