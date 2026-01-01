import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, ArrowLeft } from 'lucide-react';
import { AppView } from '../../types';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onNavigate: (view: AppView) => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/20 rounded-full blur-[128px] animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => onNavigate(AppView.LANDING)}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group z-20"
      >
        <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </div>
        <span className="text-sm font-medium">Back to Home</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Area */}
        <div className="flex justify-center mb-8">
           <div className="relative group cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative bg-slate-900 p-3 rounded-full text-white border border-slate-700">
                <Mic2 size={32} />
              </div>
           </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
           
           <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-400 text-sm">{subtitle}</p>
           </div>

           {children}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            By continuing, you agree to our <a href="#" className="text-slate-400 hover:text-white underline">Terms of Service</a> and <a href="#" className="text-slate-400 hover:text-white underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;