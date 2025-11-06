# Quick Start Guide

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root:
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

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/              # Axios + React Query hooks
│   ├── axios.ts      # Axios client with interceptors
│   └── user.ts       # Example API hooks (useUserQuery)
├── store/            # Zustand stores
│   └── useAuthStore.ts
├── components/       # UI components
│   ├── ui/          # shadcn/ui components
│   ├── ErrorFallback.tsx
│   ├── ExampleForm.tsx
│   └── Layout.tsx
├── hooks/            # Custom hooks
│   └── useSocket.ts  # Socket.IO hook
├── pages/            # Route pages
│   └── HomePage.tsx
├── utils/            # Utilities
│   ├── cn.ts        # className utility
│   └── constants.ts
├── styles/           # Global styles
│   └── globals.css
└── types/            # TypeScript types
    └── index.ts
```

## 🔑 Key Features Implemented

### ✅ State Management
- **Zustand**: `useAuthStore` with persistence
- **React Query**: Server state with caching

### ✅ API Integration
- Axios client with JWT interceptors
- Automatic token injection
- 401 error handling

### ✅ Real-time
- Socket.IO client hook (`useSocket`)
- Auto-reconnection
- Token-based auth

### ✅ Forms
- React Hook Form + Zod validation
- Example form component

### ✅ Error Handling
- React Error Boundary
- Error fallback UI

### ✅ Code Quality
- ESLint + Prettier configured
- Husky pre-commit hooks
- lint-staged for staged files

## 🎯 Next Steps

1. **Customize your API endpoints** in `src/api/`
2. **Add more Zustand stores** in `src/store/`
3. **Create additional pages** in `src/pages/`
4. **Add more shadcn/ui components** as needed
5. **Customize Tailwind theme** in `tailwind.config.js`

## 📚 Documentation

- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🐛 Troubleshooting

**TypeScript errors on first run?**
- Run `npm install` first - dependencies need to be installed

**Husky not working?**
- Make sure you've run `npm run prepare`
- Check that `.husky/pre-commit` is executable

**Socket connection issues?**
- Verify your `VITE_SOCKET_URL` in `.env`
- Check that your backend server is running

**Styling not working?**
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in `main.tsx`

