// EXAMPLE: Updated Header Component with Localization
// File: src/components/Header.tsx (with i18n)

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from './src/components/ui/input'
import { Button } from './src/components/ui/button'
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
import { useAuthStore } from './src/store/useAuthStore.ts'
import { useTranslation } from './src/contexts/I18nContext' // Import translation hook

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const { isAuthenticated, logout, user } = useAuthStore()
  const { t, language, setLanguage, availableLanguages } = useTranslation() // Use translation hook

  // Define navigation items using translations
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
    setLanguage(code) // Change language
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
      className={`relative pb-1 transition-colors hover:text-[#035FA6] ${
        isActive ? 'text-[#003863]' : 'text-[#003863]'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003863]" />
      )}
    </Link>
  )

  return (
    <header className="w-full">
      {/* Top dark band */}
      <motion.div
        className="bg-[#003863] text-white"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container mx-auto p-4 px-6 py-2.5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{t('header.phoneNumber')}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Social media icons */}
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

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors"
              >
                <MdLanguage className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">
                  {t('header.selectLanguage')}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {availableLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                        language === lang.code ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm text-gray-700">{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1 hover:opacity-80"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t('header.profile')}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:opacity-80"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('header.logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 bg-white text-[#003863] rounded hover:bg-gray-100 transition-colors"
              >
                {t('header.login')}
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main navigation */}
      <motion.div
        className="bg-white border-b"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/assets/images/logo.png"
                alt={t('common.appName')}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {publicNavItems.map(item => (
                <NavLink
                  key={item.path}
                  {...item}
                  isActive={location.pathname === item.path}
                />
              ))}
              {isAuthenticated &&
                protectedNavItems.map(item => (
                  <NavLink
                    key={item.path}
                    {...item}
                    isActive={location.pathname === item.path}
                  />
                ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder={t('common.search')}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-6 px-0"
                />
              </div>
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden py-4 border-t"
            >
              <div className="flex flex-col gap-4">
                {publicNavItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-[#003863] hover:text-[#035FA6] py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated &&
                  protectedNavItems.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-[#003863] hover:text-[#035FA6] py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </motion.nav>
          )}
        </div>
      </motion.div>
    </header>
  )
}
