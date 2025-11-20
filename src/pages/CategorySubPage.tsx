import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

interface PremiumTier {
  id: string
  title: string
  image: string
  stars: number
}

export default function CategorySubPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Premium tiers - 2 main categories
  const premiumTiers: PremiumTier[] = [
    {
      id: 'premium',
      title: t('knowledgeHub.premium'),
      image: '/assets/images/premium-tier.jpg',
      stars: 4,
    },
    {
      id: 'super-premium',
      title: t('knowledgeHub.superPremium'),
      image: '/assets/images/super-premium-tier.jpg',
      stars: 5,
    },
  ]

  const categoryName =
    categoryId === 'happy-dog'
      ? t('knowledgeHub.categories.happyDog')
      : t('knowledgeHub.categories.happyCat')

  // Categories for sidebar
  const categories = [
    { id: 'happy-cat', name: t('knowledgeHub.categories.happyCat') },
    { id: 'happy-dog', name: t('knowledgeHub.categories.happyDog') },
    { id: 'all-categories', name: t('knowledgeHub.categories.allCategories') },
  ]

  const handlePremiumClick = (tierId: string) => {
    // Navigate to the videos page for this premium tier
    navigate(`/knowledge-hub/${categoryId}/${tierId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-lg">
            <button
              onClick={() => navigate('/knowledge-hub')}
              className="text-[#003863] hover:underline font-medium"
            >
              {t('knowledgeHub.categories.happyCat')}
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-[#003863] font-semibold">
              {t('knowledgeHub.premium')}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
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

            <div className="bg-[#E3E6ED] rounded-[15px] shadow-lg overflow-hidden">
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
            </div>
          </div>

          {/* Main Content - Premium Tiers Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {premiumTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  onClick={() => handlePremiumClick(tier.id)}
                  className="relative rounded-[30px] overflow-hidden shadow-xl cursor-pointer group hover:shadow-2xl transition-all duration-300 h-[320px]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>

                  {/* Content Overlay - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    {/* Premium Badge */}
                    <div className="bg-[#003863] text-white px-8 py-6 rounded-[20px] shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-3">
                        {[...Array(tier.stars)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-2xl">
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-3xl font-bold text-center mb-4">
                        {tier.title}
                      </h3>

                      {/* Button */}
                      <button className="w-full bg-white text-[#003863] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-lg">
                        {t('knowledgeHub.clickHere')}
                      </button>
                    </div>
                  </div>

                  {/* Corner Arrow Icon */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
