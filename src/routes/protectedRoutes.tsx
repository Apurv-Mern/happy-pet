import { lazy } from 'react'
import { RouteObject, Outlet } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Layout } from '@/components/Layout'

// Lazy load all protected pages with optimized chunk loading
const ProfilePage = lazy(
  () => import(/* webpackChunkName: "profile" */ '@/pages/ProfilePage')
)
const KnowledgeHubPage = lazy(
  () =>
    import(/* webpackChunkName: "knowledge-hub" */ '@/pages/KnowledgeHubPage')
)
const CategorySubPage = lazy(
  () =>
    import(/* webpackChunkName: "knowledge-hub" */ '@/pages/CategorySubPage')
)
const SubCategoryItem = lazy(
  () =>
    import(/* webpackChunkName: "knowledge-hub" */ '@/pages/SubCategoryItem')
)
const LearningModePage = lazy(
  () => import(/* webpackChunkName: "learning" */ '@/pages/LearningModePage')
)
const LearningModuleCategoryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "learning" */ '@/pages/LearningModuleCategoryPage'
    )
)
const LearningModuleSubCategoryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "learning" */ '@/pages/LearningModuleSubCategoryPage'
    )
)
const AiAgentPage = lazy(
  () => import(/* webpackChunkName: "ai-agent" */ '@/pages/AiAgentPage')
)
const VideoDetailPage = lazy(
  () => import(/* webpackChunkName: "video" */ '@/pages/VideoDetailsPage')
)

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/knowledge-hub',
            element: <KnowledgeHubPage />,
          },
          {
            path: '/knowledge-hub/:categoryId',
            element: <CategorySubPage />,
          },
          {
            path: '/knowledge-hub/:categoryId/:tierId',
            element: <SubCategoryItem />,
          },
          {
            path: '/knowledge-hub/:categoryId/:tierId/:subcategoryId',
            element: <SubCategoryItem />,
          },
          {
            path: '/learning-module',
            element: <LearningModePage />,
          },
          {
            path: '/learning-module/:categoryId',
            element: <LearningModuleCategoryPage />,
          },
          {
            path: '/learning-module/:categoryId/:tierId',
            element: <LearningModuleSubCategoryPage />,
          },
          {
            path: '/learning-module/:categoryId/:tierId/:subcategoryId',
            element: <LearningModuleSubCategoryPage />,
          },
          {
            path: '/ai-agent',
            element: <AiAgentPage />,
          },
          {
            path: '/knowledge-hub/video/:videoId',
            element: <VideoDetailPage />,
          },
        ],
      },
    ],
  },
]
