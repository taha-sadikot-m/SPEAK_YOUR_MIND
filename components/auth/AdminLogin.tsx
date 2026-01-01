import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { AppView, UserType } from '../../types';
import AuthLayout from './AuthLayout';

interface AdminLoginProps {
  onNavigate: (view: AppView) => void;
  onLoginSuccess?: (type: UserType) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Mock Admin Logic: if email contains 'sys' -> System Admin, else Org Admin
      const email = (e.target as any).email?.value || '';
      const userType = email.includes('sys') ? UserType.SYSTEM_ADMIN : UserType.ORG_ADMIN;
      onLoginSuccess?.(userType);
    }, 1200);
  };

  return (
    <AuthLayout 
      title="Admin Portal" 
      subtitle="Manage platform resources and analytics."
      onNavigate={onNavigate}
    >
      <div className="bg-brand-500/10 border border-brand-500/20 p-4 rounded-xl flex items-center gap-3 mb-6">
        <ShieldCheck className="text-brand-400 shrink-0" size={20} />
        <p className="text-xs text-slate-300">
          Authorized personnel only. This portal is for administrative access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">
            Admin Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-slate-500 group-focus-within:text-brand-400" />
            </div>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" 
              placeholder="admin@speakyourmind.com" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400" />
            </div>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <span>Admin Sign In</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => onNavigate(AppView.LOGIN)} 
          className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
        >
          ← Back to regular login
        </button>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
