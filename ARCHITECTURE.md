# Learning Module & Knowledge Hub - Component Architecture

## Component Breakdown

### Shared Components (`src/components/learning/`)

#### 1. **PageHeader** (`PageHeader.tsx`)
- **Purpose**: Reusable page header with title and search functionality
- **Props**:
  - `title`: Page title
  - `searchQuery`: Current search input value
  - `searchPlaceholder`: Placeholder text for search input
  - `onSearchChange`: Handler for input changes
  - `onSearchSubmit`: Handler for search submission (button/Enter key)
- **Optimizations**: 
  - Memoized with `React.memo`
  - Internal key press handler
  - Autocomplete disabled for performance

#### 2. **CategorySidebar** (`CategorySidebar.tsx`)
- **Purpose**: Reusable category navigation sidebar
- **Props**:
  - `title`: Sidebar title
  - `categories`: Array of category objects
  - `selectedCategory`: Currently selected category ID
  - `onCategoryClick`: Handler for category selection
- **Optimizations**:
  - Memoized with `React.memo`
  - Internal `useCallback` for click handler
  - Sticky positioning for better UX

#### 3. **DocumentsGrid** (`DocumentsGrid.tsx`)
- **Purpose**: Grid display for learning module documents
- **Props**:
  - `modules`: Array of document/module objects
  - `handleView`: Handler for viewing a document
  - `handleDownload`: Handler for downloading a document
- **Optimizations**:
  - Memoized with `React.memo`
  - Framer Motion animations with reduced delays (0.05s)
  - Optimized transition duration (0.3s)

#### 4. **VideosGrid** (`VideosGrid.tsx`)
- **Purpose**: Grid display for knowledge hub videos
- **Props**:
  - `videos`: Array of video objects
  - `navigate`: React Router navigate function
- **Optimizations**:
  - Memoized with `React.memo`
  - Framer Motion animations with reduced delays
  - Lazy loading with presigned URLs

#### 5. **Skeleton Loaders** (`SkeletonLoaders.tsx`)
- **PageSkeleton**: Full page skeleton for initial load
- **VideoGridSkeleton**: Skeleton for video grid (3 columns, 6 items)
- **DocumentGridSkeleton**: Skeleton for document grid (2 columns, 4 items)
- **Optimizations**:
  - All memoized with `React.memo`
  - Pulse animation
  - Accurate dimension matching to prevent layout shift

## Page Structure

### LearningModePage
```
LearningModePage
├── PageSkeleton (if loading)
└── motion.div
    ├── PageHeader
    └── Grid Container
        ├── CategorySidebar
        └── Content Area
            ├── DocumentGridSkeleton (if loading)
            ├── Empty State (if no results)
            └── DocumentsGrid (with data)
```

### KnowledgeHubPage
```
KnowledgeHubPage
├── PageSkeleton (if loading)
└── motion.div
    ├── Breadcrumb (conditional)
    ├── PageHeader
    └── Grid Container
        ├── CategorySidebar
        └── Content Area
            ├── VideoGridSkeleton (if loading)
            └── VideosGrid (with data)
```

## Performance Optimizations Applied

### 1. **Component Memoization**
- All shared components wrapped with `React.memo`
- Prevents re-renders when parent state changes
- Only re-renders when props actually change

### 2. **Handler Memoization**
- `handleCategoryClick` wrapped with `useMemo` in both pages
- Category sidebar click handlers optimized with `useCallback`
- Prevents function recreation on every render

### 3. **Categories Memoization**
- Categories array wrapped with `useMemo`
- Dependencies: `[categoriesResponse?.data, t]`
- Prevents recalculation on search term changes

### 4. **Animation Optimizations**
- Reduced animation duration: 0.5s → 0.3s
- Reduced Y-axis movement: 20px → 10px
- Reduced stagger delay: 0.1s → 0.05s per item
- Page fade-in: 0.5s → 0.3s

### 5. **Skeleton Loaders**
- Eliminates blank screens and spinners
- Provides immediate visual feedback
- Matches exact dimensions to prevent layout shift
- Separate skeletons for different content types

### 6. **Component Extraction Benefits**
- **Code reusability**: DRY principle across pages
- **Easier maintenance**: Single source of truth
- **Better testing**: Isolated component testing
- **Smaller bundle chunks**: Tree-shaking friendly
- **Clearer responsibility**: Single purpose components

## File Size Reduction

### Before:
- `LearningModePage.tsx`: ~420 lines
- `KnowledgeHubPage.tsx`: ~415 lines
- **Total**: ~835 lines

### After:
- `LearningModePage.tsx`: ~220 lines (-48%)
- `KnowledgeHubPage.tsx`: ~200 lines (-52%)
- Shared components: ~350 lines (reusable)
- **Total**: ~770 lines with better organization

## Import Structure

```typescript
// Pages now import from centralized barrel export
import {
  PageHeader,
  CategorySidebar,
  DocumentsGrid,  // or VideosGrid
  PageSkeleton,
  DocumentGridSkeleton,  // or VideoGridSkeleton
} from '@/components/learning'
```

## Future Enhancements

1. **Virtual Scrolling**: For large lists (100+ items)
2. **Lazy Loading**: Load more items on scroll
3. **Image Optimization**: Use next-gen formats, lazy load images
4. **Error Boundaries**: Wrap grid components
5. **Suspense Boundaries**: React 18 concurrent features
6. **Code Splitting**: Dynamic imports for heavy components
