import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Settings as SettingsIcon, Save, RefreshCw } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function Settings() {
  const { isConnected } = useAccount();
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const [enableTestnet, setEnableTestnet] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    setEnableTestnet(true);
    setEnableNotifications(true);
    toast.success('Settings reset to defaults');
  };

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <SettingsIcon size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to access settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          Manage your application preferences
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Theme</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={setLightTheme}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                    : 'border-light dark:border-dark hover:border-purple-300'
                }`}
              >
                <div className="w-full h-20 bg-white border border-gray-200 rounded mb-2" />
                <p className="font-semibold">Light</p>
              </button>
              <button
                onClick={setDarkTheme}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                    : 'border-light dark:border-dark hover:border-purple-300'
                }`}
              >
                <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded mb-2" />
                <p className="font-semibold">Dark</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Network Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Testnets</p>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Show testnet networks
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableTestnet}
                onChange={(e) => setEnableTestnet(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save size={20} />
          Save Settings
        </button>
        <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={20} />
          Reset
        </button>
      </div>
    </div>
  );
}
