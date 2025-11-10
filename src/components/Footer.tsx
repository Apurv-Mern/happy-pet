import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'
import { Mail, Phone } from 'lucide-react'

// Footer data configuration
const footerData = {
  brand: {
    emoji: '🐕',
    title: ['HAPPY DOG', 'HAPPY CAT'],
    tagline: 'All you feed is love',
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
  social: [
    { icon: FaFacebookF, label: 'Facebook', href: '#' },
    { icon: FaXTwitter, label: 'Twitter', href: '#' },
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  ],
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
  icon: Icon,
  label,
  href,
}: {
  icon: any
  label: string
  href: string
}) => (
  <a
    href={href}
    className="hover:opacity-80 transition-opacity"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </a>
)

export function Footer() {
  return (
    <footer className="bg-[#003863] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 divide-x-0 md:divide-x divide-white/20">
          {/* Brand Section */}
          <div className="space-y-4 pr-0 md:pr-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{footerData.brand.emoji}</span>
              <div className="flex flex-col leading-tight">
                {footerData.brand.title.map((line, i) => (
                  <span key={i} className="text-lg font-bold">
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm italic leading-relaxed opacity-90">
              {footerData.brand.tagline}
            </p>
            <p className="text-sm leading-relaxed opacity-90 mt-4">
              {footerData.brand.description}
            </p>
          </div>

          {/* Main Menu */}
          <div className="pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="text-lg font-semibold mb-4">Main Menu</h3>
            <ul className="space-y-3 text-sm">
              {footerData.mainMenu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div className="pl-0 md:pl-10 pr-0 md:pr-10">
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-3 text-sm">
              {footerData.menu.map(item => (
                <li key={item.path}>
                  <FooterLink to={item.path}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pl-0 md:pl-10">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="hover:underline"
                >
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="hover:underline"
                >
                  {footerData.contact.phone}
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6">
              {footerData.social.map(social => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#002947] border-t border-[#004266]">
        <div className="mx-auto max-w-[1400px] px-6 py-4 text-center">
          <p className="text-sm opacity-90">
            © 2025 Happypet.com All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
