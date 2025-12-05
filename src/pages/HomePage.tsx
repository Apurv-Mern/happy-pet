import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/I18nContext'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'

export function HomePage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  // Prevent back navigation to login/signup after authentication
  useEffect(() => {
    if (isAuthenticated) {
      window.history.pushState(null, '', window.location.href)
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href)
      }
      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [isAuthenticated])
  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="">
        <div className="container mx-auto px-4 pb-4 pt-4 sm:pb-6 sm:pt-6">
          <div className="">
            <div className="w-full">
              <div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-4 sm:justify-center md:justify-center lg:justify-between">
                <div className="absolute top-[80px] sm:top-[120px] md:top-[160px] left-[20px] hidden sm:left-[40px] md:left-[53px] sm:hidden  md:hidden lg:block lg:max-w-[818px] xl:max-w-[1074px] 2xl:max-w-[1330px] max-w-[1330px] w-full h-[2px] sm:h-[3px] bg-[#003863]"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="items-center justify-center">
                    <img
                      src="/assets/images/health1.png"
                      alt="Cat"
                      className="md:w-[110px] md:h-[110px]"
                    />
                  </div>
                  <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="items-center justify-center">
                    <img
                      src="/assets/images/health2.png"
                      alt="Cat"
                      className="md:w-[110px] md:h-[110px]"
                    />
                  </div>
                  <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="items-center justify-center">
                    <img
                      src="/assets/images/health3.png"
                      alt="Cat"
                      className="md:w-[110px] md:h-[110px]"
                    />
                  </div>
                  <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="items-center justify-center">
                    <img
                      src="/assets/images/health4.png"
                      alt="Cat"
                      className="md:w-[110px] md:h-[110px]"
                    />
                  </div>
                  <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="items-center justify-center">
                    <img
                      src="/assets/images/health5.png"
                      alt="Cat"
                      className="md:w-[110px] md:h-[110px]"
                    />
                  </div>
                  <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center">
                    <img
                      src="/assets/images/All-in-One.png"
                      alt="Human"
                      className=""
                    />
                  </div>
                  <div className="ml-[40px] sm:ml-[55px] md:ml-[72px] mt-[-4px] w-[2px] sm:w-[3px] h-[60px] sm:h-[80px] md:h-[101px] bg-[#003863] hidden sm:hidden md:hidden lg:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.section
        className="flex justify-center items-center py-8 sm:py-10 md:py-14 bg-white px-4"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative max-w-[610px] w-full bg-none lg:bg-[url('/assets/images/curve-border.png')] bg-no-repeat bg-contain bg-center text-center pt-0 py-8 px-4 sm:px-6">
          <h2 className="heading-line text-[#003863] text-[28px] sm:text-[40px] md:text-[55px]">
            {t('homePage.title')}
          </h2>
          <p className="text-[#003863]  heading-text font-bold text-[14px] sm:text-[16px] md:text-[20px]">
            {t('homePage.subtitle')}
          </p>
        </div>
      </motion.section>
      <div className="container mx-auto pb-8 sm:pb-10 md:pb-14 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-[65px]">
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              {/* <!-- Background Image --> */}
              <img
                src="/assets/images/pet1.png"
                alt="Dogs"
                className="w-full h-auto object-cover"
              />

              {/* <!-- Top-right small image --> */}
              <div className="absolute top-3 right-3">
                <img
                  src="/assets/images/icon1.png"
                  alt="Dog Icon"
                  className="w-25 h-25 p-1 rounded-full bg-[#003863]"
                />
              </div>

              {/* <!-- Bottom label --> */}
              {/* <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[24px] sm:text-[32px] md:text-[40px] bottom-0 left-0 bg-[#fff] pt-[12px] sm:pt-[16px] md:pt-[20px] pb-[12px] sm:pb-[16px] md:pb-[20px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#003863] heading-line hover:bg-[#003863] hover:text-[#fff] transition">
                Knowledge Hub
                <span className="absolute right-[12px] sm:right-[18px] md:right-[24px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm">
                  <img
                    src="/assets/images/love.png"
                    alt=""
                    className="w-[20px] sm:w-[25px] md:w-auto"
                  />
                </span>
              </button> */}
              <button className="group absolute w-full max-w-[300px] text-[30px] bottom-0 left-0 bg-[#0E213A] pt-[26px] pb-[26px] rounded-tr-[30px] text-[#fff]  hover:bg-[#003863] hover:text-[#fff] transition">
                {t('homePage.knowledgeHub')}
                <span className="absolute right-[24px] top-[10px] text-white text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="rotate-[-25deg] transition-all duration-300 fill-[#fff] group-hover:fill-[#fff] w-[26px] h-[26px] bi bi-suit-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              {/* <!-- Background Image --> */}
              <img
                src="/assets/images/pet2.png"
                alt="Dogs"
                className="w-full h-auto object-cover"
              />

              {/* <!-- Top-right small image --> */}
              <div className="absolute top-3 right-3">
                <img
                  src="/assets/images/icon2.png"
                  alt="Dog Icon"
                  className="w-25 h-25 p-2 rounded-full bg-[#003863]"
                />
              </div>

              {/* <!-- Bottom label --> */}
              <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[30px] bottom-0 left-0 bg-[#0E213A] pt-[26px]  pb-[26px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#fff]  hover:bg-[#003863] hover:text-[#fff] transition">
                {t('homePage.aiAgent')}
                <span className="absolute right-[12px] sm:right-[20px] md:right-[35px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm">
                  <img
                    src="/assets/images/start.png"
                    alt=""
                    className="w-[20px] sm:w-[25px] md:w-auto"
                  />
                </span>
              </button>
            </div>
          </div>
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              {/* <!-- Background Image --> */}
              <img
                src="/assets/images/pet3.png"
                alt="Dogs"
                className="w-full h-auto object-cover"
              />

              {/* <!-- Top-right small image --> */}
              <div className="absolute top-3 right-3">
                <img
                  src="/assets/images/icon3.png"
                  alt="Dog Icon"
                  className="w-25 h-25 p-1 rounded-full bg-[#003863]"
                />
              </div>

              {/* <!-- Bottom label --> */}
              {/* <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[24px] sm:text-[32px] md:text-[40px] bottom-0 left-0 bg-[#fff] pt-[12px] sm:pt-[16px] md:pt-[20px] pb-[12px] sm:pb-[16px] md:pb-[20px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#003863]  hover:bg-[#003863] hover:text-[#fff] transition">
                Knowledge Hub
                <span className="absolute right-[12px] sm:right-[16px] md:right-[20px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm">
                  <img
                    src="/assets/images/vedio.png"
                    alt=""
                    className="w-[20px] sm:w-[25px] md:w-auto"
                  />
                </span>
              </button> */}
              <button className="group absolute w-full max-w-[300px] text-[30px] bottom-0 left-0 bg-[#0E213A] pt-[26px] pb-[26px] rounded-tr-[30px] text-[#fff] hover:bg-[#003863] hover:text-[#fff] transition">
                {t('homePage.learningModule')}
                <span className="absolute right-[20px] top-[10px] text-white text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="transition-all duration-300 fill-[#fff] group-hover:fill-[#fff] w-[28px] h-[28px]  bi bi-play-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <motion.section
        className="bg-[url('/assets/images/bg-image.png')] bg-cover py-14 sm:py-20 md:py-28 px-4"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              <span className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] font-semibold relative">
                {t('homePage.ourStory')}{' '}
                <img
                  className="absolute bottom-[10px] left-[75px] sm:left-[85px] md:left-[95px] w-[15px] sm:w-[18px] md:w-auto"
                  src="/assets/images/love1.png"
                  alt=""
                />
              </span>
              <h2 className="text-[#003863] heading-line text-[55px] pt-2 pb-2">
                {t('homePage.ourStoryTitle')}
              </h2>
              <h4 className="text-[#003863] text-[22px] font-semibold pb-3">
                {t('homePage.ourStorySubtitle')}
              </h4>
              <p className="text-[#003863] text-[20px] font-normal">
                {t('homePage.ourStoryDescription')}
              </p>
              <button className="flex items-center bg-[#fff] text-black font-semibold text-sm sm:text-base lg:text-lg rounded-full pl-4 sm:pl-5 lg:pl-6 pr-[2px] pt-[2px] pb-[2px] mt-5 lg:mt-7 hover:bg-[#0E213A] hover:text-[#fff] transition">
                {t('homePage.learnMore')}
                <span className="ml-2 sm:ml-3 flex items-center justify-center w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[49px] lg:h-[49px] bg-[#0E213A] rounded-full border-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#fff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div>
              <img
                src="/assets/images/our-story.png"
                alt="Our Story Image"
                className="w-full max-w-[550px] rounded-[30px] about-image"
              />
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="flex justify-center items-center py-14 bg-white"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        <div className="relative max-w-[740px] w-full lg:bg-[url('/assets/images/curve-border2.png')] bg-no-repeat bg-contain bg-center text-center pt-0 pb-[36px] px-6">
          <h2 className="heading-line text-[#003863] text-[55px]">
            {t('homePage.smartLearningTitle')}
          </h2>
          <p className="text-[#003863]  heading-text font-bold text-[20px]">
            {t('homePage.smartLearningSubtitle')}
          </p>
        </div>
      </motion.section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto pb-8 sm:pb-10 md:pb-14">
          <div className="text-center md:text-end">
            <img
              src="/assets/images/book.png"
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto md:mx-0"
              alt=""
            />
          </div>
          <div>
            <video
              className="w-full h-full object-cover rounded-lg"
              controls
              poster="/videos/video-poster.jpg"
              preload="metadata"
            >
              <source src="/videos/my-video.mp4" type="video/mp4" />
              <source src="/videos/my-video.webm" type="video/webm" />
              <track
                src="/videos/captions.vtt"
                kind="captions"
                label="English"
                default
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="bg-[url('/assets/images/bg2.png')] bg-cover py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div>
            <span className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] font-semibold relative">
              {t('homePage.testimonialsLabel')}{' '}
              <img
                className="absolute bottom-[10px] left-[90px] sm:left-[100px] md:left-[110px] w-[15px] sm:w-[18px] md:w-auto"
                src="/assets/images/love1.png"
                alt=""
              />
            </span>
            <h2 className="text-[#003863] heading-line text-[32px] sm:text-[42px] md:text-[55px] pt-2 pb-2">
              {t('homePage.testimonialsTitle')}
            </h2>
            <h4 className="text-[#003863] text-[16px] sm:text-[18px] md:text-[22px] font-semibold pb-3">
              {t('homePage.testimonialsSubtitle')}
            </h4>
          </div>
          <div className="pt-6 sm:pt-8 md:pt-10">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="shadow-bottom">
                  <div className="bg-[#E3E6ED] rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px] border-[1px] border-[#003863] border-b-0">
                    <p className="relative text-center text-[18px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it.
                    </p>
                    <span className="absolute text-[44px] top-0 text-[#003863] colon">
                      “
                    </span>
                  </div>
                  <div className="bg-[#E3E6ED] rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center  flex items-center justify-center gap-4 border-[1px] border-[#003863]">
                    <img src="/assets/images/test.png" alt="" />
                    <h5 className="heading-line text-[32px] text-[#003863]">
                      Lillian
                    </h5>
                    <p className="text-[20px] border-l-[1px] border-[#003863] text-[#003863] pl-[12px]">
                      UK
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="flex justify-center gap-6 mt-6">
              <button className="custom-prev bg-[#003863] rounded-full w-[48px] h-[48px] border-[3px] border-[#0E213A]">
                <i className="bi bi-arrow-left text-[#fff] text-[28px]"></i>
              </button>
              <button className="custom-next bg-[#003863] rounded-full w-[48px] h-[48px] border-[3px] border-[#0E213A]">
                <i className="bi bi-arrow-right text-[#fff] text-[28px]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HomePage
