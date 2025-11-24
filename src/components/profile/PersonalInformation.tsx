interface PersonalInformationProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    address: string
    companyName: string
    phoneNumber: string
    dob: string
    postalCode: string
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
  return (
    <>
      <h3 className="text-[30px] font-bold text-[#003863] mb-8">
        Personal Information
      </h3>

      <div className="space-y-6">
        {/* First Name & Last Name */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder="Enter first name"
            />
          </div>
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder="Enter email"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder="Enter address"
          />
        </div>

        {/* Company Name & Phone Number */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder="Enter company name"
            />
          </div>
          <div className="w-full max-w-[450px]">   
            <label className="block text-sm text-[#003863] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* D.O.B & Postal Code */}
        <div className="flex justify-between">
          <div className="w-full max-w-[450px]">
            <label className="block text-sm text-[#003863] mb-2">
              D.O.B
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
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
              placeholder="Enter postal code"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onDiscard}
            className="w-full max-w-[450px] px-8 py-3 border-2 border-[#003863] text-[#003863] rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Discard Changes
          </button>
          <button
            onClick={onSave}
            className="w-full max-w-[450px] px-8 py-3 bg-[#003863] text-white rounded-xl font-semibold hover:bg-[#004c82] transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
