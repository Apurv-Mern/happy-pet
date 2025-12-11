import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/I18nContext'

const SocialCommitment = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-[url('/assets/images/background.png')] bg-contain bg-center">
        <div>
          <img src="/assets/images/social.png" className="w-full" alt="" />
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[60%_40%]">
              <div>
                <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.socialK9Title')}
                </h4>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.socialK9Text')}
                </p>
                <Link
                  to="https://k9-experts.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className=" bg-[#003863] text-[#fff] text-[18px] font-light py-2 px-6 rounded-full mt-8 hover:bg-[#004c82]">
                    {t('aboutPage.moreInfoK9')}
                  </button>
                </Link>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/social01.png"
                  className="rounded-[30px] w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-20">
          <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[40%_60%]">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/social02.png"
                className="rounded-[30px] w-full max-w-[500px] max-h-[400px] object-fill"
                alt=""
              />
            </div>
            <div>
              <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.socialVetTitle')}
              </h4>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                {t('aboutPage.socialVetText')}
              </p>
              <Link
                to="https://www.togev.de/impfen-fuer-afrika/foerdermitglied-werden/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className=" bg-[#003863] text-[#fff] text-[18px] font-light py-2 px-6 rounded-full mt-8 hover:bg-[#004c82]">
                  {t('aboutPage.learnMore')}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[60%_40%]">
              <div>
                <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.socialSOSTitle')}
                </h4>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.socialSOSText')}
                </p>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/social03.png"
                  className="rounded-[30px] w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-semibold">
                {t('aboutPage.educationAfrica')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                {t('aboutPage.educationAfricaText1')}
              </p>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] mt-5">
                {t('aboutPage.educationAfricaText2')}
              </p>
              <ul className="list-disc text-[#003863] pl-6 mt-3 font-normal">
                <li>{t('aboutPage.educationItem1')}</li>
                <li>{t('aboutPage.educationItem2')}</li>
                <li>{t('aboutPage.educationItem3')}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 sm:py-20">
          <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[40%_60%]">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/social04.png"
                className="rounded-[30px] w-full max-w-[500px] max-h-[400px] object-fill"
                alt=""
              />
            </div>
            <div>
              <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.socialFeedDogTitle')}
              </h4>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                {t('aboutPage.socialFeedDogText')}
              </p>
              <Link
                to="https://www.feedadog.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className=" bg-[#003863] text-[#fff] text-[18px] font-light py-2 px-6 rounded-full mt-8 hover:bg-[#004c82]">
                  {t('aboutPage.moreInfoFeedDog')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[60%_40%]">
              <div>
                <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.socialDogsStorks')}
                </h4>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.socialDogsStorksText')}
                </p>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] font-semibold mt-3">
                  {t('aboutPage.programObjectives')}
                </p>
                <ul className="list-disc text-[#003863] pl-6 mt-3 font-normal">
                  <li>{t('aboutPage.objective1')}</li>
                  <li>{t('aboutPage.objective2')}</li>
                  <li>{t('aboutPage.objective3')}</li>
                  <li>{t('aboutPage.objective4')}</li>
                </ul>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/social05.png"
                  className="rounded-[30px] w-full max-w-[500px]"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px] mt-5">
                {t('aboutPage.programUnique')}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-4 sm:py-20">
          <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[40%_60%]">
            <div className="flex justify-center md:justify-center xl:justify-start md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
              <img
                src="/assets/images/social06.png"
                className="rounded-[30px] w-full max-w-[500px] max-h-[400px] object-fill"
                alt=""
              />
            </div>
            <div>
              <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                {t('aboutPage.socialVDHTitle')}
              </h4>
              <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                {t('aboutPage.socialVDHText')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#E3E6ED] py-4 sm:py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-[30px] md:gap-[40px] lg:gap-[0px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[60%_40%]">
              <div>
                <h4 className="heading-line text-[#003863] text-[36px] sm:text-[38px] md:text-[64px]">
                  {t('aboutPage.socialZooTitle')}
                </h4>
                <p className="text-[#003863] text-[16px] sm:text-[16px] md:text-[20px]">
                  {t('aboutPage.socialZooText')}
                </p>
                <Link
                  to="https://www.zoo-augsburg.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className=" bg-[#003863] text-[#fff] text-[18px] font-light py-2 px-6 rounded-full mt-8 hover:bg-[#004c82]">
                    {t('aboutPage.learnMoreZoo')}
                  </button>
                </Link>
              </div>
              <div className="flex justify-center md:justify-center xl:justify-end md:px-[20px] lg:px-[20px] xl:px-[20px] 2xl:px-0">
                <img
                  src="/assets/images/social07.png"
                  className="rounded-[30px] w-full max-w-[500px]"
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

export default SocialCommitment
