import { createHashRouter } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import RequireAdmin from '@/features/admin/RequireAdmin';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import ReportPage from '@/pages/ReportPage';
import IssueDetailPage from '@/pages/IssueDetailPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/report', element: <ReportPage /> },
      { path: '/issues/:id', element: <IssueDetailPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/admin/login', element: <LoginPage /> },
      { path: '/admin', element: <RequireAdmin><AdminPage /></RequireAdmin> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
