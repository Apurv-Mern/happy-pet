import { useTranslation } from '@/contexts/I18nContext'

const BrandHistory = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-[url('/assets/images/background.png')] bg-contain bg-center">
        <div>
          <img src="/assets/images/brand.png" className="w-full" alt="" />
        </div>
        <div className="bg-[#E3E6ED] py-10">
          <div className="container mx-auto">
            <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] lg:pb-10 text-center">
              {t('aboutPage.brandHistoryTitle')}
            </h4>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-bold mb-4">
              {t('aboutPage.brandHistorySubtitle')}
            </p>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
              {t('aboutPage.brandHistoryIntro')}
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <div>
            <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] pt-10 text-center">
              {t('aboutPage.developmentTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 py-10 items-center relative">
            <div className="">
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[36px] text-[#003860] font-bold">
                  1765
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1765Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1765Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand01.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand02.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1951
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1951Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1951Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1965
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1965Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1965Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand03.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand04.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1970
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1970Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1970Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1973
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1973Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1973Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand05.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand06.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1975
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1975Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1975Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1987
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1987Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1987Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand07.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand08.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  1992
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year1992Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year1992Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2000
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2000Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2000Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand09.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand10.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2001
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2001Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2001Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2004-2006
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year20042006Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year20042006Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand11.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand12.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2009
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2009Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2009Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2015
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2015Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2015Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand13.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand14.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2018
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2018ClimateTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2018ClimateText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2018
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2018GenerationTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2018GenerationText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand15.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand16.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2019
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2019AwardTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2019AwardText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2019
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2019ExportTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2019ExportText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand17.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand18.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2020
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2020CapacityTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2020CapacityText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2020
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2020ProductTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2020ProductText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand19.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand20.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2021
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2021RelaunchTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2021RelaunchText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2021
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2021ProductTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2021ProductText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand21.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand22.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2021
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2021SealTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2021SealText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2022
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2022AwardTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2022AwardText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand23.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand24.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2022
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2022ProductTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2022ProductText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2022
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2022PuppyTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2022PuppyText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand25.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand26.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2022
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2022RatedTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2022RatedText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2023
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2023MiniTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2023MiniText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand27.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand28.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2023
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2023ProductsTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2023ProductsText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2023
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2023SolarTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2023SolarText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand29.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand30.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2023
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2023BestRatedTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2023BestRatedText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
              <svg
                className="absolute hidden sm:hidden md:block lg:block 2xl:block md:w-[200px] md:h-[200px] md:right-[280px] md:-z-10 lg:w-[350px] lg:h-[350px] lg:right-[280px] lg:-z-10 xl:w-[350px] xl:h-[350px] xl:right-[250px] xl:-z-10 2xl:right-[536px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 417.73C362.493 416.845 308.809 405.419 258.537 383.453C208.264 361.487 164.314 331.8 126.687 294.394C89.0601 256.988 59.1434 213.248 36.9372 163.174C14.731 113.101 3.25202 59.5424 2.50024 2.49957"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2023
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2023TopBrandTitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2023TopBrandText')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
            <div className="flex justify-end relative">
              <img
                src="/assets/images/brand31.png"
                className="w-full max-w-[550px]"
                alt=""
              />
              <svg
                className="absolute md:w-[200px] md-h-[200px] md:top-[320px] md:right-[240px] md:-z-10 lg:w-[350px] lg-h-[350px] lg:top-[410px] lg:right-[260px] lg:-z-10 xl:top-[400px] xl:w-[350px] xl:h-[350px] xl:right-[300px] xl:-z-10 2xl:right-[506px] 2xl:w-[500px] 2xl:h-[500px] 2xl:-z-10 2xl:top-[400px] hidden sm:hidden md:block lg:block xl:block 2xl:block"
                viewBox="0 0 423 421"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M419.589 2.5C362.493 3.38558 308.809 14.8115 258.537 36.7777C208.264 58.7439 164.314 88.4301 126.687 125.836C89.0601 163.242 59.1434 206.982 36.9372 257.056C14.731 307.13 3.25202 360.688 2.50024 417.731"
                  stroke="#003863"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="15 15"
                />
              </svg>
            </div>

            <div className="flex justify-start">
              <img
                src="/assets/images/brand32.png"
                className="w-full max-w-[550px]"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[36px] sm:text-[40px] md:text-[70px] text-[#003860] font-bold">
                  2024
                </h3>
                <svg
                  width="149"
                  height="5"
                  viewBox="0 0 149 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="145.914"
                    y2="2.5"
                    stroke="#003860"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>
              <p className="text-[#003863] text-[16px] sm:text-[20px] md:text-[25px] font-bold">
                {t('aboutPage.year2024Title')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] py-2">
                {t('aboutPage.year2024Text')}
              </p>
              <svg
                className="mt-4"
                width="149"
                height="5"
                viewBox="0 0 149 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.5"
                  y1="2.5"
                  x2="145.914"
                  y2="2.5"
                  stroke="#003860"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-10">
          <div className="container mx-auto">
            <h4 className="heading-line text-[#003863] text-[64px] pb-4 text-center">
              {t('aboutPage.packagingTitle')}
            </h4>
            <p className="text-[#003863] text-[20px]">
              {t('aboutPage.packagingText')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrandHistory
