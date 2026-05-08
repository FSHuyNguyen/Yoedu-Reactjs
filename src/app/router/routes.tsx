import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '@/features/auth/pages/login/LoginPage';
import RegisterPage from '@/features/auth/pages/register/RegisterPage';

import MainLayout from '@/app/layouts/MainLayout';
import Dashboard from '@/features/dashboard/pages';
import ProtectedRoute from './protected-route';

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

        element: <MainLayout />,

        children: [
          {
            index: true,

            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
