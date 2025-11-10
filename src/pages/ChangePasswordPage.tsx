import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export function ChangePasswordPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (_data: ChangePasswordFormData) => {
    // TODO: integrate API call to change password
    await new Promise(resolve => setTimeout(resolve, 1500))
    navigate('/', { replace: true })
  }

  if (!isAuthenticated) {
    return null
  }

  const togglePasswordVisibility = (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="flex my-10 items-center justify-center bg-gradient-to-br">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] px-4"
      >
        <Card className="border-2 border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-[#003863] text-white pb-8 pt-8 text-center rounded-t-[28px]">
            <h1 className="text-[42px] font-serif italic leading-tight">
              Forgot password ?
            </h1>
          </CardHeader>

          <CardContent className="bg-[#003863] px-6 pb-8 pt-6">
            <p className="text-white text-center text-sm mb-7 leading-relaxed">
              Enter your old password and set a new password to continue.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Old Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-white block"
                >
                  Old Password
                </label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showPasswords.oldPassword ? 'text' : 'password'}
                    placeholder="Enter Your Old Password"
                    {...register('oldPassword')}
                    className="w-full bg-white text-gray-900 border-none rounded-[15px] h-12 text-sm placeholder:text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('oldPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.oldPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-sm text-red-300">{errors.oldPassword.message}</p>
                )}
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-white block"
                >
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    placeholder="Enter Your New Password"
                    {...register('newPassword')}
                    className="w-full bg-white text-gray-900 border-none rounded-[15px] h-12 text-sm placeholder:text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.newPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-red-300">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-white block"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Your New Password"
                    {...register('confirmPassword')}
                    className="w-full bg-white text-gray-900 border-none rounded-[15px] h-12 text-sm placeholder:text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-300">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-[#7DB4D4] text-[#003863] hover:bg-[#6ca3c3] font-semibold rounded-full h-12 text-base mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Login'}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-white">
                  Sign up your account{' '}
                  <Link to="/signup" className="font-semibold hover:underline">
                    here
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

