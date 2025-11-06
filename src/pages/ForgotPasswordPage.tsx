import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import logo from '../assets/images/forgotpassword.png'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px]"
      >
        <Card className="border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Top curved banner approximation */}
          <div className="h-[220px] w-full bg-[#003863] shadow-[0_8px_20px_rgba(0,0,0,0.3)] rounded-b-[120px]">
            {/* <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            /> */}
          </div>

          {/* Title */}
          <CardHeader className="pt-6 pb-0">
            <h1 className="text-[40px] leading-tight text-center text-[#003863] font-serif italic">
              Forgot Password ?
            </h1>
          </CardHeader>

          <CardContent className="bg-[#003863] px-6 pb-8 pt-6 mt-4 rounded-t-[24px]">
            <p className="text-white text-center text-base mb-6">
              Don’t worry. Enter your E-mail address to reset your password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white block"
                >
                  E-Mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your E-mail"
                  {...register('email')}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 h-12 rounded-[15px]"
                />
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-[#003057] hover:bg-gray-100 font-semibold rounded-full h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
