import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Phone, Search, User, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { MdLanguage } from 'react-icons/md'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'
import { UserDropdown } from './UserDropdown'
import { chatApi } from '@/api/chat'
import { useQueryClient } from '@tanstack/react-query'

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

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const { isAuthenticated, logout } = useAuthStore()
  const { t, setLanguage, availableLanguages, language } = useTranslation()
  const queryClient = useQueryClient()
  // Check if current page is an authentication page
  const isAuthPage = [
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
  ].includes(location.pathname)

  // Define navigation items with translations
  const publicNavItems = [
    { path: '/', label: t('header.home') },
    { path: '/about', label: t('header.about') },
    { path: '/faqs', label: t('header.faqs') },
    { path: '/contact', label: t('header.contact') },
  ]

  const protectedNavItems = [
    { path: '/knowledge-hub', label: t('header.knowledgeHub') },
    { path: '/learning-module', label: t('header.learningModule') },
    { path: '/ai-agent', label: t('header.aiAgent') },
  ]

  const handleSelectLanguage = (code: string) => {
    setLanguage(code)
    setIsDropdownOpen(false)
  }

  const handleLogout = async () => {
    navigate('/')

    // Delete AI Agent session if it exists
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
    logout()
  }

  return (
    <header className="w-full">
      {/* Top dark band */}
      <motion.div
        className="bg-[#0E213A] text-white"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-end gap-5 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 6799009980</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Social media icons - hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1168_10985)">
                    <path
                      d="M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1168_10985">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1168_10987)">
                    <path
                      d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
                      fill="white"
                    />
                    <path
                      d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
                      fill="white"
                    />
                    <path
                      d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1168_10987">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1168_10988)">
                    <path
                      d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                      fill="white"
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

            {/* Hamburger Menu Button - visible on mobile/tablet */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-[#D4E7F6] hover:bg-[#c4d7e6] rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#003863]" />
              ) : (
                <Menu className="h-5 w-5 text-[#003863]" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main navigation section with blue background and paw prints */}
      <motion.div
        className="bg-[url('/assets/images/bg-header.png')] bg-bottom bg-cover bg-no-repeat h-full min-h-[800px] 2xl:min-h-[1000px] xl:min-h-[800px] lg:min-h-[800px] md:min-h-[650px] sm:min-h-[800px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        {/* Paw print pattern background */}

        <div className="container mx-auto">
          {/* Logo and Navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_auto_0.3fr]  md:grid-cols-[0.4fr_auto_0.3fr] sm:grid-cols-[0.4fr_auto_0.3fr] items-center gap-4 pt-16">
            <Link to="/">
              {/* Logo placeholder - replace with your actual logo */}
              <div>
                <img src="/assets/images/logo.png" alt="Happy Pet Logo" />
              </div>
            </Link>
            <nav
              className={`  hidden lg:flex items-center justify-center text-sm font-medium bg-white backdrop-blur-sm rounded-full py-[5px] px-[5px] mx-auto max-w-fit  ${isAuthenticated ? '' : ''}`}
            >
              {publicNavItems.map(item => (
                <NavLink
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  isActive={location.pathname === item.path}
                />
              ))}

              {isAuthenticated &&
                protectedNavItems.map(item => (
                  <NavLink
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    isActive={location.pathname === item.path}
                  />
                ))}

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-[#0E213A] hover:bg-[#002d4d] text-white rounded-full pl-[16px] transition-colors ml-[6px]"
                >
                  {' '}
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        availableLanguages.find(l => l.code === language)
                          ?.flag || 'https://flagcdn.com/w40/gb.png'
                      }
                      alt="flag"
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="text-sm font-medium">
                      {availableLanguages
                        .find(l => l.code === language)
                        ?.name.slice(0, 3) || 'Eng'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                  <div className='w-[0.64px] h-[25px] bg-[#fff]'></div>
                  <div className="rounded-full bg-[#fff] h-[48px] w-[48px] flex items-center justify-center border-[2px] border-[#003863]">
                    <MdLanguage className="text-[#003863] h-[34px] w-[34px]" />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-[26px] border border-[#0E213A] bg-[#003d66] p-5 text-white shadow-2xl z-50">
                    <h3 className="text-2xl font-semibold italic text-center mb-5">
                      Select Language
                    </h3>
                    <div className="space-y-3">
                      {availableLanguages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className="flex w-full items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#003863] hover:shadow-lg transition"
                        >
                          <img
                            src={lang.flag}
                            alt={lang.name}
                            className="w-6 h-4 object-cover rounded"
                          />
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-4 justify-end">
              {/* Search bar - hidden on mobile */}
              {/* <div className="hidden lg:flex items-center gap-2 pl-3 bg-white rounded-full">
                <Input
                  placeholder="Find the best for your pet..."
                  className="search-bar w-64 border-none focus:ring-0 focus:border-transparent h-9 text-[#003863] placeholder:text-[#003863] font-normal text-lg"
                />
                <Button className="h-[44px] w-[44px] rounded-full  p-0 bg-[#0E213A] border-2 hover:bg-[#0E213A]">
                  <Search className="h-[22px] w-[22px] text-white" />
                </Button>
              </div> */}

              {/* Login/User button - hidden on small mobile */}
              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <UserDropdown onLogout={handleLogout} />
                ) : !isAuthPage ? (
                  <Link to="/login">
                    <div className="flex items-center bg-[#0E213A] rounded-full border-[1px] border-[#fff] pl-4 sm:pl-5 lg:pl-6 pr-[2px] pt-[2px] pb-[2px] hover:bg-[#000] hover:text-[#fff] transition">
                      <span className="text-white text-sm font-medium">
                        Login / Register
                      </span>
                      <div className="ml-2 sm:ml-3 flex items-center justify-center w-[45px] h-[45px] bg-[#fff] rounded-full">                        
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0806 23.5912C24.6702 23.4683 25.0213 22.8521 24.7395 22.3199C24.0074 20.9373 22.8168 19.7225 21.2785 18.8044C19.365 17.6625 17.0205 17.0435 14.6086 17.0435C12.1967 17.0435 9.85217 17.6625 7.93867 18.8044C6.40039 19.7225 5.20977 20.9373 4.47766 22.3199C4.19581 22.8521 4.54692 23.4683 5.13653 23.5912L6.44772 23.8644C11.8305 24.9862 17.3867 24.9862 22.7694 23.8644L24.0806 23.5912Z" fill="#0E213A"/>
                        <circle cx="14.6089" cy="9.7393" r="6.08696" fill="#0E213A"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-3xl p-6 shadow-xl animate-in slide-in-from-top">
              {/* Search bar for mobile */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Input
                  placeholder="Search..."
                  className="border-none focus-visible:outline-none focus:ring-0 focus:border-transparent h-9 text-[#003863] placeholder:text-[#003863] bg-transparent"
                />
                <Button className="h-8 w-8 rounded-full p-0 bg-[#035FA6] hover:bg-[#024d85]">
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex flex-col space-y-4">
                {publicNavItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[#003863] font-medium py-2 px-4 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#E1EEF4] text-[#035FA6]'
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
                      className={`text-[#003863] font-medium py-2 px-4 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-[#E1EEF4] text-[#035FA6]'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                {/* Language Selector in Mobile Menu */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full gap-2 bg-[#003d66] hover:bg-[#002d4d] text-white rounded-full h-11 px-4 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🇬🇧</span>
                      <span className="text-sm font-medium">English</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="mt-3 space-y-2">
                      {availableLanguages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleSelectLanguage(lang.code)
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[#003863] hover:bg-gray-200 transition"
                        >
                          
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Login/Logout Button for Mobile */}
                <div className="pt-4 border-t border-gray-200">
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
                        <span className="text-white font-medium">Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-full py-3 transition-colors"
                      >
                        <LogOut className="h-5 w-5 text-white" />
                        <span className="text-white font-medium">Logout</span>
                      </button>
                    </>
                  ) : !isAuthPage ? (
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full px-5 h-11 transition-colors"
                    >
                      <span className="text-white text-sm font-medium">
                        Login / Register
                      </span>
                      <div className="bg-[#D4E7F6] rounded-full h-9 w-9 flex items-center justify-center">
                        <User className="h-4 w-4 text-black" />
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center gap-6 lg:gap-0 mt-6">
            {/* Left column - text (shows first on mobile) */}
            <div className="w-full lg:basis-2/3 px-4 lg:px-0">
              <h3 className="text-[28px] sm:text-[38px] md:text-[45px] lg:text-[85px] text-[#fff] leading-tight heading-line">
                {t('header.heroTitle')}
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-[#fff] font-semibold mt-3">
                {t('header.heroSubtitle')}
              </p>
              <button className="flex items-center bg-[#fff] text-black font-semibold text-sm sm:text-base lg:text-lg rounded-full pl-4 sm:pl-5 lg:pl-6 pr-[2px] pt-[2px] pb-[2px] mt-5 lg:mt-7 hover:bg-[#0E213A] hover:text-[#fff] transition">
                {t('header.getStarted')}
                <span className="ml-2 sm:ml-3 flex items-center justify-center w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[49px] lg:h-[49px] bg-[#0E213A] rounded-full border-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#fff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right column - background image (shows second on mobile) */}
            <div className="">
              <img src="/assets/images/image1.png" alt="" className="max-w-[400px] sm:max-w-[400px] md:w-full md:max-w-full lg:w-full lg:max-w-full xl:w-full xl:max-w-full 2xl:w-full 2xl:max-w-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
