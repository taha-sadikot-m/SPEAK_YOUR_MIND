import React, { useState } from 'react';
import { Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';

interface ResetPasswordProps {
  onNavigate: (view: AppView) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password Reset" 
        subtitle="Your password has been successfully updated."
        onNavigate={onNavigate}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
             <CheckCircle className="text-green-400 w-8 h-8" />
          </div>
          
          <button 
            onClick={() => onNavigate(AppView.LOGIN)}
            className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            Sign In with New Password
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your new password below."
      onNavigate={onNavigate}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">New Password</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
               type="password" 
               required
               className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
               placeholder="New password"
             />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Confirm Password</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
               type="password" 
               required
               className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
               placeholder="Confirm new password"
             />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <span>Reset Password</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;