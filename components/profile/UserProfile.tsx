import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Trophy, Swords, Bot, TrendingUp, Calendar, 
  Target, Zap, Crown, Award, Clock, ChevronRight, Activity,
  Check, X, BarChart, MessageSquare, Brain, ThumbsUp, ThumbsDown,
  AlertTriangle, Lightbulb, GraduationCap, LineChart, Scale, Sparkles, Flame, Layers
} from 'lucide-react';

interface UserProfileProps {
  onBack: () => void;
}

// --- Mock Data Types ---

interface TranscriptItem {
  speaker: 'user' | 'opponent' | 'ai';
  content: string;
  score?: number;
  // AI Specific
  feedback?: string; // Critique of this specific turn
  betterPhrasing?: string; // AI suggestion
  detectedFallacy?: string; // Name of fallacy if committed
}

interface PVPDetails {
  id: string;
  type: 'PVP';
  opponent: string;
  opponentRank: string;
  topic: string;
  date: string;
  result: 'VICTORY' | 'DEFEAT';
  userScore: number;
  opponentScore: number;
  mmrChange: string;
  // Critical Analysis Data
  momentum: number[]; // Array of score differentials per turn (+ for user, - for opponent)
  comparison: {
    category: string;
    userVal: number;
    oppVal: number;
  }[];
  keyClashPoint: string; // Text summary of the turning point
  transcript: TranscriptItem[];
}

interface AIDetails {
  id: string;
  type: 'AI';
  topic: string;
  date: string;
  difficulty: string;
  aiPersona: string;
  overallGrade: string; // S, A, B, C, F
  metrics: {
    logic: number;
    vocabulary: number;
    tone: number;
    fallaciesCommitted: number;
  };
  coachNotes: {
    strength: string;
    improvement: string;
  };
  transcript: TranscriptItem[];
}

// --- Mock Data ---

const MOCK_PVP_MATCH: PVPDetails = {
  id: 'pvp-1042',
  type: 'PVP',
  opponent: 'Sarah_Logic',
  opponentRank: 'Gold I',
  topic: 'Universal Basic Income',
  date: '2 hrs ago',
  result: 'VICTORY',
  userScore: 92,
  opponentScore: 88,
  mmrChange: '+24',
  // Momentum: + is User winning, - is Opponent winning
  momentum: [0, 5, -10, -5, 10, 15, 12, 20], 
  comparison: [
    { category: 'Logos (Logic)', userVal: 92, oppVal: 85 },
    { category: 'Pathos (Emotion)', userVal: 78, oppVal: 90 },
    { category: 'Ethos (Credibility)', userVal: 88, oppVal: 82 },
    { category: 'Rebuttal Speed', userVal: 95, oppVal: 70 },
  ],
  keyClashPoint: "Turn 4: Opponent failed to address your economic inflation data, allowing you to regain momentum by highlighting fiscal responsibility.",
  transcript: [
    { speaker: 'opponent', content: "UBI destroys the incentive to work. Why would anyone labor if survival is guaranteed?", score: 80 },
    { speaker: 'user', content: "Studies from Finland show employment actually increased. People use the safety net to take risks, start businesses, and educate themselves.", score: 95 },
    { speaker: 'opponent', content: "But the tax burden would crush the middle class!", score: 75 },
    { speaker: 'user', content: "Not if we implement a Value Added Tax on luxury tech goods, effectively taxing automation rather than labor.", score: 92 }
  ]
};

