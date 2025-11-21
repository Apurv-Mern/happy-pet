import { useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'

// Types
export interface ProductLineOption {
  id: string
  name: string
  count: number
}

export interface FilterOption {
  id: string
  name: string
  count: number
}

export interface Filter {
  filter_id: string
  name: string
  options: FilterOption[]
}

export interface ProductFlow {
  step_name: string
  options: ProductLineOption[]
}

export interface SubCategory {
  id: string
  name: string
  count: number
  product_flow: ProductFlow
  available_filters: Filter[]
}

export interface Category {
  id: string
  name: string
  count: number
  sub_categories: SubCategory[]
}

export interface CategoriesResponse {
  success: boolean
  message: string
  data: Category[]
}

// API Functions
export const categoryApi = {
  getCategories: async (
    itemType: string = 'other',
    contentType: string = 'document'
  ): Promise<CategoriesResponse> => {
    const { data } = await apiClient.get<CategoriesResponse>(
      `/v1/categories?itemType=${itemType}&contentType=${contentType}`
    )
    return data
  },
}

// React Query Hooks
export const useCategoriesQuery = (
  itemType: string = 'other',
  contentType: string = 'document'
) => {
  return useQuery({
    queryKey: ['categories', itemType, contentType],
    queryFn: () => categoryApi.getCategories(itemType, contentType),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
