import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

interface FAQItem {
  id: string
  question: string
  answer: string
}

export function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { t } = useTranslation()

  const faqData: FAQItem[] = t('faqPage.questions')

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
        className=""
      >
        <div className="container mx-auto py-20 px-5 md:px-0">
          <div className="border-b-[1px] border-[#003860] mb-[26px]">
            <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
              {t('faqPage.title')}
            </h1>
          </div>

          {/* <div className="space-y-3">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="border-[1px] border-[#003863]"
              >
                 Accordion Header 
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between bg-[#003863] text-white px-4 sm:px-6 py-3 sm:py-4"
                >
                  <span className="text-left font-medium text-xs sm:text-sm">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform ${expandedId === item.id ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                 Accordion Content
                {expandedId === item.id && (
                  <div className="bg-transparent px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div> */}

          <div className="space-y-4 w-full">
            {faqData.map((item, index) => (
              <div key={item.id || index} className="">
                {/* HEADER */}
                <button
                  onClick={() => toggleAccordion(item.id || String(index))}
                  className="relative w-full flex items-center rounded-[5px] justify-between bg-[#003863] text-white pl-12 pr-6 py-4"
                >
                  {/* LEFT WHITE RIBBON SHAPE */}
                  <span className="faq-pointer absolute left-0 top-0 h-full w-6 bg-white"></span>

                  {/* QUESTION TEXT */}
                  <span className="text-left text-[16px] sm:text-[16px] md:text-[20px]">{item.question}</span>

                  {/* ARROW */}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedId === (item.id || String(index))
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                {/* CONTENT (STAYS OUTSIDE HEADER) */}
                {expandedId === (item.id || String(index)) && (
                  <div className="bg-white px-3 py-3 md:px-6 md:py-4 border-[1px] border-[#003863] rounded-[5px] mt-[10px]">
                    <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[18px] leading-relaxed">
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
