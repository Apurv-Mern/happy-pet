import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'

// Footer data configuration
const footerData = {
  brand: {
    description: 'Empowering Pet Owners with Knowledge for Happier Pets.',
  },
  mainMenu: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Faqs', path: '/faqs' },
    { label: 'Contact Us', path: '/contact' },
  ],
  menu: [
    { label: 'Knowledge Hub', path: '/knowledge-hub' },
    { label: 'Learning Module', path: '/learning-module' },
    { label: 'AI Agent', path: '/ai-agent' },
  ],
  contact: {
    email: 'Youremailid@gmail.com',
    phone: '6789456874587',
  },

  // 🔥 HERE ARE YOUR SVG ICONS (REPLACE WITH YOUR OWN IF NEEDED)
  social: [
    {
      label: 'Facebook',
      href: '#',
      svg: (
        
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1168_11314)">
        <path d="M13.6327 0C6.10365 0 0 6.10365 0 13.6327C0 20.026 4.40174 25.3907 10.3396 26.8641V17.7989H7.52855V13.6327H10.3396V11.8376C10.3396 7.19754 12.4396 5.04684 16.9951 5.04684C17.8589 5.04684 19.3492 5.21643 19.9589 5.38548V9.16175C19.6371 9.12794 19.0782 9.11104 18.384 9.11104C16.1488 9.11104 15.285 9.9579 15.285 12.1593V13.6327H19.738L18.973 17.7989H15.285V27.1657C22.0354 26.3505 27.266 20.6029 27.266 13.6327C27.2655 6.10365 21.1618 0 13.6327 0Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1168_11314">
        <rect width="27.2655" height="27.2655" fill="white"/>
        </clipPath>
        </defs>
        </svg>

      ),
    },
    {
      label: 'Twitter',
      href: '#',
      svg: (
        
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.82 2.16296H24.6524L16.2796 11.7326L26.1296 24.7547H18.4171L12.3765 16.8568L5.46457 24.7547H1.62977L10.5854 14.5189L1.13623 2.16296H9.04448L14.5047 9.38187L20.82 2.16296ZM19.4749 22.4607H21.5985L7.89057 4.33639H5.6117L19.4749 22.4607Z" fill="white"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      svg: (

        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1168_11316)">
        <path d="M13.6327 2.45496C17.2752 2.45496 17.7066 2.47093 19.1391 2.53484C20.4704 2.59342 21.1893 2.81708 21.6686 3.00346C22.3023 3.24843 22.7603 3.54664 23.2342 4.02059C23.7135 4.49987 24.0064 4.95252 24.2514 5.58623C24.4378 6.06551 24.6614 6.78975 24.72 8.11574C24.7839 9.55357 24.7999 9.98492 24.7999 13.6221C24.7999 17.2646 24.7839 17.6959 24.72 19.1284C24.6614 20.4598 24.4378 21.1787 24.2514 21.658C24.0064 22.2917 23.7082 22.7496 23.2342 23.2236C22.755 23.7029 22.3023 23.9958 21.6686 24.2407C21.1893 24.4271 20.4651 24.6508 19.1391 24.7093C17.7013 24.7733 17.2699 24.7892 13.6327 24.7892C9.99025 24.7892 9.5589 24.7733 8.12639 24.7093C6.79507 24.6508 6.07616 24.4271 5.59688 24.2407C4.96317 23.9958 4.5052 23.6975 4.03125 23.2236C3.55197 22.7443 3.25908 22.2917 3.01411 21.658C2.82773 21.1787 2.60407 20.4544 2.54549 19.1284C2.48159 17.6906 2.46561 17.2593 2.46561 13.6221C2.46561 9.9796 2.48159 9.54825 2.54549 8.11574C2.60407 6.78442 2.82773 6.06551 3.01411 5.58623C3.25908 4.95252 3.55729 4.49455 4.03125 4.02059C4.51052 3.54132 4.96317 3.24843 5.59688 3.00346C6.07616 2.81708 6.8004 2.59342 8.12639 2.53484C9.5589 2.47093 9.99025 2.45496 13.6327 2.45496ZM13.6327 0C9.93167 0 9.46837 0.0159759 8.01456 0.0798794C6.56608 0.143783 5.57025 0.378096 4.70756 0.713589C3.80758 1.06506 3.04607 1.52836 2.28988 2.28988C1.52836 3.04607 1.06506 3.80758 0.713589 4.70223C0.378096 5.57025 0.143783 6.56076 0.0798794 8.00924C0.0159759 9.46837 0 9.93167 0 13.6327C0 17.3338 0.0159759 17.7971 0.0798794 19.2509C0.143783 20.6994 0.378096 21.6952 0.713589 22.5579C1.06506 23.4579 1.52836 24.2194 2.28988 24.9756C3.04607 25.7318 3.80758 26.2004 4.70223 26.5466C5.57025 26.8821 6.56076 27.1164 8.00924 27.1803C9.46304 27.2442 9.92634 27.2602 13.6274 27.2602C17.3285 27.2602 17.7918 27.2442 19.2456 27.1803C20.6941 27.1164 21.6899 26.8821 22.5526 26.5466C23.4473 26.2004 24.2088 25.7318 24.965 24.9756C25.7212 24.2194 26.1898 23.4579 26.5359 22.5633C26.8714 21.6952 27.1057 20.7047 27.1696 19.2563C27.2335 17.8024 27.2495 17.3391 27.2495 13.6381C27.2495 9.93699 27.2335 9.47369 27.1696 8.01989C27.1057 6.57141 26.8714 5.57558 26.5359 4.71288C26.2004 3.80758 25.7371 3.04607 24.9756 2.28988C24.2194 1.53368 23.4579 1.06506 22.5633 0.718914C21.6952 0.383421 20.7047 0.149108 19.2563 0.0852047C17.7971 0.0159759 17.3338 0 13.6327 0Z" fill="white"/>
        <path d="M13.6326 6.62999C9.76648 6.62999 6.62988 9.76659 6.62988 13.6327C6.62988 17.4989 9.76648 20.6355 13.6326 20.6355C17.4988 20.6355 20.6354 17.4989 20.6354 13.6327C20.6354 9.76659 17.4988 6.62999 13.6326 6.62999ZM13.6326 18.1752C11.1244 18.1752 9.09017 16.141 9.09017 13.6327C9.09017 11.1245 11.1244 9.09027 13.6326 9.09027C16.1409 9.09027 18.1751 11.1245 18.1751 13.6327C18.1751 16.141 16.1409 18.1752 13.6326 18.1752Z" fill="white"/>
        <path d="M22.5471 6.35302C22.5471 7.25832 21.8122 7.98789 20.9122 7.98789C20.0069 7.98789 19.2773 7.253 19.2773 6.35302C19.2773 5.44772 20.0122 4.71815 20.9122 4.71815C21.8122 4.71815 22.5471 5.45305 22.5471 6.35302Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1168_11316">
        <rect width="27.2655" height="27.2655" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      svg: (

        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1168_11317)">
        <path d="M25.2472 0H2.01296C0.899974 0 0 0.878673 0 1.96503V25.2951C0 26.3815 0.899974 27.2655 2.01296 27.2655H25.2472C26.3602 27.2655 27.2655 26.3815 27.2655 25.3005V1.96503C27.2655 0.878673 26.3602 0 25.2472 0ZM8.08912 23.2342H4.0419V10.2192H8.08912V23.2342ZM6.06551 8.44591C4.76614 8.44591 3.71705 7.39683 3.71705 6.10278C3.71705 4.80874 4.76614 3.75965 6.06551 3.75965C7.35955 3.75965 8.40863 4.80874 8.40863 6.10278C8.40863 7.3915 7.35955 8.44591 6.06551 8.44591ZM23.2342 23.2342H19.1923V16.9078C19.1923 15.4007 19.1657 13.457 17.0889 13.457C14.9854 13.457 14.6658 15.1025 14.6658 16.8013V23.2342H10.6293V10.2192H14.5061V11.9979H14.5593C15.0972 10.9754 16.4179 9.89439 18.3829 9.89439C22.4781 9.89439 23.2342 12.589 23.2342 16.093V23.2342Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1168_11317">
        <rect width="27.2655" height="27.2655" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      ),
    },
  ],
}

