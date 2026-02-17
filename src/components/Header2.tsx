import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Phone, Search, User, LogOut, ChevronDown, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'
import { UserDropdown } from './UserDropdown'
import { chatApi } from '@/api/chat'
import { useQueryClient } from '@tanstack/react-query'
import { MdLanguage } from 'react-icons/md'
import { LogoutConfirmationModal } from './LogoutConfirmationModal'
import { useContactDetailsQuery } from '@/api/contact'

// NavLink Component
const NavLink = ({
  path,
  label,
  isActive,
}: {
  path: string
  label: string
  isActive: boolean
}) => (
  <Link
    to={path}
    className={`font-semibold rounded-[40px] py-[14px] px-[28px] transition-colors ${
      isActive
        ? 'bg-[#0E213A] text-[#fff]'
        : 'hover:bg-[#0E213A] hover:text-[#fff]'
    }`}
  >
    {label}
  </Link>
)

// Helper function to check if a path is active
const isPathActive = (currentPath: string, itemPath: string): boolean => {
  // Exact match for home page
  if (itemPath === '/') {
    return currentPath === '/'
  }
  // For other paths, check if current path starts with the item path
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
}

// Desktop nav when NOT authenticated (screenshot-style pill)
// Parent will center this with flex.
const PublicScreenshotNav = ({
  publicNavItems,
  publicNavItems2,
  location,
  isDropdownOpen,
  setIsDropdownOpen,
  availableLanguages,
  language,
  handleSelectLanguage,
  dropdownButtonRef,
  t,
}: any) => (
  <div className="hidden xl:flex items-center justify-center text-sm font-medium bg-white rounded-full py-[5px] px-[5px] mx-auto max-w-fit  ">
    {publicNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={isPathActive(location.pathname, item.path)}
      />
    ))}
    {publicNavItems2.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={isPathActive(location.pathname, item.path)}
      />
    ))}

    <div className="relative language-dropdown-container">
      <button
        ref={dropdownButtonRef}
        onClick={e => {
          e.stopPropagation()
          console.log(
            'Public nav language button clicked, current state:',
            isDropdownOpen
          )
          setIsDropdownOpen(!isDropdownOpen)
        }}
        className="flex items-center gap-2 bg-[#0E213A] hover:bg-[#002d4d] text-white rounded-full pl-[16px] transition-colors ml-[6px]"
      >
        <img
          src={
            availableLanguages.find((l: any) => l.code === language)?.flag ||
            'https://flagcdn.com/w40/gb.png'
          }
          alt="flag"
          className="w-5 h-3 object-cover rounded"
          onError={e => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/40x24?text=Flag'
          }}
        />
        <span className="text-sm font-medium">
          {availableLanguages
            .find((l: any) => l.code === language)
            ?.name.slice(0, 3) || 'Eng'}
        </span>
        <ChevronDown className="h-4 w-4" />
        <div className="w-[0.64px] h-[25px] bg-[#fff]"></div>
        <div className="rounded-full bg-[#fff] h-[48px] w-[48px] flex items-center justify-center border-[2px] border-[#003863]">
          <MdLanguage className="text-[#003863] h-[34px] w-[34px]" />
        </div>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="z-[9998]"
            onClick={() => {
              console.log('Public nav backdrop clicked')
              setIsDropdownOpen(false)
            }}
          />
          <div className="fixed w-64 rounded-[26px] border border-[#0E213A] bg-[#003d66] p-5 text-white shadow-2xl z-[9999]">
            <h3 className="text-2xl font-semibold italic text-center mb-5">
              {t('header.selectLanguage')}
            </h3>
            <div className="space-y-3">
              {availableLanguages.map((lang: any) => (
                <button
                  key={lang.code}
                  onClick={e => {
                    e.stopPropagation()
                    handleSelectLanguage(lang.code)
                  }}
                  className="flex w-full items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#003863] hover:shadow-lg transition"
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-6 h-4 object-cover rounded"
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/40x24?text=Flag'
                    }}
                  />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
)

