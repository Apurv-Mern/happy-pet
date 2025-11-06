import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { SOCKET_URL } from '@/utils/constants'
import { useAuthStore } from '@/store/useAuthStore'

interface UseSocketOptions {
  enabled?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const { enabled = true, onConnect, onDisconnect, onError } = options
  const socketRef = useRef<Socket | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!enabled || !isAuthenticated) {
      return
    }

    const socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
      onConnect?.()
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
      onDisconnect?.()
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      onError?.(error)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [enabled, isAuthenticated, token, onConnect, onDisconnect, onError])

  const emit = (event: string, data: unknown) => {
    socketRef.current?.emit(event, data)
  }

  const on = (event: string, callback: (...args: unknown[]) => void) => {
    socketRef.current?.on(event, callback)
  }

  const off = (event: string, callback?: (...args: unknown[]) => void) => {
    socketRef.current?.off(event, callback)
  }

  return {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected ?? false,
    emit,
    on,
    off,
  }
}

