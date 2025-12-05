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
      <div className="h-full min-h-[350px] xl:h-full xl:min-h-[900px] bg-[url('/assets/images/abutus.png')] bg-cover bg-center"></div>
      <div className="text-center max-w-[900px] mx-auto">
        {/* <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
          {t('aboutPage.title')}
        </h1> */}
        <div>
          <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
            {t('All you Feed is Love')}
          </h1>
          <p className="text-[#003860] text-[20px] font-semibold">
            <span className="text-[#003860] text-[30px] font-bold">
              Because a healthy pet is a happy pet!
            </span>
            <br></br>
            Today, good pet food needs to do much more than just satisfy hunger.
            For more than 50 years, our love of pets has been the greatest
            motivator in our search for the perfect recipe for our natural and
            healthy Premium Pet Food. We are committed to the following values
          </p>
        </div>
      </div>
      <div className="bg-[#E3E6ED] my-10 mb-0">
        <div className="container mx-auto py-5 px-5 md:py-5 lg:py-14 lg:px-0 md:px-5 sm:px-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div className="">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                For the Love of Pets
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                We want to enable every pet to have a long, healthy and happy
                life. The special requirements of our four-legged customers are
                very important to us. For more than 50 years, we have been
                passionately developing perfect recipes that are ideally adapted
                to the living conditions of our four-legged friends. We produce
                our premium Happy Cat Happy Dog Brand with a lot of love and
                passion and adapt it to every phase of life and every need.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                For the Love of Nature
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                We use only natural ingredients for our high-quality dog & cat
                food. Up to 80% comes from the region around Augsburg. As a
                matter of principle, we do not use any artificial colours,
                flavours or preservatives. In addition, we make sure that our
                GMO-free dog & cat food does not harm the environment or come at
                the expense of animal welfare. An awareness of nature influences
                our daily actions and sustainably shapes Happy Cat Happy Dog
                products - to be in harmony with mankind and nature.
              </p>
            </div>
            <div className="about-image">
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
        <div className="container mx-auto py-5 px-5 md:py-5 lg:py-14 lg:px-0 md:px-5 sm:px-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div className="">
              <img
                className="rounded-[30px] w-full max-w-[500px]"
                src="/assets/images/about6.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                For the Love of Quality
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                We use only natural ingredients for our high-quality dog & cat
                food. Up to 80% comes from the region around Augsburg. As a
                matter of principle, we do not use any artificial colours,
                flavours or preservatives. In addition, we make sure that our
                GMO-free dog & cat food does not harm the environment or come at
                the expense of animal welfare. An awareness of nature influences
                our daily actions and sustainably shapes Happy Cat Happy Dog
                products - to be in harmony with mankind and nature.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-5 sm:px-5 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                For the Love of Tradition
              </h1>
              <p className="text-[#003863] text-[16px] md:text-[20px]">
                Our family business has been producing food of the highest
                quality since 1765. Our first-class dog & cat food made from
                high-quality and natural ingredients has been produced in
                Wehringen, Bavaria, for over 50 years. The Happy Cat Happy Dog
                brand offers a species-appropriate and healthy diet for your pet
                and is designed for good palatability, easy digestibility and
                tolerance.
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
              <p className="text-[#003863] text-[16px] mb-6">
                We use nature as our guide for the production of our premium dog
                food
              </p>
              <button
                onClick={() => {
                  navigate('/about/nutritional-concept')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                Know More
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
              <p className="text-[#003863] text-[16px] mb-6">
                Our pet food is produced using the perfect recipe in the Thermos
                tufenmix®
              </p>
              <button
                onClick={() => {
                  navigate('/about/manufacturing-process')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                Know More
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
              <p className="text-[#003863] text-[16px] mb-6">
                Our pet food is produced using the perfect recipe in the
                Thermostufenmix®
              </p>
              <button
                onClick={() => {
                  navigate('/about/brand-history')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                Know More
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
              <p className="text-[#003863] text-[16px] mb-6">
                For us, social responsibility also means thinking of others and
                acting responsibly
              </p>
              <button
                onClick={() => {
                  navigate('/about/social-commitment')
                }}
                className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUsPage
