# Analytics API Endpoints & Payloads Documentation

This document provides a comprehensive guide to all analytics API endpoints, payloads for different event types, and how analytics are managed in the codebase for both **Web** and **Mobile** platforms.

**Last Updated:** 2024-12-19

---

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [User & Login Analytics](#user--login-analytics)
3. [Content Usage Analytics](#content-usage-analytics)
4. [Search & Discovery Analytics](#search--discovery-analytics)
5. [Admin Analytics Endpoints](#admin-analytics-endpoints)
6. [Code Implementation Details](#code-implementation-details)

---

## API Endpoints

### 1. Track Single Event

**Endpoint:** `POST /api/v1/analytics/track`

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "action": "string (required)",
  "language": "string (required)",
  "contentType": "string (optional)",
  "contentId": "string (optional)",
  "learningKnowledgeId": "string (optional)",
  "knowledgeEntryId": "string (optional)",
  "duration": "number (optional)",
  "metadata": "object (optional)",
  "sessionId": "string (optional)",
  "searchQuery": "string (optional)",
  "aiQuery": "string (optional)",
  "aiResponse": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Analytics event queued successfully",
  "data": {
    "queued": true,
    "message": "Event will be processed asynchronously"
  }
}
```

---

### 2. Track Batch Events

**Endpoint:** `POST /api/v1/analytics/track/batch`

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "events": [
    {
      "action": "string (required)",
      "language": "string (required)",
      // ... same fields as single event
    }
  ]
}
```

**Constraints:**
- Minimum: 1 event
- Maximum: 100 events per batch

**Response:**
```json
{
  "success": true,
  "message": "Analytics events queued successfully",
  "data": {
    "queued": 2,
    "skipped": 0,
    "message": "Events will be processed asynchronously"
  }
}
```

---

## User & Login Analytics

### Supported Actions

- `login` - User login event
- `logout` - User logout event
- `register` - User registration event

### Payload Examples

#### 1. Login Event

**Web & Mobile:**
```json
{
  "action": "login",
  "language": "en",
  "metadata": {
    "userType": "public",
    "loginCount": 5,
    "platform": "web",
    "loginTime": "2024-12-19T10:30:00Z"
  }
}
```

**Backend Implementation:**
- **Location:** `hpbs-backend/src/modules/common/auth/common-auth.controller.ts`
- **Method:** `performLogin()` (line ~357-372)
- **Service Call:** `analyticsTrackingService.trackLogin(userId, req, metadata)`
- **Auto-tracked:** Yes (automatically tracked on successful login)

**Note:** Login events are automatically tracked by the backend when a user successfully logs in. Frontend doesn't need to manually track login events.

---

#### 2. Logout Event

**Web & Mobile:**
```json
{
  "action": "logout",
  "language": "en",
  "metadata": {
    "platform": "web"
  }
}
```

**Backend Implementation:**
- **Service Method:** `analyticsTrackingService.trackLogout(userId, req)`
- **Note:** Currently not automatically tracked. Frontend should track this manually when user logs out.

**Frontend Implementation (Web):**
```typescript
// In logout handler
trackEvent({
  action: 'logout',
  language: currentLanguage,
  metadata: {
    platform: 'web'
  }
})
```

---

#### 3. Register Event

**Web & Mobile:**
```json
{
  "action": "register",
  "language": "en",
  "metadata": {
    "userType": "public",
    "platform": "web",
    "registrationTime": "2024-12-19T10:30:00Z"
  }
}
```

**Backend Implementation:**
- **Service Method:** `analyticsTrackingService.trackRegister(userId, req, metadata)`
- **Auto-tracked:** Yes (automatically tracked on successful registration)

---

### Admin Endpoints for User & Login Analytics

1. **GET** `/api/admin/v1/analytics/user-growth` - New vs returning users
2. **GET** `/api/admin/v1/analytics/session-stats` - Session statistics
3. **GET** `/api/admin/v1/analytics/users-by-country` - Users by country
4. **GET** `/api/admin/v1/analytics/logins-by-country` - Logins by country
5. **GET** `/api/admin/v1/analytics/overview-counts` - Total users, active users

---

## Content Usage Analytics

### Supported Actions

- `view` - Content viewed
- `download` - Content downloaded
- `content_access` - Content accessed (alternative to view)
- `video_complete` - Video watched completely
- `document_view` - Document viewed
- `audio_complete` - Audio listened completely
- `faq_view` - FAQ viewed

### Supported Content Types

- `video`
- `document`
- `faq`
- `manual`
- `image`
- `audio`

### Payload Examples

#### 1. Content View (Video/Document)

**Web:**
```json
{
  "action": "view",
  "contentType": "video",
  "learningKnowledgeId": "507f1f77bcf86cd799439011",
  "language": "en",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web",
    "title": "Product Training Video",
    "category": "training"
  }
}
```

**Mobile:**
```json
{
  "action": "view",
  "contentType": "video",
  "learningKnowledgeId": "507f1f77bcf86cd799439011",
  "language": "en",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "mobile",
    "title": "Product Training Video",
    "category": "training"
  }
}
```

**Frontend Implementation (Web):**
- **Location:** `happy-pet/src/hooks/useAnalytics.ts`
- **Hook:** `useAnalytics().trackView()`
- **Example:**
```typescript
const { trackView } = useAnalytics()
trackView({
  contentType: 'video',
  learningKnowledgeId: '507f1f77bcf86cd799439011',
  metadata: {
    title: 'Product Training Video',
    category: 'training'
  }
})
```

---

#### 2. Content Download

**Web & Mobile:**
```json
{
  "action": "download",
  "contentType": "document",
  "learningKnowledgeId": "507f1f77bcf86cd799439011",
  "language": "en",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web",
    "title": "Product Manual",
    "fileSize": 1024000,
    "fileType": "pdf"
  }
}
```

**Backend Implementation:**
- **Location:** `hpbs-backend/src/modules/content/content.controller.ts`
- **Method:** `downloadContent()` (line ~679-723)
- **Auto-tracked:** Yes (automatically tracked when content is downloaded via API)

**Frontend Implementation (Web):**
- **Hook:** `useAnalytics().trackDownload()`
- **Example:**
```typescript
const { trackDownload } = useAnalytics()
trackDownload({
  contentType: 'document',
  learningKnowledgeId: '507f1f77bcf86cd799439011',
  metadata: {
    fileSize: 1024000,
    fileType: 'pdf'
  }
})
```

---

#### 3. Video Complete

**Web & Mobile:**
```json
{
  "action": "video_complete",
  "contentType": "video",
  "learningKnowledgeId": "507f1f77bcf86cd799439011",
  "language": "en",
  "duration": 180,
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web",
    "playbackPosition": 180,
    "playbackPercentage": 100,
    "videoDuration": 180
  }
}
```

**Frontend Implementation (Web):**
- **Hook:** `useAnalytics().trackVideoComplete()`
- **Example:**
```typescript
const { trackVideoComplete } = useAnalytics()
trackVideoComplete({
  learningKnowledgeId: '507f1f77bcf86cd799439011',
  duration: 180,
  metadata: {
    playbackPosition: 180,
    playbackPercentage: 100,
    videoDuration: 180
  }
})
```

---

#### 4. Content Access (Alternative to View)

**Web & Mobile:**
```json
{
  "action": "content_access",
  "contentType": "document",
  "learningKnowledgeId": "507f1f77bcf86cd799439011",
  "language": "en",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web"
  }
}
```

**Frontend Implementation (Web):**
- **Hook:** `useAnalytics().trackContentAccess()`

---

#### 5. Document View

**Web & Mobile:**
```json
{
  "action": "document_view",
  "contentType": "document",
  "contentId": "507f1f77bcf86cd799439011",
  "language": "en",
  "duration": 120,
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web"
  }
}
```

---

#### 6. Audio Complete

**Web & Mobile:**
```json
{
  "action": "audio_complete",
  "contentType": "audio",
  "contentId": "507f1f77bcf86cd799439011",
  "language": "en",
  "duration": 300,
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web"
  }
}
```

---

#### 7. FAQ View

**Web & Mobile:**
```json
{
  "action": "faq_view",
  "contentType": "faq",
  "knowledgeEntryId": "507f1f77bcf86cd799439011",
  "language": "en",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web"
  }
}
```

---

### Admin Endpoints for Content Usage Analytics

1. **GET** `/api/admin/v1/analytics/content-engagement` - Most viewed content, downloads, FAQs
2. **GET** `/api/admin/v1/analytics/top-content` - Top content by views/downloads
3. **GET** `/api/admin/v1/analytics/content-by-language` - Content consumption by language
4. **GET** `/api/admin/v1/analytics/content-by-country` - Content consumption by country
5. **GET** `/api/admin/v1/analytics/video-stats` - Video statistics
6. **GET** `/api/admin/v1/analytics/video-dropoff/:videoId` - Video drop-off points

---

## Search & Discovery Analytics

### Supported Actions

- `search` - Search performed
- `ai_query` - AI query made
- `ai_interaction` - AI interaction

### Payload Examples

#### 1. Search Event

**Web:**
```json
{
  "action": "search",
  "language": "en",
  "searchQuery": "product manual",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web",
    "resultsCount": 15,
    "searchType": "content",
    "filters": {
      "categoryId": "507f1f77bcf86cd799439011",
      "subCategoryId": "507f1f77bcf86cd799439012",
      "type": "document",
      "language": "en"
    },
    "page": 1,
    "limit": 20
  }
}
```

**Mobile:**
```json
{
  "action": "search",
  "language": "en",
  "searchQuery": "product manual",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "mobile",
    "resultsCount": 15,
    "searchType": "content",
    "filters": {
      "categoryId": "507f1f77bcf86cd799439011"
    }
  }
}
```

**Backend Implementation:**
- **Location:** `hpbs-backend/src/modules/search/search.controller.ts`
- **Method:** `searchContent()` (line ~91-181)
- **Auto-tracked:** Yes (automatically tracked when search is performed via API)

**Frontend Implementation (Web):**
- **Hook:** `useAnalytics().trackSearch()`
- **Example:**
```typescript
const { trackSearch } = useAnalytics()
trackSearch({
  searchQuery: 'product manual',
  resultsCount: 15,
  searchType: 'content',
  filters: {
    categoryId: '507f1f77bcf86cd799439011',
    subCategoryId: '507f1f77bcf86cd799439012'
  }
})
```

**Metadata Fields for Search:**
- `resultsCount` (number) - Number of search results returned
- `searchType` (string) - Type of search: `'content'`, `'faq'`, or `'ai'`
- `filters` (object) - Search filters applied:
  - `categoryId` (string) - Category filter
  - `subCategoryId` (string) - Sub-category filter
  - `type` (string) - Content type filter
  - `language` (string) - Language filter
- `page` (number) - Page number
- `limit` (number) - Results per page

---

#### 2. AI Query Event

**Web:**
```json
{
  "action": "ai_query",
  "language": "en",
  "aiQuery": "How do I use this product?",
  "aiResponse": "To use this product...",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "web",
    "confidence": 0.95,
    "sourcesCount": 3,
    "processingTime": 1250,
    "queryType": "product_question",
    "contentType": "document",
    "category": "training",
    "maxResults": 5
  }
}
```

**Mobile:**
```json
{
  "action": "ai_query",
  "language": "en",
  "aiQuery": "How do I use this product?",
  "aiResponse": "To use this product...",
  "sessionId": "session_123456",
  "metadata": {
    "platform": "mobile",
    "confidence": 0.95,
    "sourcesCount": 3,
    "processingTime": 1250,
    "maxResults": 5
  }
}
```

**Backend Implementation:**
- **Web Endpoint:** `POST /api/web/v1/ai-agent/query`
- **Location:** `hpbs-backend/src/modules/ai-agent/ai-agent.controller.ts`
- **Mobile Endpoint:** `POST /api/mobile/v1/ai-chat/query`
- **Location:** `hpbs-backend/src/modules/mobile/ai-chat/mobile-ai-chat.controller.ts` (line ~301-341)
- **Auto-tracked:** Yes (automatically tracked when AI query is processed)

**Metadata Fields for AI Query:**
- `confidence` (number) - Confidence score (0-1)
- `sourcesCount` (number) - Number of sources used
- `processingTime` (number) - Processing time in milliseconds
- `responseTime` (number) - Response time in milliseconds
- `queryType` (string) - Type of query (e.g., "product_question", "troubleshooting")
- `contentType` (string) - Content type filter applied
- `category` (string) - Category filter applied
- `maxResults` (number) - Maximum results requested
- `followUpDepth` (number) - Calculated automatically based on session (number of follow-up queries)

---

#### 3. AI Interaction Event

**Web & Mobile:**
```json
{
  "action": "ai_interaction",
  "language": "en",
  "aiQuery": "Tell me more about this feature",
  "aiResponse": "This feature allows...",
  "sessionId": "session_123456",
  "duration": 30,
  "metadata": {
    "platform": "web",
    "interactionType": "follow_up",
    "followUpDepth": 2
  }
}
```

**Note:** `ai_interaction` is used for general AI interactions, while `ai_query` is specifically for AI assistant queries.

---

### Admin Endpoints for Search & Discovery Analytics

1. **GET** `/api/admin/v1/analytics/search-trends` - Popular search queries
2. **GET** `/api/admin/v1/analytics/search-query/:query` - Detailed breakdown for specific query
3. **GET** `/api/admin/v1/analytics/search-by-country` - Search queries by country
4. **GET** `/api/admin/v1/analytics/search-by-language` - Search queries by language
5. **GET** `/api/admin/v1/analytics/zero-result-searches` - Searches with no results
6. **GET** `/api/admin/v1/analytics/trending-searches` - Trending searches (7d, 30d, 90d)
7. **GET** `/api/admin/v1/analytics/interaction-trends` - Search & AI interaction trends

---

## Admin Analytics Endpoints

### Overview & General Analytics

1. **GET** `/api/admin/v1/analytics` - Get analytics with filters (pagination, date range, language, contentType, action, userId)
2. **GET** `/api/admin/v1/analytics/overview-counts` - Overview counts (total users, active users, etc.)
3. **GET** `/api/admin/v1/analytics/usage-stats` - Usage statistics (total queries, queries over time, AI usage, active users)
4. **GET** `/api/admin/v1/analytics/language-stats` - Language-wise analytics
5. **GET** `/api/admin/v1/analytics/export` - Export analytics data (CSV/Excel)

### Query Parameters (Common)

- `dateFrom` (string, ISO 8601) - Start date
- `dateTo` (string, ISO 8601) - End date
- `language` (string) - Filter by language: `en`, `ar`, `id`, `ms`, `th`, `de`
- `contentType` (string) - Filter by content type
- `queryCategory` (string) - Filter by query category
- `async` (boolean) - Use async processing (returns job ID)
- `page` (number) - Page number (for paginated endpoints)
- `limit` (number) - Items per page

### Job Status Endpoints

For async operations:

1. **GET** `/api/admin/v1/analytics/jobs/:jobId` - Get job status
2. **GET** `/api/admin/v1/analytics/jobs/:jobId/result` - Get job result

---

## Code Implementation Details

### Backend Architecture

#### 1. Analytics Tracking Service

**Location:** `hpbs-backend/src/services/analytics-tracking.service.ts`

**Key Methods:**
- `trackEvent(eventData, req)` - Track single event (queues to BullMQ)
- `trackBatch(events, req)` - Track multiple events in batch
- `trackLogin(userId, req, metadata)` - Convenience method for login
- `trackLogout(userId, req)` - Convenience method for logout
- `trackRegister(userId, req, metadata)` - Convenience method for registration
- `trackContentView(userId, contentId, contentType, req, metadata)` - Convenience method for content view
- `trackDownload(userId, contentId, contentType, req, metadata)` - Convenience method for download
- `trackSearch(userId, query, language, resultsCount, req, metadata)` - Convenience method for search
- `trackAIQuery(userId, query, response, language, sessionId, req, metadata)` - Convenience method for AI query

**Processing Flow:**
1. Controller receives request
2. Calls `analyticsTrackingService.trackEvent()` or convenience method
3. Service adds event to BullMQ queue (non-blocking)
4. Worker processes event asynchronously
5. Event saved to MongoDB Analytics collection

#### 2. Analytics Model

**Location:** `hpbs-backend/src/models/Analytics.ts`

**Key Fields:**
- `userId` - User ID (optional, for anonymous tracking)
- `action` - Analytics action type
- `contentType` - Type of content
- `contentId` - Content ID (if tracking Content model)
- `learningKnowledgeId` - LearningKnowledge ID
- `knowledgeEntryId` - KnowledgeEntry ID
- `searchQuery` - Search query text
- `aiQuery` - AI query text
- `aiResponse` - AI response text (truncated to 500 chars)
- `language` - Language code
- `duration` - Time spent in seconds
- `sessionId` - Session identifier
- `metadata` - Additional metadata (object)
- `platform` - Platform: `'web'` or `'mobile'`
- `deviceType` - Device type: `'desktop'`, `'mobile'`, `'tablet'`
- `country` - Country code (from GeoIP)
- `createdAt` - Event timestamp

#### 3. Validation Schema

**Location:** `hpbs-backend/src/modules/analytics/analytics.schema.ts`

**Valid Actions:**
- `view`, `download`, `content_access`, `video_complete`, `document_view`, `audio_complete`, `faq_view`
- `search`, `ai_query`, `ai_interaction`
- `login`, `logout`, `register`
- `content_upload`, `complete`, `contact_submit`

**Valid Content Types:**
- `video`, `document`, `faq`, `manual`, `image`, `audio`, `contact`

**Valid Languages:**
- `en`, `ar`, `id`, `ms`, `th`, `de`

#### 4. Admin Analytics Service

**Location:** `hpbs-backend/src/modules/admin/analytics/admin-analytics.service.ts`

**Key Methods:**
- `getOverviewCounts()` - Overview statistics
- `getUsageStats()` - Usage statistics
- `getSearchTrends()` - Search trends
- `getSearchQueryDetails()` - Detailed search query analysis
- `getContentEngagement()` - Content engagement analytics
- `getInteractionTrends()` - Interaction trends
- `getUserGrowth()` - User growth (new vs returning)
- `getSessionStats()` - Session statistics
- `getUsersByCountry()` - Users by country
- `getLoginsByCountry()` - Logins by country
- `getContentConsumptionByCountry()` - Content consumption by country
- `getVideoStats()` - Video statistics
- `getVideoDropoffPoints()` - Video drop-off points
- `getZeroResultSearches()` - Zero-result searches
- `getTrendingSearches()` - Trending searches

---

### Frontend Implementation

#### Web (Happy Pet)

**API Client:**
- **Location:** `happy-pet/src/api/analytics.ts`
- **Functions:**
  - `trackEvent(eventData)` - Track single event (fire-and-forget)
  - `trackBatch(events)` - Track batch events (fire-and-forget)

**React Hook:**
- **Location:** `happy-pet/src/hooks/useAnalytics.ts`
- **Hook:** `useAnalytics()`
- **Methods:**
  - `trackView(params)` - Track content view
  - `trackContentAccess(params)` - Track content access
  - `trackDownload(params)` - Track download
  - `trackVideoComplete(params)` - Track video completion
  - `trackSearch(params)` - Track search

**Session Management:**
- Session ID is automatically generated and stored in localStorage
- Session duration: 30 minutes
- Session ID format: `session_{timestamp}_{random}`

**Example Usage:**
```typescript
import { useAnalytics } from '@/hooks/useAnalytics'

function MyComponent() {
  const { trackView, trackSearch } = useAnalytics()
  
  const handleView = () => {
    trackView({
      contentType: 'video',
      learningKnowledgeId: '507f1f77bcf86cd799439011',
      metadata: {
        title: 'Product Training'
      }
    })
  }
  
  const handleSearch = () => {
    trackSearch({
      searchQuery: 'product manual',
      resultsCount: 15,
      searchType: 'content'
    })
  }
}
```

---

### Platform Detection

The backend automatically detects the platform from the request:

1. **Header-based:** `x-platform` header (set by frontend)
2. **User-Agent:** Detected from `User-Agent` header
3. **Device Type:** Automatically detected as `'desktop'`, `'mobile'`, or `'tablet'`

**Frontend should set:**
```typescript
// In API client
headers: {
  'x-platform': 'web' // or 'mobile'
}
```

---

### Metadata Best Practices

#### Common Metadata Fields

- `platform` (string) - Always include: `'web'` or `'mobile'`
- `pageUrl` (string) - Current page URL (web only)
- `pageTitle` (string) - Page title (web only)
- `previousPageUrl` (string) - Previous page URL (web only)

#### Content-Specific Metadata

**For Videos:**
- `playbackPosition` (number) - Current playback position in seconds
- `playbackPercentage` (number) - Playback percentage (0-100)
- `videoDuration` (number) - Total video duration in seconds
- `title` (string) - Video title
- `category` (string) - Video category

**For Documents:**
- `fileSize` (number) - File size in bytes
- `fileType` (string) - File type (e.g., "pdf", "docx")
- `title` (string) - Document title
- `category` (string) - Document category

**For Search:**
- `resultsCount` (number) - Number of results
- `searchType` (string) - `'content'`, `'faq'`, or `'ai'`
- `filters` (object) - Applied filters
- `page` (number) - Page number
- `limit` (number) - Results per page

**For AI Queries:**
- `confidence` (number) - Confidence score (0-1)
- `sourcesCount` (number) - Number of sources
- `processingTime` (number) - Processing time in ms
- `queryType` (string) - Query type
- `maxResults` (number) - Max results requested
- `followUpDepth` (number) - Calculated automatically

---

### Error Handling

All analytics tracking is **fire-and-forget** and should never break the user experience:

1. **Frontend:** Errors are silently caught and only logged in development
2. **Backend:** Errors are logged but don't affect API responses
3. **Queue:** Failed events are retried automatically (3 attempts with exponential backoff)

---

### Performance Considerations

1. **Async Processing:** All events are processed asynchronously via BullMQ queue
2. **Deduplication:** Duplicate events within 1 minute are automatically skipped
3. **Batch Support:** Use batch endpoint for multiple events (more efficient)
4. **Caching:** Admin analytics endpoints use Redis caching for performance

---

## Summary

### Quick Reference

| Event Type | Action | Required Fields | Auto-Tracked |
|------------|--------|----------------|--------------|
| Login | `login` | `action`, `language` | ✅ Yes (Backend) |
| Logout | `logout` | `action`, `language` | ❌ No (Frontend) |
| Register | `register` | `action`, `language` | ✅ Yes (Backend) |
| Content View | `view` | `action`, `contentType`, `learningKnowledgeId`, `language` | ❌ No (Frontend) |
| Content Download | `download` | `action`, `contentType`, `learningKnowledgeId`, `language` | ✅ Yes (Backend API) |
| Video Complete | `video_complete` | `action`, `contentType`, `learningKnowledgeId`, `language`, `duration` | ❌ No (Frontend) |
| Search | `search` | `action`, `language`, `searchQuery` | ✅ Yes (Backend API) |
| AI Query | `ai_query` | `action`, `language`, `aiQuery`, `aiResponse` | ✅ Yes (Backend API) |

### Endpoints Summary

**Tracking Endpoints:**
- `POST /api/v1/analytics/track` - Single event
- `POST /api/v1/analytics/track/batch` - Batch events

**Admin Endpoints:**
- `GET /api/admin/v1/analytics/*` - Various analytics reports (see Admin Analytics Endpoints section)

---

## Notes for Web & Mobile Teams

### Web Team

1. Use `useAnalytics()` hook for all tracking
2. Set `platform: 'web'` in metadata
3. Include `pageUrl`, `pageTitle` in metadata when available
4. Track logout manually when user logs out
5. Session ID is automatically managed

### Mobile Team

1. Use direct API calls to `/api/v1/analytics/track` or `/api/v1/analytics/track/batch`
2. Set `platform: 'mobile'` in metadata
3. Generate and manage session ID manually (recommended: 30-minute sessions)
4. Use batch endpoint for offline event queuing
5. Track logout manually when user logs out

---

**For questions or clarifications, refer to:**
- Backend: `hpbs-backend/src/modules/analytics/`
- Frontend: `happy-pet/src/api/analytics.ts` and `happy-pet/src/hooks/useAnalytics.ts`
- Admin: `hpbs-backend/src/modules/admin/analytics/`
