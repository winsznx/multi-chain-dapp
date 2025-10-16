import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Send, Plus, Trash2, Upload, Download, AlertCircle } from 'lucide-react';
import { getChainMetadata } from '@/config/chains';
import toast from 'react-hot-toast';

const RecipientRow = ({ recipient, index, onChange, onRemove }) => (
  <div className="flex flex-col md:flex-row gap-3 p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg">
    <div className="flex-1">
      <input
        type="text"
        placeholder="Recipient address (0x...)"
        value={recipient.address}
        onChange={(e) => onChange(index, 'address', e.target.value)}
        className="input"
      />
    </div>
    <div className="w-full md:w-40">
      <input
        type="number"
        placeholder="Amount"
        value={recipient.amount}
        onChange={(e) => onChange(index, 'amount', e.target.value)}
        className="input"
        step="0.000001"
        min="0"
      />
    </div>
    <button
      onClick={() => onRemove(index)}
      className="btn-secondary md:w-auto px-4"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

export default function BatchTransaction() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [recipients, setRecipients] = useState([
    { address: '', amount: '' }
  ]);
  const [tokenType, setTokenType] = useState('native');
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentChain = getChainMetadata(chainId);

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '' }]);
  };

  const removeRecipient = (index) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index, field, value) => {
    const updated = [...recipients];
    updated[index][field] = value;
    setRecipients(updated);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        const parsed = lines.slice(1).map(line => {
          const [address, amount] = line.split(',');
          return { address: address.trim(), amount: amount.trim() };
        });
        
        if (parsed.length > 0) {
          setRecipients(parsed);
          toast.success(`Loaded ${parsed.length} recipients`);
        }
      } catch (error) {
        toast.error('Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csv = 'address,amount\n0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb,0.1\n0x123...,0.2';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch-transfer-template.csv';
    a.click();
  };

  const calculateTotal = () => {
    return recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const validRecipients = recipients.filter(r => r.address && r.amount);
    if (validRecipients.length === 0) {
      toast.error('Please add at least one valid recipient');
      return;
    }

    if (tokenType === 'erc20' && !tokenAddress) {
      toast.error('Please enter token contract address');
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Batch transaction sent successfully!');
      // Reset form
      setRecipients([{ address: '', amount: '' }]);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Send size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to send batch transactions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Batch Transfer</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          Send tokens to multiple addresses in a single transaction on {currentChain?.name}
        </p>
      </div>

      {/* Network Warning */}
      <div className="card bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Network: {currentChain?.name}
            </p>
            <p className="text-yellow-700 dark:text-yellow-300">
              Make sure you're on the correct network before sending transactions
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Type Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Token Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTokenType('native')}
              className={`p-4 rounded-lg border-2 transition-all ${
                tokenType === 'native'
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                  : 'border-light dark:border-dark hover:border-purple-300'
              }`}
            >
              <p className="font-semibold">Native Token</p>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mt-1">
                {currentChain?.nativeCurrency.symbol}
              </p>
            </button>
            <button
              type="button"
              onClick={() => setTokenType('erc20')}
              className={`p-4 rounded-lg border-2 transition-all ${
                tokenType === 'erc20'
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                  : 'border-light dark:border-dark hover:border-purple-300'
              }`}
            >
              <p className="font-semibold">ERC20 Token</p>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mt-1">
                Custom token
              </p>
            </button>
          </div>

          {tokenType === 'erc20' && (
            <div className="mt-4">
              <label className="label">Token Contract Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="input"
              />
            </div>
          )}
        </div>

        {/* Recipients */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recipients</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadTemplate}
                className="btn-ghost flex items-center gap-2 text-sm"
              >
                <Download size={16} />
                Template
              </button>
              <label className="btn-ghost flex items-center gap-2 text-sm cursor-pointer">
                <Upload size={16} />
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            {recipients.map((recipient, index) => (
              <RecipientRow
                key={index}
                recipient={recipient}
                index={index}
                onChange={updateRecipient}
                onRemove={removeRecipient}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addRecipient}
            className="btn-outline w-full mt-4 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Recipient
          </button>
        </div>

        {/* Summary */}
        <div className="card-purple">
          <h2 className="text-lg font-semibold mb-4">Transaction Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Recipients</span>
              <span className="font-semibold">{recipients.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-semibold">
                {calculateTotal().toFixed(6)} {tokenType === 'native' ? currentChain?.nativeCurrency.symbol : 'tokens'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Gas</span>
              <span className="font-semibold">~0.005 {currentChain?.nativeCurrency.symbol}</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total Cost</span>
              <span className="font-bold">
                {(calculateTotal() + 0.005).toFixed(6)} {currentChain?.nativeCurrency.symbol}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Batch Transaction
            </>
          )}
        </button>
      </form>
    </div>
  );
}