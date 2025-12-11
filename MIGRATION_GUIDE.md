# Migration Guide - Upgrading to Optimized Components

This guide will help you migrate existing code to use the new optimized components.

## 🎯 What to Migrate

1. **Image tags** → `OptimizedImage`
2. **Background images** → `OptimizedBackgroundImage`
3. **Navigation links** (optional) → `PrefetchLink`
4. **Heavy components** (optional) → `LazyLoadWrapper`

## 📋 Step-by-Step Migration

### Step 1: Find All Images

Search your codebase for:
- `<img`
- `backgroundImage`
- `background-image`

### Step 2: Replace Image Tags

#### Pattern 1: Simple Image
```tsx
// Before
<img src="/assets/dog.jpg" alt="Dog" className="w-full" />

// After
import { OptimizedImage } from '@/components/optimized'

<OptimizedImage 
  src="/assets/dog.jpg" 
  alt="Dog" 
  className="w-full"
  lazy={true}
/>
```

#### Pattern 2: Image with Error Handling
```tsx
// Before
<img 
  src="/assets/dog.jpg" 
  alt="Dog"
  onError={(e) => e.currentTarget.src = '/fallback.jpg'}
/>

// After
<OptimizedImage 
  src="/assets/dog.jpg" 
  alt="Dog"
  errorFallback="/fallback.jpg"
  lazy={true}
/>
```

#### Pattern 3: Image with Loading State
```tsx
// Before
const [loading, setLoading] = useState(true)

<img 
  src="/assets/dog.jpg" 
  alt="Dog"
  onLoad={() => setLoading(false)}
  className={loading ? 'opacity-50' : 'opacity-100'}
/>

// After
<OptimizedImage 
  src="/assets/dog.jpg" 
  alt="Dog"
  onLoad={() => console.log('Loaded')}
  lazy={true}
/>
```

### Step 3: Replace Background Images

#### Pattern 1: Inline Style Background
```tsx
// Before
<div 
  style={{ 
    backgroundImage: 'url(/assets/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
  className="min-h-screen"
>
  <YourContent />
</div>

// After
import { OptimizedBackgroundImage } from '@/components/optimized'

<OptimizedBackgroundImage 
  src="/assets/hero-bg.jpg"
  className="min-h-screen"
  lazy={true}
>
  <YourContent />
</OptimizedBackgroundImage>
```

#### Pattern 2: CSS Background with bg- classes
```tsx
// Before
<div className="bg-[url('/assets/bg.jpg')] bg-cover bg-center min-h-screen">
  <YourContent />
</div>

// After
<OptimizedBackgroundImage 
  src="/assets/bg.jpg"
  className="min-h-screen"
  lazy={true}
>
  <YourContent />
</OptimizedBackgroundImage>
```

### Step 4: Update Navigation Links (Optional)

Only update important navigation links (main menu, CTAs):

```tsx
// Before
import { Link } from 'react-router-dom'

<Link to="/about" className="nav-link">
  About Us
</Link>

// After
import { PrefetchLink } from '@/components/optimized'

<PrefetchLink to="/about" prefetch={true} className="nav-link">
  About Us
</PrefetchLink>
```

## 🔍 Priority Files to Update

### High Priority (User-facing pages)
1. `src/pages/HomePage.tsx`
2. `src/pages/AboutUsPage.tsx`
3. `src/pages/about/*.tsx`
4. `src/components/Header.tsx`
5. `src/components/Header2.tsx`

### Medium Priority
6. `src/pages/ProfilePage.tsx`
7. `src/pages/KnowledgeHubPage.tsx`
8. `src/pages/LearningModePage.tsx`

### Low Priority
- Other pages with fewer images
- Internal components

## 🛠️ Automated Search & Replace

### VS Code Search Patterns

#### Find Simple Images
**Find:** `<img\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']`
**Replace:** `<OptimizedImage src="$1" alt="$2" lazy={true}`

#### Find Images with ClassName
**Find:** `<img\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']\s+className=["']([^"']+)["']`
**Replace:** `<OptimizedImage src="$1" alt="$2" className="$3" lazy={true}`

> ⚠️ **Warning:** Always review automated replacements!

## 📝 Component-Specific Migrations

### HomePage.tsx
```tsx
// Add import
import { OptimizedImage, OptimizedBackgroundImage } from '@/components/optimized'

// Replace hero background
<OptimizedBackgroundImage 
  src="/assets/images/hero-bg.jpg"
  className="min-h-screen"
>
  {/* Hero content */}
</OptimizedBackgroundImage>

// Replace feature images
<OptimizedImage 
  src="/assets/images/feature.jpg"
  alt="Feature"
  className="w-full h-auto rounded-lg"
  lazy={true}
/>
```