const MOCK_AI_SESSION: AIDetails = {
  id: 'ai-5521',
  type: 'AI',
  topic: 'Ethics of Genetic Engineering',
  date: 'Yesterday',
  difficulty: 'Hard',
  aiPersona: 'Socrates Bot',
  overallGrade: 'B+',
  metrics: {
    logic: 85,
    vocabulary: 92,
    tone: 88,
    fallaciesCommitted: 2
  },
  coachNotes: {
    strength: "Excellent use of scientific terminology and ethical frameworks.",
    improvement: "You relied on a Slippery Slope fallacy in the second turn. Focus on immediate consequences rather than hypothetical extremes."
  },
  transcript: [
    { 
      speaker: 'ai', 
      content: "Is it not true that altering the genome is playing God?" 
    },
    { 
      speaker: 'user', 
      content: "No, because we already treat diseases. If we can cure cancer before birth, it is our moral duty. Otherwise, everyone will eventually be genetically modified anyway and regular humans will die out.",
      detectedFallacy: "Slippery Slope",
      feedback: "You jumped to an extreme conclusion ('regular humans will die out') without evidence.",
      betterPhrasing: "If we can cure cancer before birth, it is an extension of medicine, not a replacement of humanity."
    },
    { 
      speaker: 'ai', 
      content: "But where do we draw the line between therapy and enhancement?" 
    },
    { 
        speaker: 'user',
        content: "The line is medical necessity. Therapy fixes a deficit; enhancement creates a surplus advantage.",
        score: 95,
        feedback: "Perfect definition. Clear and concise differentiation."
    }
  ]
};

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pvp' | 'ai'>('overview');
  const [selectedPVP, setSelectedPVP] = useState<PVPDetails | null>(null);
  const [selectedAI, setSelectedAI] = useState<AIDetails | null>(null);

  // --- View Switching Logic ---
  if (selectedPVP) {
     return <PVPAnalysisView match={selectedPVP} onBack={() => setSelectedPVP(null)} />;
  }
  
  if (selectedAI) {
     return <AIAnalysisView session={selectedAI} onBack={() => setSelectedAI(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-brand-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none"></div>
      
      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto flex items-center">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Arena</span>
        </button>
      </nav>

      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 pb-20">
        {/* Identity Section */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
           <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
              >
                 <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-brand-500 to-accent-600 p-[2px]">
                       <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-3xl md:text-4xl font-display font-bold text-white relative overflow-hidden">
                          JD
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
                       </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                       <Crown size={20} className="text-yellow-400 fill-current" />
                    </div>
                 </div>
                 
                 <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">John Doe</h1>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                       <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider flex items-center">
                          <Trophy size={12} className="mr-1.5" />
                          Gold Orator II
                       </span>
                       <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium">
                          ID: #8829-SYM
                       </span>
                    </div>
                    <p className="text-slate-400 max-w-lg">
                       Passionate debater focusing on technology and ethics.
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl w-fit mb-8 border border-white/5 backdrop-blur-sm">
           {[
              { id: 'overview', label: 'Performance', icon: Activity },
              { id: 'pvp', label: '1:1 History', icon: Swords },
              { id: 'ai', label: 'AI Analysis', icon: Bot },
           ].map((tab) => (
              <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`
                    relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-2
                    ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 {activeTab === tab.id && (
                    <motion.div 
                       layoutId="activeTab"
                       className="absolute inset-0 bg-white/10 rounded-lg shadow-inner"
                    />
                 )}
                 <tab.icon size={16} />
                 <span className="relative z-10">{tab.label}</span>
              </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
           {/* Overview Tab (Comprehensive Dashboard) */}
           {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                 {/* 1. Summary Cards */}
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                         { label: "Win Rate", value: "68%", sub: "+4% vs last week", icon: <Trophy size={20}/>, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                         { label: "Debates", value: "142", sub: "Total Matches", icon: <Swords size={20}/>, color: "text-brand-400", bg: "bg-brand-500/10" },
                         { label: "Current Streak", value: "5", sub: "Days Active", icon: <Flame size={20}/>, color: "text-orange-400", bg: "bg-orange-500/10" },
                         { label: "Avg. Score", value: "8.9", sub: "Out of 10.0", icon: <Zap size={20}/>, color: "text-green-400", bg: "bg-green-500/10" }
                     ].map((stat, i) => (
                         <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors">
                             <div className="flex items-start justify-between mb-4">
                                 <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                     {stat.icon}
                                 </div>
                                 <TrendingUp size={16} className="text-green-500" />
                             </div>
                             <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                             <div className="text-sm text-slate-500 font-medium uppercase">{stat.label}</div>
                             <div className="text-xs text-green-500/80 mt-1">{stat.sub}</div>
                         </div>
                     ))}
                 </div>

                 <div className="grid lg:grid-cols-3 gap-6">
                     
                     {/* 2. Skill Radar Chart */}
                     <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Target className="text-brand-400" /> Debater DNA
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">Holistic analysis of your argumentative style.</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-1 rounded">You</span>
                                <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-1 rounded">Avg. Gold Tier</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* SVG Radar Chart */}
                            <div className="relative w-64 h-64 shrink-0">
                                <SkillRadar 
                                    skills={[
                                        { label: "Logos", value: 92 },
                                        { label: "Pathos", value: 78 },
                                        { label: "Ethos", value: 85 },
                                        { label: "Rebuttal", value: 88 },
                                        { label: "Vocab", value: 80 },
                                        { label: "Speed", value: 70 },
                                    ]} 
                                />
                            </div>

                            {/* Detailed List */}
                            <div className="flex-1 w-full grid grid-cols-2 gap-4">
                                {[
                                    { name: "Logos (Logic)", val: 92, desc: "Strong syllogisms & evidence use." },
                                    { name: "Pathos (Emotion)", val: 78, desc: "Can improve emotional hooks." },
                                    { name: "Ethos (Credibility)", val: 85, desc: "Confident authoritative tone." },
                                    { name: "Rebuttal Agility", val: 88, desc: "Excellent counter-arguments." },
                                ].map((s, i) => (
                                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase">{s.name}</span>
                                            <span className="text-white font-bold">{s.val}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full mb-2">
                                            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${s.val}%` }}></div>
                                        </div>
                                        <p className="text-[10px] text-slate-500">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>

                     {/* 3. Topic Mastery */}
                     <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <Layers className="text-accent-400" /> Topic Mastery
                         </h3>
                         <div className="space-y-6">
                             {[
                                 { topic: "Technology & AI", level: 95, rank: "Master" },
                                 { topic: "Politics & Policy", level: 70, rank: "Advanced" },
                                 { topic: "Ethics & Philosophy", level: 85, rank: "Expert" },
                                 { topic: "Economics", level: 60, rank: "Intermediate" },
                             ].map((t, i) => (
                                 <div key={i}>
                                     <div className="flex justify-between items-center mb-2">
                                         <span className="font-bold text-white text-sm">{t.topic}</span>
                                         <span className="text-xs font-mono text-accent-400 bg-accent-500/10 px-1.5 py-0.5 rounded border border-accent-500/20">{t.rank}</span>
                                     </div>
                                     <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                                         <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${t.level}%` }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
                                         ></motion.div>
                                     </div>
                                 </div>
                             ))}
                         </div>

                         <div className="mt-8 pt-6 border-t border-slate-800">
                             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">AI Coach Insight</h4>
                             <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 italic flex gap-3">
                                 <Bot className="shrink-0 text-slate-500" />
                                 "You excel in tech debates but often struggle with economic data. Try the 'Economics 101' sparring module next."
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* 4. Activity Heatmap (GitHub Style) */}
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="text-green-400" /> Consistency Tracker
                        </h3>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
                                <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
                                <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            </div>
                            <span>More</span>
                        </div>
                     </div>
                     
                     {/* Mock Heatmap Grid */}
                     <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
                         {[...Array(52)].map((_, weekIndex) => (
                             <div key={weekIndex} className="grid grid-rows-7 gap-1">
                                 {[...Array(7)].map((_, dayIndex) => {
                                     // Generate semi-random activity
                                     const activityLevel = Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0;
                                     const colors = ['bg-slate-800', 'bg-green-900', 'bg-green-700', 'bg-green-500'];
                                     return (
                                         <div 
                                             key={dayIndex} 
                                             className={`w-3 h-3 rounded-sm ${colors[activityLevel]} hover:border hover:border-white/50 transition-all`}
                                             title={`Activity level: ${activityLevel}`}
                                         ></div>
                                     );
                                 })}
                             </div>
                         ))}
                     </div>
                 </div>
              </motion.div>
           )}

           {/* PVP List Tab */}
           {activeTab === 'pvp' && (
              <motion.div 
                key="pvp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Match History</h3>
                 </div>
                 {/* Render Mock PVP Item */}
                 <div 
                    onClick={() => setSelectedPVP(MOCK_PVP_MATCH)}
                    className="bg-slate-900 border border-slate-800 hover:border-brand-500/30 hover:bg-slate-800/50 rounded-2xl p-6 flex items-center justify-between cursor-pointer group transition-all"
                 >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center font-bold">
                            W
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">{MOCK_PVP_MATCH.topic}</div>
                            <div className="text-slate-500 text-xs">vs {MOCK_PVP_MATCH.opponent} • {MOCK_PVP_MATCH.date}</div>
                        </div>
                    </div>
                    <ChevronRight className="text-slate-600 group-hover:text-white" />
                 </div>
              </motion.div>
           )}

           {/* AI List Tab */}
           {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Sparring Sessions</h3>
                 </div>
                 {/* Render Mock AI Item */}
                 <div 
                    onClick={() => setSelectedAI(MOCK_AI_SESSION)}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50 rounded-2xl p-6 flex items-center justify-between cursor-pointer group transition-all"
                 >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                            B+
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">{MOCK_AI_SESSION.topic}</div>
                            <div className="text-slate-500 text-xs">{MOCK_AI_SESSION.aiPersona} • {MOCK_AI_SESSION.date}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Fallacies</span>
                        <span className="text-sm font-mono text-red-400">{MOCK_AI_SESSION.metrics.fallaciesCommitted} Detected</span>
                    </div>
                 </div>
              </motion.div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- Helper: Skill Radar Chart (SVG) ---
const SkillRadar = ({ skills }: { skills: { label: string, value: number }[] }) => {
    // Polygon configuration
    const size = 256;
    const center = size / 2;
    const radius = 90; // scale 0-100 to radius
    const sides = skills.length;
    
    // Helper to calculate points
    const getPoint = (value: number, index: number, maxRadius = radius) => {
        const angle = (Math.PI * 2 * index) / sides - Math.PI / 2;
        const dist = (value / 100) * maxRadius;
        const x = center + dist * Math.cos(angle);
        const y = center + dist * Math.sin(angle);
        return { x, y };
    };

    const dataPoints = skills.map((s, i) => getPoint(s.value, i)).map(p => `${p.x},${p.y}`).join(' ');
    const bgPoints = skills.map((_, i) => getPoint(100, i)).map(p => `${p.x},${p.y}`).join(' ');
    const midPoints = skills.map((_, i) => getPoint(50, i)).map(p => `${p.x},${p.y}`).join(' ');

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Web */}
            <polygon points={bgPoints} fill="rgba(30, 41, 59, 0.5)" stroke="#334155" strokeWidth="1" />
            <polygon points={midPoints} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Axis Lines */}
            {skills.map((_, i) => {
                const p = getPoint(100, i);
                return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#334155" strokeWidth="1" />
            })}

            {/* Data Blob */}
            <motion.polygon 
                initial={{ opacity: 0, scale: 0, transformOrigin: 'center' }}
                animate={{ opacity: 0.8, scale: 1 }}
                points={dataPoints} 
                fill="rgba(14, 165, 233, 0.4)" 
                stroke="#0ea5e9" 
                strokeWidth="2" 
            />

            {/* Labels */}
            {skills.map((s, i) => {
                const p = getPoint(120, i); // Push labels out
                return (
                    <text 
                        key={i} 
                        x={p.x} 
                        y={p.y} 
                        fill="#94a3b8" 
                        fontSize="10" 
                        fontWeight="bold"
                        textAnchor="middle" 
                        dominantBaseline="middle"
                    >
                        {s.label}
                    </text>
                );
            })}
        </svg>
    );
};

// ==========================================
// CRITICAL ANALYSIS VIEW: PVP (1:1)
// ==========================================

const PVPAnalysisView: React.FC<{ match: PVPDetails, onBack: () => void }> = ({ match, onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans relative">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
                <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to History
                    </button>
                    <div className="text-sm font-mono text-slate-500">{match.id}</div>
                </div>
            </div>

            <main className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 py-8 space-y-8">
                
                {/* 1. The Result Header */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 ${match.result === 'VICTORY' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${match.result === 'VICTORY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {match.result}
                                </span>
                                <span className="text-slate-500 text-sm">{match.date}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                                "{match.topic}"
                            </h1>
                            <div className="flex items-center gap-2 text-slate-400 font-medium">
                                <Swords size={18} />
                                <span>vs {match.opponent}</span>
                                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 ml-2">{match.opponentRank}</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-64 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Score Diff</div>
                        <div className="text-4xl font-mono font-bold text-white mb-2">
                            {match.userScore} <span className="text-slate-600 text-2xl mx-1">-</span> {match.opponentScore}
                        </div>
                        <div className={`text-sm font-bold ${match.mmrChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {match.mmrChange} MMR
                        </div>
                    </div>
                </div>

                {/* 2. Critical Analysis: Momentum & Comparison */}
                <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* Momentum Graph Container */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <LineChart className="text-brand-400" />
                                <h3 className="text-xl font-bold text-white">Battle Momentum</h3>
                            </div>
                            <div className="text-xs text-slate-500 uppercase">Turn-by-Turn Flow</div>
                        </div>
                        
                        {/* Custom SVG Momentum Chart */}
                        <div className="h-48 w-full relative flex items-center mb-4">
                             {/* Zero Line */}
                             <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-700 border-t border-dashed border-slate-600"></div>
                             
                             {/* The Graph Line */}
                             <svg className="w-full h-full visible overflow-visible">
                                <defs>
                                    <linearGradient id="gradientLine" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#4ade80" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                                <polyline 
                                    fill="none" 
                                    stroke="url(#gradientLine)" 
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    points="0,50 50,40 100,70 150,60 200,30 250,20 300,25 350,10"
                                />
                             </svg>
                             
                             {/* Labels */}
                             <div className="absolute top-2 right-2 text-xs font-bold text-green-500">You Dominating</div>
                             <div className="absolute bottom-2 right-2 text-xs font-bold text-red-500">Opponent Dominating</div>
                        </div>

                        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                            <span className="text-brand-400 font-bold uppercase text-xs mr-2">Turning Point:</span>
                            {match.keyClashPoint}
                        </div>
                    </div>

                    {/* Skill Comparison */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Scale className="text-yellow-400" />
                                <h3 className="text-xl font-bold text-white">Direct Comparison</h3>
                            </div>
                            <div className="flex gap-4 text-xs font-bold uppercase">
                                <span className="text-brand-400">You</span>
                                <span className="text-slate-500">vs</span>
                                <span className="text-red-400">Opponent</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {match.comparison.map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2 font-medium text-slate-300">
                                        <span>{stat.category}</span>
                                        <span className={stat.userVal > stat.oppVal ? 'text-green-400' : 'text-red-400'}>
                                            {stat.userVal > stat.oppVal ? '+' : ''}{stat.userVal - stat.oppVal} diff
                                        </span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-950 rounded-full flex overflow-hidden relative">
                                        {/* Divider in middle */}
                                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700 z-10"></div>
                                        
                                        {/* Bars */}
                                        <div className="w-1/2 flex justify-end">
                                            <div style={{ width: `${stat.userVal}%` }} className="h-full bg-brand-500 rounded-l-full opacity-80"></div>
                                        </div>
                                        <div className="w-1/2 flex justify-start">
                                            <div style={{ width: `${stat.oppVal}%` }} className="h-full bg-red-500 rounded-r-full opacity-80"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Transcript */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <MessageSquare className="mr-2 text-slate-400" /> Transcript History
                     </h3>
                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                        {match.transcript.map((turn, i) => (
                            <div key={i} className={`p-4 rounded-xl border ${turn.speaker === 'user' ? 'bg-brand-900/10 border-brand-500/20 ml-8' : 'bg-slate-950 border-slate-800 mr-8'}`}>
                                <div className="flex justify-between text-xs font-bold uppercase mb-2 text-slate-500">
                                    <span>{turn.speaker === 'user' ? 'You' : 'Opponent'}</span>
                                    <span>Score: {turn.score}</span>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">{turn.content}</p>
                            </div>
                        ))}
                     </div>
                </div>

            </main>
        </div>
    );
};

// ==========================================
// CRITICAL ANALYSIS VIEW: AI (Educational)
// ==========================================

const AIAnalysisView: React.FC<{ session: AIDetails, onBack: () => void }> = ({ session, onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans relative">
            <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
                <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to Overview
                    </button>
                    <div className="text-sm font-mono text-cyan-400">AI COACHING SESSION</div>
                </div>
            </div>

            <main className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 py-8 space-y-8">
                
                {/* 1. Grade Card */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase">{session.difficulty} Mode</span>
                             <span className="text-slate-500 text-sm">{session.date}</span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">{session.topic}</h1>
                        <div className="text-slate-400 flex items-center gap-2">
                            <Bot size={16} /> Persona: <span className="text-white font-medium">{session.aiPersona}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                             <div className="text-xs text-slate-500 uppercase font-bold">Overall Grade</div>
                             <div className="text-5xl font-display font-bold text-cyan-400 text-shadow-glow">{session.overallGrade}</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700"></div>
                        <div className="space-y-1 text-sm">
                             <div className="flex justify-between w-32"><span className="text-slate-400">Logic</span> <span className="font-bold text-white">{session.metrics.logic}/100</span></div>
                             <div className="flex justify-between w-32"><span className="text-slate-400">Vocab</span> <span className="font-bold text-white">{session.metrics.vocabulary}/100</span></div>
                             <div className="flex justify-between w-32"><span className="text-slate-400">Tone</span> <span className="font-bold text-white">{session.metrics.tone}/100</span></div>
                        </div>
                    </div>
                </div>

                {/* 2. Critical Feedback Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><ThumbsUp size={18} className="mr-2 text-green-400"/> Key Strength</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            {session.coachNotes.strength}
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Lightbulb size={18} className="mr-2 text-yellow-400"/> Improvement Area</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            {session.coachNotes.improvement}
                        </p>
                    </div>
                </div>

                {/* 3. Deep Dive Transcript (Educational) */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold text-white flex items-center">
                            <GraduationCap className="mr-2 text-cyan-400" /> Critical Review
                         </h3>
                         {session.metrics.fallaciesCommitted > 0 && (
                            <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-full flex items-center">
                                <AlertTriangle size={12} className="mr-1.5" />
                                {session.metrics.fallaciesCommitted} Logical Fallacies Detected
                            </span>
                         )}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                        {session.transcript.map((turn, i) => (
                            <div key={i} className={`p-6 border-b border-slate-800 last:border-0 ${turn.detectedFallacy ? 'bg-red-900/5' : ''}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${turn.speaker === 'user' ? 'text-brand-400' : 'text-cyan-400'}`}>
                                        {turn.speaker === 'user' ? 'You' : 'AI Coach'}
                                    </span>
                                    {turn.detectedFallacy && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                            Fallacy: {turn.detectedFallacy}
                                        </span>
                                    )}
                                </div>
                                
                                <p className="text-slate-200 text-base leading-relaxed mb-4">{turn.content}</p>

                                {/* Educational Overlay */}
                                {(turn.feedback || turn.betterPhrasing) && (
                                    <div className="ml-4 pl-4 border-l-2 border-cyan-500/30 space-y-3">
                                        {turn.feedback && (
                                            <div className="text-sm text-slate-400">
                                                <span className="text-cyan-400 font-bold mr-2">Critique:</span>
                                                {turn.feedback}
                                            </div>
                                        )}
                                        {turn.betterPhrasing && (
                                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-sm">
                                                <div className="text-green-400 font-bold text-xs uppercase mb-1 flex items-center">
                                                    <Sparkles size={10} className="mr-1" /> Suggestion
                                                </div>
                                                <span className="text-slate-300 italic">"{turn.betterPhrasing}"</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default UserProfile;