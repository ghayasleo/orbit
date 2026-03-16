import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/app/styles/globals.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { AppProviders } from '@/app/providers/app-providers';
import { createRouter } from '@/app/router';
import { Analytics } from '@vercel/analytics/react';

// We now initialize auth in AppProviders with AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Analytics />
      <RouterProvider router={createRouter()} />
    </AppProviders>
  </StrictMode>,
);
