import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';

interface ForgotPasswordProps {
  onNavigate: (view: AppView) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle="We've sent you instructions to reset your password."
        onNavigate={onNavigate}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
             <CheckCircle className="text-green-400 w-8 h-8" />
          </div>
          <p className="text-slate-300 text-center mb-8 text-sm">
            If an account exists for that email, you will receive a reset link shortly.
          </p>
          
          <button 
            onClick={() => onNavigate(AppView.LOGIN)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl border border-slate-700 transition-colors"
          >
            Back to Sign In
          </button>

          {/* Demo Button to Simulate Clicking Email Link */}
          <button 
             onClick={() => onNavigate(AppView.RESET_PASSWORD)}
             className="mt-6 text-xs text-slate-600 hover:text-brand-400 transition-colors"
          >
             [Demo] Simulate Clicking Reset Link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to reset your password."
      onNavigate={onNavigate}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
               type="email" 
               required
               className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
               placeholder="you@example.com"
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
              <span>Send Reset Link</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="text-center">
          <button 
             type="button"
             onClick={() => onNavigate(AppView.LOGIN)}
             className="text-sm text-slate-400 hover:text-white transition-colors"
          >
             Back to Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;