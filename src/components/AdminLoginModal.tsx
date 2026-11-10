import React, { useState } from 'react';
import { Lock, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@sutideosung.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Private authentication validation
    setTimeout(() => {
      setIsLoading(false);
      if (password === 'kimky22') {
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#F7F6F2] border border-[#DDDAD3] shadow-2xl p-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#777777] hover:text-[#191919] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-[#191919] text-white flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-editorial text-xl font-normal text-[#191919]">
              SUTIDEO CMS
            </h3>
            <p className="text-[11px] uppercase tracking-wider font-mono-sub text-[#777777]">
              ADMINISTRATOR AUTHENTICATION
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-mono-sub text-[#555555] mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDDAD3] text-sm text-[#191919] focus:outline-none focus:border-[#191919] transition-colors font-mono-sub"
              placeholder="admin@sutideosung.com"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-mono-sub text-[#555555] mb-1.5">
              Private Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDDAD3] text-sm text-[#191919] focus:outline-none focus:border-[#191919] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#191919] hover:bg-[#A52B25] text-white text-xs uppercase tracking-widest font-mono-sub font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-center text-[#888888] font-mono-sub uppercase tracking-wider">
          PROTECTED CONTENT SYSTEM · SUTIDEO SUNG
        </p>
      </div>
    </div>
  );
};
