import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// Lazy load all public pages with optimized chunk loading
const HomePage = lazy(() =>
  import(/* webpackChunkName: "home" */ '@/pages/HomePage').then(module => ({
    default: module.HomePage,
  }))
)
const LoginPage = lazy(() =>
  import(/* webpackChunkName: "auth" */ '@/pages/LoginPage').then(module => ({
    default: module.LoginPage,
  }))
)
const SignupPage = lazy(() =>
  import(/* webpackChunkName: "auth" */ '@/pages/SignUpPage').then(module => ({
    default: module.SignupPage,
  }))
)
const VerifyEmailPage = lazy(() =>
  import(/* webpackChunkName: "auth" */ '@/pages/VerifyEmailPage').then(
    module => ({ default: module.VerifyEmailPage })
  )
)
const ForgotPasswordPage = lazy(() =>
  import(/* webpackChunkName: "auth" */ '@/pages/ForgotPasswordPage').then(
    module => ({ default: module.ForgotPasswordPage })
  )
)
const ResetPasswordPage = lazy(() =>
  import(/* webpackChunkName: "auth" */ '@/pages/ResetPasswordPage').then(
    module => ({ default: module.ResetPasswordPage })
  )
)
const FAQPage = lazy(() =>
  import(/* webpackChunkName: "static-pages" */ '@/pages/FAQPage').then(
    module => ({ default: module.FAQPage })
  )
)
const ContactUsPage = lazy(() =>
  import(/* webpackChunkName: "static-pages" */ '@/pages/ContactUsPage').then(
    module => ({ default: module.ContactUsPage })
  )
)
const AboutUsPage = lazy(
  () => import(/* webpackChunkName: "about" */ '@/pages/AboutUsPage')
)
const SocialCommitment = lazy(
  () => import(/* webpackChunkName: "about" */ '@/pages/about/SocialCommitment')
)
const NutritionalConcept = lazy(
  () =>
    import(/* webpackChunkName: "about" */ '@/pages/about/NutritionalConcept')
)
const ManufacturingProcess = lazy(
  () =>
    import(/* webpackChunkName: "about" */ '@/pages/about/ManufacturingProcess')
)
const BrandHistory = lazy(
  () => import(/* webpackChunkName: "about" */ '@/pages/about/BrandHistory')
)

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/faqs',
    element: <FAQPage />,
  },
  {
    path: '/contact',
    element: <ContactUsPage />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
  {
    path: '/about/social-commitment',
    element: <SocialCommitment />,
  },
  {
    path: '/about/nutritional-concept',
    element: <NutritionalConcept />,
  },
  {
    path: '/about/manufacturing-process',
    element: <ManufacturingProcess />,
  },
  {
    path: '/about/brand-history',
    element: <BrandHistory />,
  },
]
