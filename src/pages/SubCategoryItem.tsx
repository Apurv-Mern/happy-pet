import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

interface ProductLine {
  id: string
  name: string
  image?: string
}

interface SubCategory {
  id: string
  name: string
  product_flow: {
    step_name: string
    options: ProductLine[]
  }
  available_filters: any[]
}

interface Category {
  id: string
  name: string
  sub_categories: SubCategory[]
}

export default function SubCategoryItem() {
  const { categoryId, tierId } = useParams<{
    categoryId: string
    tierId: string
  }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Category data structure
  const categoriesData: Category[] = [
    {
      id: 'DOG',
      name: 'Dog',
      sub_categories: [
        {
          id: 'DOG_PREMIUM',
          name: 'Premium',
          product_flow: {
            step_name: 'product_line',
            options: [
              { id: 'NC', name: 'Naturcroq' },
              { id: 'NC_MINI', name: 'Naturcroq mini' },
            ],
          },
          available_filters: [],
        },
        {
          id: 'DOG_SUPER_PREMIUM',
          name: 'Super-Premium',
          product_flow: {
            step_name: 'product_line',
            options: [
              { id: 'SENSIBLE', name: 'sensible' },
              { id: 'FIT_VITAL', name: 'fit & vital' },
              { id: 'MINI_RANGE', name: 'mini range' },
              { id: 'MINI_XS', name: 'mini xs' },
              { id: 'SP_YOUNG', name: 'young' },
            ],
          },
          available_filters: [],
        },
      ],
    },
    {
      id: 'CAT',
      name: 'Cat',
      sub_categories: [
        {
          id: 'CAT_PREMIUM',
          name: 'Premium',
          product_flow: {
            step_name: 'product_line',
            options: [
              { id: 'MINKAS', name: 'minkas' },
              { id: 'MINKAS_DRINK', name: 'minkas drink' },
            ],
          },
          available_filters: [],
        },
        {
          id: 'CAT_SUPER_PREMIUM',
          name: 'Super-Premium',
          product_flow: {
            step_name: 'product_line',
            options: [
              { id: 'SP_YOUNG', name: 'young' },
              { id: 'CULINARY', name: 'culinary' },
              { id: 'INDOOR', name: 'indoor' },
              { id: 'SP_SENIOR', name: 'senior' },
              { id: 'CARE', name: 'care' },
              { id: 'STERLISED', name: 'sterlised' },
            ],
          },
          available_filters: [],
        },
      ],
    },
  ]

  // Get product lines based on categoryId and tierId
  const getProductLines = (): ProductLine[] => {
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

    if (!mappedCategoryId || !mappedTierId) return []

    // Find the category
    const category = categoriesData.find(cat => cat.id === mappedCategoryId)
    if (!category) return []

    // Find the subcategory (tier)
    const subCategoryId = `${mappedCategoryId}_${mappedTierId}`
    const subCategory = category.sub_categories.find(
      sub => sub.id === subCategoryId
    )

    return subCategory?.product_flow.options || []
  }

  const productLines = getProductLines()

  const categoryName =
    categoryId === 'happy-dog'
      ? t('knowledgeHub.categories.happyDog')
      : t('knowledgeHub.categories.happyCat')

  const tierName =
    tierId === 'premium'
      ? t('knowledgeHub.premium')
      : t('knowledgeHub.superPremium')

  // Categories for sidebar
  const categories = [
    { id: 'happy-cat', name: t('knowledgeHub.categories.happyCat') },
    { id: 'happy-dog', name: t('knowledgeHub.categories.happyDog') },
    { id: 'all-categories', name: t('knowledgeHub.categories.allCategories') },
  ]

  const handleSubCategoryClick = (productLineId: string) => {
    // Navigate to the videos list for this specific product line
    navigate(`/knowledge-hub/${categoryId}/${tierId}/${productLineId}`)
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
              {categoryName}
            </button>
            <span className="text-gray-400">›</span>
            <button
              onClick={() => navigate(`/knowledge-hub/${categoryId}`)}
              className="text-[#003863] hover:underline font-medium"
            >
              {tierName}
            </button>
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

          {/* Main Content - SubCategory Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productLines.map((productLine, index) => (
                <motion.div
                  key={productLine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleSubCategoryClick(productLine.id)}
                  className="relative rounded-[20px] overflow-hidden shadow-lg cursor-pointer group hover:shadow-2xl transition-all duration-300 h-[280px]"
                >
                  {/* Background Image */}
                  <div className="relative h-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  </div>

                  {/* Content Overlay - Bottom Left */}
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-2xl font-bold mb-2 capitalize">
                      {productLine.name}
                    </h3>
                  </div>

                  {/* Arrow Icon - Bottom Right */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:bg-white transition-colors">
                    <svg
                      className="w-5 h-5 text-[#003863]"
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
