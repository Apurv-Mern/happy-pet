import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Phone, Search, User, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { MdLanguage } from 'react-icons/md'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'

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
  const { isAuthenticated, logout, user } = useAuthStore()
  const { t, setLanguage, availableLanguages } = useTranslation()

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

  const handleLogout = () => {
    logout()
    navigate('/login')
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
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaLinkedinIn className="h-4 w-4" />
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
        className="bg-[url('/assets/images/bg-header.png')] bg-bottom bg-cover bg-no-repeat h-[950px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        {/* Paw print pattern background */}

        <div className="container mx-auto">
          {/* Logo and Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-[0.4fr_auto_0.3fr] items-center gap-4 pt-16">
            <Link to="/">
              {/* Logo placeholder - replace with your actual logo */}
              <div>
                <img src="/assets/images/logo.png" alt="Happy Pet Logo" />
              </div>
            </Link>
            <nav
              className={` hidden lg:flex items-center justify-center text-sm font-medium bg-white backdrop-blur-sm rounded-full py-[5px] px-[5px] mx-auto max-w-fit ${isAuthenticated ? '' : ''}`}
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
                  <div>
                    <span className="text-xl">🇬🇧</span>
                    <span className="text-sm font-medium">Eng</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                  <div className="rounded-full bg-[#fff] h-[48px] w-[48px] flex items-center justify-center ml-1 border-[2px] border-[#003863]">
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
                          <span className="text-xl">{lang.flag}</span>
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
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full pl-5 pr-1 h-11 transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      {user?.name.slice(0, 5).toUpperCase() || 'User'}
                    </span>
                    <div className="bg-[#D4E7F6] rounded-full h-10 w-10 flex items-center justify-center ml-1">
                      <LogOut className="h-5 w-5 text-black" />
                    </div>
                  </button>
                ) : !isAuthPage ? (
                  <Link to="/login">
                    <div className="flex items-center bg-[#0E213A] rounded-full border-[1px] border-[#fff] pl-4 sm:pl-5 lg:pl-6 pr-[2px] pt-[2px] pb-[2px] hover:bg-[#000] hover:text-[#fff] transition">
                      <span className="text-white text-sm font-medium">
                        Login / Register
                      </span>
                      <div className="ml-2 sm:ml-3 flex items-center justify-center w-[45px] h-[45px] bg-[#fff] rounded-full">
                        <User className="h-5 w-5 text-black" />
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
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-between w-full gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full px-5 h-11 transition-colors"
                    >
                      <span className="text-white text-sm font-medium">
                        {user?.name || 'User'}
                      </span>
                      <div className="bg-[#D4E7F6] rounded-full h-9 w-9 flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-black" />
                      </div>
                    </button>
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

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 mt-6">
            {/* Left column - text (shows first on mobile) */}
            <div className="w-full lg:basis-2/3 px-4 lg:px-0">
              <h3 className="text-[28px] sm:text-[38px] md:text-[55px] lg:text-[85px] text-[#fff] leading-tight heading-line">
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
              <img src="/assets/images/image1.png" alt="" />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
