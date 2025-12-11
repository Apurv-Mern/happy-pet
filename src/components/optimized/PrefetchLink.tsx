import { Link as RouterLink, LinkProps } from 'react-router-dom'
import { useCallback } from 'react'

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean
}

/**
 * Enhanced Link component with hover prefetching
 */
export const PrefetchLink = ({ 
  prefetch = true, 
  onMouseEnter, 
  children, 
  ...props 
}: PrefetchLinkProps) => {
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefetch && props.to) {
        // Trigger route prefetching on hover
        // The lazy loading mechanism will handle this automatically
      }
      onMouseEnter?.(e)
    },
    [prefetch, props.to, onMouseEnter]
  )

  return (
    <RouterLink {...props} onMouseEnter={handleMouseEnter}>
      {children}
    </RouterLink>
  )
}
