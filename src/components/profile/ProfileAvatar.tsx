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
          <svg width="20" height="20" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.44314 17.4674L1 22.8792L6.77255 21.5262L23.4927 5.85107C24.0338 5.34364 24.3378 4.65551 24.3378 3.93801C24.3378 3.22051 24.0338 2.53238 23.4927 2.02495L23.2445 1.79225C22.7033 1.28497 21.9693 1 21.2039 1C20.4386 1 19.7046 1.28497 19.1633 1.79225L2.44314 17.4674Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.44314 17.4674L1 22.8792L6.77255 21.5262L21.2039 7.99681L16.8745 3.93799L2.44314 17.4674Z" fill="white"/>
          <path d="M16.8746 3.93799L21.204 7.99681M13.9883 22.8792H25.5334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
