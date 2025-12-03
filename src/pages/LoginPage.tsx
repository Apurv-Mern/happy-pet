import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useLoginMutation, useSendOtpMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/contexts/I18nContext'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()
  const sendOtpMutation = useSendOtpMutation()
  const { toast } = useToast()

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .refine(val => val.trim().length > 0, {
        message: t('validation.emailRequired'),
      }),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .refine(val => val.trim().length > 0, {
        message: t('validation.passwordRequired'),
      }),
  })

  type LoginFormData = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    if (isAuthenticated) {
      const from =
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Prevent back navigation after login
  useEffect(() => {
    if (isAuthenticated) {
      window.history.pushState(null, '', window.location.href)
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href)
      }
      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [isAuthenticated])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      if (!response.success) return

      if (!response.data.user.isEmailVerified) {
        try {
          await sendOtpMutation.mutateAsync({ email: data.email })
          toast({
            variant: 'success',
            title: t('loginPage.emailNotVerified'),
            description: t('loginPage.verificationCodeSent'),
          })
          navigate('/verify-email', {
            state: { email: data.email },
            replace: true,
          })
        } catch (otpError: any) {
          console.error('Send OTP error:', otpError)
          toast({
            variant: 'destructive',
            title: t('loginPage.failedToSendOtp'),
            description:
              otpError.response?.data?.message ||
              t('loginPage.failedToSendOtpDescription'),
          })
        }
        return
      }

      login(
        response.data.user,
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken
      )
      toast({
        variant: 'success',
        title: t('loginPage.loginSuccess'),
        description: t('loginPage.welcomeBack'),
      })
      const from =
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        '/'
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error('Login error:', error)
      toast({
        variant: 'destructive',
        title: t('loginPage.loginFailed'),
        description:
          error.response?.data?.message || t('loginPage.invalidCredentials'),
      })
    }
  }

  if (isAuthenticated) return null

  return (
    <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[540px] m-auto py-14"
      >
        <Card className="border-[#0E213A] shadow-2xl bg-white overflow-hidden rounded-[30px]">
          <CardContent className="bg-[#003863] py-6 px-6">
            <h1 className="text-[#fff] heading-line text-[60px] text-center">
              {t('loginPage.title')}
            </h1>

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
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400"
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
                    className="w-full bg-white text-gray-900 border-none rounded-xl h-11 pr-10 placeholder:text-gray-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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

              <div className="text-right !mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  {t('loginPage.forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-[#003057] hover:bg-[#004C82] hover:text-[#fff] py-5 px-5 font-semibold rounded-full h-12 text-base flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting && (
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
                {isSubmitting
                  ? t('loginPage.loggingIn')
                  : t('loginPage.loginButton')}
              </Button>

              <div className="text-center pt-2">
                <span className="text-white text-sm">
                  {t('loginPage.noAccount')}{' '}
                  <Link to="/signup" className="font-semibold hover:underline">
                    {t('loginPage.signupLink')}
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
