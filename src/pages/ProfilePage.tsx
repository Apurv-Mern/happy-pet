import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { User, Lock, HelpCircle, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  ProfileSidebar,
  PersonalInformation,
  PasswordManagement,
  HelpCenter,
} from '@/components/profile'
import { useProfileForm } from '@/hooks/useProfileForm'
import { useProfileQuery } from '@/api/user'

const ProfilePage = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')
  const { data: profileData, isLoading } = useProfileQuery()

  const {
    formData,
    passwordData,
    handleInputChange,
    handlePasswordChange,
    handleSaveChanges,
    handlePasswordSubmit,
    resetPersonalInfo,
    resetPasswordData,
  } = useProfileForm(profileData || user)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDiscardChanges = () => {
    if (activeSection === 'personal') {
      resetPersonalInfo()
    } else if (activeSection === 'password') {
      resetPasswordData()
    }
  }

  const menuItems = [
    {
      id: 'personal',
      icon: User,
      label: 'Personal Information',
      onClick: () => setActiveSection('personal'),
    },
    {
      id: 'password',
      icon: Lock,
      label: 'Password Management',
      onClick: () => setActiveSection('password'),
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help Center',
      onClick: () => setActiveSection('help'),
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Terms & Policies',
      onClick: () => {
        // TODO: Navigate to terms page
        console.log('Terms & Policies')
      },
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      ) : (
        <div className="bg-[#E3E6ED] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[24%_76%]">
            {/* Left Sidebar */}
            <div className="">
              <ProfileSidebar
                user={profileData || user}
                activeSection={activeSection}
                menuItems={menuItems}
                onLogout={handleLogout}
              />
            </div>

            {/* Right Content */}
            <div className="py-10 px-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className=""
              >
                {activeSection === 'personal' && (
                  <PersonalInformation
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleSaveChanges}
                    onDiscard={handleDiscardChanges}
                  />
                )}

                {activeSection === 'password' && (
                  <PasswordManagement
                    passwordData={passwordData}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handlePasswordSubmit}
                    onCancel={handleDiscardChanges}
                  />
                )}

                {activeSection === 'help' && <HelpCenter />}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ProfilePage
