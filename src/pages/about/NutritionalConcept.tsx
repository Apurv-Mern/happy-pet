import { useTranslation } from '@/contexts/I18nContext'

const NutritionalConcept = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-[url('/assets/images/background.png')] bg-contain bg-center">
        <div>
          <img src="/assets/images/concept.png" className="w-full" alt="" />
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <h4 className="heading-line text-[#003863] text-[30px] sm:text-[38px] md:text-[64px] text-center">
              {t('aboutPage.nutritionalTitle')}
            </h4>
            <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 md:grid-cols-2 lg:gap-[20px] lg:grid-cols-2 xl:grid-cols-2 py-5 xl:gap-[20px] 2xl:grid-cols-3 2xl:gap-[180px] items-baseline">
              <div className="concept-part">
                <img
                  src="/assets/images/block1.png"
                  className="w-full max-w-[450px]"
                  alt=""
                />
                <h5 className="text-[#003863] text-[18px] sm:text-[20px] md:text-[25px] font-bold text-center">
                  {t('aboutPage.naturalIngredients')}
                </h5>
                <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] text-center">
                  {t('aboutPage.naturalIngredientsText1')}
                </p>
              </div>
              <div className="concept-part">
                <img
                  src="/assets/images/block2.png"
                  className="w-full max-w-[450px]"
                  alt=""
                />
                <h5 className="text-[#003863] text-[18px] sm:text-[20px] md:text-[25px] font-bold text-center">
                  {t('aboutPage.naturalIngredients')}
                </h5>
                <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] text-center">
                  {t('aboutPage.naturalIngredientsText2')}
                </p>
              </div>
              <div className="concept-part">
                <img
                  src="/assets/images/block3.png"
                  className="w-full max-w-[450px] flex"
                  alt=""
                />
                <h5 className="text-[#003863] text-[18px] sm:text-[20px] md:text-[25px] font-bold text-center">
                  {t('aboutPage.naturalIngredients')}
                </h5>
                <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] text-center">
                  {t('aboutPage.naturalIngredientsText3')}
                </p>
                <p className="text-[#003863] text-[16px] sm:text-[18px] md:text-[20px] text-center">
                  without the addition of artificial preservatives and
                  independently controlled
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_40%] items-center">
            <div>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-bold">
                {t('aboutPage.philosophyText')}
              </p>
              <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] md:my-3">
                {t('aboutPage.rightPortionMeat')}
              </h2>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                {t('aboutPage.meatDescription')}
              </p>
            </div>
            <div className="flex justify-center md:justify-center xl:justify-end mt-5 sm:mt-5 md:mt-5 lg:mt-0 md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/meat.png"
                className="rounded-[30px] w-full max-w-[500px]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[40%_60%]  2xl:grid-cols-[40%_60%] items-center">
              <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/dogmeal.png"
                  className="rounded-[30px] w-full max-w-[500px]"
                  alt=""
                />
              </div>
              <div>
                <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] md:my-3">
                  {t('aboutPage.natureModel')}
                </h2>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.natureModelText')}
                </p>
              </div>
            </div>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] md:mt-3">
              {t('aboutPage.additionalText')}
            </p>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-20">
          <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] text-center">
            {t('aboutPage.nutritionPropertiesTitle')}
          </h4>
          <div className="grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 py-10 gap-6">
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.selectedHerbs')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.selectedHerbsText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh2.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.apple')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.appleText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh3.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.ginger')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.gingerText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh4.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.seaweed')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.seaweedText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh5.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.greenLippedMussel')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.greenLippedMusselText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh6.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.linseedOil')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.linseedOilText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh7.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.yeastExtracted')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.yeastExtractedText')}
                </span>
              </div>
            </div>
            <div className="sm:border-[2px] sm:border-[#003863] sm:rounded-full sm:px-4 sm:py-2 sm:flex sm:items-center sm:gap-2 rounded-[10px] border-[2px] border-[#003863] px-4 py-2">
              <div className="flex justify-center sm:block">
                <img
                  src="/assets/images/fresh7.png"
                  className="w-full max-w-[70px] max-h-[70px] object-contain"
                  alt=""
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#003863] font-bold">
                  {t('aboutPage.yeastDried')}
                </p>
                <span className="text-[14px] sm:text-[14px] md:text-[16px] text-[#003863]">
                  {t('aboutPage.yeastDriedText')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-[70%_30%]">
              <div>
                <h2 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px] md:my-3">
                  {t('aboutPage.wellCaredTitle')}
                </h2>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.wellCaredText')}
                </p>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-bold my-4">
                  {t('aboutPage.exampleTitle')} <br></br>
                  {t('aboutPage.exampleSubtitle')}
                </p>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  <span className="font-semibold">
                    {t('aboutPage.composition')}
                  </span>
                  <br></br>
                  {t('aboutPage.compositionText')}
                </p>
              </div>
              <div className="flex justify-center md:justify-center">
                <img
                  src="/assets/images/dogfood.png"
                  className="w-full max-w-[400px] max-h-[600px]"
                  alt=""
                />
              </div>
            </div>
            <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] md:mt-3">
              {t('aboutPage.conclusionText')}
            </p>
          </div>
        </div>
        <div className="bg-[url('/assets/images/kutta.png')] bg-cover bg-center pt-[190px] pb-[210px]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div>
                <h2 className="heading-line text-[#fff] text-[38px] sm:text-[38px] md:text-[64px] md:my-3">
                  {t('aboutPage.conclusion')}
                </h2>
                <p className="text-[16px] sm:text-[16px] md:text-[20px] text-[#fff] font-bold">
                  {t('aboutPage.conclusionFinal')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NutritionalConcept
