import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignupPage } from './pages/SignUpPage.tsx'
import { VerifyEmailPage } from './pages/VerifyEmailPage.tsx'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.tsx'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { FAQPage } from './pages/FAQPage.tsx'
import { ContactUsPage } from './pages/ContactUsPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import KnowledgeHubPage from './pages/KnowledgeHubPage.tsx'
import CategorySubPage from './pages/CategorySubPage.tsx'
import SubCategoryItem from './pages/SubCategoryItem.tsx'
import AiAgentPage from './pages/AiAgentPage.tsx'
import LearningModePage from './pages/LearningModePage.tsx'
import LearningModuleCategoryPage from './pages/LearningModuleCategoryPage.tsx'
import LearningModuleSubCategoryPage from './pages/LearningModuleSubCategoryPage.tsx'
import { Toaster } from './components/ui/toaster'
import VideoDetailPage from './pages/VideoDetailsPage.tsx'
import { Header2 } from './components/Header2.tsx'

function HeaderWrapper() {
  const location = useLocation()
  return location.pathname === '/' ? <Header /> : <Header2 />
}

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUsPage />} />

        <Route>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
            <Route
              path="/knowledge-hub/:categoryId"
              element={<CategorySubPage />}
            />
            <Route
              path="/knowledge-hub/:categoryId/:tierId"
              element={<SubCategoryItem />}
            />
            <Route
              path="/knowledge-hub/:categoryId/:tierId/:subcategoryId"
              element={<SubCategoryItem />}
            />
            <Route path="/learning-module" element={<LearningModePage />} />
            <Route
              path="/learning-module/:categoryId"
              element={<LearningModuleCategoryPage />}
            />
            <Route
              path="/learning-module/:categoryId/:tierId"
              element={<LearningModuleSubCategoryPage />}
            />
            <Route
              path="/learning-module/:categoryId/:tierId/:subcategoryId"
              element={<LearningModuleSubCategoryPage />}
            />
            <Route path="/ai-agent" element={<AiAgentPage />} />
            <Route path="/video/:videoId" element={<VideoDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
