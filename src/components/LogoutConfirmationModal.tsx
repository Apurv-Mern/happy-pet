import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'

interface LogoutConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const LogoutConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: LogoutConfirmationModalProps) => {
  if (!isOpen) return null

  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#003863] text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {t('logoutConfirmationModal.title')}
          </h2>
          <button
            onClick={onCancel}
            className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {t('logoutConfirmationModal.message')}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full font-semibold transition-colors"
          >
            {t('logoutConfirmationModal.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#003863] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004c82] transition-colors"
          >
            {t('logoutConfirmationModal.logout')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
