import { useMemo } from 'react'
import { useTranslation } from '@/contexts/I18nContext'

interface Category {
  id: string
  name: string
  count: number
}

interface ApiCategory {
  id: string
  name: string
  count: number
}

interface ApiCategoriesResponse {
  data?: ApiCategory[]
}

/**
 * Custom hook to process and memoize categories for Learning Module and Knowledge Hub pages
 * @param categoriesResponse - API response containing categories
 * @returns Processed categories array with "all-categories" option and mapped IDs
 */
export function useCategories(
  categoriesResponse: ApiCategoriesResponse | undefined
): Category[] {
  const { t } = useTranslation()

  return useMemo(() => {
    return [
      {
        id: 'all-categories',
        name: t('knowledgeHub.categories.allCategories'),
        count:
          categoriesResponse?.data?.reduce((sum, cat) => sum + cat.count, 0) ||
          0,
      },
      ...(categoriesResponse?.data
        ?.filter(
          category =>
            category.id !== 'ALL_CATEGORIES' &&
            category.id !== 'all-categories' &&
            category.id !== 'ALL' &&
            !category.name?.toLowerCase().includes('all') &&
            !category.name?.toLowerCase().includes('alle')
        )
        ?.map(category => ({
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
  }, [categoriesResponse?.data, t])
}
