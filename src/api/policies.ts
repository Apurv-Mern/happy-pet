import { apiClient } from './axios'

// Policy Types
export type PolicyType = 'terms' | 'privacy' | 'cookies' | 'custom'

// Policy Section Interface
export interface PolicySection {
  heading: string
  content: string // HTML content
}

// Policy Interface
export interface Policy {
  id: string
  type: PolicyType
  title: string
  slug: string
  language: string
  sections: PolicySection[]
  lastUpdated: string
  version: number
}

// API Response Interface
export interface PoliciesResponse {
  success: boolean
  message: string
  data: {
    policies: Policy[]
  }
}

/**
 * Fetch all policies for a specific language
 * @param lang - Language code (e.g., 'en', 'de', 'ar')
 * @returns Promise with policies data
 */
export const fetchPolicies = async (
  lang: string = 'en'
): Promise<PoliciesResponse> => {
  const response = await apiClient.get<PoliciesResponse>(
    `/public/v1/policies?lang=${lang}`
  )
  return response.data
}

/**
 * Fetch a specific policy by type
 * @param type - Policy type ('terms', 'privacy', 'cookies', 'custom')
 * @param lang - Language code
 * @returns Promise with single policy or undefined
 */
export const fetchPolicyByType = async (
  type: PolicyType,
  lang: string = 'en'
): Promise<Policy | undefined> => {
  const response = await fetchPolicies(lang)
  return response.data.policies.find(policy => policy.type === type)
}

/**
 * Fetch policy by slug
 * @param slug - Policy slug
 * @param lang - Language code
 * @returns Promise with single policy or undefined
 */
export const fetchPolicyBySlug = async (
  slug: string,
  lang: string = 'en'
): Promise<Policy | undefined> => {
  const response = await fetchPolicies(lang)
  return response.data.policies.find(policy => policy.slug === slug)
}
