import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
}

const helpFaqs: FAQ[] = [
  {
    id: 1,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    question: 'Lorem Ipsum',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export const HelpCenter = () => {
  const [activeHelpTab, setActiveHelpTab] = useState('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <>
      <h3 className="text-2xl font-bold text-[#003863] mb-8">Help Center</h3>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveHelpTab('general')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeHelpTab === 'general'
              ? 'bg-[#003863] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveHelpTab('account')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeHelpTab === 'account'
              ? 'bg-[#003863] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveHelpTab('service')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeHelpTab === 'service'
              ? 'bg-[#003863] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-white" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full pl-12 pr-4 py-3 bg-[#003863] text-white placeholder-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004C82]"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {helpFaqs.map(faq => (
          <div key={faq.id} className="border-b border-gray-200">
            <button
              onClick={() =>
                setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
              }
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`mt-1 p-1 rounded transition-colors ${
                    expandedFaq === faq.id ? 'bg-[#003863]' : 'bg-gray-200'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFaq === faq.id
                        ? 'rotate-180 text-white'
                        : 'text-gray-600'
                    }`}
                  />
                </div>
                <span className="text-lg font-semibold text-[#003863] group-hover:text-[#004C82]">
                  {faq.question}
                </span>
              </div>
            </button>
            {expandedFaq === faq.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pb-4 pl-10 pr-4"
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