// Desktop nav when authenticated (existing pill + protected links + dropdown)
const AuthenticatedNav = ({
  publicNavItems,
  publicNavItems2,
  protectedNavItems,
  location,
  isDropdownOpen,
  setIsDropdownOpen,
  availableLanguages,
  language,
  handleSelectLanguage,
  dropdownButtonRef,
  t,
}: any) => (
  <nav className="hidden xl:flex items-center justify-center text-sm font-medium bg-white rounded-full py-[5px] px-[5px] mx-auto max-w-fit">
    {publicNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={isPathActive(location.pathname, item.path)}
      />
    ))}

    {protectedNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={isPathActive(location.pathname, item.path)}
      />
    ))}

    {publicNavItems2.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={isPathActive(location.pathname, item.path)}
      />
    ))}

    {/* Language Selector Dropdown */}
    <div className="relative language-dropdown-container">
      <button
        ref={dropdownButtonRef}
        onClick={e => {
          e.stopPropagation()
          console.log('Language button clicked, current state:', isDropdownOpen)
          setIsDropdownOpen(!isDropdownOpen)
        }}
        className="flex items-center gap-2 bg-[#0E213A] hover:bg-[#002d4d] text-white rounded-full pl-[16px] transition-colors ml-[6px]"
      >
        <div className="flex items-center gap-2">
          <img
            src={
              availableLanguages.find((l: any) => l.code === language)?.flag ||
              'https://flagcdn.com/w40/gb.png'
            }
            alt="flag"
            className="w-6 h-4 object-cover rounded"
            onError={e => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/40x24?text=Flag'
            }}
          />
          <span className="text-sm font-medium">
            {availableLanguages
              .find((l: any) => l.code === language)
              ?.name.slice(0, 3) || 'Eng'}
          </span>
        </div>
        <ChevronDown className="h-4 w-4" />
        <div className="w-[0.64px] h-[25px] bg-[#fff]"></div>
        <div className="rounded-full bg-[#fff] h-[48px] w-[48px] flex items-center justify-center border-[2px] border-[#003863]">
          <MdLanguage className="text-[#003863] h-[34px] w-[34px]" />
        </div>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-64 rounded-[26px] border border-[#0E213A] bg-[#003d66] p-5 text-white shadow-2xl z-[9999]">
            <h3 className="text-2xl font-semibold italic text-center mb-5">
              {t('header.selectLanguage')}
            </h3>
            <div className="space-y-3">
              {availableLanguages.map((lang: any) => (
                <button
                  key={lang.code}
                  onClick={e => {
                    e.stopPropagation()
                    handleSelectLanguage(lang.code)
                  }}
                  className="flex w-full items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#003863] hover:shadow-lg transition"
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-6 h-4 object-cover rounded"
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/40x24?text=Flag'
                    }}
                  />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  </nav>
)

export function Header2() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] =
    useState<boolean>(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)
  const dropdownButtonRef = React.useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const { isAuthenticated, logout } = useAuthStore()
  const { t, setLanguage, availableLanguages, language } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English')
  const queryClient = useQueryClient()
  const { data: contactDetails } = useContactDetailsQuery()

  const phoneNumber = contactDetails?.data?.phoneNumber || '+49 7161 5073061'

  const isAuthPage = [
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
  ].includes(location.pathname)

  const publicNavItems = [{ path: '/', label: t('header.home') }]
  const publicNavItems2 = [
    { path: '/faqs', label: t('header.faqs') },
    { path: '/about', label: t('header.about') },
    { path: '/contact', label: t('header.contact') },
  ]
  const protectedNavItems = [
    { path: '/ai-agent', label: t('header.aiAgent') },
    { path: '/knowledge-hub', label: t('header.knowledgeHub') },
    { path: '/learning-module', label: t('header.learningModule') },
  ]

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)

      // Calculate dropdown position
      if (dropdownButtonRef.current) {
        const rect = dropdownButtonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 12,
          right: window.innerWidth - rect.right + window.scrollX,
        })
        console.log('Dropdown opened at:', {
          top: rect.bottom + 12,
          right: window.innerWidth - rect.right,
        })
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleSelectLanguage = (code: string) => {
    console.log('Selected language code:', code)
    setLanguage(code)
    setIsDropdownOpen(false)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langName = e.target.value
    setSelectedLanguage(langName)
    const lang = availableLanguages.find(l => l.name === langName)
    if (lang) {
      console.log(lang)
      setLanguage(lang.code)
    }
  }

  const handleLogout = async () => {
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = async () => {
    setIsLogoutModalOpen(false)
    navigate('/')

    const aiAgentSessionId = localStorage.getItem('ai_agent_session_id')
    if (aiAgentSessionId) {
      try {
        await chatApi.deleteSession(aiAgentSessionId)
        localStorage.removeItem('ai_agent_session_id')
        console.log('AI Agent session deleted on logout')
      } catch (error) {
        console.error('Failed to delete AI Agent session:', error)
      }
    }
    queryClient.clear()
    await logout()
  }

  return (
    <header className="w-full">
      {/* Top dark band */}
      <div className="bg-[#0E213A] text-white">
        <div className="container mx-auto py-2.5 flex items-center justify-end gap-5 text-sm">
          <div className="items-center gap-2 hidden xl:flex">
            <Phone className="h-4 w-4" />
            <span className="hidden xl:block">{phoneNumber}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Social icons ... keep as in your original */}
          </div>
        </div>

        {/* Mobile Drawer */}
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}

        {/* Drawer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            {/* Close Button and Logo */}
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-[#003863]"
              >
                <X className="h-6 w-6 text-[#fff]" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-2">
              {publicNavItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[#003863] font-medium py-3 px-4 rounded-lg transition-colors ${
                    isPathActive(location.pathname, item.path)
                      ? 'bg-[#003863] text-[#fff]'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated &&
                protectedNavItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[#003863] font-medium py-3 px-4 rounded-lg transition-colors ${
                      isPathActive(location.pathname, item.path)
                        ? 'bg-[#003863] text-[#fff]'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setIsMobileLanguageOpen(!isMobileLanguageOpen)
                  }}
                  className="flex items-center justify-between w-full gap-2 bg-[#003d66] hover:bg-[#002d4d] text-white rounded-full h-11 px-4 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        availableLanguages.find((l: any) => l.code === language)
                          ?.flag || 'https://flagcdn.com/w40/gb.png'
                      }
                      alt="flag"
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="text-sm font-medium">
                      {availableLanguages.find((l: any) => l.code === language)
                        ?.name || 'English'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileLanguageOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMobileLanguageOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 space-y-2 overflow-hidden"
                  >
                    {availableLanguages.map((lang: any) => (
                      <button
                        key={lang.code}
                        onClick={e => {
                          e.stopPropagation()
                          handleSelectLanguage(lang.code)
                          setIsMobileLanguageOpen(false)
                        }}
                        className="flex w-full items-center gap-3 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[#003863] hover:bg-gray-200 transition"
                      >
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="w-6 h-4 object-cover rounded"
                        />
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Login/Logout Buttons */}
              <div className="border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        navigate('/profile')
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full py-3 transition-colors mb-2"
                    >
                      <User className="h-5 w-5 text-white" />
                      <span className="text-white font-medium">
                        {t('header.profile')}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-full py-3 transition-colors"
                    >
                      <LogOut className="h-5 w-5 text-white" />
                      <span className="text-white font-medium">
                        {t('header.logout')}
                      </span>
                    </button>
                    <div className="items-center gap-2 flex mt-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.75775 2.74818L4.21312 0.2928C4.60365 -0.0977241 5.23681 -0.0977233 5.62734 0.292801L9.68681 4.35227C10.0773 4.74279 10.0773 5.37596 9.68681 5.76648L6.97352 8.47977C6.56452 8.88877 6.46313 9.51359 6.7218 10.0309C8.21715 13.0216 10.6422 15.4467 13.6329 16.942C14.1502 17.2007 14.775 17.0993 15.184 16.6903L17.8973 13.977C18.2879 13.5865 18.921 13.5865 19.3115 13.977L23.371 18.0365C23.7615 18.427 23.7615 19.0602 23.371 19.4507L20.9156 21.9061C18.8043 24.0174 15.4617 24.255 13.073 22.4634L8.91722 19.3466C7.17369 18.0389 5.62487 16.4901 4.31722 14.7466L1.20039 10.5908C-0.591153 8.2021 -0.353604 4.85953 1.75775 2.74818Z"
                          fill="#003863"
                        />
                      </svg>
                      <span className="sm:inline text-[#003863] font-bold">
                        {phoneNumber}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center mt-4">
                      <a
                        href="#"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1168_10985)">
                            <path
                              d="M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z"
                              fill="#003863"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1168_10985">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
                            fill="#003863"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1168_10987)">
                            <path
                              d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
                              fill="#003863"
                            />
                            <path
                              d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
                              fill="#003863"
                            />
                            <path
                              d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z"
                              fill="#003863"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1168_10987">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1168_10988)">
                            <path
                              d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                              fill="#003863"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1168_10988">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </>
                ) : !isAuthPage ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full px-5 h-11 transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      {t('header.loginRegister')}
                    </span>
                    <div className="bg-[#D4E7F6] rounded-full h-9 w-9 flex items-center justify-center">
                      <User className="h-4 w-4 text-black" />
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main navigation section with blue background */}
      <div className="bg-[url('/assets/images/hedar2.png')] bg-cover bg-center py-10">
        <div className="container mx-auto">
          {/* Top row: logo (left) / public nav center (when not auth) / login-right */}
          <div className="flex items-center justify-between mb-6 gap-4">
            {/* Left: Logo */}
            <Link to="/">
              <div>
                <img src="/assets/images/logo.png" alt="Happy Pet Logo" />
              </div>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden flex items-center justify-center w-10 h-10 bg-[#D4E7F6] hover:bg-[#c4d7e6] rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#003863]" />
              ) : (
                <Menu className="h-5 w-5 text-[#003863]" />
              )}
            </button>

            {/* Center: screenshot nav only when NOT authenticated */}
            {!isAuthenticated && (
              <div className="hidden xl:block flex-1 justify-center">
                <PublicScreenshotNav
                  publicNavItems={publicNavItems}
                  publicNavItems2={publicNavItems2}
                  location={location}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  availableLanguages={availableLanguages}
                  language={language}
                  handleSelectLanguage={handleSelectLanguage}
                  dropdownButtonRef={dropdownButtonRef}
                  dropdownPosition={dropdownPosition}
                  t={t}
                />
              </div>
            )}

            {/* Right: login / user */}
            <div className="items-center gap-4 justify-end min-w-[160px] hidden xl:block">
              <div className="">
                {isAuthenticated ? (
                  <UserDropdown onLogout={handleLogout} />
                ) : !isAuthPage ? (
                  <Link to="/login">
                    <div className="flex items-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full pl-5 pr-1 h-11 transition-colors">
                      <span className="text-white text-sm font-medium">
                        {t('header.loginRegister')}
                      </span>
                      <div className="bg-[#D4E7F6] rounded-full h-10 w-10 flex items-center justify-center ml-1">
                        <User className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {/* Desktop Navigation only when authenticated */}
          {isAuthenticated && (
            <AuthenticatedNav
              publicNavItems={publicNavItems}
              publicNavItems2={publicNavItems2}
              protectedNavItems={protectedNavItems}
              location={location}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              availableLanguages={availableLanguages}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
              dropdownButtonRef={dropdownButtonRef}
              dropdownPosition={dropdownPosition}
              t={t}
            />
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </header>
  )
}
