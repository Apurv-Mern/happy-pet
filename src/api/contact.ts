import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface ContactDetails {
  _id: string
  email: string
  phoneNumber: string
  address: string
  socialLinks: SocialLink[]
  updatedAt: string
}

export interface ContactDetailsResponse {
  success: boolean
  message: string
  data: ContactDetails
}

export const contactApi = {
  sendContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    const { data: response } = await apiClient.post<ContactResponse>(
      '/v1/contact',
      data
    )
    return response
  },

  fetchContactDetails: async (): Promise<ContactDetailsResponse> => {
    const { data: response } = await apiClient.get<ContactDetailsResponse>(
      '/public/v1/contact-us'
    )
    return response
  },
}

export const useContactMutation = () => {
  return useMutation({
    mutationFn: contactApi.sendContactForm,
    mutationKey: ['contact'],
  })
}

export const useContactDetailsQuery = () => {
  return useQuery({
    queryKey: ['contactDetails'],
    queryFn: contactApi.fetchContactDetails,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
