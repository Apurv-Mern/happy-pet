# DeepL Translation Integration

This document explains how to use DeepL API for translating dynamic content in the Happy Pet application.

## Setup

### 1. Get DeepL API Key

1. Sign up for a DeepL API account at https://www.deepl.com/pro-api
2. Choose the free or paid plan based on your needs
3. Copy your authentication key

### 2. Configure Environment Variables

Add your DeepL API key to your `.env` file:

```env
VITE_DEEPL_API_KEY=your-deepl-api-key-here
VITE_DEEPL_API_URL=https://api-free.deepl.com/v2/translate
```

**Note:** Use `https://api.deepl.com/v2/translate` for paid plans.

### 3. Install Dependencies (if needed)

The integration uses `axios` which is already in the project. No additional dependencies required.

## Usage

### Basic Translation Hooks

#### 1. `useTranslateDynamic` - Single Text Translation

```tsx
import { useTranslateDynamic } from '@/hooks/useTranslateDynamic'

function MyComponent() {
  const { data: translatedText, isLoading } = useTranslateDynamic(
    'Hello World'
  )
  
  return <div>{translatedText || 'Hello World'}</div>
}
```

#### 2. `useTranslateObject` - Object Field Translation

```tsx
import { useTranslateObject } from '@/hooks/useTranslateDynamic'

function VideoCard({ video }) {
  const { data: translatedVideo, isLoading } = useTranslateObject(
    video,
    ['title', 'description'] // Fields to translate
  )
  
  return (
    <div>
      <h3>{translatedVideo?.title}</h3>
      <p>{translatedVideo?.description}</p>
    </div>
  )
}
```

#### 3. `useTranslateObjects` - Array Translation (Batch)

```tsx
import { useTranslateObjects } from '@/hooks/useTranslateDynamic'

function VideoList({ videos }) {
  const { data: translatedVideos, isLoading } = useTranslateObjects(
    videos,
    ['title', 'description']
  )
  
  return (
    <div>
      {translatedVideos?.map(video => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## Real-World Examples

### Knowledge Hub Videos

```tsx
import { useLearningKnowledgeQuery } from '@/api/learningModule'
import { useTranslateObjects } from '@/hooks/useTranslateDynamic'

function KnowledgeHubPage() {
  const { data: learningData } = useLearningKnowledgeQuery({ 
    type: 'video',
    categoryId: 'DOG'
  })
  
  const { data: translatedVideos, isLoading: isTranslating } = useTranslateObjects(
    learningData?.data?.items,
    ['title', 'description']
  )

  return (
    <div className="grid grid-cols-3 gap-6">
      {translatedVideos?.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
```

### Learning Module Documents

```tsx
function LearningModulePage() {
  const { data: learningData } = useLearningKnowledgeQuery({ 
    type: 'document'
  })
  
  const { data: translatedDocs, isLoading } = useTranslateObjects(
    learningData?.data?.items,
    ['title', 'content', 'description']
  )

  return (
    <div>
      {translatedDocs?.map(doc => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  )
}
```

## Performance Considerations

### Caching

Translations are automatically cached for:
- **24 hours** (staleTime) - Data is considered fresh
- **7 days** (gcTime) - Data is kept in cache

### Batch Translation

Always prefer `useTranslateObjects` over multiple `useTranslateDynamic` calls:

```tsx
// ❌ Bad - Multiple API calls
videos.map(video => {
  const { data } = useTranslateDynamic(video.title)
  return <div>{data}</div>
})

// ✅ Good - Single batch API call
const { data: translatedVideos } = useTranslateObjects(videos, ['title'])
```

### Conditional Translation

Translation only happens when:
1. Target language is not English
2. Content exists
3. Component is enabled

```tsx
const { data, isLoading } = useTranslateDynamic(
  text,
  enabled // Optional: control when translation runs
)
```

## Supported Languages

- 🇬🇧 English (EN) - Source language
- 🇩🇪 German (DE)
- 🇦🇪 Arabic (AR)
- 🇲🇾 Malay (MS)
- 🇹🇭 Thai (TH)
- 🇮🇩 Indonesian (ID)

## API Limits

### Free Plan
- 500,000 characters/month
- No credit card required

### Paid Plans
- Pay as you go
- Volume discounts available

Check your usage:

```tsx
import { checkDeepLUsage } from '@/utils/deepl'

const usage = await checkDeepLUsage()
console.log(`Used: ${usage.character_count} / ${usage.character_limit}`)
```

## Troubleshooting

### Translation Not Working

1. **Check API key**: Ensure `VITE_DEEPL_API_KEY` is set in `.env`
2. **Check API URL**: Use correct URL for free/paid plan
3. **Check console**: Look for error messages
4. **Check language**: Translation only works for non-English languages

### Slow Performance

1. **Use batch translation**: `useTranslateObjects` instead of multiple `useTranslateDynamic`
2. **Reduce translated fields**: Only translate necessary fields
3. **Check cache**: Translations are cached, first load may be slower

### Characters Exceeding Limit

1. **Reduce content**: Translate only essential fields
2. **Upgrade plan**: Consider paid plan for more characters
3. **Optimize content**: Remove unnecessary text before translation

## Best Practices

1. ✅ Use batch translation for lists
2. ✅ Cache translations (automatically handled)
3. ✅ Only translate user-facing content
4. ✅ Handle loading states
5. ✅ Provide fallback to original text
6. ❌ Don't translate technical terms
7. ❌ Don't translate during every render
8. ❌ Don't translate English content

## Files Created

- `src/utils/deepl.ts` - Core DeepL API integration
- `src/hooks/useTranslateDynamic.ts` - React hooks for translation
- `src/examples/DeepLTranslationExamples.tsx` - Usage examples
- `.env.example` - Environment variable template
- `DEEPL_INTEGRATION.md` - This documentation

## Need Help?

- DeepL Documentation: https://www.deepl.com/docs-api
- Support: https://support.deepl.com/
