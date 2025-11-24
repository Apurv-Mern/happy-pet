import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery, Filter } from '@/api/categories'
import { useState } from 'react'
import {
  useLearningKnowledgeQuery,
  usePresignedUrls,
} from '@/api/learningModule'

export default function SubCategoryItem() {
  const { categoryId, tierId, subcategoryId } = useParams<{
    categoryId: string
    tierId: string
    subcategoryId?: string
  }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Filter state
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all')
  const [selectedFoodType, setSelectedFoodType] = useState<string>('all')
  const [appliedFilters, setAppliedFilters] = useState<{
    ageGroup?: string
    typeOfFood?: string
  }>({})

  // Fetch categories from API
  const { data: categoriesResponse, isLoading } = useCategoriesQuery()

  // Map route params to API category IDs
  const categoryMap: { [key: string]: string } = {
    'happy-dog': 'DOG',
    'happy-cat': 'CAT',
  }

  const tierMap: { [key: string]: string } = {
    premium: 'PREMIUM',
    'super-premium': 'SUPER_PREMIUM',
  }

  const mappedCategoryId = categoryMap[categoryId || '']
  const mappedTierId = tierMap[tierId || '']
  const subCategoryId =
    mappedCategoryId && mappedTierId
      ? `${mappedCategoryId}_${mappedTierId}`
      : undefined

  // Check if we're viewing a specific product line (subcategory)
  const isViewingProductLine = !!subcategoryId

  // Build filters for API call
  const apiFilters = isViewingProductLine
    ? {
        page: 1,
        limit: 12,
        type: 'video' as const,
        categoryId: mappedCategoryId,
        subCategoryId: subCategoryId,
        productFlowIds: subcategoryId,
        ...(appliedFilters.ageGroup && appliedFilters.ageGroup !== 'all'
          ? { ageGroup: appliedFilters.ageGroup }
          : {}),
        ...(appliedFilters.typeOfFood && appliedFilters.typeOfFood !== 'all'
          ? { typeOfFood: appliedFilters.typeOfFood }
          : {}),
      }
    : {}

  // Fetch learning knowledge data when viewing product line with filters
  const { data: learningData, isLoading: isLoadingData } =
    useLearningKnowledgeQuery(isViewingProductLine ? apiFilters : {})

  // Fetch presigned URLs for videos
  const { items: videosWithPresignedUrls, isLoading: isLoadingPresignedUrls } =
    usePresignedUrls(
      learningData?.data?.items,
      !isLoadingData && isViewingProductLine
    )

  const videos = videosWithPresignedUrls || []

  // Get product lines based on categoryId and tierId
  const getProductLines = () => {
    if (!categoriesResponse?.data) return []

    const mappedCategoryId = categoryMap[categoryId || '']
    const mappedTierId = tierMap[tierId || '']

    if (!mappedCategoryId || !mappedTierId) return []

    // Find the category
    const category = categoriesResponse.data.find(
      cat => cat.id === mappedCategoryId
    )
    if (!category) return []

    // Find the subcategory (tier)
    const subCategoryId = `${mappedCategoryId}_${mappedTierId}`
    const subCategory = category.sub_categories.find(
      sub => sub.id === subCategoryId
    )

    return subCategory?.product_flow.options || []
  }

  // Get available filters from API for the selected subcategory
  const getAvailableFilters = (): Filter[] => {
    if (!categoriesResponse?.data) return []

    const mappedCategoryId = categoryMap[categoryId || '']
    const mappedTierId = tierMap[tierId || '']

    if (!mappedCategoryId || !mappedTierId) return []

    const category = categoriesResponse.data.find(
      cat => cat.id === mappedCategoryId
    )
    if (!category) return []

    const subCategoryId = `${mappedCategoryId}_${mappedTierId}`
    const subCategory = category.sub_categories.find(
      sub => sub.id === subCategoryId
    )

    return subCategory?.available_filters || []
  }

  const productLines = getProductLines()
  const availableFilters = getAvailableFilters()

  // Extract specific filters
  const ageGroupFilter = availableFilters.find(
    filter => filter.filter_id === 'age_group'
  )
  const foodTypeFilter = availableFilters.find(
    filter => filter.filter_id === 'type_of_food'
  )

  // Handle filter actions
  const handleApplyFilters = () => {
    setAppliedFilters({
      ageGroup: selectedAgeGroup !== 'all' ? selectedAgeGroup : undefined,
      typeOfFood: selectedFoodType !== 'all' ? selectedFoodType : undefined,
    })
  }

  const handleResetFilters = () => {
    setSelectedAgeGroup('all')
    setSelectedFoodType('all')
    setAppliedFilters({})
  }

  const categoryName =
    categoryId === 'happy-dog'
      ? t('knowledgeHub.categories.happyDog')
      : t('knowledgeHub.categories.happyCat')

  const tierName =
    tierId === 'premium'
      ? t('knowledgeHub.premium')
      : t('knowledgeHub.superPremium')

  const handleSubCategoryClick = (productLineId: string) => {
    // Navigate to the videos list for this specific product line
    navigate(`/knowledge-hub/${categoryId}/${tierId}/${productLineId}`)
  }

  // Loading state
  if (
    isLoading ||
    (isViewingProductLine && (isLoadingData || isLoadingPresignedUrls))
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-[1px] border-[#003860] pb-5">
          <div className="flex items-center gap-[25px] text-lg">
            <button
              onClick={() => navigate('/knowledge-hub')}
              className="text-[#003863] text-[28px] heading-line"
            >
              {categoryName}
            </button>
            <span className="">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 18.5L10.5 10L1.5 1.5"
                  stroke="#003863"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <button
              onClick={() => navigate(`/knowledge-hub/${categoryId}`)}
              className="text-[#003863] text-[28px] heading-line"
            >
              {tierName}
            </button>
            {isViewingProductLine && subcategoryId && (
              <>
                <span className="">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 18.5L10.5 10L1.5 1.5"
                      stroke="#003863"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#003863] text-[28px] heading-line">
                  {productLines.find(pl => pl.id === subcategoryId)?.name ||
                    subcategoryId}
                </span>
              </>
            )}
          </div>
          <div className="about-image">
            <div className="w-full max-w-[380px] bg-[#003863] rounded-full px-4 py-3 flex items-center">
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
        {/* Filters Section - Only show when viewing product line videos */}
        {isViewingProductLine && (
          <div className='bg-white p-5 shadow-lg rounded-lg mt-5'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Age Group */}
              {ageGroupFilter && (
                <div className="w-full">
                  <label className="text-[#003863] font-semibold block mb-1">
                    Age Group
                  </label>
                  <div className="relative h-[50px]">
                    <select
                      value={selectedAgeGroup}
                      onChange={e => setSelectedAgeGroup(e.target.value)}
                      className="appearance-none w-full h-full bg-white border-2 border-[#003863] text-[#003863] rounded-[10px] px-4 pr-10 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All</option>
                      {ageGroupFilter.options.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} ({option.count})
                        </option>
                      ))}
                    </select>

                    {/* Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="#003863" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Food Type */}
              {foodTypeFilter && (
                <div className="w-full">
                  <label className="text-[#003863] font-semibold block mb-1">
                    Type of Food
                  </label>
                  <div className="relative h-[50px]">
                    <select
                      value={selectedFoodType}
                      onChange={e => setSelectedFoodType(e.target.value)}
                      className="appearance-none w-full h-full bg-white border-2 border-[#003863] text-[#003863] rounded-[10px] px-4 pr-10 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All</option>
                      {foodTypeFilter.options.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} ({option.count})
                        </option>
                      ))}
                    </select>

                    {/* Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="#003863" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Apply */}
              <div className="w-full h-[50px] flex items-end">
                <button
                  onClick={handleApplyFilters}
                  className="bg-[#003863] text-white w-full h-full rounded-[10px] font-semibold hover:bg-[#004c82] transition"
                >
                  Apply
                </button>
              </div>

              {/* Reset */}
              <div className="w-full h-[50px] flex items-end">
                <button
                  onClick={handleResetFilters}
                  className="bg-[#E3E6ED] text-[#003863] w-full h-full border-2 border-[#003863] rounded-[10px] font-semibold hover:bg-[#004c82] hover:text-[#fff] transition"
                >
                  Reset
                </button>
              </div>

            </div>
          </div>
        )}
        
        

        <div className="">
          {/* Main Content - Product Lines Grid or Videos Grid */}
          <div className="">
            {isViewingProductLine ? (
              // Video Grid
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                {videos.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-600">No videos available</p>
                  </div>
                ) : (
                  videos.map((video: any, index: number) => (
                    <div>

                    <motion.div
                      key={video.id || video._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => {
                        if (video.presignedFileUrl) {
                          window.open(video.presignedFileUrl, '_blank')
                        } else {
                          navigate(`/video/${video.id || video._id}`)
                        }
                      }}
                      className=" relative rounded-[20px] overflow-hidden cursor-pointer group"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative aspect-video">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            video.presignedThumbnailUrl ||
                            video.thumbnailUrl ||
                            video.thumbnail ||
                            '/assets/images/cat.png'
                          }
                          alt={video.title}
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <svg
                              width="24"
                              height="28"
                              viewBox="0 0 24 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 2L22 14L2 26V2Z"
                                fill="#003863"
                                stroke="#003863"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Video Title */}
                      <div className="bg-white p-4">
                        <h3 className="text-[#003863] text-[16px] font-semibold line-clamp-2">
                          {video.title}
                        </h3>
                      </div>
                    </motion.div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Product Lines Grid
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                {productLines.map((productLine, index) => (
                  <motion.div
                    key={productLine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => handleSubCategoryClick(productLine.id)}
                    className="relative rounded-[20px] overflow-hidden cursor-pointer"
                  >
                    {/* Background Image */}
                    <div className="relative">
                      <div className="">
                        <img
                          className="w-full"
                          src="/assets/images/cat.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003863]/80 via-[#003863]/30 to-transparent"></div>
                    </div>

                    {/* Content Overlay - Bottom Left */}
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-white text-[24px] font-semibold">
                        {productLine.name}
                      </h3>
                    </div>

                    {/* Arrow Icon - Bottom Right */}
                    <div className="absolute bottom-6 right-6">
                      <svg
                        width="26"
                        height="25"
                        viewBox="0 0 26 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0225 12.4706L21.7255 11.7595L22.4448 12.4706L21.7255 13.1818L21.0225 12.4706ZM5.25556 13.4706C4.70327 13.4706 4.25555 13.0229 4.25555 12.4706C4.25555 11.9184 4.70327 11.4706 5.25556 11.4706V12.4706V13.4706ZM14.7157 6.23535L15.4188 5.52423L21.7255 11.7595L21.0225 12.4706L20.3194 13.1818L14.0126 6.94648L14.7157 6.23535ZM21.0225 12.4706L21.7255 13.1818L15.4188 19.4171L14.7157 18.7059L14.0126 17.9948L20.3194 11.7595L21.0225 12.4706ZM21.0225 12.4706V13.4706H5.25556V12.4706V11.4706H21.0225V12.4706Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
