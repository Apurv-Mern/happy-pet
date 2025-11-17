import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useVerifyOtpMutation, useSendOtpMutation } from '@/api/auth'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(10)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const email = (location.state as { email?: string })?.email

  const verifyOtpMutation = useVerifyOtpMutation()
  const resendOtpMutation = useSendOtpMutation()

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate('/signup', { replace: true })
    }
  }, [email, navigate])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char
    })
    setOtp(newOtp)

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerify = async () => {
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'Please enter all 6 digits',
      })
      return
    }

    verifyOtpMutation.mutate(
      { email: email!, otp: otpCode },
      {
        onSuccess: response => {
          if (response.success) {
            toast({
              title: 'Email Verified!',
              description: 'Your email has been verified successfully.',
            })
            navigate('/login', { replace: true })
          }
        },
        onError: (error: any) => {
          toast({
            variant: 'destructive',
            title: 'Verification Failed',
            description:
              error.response?.data?.message || 'Invalid or expired OTP',
          })
        },
      }
    )
  }

  const handleResend = async () => {
    if (countdown > 0) return

    resendOtpMutation.mutate(
      { email: email! },
      {
        onSuccess: response => {
          if (response.success) {
            toast({
              title: 'OTP Resent',
              description:
                'A new verification code has been sent to your email.',
            })
            setCountdown(10)
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
          }
        },
        onError: (error: any) => {
          toast({
            variant: 'destructive',
            title: 'Resend Failed',
            description:
              error.response?.data?.message || 'Failed to resend OTP',
          })
        },
      }
    )
  }

  if (!email) {
    return null
  }

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[500px]"
      >
        <Card className="border-[#0E213A] rounded-[30px] shadow-2xl bg-white overflow-hidden">
          {/* Header Section */}
          <CardHeader className="bg-[#003863] text-white pb-8 pt-8 rounded-t-xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-serif italic mb-4">
              Verify your Email
            </h1>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Thanks for signing up.</p>
              <p className="text-sm">
                We have send a verification code on your Email.
              </p>
              <p className="text-sm font-medium">
                Please enter the verification code below
              </p>
            </div>
          </CardHeader>

          <CardContent className="bg-[#003863] px-6 sm:px-8 pb-8 pt-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold bg-white text-[#003863] rounded-lg border-2 border-gray-300 focus:border-[#035FA6] focus:outline-none focus:ring-2 focus:ring-[#035FA6]/20 transition-all"
                  disabled={verifyOtpMutation.isPending}
                />
              ))}
            </div>

            {/* Verify Button */}
            <div className="flex justify-center mb-4">
              <Button
                onClick={handleVerify}
                disabled={
                  verifyOtpMutation.isPending || otp.join('').length !== 6
                }
                className="w-full max-w-[280px] bg-white text-[#003863] hover:bg-gray-100 font-semibold rounded-full h-12 text-base disabled:opacity-50"
              >
                {verifyOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <button
                onClick={handleResend}
                disabled={countdown > 0 || resendOtpMutation.isPending}
                className="text-white text-sm font-medium hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
              >
                {resendOtpMutation.isPending ? (
                  'Sending...'
                ) : countdown > 0 ? (
                  <>
                    Resend Code <span className="ml-2">{countdown}</span>
                  </>
                ) : (
                  'Resend Code'
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
