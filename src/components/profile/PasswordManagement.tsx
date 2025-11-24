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

export const PasswordManagement = ({
  passwordData,
  onPasswordChange,
  onSubmit,
  onCancel,
}: PasswordManagementProps) => {
  return (
    <>
      <h3 className="text-2xl font-bold text-[#003863] mb-8">
        Password Management
      </h3>

      <div className="space-y-6">
        {/* Type Current Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            Type Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={onPasswordChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder="Enter current password"
          />
        </div>

        {/* Type New Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            Type New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={onPasswordChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-[#003863] mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={onPasswordChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl search-bar"
            placeholder="Confirm new password"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-6">
          <button
            onClick={onCancel}
            className="w-full max-w-[450px] px-8 py-3 border-2 border-[#003863] text-[#003863] rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="w-full max-w-[450px] px-8 py-3 bg-[#003863] text-white rounded-xl font-semibold hover:bg-[#004c82] transition-all"
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  )
}
