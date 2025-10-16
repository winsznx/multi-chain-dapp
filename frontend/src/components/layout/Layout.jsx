import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
      <Header />
      
      <main className="container-custom py-6 md:py-8">
        <Outlet />
      </main>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
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

      {/* Custom CSS Variables for Toast */}
      <style>{`
        :root {
          --toast-bg: #ffffff;
          --toast-color: #1e293b;
          --toast-border: #e2e8f0;
        }
        .dark {
          --toast-bg: #1e293b;
          --toast-color: #f1f5f9;
          --toast-border: #334155;
        }
      `}</style>
    </div>
  );
};

export default Layout;