import { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRegisterMutation, useSendOtpMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
  timezone: z.string().optional(),
  preferredLanguage: z.string().optional(),
  userType: z.enum(['public', 'admin']).default('public'),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthenticated } = useAuthStore()
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971')
  const { toast } = useToast()
  const registerMutation = useRegisterMutation()
  const sendOtpMutation = useSendOtpMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
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

  const onSubmit = async (data: SignupFormData) => {
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        companyName: data.companyName,
        preferredLanguage: data.preferredLanguage,
        phoneNumber: data.phoneNumber,
        timezone: data.timezone,
        userType: data.userType,
      },
      {
        onSuccess: response => {
          if (response.success) {
            // Send OTP after successful registration
            sendOtpMutation.mutate(
              { email: data.email },
              {
                onSuccess: () => {
                  toast({
                    title: 'Registration Successful!',
                    description:
                      'Please check your email for verification code.',
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
                    title: 'Failed to Send OTP',
                    description:
                      otpError.response?.data?.message ||
                      'Could not send verification code. Please try again.',
                  })
                },
              }
            )
          }
        },
        onError: (error: any) => {
          console.error('Registration error:', error)
          toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description:
              error.response?.data?.message ||
              'An error occurred during registration. Please try again.',
          })
        },
      }
    )
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
              Register
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
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
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
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  {...register('email')}
                  className="w-full bg-white text-gray-900  text-sm placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="text-xs text-red-300">{errors.email.message}</p>
                )}
              </div>

              {/* phoneNumber Number Field with Country Code */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-xs font-medium text-white block"
                >
                  Your phoneNumber Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-white  rounded-[15px] px-3 gap-2 min-w-[85px]">
                    <span className="text-xl">🇦🇪</span>
                    <Select
                      value={selectedCountryCode}
                      onValueChange={(value: string) => {
                        setSelectedCountryCode(value)
                        setValue('phoneNumber', value)
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
                    placeholder=""
                    {...register('phoneNumber')}
                    className="flex-1 bg-white text-gray-900  text-sm"
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
                  Company Name ( Optional )
                </label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder=""
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
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
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
                className="w-full bg-white text-[#003057] hover:bg-[#004C82] hover:text-[#fff] font-semibold rounded-full h-12 text-sm mt-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-white">
                  Already have an account !!{' '}
                  <Link to="/login" className="font-semibold hover:underline">
                    Login
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
