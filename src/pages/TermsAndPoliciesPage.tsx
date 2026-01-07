import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

type TermsSection = {
  title: string
  paragraphs?: string[]
  lists?: string[][]
}

export const TermsAndPoliciesPage = () => {
  const { t } = useTranslation()
  const sections: TermsSection[] =
    (t('termsAndPoliciesPage.sections') as TermsSection[]) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#003863] mb-4">
            {t('termsAndPoliciesPage.title')}
          </h1>
          <div className="h-1 w-24 bg-[#003863] rounded"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {sections.map((section, sidx) => (
            <div key={sidx} className="mb-8 last:mb-0">
              <h2 className="text-xl md:text-2xl text-[#003863] font-bold mb-4">
                {section.title}
              </h2>

              {(section.paragraphs || []).map((p, pidx) => (
                <p
                  key={`p-${sidx}-${pidx}`}
                  className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed"
                >
                  {p}
                </p>
              ))}

              {(section.lists || []).map((listGroup, lgidx) => (
                <ul
                  key={`list-${sidx}-${lgidx}`}
                  className="list-disc pl-6 md:pl-8 mb-4 text-gray-700 text-base md:text-lg space-y-2"
                >
                  {listGroup.map((item, liidx) => (
                    <li
                      key={`li-${sidx}-${lgidx}-${liidx}`}
                      className="leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: January 2026
        </div>
      </div>
    </motion.div>
  )
}

export default TermsAndPoliciesPage
