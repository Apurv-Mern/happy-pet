import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useLoginMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()
  const { toast } = useToast()

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
        onSuccess: (response) => {
          if (response.success) {
            login(
              response.data.user,
              response.data.tokens.accessToken,
              response.data.tokens.refreshToken
            )

            toast({
              title: "Login Successful!",
              description: `Welcome back, ${response.data.user.name}!`,
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
            variant: "destructive",
            title: "Login Failed",
            description: error.response?.data?.message || 'Invalid email or password. Please try again.',
          })
        },
      }
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <div className="flex mt-10 mb-10 items-center justify-center bg-gradient-to-br">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[557px]"
        >
          <Card className="border-[#0E213A] shadow-2xl bg-white overflow-hidden rounded-[30px]">
            {/* Header Section */}
            <CardHeader className="bg-[#003863] text-white pb-8 pt-6 rounded-t-xl">
              <h1 className="text-4xl font-bold text-center font-serif italic">
                Login
              </h1>
            </CardHeader>
            <CardContent className="bg-[#003863] px-6 pb-8 pt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white block "
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    {...register('email')}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-400"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-white block"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-white hover:underline"
                  >
                    Forgot password ?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-white text-[#003057] hover:bg-gray-100 font-semibold rounded-full h-11 text-base"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-white">
                    Don't have an account ?{' '}
                    <Link
                      to="/signup"
                      className="font-semibold hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
