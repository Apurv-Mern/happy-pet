import { useTranslation } from '@/contexts/I18nContext'
import { useState, useRef, useEffect } from 'react'

// Country codes with flags
const countryCodes = [
  { code: '+971', country: 'UAE', flag: 'https://flagcdn.com/w40/ae.png' },
  {
    code: '+966',
    country: 'Saudi Arabia',
    flag: 'https://flagcdn.com/w40/sa.png',
  },
  { code: '+1', country: 'USA', flag: 'https://flagcdn.com/w40/us.png' },
  { code: '+49', country: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  { code: '+60', country: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
  { code: '+66', country: 'Thailand', flag: 'https://flagcdn.com/w40/th.png' },
  { code: '+62', country: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
]

interface PersonalInformationProps {
  formData: {
    fullName: string
    email: string
    // address: string
    companyName: string
    phoneNumber: string
    // dob: string
    // postalCode: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onDiscard: () => void
  isLoading?: boolean
}

export const PersonalInformation = ({
  formData,
  onInputChange,
  onSave,
  onDiscard,
  isLoading = false,
}: PersonalInformationProps) => {
  const { t } = useTranslation()

  // Extract country code from phone number if it exists
  const getInitialCountryCode = () => {
    if (!formData.phoneNumber) return '+971'
    const phoneStr = formData.phoneNumber.toString()
    const match = countryCodes.find(c => phoneStr.startsWith(c.code))
    return match ? match.code : '+971'
  }

  // Country code dropdown state
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    getInitialCountryCode()
  )
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const countryDropdownRef = useRef<HTMLButtonElement>(null)

  // Handle country dropdown outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.country-dropdown-container')) {
        setIsCountryDropdownOpen(false)
      }
    }

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCountryDropdownOpen])

  // Get phone number without country code
  const getPhoneNumberWithoutCode = () => {
    if (!formData.phoneNumber) return ''
    const phoneStr = formData.phoneNumber.toString()
    const match = countryCodes.find(c => phoneStr.startsWith(c.code))
    return match ? phoneStr.slice(match.code.length) : phoneStr
  }

  return (
    <>
      <h3 className="text-[30px] font-bold text-[#003863] mb-8">
        {t('profilePage.personalInformation')}
      </h3>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.fullName')}
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder={t('profilePage.fullNamePlaceholder')}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder={t('profilePage.emailPlaceholder')}
          />
        </div>

        {/* Address */}
        {/* <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.address')}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder={t('profilePage.addressPlaceholder')}
          />
        </div> */}

        {/* Company Name & Phone Number */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.companyName')}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.companyNamePlaceholder')}
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.phoneNumber')}
            </label>
            <div className="flex gap-2">
              {/* Country Code Dropdown */}
              <div className="relative country-dropdown-container">
                <button
                  ref={countryDropdownRef}
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }}
                  className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-3 gap-2 min-w-[110px] h-[50px] hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={
                      countryCodes.find(c => c.code === selectedCountryCode)
                        ?.flag || 'https://flagcdn.com/w40/ae.png'
                    }
                    alt="flag"
                    className="w-6 h-4 object-cover rounded"
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/24x16?text=Flag'
                    }}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {selectedCountryCode}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Country Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div className="absolute w-64 max-h-80 rounded-[20px] bg-white shadow-2xl z-[99999] mt-1">
                    <div className="p-2">
                      {countryCodes.map(country => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={e => {
                            e.stopPropagation()
                            setSelectedCountryCode(country.code)
                            setIsCountryDropdownOpen(false)
                            // Update phone number with new country code
                            const phoneWithoutCode = getPhoneNumberWithoutCode()
                            const syntheticEvent = {
                              target: {
                                name: 'phoneNumber',
                                value: `${country.code}${phoneWithoutCode}`,
                              },
                            } as React.ChangeEvent<HTMLInputElement>
                            onInputChange(syntheticEvent)
                          }}
                          className="flex w-full items-center gap-3 rounded-[15px] px-4 py-3 text-sm font-medium text-[#003863] hover:bg-[#F3FBFF] transition"
                        >
                          <img
                            src={country.flag}
                            alt={country.country}
                            className="w-6 h-4 object-cover rounded"
                            onError={e => {
                              const target = e.target as HTMLImageElement
                              target.src =
                                'https://via.placeholder.com/24x16?text=Flag'
                            }}
                          />
                          <span className="flex-1 text-left">
                            {country.country}
                          </span>
                          <span className="font-semibold">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                name="phoneNumber"
                value={getPhoneNumberWithoutCode()}
                onChange={e => {
                  // Combine country code with the input value
                  const syntheticEvent = {
                    target: {
                      name: 'phoneNumber',
                      value: `${selectedCountryCode}${e.target.value}`,
                    },
                  } as React.ChangeEvent<HTMLInputElement>
                  onInputChange(syntheticEvent)
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl search-bar"
                placeholder={t('profilePage.phoneNumberPlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* D.O.B & Postal Code */}
        {/* <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.dob')}
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.postalCode')}
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.postalCodePlaceholder')}
            />
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onDiscard}
            disabled={isLoading}
            className="w-full max-w-[450px] px-8 py-3 border-2 border-[#003863] text-[#003863] rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('profilePage.discardChanges')}
          </button>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="w-full max-w-[450px] px-8 py-3 bg-[#003863] text-white rounded-xl font-semibold hover:bg-[#004c82] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{t('profilePage.saving')}</span>
              </>
            ) : (
              t('profilePage.saveChanges')
            )}
          </button>
        </div>
      </div>
    </>
  )
}
