import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useUserQuery } from '@/api/user'
import { useSocket } from '@/hooks/useSocket'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExampleForm } from '@/components/ExampleForm'

export function DummyPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { data: userData, isLoading, error } = useUserQuery()
  const { isConnected, emit } = useSocket({
    enabled: isAuthenticated,
    onConnect: () => console.log('Socket connected!'),
  })

  const handleTestSocket = () => {
    emit('test-event', { message: 'Hello from client!' })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Happy Pet</h1>
        <p className="text-muted-foreground mt-2">
          Production-grade React app with Vite, TypeScript, and modern tooling
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Zustand Store</CardTitle>
              <CardDescription>Global state management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status:</p>
                <p className="font-semibold">
                  {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
                </p>
                {user && (
                  <p className="text-sm mt-2">
                    User: {user.name} ({user.email})
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>React Query</CardTitle>
              <CardDescription>Server state management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && <p className="text-sm">Loading user data...</p>}
              {error && (
                <p className="text-sm text-destructive">
                  Error: {error.message}
                </p>
              )}
              {userData && (
                <div>
                  <p className="text-sm text-muted-foreground">Fetched User:</p>
                  <p className="font-semibold">{userData.name}</p>
                  <p className="text-sm">{userData.email}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Socket.IO</CardTitle>
              <CardDescription>Real-time communication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Connection:</p>
                <p
                  className={`font-semibold ${
                    isConnected ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              {isAuthenticated && (
                <Button onClick={handleTestSocket} disabled={!isConnected}>
                  Test Socket Event
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Libraries & tools</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Vite + React + TypeScript</li>
                <li>✅ Zustand (State)</li>
                <li>✅ React Query + Axios</li>
                <li>✅ Socket.IO Client</li>
                <li>✅ React Hook Form + Zod</li>
                <li>✅ Tailwind CSS + shadcn/ui</li>
                <li>✅ Framer Motion</li>
                <li>✅ React Error Boundary</li>
                <li>✅ ESLint + Prettier + Husky</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ExampleForm />
      </motion.div>
    </div>
  )
}
