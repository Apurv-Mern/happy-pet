# Chat Implementation Flow Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Common API Endpoints](#common-api-endpoints)
3. [WebSocket/Socket.IO Implementation](#websocketsocketio-implementation)
4. [Detailed Flow Scenarios](#detailed-flow-scenarios)
5. [Data Models](#data-models)
6. [Error Handling & Edge Cases](#error-handling--edge-cases)
7. [Platform-Specific Notes](#platform-specific-notes)

---

## Introduction

### Overview

The Chat System provides a comprehensive chat interface for both web and mobile platforms, enabling users to interact with an AI assistant through text, audio, and video formats. The system supports:

- **Text Chat**: Standard text-based conversations
- **Audio Chat**: Voice input/output with transcription and TTS
- **Video Chat**: Video avatar interactions via LiveAvatar and HeyGen Streaming
- **Real-time Updates**: WebSocket-based real-time message and media updates
- **Session Management**: Create, update, delete, and archive chat sessions
- **RAG Integration**: Retrieval-Augmented Generation for context-aware responses

### Base URLs

- **Chat API Endpoints** (Web & Mobile): `/api/v1/chat`
- **WebSocket Connection**: Base API URL with path `/socket.io`

### Authentication

All endpoints require:
- **Bearer Token** in `Authorization` header: `Authorization: Bearer <token>`
- User must be authenticated via the `authenticate` middleware
- Session ownership is verified for all session-specific operations

### API Endpoints

**All Chat Endpoints** (`/api/v1/chat`):
- Used by both web and mobile platforms
- Full session and message management
- Support for text, audio, and video formats
- Real-time WebSocket integration
- Complete control over chat functionality

**Note**: The same endpoints are used for both web and mobile platforms, ensuring consistency across all implementations.

---

## Common API Endpoints

All common endpoints are available at `/api/v1/chat` and require authentication.

### Session Management

#### 1. Create Chat Session

**Endpoint**: `POST /api/v1/chat/sessions`

**Description**: Creates a new chat session for the authenticated user.

**Request Body**:
```json
{
  "title": "New Chat"  // Optional, defaults to "New Chat"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Chat session created successfully",
  "data": {
    "_id": "65f4a3b1234567890abcdef1",
    "userId": "user123",
    "title": "New Chat",
    "status": "active",
    "lastMessageAt": null,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**When to Use**:
- First-time user with no existing sessions
- User wants to start a new conversation
- Creating a new chat thread

**Edge Cases**:
- If title is not provided, defaults to "New Chat"
- Frontend may create temporary session ID (`temp-${Date.now()}`) for optimistic UI updates
- If backend creation fails, temporary session should be removed from UI

---

#### 2. Get All Chat Sessions

**Endpoint**: `GET /api/v1/chat/sessions`

**Description**: Retrieves all chat sessions for the authenticated user with pagination support.

**Query Parameters**:
- `page` (optional): Page number (default: 1, min: 1)
- `limit` (optional): Items per page (default: 10, min: 1, max: 100)
- `status` (optional): Filter by status - `'active'` or `'archived'`

**Example Request**:
```
GET /api/v1/chat/sessions?page=1&limit=10&status=active
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat sessions retrieved successfully",
  "data": {
    "sessions": [
      {
        "_id": "65f4a3b1234567890abcdef1",
        "userId": "user123",
        "title": "Chat Session 1",
        "status": "active",
        "lastMessageAt": "2024-01-15T10:35:00.000Z",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

**When to Use**:
- Initial app load to display session list
- Refreshing session list
- Filtering active/archived sessions
- Returning user flow

**Edge Cases**:
- If no sessions exist, returns empty array `[]`
- Frontend should auto-select first session if no current session is selected
- Retry up to 3 times on network failures

---

#### 3. Get Session by ID

**Endpoint**: `GET /api/v1/chat/sessions/:sessionId`

**Description**: Retrieves a specific chat session by its ID.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId of the session

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat session retrieved successfully",
  "data": {
    "_id": "65f4a3b1234567890abcdef1",
    "userId": "user123",
    "title": "Chat Session 1",
    "status": "active",
    "lastMessageAt": "2024-01-15T10:35:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Responses**:
- `400`: Invalid session ID format
- `401`: User not authenticated
- `404`: Session not found or doesn't belong to user

**When to Use**:
- Verifying session exists before loading messages
- Getting session details for display
- Validating session ownership

---

#### 4. Update Session Title

**Endpoint**: `PUT /api/v1/chat/sessions/:sessionId`

**Description**: Updates the title of a chat session.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Request Body**:
```json
{
  "title": "Updated Chat Title"
}
```

**Validation**:
- Title is required
- Must be a string
- Length: 1-100 characters

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat session title updated successfully",
  "data": {
    "_id": "65f4a3b1234567890abcdef1",
    "title": "Updated Chat Title",
    // ... other fields
  }
}
```

**When to Use**:
- User renames a chat session
- Auto-updating title based on first message

**Edge Cases**:
- Optimistic UI update before API call
- Revert to old title if update fails
- Show toast notification on success/error

---

#### 5. Archive Session

**Endpoint**: `PATCH /api/v1/chat/sessions/:sessionId/archive`

**Description**: Archives a chat session (changes status from 'active' to 'archived').

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat session archived successfully",
  "data": {
    "_id": "65f4a3b1234567890abcdef1",
    "status": "archived",
    // ... other fields
  }
}
```

**When to Use**:
- User wants to hide a session from active list
- Organizing chat history

---

#### 6. Delete Session

**Endpoint**: `DELETE /api/v1/chat/sessions/:sessionId`

**Description**: Permanently deletes a chat session and all its messages.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat session deleted successfully",
  "data": null
}
```

**When to Use**:
- User wants to permanently remove a conversation
- Cleanup of old sessions

**Edge Cases**:
- If deleted session was current, switch to another session or create new one
- Optimistic UI update (remove from list immediately)
- Revert if deletion fails

---

#### 7. Clear All Messages

**Endpoint**: `DELETE /api/v1/chat/sessions/:sessionId/messages`

**Description**: Deletes all messages from a session but keeps the session.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat messages cleared successfully",
  "data": {
    "deletedCount": 15
  }
}
```

**When to Use**:
- User wants to start fresh in existing session
- Clearing conversation history while keeping session

---

### Message Management

#### 8. Get Messages

**Endpoint**: `GET /api/v1/chat/sessions/:sessionId/messages`

**Description**: Retrieves messages for a specific chat session with pagination.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Query Parameters**:
- `page` (optional): Page number (default: 1, min: 1)
- `limit` (optional): Items per page (default: 50, min: 1, max: 100)

**Example Request**:
```
GET /api/v1/chat/sessions/65f4a3b1234567890abcdef1/messages?page=1&limit=50
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Chat messages retrieved successfully",
  "data": {
    "messages": [
      {
        "_id": "msg123",
        "sessionId": "65f4a3b1234567890abcdef1",
        "senderType": "user",
        "text": "Hello, how are you?",
        "requestedFormat": "text",
        "variants": [
          {
            "type": "text",
            "text": "Hello, how are you?",
            "status": "ready"
          }
        ],
        "status": "complete",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "msg124",
        "sessionId": "65f4a3b1234567890abcdef1",
        "senderType": "assistant",
        "text": "I'm doing well, thank you!",
        "requestedFormat": "text",
        "variants": [
          {
            "type": "text",
            "text": "I'm doing well, thank you!",
            "status": "ready"
          }
        ],
        "status": "complete",
        "createdAt": "2024-01-15T10:30:05.000Z",
        "updatedAt": "2024-01-15T10:30:05.000Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 50,
    "totalPages": 1
  }
}
```

**When to Use**:
- Loading chat history when opening a session
- Paginating through old messages
- Returning user flow to display previous conversations

**Edge Cases**:
- If session has no messages, returns empty array
- Messages are ordered by `createdAt` ascending (oldest first)
- Only loads messages if sessionId is valid (not temp ID, length >= 24)

---

#### 9. Send Message (Text Input)

**Endpoint**: `POST /api/v1/chat/sessions/:sessionId/messages`

**Description**: Sends a text message and receives an AI response via RAG processing.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Request Body**:
```json
{
  "text": "What are the benefits of Happy Dog Super Premium?",
  "requestedFormat": "text",  // 'text' | 'audio' | 'video'
  "responseFormat": "text",    // Optional: 'text' | 'audio' (only if requestedFormat is not 'video')
  "language": "en"             // Optional: Supported language code
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Chat message sent successfully",
  "data": {
    "session": {
      "_id": "65f4a3b1234567890abcdef1",
      "title": "Chat Session 1",
      "status": "active",
      // ... other fields
    },
    "userMessage": {
      "_id": "msg125",
      "sessionId": "65f4a3b1234567890abcdef1",
      "senderType": "user",
      "text": "What are the benefits of Happy Dog Super Premium?",
      "requestedFormat": "text",
      "variants": [
        {
          "type": "text",
          "text": "What are the benefits of Happy Dog Super Premium?",
          "status": "ready"
        }
      ],
      "status": "complete",
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    },
    "assistantMessage": {
      "_id": "msg126",
      "sessionId": "65f4a3b1234567890abcdef1",
      "senderType": "assistant",
      "text": "Happy Dog Super Premium offers several benefits...",
      "requestedFormat": "text",
      "variants": [
        {
          "type": "text",
          "text": "Happy Dog Super Premium offers several benefits...",
          "status": "ready"
        }
      ],
      "status": "complete",
      "retrievals": [
        {
          "chunkId": "chunk123",
          "sourceDocumentId": "doc456",
          "score": 0.95,
          "textPreview": "Happy Dog Super Premium contains..."
        }
      ],
      "createdAt": "2024-01-15T10:35:05.000Z",
      "updatedAt": "2024-01-15T10:35:05.000Z"
    },
    "recommendations": [
      {
        "fileName": "Happy_Dog_Super_Premium_Guide.pdf",
        "url": "https://s3.amazonaws.com/...",
        "documentId": "doc456",
        "score": 0.95
      }
    ]
  }
}
```

**When to Use**:
- User sends a text message
- Standard chat interaction
- Requesting text, audio, or video response

**Flow**:
1. User types and sends message
2. Frontend shows optimistic UI update (user message immediately)
3. POST request to API
4. Backend creates user message
5. Backend processes via RAG (Retrieval-Augmented Generation)
6. Backend creates assistant message
7. If audio/video requested, backend queues media generation job
8. Response includes both messages
9. Frontend updates UI with assistant response
10. WebSocket will notify when media is ready (if requested)

**Edge Cases**:
- If `requestedFormat` is 'video', `responseFormat` is ignored (video doesn't support response format)
- If media generation is requested, initial response may have variants with `status: 'pending'`
- WebSocket will emit update when media is ready
- Rate limiting applies (prevents abuse)

---

#### 10. Send Message (Audio Input)

**Endpoint**: `POST /api/v1/chat/sessions/:sessionId/messages`

**Description**: Sends an audio message (file upload) and receives an AI response. The audio is transcribed first, then processed.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Request Body** (FormData):
```
audio: File (required if no text)
text: string (optional, can be empty if only audio)
requestedFormat: 'text' | 'audio' | 'video'
responseFormat: 'text' | 'audio' (optional)
language: string (optional, e.g., 'en', 'ar', 'id')
```

**Supported Audio Formats**:
- `audio/mpeg`, `audio/mp3`
- `audio/wav`
- `audio/webm`
- `audio/m4a`
- `audio/ogg`
- `audio/x-m4a`
- `audio/mp4`

**Max File Size**: 25MB

**Response**: Same as text message response (see above)

**When to Use**:
- User records voice message
- Voice input for hands-free interaction
- Mobile voice chat

**Flow**:
1. User records audio
2. Frontend uploads audio file via FormData
3. Backend receives audio file
4. Backend transcribes audio using OpenAI Whisper
5. Backend processes transcribed text via RAG
6. Backend creates user message (with transcribed text)
7. Backend creates assistant message
8. Response includes both messages
9. WebSocket updates for media generation status

**Edge Cases**:
- Either `text` or `audio` file must be provided
- If both provided, audio is transcribed and text is used as fallback
- Audio transcription may fail - handle gracefully
- File size validation (max 25MB)

---

#### 11. Get Message Assets

**Endpoint**: `GET /api/v1/chat/sessions/:sessionId/messages/:messageId/assets`

**Description**: Retrieves all assets (audio/video files) associated with a specific message.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId
- `messageId` (required): MongoDB ObjectId

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Message assets retrieved successfully",
  "data": {
    "assets": [
      {
        "_id": "asset123",
        "messageId": "msg126",
        "type": "audio",
        "mediaId": "media456",
        "status": "ready",
        "url": "https://s3.amazonaws.com/...",
        "createdAt": "2024-01-15T10:35:10.000Z"
      }
    ]
  }
}
```

**When to Use**:
- Loading media files for a message
- Checking asset generation status
- Displaying audio/video players

---

### Voice Processing Endpoints

#### 12. Transcribe Voice

**Endpoint**: `POST /api/v1/chat/sessions/:sessionId/voice/transcribe`

**Description**: Transcribes an audio file to text without processing the query.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Request Body** (FormData):
```
audio: File (required)
language: string (optional, e.g., 'en')
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Voice transcription completed",
  "data": {
    "text": "What are the benefits of Happy Dog Super Premium?",
    "language": "en"
  }
}
```

**When to Use**:
- Pre-transcription before sending message
- Voice input preview
- Voice input flow for web and mobile

---

#### 13. Process Voice Query

**Endpoint**: `POST /api/v1/chat/sessions/:sessionId/voice/process`

**Description**: Transcribes audio (if provided) and processes the query via RAG in one step.

**Path Parameters**:
- `sessionId` (required): MongoDB ObjectId

**Request Body** (FormData):
```
audio: File (optional, if text provided)
text: string (optional, if audio provided)
language: string (optional)
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Voice query processed successfully",
  "data": {
    "query": "What are the benefits of Happy Dog Super Premium?",
    "response": "Happy Dog Super Premium offers several benefits...",
    "messageId": "msg126"
  }
}
```

**When to Use**:
- Combined transcription and processing
- Voice chat flow for web and mobile
- Quick voice query processing

---

## WebSocket/Socket.IO Implementation

### Connection Setup

**Socket.IO Path**: `/socket.io`

**Connection URL**: Base API URL (without `/api/v1` prefix)

**Connection Configuration**:
```javascript
const socket = io(socketUrl, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});
```

**When to Connect**:
- After user authentication
- When a valid session is selected (sessionId is valid MongoDB ObjectId, not temp ID)
- On app initialization if session exists

**When NOT to Connect**:
- If sessionId is invalid (starts with 'temp-', length < 24)
- Before user authentication
- If WebSocket is disabled in backend config

---

### Client → Server Events

#### 1. `chat:subscribe`

**Purpose**: Subscribe to real-time updates for a chat session.

**Payload**:
```typescript
sessionId: string; // MongoDB ObjectId
```

**When to Use**:
- After WebSocket connection is established
- When switching to a different chat session
- When a new session is created and selected

**Example**:
```javascript
socket.emit('chat:subscribe', '65f4a3b1234567890abcdef1');
```

**Edge Cases**:
- Only subscribes if sessionId is valid (not temp ID, length >= 24)
- Automatically unsubscribes from previous session when switching
- If subscription fails, retry connection

---

#### 2. `chat:unsubscribe`

**Purpose**: Unsubscribe from a chat session.

**Payload**:
```typescript
sessionId: string; // MongoDB ObjectId
```

**When to Use**:
- Before disconnecting WebSocket
- When switching to a different session
- On component unmount
- When session is deleted

**Example**:
```javascript
socket.emit('chat:unsubscribe', '65f4a3b1234567890abcdef1');
```

---

#### 3. `chat:typing`

**Purpose**: Broadcast typing indicator to other users in the session.

**Payload**:
```typescript
{
  sessionId: string,
  userId: string, // Currently 'current-user'
  isTyping: boolean
}
```

**When to Use**:
- When user starts typing
- When user stops typing (after delay or message sent)

**Example**:
```javascript
socket.emit('chat:typing', {
  sessionId: '65f4a3b1234567890abcdef1',
  userId: 'current-user',
  isTyping: true,
});
```

**Edge Cases**:
- Only broadcasts to other users in the session (not sender)
- Debounce typing events to avoid spam
- Clear typing indicator when message is sent

---

### Server → Client Events

#### 1. `connect`

**Purpose**: Indicates WebSocket connection is established.

**When Received**:
- Immediately after successful connection
- After reconnection

**Example Handler**:
```javascript
socket.on('connect', () => {
  console.log('WebSocket connected');
  // Subscribe to current session
  if (currentSessionId) {
    socket.emit('chat:subscribe', currentSessionId);
  }
});
```

---

#### 2. `disconnect`

**Purpose**: Indicates WebSocket connection is lost.

**When Received**:
- When connection is closed
- On network errors
- When server shuts down

**Example Handler**:
```javascript
socket.on('disconnect', () => {
  console.log('WebSocket disconnected');
  // Handle reconnection or show offline indicator
});
```

---

#### 3. `chat:message`

**Purpose**: Real-time message updates (new messages or updates to existing messages).

**Payload**:
```typescript
{
  sessionId: string,
  type: 'new' | 'update',  // 'new' for new messages, 'update' for message updates
  message: ChatMessage      // Full message object
}
```

**When Received**:
- When a new message is created (type: 'new')
- When a message is updated (type: 'update') - e.g., media generation complete
- When media assets are ready

**Example Handler**:
```javascript
socket.on('chat:message', (data) => {
  if (data.sessionId !== currentSessionId) return;
  
  if (data.type === 'new') {
    // Add new message to UI
    addMessage(data.message);
  } else if (data.type === 'update') {
    // Update existing message (e.g., media ready)
    updateMessage(data.message);
  }
});
```

**Flow for Media Generation**:
1. User sends message requesting audio/video
2. Backend creates message with variants having `status: 'pending'`
3. Backend emits `chat:message` event (type: 'new')
4. Frontend displays message with loading indicator
5. Backend queues media generation job
6. When media is ready, backend updates message variants
7. Backend emits `chat:message` event (type: 'update')
8. Frontend updates message to show media player

**Edge Cases**:
- Check `sessionId` matches current session before processing
- Avoid duplicate messages (check if message already exists)
- Handle message updates for media status changes
- Extract display text from variants array

---

#### 4. `chat:typing`

**Purpose**: Typing indicator from other users in the session.

**Payload**:
```typescript
{
  sessionId: string,
  userId: string,
  isTyping: boolean
}
```

**When Received**:
- When another user starts/stops typing in the session

**Example Handler**:
```javascript
socket.on('chat:typing', (data) => {
  if (data.sessionId !== currentSessionId) return;
  if (data.userId === 'current-user') return; // Don't show own typing
  
  setTypingIndicator(data.isTyping);
});
```

---

#### 5. `chat:asset-update`

**Purpose**: Asset status update for progressive media upload/generation.

**Payload**:
```typescript
{
  sessionId: string,
  messageId: string,
  asset: {
    _id: string,
    type: 'audio' | 'video' | 'image',
    status: 'pending' | 'ready' | 'failed',
    mediaId?: string,
    url?: string
  }
}
```

**When Received**:
- When asset generation status changes
- When media file is ready for playback
- When asset generation fails

**Example Handler**:
```javascript
socket.on('chat:asset-update', (data) => {
  if (data.sessionId !== currentSessionId) return;
  
  updateMessageAsset(data.messageId, data.asset);
});
```

---

### Connection Lifecycle

**Typical Flow**:

1. **Initialization**:
   - User authenticates
   - Load sessions → `GET /api/v1/chat/sessions`
   - Select session (or create new)
   - Load messages → `GET /api/v1/chat/sessions/:id/messages`
   - Connect WebSocket → `io.connect()`
   - On `connect` → Subscribe to session → `chat:subscribe`

2. **Active Chat**:
   - Send messages → `POST /api/v1/chat/sessions/:id/messages`
   - Receive real-time updates → `chat:message` events
   - Show typing indicators → `chat:typing` events
   - Update UI for media ready → `chat:asset-update` events

3. **Session Switch**:
   - Unsubscribe from current → `chat:unsubscribe`
   - Load new session messages → `GET /api/v1/chat/sessions/:id/messages`
   - Subscribe to new session → `chat:subscribe`

4. **Disconnection**:
   - Unsubscribe from session → `chat:unsubscribe`
   - Disconnect WebSocket → `socket.disconnect()`
   - Clean up event listeners

**Reconnection Handling**:
- Automatic reconnection enabled (5 attempts, 1 second delay)
- On reconnection, resubscribe to current session
- Handle missed messages (may need to reload messages)

---

## Detailed Flow Scenarios

### Scenario 1: First-Time User (No Existing Sessions)

**Situation**: User opens chat interface for the first time with no previous sessions.

**Step-by-Step Flow**:

1. **User Opens Chat Interface**
   - Frontend initializes chat component
   - Check if user is authenticated

2. **Check for Existing Sessions**
   ```
   GET /api/v1/chat/sessions?status=active&page=1&limit=10
   ```
   - Response: `{ sessions: [], total: 0, ... }`

3. **No Sessions Found - Create New Session**
   ```
   POST /api/v1/chat/sessions
   Body: { "title": "New Chat" }
   ```
   - Response: New session with `_id: "65f4a3b1234567890abcdef1"`

4. **Load Messages for New Session**
   ```
   GET /api/v1/chat/sessions/65f4a3b1234567890abcdef1/messages?page=1&limit=50
   ```
   - Response: `{ messages: [], total: 0, ... }` (empty for new session)

5. **Connect WebSocket**
   ```javascript
   const socket = io(socketUrl, { path: '/socket.io', ... });
   socket.on('connect', () => {
     socket.emit('chat:subscribe', '65f4a3b1234567890abcdef1');
   });
   ```

6. **Ready to Send Messages**
   - Display empty chat interface
   - Show input field ready for user message
   - WebSocket connected and subscribed

**Frontend Implementation Notes**:
- Create temporary session ID (`temp-${Date.now()}`) for optimistic UI
- Replace temp session with real session when API responds
- If creation fails, remove temp session and show error

---

### Scenario 2: Returning User (Existing Sessions)

**Situation**: User opens chat interface and has previous chat sessions.

**Step-by-Step Flow**:

1. **User Opens Chat Interface**
   - Frontend initializes chat component
   - User is authenticated

2. **Load All Active Sessions**
   ```
   GET /api/v1/chat/sessions?status=active&page=1&limit=10
   ```
   - Response: `{ sessions: [{ _id: "session1", ... }, { _id: "session2", ... }], ... }`

3. **Auto-Select First Session**
   - Frontend automatically selects first session from list
   - Or user manually selects a session from sidebar

4. **Load Messages for Selected Session**
   ```
   GET /api/v1/chat/sessions/session1/messages?page=1&limit=50
   ```
   - Response: `{ messages: [{ ... }, { ... }], ... }` (previous chat history)

5. **Connect WebSocket**
   ```javascript
   const socket = io(socketUrl, { path: '/socket.io', ... });
   socket.on('connect', () => {
     socket.emit('chat:subscribe', 'session1');
   });
   ```

6. **Display Previous Chat History**
   - Render all messages in chronological order
   - Show user and assistant messages
   - Display media players for audio/video messages if ready

7. **Ready to Continue Conversation**
   - User can see previous messages
   - Input field ready for new message
   - WebSocket connected for real-time updates

**Frontend Implementation Notes**:
- Sort sessions by `lastMessageAt` or `updatedAt` (newest first)
- Auto-select most recent session
- Load messages in batches if pagination needed
- Show loading state while fetching messages

---

### Scenario 3: Sending a Text Message

**Situation**: User types and sends a text message in an active chat session.

**Step-by-Step Flow**:

1. **User Types and Sends Message**
   - User enters text: "What are the benefits of Happy Dog Super Premium?"
   - User clicks send button or presses Enter

2. **Optimistic UI Update**
   - Frontend immediately displays user message in chat UI
   - Show message as "sending..." or with temporary ID
   - Disable send button to prevent duplicate sends

3. **Send Message to API**
   ```
   POST /api/v1/chat/sessions/session1/messages
   Body: {
     "text": "What are the benefits of Happy Dog Super Premium?",
     "requestedFormat": "text",
     "language": "en"
   }
   ```

4. **Backend Processing**
   - Backend creates user message in database
   - Backend processes query via RAG (Retrieval-Augmented Generation)
   - Backend generates AI response
   - Backend creates assistant message
   - If audio/video requested, backend queues media generation job

5. **API Response**
   ```json
   {
     "session": { ... },
     "userMessage": { "_id": "msg125", "text": "...", ... },
     "assistantMessage": { "_id": "msg126", "text": "...", ... },
     "recommendations": [ ... ]
   }
   ```

6. **Update UI with Response**
   - Replace temporary user message with real message from API
   - Add assistant message to chat
   - Display recommendations if provided
   - Re-enable send button

7. **WebSocket Updates (if media requested)**
   - If `requestedFormat` is 'audio' or 'video', initial response may have variants with `status: 'pending'`
   - WebSocket will emit `chat:message` event (type: 'update') when media is ready
   - Frontend updates message to show media player

**Frontend Implementation Notes**:
- Use request deduplication to prevent duplicate sends
- Handle network errors with retry (up to 3 attempts)
- Show error message if send fails
- Remove temporary message if API call fails
- Scroll to bottom after adding messages

---

### Scenario 4: Sending an Audio Message

**Situation**: User records and sends an audio message.

**Step-by-Step Flow**:

1. **User Records Audio**
   - User clicks microphone button
   - Frontend records audio (using MediaRecorder API or device recording)
   - User stops recording
   - Audio file is ready (e.g., `audio.webm`)

2. **Send Audio Message**
   ```javascript
   const formData = new FormData();
   formData.append('audio', audioFile);
   formData.append('requestedFormat', 'text');  // or 'audio', 'video'
   formData.append('language', 'en');
   
   POST /api/v1/chat/sessions/session1/messages
   Body: formData
   ```

3. **Backend Processing**
   - Backend receives audio file
   - Backend transcribes audio using OpenAI Whisper
   - Backend processes transcribed text via RAG
   - Backend creates user message (with transcribed text)
   - Backend creates assistant message

4. **API Response**
   - Same structure as text message response
   - User message includes transcribed text

5. **Update UI**
   - Display user message with transcribed text
   - Display assistant response
   - Show audio player if audio response requested

6. **WebSocket Updates**
   - If media generation requested, WebSocket will notify when ready

**Frontend Implementation Notes**:
- Validate audio file size (max 25MB)
- Show transcription progress indicator
- Handle transcription errors gracefully
- Display transcribed text in user message bubble
- Support audio playback for audio responses

---

### Scenario 5: Switching Between Sessions

**Situation**: User switches from one chat session to another.

**Step-by-Step Flow**:

1. **User Selects Different Session**
   - User clicks on another session in sidebar
   - Frontend receives session selection event

2. **Unsubscribe from Current Session**
   ```javascript
   socket.emit('chat:unsubscribe', currentSessionId);
   ```

3. **Load Messages for New Session**
   ```
   GET /api/v1/chat/sessions/newSessionId/messages?page=1&limit=50
   ```
   - Response: Messages for the new session

4. **Subscribe to New Session**
   ```javascript
   socket.emit('chat:subscribe', newSessionId);
   ```

5. **Display Messages**
   - Clear previous session messages from UI
   - Render messages for new session
   - Update current session state

**Frontend Implementation Notes**:
- Always unsubscribe before switching
- Show loading state while loading new session messages
- Preserve scroll position if user returns to previous session
- Update URL/history if using routing

---

### Scenario 6: Real-time Updates (WebSocket)

**Situation**: User receives real-time updates via WebSocket for messages and media.

**Step-by-Step Flow**:

1. **User Sends Message**
   - User sends message requesting audio response
   - API returns response with audio variant `status: 'pending'`

2. **Backend Emits New Message Event**
   ```javascript
   // Backend emits
   socket.to(`chat:${sessionId}`).emit('chat:message', {
     sessionId: 'session1',
     type: 'new',
     message: { ... }
   });
   ```

3. **Frontend Receives and Displays**
   ```javascript
   socket.on('chat:message', (data) => {
     if (data.type === 'new') {
       addMessage(data.message);
     }
   });
   ```
   - Message displayed with loading indicator for pending media

4. **Backend Queues Media Generation**
   - Background worker processes audio generation
   - Media file is generated and uploaded to S3
   - Media asset is created in database

5. **Backend Emits Update Event**
   ```javascript
   // Backend emits update when media ready
   socket.to(`chat:${sessionId}`).emit('chat:message', {
     sessionId: 'session1',
     type: 'update',
     message: {
       ...previousMessage,
       variants: [
         { type: 'text', text: '...', status: 'ready' },
         { type: 'audio', mediaId: 'media123', status: 'ready' }
       ]
     }
   });
   ```

6. **Frontend Updates Message**
   ```javascript
   socket.on('chat:message', (data) => {
     if (data.type === 'update') {
       updateMessage(data.message);
       // Show audio player now that media is ready
     }
   });
   ```
   - Replace loading indicator with media player
   - Enable playback

**Frontend Implementation Notes**:
- Check `sessionId` matches current session before processing
- Avoid duplicate messages (check if message already exists by `_id`)
- Extract display text from variants array
- Handle both 'new' and 'update' event types
- Update UI immediately for better UX

---

## Data Models

### ChatSession

**Interface**:
```typescript
interface ChatSession {
  _id: string;                    // MongoDB ObjectId
  userId: string;                 // User ID (ObjectId)
  title?: string;                 // Optional session title
  status: 'active' | 'archived'; // Session status
  lastMessageAt?: Date | null;   // Timestamp of last message
  metadata?: Record<string, any>; // Additional metadata
  liveAvatarSessionId?: string;  // LiveAvatar session ID (if used)
  liveAvatarSessionToken?: string; // LiveAvatar token
  liveAvatarMode?: 'FULL' | 'CUSTOM'; // LiveAvatar mode
  heygenStreamingSessionId?: string; // HeyGen streaming session ID
  heygenStreamingQuality?: string;   // HeyGen quality setting
  heygenStreamingAvatarId?: string;  // HeyGen avatar ID
  createdAt: Date;                // Creation timestamp
  updatedAt: Date;                // Last update timestamp
}
```

**Example**:
```json
{
  "_id": "65f4a3b1234567890abcdef1",
  "userId": "user123",
  "title": "Chat about Happy Dog",
  "status": "active",
  "lastMessageAt": "2024-01-15T10:35:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

---

### ChatMessage

**Interface**:
```typescript
interface ChatMessage {
  _id: string;                    // MongoDB ObjectId
  sessionId: string;              // Session ID (ObjectId)
  senderType: 'user' | 'assistant' | 'system'; // Message sender
  text?: string;                  // Legacy text field (use variants for new messages)
  requestedFormat: 'text' | 'audio' | 'video'; // Requested response format
  variants: Array<{               // Message variants (text, audio, video)
    type: 'text' | 'audio' | 'video' | 'image';
    text?: string;                // Text content (for text variant)
    mediaId?: string;             // Media asset ID (for audio/video/image)
    provider?: string;            // Media provider (e.g., 'heygen', 'openai')
    status: 'pending' | 'ready' | 'failed'; // Variant status
    language?: string;             // Language code
  }>;
  retrievals?: Array<{            // RAG retrieval information
    chunkId: string;              // Retrieved chunk ID
    sourceDocumentId?: string;    // Source document ID
    score?: number;               // Relevance score
    textPreview?: string;        // Preview of retrieved text
  }>;
  aiMetadata?: {                  // AI processing metadata
    model?: string;               // AI model used
    promptTokens?: number;       // Token usage
    completionTokens?: number;
    raw?: any;                    // Raw AI response
  };
  status: 'pending' | 'complete'; // Message processing status
  replyToMessageId?: string;     // ID of message being replied to
  sequenceNumber?: number;        // Message sequence number
  hasAssets?: boolean;            // Whether message has assets
  assetCount?: number;            // Number of assets
  metadata?: Record<string, any>; // Additional metadata
  createdAt: Date;                // Creation timestamp
  updatedAt: Date;                // Last update timestamp
}
```

**Example**:
```json
{
  "_id": "msg126",
  "sessionId": "65f4a3b1234567890abcdef1",
  "senderType": "assistant",
  "text": "Happy Dog Super Premium offers...",
  "requestedFormat": "text",
  "variants": [
    {
      "type": "text",
      "text": "Happy Dog Super Premium offers several benefits including high-quality ingredients...",
      "status": "ready"
    },
    {
      "type": "audio",
      "mediaId": "media456",
      "provider": "openai",
      "status": "ready",
      "language": "en"
    }
  ],
  "retrievals": [
    {
      "chunkId": "chunk123",
      "sourceDocumentId": "doc456",
      "score": 0.95,
      "textPreview": "Happy Dog Super Premium contains..."
    }
  ],
  "aiMetadata": {
    "model": "gpt-4",
    "promptTokens": 150,
    "completionTokens": 200
  },
  "status": "complete",
  "hasAssets": true,
  "assetCount": 1,
  "createdAt": "2024-01-15T10:35:05.000Z",
  "updatedAt": "2024-01-15T10:35:10.000Z"
}
```

**Display Text Extraction**:
```javascript
// Extract display text from variants
const textVariant = message.variants.find(v => v.type === 'text');
const displayText = textVariant?.text || message.text || '';
```

---

### FileRecommendation

**Interface**:
```typescript
interface FileRecommendation {
  fileName: string;      // Name of recommended file
  url: string;           // Presigned URL for download
  documentId: string;    // Source document ID
  score?: number;        // Relevance score (0-1)
}
```

**Example**:
```json
{
  "fileName": "Happy_Dog_Super_Premium_Guide.pdf",
  "url": "https://s3.amazonaws.com/bucket/file.pdf?signature=...",
  "documentId": "doc456",
  "score": 0.95
}
```

---

### WebSocket Event Payloads

#### `chat:message` Event

**New Message**:
```typescript
{
  sessionId: string,
  type: 'new',
  message: ChatMessage
}
```

**Update Message**:
```typescript
{
  sessionId: string,
  type: 'update',
  message: ChatMessage  // Updated message with new variants/assets
}
```

#### `chat:typing` Event

```typescript
{
  sessionId: string,
  userId: string,
  isTyping: boolean
}
```

#### `chat:asset-update` Event

```typescript
{
  sessionId: string,
  messageId: string,
  asset: {
    _id: string,
    type: 'audio' | 'video' | 'image',
    status: 'pending' | 'ready' | 'failed',
    mediaId?: string,
    url?: string
  }
}
```

---

## Error Handling & Edge Cases

### Network Failures and Retries

**Strategy**:
- Retry failed requests up to 3 times
- Exponential backoff: 1s, 2s, 4s delays
- Only retry on retryable errors (network, 5xx, timeout)

**Implementation**:
```javascript
async function retryRequest(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts || !isRetryableError(error)) {
        throw error;
      }
      await delay(Math.pow(2, attempt - 1) * 1000);
    }
  }
}
```

**When to Retry**:
- Network errors (connection refused, timeout)
- 5xx server errors
- Rate limit errors (429) - with longer delay

**When NOT to Retry**:
- 4xx client errors (400, 401, 403, 404)
- Validation errors
- Authentication failures

---

### Invalid Session IDs

**Validation**:
- Session ID must be valid MongoDB ObjectId (24 hex characters)
- Reject temporary IDs (starting with 'temp-')
- Reject IDs shorter than 24 characters

**Handling**:
```javascript
function isValidSessionId(sessionId: string): boolean {
  return sessionId && 
         !sessionId.startsWith('temp-') && 
         sessionId.length >= 24 &&
         /^[0-9a-fA-F]{24}$/.test(sessionId);
}
```

**Edge Cases**:
- Don't load messages for invalid session IDs
- Don't connect WebSocket for invalid session IDs
- Show error message if user tries to use invalid session

---

### WebSocket Reconnection

**Automatic Reconnection**:
- Socket.IO automatically reconnects (5 attempts, 1s delay)
- On reconnection, resubscribe to current session

**Implementation**:
```javascript
socket.on('connect', () => {
  // Resubscribe on reconnection
  if (currentSessionId && isValidSessionId(currentSessionId)) {
    socket.emit('chat:subscribe', currentSessionId);
  }
});
```

**Handling Missed Messages**:
- On reconnection, may need to reload messages to catch missed updates
- Or implement message sync mechanism

**Connection States**:
- `connecting`: Initial connection attempt
- `connected`: Successfully connected
- `disconnected`: Connection lost
- `reconnecting`: Attempting to reconnect

---

### Media Generation Failures

**Status Handling**:
- Variants can have status: `'pending'`, `'ready'`, or `'failed'`
- Check variant status before displaying media player

**Error Display**:
```javascript
const audioVariant = message.variants.find(v => v.type === 'audio');
if (audioVariant?.status === 'failed') {
  // Show error message instead of player
  displayError('Audio generation failed. Please try again.');
}
```

**Retry Strategy**:
- User can resend message to retry media generation
- Or implement explicit retry endpoint (if available)

---

### Rate Limiting

**Chat Rate Limits**:
- Message sending is rate-limited via `chatRateLimit` middleware
- Prevents abuse and ensures fair usage

**Handling Rate Limits**:
- If rate limited (429), show user-friendly message
- Implement exponential backoff for retries
- Disable send button temporarily

**User Feedback**:
```javascript
if (error.status === 429) {
  showError('Too many messages. Please wait a moment before sending again.');
  disableSendButton(temporarily);
}
```

---

### Optimistic Updates

**Strategy**:
- Update UI immediately for better UX
- Revert changes if API call fails

**Implementation**:
```javascript
// Optimistic update
const tempMessage = { _id: `temp-${Date.now()}`, text: userInput, ... };
setMessages(prev => [...prev, tempMessage]);

try {
  const response = await sendMessage(userInput);
  // Replace temp message with real message
  setMessages(prev => prev.map(m => 
    m._id === tempMessage._id ? response.userMessage : m
  ));
} catch (error) {
  // Revert optimistic update
  setMessages(prev => prev.filter(m => m._id !== tempMessage._id));
  showError('Failed to send message');
}
```

**When to Use**:
- Creating sessions
- Sending messages
- Updating session titles
- Deleting sessions

---

### Session Not Found

**Handling**:
- If session not found (404), remove from local state
- Switch to another session or create new one
- Show error message to user

**Implementation**:
```javascript
try {
  await loadMessages(sessionId);
} catch (error) {
  if (error.status === 404) {
    // Session not found
    removeSession(sessionId);
    if (currentSessionId === sessionId) {
      // Switch to another session or create new
      const otherSessions = sessions.filter(s => s._id !== sessionId);
      if (otherSessions.length > 0) {
        setCurrentSession(otherSessions[0]);
      } else {
        createNewSession();
      }
    }
  }
}
```

---

### Audio File Validation

**Validation Rules**:
- Max file size: 25MB
- Supported formats: mp3, wav, webm, m4a, ogg
- MIME type validation

**Implementation**:
```javascript
function validateAudioFile(file: File): boolean {
  const maxSize = 25 * 1024 * 1024; // 25MB
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm', 'audio/m4a', 'audio/ogg'];
  
  if (file.size > maxSize) {
    showError('Audio file too large. Maximum size is 25MB.');
    return false;
  }
  
  if (!allowedTypes.includes(file.type) && !file.type.startsWith('audio/')) {
    showError('Unsupported audio format. Please use MP3, WAV, WebM, M4A, or OGG.');
    return false;
  }
  
  return true;
}
```

---

## Platform-Specific Notes

### Web Implementation

**Common Endpoints Usage**:
- Use `/api/v1/chat` endpoints for full control
- Explicit session management
- Full WebSocket integration
- Support for all formats (text, audio, video)

**Key Features**:
- Session sidebar with list of all sessions
- Full message history with pagination
- Real-time updates via WebSocket
- Media players for audio/video
- File recommendations display

**Frontend Hooks** (React):
- `useChatSessions`: Session management
- `useChatMessages`: Message management
- `useChatRealtime`: WebSocket integration
- `useChatStreaming`: Streaming support (if applicable)

**Example Usage**:
```javascript
const { sessions, currentSession, createSession } = useChatSessions();
const { messages, sendMessage, loadMessages } = useChatMessages(currentSession?._id);
useChatRealtime({
  sessionId: currentSession?._id,
  onNewMessage: (msg) => addMessage(msg),
  onMessageUpdate: (msg) => updateMessage(msg),
});
```

---

### Mobile Implementation

**Common Endpoints Usage**:
- Use `/api/v1/chat` endpoints (same as web)
- Full session and message management
- WebSocket real-time updates
- Support for all formats (text, audio, video)

**Key Features**:
- Same API endpoints as web platform
- Full session management capabilities
- Real-time updates via WebSocket
- Media players for audio/video
- Complete chat functionality

**Example Usage**:
```javascript
// Mobile text chat - using common endpoint
const response = await fetch('/api/v1/chat/sessions/sessionId/messages', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Hello',
    requestedFormat: 'text',
    language: 'en'
  })
});

// Mobile voice chat - using common endpoint with audio file
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('requestedFormat', 'text');
formData.append('language', 'en');

const response = await fetch('/api/v1/chat/sessions/sessionId/messages', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

**Mobile Considerations**:
- Handle network connectivity changes
- Optimize for smaller screens
- Support offline mode (if implemented)
- Handle app backgrounding/foregrounding
- Manage audio recording permissions
- Implement proper session management (create/get sessions as needed)
- Handle WebSocket reconnection on network changes

---

## Summary

This documentation provides a comprehensive guide to implementing chat functionality for both web and mobile platforms. Key takeaways:

1. **Common endpoints** (`/api/v1/chat`) are used for both web and mobile platforms, providing full control and consistency
2. **WebSocket** enables real-time updates for messages and media generation
3. **Flow scenarios** cover all common use cases from first-time users to session switching
4. **Error handling** ensures robust implementation with retries and graceful degradation
5. **Data models** define the structure of all requests and responses

For implementation, follow the flow scenarios step-by-step, handle edge cases appropriately, and use the common endpoints (`/api/v1/chat`) for all chat operations regardless of platform.

