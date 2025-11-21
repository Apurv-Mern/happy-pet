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

const ProfilePage = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')

  const {
    formData,
    passwordData,
    handleInputChange,
    handlePasswordChange,
    handleSaveChanges,
    handlePasswordSubmit,
    resetPersonalInfo,
    resetPasswordData,
  } = useProfileForm(user)

  const handleLogout = () => {
    logout()
    navigate('/login')
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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar
              user={user}
              activeSection={activeSection}
              menuItems={menuItems}
              onLogout={handleLogout}
            />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg p-8"
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
    </motion.div>
  )
}

export default ProfilePage
