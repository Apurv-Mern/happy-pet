import { useTranslation } from '@/contexts/I18nContext'
import { useState, useMemo } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordManagementProps {
  passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onCancel: () => void
}

interface ValidationErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export const PasswordManagement = ({
  passwordData,
  onPasswordChange,
  onSubmit,
  onCancel,
}: PasswordManagementProps) => {
  const { t } = useTranslation()
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const togglePasswordVisibility = (
    field: 'currentPassword' | 'newPassword' | 'confirmPassword'
  ) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }))
  }

  // Validation logic
  const validationErrors: ValidationErrors = useMemo(() => {
    const errors: ValidationErrors = {}

    // Current password validation
    if (touched.currentPassword) {
      if (!passwordData.currentPassword.trim()) {
        errors.currentPassword = 'Current password is required'
      } else if (passwordData.currentPassword.length < 6) {
        errors.currentPassword = 'Password must be at least 6 characters'
      }
    }

    // New password validation
    if (touched.newPassword) {
      if (!passwordData.newPassword.trim()) {
        errors.newPassword = 'New password is required'
      } else if (passwordData.newPassword.length < 6) {
        errors.newPassword = 'Password must be at least 6 characters'
      } else if (
        !/[A-Z]/.test(passwordData.newPassword) ||
        !/[a-z]/.test(passwordData.newPassword) ||
        !/[0-9]/.test(passwordData.newPassword)
      ) {
        errors.newPassword =
          'Password must contain uppercase, lowercase, and number'
      } else if (
        passwordData.currentPassword &&
        passwordData.newPassword === passwordData.currentPassword
      ) {
        errors.newPassword =
          'New password must be different from current password'
      }
    }

    // Confirm password validation
    if (touched.confirmPassword) {
      if (!passwordData.confirmPassword.trim()) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (passwordData.confirmPassword !== passwordData.newPassword) {
        errors.confirmPassword = "Passwords don't match"
      }
    }

    return errors
  }, [passwordData, touched])

  const isFormValid =
    passwordData.currentPassword &&
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    Object.keys(validationErrors).length === 0

  return (
    <>
      <h3 className="text-2xl font-bold text-[#003863] mb-8">
        {t('profilePage.passwordManagement')}
      </h3>

      <div className="space-y-6">
        {/* Type Current Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.currentPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={onPasswordChange}
              onBlur={() => handleBlur('currentPassword')}
              className={`w-full px-4 py-3 pr-12 border rounded-xl search-bar transition-colors ${
                touched.currentPassword && validationErrors.currentPassword
                  ? 'border-red-400 focus:border-red-500 border-2'
                  : 'border-gray-300'
              }`}
              placeholder={t('profilePage.currentPasswordPlaceholder')}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('currentPassword')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.currentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {touched.currentPassword && validationErrors.currentPassword && (
            <p className="text-sm text-red-500 font-medium mt-1 flex items-center gap-1">
              <span>⚠</span>
              {validationErrors.currentPassword}
            </p>
          )}
        </div>

        {/* Type New Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.newPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={onPasswordChange}
              onBlur={() => handleBlur('newPassword')}
              className={`w-full px-4 py-3 pr-12 border rounded-xl search-bar transition-colors ${
                touched.newPassword && validationErrors.newPassword
                  ? 'border-red-400 focus:border-red-500 border-2'
                  : 'border-gray-300'
              }`}
              placeholder={t('profilePage.newPasswordPlaceholder')}
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
          {touched.newPassword && validationErrors.newPassword && (
            <p className="text-sm text-red-500 font-medium mt-1 flex items-center gap-1">
              <span>⚠</span>
              {validationErrors.newPassword}
            </p>
          )}
          {!validationErrors.newPassword &&
            passwordData.newPassword &&
            touched.newPassword && (
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <p
                  className={
                    passwordData.newPassword.length >= 6 ? 'text-green-600' : ''
                  }
                >
                  {passwordData.newPassword.length >= 6 ? '✓' : '○'} At least 6
                  characters
                </p>
                <p
                  className={
                    /[A-Z]/.test(passwordData.newPassword)
                      ? 'text-green-600'
                      : ''
                  }
                >
                  {/[A-Z]/.test(passwordData.newPassword) ? '✓' : '○'} One
                  uppercase letter
                </p>
                <p
                  className={
                    /[a-z]/.test(passwordData.newPassword)
                      ? 'text-green-600'
                      : ''
                  }
                >
                  {/[a-z]/.test(passwordData.newPassword) ? '✓' : '○'} One
                  lowercase letter
                </p>
                <p
                  className={
                    /[0-9]/.test(passwordData.newPassword)
                      ? 'text-green-600'
                      : ''
                  }
                >
                  {/[0-9]/.test(passwordData.newPassword) ? '✓' : '○'} One
                  number
                </p>
              </div>
            )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.confirmPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={onPasswordChange}
              onBlur={() => handleBlur('confirmPassword')}
              className={`w-full px-4 py-3 pr-12 border rounded-xl search-bar transition-colors ${
                touched.confirmPassword && validationErrors.confirmPassword
                  ? 'border-red-400 focus:border-red-500 border-2'
                  : 'border-gray-300'
              }`}
              placeholder={t('profilePage.confirmPasswordPlaceholder')}
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
          {touched.confirmPassword && validationErrors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium mt-1 flex items-center gap-1">
              <span>⚠</span>
              {validationErrors.confirmPassword}
            </p>
          )}
          {!validationErrors.confirmPassword &&
            passwordData.confirmPassword &&
            passwordData.newPassword &&
            touched.confirmPassword && (
              <p
                className={`text-xs mt-1 ${
                  passwordData.confirmPassword === passwordData.newPassword
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {passwordData.confirmPassword === passwordData.newPassword
                  ? '✓ Passwords match'
                  : '○ Passwords do not match'}
              </p>
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-6">
          <button
            onClick={onCancel}
            className="w-full max-w-[450px] px-8 py-3 border-2 border-[#003863] text-[#003863] rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            {t('profilePage.cancel')}
          </button>
          <button
            onClick={onSubmit}
            disabled={!isFormValid}
            className="w-full max-w-[450px] px-8 py-3 bg-[#003863] text-white rounded-xl font-semibold hover:bg-[#004c82] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#003863]"
          >
            {t('profilePage.proceed')}
          </button>
        </div>
      </div>
    </>
  )
}
