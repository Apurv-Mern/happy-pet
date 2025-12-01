import { useEffect, useState } from 'react'
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

type SignupFormData = {
  name: string
  email: string
  companyName?: string
  password: string
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

  // Create dynamic validation schema with translations
  const signupSchemaWithTranslations = z.object({
    name: z
      .string()
      .min(
        4,
        t('validation.nameMinLength') || 'Name must be at least 2 characters'
      )
      .refine(val => val.trim().length > 0, {
        message: t('validation.required') || 'This field is required',
      }),
    email: z
      .string()
      .min(1, t('validation.emailRequired') || 'Email is required')
      .email(t('validation.invalidEmail') || 'Invalid email address')
      .refine(val => val.trim().length > 0, {
        message: t('validation.emailRequired') || 'Email is required',
      }),
    companyName: z.string().optional(),
    password: z
      .string()
      .min(
        6,
        t('validation.passwordMinLength') ||
          'Password must be at least 6 characters'
      )
      .refine(val => val.trim().length > 0, {
        message: t('validation.passwordMinLength') || 'Password is required',
      }),
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
      // phoneNumber: '',
      timezone: '',
      userType: 'public',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Combine country code with phone number
      // const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`

      const response = await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
        name: data.name,
        company: data.companyName,
        preferredLanguage: data.preferredLanguage,
        // phoneNumber: fullPhoneNumber,
        timezone: data.timezone,
        userType: data.userType,
      })

      if (response?.success) {
        try {
          await sendOtpMutation.mutateAsync({ email: data.email })
          toast({
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
      toast({
        variant: 'destructive',
        title: t('signupPage.registrationFailed') || 'Registration Failed',
        description:
          error.response?.data?.message ||
          t('signupPage.tryAgain') ||
          'An error occurred during registration. Please try again.',
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
        <Card className="border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Header Section */}
          <CardContent className="bg-[#003863] py-6 px-6">
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

              {/* phoneNumber Number Field with Country Code */}
              {/* <div className="space-y-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-xs font-medium text-white block"
                >
                  {t('signupPage.phoneNumber')}
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-white  rounded-[15px] px-3 gap-2 min-w-[85px]">
                    <span className="text-xl">🇦🇪</span>
                    <Select
                      value={selectedCountryCode}
                      onValueChange={(value: string) => {
                        setSelectedCountryCode(value)
                      }}
                    >
                      <SelectTrigger className="border-none h-10 w-[60px] p-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+971">+971</SelectItem>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={t('signupPage.phoneNumberPlaceholder')}
                    {...register('phoneNumber')}
                    className="flex-1 bg-white text-gray-900  text-sm"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-300">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div> */}

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
