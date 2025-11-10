import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I know if my pet is truly happy?',
    answer:
      "A happy pet is one that's healthy, active, and emotionally balanced. Look for wagging tails, bright eyes, good appetite, and affectionate behavior — and use our AI Happiness Tracker to monitor your pet's wellbeing.",
  },
  {
    id: '2',
    question: 'Is Happy Pet available as a mobile app?',
    answer:
      'Yes, Happy Pet is available on both iOS and Android platforms. You can download it from the App Store or Google Play Store for convenient access on the go.',
  },
  {
    id: '3',
    question: 'What can I learn in the Pet Learning Module?',
    answer:
      'The Pet Learning Module offers comprehensive courses on pet care, nutrition, behavior training, health management, and more. All content is created by pet experts.',
  },
  {
    id: '4',
    question: 'What is the Pet AI Agent?',
    answer:
      "Our Pet AI Agent is an intelligent assistant that provides personalized recommendations for your pet's care, answers health questions, and helps you make informed decisions about your pet's wellbeing.",
  },
  {
    id: '5',
    question: "Can I get customized advice for my pet's breed or age?",
    answer:
      "Absolutely! Our AI system analyzes your pet's specific breed, age, and health profile to provide tailored advice and recommendations.",
  },
]

export function FAQPage() {
  const [expandedId, setExpandedId] = useState<string>('1')

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? '' : id)
  }

  return (
    <div className="mt-10 mb-10 bg-gradient-to-br py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
        className="  rounded-2xl  p-8 text-center  "
      >
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#003863] text-center mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-gray-600">
              Find answers to common questions about Happy Pet
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between bg-[#003863] text-white px-6 py-4 hover:bg-[#002d4d] transition-colors"
                >
                  <span className="text-left font-medium text-sm">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                {expandedId === item.id && (
                  <div className="bg-[#e1eef4] px-6 py-4 border-t border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
