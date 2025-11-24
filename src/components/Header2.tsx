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
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'
import { UserDropdown } from './UserDropdown'

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

export function Header2() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const { isAuthenticated, logout } = useAuthStore()
  const { t, setLanguage, availableLanguages, language } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English')

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

  // Prevent background scrolling when mobile menu is open
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

  const handleSelectLanguage = (code: string) => {
    setLanguage(code)
    setIsDropdownOpen(false)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langName = e.target.value
    setSelectedLanguage(langName)
    // Find the language code from the name
    const lang = availableLanguages.find(l => l.name === langName)
    if (lang) {
      setLanguage(lang.code)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="w-full">
      {/* Top dark band */}
      <div className="bg-[#0E213A] text-white">
        <div className="container mx-auto py-2.5 flex items-center justify-end gap-5 text-sm">
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

        {/* Mobile Navigation Menu - fixed overlay centered card */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-[#003863] bg-opacity-80 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Centered card */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4">
              <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative">
                {/* Internal close button */}
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute -top-5 right-3 bg-[#D4E7F6] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                >
                  <X className="h-5 w-5 text-[#003863]" />
                </button>

                {/* Mobile Search Bar */}
                <div className="flex items-center gap-2 bg-[#D4E7F6] rounded-full px-4 py-2 mb-6">
                  <Input
                    placeholder="Find the best for your pet..."
                    className="flex-1 border-none bg-transparent focus-visible:outline-none focus:ring-0 focus:border-transparent h-9 text-[#003863] placeholder:text-[#003863] font-normal text-base"
                  />
                  <Button className="h-8 w-8 rounded-full p-0 bg-[#035FA6] hover:bg-[#024d85]">
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="flex flex-col gap-3">
                  <Link
                    to="/"
                    className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/faq"
                    className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FAQ's
                  </Link>

                  {isAuthenticated && (
                    <>
                      {protectedNavItems.map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </>
                  )}

                  {/* Language Selector */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between py-2 px-4">
                      <span className="text-[#003863] font-medium">
                        Language
                      </span>
                      <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="bg-[#D4E7F6] text-[#003863] rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-[#035FA6]"
                      >
                        {availableLanguages.map(lang => (
                          <option key={lang.code} value={lang.name}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Login/Logout Button */}
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
                          <span className="text-white font-medium">
                            Profile
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
                          <span className="text-white font-medium">Logout</span>
                        </button>
                      </>
                    ) : !isAuthPage ? (
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full py-3 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-white font-medium">
                          Login / Register
                        </span>
                        <User className="h-5 w-5 text-white" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main navigation section with blue background and paw prints */}
      <div className="bg-[url('/assets/images/hedar2.png')] bg-cover bg-center py-10">
        {/* Paw print pattern background */}

        <div className="container mx-auto">
          {/* Logo and Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-6 gap-4">
            <Link to="/">
              {/* Logo placeholder - replace with your actual logo */}
              <div>
                <img src="/assets/images/logo.png" alt="Happy Pet Logo" />
              </div>
            </Link>

            <div className="flex items-center gap-4 justify-end">
              {/* Search bar - hidden on mobile */}
              {/* <div className="hidden lg:flex items-center gap-2 bg-white rounded-full pt-[5px] pl-[20px] pb-[5px] pr-[20px]">
                <Input
                  placeholder="Find the best for your pet..."
                  className="w-64 border-none focus-visible:outline-none focus:ring-0 focus:border-transparent h-9 text-[#003863] placeholder:text-[#003863] font-normal text-lg"
                />
                <Button className="h-8 w-8 rounded-full  p-0 bg-[#035FA6] hover:bg-[#024d85]">
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div> */}

              {/* Login/User button - hidden on small mobile */}
              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <UserDropdown onLogout={handleLogout} />
                ) : !isAuthPage ? (
                  <Link to="/login">
                    <div className="flex items-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full pl-5 pr-1 h-11 transition-colors">
                      <span className="text-white text-sm font-medium">
                        Login / Register
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

          {/* Desktop Navigation Menu */}
          <nav
            className={`hidden lg:flex items-center justify-center text-sm font-medium bg-white backdrop-blur-sm rounded-full py-[5px] px-[5px] mx-auto max-w-fit ${isAuthenticated ? '' : ''}`}
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
                className="flex items-center gap-2 bg-[#003d66] hover:bg-[#002d4d] text-white rounded-full h-11 pl-4 pr-1.5 transition-colors"
              >
                <img
                  src={
                    availableLanguages.find(l => l.code === language)?.flag ||
                    'https://flagcdn.com/w40/gb.png'
                  }
                  alt="flag"
                  className="w-6 h-4 object-cover rounded"
                />
                <span className="text-sm font-medium">
                  {availableLanguages
                    .find(l => l.code === language)
                    ?.name.slice(0, 3) || 'Eng'}
                </span>
                <ChevronDown className="h-4 w-4" />
                <div className="rounded-full bg-[#D4E7F6] h-10 w-10 flex items-center justify-center ml-1">
                  <MdLanguage className="text-black h-6 w-6" />
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
        </div>
      </div>
    </header>
  )
}
