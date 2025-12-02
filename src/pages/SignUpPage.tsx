import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useTranslation } from '@/contexts/I18nContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useRegisterMutation, useSendOtpMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'

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

type SignupFormData = {
  name: string
  email: string
  companyName?: string
  password: string
  phoneNumber: string
  timezone?: string
  preferredLanguage?: string
  userType: 'public' | 'admin'
}

export function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { t } = useTranslation()

  const { isAuthenticated } = useAuthStore()
  const { toast } = useToast()
  const registerMutation = useRegisterMutation()
  const sendOtpMutation = useSendOtpMutation()

  // Country code dropdown state
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971')
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const countryDropdownRef = useRef<HTMLButtonElement>(null)
  const [countryDropdownPosition, setCountryDropdownPosition] = useState({
    top: 0,
    left: 0,
  })

  // Create dynamic validation schema with translations
  const signupSchemaWithTranslations = z.object({
    name: z
      .string()
      .min(4, t('validation.nameMinLength'))
      .refine(val => val.trim().length > 0, {
        message: t('validation.required'),
      }),
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.invalidEmail'))
      .refine(val => val.trim().length > 0, {
        message: t('validation.emailRequired'),
      }),
    phoneNumber: z
      .string()
      .min(7, t('validation.phoneMinLength'))
      .max(15, t('validation.phoneMaxLength'))
      .regex(/^[0-9]+$/, t('validation.phoneInvalid')),
    companyName: z.string().optional(),
    password: z
      .string()
      .min(8, t('validation.passwordMinLength'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('validation.passwordComplexity')
      ),
    timezone: z.string().optional(),
    preferredLanguage: z.string().optional(),
    userType: z.enum(['public', 'admin']).default('public'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchemaWithTranslations),
    defaultValues: {
      name: '',
      email: '',
      preferredLanguage: 'en',
      password: '',
      phoneNumber: '',
      timezone: '',
      userType: 'public',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Handle country dropdown positioning and outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.country-dropdown-container')) {
        setIsCountryDropdownOpen(false)
      }
    }

    const updatePosition = () => {
      if (countryDropdownRef.current) {
        const rect = countryDropdownRef.current.getBoundingClientRect()
        setCountryDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        })
      }
    }

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)

      updatePosition()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isCountryDropdownOpen])

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Combine country code with phone number
      const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`

      const response = await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
        name: data.name,
        company: data.companyName,
        preferredLanguage: data.preferredLanguage,
        phoneNumber: fullPhoneNumber,
        timezone: data.timezone,
        userType: data.userType,
      })

      if (response?.success) {
        try {
          await sendOtpMutation.mutateAsync({ email: data.email })
          toast({
            variant: 'success',
            title:
              t('signupPage.registrationSuccess') || 'Registration Successful!',
            description:
              t('signupPage.checkEmailForVerification') ||
              'Please check your email for verification code.',
          })

          navigate('/verify-email', {
            state: { email: data.email },
            replace: true,
          })
        } catch (otpError: any) {
          console.error('Send OTP error:', otpError)
          toast({
            variant: 'destructive',
            title: t('signupPage.failedToSendOtp') || 'Failed to Send OTP',
            description:
              otpError.response?.data?.message ||
              t('signupPage.couldNotSendVerification') ||
              'Could not send verification code. Please try again.',
          })
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error)

      // Get the error message from backend
      const backendMessage = error.response?.data?.message || ''

      // Translate common backend error messages
      let errorDescription = backendMessage
      if (
        backendMessage.toLowerCase().includes('user already exists') ||
        backendMessage.toLowerCase().includes('already exists')
      ) {
        errorDescription = t('signupPage.userAlreadyExists')
      } else if (backendMessage) {
        errorDescription = backendMessage
      } else {
        errorDescription =
          t('signupPage.tryAgain') ||
          'An error occurred during registration. Please try again.'
      }

      toast({
        variant: 'destructive',
        title: t('signupPage.registrationFailed') || 'Registration Failed',
        description: errorDescription,
      })
    }
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[540px] m-auto py-14"
      >
        <Card className="">
          {/* Header Section */}
          <CardContent className="bg-[#003863] rounded-[30px] py-6 px-6 overflow-visible">
            <h1 className="text-[#fff] heading-line text-[60px] text-center">
              {t('signupPage.register')}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.name')}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('signupPage.namePlaceholder')}
                  {...register('name')}
                  className="w-full bg-white text-gray-900  text-sm placeholder:text-gray-400"
                />
                {errors.name && (
                  <p className="text-xs text-red-300">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('signupPage.emailPlaceholder')}
                  {...register('email')}
                  className="w-full bg-white text-gray-900  text-sm placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="text-xs text-red-300">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Field with Country Code */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.phoneNumber')}
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
                      className="flex items-center bg-white rounded-[15px] px-3 py-2 gap-2 min-w-[110px] h-[42px] hover:bg-gray-50 transition-colors"
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
                          target.src =
                            'https://via.placeholder.com/24x16?text=Flag'
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
                      <>
                        <div className="absolute w-64 max-h-80 rounded-[20px] bg-white shadow-2xl z-[99999]">
                          <div className="p-2">
                            {countryCodes.map(country => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={e => {
                                  e.stopPropagation()
                                  setSelectedCountryCode(country.code)
                                  setIsCountryDropdownOpen(false)
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
                                <span className="font-semibold">
                                  {country.code}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={t('signupPage.phoneNumberPlaceholder')}
                    {...register('phoneNumber')}
                    className="flex-1 bg-white text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-300">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Company Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="companyName"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.companyName')}
                </label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder={t('signupPage.companyNamePlaceholder')}
                  {...register('companyName')}
                  className="w-full bg-white text-gray-900  text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.password')}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('signupPage.passwordPlaceholder')}
                  {...register('password')}
                  className="w-full bg-white text-gray-900  text-sm placeholder:text-gray-400"
                />
                {errors.password && (
                  <p className="text-xs text-red-300">
                    {errors.password.message}
                  </p>
                )}
                {!errors.password && (
                  <p className="text-xs text-gray-300">
                    {t('validation.passwordHelper')}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full bg-white text-[#003057] hover:bg-[#004C82] hover:text-[#fff] font-semibold rounded-full h-12 text-sm mt-5 flex items-center justify-center"
                disabled={isSubmitting || registerMutation.isPending}
              >
                {(isSubmitting || registerMutation.isPending) && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#003057]"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {isSubmitting || registerMutation.isPending
                  ? t('signupPage.registering')
                  : t('signupPage.signupButton')}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-white">
                  {t('signupPage.haveAccount')}{' '}
                  <Link to="/login" className="font-semibold hover:underline">
                    {t('loginPage.loginButton')}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
