import { useEffect } from 'react'
import { useTranslation } from '@/contexts/I18nContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function ForgotPasswordPage() {
  const { t } = useTranslation()
  const forgotPasswordSchema = z.object({
    email: z.string().email(t('validation.invalidEmail')),
  })

  type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    // TODO: integrate API call to send reset link
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigate('/login', { replace: true })
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
          {/* Title */}
          <CardContent className="bg-[#003863] py-6 px-6">
            <h1 className="text-[#fff] heading-line text-[60px] text-center">
              {t('forgotPasswordPage.title')}
            </h1>
            <div className="text-center py-4">
              <p className="text-white text-[20px] font-semibold">
                {t('forgotPasswordPage.dontWorry')}
              </p>
              <p className="text-white text-[16px] font-normal mt-2">
                {t('forgotPasswordPage.enterEmail')}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white block"
                >
                  {t('forgotPasswordPage.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('forgotPasswordPage.emailPlaceholder')}
                  {...register('email')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                />
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-[#003863] hover:bg-[#004C82] hover:text-[#fff] font-semibold rounded-full h-12 text-base py-5 px-5"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('forgotPasswordPage.sending')
                  : t('forgotPasswordPage.sendResetLink')}
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs text-white hover:underline"
                >
                  {t('forgotPasswordPage.backToLogin')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
