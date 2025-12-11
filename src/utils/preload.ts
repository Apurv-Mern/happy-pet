// Preload critical resources for better performance

/**
 * Preload images that will be needed soon
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 */
export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage))
}

/**
 * Preload a component chunk
 */
export const preloadComponent = (importFn: () => Promise<any>): void => {
  importFn()
}

/**
 * Prefetch a route component when user hovers over a link
 */
export const prefetchRoute = (routePath: string) => {
  // This will be handled by the lazy loading mechanism
  // You can add additional prefetch logic here if needed
  console.log(`Prefetching route: ${routePath}`)
}

/**
 * Cache API responses using sessionStorage
 */
export const cacheAPIResponse = (
  key: string,
  data: any,
  ttl: number = 300000
) => {
  const item = {
    data,
    timestamp: Date.now(),
    ttl,
  }
  try {
    sessionStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.warn('Failed to cache response:', error)
  }
}

/**
 * Get cached API response
 */
export const getCachedAPIResponse = (key: string): any | null => {
  try {
    const cached = sessionStorage.getItem(key)
    if (!cached) return null

    const item = JSON.parse(cached)
    if (Date.now() - item.timestamp > item.ttl) {
      sessionStorage.removeItem(key)
      return null
    }

    return item.data
  } catch (error) {
    console.warn('Failed to get cached response:', error)
    return null
  }
}

/**
 * Clear expired cache entries
 */
export const clearExpiredCache = () => {
  try {
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      try {
        const item = JSON.parse(sessionStorage.getItem(key) || '')
        if (item.timestamp && item.ttl) {
          if (Date.now() - item.timestamp > item.ttl) {
            sessionStorage.removeItem(key)
          }
        }
      } catch {
        // Skip non-JSON items
      }
    })
  } catch (error) {
    console.warn('Failed to clear expired cache:', error)
  }
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
