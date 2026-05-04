import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/app/layouts/MainLayout';

import Dashboard from '@/features/dashboard/pages';
import Student from '@/features/students/pages';
import Course from '@/features/courses/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // route "/"
        element: <Dashboard />,
      },
      {
        path: 'students',
        element: <Student />,
      },
      {
        path: 'courses',
        element: <Course />,
      },
    ],
  },
]);
