import { Suspense, ComponentType } from 'react'

interface LazyLoadWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Default loading fallback
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-[#003863] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#003863] font-semibold text-lg">Loading...</p>
    </div>
  </div>
)

export const LazyLoadWrapper = ({ 
  children, 
  fallback = <DefaultLoadingFallback /> 
}: LazyLoadWrapperProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

// HOC for lazy loading components
export const withLazyLoad = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <LazyLoadWrapper fallback={fallback}>
      <Component {...props} />
    </LazyLoadWrapper>
  )
}
