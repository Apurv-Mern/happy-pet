import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Phone, Search, User, LogOut, ChevronDown, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from '@/contexts/I18nContext'
import { UserDropdown } from './UserDropdown'
import { chatApi } from '@/api/chat'
import { useQueryClient } from '@tanstack/react-query'
import { MdLanguage } from 'react-icons/md'


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

// Desktop nav when NOT authenticated (screenshot-style pill)
// Parent will center this with flex.
const PublicScreenshotNav = ({
  publicNavItems,
  location,
  isDropdownOpen,
  setIsDropdownOpen,
  availableLanguages,
  language,
  handleSelectLanguage,
  dropdownButtonRef,
  dropdownPosition,
}: any) => (
  <div className="  hidden lg:flex items-center justify-center text-sm font-medium bg-white rounded-full py-[5px] px-[5px] mx-auto max-w-fit  ">
    {publicNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={location.pathname === item.path}
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
        <div className='w-[0.64px] h-[25px] bg-[#fff]'></div>
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
              Select Language
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
  protectedNavItems,
  location,
  isDropdownOpen,
  setIsDropdownOpen,
  availableLanguages,
  language,
  handleSelectLanguage,
  dropdownButtonRef,
  dropdownPosition,
}: any) => (
  <nav className="hidden lg:flex items-center justify-center text-sm font-medium bg-white rounded-full py-[5px] px-[5px] mx-auto max-w-fit">
    {publicNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={location.pathname === item.path}
      />
    ))}

    {protectedNavItems.map((item: any) => (
      <NavLink
        key={item.path}
        path={item.path}
        label={item.label}
        isActive={location.pathname === item.path}
      />
    ))}

    {/* Language Selector Dropdown */}
    <div className="relative z-50">
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
        <div className='w-[0.64px] h-[25px] bg-[#fff]'></div>
        <div className="rounded-full bg-[#fff] h-[48px] w-[48px] flex items-center justify-center border-[2px] border-[#003863]">
          <MdLanguage className="text-[#003863] h-[34px] w-[34px]" />
        </div>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="absolute w-64 rounded-[26px] border border-[#0E213A] bg-[#003d66] p-5 text-white shadow-2xl z-[9999]"
          >
            <h3 className="text-2xl font-semibold italic text-center mb-5">
              Select Language
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
  const dropdownButtonRef = React.useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const { isAuthenticated, logout } = useAuthStore()
  const { t, setLanguage, availableLanguages, language } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English')
  const queryClient = useQueryClient()

  const isAuthPage = [
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
  ].includes(location.pathname)

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
    logout()
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
            {/* Social icons ... keep as in your original */}

            {/* Hamburger Menu Button */}
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

        {/* Mobile menu (same for both auth states) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="fixed inset-0 bg-[#003863] bg-opacity-80 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4">
              <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative">
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute -top-5 right-3 bg-[#D4E7F6] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                >
                  <X className="h-5 w-5 text-[#003863]" />
                </button>

                <div className="flex items-center gap-2 bg-[#D4E7F6] rounded-full px-4 py-2 mb-6">
                  <Input
                    placeholder="Find the best for your pet..."
                    className="flex-1 border-none bg-transparent focus-visible:outline-none focus:ring-0 focus:border-transparent h-9 text-[#003863] placeholder:text-[#003863] font-normal text-base"
                  />
                  <Button className="h-8 w-8 rounded-full p-0 bg-[#035FA6] hover:bg-[#024d85]">
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  {publicNavItems.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-[#003863] hover:text-[#035FA6] font-medium py-2 px-4 rounded-lg hover:bg-[#F3FBFF] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

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

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between py-2 px-4">
                      <span className="text-[#003863] font-medium">
                        {t('header.language')}
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
                      </>
                    ) : !isAuthPage ? (
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center gap-2 bg-[#003d66] hover:bg-[#002d4d] rounded-full py-3 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-white font-medium">
                          {t('header.loginRegister')}
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

            {/* Center: screenshot nav only when NOT authenticated */}
            {!isAuthenticated && (
              <div className="hidden lg:flex flex-1 justify-center">
                <PublicScreenshotNav
                  publicNavItems={publicNavItems}
                  location={location}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  availableLanguages={availableLanguages}
                  language={language}
                  handleSelectLanguage={handleSelectLanguage}
                  dropdownButtonRef={dropdownButtonRef}
                  dropdownPosition={dropdownPosition}
                />
              </div>
            )}

            {/* Right: login / user */}
            <div className="flex items-center gap-4 justify-end min-w-[160px]">
              <div className="hidden sm:block">
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
              protectedNavItems={protectedNavItems}
              location={location}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              availableLanguages={availableLanguages}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
              dropdownButtonRef={dropdownButtonRef}
              dropdownPosition={dropdownPosition}
            />
          )}
        </div>
      </div>
    </header>
  )
}
