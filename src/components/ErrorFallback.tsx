import { ErrorBoundaryProps } from 'react-error-boundary'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export function ErrorFallback({ error, resetErrorBoundary }: ErrorBoundaryProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {import.meta.env.DEV && (
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
            </div>
          )}
          <Button onClick={resetErrorBoundary} className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

