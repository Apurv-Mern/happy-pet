import { User } from '@/types'
import { useRef, useState, useEffect } from 'react'
import { learningModuleApi } from '@/api/learningModule'

interface ProfileAvatarProps {
  user: User | null
  profileImage: File | null
  onImageChange: (file: File | null) => void
}

export const ProfileAvatar = ({
  user,
  profileImage,
  onImageChange,
}: ProfileAvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [presignedImageUrl, setPresignedImageUrl] = useState<string | null>(
    null
  )

  // Fetch presigned URL for the user's profile image
  useEffect(() => {
    const fetchPresignedUrl = async () => {
      if (user?.profileImage) {
        try {
          const response = await learningModuleApi.getPresignedUrlForViewing(
            user.profileImage
          )
          setPresignedImageUrl(response.data.presignedUrl)
        } catch (error) {
          console.error(
            'Error fetching presigned URL for profile image:',
            error
          )
        }
      }
    }

    fetchPresignedUrl()
  }, [user?.profileImage])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageChange(file)
    }
  }

  // Create preview URL for selected image
  const imagePreview = profileImage ? URL.createObjectURL(profileImage) : null

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : presignedImageUrl ? (
            <img
              src={presignedImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{user?.name?.charAt(0) || 'U'}</span>
          )}
        </div>
        <button
          onClick={handleImageClick}
          type="button"
          className="absolute bottom-0 right-0 bg-[#003863] text-white rounded-full p-2 hover:bg-[#002d4d] transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-[#003863]">
        {user?.name || 'User'}
      </h2>
      <p className="text-gray-600 text-sm">{user?.email}</p>
    </div>
  )
}
