import { useState, useEffect } from 'react'
import { useTranslation } from '@/contexts/I18nContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const CookieConsent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  const handleClose = () => {
    // Allow closing but will show again next time
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-2xl border-t-4 border-[#003863]"
        >
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Content */}
              <div className="flex-1 pr-8">
                <h3 className="text-lg md:text-xl font-bold text-[#003863] mb-2">
                  {t('cookieConsent.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {t('cookieConsent.description')}
                  <button
                    onClick={() => navigate('/terms-and-policies')}
                    className="text-[#003863] underline hover:text-[#004c82] ml-1"
                  >
                    {t('cookieConsent.learnMore')}
                  </button>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 rounded-lg border-2 border-[#003863] text-[#003863] font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {t('cookieConsent.decline')}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 rounded-lg bg-[#003863] text-white font-semibold hover:bg-[#004c82] transition-colors whitespace-nowrap"
                >
                  {t('cookieConsent.accept')}
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent
