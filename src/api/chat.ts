import { apiClient } from './axios'

// Types based on the Chat Implementation Flow documentation
export interface ChatSession {
  _id: string
  userId: string
  title?: string
  status: 'active' | 'archived'
  lastMessageAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  _id: string
  sessionId: string
  senderType: 'user' | 'assistant' | 'system'
  text?: string
  requestedFormat: 'text' | 'audio' | 'video'
  variants: Array<{
    type: 'text' | 'audio' | 'video' | 'image'
    text?: string
    mediaId?: string
    provider?: string
    status: 'pending' | 'ready' | 'failed'
    language?: string
  }>
  retrievals?: Array<{
    chunkId: string
    sourceDocumentId?: string
    score?: number
    textPreview?: string
  }>
  status: 'pending' | 'complete'
  hasAssets?: boolean
  assetCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface FileRecommendation {
  fileName: string
  url: string
  documentId: string
  score?: number
}

interface CreateSessionResponse {
  success: boolean
  message: string
  data: ChatSession
}

interface GetSessionsResponse {
  success: boolean
  message: string
  data: {
    sessions: ChatSession[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

interface GetMessagesResponse {
  success: boolean
  message: string
  data: {
    messages: Array<{
      _id: string
      sessionId: string
      userId: string
      user: string
      assistant: string
      timestamp: number
      reqType: string
      resType: string
      reqLang: string
      resLang: string
      isStream: boolean
      recommend: FileRecommendation[]
      audioUrl?: string
      createdAt: string
      updatedAt: string
      __v: number
    }>
    count: number
  }
}

interface SendMessageResponse {
  success: boolean
  message: string
  data: {
    session: ChatSession
    userMessage: ChatMessage
    assistantMessage: ChatMessage
    recommendations?: FileRecommendation[]
  }
}

export const chatApi = {
  // Session Management
  createSession: async (title = 'New Chat'): Promise<ChatSession> => {
    const { data } = await apiClient.post<CreateSessionResponse>(
      '/v1/chat/sessions',
      { title }
    )
    return data.data
  },

  getSessions: async (params?: {
    page?: number
    limit?: number
    status?: 'active' | 'archived'
  }): Promise<GetSessionsResponse['data']> => {
    const { data } = await apiClient.get<GetSessionsResponse>(
      '/v1/chat/sessions',
      { params }
    )
    return data.data
  },

  getSession: async (sessionId: string): Promise<ChatSession> => {
    const { data } = await apiClient.get<CreateSessionResponse>(
      `/v1/chat/sessions/${sessionId}`
    )
    return data.data
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/v1/chat/sessions/${sessionId}`)
  },

  // Message Management
  getMessages: async (
    sessionId: string,
    params?: { page?: number; limit?: number }
  ): Promise<GetMessagesResponse['data']> => {
    const { data } = await apiClient.get<GetMessagesResponse>(
      `/v1/assistant/sessions/${sessionId}/messages`,
      { params }
    )
    return data.data
  },

  sendTextMessage: async (
    sessionId: string,
    payload: {
      text: string
      requestedFormat?: 'text' | 'audio' | 'video'
      responseFormat?: 'text' | 'audio' | 'video'
      language?: string
    }
  ): Promise<SendMessageResponse['data']> => {
    const { responseFormat, ...rest } = payload
    const finalPayload = responseFormat === 'video' ? rest : payload

    const { data } = await apiClient.post<SendMessageResponse>(
      `/v1/chat/sessions/${sessionId}/messages`,
      finalPayload
    )
    return data.data
  },

  // New Assistant API for text messages
  sendAssistantMessage: async (payload: {
    query: string
    reqType: 'text'
    resType: 'text'
    reqLang: string
    resLang: string
    isStream: boolean
    sessionId: string
  }): Promise<{
    success: boolean
    msg: string
    recommend: FileRecommendation[]
  }> => {
    const { data } = await apiClient.post('/v1/assistant/text', payload)
    return data
  },

  // New Assistant API for audio messages
  sendAssistantAudio: async (payload: {
    audio: File
    reqType: 'audio'
    resType: 'audio'
    reqLang: string
    resLang: string
    isStream: boolean
    sessionId: string
  }): Promise<{
    success: boolean
    msg: string
    recommend: FileRecommendation[]
    audioUrl: string
    resType: string
  }> => {
    const formData = new FormData()
    formData.append('audio', payload.audio)
    formData.append('reqType', payload.reqType)
    formData.append('resType', payload.resType)
    formData.append('reqLang', payload.reqLang)
    formData.append('resLang', payload.resLang)
    formData.append('isStream', String(payload.isStream))
    formData.append('sessionId', payload.sessionId)

    const { data } = await apiClient.post('/v1/assistant/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  sendAudioMessage: async (
    sessionId: string,
    audioFile: File,
    options?: {
      text?: string
      requestedFormat?: 'text' | 'audio' | 'video'
      responseFormat?: 'text' | 'audio' | 'video'
      language?: string
    }
  ): Promise<SendMessageResponse['data']> => {
    const formData = new FormData()
    formData.append('audio', audioFile)
    if (options?.text) formData.append('text', options.text)
    if (options?.requestedFormat)
      formData.append('requestedFormat', options.requestedFormat)
    // Don't send responseFormat if it's 'video'
    if (options?.responseFormat && options.responseFormat !== 'video')
      formData.append('responseFormat', options.responseFormat)
    if (options?.language) formData.append('language', options.language)

    const { data } = await apiClient.post<SendMessageResponse>(
      `/v1/chat/sessions/${sessionId}/messages`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return data.data
  },

  // Voice Processing
  transcribeVoice: async (
    sessionId: string,
    audioFile: File,
    language?: string
  ): Promise<{ text: string; language: string }> => {
    const formData = new FormData()
    formData.append('audio', audioFile)
    if (language) formData.append('language', language)

    const { data } = await apiClient.post(
      `/v1/chat/sessions/${sessionId}/voice/transcribe`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return data.data
  },

  processVoiceQuery: async (
    sessionId: string,
    options: {
      audio?: File
      text?: string
      language?: string
    }
  ): Promise<{ query: string; response: string; messageId: string }> => {
    const formData = new FormData()
    if (options.audio) formData.append('audio', options.audio)
    if (options.text) formData.append('text', options.text)
    if (options.language) formData.append('language', options.language)

    const { data } = await apiClient.post(
      `/v1/chat/sessions/${sessionId}/voice/process`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return data.data
  },

  // Get presigned URL for video media
  getPresignedUrl: async (mediaId: string): Promise<string> => {
    const { data } = await apiClient.get<{ data: { presignedUrl: string } }>(
      `/v1/media/${mediaId}/presigned-url`
    )
    return data.data.presignedUrl
  },
}
