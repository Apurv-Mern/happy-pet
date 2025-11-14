import { useMutation } from '@tanstack/react-query'
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

export const contactApi = {
  sendContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    const { data: response } = await apiClient.post<ContactResponse>(
      '/v1/contact',
      data
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
