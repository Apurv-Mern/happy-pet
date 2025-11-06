# Happy Pet - Production-Grade React App

A modern, production-ready React application built with Vite, TypeScript, and a comprehensive set of libraries for state management, API fetching, real-time features, and form handling.

## 🚀 Tech Stack

- **Vite** - Next-generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **React Hook Form** - Performant forms
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Animation library
- **React Error Boundary** - Error handling
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Git hooks

## 📁 Project Structure

```
src/
├── api/              # Axios + React Query API hooks
├── store/            # Zustand stores
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── hooks/            # Custom hooks (useSocket, etc.)
├── pages/            # Route pages
├── utils/            # Helpers, constants
├── styles/           # Tailwind config & globals
└── types/            # TypeScript interfaces
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_SOCKET_URL=http://localhost:3000
   ```

3. **Initialize Husky (for git hooks):**
   ```bash
   npm run prepare
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Key Features

### State Management
- **Zustand** for global client state (example: `useAuthStore`)
- **React Query** for server state with automatic caching and refetching

### API Integration
- Axios configured with JWT token interceptors
- Automatic token injection from localStorage
- 401 error handling with automatic logout

### Real-time Communication
- Socket.IO client hook (`useSocket`)
- Automatic reconnection
- Token-based authentication

### Form Handling
- React Hook Form for performant forms
- Zod schemas for type-safe validation
- Example form component included

### Error Handling
- React Error Boundary for graceful error handling
- Error fallback UI component
- Development error details

### Code Quality
- ESLint with TypeScript support
- Prettier for code formatting
- Husky pre-commit hooks
- lint-staged for staged file linting

## 📚 Examples

### Using Zustand Store
```typescript
import { useAuthStore } from '@/store/useAuthStore'

const { user, isAuthenticated, login, logout } = useAuthStore()
```

### Using React Query
```typescript
import { useUserQuery } from '@/api/user'

const { data, isLoading, error } = useUserQuery()
```

### Using Socket.IO
```typescript
import { useSocket } from '@/hooks/useSocket'

const { isConnected, emit, on, off } = useSocket({
  enabled: true,
  onConnect: () => console.log('Connected!'),
})
```

### Using React Hook Form + Zod
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
})
```

## 🎨 UI Components

The project uses shadcn/ui components which are highly customizable and accessible. Components are located in `src/components/ui/`.

## 🔐 Authentication

The app includes a sample authentication store that:
- Persists state to localStorage
- Manages JWT tokens
- Automatically injects tokens in API requests
- Handles token refresh and logout

## 📦 Build & Deploy

The app is optimized for production with:
- Code splitting
- Tree shaking
- Minification
- TypeScript type checking

## 🤝 Contributing

1. Make your changes
2. Run linting: `npm run lint`
3. Format code: `npm run format`
4. Commit (Husky will run pre-commit hooks automatically)

## 📄 License

MIT

