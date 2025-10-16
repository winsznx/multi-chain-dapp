import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AppKitProvider from '@/components/wallet/AppKitProvider';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Portfolio from '@/pages/Portfolio';
import Deployments from '@/pages/Deployments';
import BatchTransaction from '@/pages/BatchTransaction';
import Verification from '@/pages/Verification';
import History from '@/pages/History';
import Bridge from '@/pages/Bridge';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AppKitProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/deployments" element={<Deployments />} />
              <Route path="/batch-transaction" element={<BatchTransaction />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/history" element={<History />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppKitProvider>
    </ThemeProvider>
  );
}

export default App;
