import { useState, useEffect } from 'react'
import { User } from '@/types'
import { useChangePasswordMutation, useUpdateProfileMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'
import { userApi } from '@/api/user'
import { useAuthStore } from '@/store/useAuthStore'

interface ProfileFormData {
  fullName: string
  email: string
  address: string
  companyName: string
  phoneNumber: string
  dob: string
  postalCode: string
  country?: string
  timezone?: string
  preferredLanguage?: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const useProfileForm = (user: User | null) => {
  const { toast } = useToast()
  const changePasswordMutation = useChangePasswordMutation()
  const updateProfileMutation = useUpdateProfileMutation()
  const { updateUser } = useAuthStore()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [phoneError, setPhoneError] = useState<string>('')

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    companyName: user?.company || '',
    phoneNumber: user?.phoneNumber || '',
    dob: '',
    postalCode: '',
  })

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        companyName: user?.company || '',
        phoneNumber: user?.phoneNumber || '',
        dob: '',
        postalCode: '',
      })
    }
  }, [user])

  console.log('Profile data:', {
    company: user?.company,
    phoneNumber: user?.phoneNumber,
    formData,
  })
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber) {
      setPhoneError('Phone number is required')
      return false
    }

    // Remove country code to validate just the number part
    const countryCodes = ['+971', '+966', '+1', '+49', '+60', '+66', '+62']
    let numberPart = phoneNumber
    for (const code of countryCodes) {
      if (phoneNumber.startsWith(code)) {
        numberPart = phoneNumber.slice(code.length)
        break
      }
    }

    // Remove spaces and dashes
    numberPart = numberPart.replace(/[\s-]/g, '')

    // Check if number part is empty (only country code was provided)
    if (!numberPart || numberPart.length === 0) {
      setPhoneError('Phone number is required')
      return false
    }

    // Check if it contains only digits
    if (!/^\d+$/.test(numberPart)) {
      setPhoneError('Phone number must contain only digits')
      return false
    }

    // Check length (most phone numbers are between 7-15 digits)
    if (numberPart.length < 7 || numberPart.length > 15) {
      setPhoneError('Phone number must be between 7 and 15 digits')
      return false
    }

    setPhoneError('')
    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Validate phone number on change
    if (name === 'phoneNumber') {
      validatePhoneNumber(value)
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    console.log('handleSaveChanges called')
    console.log('formData:', formData)

    // Validate phone number before saving
    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: phoneError || 'Please enter a valid phone number',
      })
      return
    }

    const formDataToSend = new FormData()

    // Add full name
    formDataToSend.append('name', formData.fullName.trim())

    // Add other fields
    formDataToSend.append('phoneNumber', formData.phoneNumber)
    formDataToSend.append('company', formData.companyName)

    // Add optional fields if they exist
    if (formData.country) formDataToSend.append('country', formData.country)
    if (formData.timezone) formDataToSend.append('timezone', formData.timezone)
    if (formData.preferredLanguage)
      formDataToSend.append('preferredLanguage', formData.preferredLanguage)

    // Add profile image if selected
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage)
    }

    console.log('Sending FormData to API...')
    // Log FormData contents
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }

    updateProfileMutation.mutate(formDataToSend, {
      onSuccess: async response => {
        console.log('Profile update success:', response)
        toast({
          variant: 'success',
          title: 'Profile Updated',
          description:
            response.message || 'Your profile has been updated successfully.',
        })

        // Fetch latest profile data and update localStorage
        try {
          const latestProfile = await userApi.getProfile()
          updateUser(latestProfile)
          console.log(
            'Updated localStorage with latest profile:',
            latestProfile
          )
        } catch (error) {
          console.error('Failed to fetch updated profile:', error)
        }

        // Refresh the page after successful update
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (error: any) => {
        console.error('Profile update error:', error)
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description:
            error.response?.data?.message ||
            'Failed to update profile. Please try again.',
        })
      },
    })
  }

  const resetPersonalInfo = () => {
    setFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      address: '',
      companyName: user?.company || '',
      phoneNumber: user?.phoneNumber || '',
      dob: '',
      postalCode: '',
    })
  }

  const resetPasswordData = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Password Mismatch',
        description: 'New passwords do not match!',
      })
      return
    }

    changePasswordMutation.mutate(
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: response => {
          toast({
            variant: 'success',
            title: 'Password Changed',
            description:
              response.message ||
              'Your password has been updated successfully.',
          })
          resetPasswordData()
        },
        onError: (err: any) => {
          console.error('Change password error:', err)
          toast({
            variant: 'destructive',
            title: 'Password Change Failed',
            description:
              err.response?.data?.message || 'Failed to change password.',
          })
        },
      }
    )
  }

  return {
    formData,
    passwordData,
    profileImage,
    setProfileImage,
    handleInputChange,
    handlePasswordChange,
    handleSaveChanges,
    handlePasswordSubmit,
    resetPersonalInfo,
    resetPasswordData,
    isUpdatingProfile: updateProfileMutation.isPending,
    phoneError,
  }
}
