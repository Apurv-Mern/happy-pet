// Example: AI Agent Page with Dynamic Content Translation
// This demonstrates how to handle real-time AI responses in multiple languages

import { useState } from 'react'
import { useTranslation } from '@/contexts/I18nContext'

export function AiAgentPage() {
  const { t, language } = useTranslation()
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // APPROACH 1: Send language preference to backend
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language, // Backend uses this to respond in correct language
        },
        body: JSON.stringify({
          message: input,
          language: language, // Also include in body for clarity
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      // Backend should return AI response already translated
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response },
      ])
    } catch (error) {
      console.error('AI chat error:', error)
      // Show error in user's language
      setMessages(prev => [
        ...prev,
        {
          role: 'error',
          content: t('aiAgent.errorMessage'),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t('aiAgent.title')}</h1>

      {/* Chat Messages */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 h-[500px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>{t('aiAgent.welcomeMessage')}</p>
            <p className="text-sm mt-2">
              {t('aiAgent.languageNote', {
                language: t(`languages.${language}`),
              })}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : msg.role === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg bg-gray-100">
              <span className="animate-pulse">{t('aiAgent.typing')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('aiAgent.inputPlaceholder')}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {t('aiAgent.sendButton')}
        </button>
      </div>

      {/* Suggested Questions (Translated) */}
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">
          {t('aiAgent.suggestedQuestions')}
        </p>
        <div className="flex flex-wrap gap-2">
          {['aiAgent.question1', 'aiAgent.question2', 'aiAgent.question3'].map(
            key => (
              <button
                key={key}
                onClick={() => setInput(t(key))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
              >
                {t(key)}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

// Add to src/locales/en.json:
/*
{
  "aiAgent": {
    "title": "AI Pet Assistant",
    "welcomeMessage": "Hello! I'm your AI pet care assistant. Ask me anything about pet care!",
    "languageNote": "I'll respond in {language}",
    "typing": "AI is typing...",
    "inputPlaceholder": "Ask a question about your pet...",
    "sendButton": "Send",
    "errorMessage": "Sorry, I couldn't process your request. Please try again.",
    "suggestedQuestions": "Suggested questions:",
    "question1": "How often should I feed my dog?",
    "question2": "What are signs of a healthy cat?",
    "question3": "Best exercises for puppies?"
  }
}
*/

// Backend Example (Node.js):
/*
app.post('/api/ai/chat', async (req, res) => {
  const { message, language, conversationHistory } = req.body
  const userLanguage = req.headers['accept-language'] || language || 'en'
  
  // OPTION 1: Use OpenAI with language instruction
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a pet care expert. Always respond in ${getLanguageName(userLanguage)}. 
                  Provide accurate, helpful advice about pet care.`
      },
      ...conversationHistory,
      { role: "user", content: message }
    ],
  })
  
  res.json({ response: response.choices[0].message.content })
  
  // OPTION 2: Translate user input to English, get AI response, translate back
  const translatedInput = await translate(message, 'en')
  const aiResponse = await getAIResponse(translatedInput)
  const translatedResponse = await translate(aiResponse, userLanguage)
  
  res.json({ response: translatedResponse })
})

function getLanguageName(code) {
  const names = {
    en: 'English',
    de: 'German',
    ar: 'Arabic',
    ms: 'Malay',
    th: 'Thai',
    id: 'Indonesian'
  }
  return names[code] || 'English'
}
*/
