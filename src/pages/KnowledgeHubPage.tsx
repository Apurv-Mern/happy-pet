import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLearningModulesQuery } from '@/api/learningModule'
import { useTranslation } from '@/contexts/I18nContext'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
}

interface Category {
  id: string
  name: string
  count: number
}

export default function KnowledgeHubPage() {
  const { t } = useTranslation()
  const { categoryId, tierId, subcategoryId } = useParams<{
    categoryId?: string
    tierId?: string
    subcategoryId?: string
  }>()
  const [selectedCategory, setSelectedCategory] =
    useState<string>('all-categories')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const itemsPerPage = 8

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

  const videos: Video[] = [
    {
      id: '1',
      title: "There's nothing quite like the pure joy of a happy dog",
      description:
        "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.",
      thumbnail: '/path-to-dog-video-thumbnail.jpg',
      category: 'happy-dog',
    },
    {
      id: '2',
      title: "There's nothing quite like the pure joy of a happy dog",
      description:
        "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.",
      thumbnail: '/path-to-dog-video-thumbnail-2.jpg',
      category: 'happy-dog',
    },
    {
      id: '3',
      title: "There's nothing quite like the pure joy of a happy dog",
      description:
        "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment.",
      thumbnail: '/path-to-dog-video-thumbnail-3.jpg',
      category: 'happy-dog',
    },
    {
      id: '4',
      title: "There's nothing quite like the pure joy of a happy dog",
      description:
        "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment.",
      thumbnail: '/path-to-dog-video-thumbnail-4.jpg',
      category: 'happy-dog',
    },
  ]
  // Define categories with translation keys
  const categories: Category[] = [
    { id: 'happy-dog', name: t('knowledgeHub.categories.happyDog'), count: 24 },
    { id: 'happy-cat', name: t('knowledgeHub.categories.happyCat'), count: 18 },
    {
      id: 'all-categories',
      name: t('knowledgeHub.categories.allCategories'),
      count: 42,
    },
  ]

  const { data: response, isLoading } = useLearningModulesQuery(
    currentPage,
    itemsPerPage,
    'video'
  )

  // const videos = response?.data?.content || []
  const pagination = response?.data?.pagination
  const totalPages = pagination?.totalPages || 1

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mx-auto mb-4"></div>
          <p className="text-gray-600">{t('knowledgeHub.loadingVideos')}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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

      <div className="">
        <div>
            <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px]">
              <h2 className="text-[#003863] text-[55px] heading-line">
                {breadcrumb
                  ? breadcrumb.subcategoryName
                  : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              {/* <button
                onClick={() => navigate('/knowledge-hub')}
                className="bg-[#003860] text-white text-lg font-medium px-5 py-2 rounded-[15px] hover:bg-[#004C82] transition"
              >
                {t('knowledgeHub.viewAllCategories')}
              </button> */}
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
            <div className="bg-[#E3E6ED] rounded-[15px] shadow-lg overflow-hidden top-4">
              <div className="bg-[#003863] text-white px-4 py-4 rounded-[15px]">
                <h2 className="text-xl font-bold">
                  {t('knowledgeHub.categoriesTitle')}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (
                        category.id === 'happy-dog' ||
                        category.id === 'happy-cat'
                      ) {
                        // Navigate to subcategory page
                        navigate(`/knowledge-hub/${category.id}`)
                      } else {
                        setSelectedCategory(category.id)
                        setCurrentPage(1)
                      }
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-[#D0D2D9]  rounded-br-[15px] rounded-bl-[15px] ${
                      selectedCategory === category.id ? '' : ''
                    }`}
                  >
                    <span className="text-[#003863] text-[18px] font-semibold">
                      {category.name}
                    </span>
                    {/* <ChevronRight className="h-5 w-5 text-gray-400" /> */}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Video List */}
          <div className="lg:col-span-3">
            {/* Category Title */}
            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-6">
              {videos.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">
                    {t('knowledgeHub.noVideosAvailable')}
                  </p>
                </div>
              ) : (
                videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => navigate(`/video/${video.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="bg-[#E3E6ED] rounded-[10px] h-full p-6">
                      <div className="relative group cursor-pointer">
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#e1eef4]">
                              <Play className="h-12 w-12 text-[#003863]" />
                            </div>
                          )}
                          <div className="absolute rounded-[10px] inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play
                                className="h-8 w-8 text-[#003863] ml-1"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                          <h3 className="text-xl font-bold text-[#003863] mb-2 mt-2">
                            {video.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="rounded-lg bg-[#3D4760] text-[#fff]"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? 'bg-[#003863] text-white hover:bg-[#002d4d]'
                      : 'bg-white text-[#003863] border border-[#003863]'
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                onClick={() =>
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                variant="outline"
                className="rounded-lg bg-[#3D4760] text-[#fff]"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
