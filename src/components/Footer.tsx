import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

const footerContact = {
  email: 'Youremailid@gmail.com',
  phone: '6789456874587',
}

// Reusable components
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

const SocialIcon = ({
  svg,
  label,
  href,
}: {
  svg: any
  label: string
  href: string
}) => (
  <a
    href={href}
    className="hover:opacity-80 transition-opacity"
    aria-label={label}
  >
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
  const social = [
    { icon: FaFacebookF, label: 'Facebook', href: '#' },
    { icon: FaXTwitter, label: 'Twitter', href: '#' },
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  ]
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
                  href={`mailto:${footerContact.email}`}
                  className="hover:underline"
                >
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${footerContact.phone}`}
                  className="hover:underline"
                >
                  {t('footer.phone')}
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6">
              {social.map(social => (
                <SocialIcon
                  key={social.label}
                  svg={social.icon}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </div>
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
