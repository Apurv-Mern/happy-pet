

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export function HomePage() {
  return <div className="">
    <div className="bg-[url('/src/assets/images/pet-image.png')] bg-cover bg-center h-[120px] sm:h-[150px] md:h-[190px] w-full">
      <div className="container mx-auto px-4 pb-4 pt-4 sm:pb-6 sm:pt-6">
        <div className="">
          <div className="w-full">
            <div className="relative flex flex-wrap justify-between items-center gap-2 sm:gap-4">
              <div className="absolute top-[80px] sm:top-[120px] md:top-[160px] left-[20px] sm:left-[40px] md:left-[53px] max-w-[calc(100%-40px)] sm:max-w-[1362px] w-full h-[2px] sm:h-[3px] bg-[#C6D8E2]"></div>
              <div className="flex flex-col items-center text-center">
                <div className="items-center justify-center">
                  <img src="src/assets/images/health1.png" alt="Cat" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px]" />
                </div>
                <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#B9CFDA]"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="items-center justify-center">
                  <img src="src/assets/images/health2.png" alt="Cat" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px]" />
                </div>
                <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#B9CFDA]"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="items-center justify-center">
                  <img src="src/assets/images/health3.png" alt="Cat" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px]" />
                </div>
                <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#B9CFDA]"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="items-center justify-center">
                  <img src="src/assets/images/health4.png" alt="Cat" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px]" />
                </div>
                <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#B9CFDA]"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="items-center justify-center">
                  <img src="src/assets/images/health5.png" alt="Cat" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px]" />
                </div>
                <div className="w-[2px] sm:w-[3px] h-[30px] sm:h-[40px] md:h-[50px] bg-[#B9CFDA]"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center">
                  <img src="src/assets/images/All-in-One.png" alt="Human" className="w-[60px] sm:w-[80px] md:w-auto" />
                </div>
                <div className="ml-[40px] sm:ml-[55px] md:ml-[72px] mt-[-4px] w-[2px] sm:w-[3px] h-[60px] sm:h-[80px] md:h-[100px] bg-[#C6D8E2]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="flex justify-center items-center py-8 sm:py-10 md:py-14 bg-white px-4">
      <div
        className="relative max-w-[610px] w-full bg-[url('/src/assets/images/curve-border.png')] bg-no-repeat bg-contain bg-center text-center pt-0 py-8 sm:py-10 md:py-12 px-4 sm:px-6"
      >
        <h2 className="heading-line text-[#003863] text-[28px] sm:text-[40px] md:text-[55px]">
          Explore Our Pet Services
        </h2>
        <p className="text-[#003863]  heading-text font-bold text-[14px] sm:text-[16px] md:text-[20px]">
          We offer the best services for your pets, contact us today <br className="hidden md:block" />
          and book a service
        </p>
      </div>
    </section>
    <div className="container mx-auto pb-8 sm:pb-10 md:pb-14 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-[65px]">
        <div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            {/* <!-- Background Image --> */}
            <img
              src="src/assets/images/pet1.png"
              alt="Dogs"
              className="w-full h-auto object-cover"
            />

            {/* <!-- Top-right small image --> */}
            <div className="absolute top-3 right-3">
              <img
                src="src/assets/images/icon1.png"
                alt="Dog Icon"
                className="w-25 h-25 p-1 rounded-full bg-[#E1EEF4]"
              />
            </div>

            {/* <!-- Bottom label --> */}
            <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[24px] sm:text-[32px] md:text-[40px] bottom-0 left-0 bg-[#fff] pt-[12px] sm:pt-[16px] md:pt-[20px] pb-[12px] sm:pb-[16px] md:pb-[20px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#003863] heading-line hover:bg-[#003863] hover:text-[#fff] transition">
              Knowledge Hub
              <span className="absolute right-[12px] sm:right-[18px] md:right-[24px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm"><img src="src/assets/images/love.png" alt="" className="w-[20px] sm:w-[25px] md:w-auto" /></span>
            </button>
          </div>
        </div>
        <div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            {/* <!-- Background Image --> */}
            <img
              src="src/assets/images/pet2.png"
              alt="Dogs"
              className="w-full h-auto object-cover"
            />

            {/* <!-- Top-right small image --> */}
            <div className="absolute top-3 right-3">
              <img
                src="src/assets/images/icon2.png"
                alt="Dog Icon"
                className="w-25 h-25 p-2 rounded-full bg-[#003863]"
              />
            </div>

            {/* <!-- Bottom label --> */}
            <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[24px] sm:text-[32px] md:text-[40px] bottom-0 left-0 bg-[#fff] pt-[12px] sm:pt-[16px] md:pt-[20px] pb-[12px] sm:pb-[16px] md:pb-[20px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#003863] heading-line hover:bg-[#003863] hover:text-[#fff] transition">
              AI Agent
              <span className="absolute right-[12px] sm:right-[20px] md:right-[35px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm"><img src="src/assets/images/start 2.png" alt="" className="w-[20px] sm:w-[25px] md:w-auto" /></span>
            </button>
          </div>
        </div>
        <div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            {/* <!-- Background Image --> */}
            <img
              src="src/assets/images/pet3.png"
              alt="Dogs"
              className="w-full h-auto object-cover"
            />

            {/* <!-- Top-right small image --> */}
            <div className="absolute top-3 right-3">
              <img
                src="src/assets/images/icon3.png"
                alt="Dog Icon"
                className="w-25 h-25 p-1 rounded-full bg-[#E1EEF4]"
              />
            </div>

            {/* <!-- Bottom label --> */}
            <button className="absolute w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] text-[24px] sm:text-[32px] md:text-[40px] bottom-0 left-0 bg-[#fff] pt-[12px] sm:pt-[16px] md:pt-[20px] pb-[12px] sm:pb-[16px] md:pb-[20px] rounded-tr-[20px] sm:rounded-tr-[25px] md:rounded-tr-[30px] text-[#003863] heading-line hover:bg-[#003863] hover:text-[#fff] transition">
              Knowledge Hub
              <span className="absolute right-[12px] sm:right-[16px] md:right-[20px] top-[5px] sm:top-[8px] md:top-[10px] text-white text-sm"><img src="src/assets/images/vedio.png" alt="" className="w-[20px] sm:w-[25px] md:w-auto" /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <section className="bg-[url('/src/assets/images/bg-image.png')] bg-cover py-14 sm:py-20 md:py-28 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8">
          <div className="max-w-[650px]">
            <span className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] font-semibold relative">Our Story <img className="absolute bottom-[10px] left-[75px] sm:left-[85px] md:left-[95px] w-[15px] sm:w-[18px] md:w-auto" src="src/assets/images/love1.png" alt="" /></span>
            <h2 className="text-[#003863] heading-line text-[55px] pt-2 pb-2">We are a fully committed to your pet’s well-being</h2>
            <h4 className="text-[#003863] text-[22px] font-semibold pb-3">Healthy pets, happy hearts, smarter owners!</h4>
            <p className="text-[#003863] text-[20px] font-normal">For over 12 years, we’ve been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn’t just a client – they’re family.</p>
            <button className="flex items-center bg-[#003863] text-white font-semibold text-lg rounded-full pl-6 pr-[2px] pt-[2px] pb-[2px] mt-7 hover:bg-[#002a5c] transition">
              Learn More
              <span className="ml-3 flex items-center justify-center w-[49px] h-[49px] bg-[#D4E7F6] rounded-full border-[3px] border-[#04528E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#003863]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
          <div>
            <img src="src/assets/images/our-story.png" alt="Our Story Image" className="w-full h-auto rounded-3xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
    <section className="flex justify-center items-center py-14 bg-white">
      <div className="relative max-w-[740px] w-full bg-[url('/src/assets/images/curve-border2.png')] bg-no-repeat bg-contain bg-center text-center pt-0 pb-[36px] px-6">
        <h2 className="heading-line text-[#003863] text-[55px]">
          Smart Learning for Happier Pets
        </h2>
        <p className="text-[#003863]  heading-text font-bold text-[20px]">
          Learn. Love. Care — Smarter Pet Parenting <br className="hidden md:block" />
          Starts Here.
        </p>
      </div>
    </section>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto pb-8 sm:pb-10 md:pb-14">
        <div className="text-center md:text-end">
          <img src="src/assets/images/book.png" className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto md:mx-0 md:ml-auto" alt="" />
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
    <div className="bg-[url('/src/assets/images/bg2.png')] bg-cover py-10 sm:py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div>
          <span className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] font-semibold relative">Testmonials <img className="absolute bottom-[10px] left-[90px] sm:left-[100px] md:left-[110px] w-[15px] sm:w-[18px] md:w-auto" src="src/assets/images/love1.png" alt="" /></span>
          <h2 className="text-[#003863] heading-line text-[32px] sm:text-[42px] md:text-[55px] pt-2 pb-2">Happy Clients Reviews</h2>
          <h4 className="text-[#003863] text-[16px] sm:text-[18px] md:text-[22px] font-semibold pb-3">Smart Care for Happier Pets</h4>
        </div>
        <div className="pt-6 sm:pt-8 md:pt-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-tl-[30px] rounded-tr-[30px] shadow-md overflow-hidden hover:shadow-xl transition p-[31px] pb-[16px]">
                <p className="relative text-center text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                <span className="absolute text-[44px] top-0 text-[#003863] colon">“</span>
              </div>
              <div className="bg-white rounded-br-[30px] rounded-bl-[30px] pt-[14px] pb-[14px] text-center border-t-[1px] border-[#B2CADB] flex items-center justify-center gap-4">
                <img src="src/assets/images/test.png" alt="" />
                <h5 className="heading-line text-[32px]">Lillian</h5>
                <p className="text-[20px] border-l-[1px] border-[#B2CADB] pl-[12px]">UK</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-center gap-6 mt-6">
            <button className="custom-prev">
              <i className="bi bi-arrow-left text-[#003863] text-[28px]"></i>
            </button>
            <button className="custom-next">
              <i className="bi bi-arrow-right text-[#003863] text-[28px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
}

export default HomePage

