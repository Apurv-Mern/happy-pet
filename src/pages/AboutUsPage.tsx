import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/assets/images/background.png')] bg-cover bg-center"
    >
      <div className="container mx-auto py-20">
        <div className="">
          <h1 className="heading-line text-[#003863] text-[64px]">
            {t('aboutPage.title')}
          </h1>
          <p className="text-[#003863] text-[20px] font-bold mx-auto pb-6">
            {t('aboutPage.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          <div>
            <p className="text-[#0E213A] text-[18px]">
              {t('aboutPage.contentParagraph1')}
            </p>
            <p className="text-[#0E213A] text-[18px] pt-6">
              {t('aboutPage.contentParagraph2')}
            </p>
            <button className="bg-[#003863] text-white px-6 py-3 rounded-[5px] flex items-center gap-[26px] hover:bg-[#004C82] transition mt-10">
              <span className="text-lg font-medium">
                {t('aboutPage.readMore')}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="about-image">
            <img
              className="rounded-[15px] w-full max-w-[580px]"
              src="/assets/images/about.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUsPage
