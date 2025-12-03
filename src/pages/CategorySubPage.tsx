import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useCategoriesQuery } from '@/api/categories'

interface PremiumTier {
  id: string
  title: string
  image: string
  stars: number
  count: number
}

export default function CategorySubPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Fetch categories from API
  const { data: categoriesResponse, isLoading } = useCategoriesQuery()

  // Get premium tiers dynamically from API
  const getPremiumTiers = (): PremiumTier[] => {
    if (!categoriesResponse?.data) return []

    const categoryMap: { [key: string]: string } = {
      'happy-dog': 'DOG',
      'happy-cat': 'CAT',
    }

    const mappedCategoryId = categoryMap[categoryId || '']
    if (!mappedCategoryId) return []

    const category = categoriesResponse.data.find(
      cat => cat.id === mappedCategoryId
    )
    if (!category) return []

    // Map subcategories to premium tiers
    return category.sub_categories.map(sub => {
      const tierName = sub.name.toLowerCase()
      return {
        id: tierName === 'premium' ? 'premium' : 'super-premium',
        title: sub.name,
        image:
          tierName === 'premium'
            ? '/assets/images/premium-tier.jpg'
            : '/assets/images/super-premium-tier.jpg',
        stars: tierName === 'premium' ? 4 : 5,
        count: sub.count,
      }
    })
  }

  const premiumTiers = getPremiumTiers()

  const handlePremiumClick = (tierId: string) => {
    // Navigate to the videos page for this premium tier
    navigate(`/knowledge-hub/${categoryId}/${tierId}`)
  }

  // Skeleton loader for loading state
  if (isLoading) {
    return (
      <div className="container mx-auto animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-[1px] border-gray-200 pb-5 mb-10">
          <div className="flex items-center gap-[35px]">
            <div className="h-14 bg-gray-200 rounded w-48"></div>
            <div className="h-8 bg-gray-200 rounded w-8"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="mb-12">
          <div className="h-12 bg-gray-200 rounded w-72"></div>
        </div>

        {/* Premium tiers grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2].map(i => (
            <div key={i} className="bg-[#E3E6ED] rounded-[10px] p-8">
              <div className="aspect-video bg-gray-300 rounded-xl mb-6"></div>
              <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <div key={star} className="w-6 h-6 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
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
      {/* Breadcrumb */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-[1px] border-[#003860] pb-5">
          <div className="flex items-center gap-[25px] text-lg">
            <button
              onClick={() => navigate('/knowledge-hub')}
              className="text-[#003863] text-[28px] heading-line"
            >
              {t('knowledgeHub.categories.happyCat')}
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
            <span className="text-[#003863] text-[28px] heading-line">
              {t('knowledgeHub.premium')}
            </span>
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
        <div className="">
          {/* Sidebar - Categories */}
          {/* <div className="bg-[#E3E6ED] rounded-[15px] h-full max-h-[250px]">
              <div className="bg-[#003863] text-white px-4 py-4 rounded-t-[15px]">
                <h2 className="text-xl font-bold">
                  {t('knowledgeHub.categoriesTitle')}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (category.id === 'all-categories') {
                        navigate('/knowledge-hub')
                      } else {
                        navigate(`/knowledge-hub/${category.id}`)
                      }
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-[#d0d0d0] transition ${
                      categoryId === category.id ? 'bg-[#d0d0d0]' : ''
                    }`}
                  >
                    <span className="text-[#000] text-[18px] font-semibold">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

          {/* Main Content - Premium Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[50px] lg:gap-[120px] mt-16">
            {premiumTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                onClick={() => handlePremiumClick(tier.id)}
                className="relative overflow-hidden  cursor-pointer group transition-all duration-300"
              >
                {/* Background Image */}
                <div className="relative h-full overflow-hidden">
                  {/* <img
                      src={tier.image}
                      alt={tier.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={e => {
                        // Fallback to placeholder
                        e.currentTarget.src = '/assets/images/placeholder.jpg'
                      }}
                    /> */}
                  {/* Dark Overlay */}
                  <img
                    className="h-full max-h-[550px] object-cover w-full rounded-[20px] border-[2px] border-[#003863]"
                    src="/assets/images/dog.png"
                    alt=""
                  />
                </div>

                {/* Content Overlay - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 h-full max-h-[550px]">
                  {/* Premium Badge */}
                  <div className="bg-[#003863]/90 w-full max-w-[300px] text-white px-8 py-6 rounded-[20px] transform group-hover:scale-105 transition-transform duration-300">
                    {/* Stars */}
                    <div className="flex justify-center gap-1">
                      {[...Array(tier.stars)].map((_, i) => (
                        <span key={i} className="text-[#fff] text-2xl">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.9659 7.61562C11.649 5.92717 11.9906 5.08295 12.5455 4.96595C12.6914 4.93518 12.8422 4.93518 12.9882 4.96595C13.5431 5.08295 13.8846 5.92717 14.5678 7.61562C14.9562 8.5758 15.1505 9.05589 15.5139 9.38243C15.6159 9.47402 15.7265 9.5556 15.8444 9.626C16.2645 9.87703 16.7889 9.92359 17.8377 10.0167C19.6131 10.1744 20.5008 10.2532 20.7719 10.755C20.8281 10.8589 20.8663 10.9715 20.8849 11.0879C20.9747 11.6502 20.3221 12.2388 19.0169 13.4161L18.6545 13.7431C18.0442 14.2935 17.7391 14.5687 17.5627 14.9121C17.4568 15.1182 17.3858 15.34 17.3526 15.5689C17.2971 15.9504 17.3865 16.3497 17.5651 17.1481L17.629 17.4334C17.9494 18.8654 18.1097 19.5814 17.9097 19.9333C17.73 20.2494 17.3991 20.4518 17.0335 20.4691C16.6265 20.4884 16.0531 20.0251 14.9062 19.0986C14.1506 18.4881 13.7728 18.1829 13.3533 18.0637C12.9701 17.9547 12.5636 17.9547 12.1803 18.0637C11.7609 18.1829 11.3831 18.4881 10.6275 19.0986C9.4806 20.0251 8.90715 20.4884 8.50018 20.4691C8.13461 20.4518 7.80368 20.2494 7.62402 19.9333C7.424 19.5814 7.58423 18.8654 7.90468 17.4334L7.96853 17.1481C8.14722 16.3497 8.23656 15.9504 8.18112 15.5689C8.14786 15.34 8.07688 15.1182 7.97101 14.9121C7.79454 14.5687 7.48943 14.2935 6.87922 13.7431L6.51676 13.4161C5.21154 12.2388 4.55893 11.6502 4.6488 11.0879C4.66742 10.9715 4.70559 10.8589 4.76174 10.755C5.03283 10.2532 5.92055 10.1744 7.696 10.0167C8.74481 9.92359 9.26922 9.87703 9.6893 9.626C9.80713 9.5556 9.91779 9.47402 10.0197 9.38243C10.3832 9.05589 10.5774 8.5758 10.9659 7.61562Z"
                              fill="white"
                              stroke="white"
                              stroke-width="2"
                            />
                          </svg>
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[32px] font-semibold text-center mb-3">
                      {tier.title}
                    </h3>

                    {/* Button */}
                    <button className="w-full bg-white text-[#003863] px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition text-lg">
                      {t('knowledgeHub.clickHere')}
                    </button>
                  </div>
                </div>

                {/* Corner Arrow Icon */}
                {/* <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div> */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
