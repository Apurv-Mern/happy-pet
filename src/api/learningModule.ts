import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'
import { LearningModulesResponse, PresignedUrlResponse } from '@/types'

export type ContentType = 'document' | 'video'

export interface LearningKnowledgeFilters {
  page?: number
  limit?: number
  type?: ContentType
  categoryId?: string
  subCategoryId?: string
  productFlowIds?: string
  ageGroup?: string
  typeOfFood?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const learningModuleApi = {
  getLearningModules: async (
    page: number,
    limit: number,
    type?: ContentType
  ): Promise<LearningModulesResponse> => {
    const typeParam = type ? `&type=${type}` : ''
    const { data } = await apiClient.get<LearningModulesResponse>(
      `web/v1/content?page=${page}&limit=${limit}${typeParam}`
    )
    return data
  },

  getLearningKnowledge: async (
    filters: LearningKnowledgeFilters
  ): Promise<LearningModulesResponse> => {
    const params = new URLSearchParams()

    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    if (filters.type) params.append('type', filters.type)
    if (filters.categoryId) params.append('categoryId', filters.categoryId)
    if (filters.subCategoryId)
      params.append('subCategoryId', filters.subCategoryId)
    if (filters.productFlowIds)
      params.append('productFlowIds', filters.productFlowIds)
    if (filters.ageGroup) params.append('ageGroup', filters.ageGroup)
    if (filters.typeOfFood) params.append('typeOfFood', filters.typeOfFood)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const { data } = await apiClient.get<LearningModulesResponse>(
      `v1/learning-knowledge${queryString ? `?${queryString}` : ''}`
    )
    return data
  },

  getPresignedUrlForViewing: async (
    s3Url: string
  ): Promise<PresignedUrlResponse> => {
    const { data } = await apiClient.post<PresignedUrlResponse>(
      `/v1/presigned-url`,
      { s3Url, expiresIn: 3600 }
    )
    return data
  },
}

export const useLearningKnowledgeQuery = (
  filters: LearningKnowledgeFilters
) => {
  return useQuery({
    queryKey: ['learning-knowledge', filters],
    queryFn: () => learningModuleApi.getLearningKnowledge(filters),
    retry: 1,
    enabled: Object.keys(filters).length > 0, // Only run if filters are provided
  })
}

export const usePresignedUrlForViewingMutation = () => {
  return useMutation({
    mutationKey: ['presigned-url'],
    mutationFn: (s3Url: string) =>
      learningModuleApi.getPresignedUrlForViewing(s3Url),
    retry: 1,
  })
}
