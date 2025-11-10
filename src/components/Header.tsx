import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Phone, Search, User, ChevronDown, LogOut } from 'lucide-react'
import { MdLanguage } from 'react-icons/md'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

// Define navigation items
const publicNavItems = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT US' },
  { path: '/faqs', label: 'FAQS' },
  { path: '/contact', label: 'CONTACT US' },
]

const protectedNavItems = [
  { path: '/knowledge-hub', label: 'KNOWLEDGE HUB' },
  { path: '/learning-module', label: 'LEARNING MODULE' },
  { path: '/ai-agent', label: 'AI AGENT' },
]

const languages = [
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
]

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
    className={`relative pb-1 transition-colors hover:text-[#035FA6] ${isActive ? 'text-[#003863]' : 'text-[#003863]'
      }`}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003863]" />
    )}
  </Link>
)

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const { isAuthenticated, logout, user } = useAuthStore()

  const handleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const handleSelectLanguage = (code: string) => {
    // TODO: integrate with i18n solution
    console.log('Selected language:', code)
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Helper function to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="w-full">
      {/* Top dark band */}
      <div className="bg-[#003863] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-2.5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+91 6799009980</span>
          </div>
          <div className="flex items-center gap-5">
            {/* Social media icons */}
            <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>

      {/* Main navigation section with blue background and paw prints */}
      <div
        className="w-full relative overflow-visible"
        style={{
          background: '#E1EEF4',
          minHeight: '180px',
        }}
      >
        {/* Paw print pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 30c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm10-8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm10 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm10 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM35 40c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 py-5">
          {/* Logo and Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-3">
              {/* Logo placeholder - replace with your actual logo */}
              <div className="text-black font-bold text-2xl flex items-center gap-2">
                <span className="text-3xl">🐕</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl">HAPPY DOG</span>
                  <span className="text-xl">HAPPY CAT</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {/* Search bar */}
              <div className="flex items-center gap-2 bg-white rounded-full pl-4 pr-2 h-11 w-[320px]">
                <Input
                  placeholder="Find the best for your pet..."
                  className="border-none h-9 text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 text-sm"
                />
                <Button className="h-8 w-8 rounded-full p-0 bg-[#035FA6] hover:bg-[#024d85]">
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div>

              {/* Login/Register or Logout button */}
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
              ) : (
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
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center justify-center gap-8 text-sm font-medium bg-white backdrop-blur-sm rounded-full px-8 py-3 mx-auto max-w-fit">
            {publicNavItems.map(item => (
              <NavLink
                key={item.path}
                path={item.path}
                label={item.label}
                isActive={location.pathname === item.path}
              />
            ))}

            {isAuthenticated && protectedNavItems.map(item => (
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
                <span className="text-xl">🇬🇧</span>
                <span className="text-sm font-medium">Eng</span>
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
                    {languages.map(lang => (
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
        </div>
      </div>
    </header>
  )
}
