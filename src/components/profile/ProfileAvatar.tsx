import { User } from '@/types'

interface ProfileAvatarProps {
  user: User | null
}

export const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
          <span>{user?.name?.charAt(0) || 'U'}</span>
        </div>
        <button className="absolute bottom-0 right-0 bg-[#003863] text-white rounded-full p-3 hover:bg-[#002d4d] transition">          
          <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.35294 17.4674L1 22.8792L6.41177 21.5262L22.0869 5.85107C22.5942 5.34364 22.8792 4.65551 22.8792 3.93801C22.8792 3.22051 22.5942 2.53238 22.0869 2.02495L21.8542 1.79225C21.3468 1.28497 20.6587 1 19.9412 1C19.2237 1 18.5355 1.28497 18.0281 1.79225L2.35294 17.4674Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.35294 17.4674L1 22.8792L6.41177 21.5262L19.9412 7.99681L15.8824 3.93799L2.35294 17.4674Z" fill="white"/>
          <path d="M15.8817 3.93799L19.9405 7.99681M13.1758 22.8792H23.9993" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-[#003863]">
        {user?.name || 'User'}
      </h2>
      <p className="text-gray-600 text-sm">{user?.email}</p>
    </div>
  )
}
