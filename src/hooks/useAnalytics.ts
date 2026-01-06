import { useCallback, useMemo } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import {
  trackEvent,
  type AnalyticsEvent,
  type ContentType,
} from '@/api/analytics'

// Session management
const SESSION_STORAGE_KEY = 'analytics_session_id'
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

/**
 * Get or create a session ID
 * Session expires after 30 minutes of inactivity
 */
const getSessionId = (): string => {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY)

  if (stored) {
    try {
      const { sessionId, timestamp } = JSON.parse(stored)
      const now = Date.now()

      // Check if session is still valid
      if (now - timestamp < SESSION_DURATION) {
        // Update timestamp
        localStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({ sessionId, timestamp: now })
        )
        return sessionId
      }
    } catch (error) {
      // Invalid session data, create new
    }
  }

  // Create new session
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({ sessionId: newSessionId, timestamp: Date.now() })
  )

  return newSessionId
}

/**
 * Get current language from localStorage
 */
const getCurrentLanguage = (): string => {
  return localStorage.getItem('language') || 'en'
}

interface TrackViewParams {
  contentType: ContentType
  learningKnowledgeId: string
  metadata?: Record<string, any>
}

interface TrackContentAccessParams {
  contentType: ContentType
  learningKnowledgeId: string
  metadata?: Record<string, any>
}

interface TrackDownloadParams {
  contentType: ContentType
  learningKnowledgeId: string
  metadata?: Record<string, any>
}

interface TrackVideoCompleteParams {
  learningKnowledgeId: string
  duration: number
  metadata?: Record<string, any>
}

interface TrackSearchParams {
  searchQuery: string
  resultsCount?: number
  searchType?: 'content' | 'faq' | 'ai'
  filters?: Record<string, any>
  metadata?: Record<string, any>
}

interface TrackFAQViewParams {
  knowledgeEntryId: string
  metadata?: Record<string, any>
}

/**
 * Hook for tracking analytics events
 * Provides convenient methods for common analytics actions
 */
export const useAnalytics = () => {
  const { isAuthenticated } = useAuthStore()
  const sessionId = useMemo(() => getSessionId(), [])

  /**
   * Get base analytics data with common fields
   */
  const getBaseData = useCallback(() => {
    return {
      language: getCurrentLanguage(),
      sessionId,
      metadata: {
        platform: 'web',
        pageUrl: window.location.href,
        pageTitle: document.title,
      },
    }
  }, [sessionId])

  /**
   * Track content view (for videos, documents, etc.)
   */
  const trackView = useCallback(
    async ({
      contentType,
      learningKnowledgeId,
      metadata = {},
    }: TrackViewParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'view',
        contentType,
        learningKnowledgeId,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track content access
   */
  const trackContentAccess = useCallback(
    async ({
      contentType,
      learningKnowledgeId,
      metadata = {},
    }: TrackContentAccessParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'content_access',
        contentType,
        learningKnowledgeId,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track content download
   */
  const trackDownload = useCallback(
    async ({
      contentType,
      learningKnowledgeId,
      metadata = {},
    }: TrackDownloadParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'download',
        contentType,
        learningKnowledgeId,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track video completion
   */
  const trackVideoComplete = useCallback(
    async ({
      learningKnowledgeId,
      duration,
      metadata = {},
    }: TrackVideoCompleteParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'video_complete',
        contentType: 'video',
        learningKnowledgeId,
        duration,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track search query
   */
  const trackSearch = useCallback(
    async ({
      searchQuery,
      resultsCount,
      searchType = 'content',
      filters = {},
      metadata = {},
    }: TrackSearchParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'search',
        searchQuery,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          resultsCount,
          searchType,
          filters,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track FAQ view
   */
  const trackFAQView = useCallback(
    async ({ knowledgeEntryId, metadata = {} }: TrackFAQViewParams) => {
      const baseData = getBaseData()

      await trackEvent({
        action: 'faq_view',
        contentType: 'faq',
        knowledgeEntryId,
        ...baseData,
        metadata: {
          ...baseData.metadata,
          ...metadata,
        },
      })
    },
    [getBaseData]
  )

  /**
   * Track logout event
   * Note: Login and register are auto-tracked by backend
   */
  const trackLogout = useCallback(async () => {
    const baseData = getBaseData()

    await trackEvent({
      action: 'logout',
      ...baseData,
    })
  }, [getBaseData])

  return {
    trackView,
    trackContentAccess,
    trackDownload,
    trackVideoComplete,
    trackSearch,
    trackFAQView,
    trackLogout,
    sessionId,
    isAuthenticated,
  }
}
