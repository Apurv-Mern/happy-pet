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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string().default('+971'),
  mobile: z.string().min(7, 'Mobile number is required'),
  companyName: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupPage() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuthStore()
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971')

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
      countryCode: '+971',
      mobile: '',
      companyName: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: SignupFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock signup - replace with actual API call
    login(
      {
        id: '1',
        email: data.email,
        name: data.name,
        createdAt: new Date().toISOString(),
      },
      'mock-jwt-token-' + Date.now()
    )

    navigate('/', { replace: true })
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex mt-10 mb-10 items-center justify-center bg-gradient-to-br ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[557px]"
      >
        <Card className="border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Header Section */}
          <CardHeader className="bg-[#003863] text-white pb-6 pt-5 rounded-t-xl">
            <h1 className="text-4xl font-bold text-center font-serif italic">
              Register
            </h1>
          </CardHeader>

          <CardContent className="bg-[#003863] px-5 pb-6 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Mobile Number Field with Country Code */}
              <div className="space-y-1.5">
                <label
                  htmlFor="mobile"
                  className="text-xs font-medium text-white block"
                >
                  Your Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-white  rounded-[15px] px-3 gap-2 min-w-[85px]">
                    <span className="text-xl">🇦🇪</span>
                    <Select
                      value={selectedCountryCode}
                      onValueChange={(value: string) => {
                        setSelectedCountryCode(value)
                        setValue('countryCode', value)
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
                    id="mobile"
                    type="tel"
                    placeholder=""
                    {...register('mobile')}
                    className="flex-1 bg-white text-gray-900  text-sm"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-300">
                    {errors.mobile.message}
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
                className="w-full bg-white text-[#003057] hover:bg-gray-100 font-semibold rounded-full h-10 text-sm mt-5"
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
