import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, Trophy, Eye, ArrowLeft, LogOut, Swords, Sparkles, Zap, Crown, ChevronRight, Home } from 'lucide-react';
import { AppView } from '../../types';

interface DebateDashboardProps {
  onLogout: () => void;
  onBack: () => void;
  onViewProfile: () => void;
  onNavigate: (view: AppView) => void;
}

const DebateDashboard: React.FC<DebateDashboardProps> = ({ onLogout, onBack, onViewProfile, onNavigate }) => {
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  useEffect(() => {
    // Load current student data from localStorage
    const studentData = localStorage.getItem('current_student');
    if (studentData) {
      setCurrentStudent(JSON.parse(studentData));
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const options = [
    {
      title: "Practice with AI",
      subtitle: "The Dojo",
      description: "Sharpen your arguments against Gemini 2.5 in a safe, judgment-free zone.",
      icon: <Bot size={40} />,
      color: "from-brand-500 to-cyan-400",
      bgGlow: "group-hover:shadow-brand-500/50",
      border: "group-hover:border-brand-500/50",
      delay: 0,
      target: AppView.DEBATE_PRACTICE
    },
    {
      title: "1 vs 1 Battle",
      subtitle: "The Arena",
      description: "Challenge a friend or find a ranked match against real opponents.",
      icon: <Swords size={40} />,
      color: "from-red-500 to-orange-500",
      bgGlow: "group-hover:shadow-red-500/50",
      border: "group-hover:border-red-500/50",
      delay: 0.1,
      target: AppView.DEBATE_PVP
    },
    {
      title: "Live Events",
      subtitle: "The Colosseum",
      description: "Join scheduled tournaments, win seasonal badges, and climb the global ladder.",
      icon: <Trophy size={40} />,
      color: "from-yellow-400 to-amber-600",
      bgGlow: "group-hover:shadow-yellow-500/50",
      border: "group-hover:border-yellow-500/50",
      delay: 0.2,
      target: AppView.DEBATE_EVENTS
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-red-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none -z-10"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 flex justify-between items-center w-full max-w-[95%] 2xl:max-w-[90%] mx-auto">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-3 group cursor-pointer" onClick={onBack}>
             <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
               <div className="relative bg-slate-900 p-2.5 rounded-full text-white border border-slate-700 flex items-center justify-center">
                  <Swords size={20} className="text-red-400 group-hover:text-white transition-colors" />
               </div>
             </div>
             <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">MyDebate</span>
           </div>

           <button 
             onClick={onBack}
             className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-full border border-white/5"
           >
              <Home size={16} />
              <span>Back to Home</span>
           </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center px-4 py-2 bg-slate-900/50 rounded-full border border-slate-800">
             <Crown size={16} className="text-yellow-400 mr-2" />
             <span className="text-sm font-medium text-slate-300">Pro Member</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
          >
            <LogOut size={18} />
            <span className="hidden md:inline text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 pt-4 pb-20">
        
        {/* User Rank Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={onViewProfile}
          className="mb-12 group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-1">
             <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-brand-500 opacity-20 group-hover:opacity-60 transition-opacity duration-500 blur-xl"></div>
             
             <div className="relative bg-slate-950 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* User Info Section */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-2xl border-2 border-slate-700 group-hover:border-white transition-colors">
                        {currentStudent ? getInitials(currentStudent.name) : 'ST'}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 p-1 rounded-lg border-2 border-slate-900 transform group-hover:scale-110 transition-transform">
                         <Crown size={14} className="fill-current" />
                      </div>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Sparkles size={12} className="text-yellow-400"/>
                        Ready for Battle
                      </div>
                      <div className="text-2xl font-display font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-2">
                         {currentStudent ? currentStudent.name : 'Student'} 
                         <ChevronRight size={20} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Current Rank</div>
                      <div className="font-bold text-white flex items-center gap-2">
                         <Crown size={14} className="text-yellow-400 fill-current" />
                         {currentStudent ? currentStudent.tier : 'Unranked'}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Win Rate</div>
                      <div className="font-bold text-green-400">
                        {currentStudent ? `${currentStudent.debateStats.winRate}%` : '0%'}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Debates</div>
                      <div className="font-bold text-white">
                        {currentStudent ? currentStudent.debateStats.totalDebates : '0'}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Avg Score</div>
                      <div className="font-bold text-brand-400">
                        {currentStudent ? currentStudent.debateStats.avgScore.toFixed(1) : '0.0'}
                      </div>
                   </div>
                </div>

                <div className="hidden lg:block">
                   <button className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-red-400 hover:text-white transition-colors">
                      View Full Details
                   </button>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center md:text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Arena Active
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Battleground</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Welcome to the premier debating ecosystem. Select a mode below to begin your session.
          </p>
        </motion.div>

        {/* Options Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {options.map((opt, idx) => (
            <motion.div
              key={idx}
              variants={item}
              onClick={() => onNavigate(opt.target)}
              className="group relative h-[400px] cursor-pointer perspective-1000"
            >
              <div className={`
                absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 
                rounded-3xl border border-white/5 p-8 flex flex-col justify-between
                transition-all duration-500 ease-out
                group-hover:translate-y-[-10px] group-hover:scale-[1.02]
                ${opt.border} shadow-2xl ${opt.bgGlow}
              `}>
                <div className={`absolute inset-0 bg-gradient-to-br ${opt.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                <div>
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${opt.color} 
                    flex items-center justify-center mb-6 shadow-lg 
                    group-hover:scale-110 transition-transform duration-500
                    text-white
                  `}>
                    {opt.icon}
                  </div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-slate-300 transition-colors">{opt.subtitle}</h3>
                  <h2 className="text-2xl font-bold text-white mb-4 font-display">{opt.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {opt.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-6 group-hover:border-white/10">
                   <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">ENTER MODE</span>
                   <div className={`p-2 rounded-full bg-white/5 text-slate-400 group-hover:bg-white group-hover:text-slate-950 transition-all duration-300`}>
                      <Zap size={16} className="fill-current" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </main>
    </div>
  );
};

export default DebateDashboard;