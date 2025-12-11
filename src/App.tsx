import { Suspense } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { Header2 } from './components/Header2.tsx'
import { Footer } from './components/Footer.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { Toaster } from './components/ui/toaster'
import { routes } from './routes'

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-[#003863] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#003863] font-semibold text-lg">Loading...</p>
    </div>
  </div>
)

function HeaderWrapper() {
  const location = useLocation()
  return location.pathname === '/' ? <Header /> : <Header2 />
}

function AppRoutes() {
  const element = useRoutes(routes)
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderWrapper />
      <AppRoutes />
      <Footer />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
