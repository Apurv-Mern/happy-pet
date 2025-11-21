import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'

interface PremiumTier {
  id: string
  name: string
  stars: number
  image: string
  count: number
}

export default function LearningModuleCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Fetch categories from API with contentType=document
  const { data: categoriesResponse, isLoading } = useCategoriesQuery(
    'other',
    'document'
  )

  // Map route params to API category IDs
  const categoryMap: { [key: string]: string } = {
    'happy-dog': 'DOG',
    'happy-cat': 'CAT',
  }

  const mappedCategoryId = categoryMap[categoryId || '']

  // Get premium tiers dynamically from API
  const getPremiumTiers = (): PremiumTier[] => {
    if (!categoriesResponse?.data || !mappedCategoryId) return []

    const category = categoriesResponse.data.find(
      cat => cat.id === mappedCategoryId
    )
    if (!category) return []

    return category.sub_categories.map(subCategory => ({
      id: subCategory.id.includes('PREMIUM') ? 'premium' : 'super-premium',
      name: subCategory.name,
      stars: subCategory.id.includes('SUPER_PREMIUM') ? 5 : 4,
      image: '/assets/images/premium-tier.png',
      count: subCategory.count,
    }))
  }

  const premiumTiers = getPremiumTiers()

  const categoryName =
    categoryId === 'happy-dog'
      ? t('knowledgeHub.categories.happyDog')
      : t('knowledgeHub.categories.happyCat')

  const handleTierClick = (tierId: string) => {
    navigate(`/learning-module/${categoryId}/${tierId}`)
  }

  // Loading state
  if (isLoading) {
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
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-[1px] border-[#003860] pb-5">
          <div className="flex items-center gap-[35px] text-lg">
            <button
              onClick={() => navigate('/learning-module')}
              className="text-[#003863] text-[55px] heading-line"
            >
              {t('header.learningModule')}
            </button>
            <span className="">
              <svg
                width="13"
                height="20"
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
            <h1 className="text-[#003863] text-[55px] heading-line">
              {categoryName}
            </h1>
          </div>
          <div className="about-image">
            <div className="w-full max-w-[380px] bg-[#003863] rounded-[15px] px-4 py-3 flex items-center">
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

        {/* Premium Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 max-w-4xl mx-auto">
          {premiumTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleTierClick(tier.id)}
              className="relative rounded-[20px] overflow-hidden cursor-pointer group"
            >
              {/* Background Image */}
              <div className="relative aspect-[4/3]">
                <img
                  className="w-full h-full object-cover"
                  src={tier.image}
                  alt={tier.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003863]/80 via-[#003863]/30 to-transparent"></div>
              </div>

              {/* Star Badge - Top Center */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-2">
                  {Array.from({ length: tier.stars }).map((_, i) => (
                    <svg
                      key={i}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Content Overlay - Bottom */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-[28px] font-semibold mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-white/90 text-[16px]">
                      {tier.count} {tier.count === 1 ? 'Document' : 'Documents'}
                    </p>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform">
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
