// @ts-nocheck
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContactMutation } from '@/api/contact'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/contexts/I18nContext'

const contactSchema = z.object({
  fullName: z.string().min(2, 'fullName must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

// interface ContactInfo {
//   icon: React.ReactNode
//   title: string
//   content: string
//   details: string[]
// }

// const contactInfoData: ContactInfo[] = [
//   {
//     icon: <Mail className="h-8 w-8" />,
//     title: 'Email',
//     content: 'Get in touch via email',
//     details: ['support@happypet.com', 'info@happypet.com'],
//   },
//   {
//     icon: <Phone className="h-8 w-8" />,
//     title: 'Phone',
//     content: 'Call us anytime',
//     details: ['+91 6789456874587', '+1 (555) 123-4567'],
//   },
//   {
//     icon: <MapPin className="h-8 w-8" />,
//     title: 'Location',
//     content: 'Visit our office',
//     details: ['Jaipur, India', '123 Pet Street, Happy Town'],
//   },
// ]

export function ContactUsPage() {
  // const [submitMessage, setSubmitMessage] = useState('')
  const { toast } = useToast()
  const contactMutation = useContactMutation()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    contactMutation.mutate(data, {
      onSuccess: response => {
        if (response.success) {
          toast({
            title: t('contactPage.messageSent'),
            description:
              response.message || t('contactPage.messageSentDescription'),
          })
          reset()
        }
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: t('contactPage.messageFailed'),
          description:
            error.response?.data?.message ||
            t('contactPage.messageFailedDescription'),
        })
      },
    })
  }

  return (
    <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center py-20">
      {/* Header */}
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="heading-line text-[#003863] text-[64px]">
            {t('contactPage.title')}
          </h2>
          <p className="text-[#003863] text-[18px] mb-4">
            {t('contactPage.description')}
          </p>
        </div>
        <div className="border border-[#003863] rounded-[10px] p-[16px] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[30%_66%] gap-[60px]">
            {/* LEFT SIDE – Contact Info */}
            <div className="bg-[#003863] text-white p-8 relative overflow-hidden rounded-[10px]">
              <h2 className="text-[28px] font-semibold mb-2">
                {t('contactPage.formTitle')}
              </h2>
              <p className="text-[18px] mb-6 text-[#C9C9C9]">
                {t('contactPage.description')}
              </p>

              <div className="space-y-8 mt-10">
                {/* Phone */}
                <div className="flex items-center gap-6">
                  <span className="text-xl">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.0002 10.999H22.0002C22.0002 5.869 18.1272 2 12.9902 2V4C17.0522 4 20.0002 6.943 20.0002 10.999Z"
                        fill="white"
                      />
                      <path
                        d="M13.0003 7.99999C15.1033 7.99999 16.0003 8.89699 16.0003 11H18.0003C18.0003 7.77499 16.2253 5.99999 13.0003 5.99999V7.99999ZM16.4223 13.443C16.2301 13.2683 15.9776 13.1752 15.7181 13.1832C15.4585 13.1912 15.2123 13.2998 15.0313 13.486L12.6383 15.947C12.0623 15.837 10.9043 15.476 9.71228 14.287C8.52028 13.094 8.15928 11.933 8.05228 11.361L10.5113 8.96699C10.6977 8.78612 10.8064 8.53982 10.8144 8.2802C10.8225 8.02059 10.7292 7.76804 10.5543 7.57599L6.85928 3.51299C6.68432 3.32035 6.44116 3.2035 6.18143 3.18725C5.92171 3.17101 5.66588 3.25665 5.46828 3.42599L3.29828 5.28699C3.12539 5.46051 3.0222 5.69145 3.00828 5.93599C2.99328 6.18599 2.70728 12.108 7.29928 16.702C11.3053 20.707 16.3233 21 17.7053 21C17.9073 21 18.0313 20.994 18.0643 20.992C18.3088 20.9783 18.5396 20.8747 18.7123 20.701L20.5723 18.53C20.7417 18.3325 20.8276 18.0768 20.8115 17.817C20.7954 17.5573 20.6788 17.3141 20.4863 17.139L16.4223 13.443Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px]">6789456874587</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-6">
                  <span className="text-xl">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px] underline cursor-pointer">
                    Youremaillid@gmail.com
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-6">
                  <span className="text-xl">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px] leading-[22px]">
                    132 Dartmouth Street Boston, Massachusetts 02156 United
                    States
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 absolute bottom-[30px]">
                <span className="cursor-pointer">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1322_2043)">
                      <path
                        d="M13.6327 0C6.10365 0 0 6.10365 0 13.6327C0 20.026 4.40174 25.3907 10.3396 26.8641V17.7989H7.52855V13.6327H10.3396V11.8376C10.3396 7.19754 12.4396 5.04684 16.9951 5.04684C17.8589 5.04684 19.3492 5.21643 19.9589 5.38548V9.16175C19.6371 9.12794 19.0782 9.11104 18.384 9.11104C16.1488 9.11104 15.285 9.9579 15.285 12.1593V13.6327H19.738L18.973 17.7989H15.285V27.1657C22.0354 26.3505 27.266 20.6029 27.266 13.6327C27.2655 6.10365 21.1618 0 13.6327 0Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1322_2043">
                        <rect width="27.2655" height="27.2655" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className="cursor-pointer">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8195 2.16296H24.652L16.2791 11.7326L26.1291 24.7547H18.4166L12.376 16.8568L5.46408 24.7547H1.62928L10.5849 14.5189L1.13574 2.16296H9.04399L14.5042 9.38188L20.8195 2.16296ZM19.4744 22.4607H21.598L7.89008 4.3364H5.61121L19.4744 22.4607Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="cursor-pointer">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1322_2045)">
                      <path
                        d="M13.6327 2.45496C17.2752 2.45496 17.7066 2.47093 19.1391 2.53484C20.4704 2.59342 21.1893 2.81708 21.6686 3.00346C22.3023 3.24843 22.7603 3.54664 23.2342 4.02059C23.7135 4.49987 24.0064 4.95252 24.2514 5.58623C24.4378 6.06551 24.6614 6.78975 24.72 8.11574C24.7839 9.55357 24.7999 9.98492 24.7999 13.6221C24.7999 17.2646 24.7839 17.6959 24.72 19.1284C24.6614 20.4598 24.4378 21.1787 24.2514 21.658C24.0064 22.2917 23.7082 22.7496 23.2342 23.2236C22.755 23.7029 22.3023 23.9958 21.6686 24.2407C21.1893 24.4271 20.4651 24.6508 19.1391 24.7093C17.7013 24.7733 17.2699 24.7892 13.6327 24.7892C9.99025 24.7892 9.5589 24.7733 8.12639 24.7093C6.79507 24.6508 6.07616 24.4271 5.59688 24.2407C4.96317 23.9958 4.5052 23.6975 4.03125 23.2236C3.55197 22.7443 3.25908 22.2917 3.01411 21.658C2.82773 21.1787 2.60407 20.4544 2.54549 19.1284C2.48159 17.6906 2.46561 17.2593 2.46561 13.6221C2.46561 9.9796 2.48159 9.54825 2.54549 8.11574C2.60407 6.78442 2.82773 6.06551 3.01411 5.58623C3.25908 4.95252 3.55729 4.49455 4.03125 4.02059C4.51052 3.54132 4.96317 3.24843 5.59688 3.00346C6.07616 2.81708 6.8004 2.59342 8.12639 2.53484C9.5589 2.47093 9.99025 2.45496 13.6327 2.45496ZM13.6327 0C9.93167 0 9.46837 0.0159759 8.01456 0.0798794C6.56608 0.143783 5.57025 0.378096 4.70756 0.713589C3.80758 1.06506 3.04607 1.52836 2.28988 2.28988C1.52836 3.04607 1.06506 3.80758 0.713589 4.70223C0.378096 5.57025 0.143783 6.56076 0.0798794 8.00924C0.0159759 9.46837 0 9.93167 0 13.6327C0 17.3338 0.0159759 17.7971 0.0798794 19.2509C0.143783 20.6994 0.378096 21.6952 0.713589 22.5579C1.06506 23.4579 1.52836 24.2194 2.28988 24.9756C3.04607 25.7318 3.80758 26.2004 4.70223 26.5466C5.57025 26.8821 6.56076 27.1164 8.00924 27.1803C9.46304 27.2442 9.92634 27.2602 13.6274 27.2602C17.3285 27.2602 17.7918 27.2442 19.2456 27.1803C20.6941 27.1164 21.6899 26.8821 22.5526 26.5466C23.4473 26.2004 24.2088 25.7318 24.965 24.9756C25.7212 24.2194 26.1898 23.4579 26.5359 22.5633C26.8714 21.6952 27.1057 20.7047 27.1696 19.2563C27.2335 17.8024 27.2495 17.3391 27.2495 13.6381C27.2495 9.93699 27.2335 9.47369 27.1696 8.01989C27.1057 6.57141 26.8714 5.57558 26.5359 4.71288C26.2004 3.80758 25.7371 3.04607 24.9756 2.28988C24.2194 1.53368 23.4579 1.06506 22.5633 0.718914C21.6952 0.383421 20.7047 0.149108 19.2563 0.0852047C17.7971 0.0159759 17.3338 0 13.6327 0Z"
                        fill="white"
                      />
                      <path
                        d="M13.6326 6.63C9.76648 6.63 6.62988 9.7666 6.62988 13.6328C6.62988 17.4989 9.76648 20.6355 13.6326 20.6355C17.4988 20.6355 20.6354 17.4989 20.6354 13.6328C20.6354 9.7666 17.4988 6.63 13.6326 6.63ZM13.6326 18.1752C11.1244 18.1752 9.09017 16.141 9.09017 13.6328C9.09017 11.1246 11.1244 9.09029 13.6326 9.09029C16.1409 9.09029 18.1751 11.1246 18.1751 13.6328C18.1751 16.141 16.1409 18.1752 13.6326 18.1752Z"
                        fill="white"
                      />
                      <path
                        d="M22.5471 6.35301C22.5471 7.25831 21.8122 7.98787 20.9122 7.98787C20.0069 7.98787 19.2773 7.25298 19.2773 6.35301C19.2773 5.44771 20.0122 4.71814 20.9122 4.71814C21.8122 4.71814 22.5471 5.45303 22.5471 6.35301Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1322_2045">
                        <rect width="27.2655" height="27.2655" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className="cursor-pointer">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1322_2046)">
                      <path
                        d="M25.2472 0H2.01296C0.899974 0 0 0.878673 0 1.96503V25.2951C0 26.3815 0.899974 27.2655 2.01296 27.2655H25.2472C26.3602 27.2655 27.2655 26.3815 27.2655 25.3005V1.96503C27.2655 0.878673 26.3602 0 25.2472 0ZM8.08912 23.2342H4.0419V10.2192H8.08912V23.2342ZM6.06551 8.44591C4.76614 8.44591 3.71705 7.39683 3.71705 6.10278C3.71705 4.80874 4.76614 3.75965 6.06551 3.75965C7.35955 3.75965 8.40863 4.80874 8.40863 6.10278C8.40863 7.3915 7.35955 8.44591 6.06551 8.44591ZM23.2342 23.2342H19.1923V16.9078C19.1923 15.4007 19.1657 13.457 17.0889 13.457C14.9854 13.457 14.6658 15.1025 14.6658 16.8013V23.2342H10.6293V10.2192H14.5061V11.9979H14.5593C15.0972 10.9754 16.4179 9.89439 18.3829 9.89439C22.4781 9.89439 23.2342 12.589 23.2342 16.093V23.2342Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1322_2046">
                        <rect width="27.2655" height="27.2655" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>

              {/* Decorative Circles */}
              <div className="absolute bottom-0 right-[30px] w-[200px] h-[200px] bg-[#fff]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
              <div className="absolute bottom-[95px] right-[60px] w-[120px] h-[120px] bg-[#fff]/40 rounded-full translate-y-1/3"></div>
            </div>

            {/* RIGHT SIDE – Form */}
            <div className="pt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-[#003863]">
                      {t('contactPage.fullName')}
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder={t('contactPage.fullNamePlaceholder')}
                      className="w-full border-b border-[#003863] focus:outline-none py-2"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#003863] font-semibold">
                      {t('contactPage.fullName')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('contactPage.fullNamePlaceholder')}
                      className="w-full border-b border-[#003863] focus:outline-none py-2"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm text-[#003863] font-semibold">
                      {t('contactPage.email')}
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder={t('contactPage.emailPlaceholder')}
                      className="w-full border-b border-[#003863] focus:outline-none py-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#003863] font-semibold">
                      {t('contactPage.phone')}
                    </label>
                    <input
                      type="text"
                      {...register('phone')}
                      placeholder={t('contactPage.phonePlaceholder')}
                      className="w-full border-b border-[#003863] focus:outline-none py-2"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Subject */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-[#003863] mb-6 block">
                    {t('contactPage.subject')}
                  </label>

                  <div className="flex flex-wrap gap-[80px]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="General Inquiry"
                        {...register('subject')}
                        className="accent-[#003863]"
                      />
                      <span>General Inquiry</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Support"
                        {...register('subject')}
                        className="accent-[#003863]"
                      />
                      <span>Support</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Feedback"
                        {...register('subject')}
                        className="accent-[#003863]"
                      />
                      <span>Feedback</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Other"
                        {...register('subject')}
                        className="accent-[#003863]"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-[#003863]">
                    {t('contactPage.message')}
                  </label>
                  <textarea
                    placeholder={t('contactPage.messagePlaceholder')}
                    {...register('message')}
                    className="w-full border-b border-[#003863] focus:outline-none py-2"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="bg-[#003863] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#004c82] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending
                    ? t('contactPage.sending')
                    : t('contactPage.sendMessage')}
                </button>
              </form>
              <img
                className="relative left-[200px] bottom-[58px]"
                src="/assets/images/letter.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