### Header.tsx / Header2.tsx
```tsx
// Logo image
<OptimizedImage 
  src="/assets/images/logo.png"
  alt="Happy Pet"
  className="h-12 w-auto"
  lazy={false} // Don't lazy load above-the-fold content
/>

// User avatar
<OptimizedImage 
  src={user.avatar || '/assets/images/default-avatar.png'}
  alt={user.name}
  className="w-10 h-10 rounded-full"
  errorFallback="/assets/images/default-avatar.png"
  lazy={false}
/>
```

### About Pages
```tsx
// Timeline images, team photos, etc.
<OptimizedImage 
  src="/assets/images/team-photo.jpg"
  alt="Our Team"
  className="w-full h-auto"
  lazy={true}
/>
```

## ⚠️ Important Notes

### Don't Lazy Load Above-the-Fold Content
```tsx
// ❌ Don't lazy load hero images
<OptimizedImage 
  src="/hero.jpg"
  alt="Hero"
  lazy={false} // Critical content
/>

// ✅ Lazy load below-the-fold images
<OptimizedImage 
  src="/feature.jpg"
  alt="Feature"
  lazy={true} // Not immediately visible
/>
```

### Keep Original Images as Fallback
```tsx
<OptimizedImage 
  src="/assets/dog.jpg"
  alt="Dog"
  errorFallback="/assets/placeholder.jpg" // Always provide fallback
  lazy={true}
/>
```

### Test After Each Migration
1. Check page loads correctly
2. Verify images display properly
3. Test on slow network (DevTools → Network → Slow 3G)
4. Check browser console for errors

## 🧪 Testing Checklist

After migration, test:

- [ ] All images load correctly
- [ ] Background images display properly
- [ ] Lazy loading works (check Network tab)
- [ ] Error fallbacks work
- [ ] Loading states are smooth
- [ ] No console errors
- [ ] Performance improved (Lighthouse)
- [ ] Works on slow connections
- [ ] Mobile responsive
- [ ] Accessibility maintained

## 📊 Expected Results

### Before Migration
- Initial bundle: ~396 KB
- All images load immediately
- Slow initial page load

### After Migration
- Initial bundle: ~140 KB
- Images load on-demand
- Fast initial page load
- Smooth scrolling experience

## 🚨 Common Issues

### Issue 1: Images Not Loading
**Problem:** Image path incorrect
**Solution:** Check if path starts with `/` for absolute paths

### Issue 2: Images Load Late
**Problem:** `threshold` too high or `rootMargin` too small
**Solution:** Increase `rootMargin` to "100px" or reduce `threshold` to 0.05

### Issue 3: Background Image Flickers
**Problem:** No placeholder provided
**Solution:** Add placeholder gradient:
```tsx
<OptimizedBackgroundImage 
  src="/bg.jpg"
  placeholder="linear-gradient(to bottom, #e5e7eb, #f3f4f6)"
/>
```

### Issue 4: Performance Not Improved
**Problem:** Too many images loaded at once
**Solution:** Ensure `lazy={true}` and proper `rootMargin`

## 🎯 Migration Progress Tracking

Use this checklist to track your progress:

### Core Components
- [ ] HomePage.tsx
- [ ] AboutUsPage.tsx
- [ ] Header.tsx
- [ ] Header2.tsx
- [ ] Footer.tsx

### About Subdirectory
- [ ] SocialCommitment.tsx
- [ ] BrandHistory.tsx
- [ ] NutritionalConcept.tsx
- [ ] ManufacturingProcess.tsx

### Protected Pages
- [ ] ProfilePage.tsx
- [ ] KnowledgeHubPage.tsx
- [ ] LearningModePage.tsx
- [ ] AiAgentPage.tsx

### Other Pages
- [ ] ContactUsPage.tsx
- [ ] FAQPage.tsx
- [ ] LoginPage.tsx
- [ ] SignupPage.tsx

## 🔄 Rollback Plan

If you need to rollback:

1. Git checkout previous version:
```bash
git checkout HEAD~1 -- src/pages/[file].tsx
```

2. Remove imports:
```tsx
// Remove this
import { OptimizedImage } from '@/components/optimized'
```

3. Revert to standard `<img>` tags

## 📞 Need Help?

If you encounter issues:
1. Check `OPTIMIZATION.md` for detailed docs
2. Check `QUICK_REFERENCE.md` for quick examples
3. Review this migration guide
4. Check console for error messages
5. Test with `npm run build` before deploying

---

**Happy Optimizing! 🚀**
