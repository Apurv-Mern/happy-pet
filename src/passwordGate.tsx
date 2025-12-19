import { useState, useEffect } from 'react'

export function PasswordGate({ children }) {
  const [allowed, setAllowed] = useState(
    sessionStorage.getItem('allowed') === 'true'
  )
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (!allowed && !denied) {
      const pwd = prompt('Enter password:')
      const correctPassword =
        import.meta.env.VITE_ACCESS_PASSWORD || 'happy@123'

      if (pwd === correctPassword) {
        sessionStorage.setItem('allowed', 'true')
        setAllowed(true)
      } else if (pwd !== null) {
        // User entered wrong password (not cancelled)
        setDenied(true)
      } else {
        // User cancelled the prompt
        setDenied(true)
      }
    }
  }, [allowed, denied])

  if (denied) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#003863',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
            🔒 Access Denied
          </h1>
          <p style={{ fontSize: '20px' }}>
            Invalid password. Please refresh to try again.
          </p>
        </div>
      </div>
    )
  }

  if (!allowed) {
    return null
  }

  return children
}
