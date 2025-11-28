import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { ChatMessage } from '@/api/chat'
import { API_BASE_URL } from '@/utils/constants'

interface UseChatRealtimeProps {
  sessionId: string | null
  onNewMessage?: (message: ChatMessage) => void
  onMessageUpdate?: (message: ChatMessage) => void
  onTyping?: (data: { userId: string; isTyping: boolean }) => void
  onAssetUpdate?: (data: {
    messageId: string
    asset: {
      _id: string
      type: 'audio' | 'video' | 'image'
      status: 'pending' | 'ready' | 'failed'
      mediaId?: string
      url?: string
    }
  }) => void
}

export const useChatRealtime = ({
  sessionId,
  onNewMessage,
  onMessageUpdate,
  onTyping,
  onAssetUpdate,
}: UseChatRealtimeProps) => {
  const socketRef = useRef<Socket | null>(null)
  const currentSessionRef = useRef<string | null>(null)

  // Initialize socket connection
  useEffect(() => {
    // Get base URL without /api/v1
    const socketUrl = API_BASE_URL.replace('/api/v1', '')

    const socket = io(socketUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('WebSocket connected')
      // Resubscribe to current session on reconnect
      if (currentSessionRef.current) {
        socket.emit('chat:subscribe', currentSessionRef.current)
      }
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    socket.on('connect_error', error => {
      console.error('WebSocket connection error:', error)
    })

    return () => {
      if (currentSessionRef.current) {
        socket.emit('chat:unsubscribe', currentSessionRef.current)
      }
      socket.disconnect()
    }
  }, [])

  // Subscribe to session when sessionId changes
  useEffect(() => {
    if (!socketRef.current || !sessionId) return

    // Validate session ID
    if (
      sessionId.startsWith('temp-') ||
      sessionId.length < 24 ||
      !/^[0-9a-fA-F]{24}$/.test(sessionId)
    ) {
      return
    }

    const socket = socketRef.current

    // Unsubscribe from previous session
    if (currentSessionRef.current && currentSessionRef.current !== sessionId) {
      socket.emit('chat:unsubscribe', currentSessionRef.current)
    }

    // Subscribe to new session
    socket.emit('chat:subscribe', sessionId)
    currentSessionRef.current = sessionId

    return () => {
      if (currentSessionRef.current === sessionId) {
        socket.emit('chat:unsubscribe', sessionId)
        currentSessionRef.current = null
      }
    }
  }, [sessionId])

  // Set up message listeners
  useEffect(() => {
    if (!socketRef.current) return

    const socket = socketRef.current

    const handleMessage = (data: {
      sessionId: string
      type: 'new' | 'update'
      message: ChatMessage
    }) => {
      // Only process messages for current session
      if (data.sessionId !== sessionId) return

      if (data.type === 'new' && onNewMessage) {
        onNewMessage(data.message)
      } else if (data.type === 'update' && onMessageUpdate) {
        onMessageUpdate(data.message)
      }
    }

    const handleTyping = (data: {
      sessionId: string
      userId: string
      isTyping: boolean
    }) => {
      if (data.sessionId !== sessionId) return
      if (data.userId === 'current-user') return // Don't show own typing
      if (onTyping) {
        onTyping({ userId: data.userId, isTyping: data.isTyping })
      }
    }

    const handleAssetUpdate = (data: {
      sessionId: string
      messageId: string
      asset: {
        _id: string
        type: 'audio' | 'video' | 'image'
        status: 'pending' | 'ready' | 'failed'
        mediaId?: string
        url?: string
      }
    }) => {
      if (data.sessionId !== sessionId) return
      if (onAssetUpdate) {
        onAssetUpdate({
          messageId: data.messageId,
          asset: data.asset,
        })
      }
    }

    socket.on('chat:message', handleMessage)
    socket.on('chat:typing', handleTyping)
    socket.on('chat:asset-update', handleAssetUpdate)

    return () => {
      socket.off('chat:message', handleMessage)
      socket.off('chat:typing', handleTyping)
      socket.off('chat:asset-update', handleAssetUpdate)
    }
  }, [sessionId, onNewMessage, onMessageUpdate, onTyping, onAssetUpdate])

  // Emit typing indicator
  const emitTyping = useCallback(
    (isTyping: boolean) => {
      if (!socketRef.current || !sessionId) return

      socketRef.current.emit('chat:typing', {
        sessionId,
        userId: 'current-user',
        isTyping,
      })
    },
    [sessionId]
  )

  return {
    socket: socketRef.current,
    emitTyping,
    isConnected: socketRef.current?.connected || false,
  }
}
