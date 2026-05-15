import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/auth-layout';

import MainLayout from '@/app/layouts/main-layout';

import ProtectedRoute from './protected-route';

import LoginPage from '@/features/auth/pages/login-page';
import RegisterPage from '@/features/auth/pages/register-page';
import DashboardPage from '@/features/dashboard/pages/dashboard';
import AppInit from '../init/app-init';
import StudentPage from '@/features/students/pages/student-page';
import UserProfilePage from '@/features/users/pages/user-profile-page';
import TeacherPage from '@/features/teachers/pages/teacher-page';

export const router = createBrowserRouter([
  /******************** AUTH *********************/
  {
    element: <ProtectedRoute requireAuth={false} />,
    children: [
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
            element: <UserProfilePage />,
          },
          {
            path: 'students',
            element: <StudentPage />,
          },
          {
            path: 'teachers',
            element: <TeacherPage />,
          },
        ],
      },
    ],
  },
]);
