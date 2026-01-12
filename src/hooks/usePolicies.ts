import { useQuery } from '@tanstack/react-query'
import { fetchPolicies, fetchPolicyByType, PolicyType } from '@/api/policies'

/**
 * Hook to fetch all policies
 * @param lang - Language code
 */
export const usePoliciesQuery = (lang: string = 'en') => {
  return useQuery({
    queryKey: ['policies', lang],
    queryFn: () => fetchPolicies(lang),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Hook to fetch a specific policy by type
 * @param type - Policy type
 * @param lang - Language code
 */
export const usePolicyByTypeQuery = (type: PolicyType, lang: string = 'en') => {
  return useQuery({
    queryKey: ['policy', type, lang],
    queryFn: () => fetchPolicyByType(type, lang),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
