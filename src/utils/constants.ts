export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://happy-petsbak.24livehost.com/api'

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'https://happy-petsbak.24livehost.com/api'

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const
