import React from 'react';
import { motion } from 'framer-motion';
import { 
  Swords, Bot, Trophy, Briefcase, Upload, FileText, Users, ArrowRight, 
  Zap, BookOpen, Video, GraduationCap, Heart, DollarSign, Globe,
  ShieldCheck, Sparkles, Calendar, PlayCircle, MessageSquare, CheckCircle, Mic, ChevronRight
} from 'lucide-react';

interface FeaturesProps {
  onNavigateToPlatform: (mode: 'debate' | 'interview' | 'prepare' | 'perform' | string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigateToPlatform }) => {
  return (
    <div className="py-20 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="relative mb-20 md:mb-32 pt-10 text-center">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-brand-900/20 blur-[100px] rounded-full pointer-events-none"></div>
           
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8 md:mb-12"
           >
             <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></span>
             <span className="text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">The SYM Ecosystem</span>
           </motion.div>

           <div className="flex flex-col items-center justify-center">
             <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight md:leading-none max-w-5xl"
             >
                <span className="inline-block text-slate-600 hover:text-slate-400 transition-colors duration-500 cursor-default">PREPARE</span>
                <span className="hidden md:inline-block text-slate-800 mx-2 lg:mx-4">.</span>
                <span className="inline-block md:inline text-slate-300 hover:text-white transition-colors duration-500 cursor-default ml-2 md:ml-0">PRACTICE</span>
                <span className="hidden md:inline-block text-slate-800 mx-2 lg:mx-4">.</span>
                <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-neon-pink animate-shimmer bg-[length:200%_auto] mt-2 md:mt-0">PERFORM</span>
             </motion.h2>
           </div>
        </div>

        {/* --- 1. PREPARE MODULE (Learning & Live Classes) --- */}
        <div id="prepare" className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                 <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400"><BookOpen size={20} /></div>
                    <span className="text-brand-400 font-bold tracking-widest text-xs uppercase">Module 1: Prepare</span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Learning & Live Classes</h3>
                 <p className="text-slate-400 text-lg">Foundation courses designed to build confidence before you enter the arena.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl backdrop-blur-sm flex items-center gap-4 group cursor-pointer hover:border-brand-500/30 transition-all">
                 <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400"><Video size={24} /></div>
                 <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Up Next: Live Session</div>
                    <div className="text-white font-bold">Public Speaking 101 <span className="text-brand-400 ml-2">@ 4:00 PM</span></div>
                 </div>
                 <ChevronRight className="text-slate-700 group-hover:text-white transition-colors" />
              </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                 { id: 'public-speaking', title: "Public Speaking", icon: <Mic size={20}/>, age: "10-18+", outcome: "Voice Modulation & Stage Presence", color: "from-blue-500 to-cyan-400" },
                 { id: 'communication', title: "Communication", icon: <MessageSquare size={20}/>, age: "All Ages", outcome: "Interpersonal & Emotional Intelligence", color: "from-purple-500 to-pink-500" },
                 { id: 'financial-literacy', title: "Financial Literacy", icon: <DollarSign size={20}/>, age: "14-25", outcome: "Budgeting, Investing & Wealth Building", color: "from-emerald-500 to-teal-400" },
                 { id: 'sex-education', title: "Sex Education", icon: <Heart size={20}/>, age: "13-19", outcome: "Health, Consent & Safe Relationships", color: "from-rose-500 to-orange-400" },
                 { id: 'interview-basics', title: "Interview Basics", icon: <Briefcase size={20}/>, age: "18+", outcome: "Corporate Readiness & Professionalism", color: "from-slate-500 to-slate-400" },
              ].map((course, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-full group hover:border-brand-500/30 transition-all"
                 >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20`}>
                       {course.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                    <div className="text-[10px] text-brand-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-1">
                       <Users size={10} /> Age Group: {course.age}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-6">
                       <span className="text-slate-200 font-semibold block mb-1">Outcome:</span>
                       {course.outcome}
                    </p>
                    <button 
                       onClick={() => onNavigateToPlatform(`course-${course.id}`)}
                       className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 text-white text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                       Learn More <ArrowRight size={14} />
                    </button>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* --- 2. PRACTICE MODULE (MyDebate & MyInterview) --- */}
        <div id="practice" className="mb-32">
           <div className="flex items-center space-x-3 mb-12">
              <div className="p-2 bg-accent-500/20 rounded-lg text-accent-400"><Bot size={20} /></div>
              <span className="text-accent-400 font-bold tracking-widest text-xs uppercase">Module 2: Practice</span>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-8">
              {/* MyDebate Card */}
              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 border border-brand-500/20">
                          <Swords size={28} />
                       </div>
                       <h4 className="text-3xl font-display font-bold text-white">MyDebate</h4>
                    </div>
                    <p className="text-slate-300 mb-10 leading-relaxed text-lg max-w-md">
                       Master the art of logic and persuasion. Debate with Gemini 2.5 or enter the live 1:1 arena.
                    </p>
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-brand-400" /> AI-Driven Logical Fallacy Detection</div>
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-brand-400" /> Live Community Adjudication</div>
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-brand-400" /> Real-time Rhetorical Analytics</div>
                    </div>
                    <button 
                       onClick={() => onNavigateToPlatform('debate')}
                       className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
                    >
                       Open Arena <ArrowRight size={18} />
                    </button>
                 </div>
              </div>

              {/* MyInterview Card */}
              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 rounded-2xl bg-accent-500/20 flex items-center justify-center text-accent-400 border border-accent-500/20">
                          <Briefcase size={28} />
                       </div>
                       <h4 className="text-3xl font-display font-bold text-white">MyInterview</h4>
                    </div>
                    <p className="text-slate-300 mb-10 leading-relaxed text-lg max-w-md">
                       Simulate your dream job interview. Upload your resume and get role-specific behavioral training.
                    </p>
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-accent-400" /> Resume & JD Contextual Analysis</div>
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-accent-400" /> Confidence & Pace Evaluation</div>
                       <div className="flex items-center gap-3 text-slate-400"><CheckCircle size={18} className="text-accent-400" /> STAR Method Coaching</div>
                    </div>
                    <button 
                       onClick={() => onNavigateToPlatform('interview')}
                       className="px-8 py-3.5 bg-accent-600 hover:bg-accent-500 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 transition-all flex items-center gap-2"
                    >
                       Enter Studio <ArrowRight size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* --- 3. PERFORM MODULE (Events & Competitions) --- */}
        <div id="perform">
           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div>
                 <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Trophy size={20} /></div>
                    <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase">Module 3: Perform</span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Events & Competitions</h3>
                 <p className="text-slate-400 text-lg max-w-xl">Where training meets reality. Compete in high-stakes environments and win recognition.</p>
              </div>
              <button 
                 onClick={() => onNavigateToPlatform('perform')}
                 className="px-10 py-4 bg-slate-900 border border-yellow-500/30 text-yellow-500 font-bold rounded-full hover:bg-yellow-500 hover:text-slate-950 transition-all shadow-xl shadow-yellow-500/10"
              >
                 View All Events
              </button>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { title: "AI-MUNs", icon: <Globe size={32}/>, desc: "Model United Nations reinvented with AI moderators and real-time policy research assistants.", color: "text-cyan-400" },
                 { title: "Grand Debates", icon: <Swords size={32}/>, desc: "The ultimate 1v1 ladder. Climb the ranks from Bronze to Master Orator in seasonal championships.", color: "text-brand-400" },
                 { title: "Interview Events", icon: <Zap size={32}/>, desc: "Participate in corporate-sponsored interview marathons. Get noticed by recruiters.", color: "text-yellow-400" },
              ].map((item, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900 border border-white/5 rounded-3xl p-8 group relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                       {item.icon}
                    </div>
                    <div className={`mb-6 ${item.color}`}>
                       {item.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed mb-8">
                       {item.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white transition-colors cursor-pointer">
                       SEE REQUIREMENTS <ArrowRight size={14} />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Features;