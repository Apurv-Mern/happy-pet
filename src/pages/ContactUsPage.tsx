import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  details: string[]
}

const contactInfoData: ContactInfo[] = [
  {
    icon: <Mail className="h-8 w-8" />,
    title: 'Email',
    content: 'Get in touch via email',
    details: ['support@happypet.com', 'info@happypet.com'],
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: 'Phone',
    content: 'Call us anytime',
    details: ['+91 6789456874587', '+1 (555) 123-4567'],
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Location',
    content: 'Visit our office',
    details: ['Jaipur, India', '123 Pet Street, Happy Town'],
  },
]

export function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Integrate API call to send email
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitMessage(
        `Message from ${data.name} sent successfully! We'll get back to you soon.`
      )
      reset()
      setTimeout(() => setSubmitMessage(''), 5000)
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-6 sm:mt-10 mb-6 sm:mb-10 bg-gradient-to-br py-8 sm:py-12 px-4">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#003863] mb-2 sm:mb-3">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Cards */}
        {contactInfoData.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-4 text-[#003863]">
              {info.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#003863] mb-2">
              {info.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">{info.content}</p>
            <div className="space-y-1">
              {info.details.map((detail, i) => (
                <p key={i} className="text-[#003863] font-medium text-sm">
                  {detail}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[700px] bg-white rounded-2xl shadow-xl p-10"
      >
        <h2 className="text-3xl font-bold text-[#003863] mb-8 text-center">
          Send us a Message
        </h2>

        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              submitMessage.includes('successfully')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#003863] mb-2"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register('name')}
              className="w-full border-2 border-[#cfe0e8] rounded-lg h-11 px-4 focus:border-[#003863] focus:outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#003863] mb-2"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              className="w-full border-2 border-[#cfe0e8] rounded-lg h-11 px-4 focus:border-[#003863] focus:outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#003863] mb-2"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...register('phone')}
              className="w-full border-2 border-[#cfe0e8] rounded-lg h-11 px-4 focus:border-[#003863] focus:outline-none transition-colors"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[#003863] mb-2"
            >
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="What is this about?"
              {...register('subject')}
              className="w-full border-2 border-[#cfe0e8] rounded-lg h-11 px-4 focus:border-[#003863] focus:outline-none transition-colors"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#003863] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message here..."
              {...register('message')}
              rows={5}
              className="w-full border-2 border-[#cfe0e8] rounded-lg px-4 py-3 focus:border-[#003863] focus:outline-none transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#003863] text-white hover:bg-[#002d4d] font-semibold rounded-lg h-11 flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="h-5 w-5" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </motion.div>

      {/* Social Media Section */}
      <div className="mx-auto max-w-[1200px] mt-16 text-center">
        <h3 className="text-2xl font-bold text-[#003863] mb-6">
          Follow Us On Social Media
        </h3>
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="bg-[#003863] text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-[#002d4d] transition-colors"
          >
            <FaFacebookF className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-[#003863] text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-[#002d4d] transition-colors"
          >
            <FaXTwitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-[#003863] text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-[#002d4d] transition-colors"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-[#003863] text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-[#002d4d] transition-colors"
          >
            <FaLinkedinIn className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  )
}
