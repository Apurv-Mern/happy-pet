import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { usePoliciesQuery } from '@/hooks/usePolicies'
import { Skeleton } from '@/components/ui/skeleton'

export const TermsAndPoliciesPage = () => {
  const { t, language } = useTranslation()
  const { data, isLoading, error } = usePoliciesQuery(language)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error loading policies
          </h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  const policies = data?.data?.policies || []

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

        {/* Content - Display all policies */}
        {policies.map((policy, policyIdx) => (
          <div key={policy.id} className={policyIdx > 0 ? 'mt-12' : ''}>
            {/* Policy Title */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003863] mb-2">
                {policy.title}
              </h2>
              <div className="h-0.5 w-16 bg-[#003863] rounded"></div>
            </div>

            {/* Policy Sections */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6">
              {policy.sections.map((section, sidx) => (
                <div key={sidx} className="mb-8 last:mb-0">
                  <h3 className="text-xl md:text-2xl text-[#003863] font-bold mb-4">
                    {section.heading}
                  </h3>
                  <div
                    className="prose prose-lg max-w-none text-gray-700 
                      [&_p]:mb-4 [&_p]:leading-relaxed
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                      [&_li]:leading-relaxed
                      [&_strong]:font-semibold [&_strong]:text-[#003863]
                      [&_a]:text-blue-600 [&_a]:hover:underline"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="text-right text-sm text-gray-500 mb-4">
              {t('termsAndPoliciesPage.lastUpdated')}:{' '}
              {new Date(policy.lastUpdated).toLocaleDateString()} (v
              {policy.version})
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default TermsAndPoliciesPage
