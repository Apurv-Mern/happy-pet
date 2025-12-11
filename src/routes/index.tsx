import { RouteObject, Navigate } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { protectedRoutes } from './protectedRoutes'

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
