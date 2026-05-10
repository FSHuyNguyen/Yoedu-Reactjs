import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/auth-layout';

import MainLayout from '@/app/layouts/main-layout';

import ProtectedRoute from './protected-route';

import LoginPage from '@/features/auth/pages/login-page';
import RegisterPage from '@/features/auth/pages/register-page';
import DashboardPage from '@/features/dashboard/pages/Dashboard';
import ProfilePage from '@/features/profile/pages/profile-page';
import AppInit from '../init/app-init';

export const router = createBrowserRouter([
  /******************** AUTH *********************/
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },

  /******************** MAIN *********************/
  {
    element: <ProtectedRoute />,

    children: [
      {
        path: '/',

        element: (
          <AppInit>
            <MainLayout />
          </AppInit>
        ),
        children: [
          {
            index: true,

            element: <DashboardPage />,
          },
          {
            path: 'profile',

            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
