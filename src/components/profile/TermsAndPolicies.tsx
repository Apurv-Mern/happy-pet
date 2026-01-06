import { useTranslation } from '@/contexts/I18nContext'

type TermsSection = {
  title: string
  paragraphs?: string[]
  lists?: string[][]
}

export const TermsAndPolicies = () => {
  const { t } = useTranslation()
  const sections: TermsSection[] =
    (t('termsAndPoliciesPage.sections') as TermsSection[]) || []

  return (
    <div className="overflow-auto h-[500px] pr-2">
      <h3 className="text-[18px] sm:text-[20px] md:text-[28px] text-[#003863] font-bold text-left">
        {t('termsAndPoliciesPage.title')}
      </h3>

      {sections.map((section, sidx) => (
        <div key={sidx} className="mt-3 sm:mt-3 md:mt-5">
          <h4 className="text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold">
            {section.title}
          </h4>

          {(section.paragraphs || []).map((p, pidx) => (
            <p
              key={`p-${sidx}-${pidx}`}
              className="text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]"
            >
              {p}
            </p>
          ))}

          {(section.lists || []).map((listGroup, lgidx) => (
            <ul
              key={`list-${sidx}-${lgidx}`}
              className="list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]"
            >
              {listGroup.map((item, liidx) => (
                <li key={`li-${sidx}-${lgidx}-${liidx}`}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TermsAndPolicies
