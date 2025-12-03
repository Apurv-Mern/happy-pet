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
                  {t('All you Feed is Love')}
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
            We are committed to the following values
          </h1>
        </div>
      </div>
      <div className="bg-[#F2EFF9] py-10 md:py-20">
        <div className='container mx-auto px-5 sm:px-5 md:px-0'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center'>
              <div className=''>
                <img className='rounded-[30px] w-full max-w-[500px]' src="/assets/images/about2.png" alt="" />  
              </div>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                  For the Love of Pets
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                  We want to enable every pet to have a long, healthy and happy life. The special requirements of our four-legged customers are very important to us. For more than 50 years, we have been passionately developing perfect recipes that are ideally adapted to the living conditions of our four-legged friends. We produce our premium Happy Cat Happy Dog Brand with a lot of love and passion and adapt it to every phase of life and every need.
                </p>
              </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className='container mx-auto px-5 sm:px-5 md:px-0'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10'>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                  For the Love of Nature
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                  We use only natural ingredients for our high-quality dog & cat food. Up to 80% comes from the region around Augsburg. As a matter of principle, we do not use any artificial colours, flavours or preservatives. In addition, we make sure that our GMO-free dog & cat food does not harm the environment or come at the expense of animal welfare. An awareness of nature influences our daily actions and sustainably shapes Happy Cat Happy Dog products - to be in harmony with mankind and nature.
                </p>
              </div>
              <div className='about-image'>
                <img className='rounded-[30px] w-full max-w-[500px]' src="/assets/images/about3.png" alt="" />  
              </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F2EFF9] py-10 md:py-20">
        <div className='container mx-auto px-5 sm:px-5 md:px-0'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center'>
              <div className=''>
                <img className='rounded-[30px] w-full max-w-[500px]' src="/assets/images/about4.png" alt="" />  
              </div>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                  For the Love of Quality
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                  We use only natural ingredients for our high-quality dog & cat food. Up to 80% comes from the region around Augsburg. As a matter of principle, we do not use any artificial colours, flavours or preservatives. In addition, we make sure that our GMO-free dog & cat food does not harm the environment or come at the expense of animal welfare. An awareness of nature influences our daily actions and sustainably shapes Happy Cat Happy Dog products - to be in harmony with mankind and nature.
                </p>
              </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
        <div className='container mx-auto px-5 sm:px-5 md:px-0'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10'>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px] md:mb-3">
                  For the Love of Tradition
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                  Our family business has been producing food of the highest quality since 1765. Our first-class dog & cat food made from high-quality and natural ingredients has been produced in Wehringen, Bavaria, for over 50 years. The Happy Cat Happy Dog brand offers a species-appropriate and healthy diet for your pet and is designed for good palatability, easy digestibility and tolerance.
                </p>
              </div>
              <div className='about-image'>
                <img className='rounded-[30px] w-full max-w-[500px]' src="/assets/images/about5.png" alt="" />  
              </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/assets/images/aboutbg.png')] bg-cover bg-center py-20 md:py-20">
        <div className='container mx-auto px-5 sm:px-5 md:px-0'>
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
              Nutritional Concept
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
              We use nature as our guide for the
              production of our premium dog food
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
              Manufacturing Process
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
              Our pet food is produced using the perfect recipe in the Thermos tufenmix®
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
             Brand History
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
              Our pet food is produced using the perfect recipe in the Thermostufenmix®
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
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
             Social Commitment
              </h2>
              <p className="text-[#003863] text-[17px] mb-6">
              For us, social responsibility also means thinking of others and acting responsibly
              </p>
              <button className="bg-[#003863] text-white w-full py-3 rounded-full font-medium text-[16px]">
              Know More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='pb-5 pt-20'>
        <div className='container mx-auto bg-[#F2EFF9] py-10 px-10 rounded-[30px]'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center'>
              <div>
                  <img src="/assets/images/product.png" className="rounded-[30px]" alt="" />
              </div>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[48px] text-left sm:text-left md:mb-3 md:text-left lg:text-right">
                  Delve into our product world
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px] md:text-left lg:text-right">
                  Happy Dog has the right food for every need. Get to know our range of specially balanced pet food. It is easily digestible and rich in high-quality animal proteins. See for yourself.
                </p>
                <div className='md:text-left lg:text-right mt-8'>
                  <button className="bg-[#003863] text-white py-4 px-10 font-medium rounded-full">Discover our Happy Dog Products</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className='pb-20'>
        <div className='container mx-auto bg-[#F2EFF9] py-10 px-10 rounded-[30px]'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 items-center'>
              <div>
                <h1 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[48px] md:mb-3">
                  Delve into our Happy Cat product world
                </h1>
                <p className="text-[#0E213A] text-[16px] md:text-[18px]">
                  Happy Dog has the right food for every need. Get to know our range of specially balanced pet food. It is easily digestible and rich in high-quality animal proteins. See for yourself.
                </p>
                <div className='text-start mt-8'>
                  <button className="bg-[#003863] text-white py-4 px-10 font-medium rounded-full">Discover our Happy Dog Products</button>
                </div>
              </div>
              <div className='about-image'>
                  <img src="/assets/images/product2.png" className="rounded-[30px]" alt="" />
              </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUsPage
