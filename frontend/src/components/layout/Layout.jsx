import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      
      <main className="container-custom py-6 md:py-8 overflow-x-hidden">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-gray-900 dark:text-gray-100',
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <style>{`
        :root {
          --toast-bg: #ffffff;
          --toast-color: #1e293b;
          --toast-border: #e2e8f0;
        }
        .dark {
          --toast-bg: #111827;
          --toast-color: #f9fafb;
          --toast-border: #374151;
        }
      `}</style>
    </div>
  );
};

export default Layout;
