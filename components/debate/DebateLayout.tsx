import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Swords } from 'lucide-react';

interface DebateLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack: () => void;
  accentColor?: string;
}

const DebateLayout: React.FC<DebateLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  onBack,
  accentColor = "text-white"
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-brand-500/30">
       {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-900 via-slate-900/50 to-transparent pointer-events-none -z-10"></div>
      
      {/* Navbar */}
      <nav className="relative z-50 px-6 py-6 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0">
        <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Exit Mode</span>
          </button>
          
          <div className="flex flex-col items-center">
             <h1 className={`font-display font-bold text-xl tracking-tight ${accentColor}`}>{title}</h1>
             {subtitle && <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{subtitle}</span>}
          </div>

          <div className="w-24 flex justify-end">
             <div className="p-2 bg-slate-900 rounded-full border border-slate-800">
                <Swords size={18} className="text-slate-500" />
             </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DebateLayout;