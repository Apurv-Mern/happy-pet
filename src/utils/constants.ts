export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://happypet-backend.24livehost.com/api'

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'https://happypet-backend.24livehost.com'

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const
