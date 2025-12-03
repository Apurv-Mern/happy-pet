import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/I18nContext'

// Contact info
const footerContact = {
  email: 'Youremailid@gmail.com',
  phone: '6789456874587',
}

// Footer link component
const FooterLink = ({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) => (
  <Link
    to={to}
    className="opacity-90 hover:opacity-100 hover:underline transition-all"
  >
    {children}
  </Link>
)

// Social Icon component
const SocialIcon = ({
  Icon,
  label,
  href,
}: {
  Icon: any
  label: string
  href: string
}) => (
  <a
    href={href}
    aria-label={label}
    className="hover:opacity-80 transition-opacity text-white"
  >
    <Icon />
  </a>
)

export function Footer() {
  const { t } = useTranslation()

  // Menus
  const mainMenu = [
    { label: t('header.home'), path: '/' },
    { label: t('header.about'), path: '/about' },
    { label: t('header.faqs'), path: '/faqs' },
    { label: t('header.contact'), path: '/contact' },
  ]

  const menu = [
    { label: t('header.knowledgeHub'), path: '/knowledge-hub' },
    { label: t('header.learningModule'), path: '/learning-module' },
    { label: t('header.aiAgent'), path: '/ai-agent' },
  ]

  // ⭐ SOCIAL ICONS AS SVG ⭐
  const social = [
    {
      label: 'Facebook',
      href: '#',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1168_10985)">
            <path
              d="M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1168_10985">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1168_10987)">
            <path
              d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
              fill="white"
            />
            <path
              d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
              fill="white"
            />
            <path
              d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1168_10987">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1168_10988)">
            <path
              d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1168_10988">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-[#003863] bg-[url('/assets/images/footer-image.png')] bg-cover bg-center text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-10 divide-x-0  lg:divide-x">
          
          {/* Brand Section */}
          <div className="space-y-4 pr-0 md:pr-10">
            <img src="/assets/images/logo2.png" alt="" />
            <p className="text-sm opacity-90 mt-4">{t('footer.description')}</p>
          </div>

          {/* Main Menu */}
          <div className="text-center sm:text-justify lg:text-justify pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="font-semibold mb-4">{t('footer.mainMenu')}</h3>
            <ul className="space-y-3 text-sm">
              {mainMenu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div className="text-center sm:text-justify lg:text-justify pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="font-semibold mb-4">{t('footer.menu')}</h3>
            <ul className="space-y-3 text-sm">
              {menu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-justify lg:text-justify pl-0 lg:pl-10">
            <h3 className="font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="justify-center sm:justify-start lg:justify-start flex items-center gap-2 opacity-90">
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.5025 12.584C23.5025 10.612 22.8433 8.68954 21.6174 7.08659C20.3916 5.48364 18.6606 4.28076 16.6677 3.64687C14.6749 3.01299 12.5201 2.97995 10.5062 3.5524C8.49219 4.12484 6.72018 5.27402 5.43899 6.83853C4.1578 8.40303 3.4318 10.3043 3.36294 12.2752C3.29408 14.2462 3.88582 16.1879 5.05507 17.8276C6.22431 19.4672 7.91231 20.7225 9.88201 21.4172C11.8517 22.1118 14.0041 22.2109 16.037 21.7005" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <ellipse cx="13.43" cy="12.5841" rx="4.47667" ry="4.19469" stroke="white" stroke-width="2"/>
              <path d="M17.9066 9.43811V13.9809C17.9066 15.5261 19.1593 16.7788 20.7045 16.7788C22.2498 16.7788 23.5024 15.5261 23.5024 13.9809V12.5841" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
                <a href={`mailto:${footerContact.email}`} className="hover:underline">
                  {t('footer.email')}
                </a>
              </li>
              <li className="justify-center sm:justify-start lg:justify-start flex items-center gap-2 opacity-90">                
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z" fill="white"/>
              </svg>
                <a href={`tel:${footerContact.phone}`} className="hover:underline">
                  {t('footer.phone')}
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="justify-center sm:justify-start lg:justify-start flex items-center gap-4 mt-6">
              {social.map(item => (
                <SocialIcon
                  key={item.label}
                  Icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-[#002947] border-t border-[#004266]">
        <div className="mx-auto max-w-[1400px] px-6 py-4 text-center">
          <p className="text-sm opacity-90">
            © 2025 Happypet.com {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
