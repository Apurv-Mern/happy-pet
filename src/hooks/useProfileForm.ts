import { useState, useEffect } from 'react'
import { User } from '@/types'
import { useChangePasswordMutation, useUpdateProfileMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'

interface ProfileFormData {
  firstName: string
  lastName: string
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
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
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
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    console.log('handleSaveChanges called')
    console.log('formData:', formData)

    const formDataToSend = new FormData()

    // Combine first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    formDataToSend.append('name', fullName)

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
      onSuccess: response => {
        console.log('Profile update success:', response)
        toast({
          title: 'Profile Updated',
          description:
            response.message || 'Your profile has been updated successfully.',
        })
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
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
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
            title: 'Password Changed',
            description:
              response.message ||
              'Your password has been updated successfully.',
          })
          resetPasswordData()
        },
        onError: err => {
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
  }
}
