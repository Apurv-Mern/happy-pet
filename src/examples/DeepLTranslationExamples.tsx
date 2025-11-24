/**
 * DeepL Translation Integration - Usage Examples
 *
 * This file demonstrates how to use DeepL for translating dynamic content
 * from API responses in the Happy Pet application.
 */

import {
  useTranslateDynamic,
  useTranslateObject,
  useTranslateObjects,
} from '@/hooks/useTranslateDynamic'
import { useLearningKnowledgeQuery } from '@/api/learningModule'

// Example 1: Translate a single text field
// ============================================
export function VideoCard({
  video,
}: {
  video: { title: string; description: string }
}) {
  // Translate the title dynamically
  const { data: translatedTitle, isLoading } = useTranslateDynamic(video.title)

  return (
    <div>
      <h3>{isLoading ? video.title : translatedTitle || video.title}</h3>
    </div>
  )
}

// ============================================
// Example 2: Translate entire object
// ============================================
export function DocumentCard({
  document,
}: {
  document: { title: string; description: string; content: string }
}) {
  // Translate multiple fields of an object
  const { data: translatedDoc, isLoading } = useTranslateObject(
    document,
    ['title', 'description', 'content'] // Fields to translate
  )

  if (isLoading) {
    return <div>Loading translation...</div>
  }

  return (
    <div>
      <h3>{translatedDoc?.title}</h3>
      <p>{translatedDoc?.description}</p>
      <div>{translatedDoc?.content}</div>
    </div>
  )
}

// ============================================
// Example 3: Translate array of items
// ============================================
export function VideoList({
  videos,
}: {
  videos: Array<{ id: string; title: string; description: string }>
}) {
  // Translate all videos at once (batch translation for better performance)
  const { data: translatedVideos, isLoading } = useTranslateObjects(
    videos,
    ['title', 'description'] // Fields to translate in each video
  )

  if (isLoading) {
    return <div>Translating videos...</div>
  }

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

// Example 4: Real-world Knowledge Hub usage
// ============================================
export function KnowledgeHubVideoGrid() {
  const { data: learningData } = useLearningKnowledgeQuery({ type: 'video' })

  // Translate all video titles and descriptions
  const { data: translatedVideos, isLoading: isTranslating } =
    useTranslateObjects(learningData?.data?.items, ['title', 'description'])

  if (isTranslating) {
    return <div className="text-center">Loading translations...</div>
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {translatedVideos?.map((video, index) => (
        <div key={index} className="video-card">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  )
}

// Example 5: Learning Module Documents
// ============================================
export function LearningModuleDocuments() {
  const { data: learningData } = useLearningKnowledgeQuery({ type: 'document' })

  // Translate document titles and contents
  const { data: translatedDocs, isLoading: isTranslating } =
    useTranslateObjects(learningData?.data?.items, [
      'title',
      'content',
      'description',
    ])

  return (
    <div>
      {isTranslating && <div>Translating documents...</div>}
      {translatedDocs?.map((doc, index) => (
        <div key={index}>
          <h3>{doc.title}</h3>
          <p>{doc.description}</p>
          <div>{doc.content}</div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// Example 6: FAQ Page with dynamic content
// ============================================
export function FAQPageWithTranslation({
  faqs,
}: {
  faqs: Array<{ id: string; question: string; answer: string }>
}) {
  const { data: translatedFaqs, isLoading } = useTranslateObjects(faqs, [
    'question',
    'answer',
  ])

  if (isLoading) {
    return <div>Loading translations...</div>
  }

  return (
    <div>
      {translatedFaqs?.map(faq => (
        <div key={faq.id}>
          <h4>{faq.question}</h4>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// Important Notes:
// ============================================
/**
 * 1. Set up DeepL API key in .env file:
 *    VITE_DEEPL_API_KEY=your-api-key-here
 *
 * 2. Translations are cached for 24 hours to reduce API calls
 *
 * 3. English content is not translated (source language)
 *
 * 4. Use batch translation (useTranslateObjects) when possible
 *    to reduce API calls and improve performance
 *
 * 5. DeepL supports these languages:
 *    - English (EN)
 *    - German (DE)
 *    - Arabic (AR)
 *    - Malay (MS)
 *    - Thai (TH)
 *    - Indonesian (ID)
 */
