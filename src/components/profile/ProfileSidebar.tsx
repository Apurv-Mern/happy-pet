import { motion } from 'framer-motion'
import { ChevronRight, LogOut } from 'lucide-react'
import { ProfileAvatar } from './ProfileAvatar'
import { User as UserType } from '@/types'
import { LucideIcon } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'

interface MenuItem {
  id: string
  icon: LucideIcon
  label: string
  onClick: () => void
}

interface ProfileSidebarProps {
  user: UserType | null
  activeSection: string
  menuItems: MenuItem[]
  onLogout: () => void
  profileImage: File | null
  onImageChange: (file: File | null) => void
}

export const ProfileSidebar = ({
  user,
  activeSection,
  menuItems,
  onLogout,
  profileImage,
  onImageChange,
}: ProfileSidebarProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[10px] h-full px-10 py-10"
    >
      <ProfileAvatar
        user={user}
        profileImage={profileImage}
        onImageChange={onImageChange}
      />

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id
                ? 'bg-[#003863] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-[#003863] border-2 text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#004c82] hover:text-white transition-all"
      >
        <LogOut className="w-5 h-5" />
        <span>{t('profilePage.logout')}</span>
      </button>
    </motion.div>
  )
}