// Reusable components
const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="opacity-90 hover:opacity-100 hover:underline transition-all"
  >
    {children}
  </Link>
)

const SocialIcon = ({ svg, label, href }: { svg: any; label: string; href: string }) => (
  <a href={href} className="hover:opacity-80 transition-opacity" aria-label={label}>
    {svg}
  </a>
)

export function Footer() {
  const { t } = useTranslation()
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
  // const social = [
  //   { icon: FaFacebookF, label: 'Facebook', href: '#' },
  //   { icon: FaXTwitter, label: 'Twitter', href: '#' },
  //   { icon: FaInstagram, label: 'Instagram', href: '#' },
  //   { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  // ]
  return (
    <footer className="bg-[#003863] bg-[url('/assets/images/footer-image.png')] bg-cover bg-center text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 divide-x-0 md:divide-x divide-white/20">
          {/* Brand Section */}
          <div className="space-y-4 pr-0 md:pr-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-col leading-tight">
                <img src="/assets/images/logo2.png" alt="" />
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90 mt-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Main Menu */}
          <div className="pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.mainMenu')}
            </h3>
            <ul className="space-y-3 text-sm">
              {mainMenu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div className="pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="text-lg font-semibold mb-4">{t('footer.menu')}</h3>
            <ul className="space-y-3 text-sm">
              {menu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pl-0 md:pl-10">
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="hover:underline"
                >
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="hover:underline"
                >
                  {t('footer.phone')}
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            {/* <div className="flex items-center gap-4 mt-6">
              {social?.map(social => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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
