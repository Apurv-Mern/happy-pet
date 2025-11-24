import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
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
  search?: string
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
    if (filters.search) params.append('search', filters.search)

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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
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

// Custom hook to fetch presigned URLs for multiple items
export const usePresignedUrls = (
  items: any[] | undefined,
  enabled: boolean = true
) => {
  const [processedItems, setProcessedItems] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!items || items.length === 0 || !enabled) {
      setProcessedItems([])
      return
    }

    const fetchPresignedUrls = async () => {
      setIsLoading(true)
      try {
        const itemsWithPresignedUrls = await Promise.all(
          items.map(async item => {
            const promises: Promise<any>[] = []
            const urls: any = {}

            // Fetch presigned URL for thumbnailUrl if it exists
            if (item.thumbnailUrl) {
              promises.push(
                learningModuleApi
                  .getPresignedUrlForViewing(item.thumbnailUrl)
                  .then(response => {
                    urls.presignedThumbnailUrl = response.data.presignedUrl
                  })
                  .catch(() => {
                    urls.presignedThumbnailUrl = item.thumbnailUrl
                  })
              )
            }

            // Fetch presigned URL for fileUrl if it exists
            if (item.fileUrl) {
              promises.push(
                learningModuleApi
                  .getPresignedUrlForViewing(item.fileUrl)
                  .then(response => {
                    urls.presignedFileUrl = response.data.presignedUrl
                  })
                  .catch(() => {
                    urls.presignedFileUrl = item.fileUrl
                  })
              )
            }

            await Promise.all(promises)

            return {
              ...item,
              ...urls,
            }
          })
        )
        setProcessedItems(itemsWithPresignedUrls)
      } catch (error) {
        console.error('Error fetching presigned URLs:', error)
        setProcessedItems(items)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPresignedUrls()
  }, [items, enabled])

  return { items: processedItems, isLoading }
}
