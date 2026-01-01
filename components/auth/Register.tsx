import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, Building, Briefcase } from 'lucide-react';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';
import { motion, AnimatePresence } from 'framer-motion';

interface RegisterProps {
  onNavigate: (view: AppView) => void;
}

type RegisterType = 'personal' | 'organization';

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [regType, setRegType] = useState<RegisterType>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate(AppView.LOGIN);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle={regType === 'personal' ? "Join the ultimate speaking ecosystem." : "Empower your team with elite communication tools."}
      onNavigate={onNavigate}
    >
      {/* Registration Type Toggle */}
      <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-8 relative">
        <button 
          onClick={() => setRegType('personal')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all relative z-10 ${regType === 'personal' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <User size={16} /> Personal
        </button>
        <button 
          onClick={() => setRegType('organization')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all relative z-10 ${regType === 'organization' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Building size={16} /> Organization
        </button>
        {/* Animated Slider */}
        <motion.div 
          animate={{ x: regType === 'personal' ? 0 : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-brand-600 rounded-lg shadow-lg shadow-brand-900/20"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {regType === 'personal' ? (
            <motion.div
              key="personal-fields"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                   </div>
                   <input 
                     type="text" 
                     required
                     className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
                     placeholder="John Doe"
                   />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="org-fields"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Organization Name</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                   </div>
                   <input 
                     type="text" 
                     required
                     className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
                     placeholder="e.g. Acme Corp"
                   />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Org Type</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={16} className="text-slate-500" />
                   </div>
                   <select className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none appearance-none text-sm">
                      <option value="corporate">Corporate</option>
                      <option value="edu">Educational</option>
                      <option value="nonprofit">Non-Profit</option>
                      <option value="govt">Government</option>
                   </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">
            {regType === 'personal' ? 'Email Address' : 'Business Email'}
          </label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
               type="email" 
               required
               className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
               placeholder={regType === 'personal' ? "you@example.com" : "admin@company.com"}
             />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Password</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
               type="password" 
               required
               className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
               placeholder="Create a strong password"
             />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <span>{regType === 'personal' ? 'Sign Up' : 'Register Organization'}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
         <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <button 
               onClick={() => onNavigate(AppView.LOGIN)}
               className="text-brand-400 hover:text-brand-300 font-bold hover:underline transition-all"
            >
               Sign In
            </button>
         </p>
      </div>
    </AuthLayout>
  );
};

export default Register;