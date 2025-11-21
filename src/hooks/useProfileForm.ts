import { useState } from 'react'
import { User } from '@/types'

interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  companyName: string
  phoneNumber: string
  dob: string
  postalCode: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const useProfileForm = (user: User | null) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: '',
    companyName: '',
    phoneNumber: '',
    dob: '',
    postalCode: '',
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
    // TODO: Implement API call to save profile
    console.log('Saving changes:', formData)
  }

  const resetPersonalInfo = () => {
    setFormData({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      address: '',
      companyName: '',
      phoneNumber: '',
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
      alert('New passwords do not match!')
      return
    }
    // TODO: Implement API call to change password
    console.log('Changing password')
  }

  return {
    formData,
    passwordData,
    handleInputChange,
    handlePasswordChange,
    handleSaveChanges,
    handlePasswordSubmit,
    resetPersonalInfo,
    resetPasswordData,
  }
}
