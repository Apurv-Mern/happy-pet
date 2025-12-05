import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery, Filter } from '@/api/categories'
import { useState } from 'react'
import { X } from 'lucide-react'

import {
  useLearningKnowledgeQuery,
  usePresignedUrlForViewingMutation,
  usePresignedUrls,
} from '@/api/learningModule'

export default function LearningModuleSubCategoryPage() {
  const { categoryId, tierId, subcategoryId } = useParams<{
    categoryId: string
    tierId: string
    subcategoryId?: string
  }>()
  const { t, language } = useTranslation()
  const navigate = useNavigate()

  // Filter state
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all')
  const [selectedFoodType, setSelectedFoodType] = useState<string>('all')
  const [appliedFilters, setAppliedFilters] = useState<{
    ageGroup?: string
    typeOfFood?: string
  }>({})

  // Modal state for description
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // Modal state for viewing document
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingDocument, setViewingDocument] = useState<any>(null)
  const [documentUrl, setDocumentUrl] = useState<string>('')
  const [isLoadingContent, setIsLoadingContent] = useState(false)

  // Fetch categories from API with contentType=document
  const { data: categoriesResponse, isLoading } = useCategoriesQuery(
    'other',
    'document',
    language
  )

  console.log({ categoriesResponse })

  const { mutate: fetchPresignedUrl } = usePresignedUrlForViewingMutation()

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
        type: 'document' as const,
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

  // Fetch presigned URLs for documents
  const {
    items: documentsWithPresignedUrls,
    isLoading: isLoadingPresignedUrls,
  } = usePresignedUrls(
    learningData?.data?.items,
    !isLoadingData && isViewingProductLine
  )

  const documents = documentsWithPresignedUrls || []

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

  const handleView = (document: any) => {
    setViewingDocument(document)
    setIsViewModalOpen(true)
    setIsLoadingContent(true)

    // If presignedFileUrl is already available, use it directly
    if (document.presignedFileUrl) {
      setDocumentUrl(document.presignedFileUrl)
      setIsLoadingContent(false)
      return
    }

    // Fallback: fetch presigned URL if not available
    const fileUrl = document.fileUrl
    if (!fileUrl) {
      console.error('No fileUrl available', document)
      setDocumentUrl('')
      setIsLoadingContent(false)
      return
    }

    fetchPresignedUrl(String(fileUrl), {
      onSuccess: resp => {
        const url = resp?.data?.presignedUrl
        if (!url) {
          console.error('Presigned URL missing in response', resp)
          setDocumentUrl('')
          setIsLoadingContent(false)
          return
        }

        setDocumentUrl(url)
        setIsLoadingContent(false)
      },
      onError: () => {
        console.error('Failed to fetch presigned URL')
        setDocumentUrl('')
        setIsLoadingContent(false)
      },
    })
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setViewingDocument(null)
    setDocumentUrl('')
    setIsLoadingContent(false)
  }

  const handleDownload = (document: any) => {
    const blob = new Blob([document.content || ''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${document.title}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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
    // Navigate to the documents list for this specific product line
    navigate(`/learning-module/${categoryId}/${tierId}/${productLineId}`)
  }

  const handleReadMore = (document: any) => {
    setSelectedDocument(document)
    setIsDescriptionModalOpen(true)
  }

  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false)
    setSelectedDocument(null)
  }

  // Truncate text to 3 lines (approximately 120-150 characters)
  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return 'No description available'
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Skeleton loader for loading state
  if (
    isLoading ||
    (isViewingProductLine && (isLoadingData || isLoadingPresignedUrls))
  ) {
    return (
      <div className="container mx-auto animate-pulse">
        {/* Header skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-[1px] border-gray-200 pb-5 mb-10">
          <div className="flex items-center gap-[35px]">
            <div className="h-14 bg-gray-200 rounded w-48"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-96 ml-auto"></div>
        </div>

        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-4"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>

        {/* Title skeleton */}
        <div className="mb-10">
          <div className="h-12 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-96"></div>
        </div>

        {/* Document grid skeleton */}
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
          <div className="sm:flex md:flex lg:flex items-center gap-[25px] text-lg">
            <button
              onClick={() => navigate('/learning-module')}
              className="text-[#003863] text-[28px] heading-line"
            >
              {t('header.learningModule')}
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
              onClick={() => navigate(`/learning-module/${categoryId}`)}
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
              onClick={() =>
                navigate(`/learning-module/${categoryId}/${tierId}`)
              }
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

        {/* Filters Section - Only show when viewing product line documents */}
        {isViewingProductLine && (
          <div className="bg-white p-5 shadow-lg rounded-lg mt-5">
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
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="#003863"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
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
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="#003863"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
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
          {/* Main Content - Product Lines Grid or Documents Grid */}
          <div className="">
            {isViewingProductLine ? (
              // Document Grid
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                {documents.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-600">No documents available</p>
                  </div>
                ) : (
                  documents.map((document: any, index: number) => (
                    <motion.div
                      key={document.id || document._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-[#E3E6ED] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Document Icon */}
                        <div className="flex-shrink-0">
                          <div className="border-2 border-[#003863] rounded-full p-3">
                            <svg
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="7.33301"
                                y="5.86401"
                                width="20.5314"
                                height="24.9218"
                                rx="2"
                                stroke="#003863"
                                stroke-width="2"
                              />
                              <path
                                d="M13.1992 13.1938H21.9984"
                                stroke="#003863"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M13.1992 19.0579H21.9984"
                                stroke="#003863"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M13.1992 24.9219H19.0653"
                                stroke="#003863"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-[#003863] mb-2">
                            {document.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                            {truncateText(
                              document.content || document.description || ''
                            )}
                          </p>

                          {/* Read More Button - Only show if text is longer than truncation */}
                          {(document.content || document.description || '')
                            .length > 150 && (
                            <button
                              onClick={() => handleReadMore(document)}
                              className="text-[#003863] text-sm font-semibold hover:underline mb-3"
                            >
                              Read more
                            </button>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleView(document)}
                              className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#fff] rounded-full px-4 py-2 text-sm font-medium transition-colors"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.59863 7.39697C10.8138 7.39697 11.7987 8.38148 11.7988 9.59521C11.7988 10.8091 10.8138 11.7944 9.59863 11.7944C8.38364 11.7942 7.39941 10.8089 7.39941 9.59521C7.39957 8.38164 8.38374 7.39724 9.59863 7.39697Z"
                                  stroke="#003860"
                                  stroke-width="2"
                                />
                                <path
                                  d="M15.9751 8.53651C16.3677 8.99697 16.564 9.2272 16.564 9.59564C16.564 9.96407 16.3677 10.1943 15.9751 10.6548C14.7704 12.0677 12.3671 14.3934 9.59875 14.3934C6.83044 14.3934 4.42706 12.0677 3.2224 10.6548C2.82981 10.1943 2.63351 9.96407 2.63351 9.59564C2.63351 9.2272 2.82981 8.99697 3.2224 8.53651C4.42706 7.12359 6.83044 4.79785 9.59875 4.79785C12.3671 4.79785 14.7704 7.12359 15.9751 8.53651Z"
                                  stroke="#003860"
                                  stroke-width="2"
                                />
                              </svg>
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(document)}
                              className="flex items-center text-[#003863] gap-2 bg-[#fff] border border-[#003863] hover:bg-[#fff] rounded-full px-4 py-2 text-sm font-medium transition-colors"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.59924 11.1948L8.89226 11.9021L9.59924 12.6088L10.3062 11.9021L9.59924 11.1948ZM10.5992 3.99815C10.5992 3.44586 10.1515 2.99815 9.59924 2.99815C9.04696 2.99815 8.59924 3.44586 8.59924 3.99815L9.59924 3.99815L10.5992 3.99815ZM5.59961 7.19667L4.89263 7.90391L8.89226 11.9021L9.59924 11.1948L10.3062 10.4876L6.30659 6.48943L5.59961 7.19667ZM9.59924 11.1948L10.3062 11.9021L14.3058 7.90391L13.5989 7.19667L12.8919 6.48943L8.89226 10.4876L9.59924 11.1948ZM9.59924 11.1948L10.5992 11.1948L10.5992 3.99815L9.59924 3.99815L8.59924 3.99815L8.59924 11.1948L9.59924 11.1948Z"
                                  fill="#003863"
                                />
                                <path
                                  d="M4 12.7942L4 13.5938C4 14.4771 4.71628 15.1931 5.59985 15.1931L13.5991 15.1931C14.4827 15.1931 15.199 14.4771 15.199 13.5938V12.7942"
                                  stroke="#003863"
                                  stroke-width="2"
                                />
                              </svg>
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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

      {/* Description Modal */}
      {isDescriptionModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-[#003863] text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold pr-8">
                {selectedDocument.title}
              </h2>
              <button
                onClick={closeDescriptionModal}
                className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                {selectedDocument.content ||
                  selectedDocument.description ||
                  'No description available'}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={closeDescriptionModal}
                className="bg-[#003863] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004c82] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* View Document Modal */}
      {isViewModalOpen && viewingDocument && (
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
              <h2 className="text-2xl font-bold pr-8">
                {viewingDocument.title}
              </h2>
              <button
                onClick={closeViewModal}
                className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-hidden max-h-[calc(85vh-180px)]">
              {isLoadingContent ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863]"></div>
                </div>
              ) : documentUrl ? (
                <iframe
                  src={documentUrl}
                  className="w-full h-[calc(85vh-180px)] border-0"
                  title={viewingDocument.title}
                />
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
                onClick={() => handleDownload(viewingDocument)}
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
