# Quick Reference Guide - Production Optimizations

## 🚀 Quick Start

### Import Optimized Components
```tsx
// Image optimization
import { OptimizedImage, OptimizedBackgroundImage } from '@/components/optimized'

// Link prefetching
import { PrefetchLink } from '@/components/optimized'

// Lazy loading
import { LazyLoadWrapper, withLazyLoad } from '@/components/optimized'

// Performance utilities
import { 
  preloadImage, 
  preloadImages, 
  cacheAPIResponse, 
  getCachedAPIResponse,
  debounce,
  throttle 
} from '@/utils/preload'
```

## 📸 Optimized Images

### Basic Usage
```tsx
<OptimizedImage 
  src="/path/to/image.jpg"
  alt="Description"
  className="w-full h-auto"
/>
```

### With Custom Options
```tsx
<OptimizedImage 
  src="/path/to/image.jpg"
  alt="Description"
  lazy={true}
  threshold={0.1}
  rootMargin="50px"
  placeholder="data:image/..."
  errorFallback="/fallback.jpg"
  onLoad={() => console.log('Loaded')}
  onError={() => console.log('Error')}
  className="w-full"
/>
```

### Background Image
```tsx
<OptimizedBackgroundImage 
  src="/path/to/bg.jpg"
  className="min-h-screen"
  lazy={true}
>
  <YourContent />
</OptimizedBackgroundImage>
```

## 🔗 Prefetch Links

```tsx
<PrefetchLink 
  to="/about" 
  prefetch={true}
  className="nav-link"
>
  About Us
</PrefetchLink>
```

## ⏱️ Performance Utilities

### Image Preloading
```tsx
// Single image
await preloadImage('/hero-image.jpg')

// Multiple images
await preloadImages([
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg'
])
```

### API Response Caching
```tsx
// Cache response (5 minutes TTL)
cacheAPIResponse('user-profile', userData, 300000)

// Get cached response
const cached = getCachedAPIResponse('user-profile')
if (cached) {
  return cached
}

// Clear expired cache
clearExpiredCache()
```

### Debounce & Throttle
```tsx
// Debounce search
const debouncedSearch = debounce((query: string) => {
  searchAPI(query)
}, 300)

// Throttle scroll handler
const throttledScroll = throttle(() => {
  updateScrollPosition()
}, 100)
```

## 🎨 Lazy Loading Components

### Wrapper Method
```tsx
import { LazyLoadWrapper } from '@/components/optimized'

function MyComponent() {
  return (
    <LazyLoadWrapper>
      <HeavyComponent />
    </LazyLoadWrapper>
  )
}
```

### HOC Method
```tsx
import { withLazyLoad } from '@/components/optimized'

const OptimizedHeavyComponent = withLazyLoad(HeavyComponent)

function MyComponent() {
  return <OptimizedHeavyComponent />
}
```

## 🗂️ Route Structure

### Public Routes
Located in: `src/routes/publicRoutes.tsx`
- Home, Login, Signup, About, Contact, FAQs, etc.

### Protected Routes  
Located in: `src/routes/protectedRoutes.tsx`
- Profile, Knowledge Hub, Learning Module, AI Agent, etc.

### Main Route Config
Located in: `src/routes/index.tsx`
- Combines public and protected routes
- Adds 404 redirect

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## 📊 Bundle Analysis

### Current Chunk Sizes (Gzipped)
- **Main**: 20.96 KB
- **React Vendor**: 52.07 KB
- **UI Vendor**: 34.10 KB
- **Form Vendor**: 20.20 KB
- **Query Vendor**: 10.52 KB
- **Pages (lazy loaded)**:
  - Public: 144.83 KB
  - Protected: 76.96 KB
  - Learning: 7.35 KB
  - Individual pages: 1-5 KB each

### Total Initial Load
**~140 KB** (gzipped) - 65% reduction from original!

## 🎯 Common Patterns

### Replace Standard Image
```tsx
// ❌ Before
<img src="/image.jpg" alt="Image" className="w-full" />

// ✅ After
<OptimizedImage 
  src="/image.jpg" 
  alt="Image" 
  className="w-full"
  lazy={true}
/>
```

### Replace Background Div
```tsx
// ❌ Before
<div 
  style={{ backgroundImage: 'url(/bg.jpg)' }}
  className="min-h-screen"
>
  Content
</div>

// ✅ After
<OptimizedBackgroundImage 
  src="/bg.jpg"
  className="min-h-screen"
>
  Content
</OptimizedBackgroundImage>
```

### Replace Standard Link
```tsx
// ❌ Before
<Link to="/page">Link</Link>

// ✅ After (for important navigation)
<PrefetchLink to="/page" prefetch={true}>
  Link
</PrefetchLink>
```

## 🚨 Troubleshooting

### Images not loading?
1. Check console for errors
2. Verify image path is correct
3. Check network tab in DevTools
4. Adjust `threshold` and `rootMargin` if needed

### Slow page transitions?
1. Verify lazy loading is enabled
2. Check chunk loading in network tab
3. Enable prefetching on links

### Large bundle size?
1. Run `npm run build` and check output
2. Look for duplicate dependencies
3. Check if chunks are being split correctly

## 📚 Additional Resources

- Full Documentation: `OPTIMIZATION.md`
- Summary: `OPTIMIZATION_SUMMARY.md`
- Main README: `README.md`

## ✅ Best Practices

1. ✅ Use `OptimizedImage` for all images
2. ✅ Enable lazy loading by default
3. ✅ Use `PrefetchLink` for important navigation
4. ✅ Cache API responses when appropriate
5. ✅ Debounce user inputs
6. ✅ Throttle scroll/resize handlers
7. ✅ Preload critical resources
8. ✅ Monitor bundle size regularly
9. ✅ Test production build before deploying
10. ✅ Use React DevTools Profiler to find bottlenecks

---

**Need help?** Check the full documentation in `OPTIMIZATION.md`
