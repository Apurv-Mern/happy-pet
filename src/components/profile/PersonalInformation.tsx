import { useTranslation } from '@/contexts/I18nContext'

interface PersonalInformationProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    // address: string
    companyName: string
    phoneNumber: string
    // dob: string
    // postalCode: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onDiscard: () => void
}

export const PersonalInformation = ({
  formData,
  onInputChange,
  onSave,
  onDiscard,
}: PersonalInformationProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h3 className="text-[30px] font-bold text-[#003863] mb-8">
        {t('profilePage.personalInformation')}
      </h3>

      <div className="space-y-6">
        {/* First Name & Last Name */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.firstName')}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.firstNamePlaceholder')}
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.lastName')}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.lastNamePlaceholder')}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder={t('profilePage.emailPlaceholder')}
          />
        </div>

        {/* Address */}
        {/* <div>
          <label className="block text-sm text-[#003863] mb-2">
            {t('profilePage.address')}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder={t('profilePage.addressPlaceholder')}
          />
        </div> */}

        {/* Company Name & Phone Number */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.companyName')}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.companyNamePlaceholder')}
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.phoneNumber')}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.phoneNumberPlaceholder')}
            />
          </div>
        </div>

        {/* D.O.B & Postal Code */}
        {/* <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.dob')}
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              {t('profilePage.postalCode')}
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder={t('profilePage.postalCodePlaceholder')}
            />
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onDiscard}
            className="w-full max-w-[450px] px-8 py-3 border-2 border-[#003863] text-[#003863] rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            {t('profilePage.discardChanges')}
          </button>
          <button
            onClick={onSave}
            className="w-full max-w-[450px] px-8 py-3 bg-[#003863] text-white rounded-xl font-semibold hover:bg-[#004c82] transition-all"
          >
            {t('profilePage.saveChanges')}
          </button>
        </div>
      </div>
    </>
  )
}
