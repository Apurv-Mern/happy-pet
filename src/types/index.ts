export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
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

