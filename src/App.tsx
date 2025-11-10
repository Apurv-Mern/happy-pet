import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignupPage } from './pages/SignUpPage.tsx'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.tsx'
import { ChangeLanguagePage } from './pages/ChangeLanguagePage.tsx'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { FAQPage } from './pages/FAQPage.tsx'
import { ContactUsPage } from './pages/ContactUsPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import KnowledgeHubPage from './pages/KnowledgeHubPage.tsx'
import AiAgentPage from './pages/AiAgentPage.tsx'
import LearningModePage from './pages/LearningModePage.tsx'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
            <Route path="/learning-module" element={<LearningModePage />} />
            <Route path="/ai-agent" element={<AiAgentPage />} />
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
