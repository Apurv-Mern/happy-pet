import { useEffect, useMemo } from 'react'
import { useTranslation } from '@/contexts/I18nContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useResetPasswordMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'

export function ResetPasswordPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const { toast } = useToast()

  // Create schema with useMemo to update when language changes
  const resetPasswordSchema = useMemo(
    () =>
      z
        .object({
          otp: z
            .string()
            .min(1, t('validation.required'))
            .min(6, t('resetPasswordPage.otpMinLength')),
          newPassword: z
            .string()
            .min(1, t('validation.passwordRequired'))
            .min(8, t('validation.passwordMinLength'))
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              t('validation.passwordComplexity')
            ),
          confirmPassword: z.string().min(1, t('validation.required')),
        })
        .refine(data => data.newPassword === data.confirmPassword, {
          message: t('validation.passwordMismatch'),
          path: ['confirmPassword'],
        }),
    [t]
  )

  type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const resetPasswordMutation = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
    if (!email) {
      navigate('/forgot-password', { replace: true })
    }
  }, [isAuthenticated, email, navigate])

  const onSubmit = async (formData: ResetPasswordFormData) => {
    try {
      await resetPasswordMutation.mutateAsync({
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })

      toast({
        title: t('common.success'),
        description: t('resetPasswordPage.success'),
        variant: 'default',
      })

      navigate('/login', { replace: true })
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description:
          error.response?.data?.message || t('resetPasswordPage.error'),
        variant: 'destructive',
      })
    }
  }

  if (isAuthenticated || !email) {
    return null
  }

  return (
    <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-5 sm:py-5 md:py-5 lg:py-5 xl:py-20"
      >
        <Card className="border-[#0E213A] rounded-[30px] mx-auto max-w-[500px] shadow-2xl bg-white overflow-hidden">
          <CardContent className="bg-[#003863] py-6 px-6">
            <h1 className="text-[#fff] heading-line text-[38px] sm:text-[40px] md:text-[60px] text-center">
              {t('resetPasswordPage.title')}
            </h1>
            <div className="text-center py-4">
              <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-semibold">
                {t('resetPasswordPage.enterDetails')}
              </p>
              <p className="text-white text-[14px] sm:text-[16px] md:text-[16px] font-normal mt-2">
                {t('resetPasswordPage.sentTo')} <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-white block"
                >
                  {t('resetPasswordPage.otp')}
                </label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t('resetPasswordPage.otpPlaceholder')}
                  {...register('otp')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-sm text-red-300">{errors.otp.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-white block"
                >
                  {t('resetPasswordPage.newPassword')}
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder={t('resetPasswordPage.newPasswordPlaceholder')}
                  {...register('newPassword')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-300">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-white block"
                >
                  {t('resetPasswordPage.confirmPassword')}
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t(
                    'resetPasswordPage.confirmPasswordPlaceholder'
                  )}
                  {...register('confirmPassword')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-300">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-[#003863] hover:bg-[#004C82] hover:text-[#fff] font-semibold rounded-full h-12 text-base py-5 px-5"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('resetPasswordPage.resetting')
                  : t('resetPasswordPage.resetButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
