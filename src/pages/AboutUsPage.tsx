import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/assets/images/background.png')] bg-contain bg-center"
    >
      <div className="h-full min-h-[350px] xl:h-full xl:min-h-[350px] bg-[url('/assets/images/abutus.png')] bg-cover bg-center"></div>
      <div className="container mx-auto py-5 px-5 md:py-5 lg:py-20 md:px-5 sm:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          <div>
            <div className="">
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.title')}
              </h1>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                {t('aboutPage.subtitle')}
              </h1>
              <p className="text-[#003863] text-[16px] sm:text-[16px] sm:pb-2 md:text-[20px] font-bold mx-auto md:pb-1">
                {t('aboutPage.description')}
              </p>
            </div>
            <p className="text-[#0E213A] text-[16px] md:text-[18px]">
              {t('aboutPage.contentParagraph1')}
            </p>
            {/* <p className="text-[#0E213A] text-[16px] md:text-[18px] pt-6">
              {t('aboutPage.contentParagraph2')}
            </p> */}
            <button className="bg-[#003863] text-white px-9 py-3 rounded-full flex items-center gap-[26px] hover:bg-[#004C82] transition mt-10">
              <span className="text-lg font-normal">
                {t('aboutPage.readMore')}
              </span>
            </button>
          </div>
          <div className="about-image">
            <img
              className="rounded-[30px] w-full max-w-[500px]"
              src="/assets/images/about.png"
              alt=""
            />
          </div>
        </div>
        <div>
          <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[48px] mt-10 md:mt-10">
            {t('aboutPage.valuesTitle')}
          </h1>
        </div>
      </div>
      <div className="bg-[#F2EFF9] py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div className="">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about2.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                {t('aboutPage.forLoveOfPets')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                {t('aboutPage.forLoveOfPetsText')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                {t('aboutPage.forLoveOfNature')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                {t('aboutPage.forLoveOfNatureText')}
              </p>
            </div>
            <div className="about-image">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about3.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F2EFF9] py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div className="">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about4.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                {t('aboutPage.forLoveOfQuality')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                {t('aboutPage.forLoveOfQualityText')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                {t('aboutPage.forLoveOfTradition')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                {t('aboutPage.forLoveOfTraditionText')}
              </p>
            </div>
            <div className="about-image">
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
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 text-center hover:bg-[#F2EFF9CC] transition duration-300">
              <div className="mb-5">
                <img
                  src="/assets/images/icon01.png"
                  alt="Nutritional Concept Logo"
                  className="w-full"
                />
              </div>
              <h2 className="text-[#003863] font-bold text-[24px] mb-1">
                {t('aboutPage.nutritionalConcept')}
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
                {t('aboutPage.nutritionalConceptText')}
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
              <h2 className="text-[#003863] font-bold text-[24px] mb-1">
                {t('aboutPage.manufacturingProcess')}
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
                {t('aboutPage.manufacturingProcessText')}
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
              <h2 className="text-[#003863] font-bold text-[24px] mb-1">
                {t('aboutPage.brandHistory')}
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
                {t('aboutPage.brandHistoryText')}
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
              <h2 className="text-[#003863] font-bold text-[24px] mb-1">
                {t('aboutPage.socialCommitment')}
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
                {t('aboutPage.socialCommitmentText')}
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
                {t('aboutPage.knowMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pb-5 pt-20">
        <div className="container mx-auto bg-[#F2EFF9] py-10 px-10 rounded-[30px]">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="/assets/images/product.png"
                className="rounded-[30px]"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[48px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                {t('aboutPage.delveIntoProductWorld')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                {t('aboutPage.delveIntoProductWorldText')}
              </p>
              <div className="md:text-left lg:text-right mt-8">
                <button className="bg-[#003863] text-white py-4 px-10 font-medium rounded-full">
                  {t('aboutPage.discoverHappyDog')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="pb-20">
        <div className="container mx-auto bg-[#F2EFF9] py-10 px-10 rounded-[30px]">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[48px] md:mb-3">
                {t('aboutPage.delveIntoHappyCat')}
              </h1>
              <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                {t('aboutPage.delveIntoHappyCatText')}
              </p>
              <div className="text-start mt-8">
                <button className="bg-[#003863] text-white py-4 px-10 font-medium rounded-full">
                  {t('aboutPage.discoverHappyCat')}
                </button>
              </div>
            </div>
            <div className="about-image">
              <img
                src="/assets/images/product2.png"
                className="rounded-[30px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div> */}
    </motion.div>
  )
}

export default AboutUsPage
