// EXAMPLE: Updated LoginPage Component with Localization
// File: src/pages/LoginPage.tsx (with i18n)

import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from './src/store/useAuthStore.ts'
import { useLoginMutation, useSendOtpMutation } from './src/api/auth'
import { Button } from './src/components/ui/button'
import { Input } from './src/components/ui/input'
import { Card, CardContent, CardHeader } from './src/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from './src/hooks/use-toast'
import { useTranslation } from './src/contexts/I18nContext' // Import translation hook

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()
  const sendOtpMutation = useSendOtpMutation()
  const { toast } = useToast()
  const { t } = useTranslation() // Use translation hook

  // Create schema with translated validation messages
  const loginSchema = z.object({
    email: z.string().email(t('validation.invalidEmail')),
    password: z.string().min(6, t('validation.passwordMinLength')),
  })

  type LoginFormData = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      const from =
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: response => {
          if (response.success) {
            // Check if email is verified
            if (!response.data.user.isEmailVerified) {
              // Send OTP for unverified email
              sendOtpMutation.mutate(
                { email: data.email },
                {
                  onSuccess: () => {
                    toast({
                      title: t('loginPage.emailNotVerified'),
                      description: t('loginPage.verificationCodeSent'),
                    })

                    // Navigate to verify email page with email
                    navigate('/verify-email', {
                      state: { email: data.email },
                      replace: true,
                    })
                  },
                  onError: (otpError: any) => {
                    console.error('Send OTP error:', otpError)
                    toast({
                      variant: 'destructive',
                      title: t('loginPage.loginFailed'),
                      description:
                        otpError.response?.data?.message ||
                        'Could not send verification code. Please try again.',
                    })
                  },
                }
              )
              return
            }

            // Email is verified, proceed with login
            login(
              response.data.user,
              response.data.tokens.accessToken,
              response.data.tokens.refreshToken
            )

            toast({
              title: t('loginPage.loginSuccess'),
              description: `${t('loginPage.title')} ${response.data.user.name}`,
            })

            const from =
              (location.state as { from?: { pathname?: string } })?.from
                ?.pathname || '/'
            navigate(from, { replace: true })
          }
        },
        onError: (error: any) => {
          console.error('Login error:', error)
          toast({
            variant: 'destructive',
            title: t('loginPage.loginFailed'),
            description:
              error.response?.data?.message ||
              t('loginPage.invalidCredentials'),
          })
        },
      }
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex mt-10 mb-10 items-center justify-center bg-gradient-to-br">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px]"
      >
        <Card className="border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Top curved banner */}
          <div className="h-[220px] w-full bg-[#003863] shadow-[0_8px_20px_rgba(0,0,0,0.3)] rounded-b-[120px]"></div>

          {/* Title */}
          <CardHeader className="pt-6 pb-0">
            <h1 className="text-[40px] leading-tight text-center text-[#003863] font-serif italic">
              {t('loginPage.title')}
            </h1>
            <p className="text-center text-gray-600 mt-2">
              {t('loginPage.subtitle')}
            </p>
          </CardHeader>

          <CardContent className="bg-[#003863] px-6 pb-8 pt-6 mt-4 rounded-t-[24px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white block"
                >
                  {t('loginPage.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('loginPage.emailPlaceholder')}
                  {...register('email')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                />
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white block"
                >
                  {t('loginPage.password')}
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('loginPage.passwordPlaceholder')}
                    {...register('password')}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? t('loginPage.hidePassword')
                        : t('loginPage.showPassword')
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-300">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white"
                  />
                  <span>{t('loginPage.rememberMe')}</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-white hover:underline"
                >
                  {t('loginPage.forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-white text-[#003863] hover:bg-gray-100 h-12 rounded-[15px] font-medium text-base"
              >
                {loginMutation.isPending
                  ? t('common.loading')
                  : t('loginPage.loginButton')}
              </Button>

              <p className="text-center text-white text-sm">
                {t('loginPage.noAccount')}{' '}
                <Link to="/signup" className="underline hover:text-gray-200">
                  {t('loginPage.signupLink')}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
