import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'

interface UserDropdownProps {
  onLogout: () => void
}

export const UserDropdown = ({ onLogout }: UserDropdownProps) => {
  const navigate = useNavigate()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false)
  const { user } = useAuthStore()
  const { t } = useTranslation()

  return (
    <div className="relative">
      <button
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="flex items-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full pl-5 pr-1 h-11 transition-colors"
      >
        <span className="text-white text-sm font-medium">
          {user?.name.slice(0, 5).toUpperCase() || 'User'}
        </span>
        <div className="bg-[#D4E7F6] rounded-full h-10 w-10 flex items-center justify-center ml-1">
          <User className="h-5 w-5 text-black" />
        </div>
      </button>

      {isUserDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setIsUserDropdownOpen(false)
                navigate('/profile')
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{t('header.profile')}</span>
            </button>
            <button
              onClick={() => {
                setIsUserDropdownOpen(false)
                onLogout()
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('header.logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
