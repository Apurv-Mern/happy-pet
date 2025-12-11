import { useTranslation } from '@/contexts/I18nContext'

const ManufacturingProcess = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-[url('/assets/images/background.png')] bg-contain bg-center">
        <div>
          <img src="/assets/images/process.png" className="w-full" alt="" />
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] text-center">
              {t('aboutPage.manufacturingTitle')}
            </h4>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] text-center font-semibold">
              {t('aboutPage.manufacturingIntro')}
            </p>
            <div className="flex justify-center py-10">
              <img
                src="/assets/images/process1.png"
                className="w-full max-w-4xl"
                alt=""
              />
            </div>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] text-center font-semibold">
              {t('aboutPage.manufacturingProcess2')}
            </p>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_60%] xl:grid-cols-[40%_60%] 2xl:grid-cols-[40%_60%] items-center">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/process01.png"
                className="w-full max-w-[500px]"
                alt=""
              />
            </div>
            <div>
              <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.farmYard')}
              </h2>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-bold">
                {t('aboutPage.farmYardSubtitle')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] mt-5">
                {t('aboutPage.farmYardText')}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_40%] xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_40%] items-center">
              <div>
                <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.delivery')}
                </h2>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-bold">
                  {t('aboutPage.deliverySubtitle')}
                </p>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] mt-5">
                  {t('aboutPage.deliveryText')}
                </p>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/process02.png"
                  className="w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_60%] xl:grid-cols-[40%_60%] 2xl:grid-cols-[40%_60%] items-center">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/process03.png"
                className="w-full max-w-[500px]"
                alt=""
              />
            </div>
            <div>
              <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.millMixer')}
              </h2>
              <p className="text-[#003863] sm:text-[16px] md:text-[20px] font-bold">
                {t('aboutPage.millMixerSubtitle')}
              </p>
              <p className="text-[#003863] sm:text-[16px] md:text-[20px] mt-5">
                {t('aboutPage.millMixerText')}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_40%] xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_40%] items-center">
              <div>
                <h2 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.thermostufenmix')}
                </h2>
                <p className="text-[#003863] sm:text-[16px] md:text-[20px] font-bold">
                  {t('aboutPage.thermostufenmixSubtitle')}
                </p>
                <p className="text-[#003863] sm:text-[16px] md:text-[20px] mt-5">
                  {t('aboutPage.thermostufenmixText')}
                </p>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/process04.png"
                  className="w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_60%] xl:grid-cols-[40%_60%] 2xl:grid-cols-[40%_60%] items-center">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/process05.png"
                className="w-full max-w-[500px]"
                alt=""
              />
            </div>
            <div>
              <h2 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.dryingRefining')}
              </h2>
              <p className="text-[#003863] sm:text-[16px] md:text-[20px] font-bold">
                {t('aboutPage.dryingRefiningSubtitle')}
              </p>
              <p className="text-[#003863] sm:text-[16px] md:text-[20px] mt-5">
                {t('aboutPage.dryingRefiningText')}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_40%] xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_40%] items-center">
              <div>
                <h2 className="heading-line text-[#003863] text-[38px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.checkPack')}
                </h2>
                <p className="text-[#003863] sm:text-[16px] md:text-[20px] font-bold">
                  {t('aboutPage.checkPackSubtitle')}
                </p>
                <p className="text-[#003863] sm:text-[16px] md:text-[20px] mt-5">
                  {t('aboutPage.checkPackText')}
                </p>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/process06.png"
                  className="w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManufacturingProcess
