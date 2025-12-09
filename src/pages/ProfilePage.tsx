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
        
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6738 4.73679C13.6738 5.99306 13.1747 7.19788 12.2864 8.0862C11.3981 8.97452 10.1933 9.47357 8.93698 9.47357C7.68071 9.47357 6.47589 8.97452 5.58757 8.0862C4.69925 7.19788 4.2002 5.99306 4.2002 4.73679C4.2002 3.48051 4.69925 2.27569 5.58757 1.38737C6.47589 0.499053 7.68071 0 8.93698 0C10.1933 0 11.3981 0.499053 12.2864 1.38737C13.1747 2.27569 13.6738 3.48051 13.6738 4.73679ZM0.0601994 18.0118C0.735543 16.2016 1.94799 14.641 3.53509 13.5392C5.12218 12.4373 7.00812 11.8468 8.9402 11.8468C10.8723 11.8468 12.7582 12.4373 14.3453 13.5392C15.9324 14.641 17.1449 16.2016 17.8202 18.0118C18.0602 18.6525 17.5502 19.2868 16.8645 19.2868H1.01591C0.3302 19.2868 -0.179801 18.6525 0.0601994 18.0118Z" fill="white"/>
        </svg>
      ),
      label: t('profilePage.personalInformation'),
      onClick: () => setActiveSection('personal'),
    },
    {
      id: 'password',
      icon: (
        
        <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.36364 30H19.5455C20.2985 30 20.9091 29.3895 20.9091 28.6364V13.1818C20.9091 12.4287 20.2985 11.8182 19.5455 11.8182H18.1818V7.72727C18.1818 3.46645 14.7154 0 10.4545 0C6.19373 0 2.72727 3.46645 2.72727 7.72727V11.8182H1.36364C0.610545 11.8182 0 12.4287 0 13.1818V28.6364C0 29.3895 0.610545 30 1.36364 30ZM14.3165 19.9415L10.4528 23.8051C10.1865 24.0714 9.83754 24.2045 9.48864 24.2045C9.13973 24.2045 8.79064 24.0714 8.52445 23.8051L6.59264 21.8733C6.06009 21.3407 6.06009 20.4775 6.59264 19.9448C7.12509 19.4123 7.98854 19.4123 8.52109 19.9448L9.48873 20.9124L12.3882 18.013C12.9206 17.4805 13.7841 17.4805 14.3166 18.013C14.8491 18.5456 14.8491 19.4089 14.3165 19.9415ZM5.45454 7.72727C5.45454 4.97027 7.69754 2.72727 10.4545 2.72727C13.2115 2.72727 15.4545 4.97027 15.4545 7.72727V11.8182H5.45454V7.72727Z" fill="#003863"/>
        </svg>
      ),
      label: t('profilePage.passwordManagement'),
      onClick: () => setActiveSection('password'),
    },
    {
      id: 'help',
      icon: (

        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4375 20C12.875 20 13.245 19.8488 13.5475 19.5463C13.85 19.2438 14.0008 18.8742 14 18.4375C13.9992 18.0008 13.8483 17.6308 13.5475 17.3275C13.2467 17.0242 12.8767 16.8733 12.4375 16.875C11.9983 16.8767 11.6288 17.0279 11.3288 17.3288C11.0288 17.6296 10.8775 17.9992 10.875 18.4375C10.8725 18.8758 11.0238 19.2458 11.3288 19.5475C11.6338 19.8492 12.0033 20 12.4375 20ZM11.3125 15.1875H13.625C13.625 14.5 13.7033 13.9583 13.86 13.5625C14.0167 13.1667 14.4592 12.625 15.1875 11.9375C15.7292 11.3958 16.1563 10.88 16.4688 10.39C16.7813 9.90001 16.9375 9.31167 16.9375 8.62501C16.9375 7.45834 16.5104 6.56251 15.6563 5.93751C14.8021 5.31251 13.7917 5.00001 12.625 5.00001C11.4375 5.00001 10.4742 5.31251 9.735 5.93751C8.99584 6.56251 8.48 7.31251 8.1875 8.18751L10.25 9.00001C10.3542 8.62501 10.5888 8.21876 10.9538 7.78126C11.3188 7.34376 11.8758 7.12501 12.625 7.12501C13.2917 7.12501 13.7917 7.30751 14.125 7.67251C14.4583 8.03751 14.625 8.43834 14.625 8.87501C14.625 9.29167 14.5 9.68251 14.25 10.0475C14 10.4125 13.6875 10.7508 13.3125 11.0625C12.3958 11.875 11.8333 12.4896 11.625 12.9063C11.4167 13.3229 11.3125 14.0833 11.3125 15.1875ZM12.5 25C10.7708 25 9.14584 24.6721 7.625 24.0163C6.10417 23.3604 4.78125 22.4696 3.65625 21.3438C2.53125 20.2179 1.64084 18.895 0.985002 17.375C0.329168 15.855 0.000834916 14.23 1.58228e-06 12.5C-0.000831751 10.77 0.327502 9.14501 0.985002 7.62501C1.6425 6.10501 2.53292 4.78209 3.65625 3.65626C4.77958 2.53042 6.1025 1.64001 7.625 0.985006C9.1475 0.330006 10.7725 0.00167298 12.5 6.31313e-06C14.2275 -0.00166035 15.8525 0.326673 17.375 0.985006C18.8975 1.64334 20.2204 2.53376 21.3438 3.65626C22.4671 4.77876 23.3579 6.10167 24.0163 7.62501C24.6746 9.14834 25.0025 10.7733 25 12.5C24.9975 14.2267 24.6692 15.8517 24.015 17.375C23.3608 18.8983 22.4704 20.2213 21.3438 21.3438C20.2171 22.4663 18.8942 23.3571 17.375 24.0163C15.8558 24.6754 14.2308 25.0033 12.5 25Z" fill="#003863"/>
        </svg>
      ),
      label: t('profilePage.helpCenter'),
      onClick: () => setActiveSection('help'),
    },
    {
      id: 'terms',
      icon: (

      <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 2.5L10 0H0V21.25H2.5V12.5H8.75L10 15H18.75V2.5H11.25ZM16.25 12.5H11.25L10 10H2.5V2.5H8.75L10 5H16.25V12.5Z" fill="#003863"/>
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
            <div className="py-5 px-5 md:py-5 md:px-5 lg:py-10 lg:px-20">
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
