import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { User, Lock, HelpCircle, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/contexts/I18nContext'
import { useQueryClient } from '@tanstack/react-query'
import {
  ProfileSidebar,
  PersonalInformation,
  PasswordManagement,
  HelpCenter,
} from '@/components/profile'
import { useProfileForm } from '@/hooks/useProfileForm'
import { useProfileQuery } from '@/api/user'
import { LogoutConfirmationModal } from '@/components/LogoutConfirmationModal'

const ProfilePage = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeSection, setActiveSection] = useState('personal')
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { data: profileData, isLoading } = useProfileQuery()

  const {
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
    isUpdatingProfile,
  } = useProfileForm(profileData || user)

  const handleLogout = async () => {
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = async () => {
    setIsLogoutModalOpen(false)

    // Delete AI Agent session if it exists
    const aiAgentSessionId = localStorage.getItem('ai_agent_session_id')
    if (aiAgentSessionId) {
      try {
        const { chatApi } = await import('@/api/chat')
        await chatApi.deleteSession(aiAgentSessionId)
        localStorage.removeItem('ai_agent_session_id')
        console.log('AI Agent session deleted on logout')
      } catch (error) {
        console.error('Failed to delete AI Agent session:', error)
      }
    }

    // Clear all React Query cache
    queryClient.clear()

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
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0806 23.5912C24.6702 23.4683 25.0213 22.8521 24.7395 22.3199C24.0074 20.9373 22.8168 19.7225 21.2785 18.8044C19.365 17.6625 17.0205 17.0435 14.6086 17.0435C12.1967 17.0435 9.85217 17.6625 7.93867 18.8044C6.40039 19.7225 5.20977 20.9373 4.47766 22.3199C4.19581 22.8521 4.54692 23.4683 5.13653 23.5912L6.44772 23.8644C11.8305 24.9862 17.3867 24.9862 22.7694 23.8644L24.0806 23.5912Z"
            fill="#0E213A"
          />
          <circle cx="14.6089" cy="9.7393" r="6.08696" fill="#0E213A" />
        </svg>
      ),
      label: t('profilePage.personalInformation'),
      onClick: () => setActiveSection('personal'),
    },
    {
      id: 'password',
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0806 23.5912C24.6702 23.4683 25.0213 22.8521 24.7395 22.3199C24.0074 20.9373 22.8168 19.7225 21.2785 18.8044C19.365 17.6625 17.0205 17.0435 14.6086 17.0435C12.1967 17.0435 9.85217 17.6625 7.93867 18.8044C6.40039 19.7225 5.20977 20.9373 4.47766 22.3199C4.19581 22.8521 4.54692 23.4683 5.13653 23.5912L6.44772 23.8644C11.8305 24.9862 17.3867 24.9862 22.7694 23.8644L24.0806 23.5912Z"
            fill="#0E213A"
          />
          <circle cx="14.6089" cy="9.7393" r="6.08696" fill="#0E213A" />
        </svg>
      ),
      label: t('profilePage.passwordManagement'),
      onClick: () => setActiveSection('password'),
    },
    {
      id: 'help',
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0806 23.5912C24.6702 23.4683 25.0213 22.8521 24.7395 22.3199C24.0074 20.9373 22.8168 19.7225 21.2785 18.8044C19.365 17.6625 17.0205 17.0435 14.6086 17.0435C12.1967 17.0435 9.85217 17.6625 7.93867 18.8044C6.40039 19.7225 5.20977 20.9373 4.47766 22.3199C4.19581 22.8521 4.54692 23.4683 5.13653 23.5912L6.44772 23.8644C11.8305 24.9862 17.3867 24.9862 22.7694 23.8644L24.0806 23.5912Z"
            fill="#0E213A"
          />
          <circle cx="14.6089" cy="9.7393" r="6.08696" fill="#0E213A" />
        </svg>
      ),
      label: t('profilePage.helpCenter'),
      onClick: () => setActiveSection('help'),
    },
    {
      id: 'terms',
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0806 23.5912C24.6702 23.4683 25.0213 22.8521 24.7395 22.3199C24.0074 20.9373 22.8168 19.7225 21.2785 18.8044C19.365 17.6625 17.0205 17.0435 14.6086 17.0435C12.1967 17.0435 9.85217 17.6625 7.93867 18.8044C6.40039 19.7225 5.20977 20.9373 4.47766 22.3199C4.19581 22.8521 4.54692 23.4683 5.13653 23.5912L6.44772 23.8644C11.8305 24.9862 17.3867 24.9862 22.7694 23.8644L24.0806 23.5912Z"
            fill="#0E213A"
          />
          <circle cx="14.6089" cy="9.7393" r="6.08696" fill="#0E213A" />
        </svg>
      ),
      label: t('profilePage.termsAndPolicies'),
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
          <div className="text-lg text-gray-600">
            {t('profilePage.loadingProfile')}
          </div>
        </div>
      ) : (
        <div className="bg-[#E3E6ED] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[46%_54%] lg:grid-cols-[38%_62%] xl:grid-cols-[30%_70%] 2xl:grid-cols-[24%_76%]">
            {/* Left Sidebar */}
            <div className="">
              <ProfileSidebar
                user={profileData || user}
                activeSection={activeSection}
                menuItems={menuItems}
                onLogout={handleLogout}
                profileImage={profileImage}
                onImageChange={setProfileImage}
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
                    isLoading={isUpdatingProfile}
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

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </motion.div>
  )
}

export default ProfilePage
