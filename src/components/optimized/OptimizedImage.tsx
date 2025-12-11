import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  placeholder?: string
  errorFallback?: string
  lazy?: boolean
  threshold?: number
  rootMargin?: string
  onLoad?: () => void
  onError?: () => void
}

export const OptimizedImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3C/svg%3E',
  errorFallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="Arial" font-size="16"%3EImage not available%3C/text%3E%3C/svg%3E',
  lazy = true,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // If lazy loading is disabled, load image immediately
    if (!lazy) {
      loadImage()
      return
    }

    // Set up Intersection Observer for lazy loading
    const options = {
      root: null,
      rootMargin,
      threshold,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          if (observerRef.current && imgRef.current) {
            observerRef.current.unobserve(imgRef.current)
          }
        }
      })
    }, options)

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [src, lazy, rootMargin, threshold])

  const loadImage = () => {
    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
      setHasError(false)
      onLoad?.()
    }

    img.onerror = () => {
      setImageSrc(errorFallback)
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }

    img.src = src
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-50' : 'opacity-100'
      } ${className}`}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  )
}

// Background Image Component with lazy loading
interface OptimizedBackgroundImageProps {
  src: string
  children?: React.ReactNode
  className?: string
  placeholder?: string
  lazy?: boolean
}

export const OptimizedBackgroundImage = ({
  src,
  children,
  className = '',
  placeholder = 'linear-gradient(to bottom, #e5e7eb, #f3f4f6)',
  lazy = true,
}: OptimizedBackgroundImageProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    lazy ? placeholder : `url(${src})`
  )
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lazy) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image()
            img.onload = () => {
              setBackgroundImage(`url(${src})`)
              setIsLoaded(true)
            }
            img.src = src
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '50px', threshold: 0.1 }
    )

    if (divRef.current) {
      observer.observe(divRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [src, lazy])

  return (
    <div
      ref={divRef}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-75'
      } ${className}`}
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  )
}
