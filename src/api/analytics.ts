import { apiClient } from './axios'

// Analytics Event Types
export type AnalyticsAction =
  | 'view'
  | 'download'
  | 'content_access'
  | 'video_complete'
  | 'document_view'
  | 'audio_complete'
  | 'faq_view'
  | 'search'
  | 'ai_query'
  | 'ai_interaction'
  | 'login'
  | 'logout'
  | 'register'

export type ContentType =
  | 'video'
  | 'document'
  | 'faq'
  | 'manual'
  | 'image'
  | 'audio'

export interface AnalyticsEvent {
  action: AnalyticsAction
  language: string
  contentType?: ContentType
  contentId?: string
  learningKnowledgeId?: string
  knowledgeEntryId?: string
  duration?: number
  metadata?: Record<string, any>
  sessionId?: string
  searchQuery?: string
  aiQuery?: string
  aiResponse?: string
}

export interface BatchAnalyticsEvent {
  events: AnalyticsEvent[]
}

/**
 * Track a single analytics event
 * Fire-and-forget - errors are silently caught
 */
export const trackEvent = async (eventData: AnalyticsEvent): Promise<void> => {
  try {
    // Don't await - fire and forget
    apiClient.post('/v1/analytics/track', eventData).catch(error => {
      // Only log in development
      if (import.meta.env.DEV) {
        console.warn('Analytics tracking failed:', error)
      }
    })
  } catch (error) {
    // Silent fail
    if (import.meta.env.DEV) {
      console.warn('Analytics tracking error:', error)
    }
  }
}

/**
 * Track multiple analytics events in batch
 * Fire-and-forget - errors are silently caught
 */
export const trackBatch = async (events: AnalyticsEvent[]): Promise<void> => {
  try {
    if (events.length === 0) return
    if (events.length > 100) {
      console.warn('Batch size exceeds maximum of 100 events')
      return
    }

    // Don't await - fire and forget
    apiClient.post('/v1/analytics/track/batch', { events }).catch(error => {
      // Only log in development
      if (import.meta.env.DEV) {
        console.warn('Batch analytics tracking failed:', error)
      }
    })
  } catch (error) {
    // Silent fail
    if (import.meta.env.DEV) {
      console.warn('Batch analytics tracking error:', error)
    }
  }
}
