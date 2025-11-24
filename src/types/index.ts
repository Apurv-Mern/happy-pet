export interface User {
  id: string
  email: string
  name: string
  userType: string
  preferredLanguage: string
  isEmailVerified: boolean
  lastLoginAt?: string
  loginCount?: number
  avatar?: string
  profileImage?: string
  phoneNumber?: string
  company?: string
  country?: string
  timezone?: string
  role?: {
    _id: string
    name: string
    description: string
    permissions: string[]
    isActive: boolean
    isSystemRole: boolean
    createdAt: string
    updatedAt: string
  }
  createdAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    tokens: AuthTokens
  }
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export interface SocketEvent {
  type: string
  payload: unknown
}

export interface LearningModule {
  id: string
  _id?: string
  title: string
  content: string
  type: string
  category: string
  thumbnail?: string
  description?: string
  fileUrl?: string
  thumbnailUrl?: string
  presignedFileUrl?: string
  presignedThumbnailUrl?: string
}

export interface PaginationData {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
}

export interface LearningModulesResponse {
  success: boolean
  message: string
  data: {
    items: LearningModule[]
    pagination: PaginationData
  }
}

export interface PresignedUrlResponse {
  success: boolean
  message: string
  data: {
    contentId: string
    expiresIn: number
    presignedUrl: string
  }
}
