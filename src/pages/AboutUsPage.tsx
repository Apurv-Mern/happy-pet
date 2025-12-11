import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useNavigate } from 'react-router-dom'

const AboutUsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/assets/images/background.png')] bg-contain bg-center"
    >
      <div>
        <img src="/assets/images/abutus.png" className="w-full" alt="" />
      </div>
      <div className="text-center max-w-[900px] mx-auto">
        <div>
          <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
            {t('aboutPage.mainTitle')}
          </h1>
          <p className="text-[#003860] text-[16px] md:text-[20px] font-semibold">
            <span className="text-[#003860] text:[20px] sm:text-[20] md:text-[30px] font-bold">
              {t('aboutPage.subtitle')}
            </span>
            <br></br>
            {t('aboutPage.introText')}
          </p>
        </div>
      </div>
      <div className="bg-[#E3E6ED] my-3 sm:my-10 mb-0">
        <div className="container mx-auto py-4 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[40%_60%] 2xl:grid-cols-[40%_60%] items-center">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.forLoveOfPets')}
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                {t('aboutPage.forLoveOfPetsText')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:py-10 md:py-20">
        <div className="container mx-auto py-4 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_37%] gap-10 items-center">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.forLoveOfNature')}
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                {t('aboutPage.forLoveOfNatureText')}
              </p>
            </div>
            <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E3E6ED]">
        <div className="container mx-auto py-4 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[40%_60%] 2xl:grid-cols-[37%_60%] gap-10 items-center">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about6.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.forLoveOfQuality')}
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                {t('aboutPage.forLoveOfQualityText')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:py-10 md:py-20">
        <div className="container mx-auto py-4 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_37%] gap-10 items-center">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                {t('aboutPage.forLoveOfTradition')}
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                {t('aboutPage.forLoveOfTraditionText')}
              </p>
            </div>
            <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/assets/images/aboutbg.png')] bg-cover bg-center py-20 md:py-20">
        <div className="container mx-auto py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 text-center hover:bg-[#F2EFF9CC] transition duration-300">
              <div className="mb-5">
                <img
                  src="/assets/images/icon01.png"
                  alt="Nutritional Concept Logo"
                  className="w-full"
                />
              </div>
              <h2 className="text-[#003863] font-bold text-[18px] md:text-[20px] lg:text-[24px] mb-1">
                {t('aboutPage.nutritionalConcept')}
              </h2>
              <p className="text-[#003863] text-[14px] md:text-[16px] mb-6">
                {t('aboutPage.nutritionalConceptText')}
              </p>
              <button
                onClick={() => {
                  navigate('/about/nutritional-concept')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                {t('aboutPage.knowMore')}
              </button>
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 text-center hover:bg-[#F2EFF9CC] transition duration-300">
              <div className="mb-5">
                <img
                  src="/assets/images/icon02.png"
                  alt="Nutritional Concept Logo"
                  className="w-full"
                />
              </div>
              <h2 className="text-[#003863] font-bold text-[18px] md:text-[20px] lg:text-[24px] mb-1">
                {t('aboutPage.manufacturingProcess')}
              </h2>
              <p className="text-[#003863] text-[14px] md:text-[16px] mb-6">
                {t('aboutPage.manufacturingProcessText')}
              </p>
              <button
                onClick={() => {
                  navigate('/about/manufacturing-process')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                {t('aboutPage.knowMore')}
              </button>
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 text-center hover:bg-[#F2EFF9CC] transition duration-300">
              <div className="mb-5">
                <img
                  src="/assets/images/icon03.png"
                  alt="Nutritional Concept Logo"
                  className="w-full"
                />
              </div>
              <h2 className="text-[#003863] font-bold text-[18px] md:text-[20px] lg:text-[24px] mb-1">
                {t('aboutPage.brandHistory')}
              </h2>
              <p className="text-[#003863] text-[14px] md:text-[16px] mb-6">
                {t('aboutPage.brandHistoryText')}
              </p>
              <button
                onClick={() => {
                  navigate('/about/brand-history')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                {t('aboutPage.knowMore')}
              </button>
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 text-center hover:bg-[#F2EFF9CC] transition duration-300">
              <div className="mb-5">
                <img
                  src="/assets/images/icon04.png"
                  alt="Nutritional Concept Logo"
                  className="w-full"
                />
              </div>
              <h2 className="text-[#003863] font-bold text-[18px] md:text-[20px] lg:text-[24px] mb-1">
                {t('aboutPage.socialCommitment')}
              </h2>
              <p className="text-[#003863] text-[16px] mb-6">
                {t('aboutPage.socialCommitmentText')}
              </p>
              <button
                onClick={() => {
                  navigate('/about/social-commitment')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                {t('aboutPage.knowMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUsPage
