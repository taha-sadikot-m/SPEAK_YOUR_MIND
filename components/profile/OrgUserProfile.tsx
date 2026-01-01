import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Trophy, Swords, Bot, TrendingUp, Calendar, 
  Target, Zap, Crown, Award, Clock, ChevronRight, Activity,
  Check, X, BarChart, MessageSquare, Brain, ThumbsUp, ThumbsDown,
  AlertTriangle, Lightbulb, GraduationCap, LineChart, Scale, Sparkles, Flame, Layers, Building, Briefcase, Users, PieChart, CheckCircle, BookOpen, GraduationCap as SchoolIcon
} from 'lucide-react';
import type { Student, DebateSession, SkillMetric } from '../../data/seedData';

interface OrgUserProfileProps {
  onBack: () => void;
}

const OrgUserProfile: React.FC<OrgUserProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pvp' | 'ai'>('overview');
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    // Load current student data
    const currentStudent = localStorage.getItem('current_student');
    if (currentStudent) {
      setStudentData(JSON.parse(currentStudent));
    }
  }, []);

  if (!studentData) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Loading profile...</p>
      </div>
    </div>;
  }

  const pvpSessions = studentData.sessionHistory.filter(s => s.type === '1v1');
  const aiSessions = studentData.sessionHistory.filter(s => s.type === 'AI');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-brand-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none"></div>
      
      <nav className="relative z-20 px-6 py-6 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Exit Profile</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 rounded-full border border-brand-500/20">
          <SchoolIcon size={14} className="text-brand-400" />
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Educational Scholar</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 pb-20">
        
        {/* Profile Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12 items-end">
           <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
              >
                 <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-600 p-[2px] shadow-2xl shadow-brand-500/20">
                       <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-3xl md:text-4xl font-display font-bold text-white relative overflow-hidden">
                          {studentData.name.split(' ').map(n => n[0]).join('')}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30"></div>
                       </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 p-2 rounded-xl border border-slate-800 shadow-xl">
                       <GraduationCap size={20} className="text-brand-400" />
                    </div>
                 </div>
                 
                 <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{studentData.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                       <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider flex items-center">
                          <BookOpen size={12} className="mr-1.5" />
                          {studentData.tier}
                       </span>
                       <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 text-xs font-medium">
                          Class: {studentData.class}
                       </span>
                       <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                          Rank: {studentData.debateStats.rank}
                       </span>
                    </div>
                    <p className="text-slate-400 max-w-lg">
                       Student ID: <span className="text-white font-semibold font-mono">{studentData.id}</span> • <span className="text-white font-semibold">Speak Your Mind Academy</span>
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl w-fit mb-8 border border-white/5 backdrop-blur-sm shadow-2xl">
           {[
              { id: 'overview', label: 'Performance Overview', icon: Activity },
              { id: 'pvp', label: '1v1 Debate History', icon: Users },
              { id: 'ai', label: 'AI Debate History', icon: Bot },
           ].map((tab) => (
              <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`
                    relative px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center space-x-2
                    ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 {activeTab === tab.id && (
                    <motion.div 
                       layoutId="orgActiveTab"
                       className="absolute inset-0 bg-white/10 rounded-lg shadow-inner"
                    />
                 )}
                 <tab.icon size={16} />
                 <span className="relative z-10">{tab.label}</span>
              </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
           {/* Overview Tab */}
           {activeTab === 'overview' && (
              <motion.div 
                key="academic-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                 {/* Key Stats Grid */}
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                         { label: "Total Debates", value: studentData.sessions.toString(), sub: `${studentData.debateStats.total1v1Debates} 1v1 \u2022 ${studentData.debateStats.totalAIDebates} AI`, icon: <Trophy size={20}/>, color: "text-brand-400", bg: "bg-brand-500/10" },
                         { label: "Win Rate", value: `${studentData.debateStats.winRate.toFixed(1)}%`, sub: `${studentData.debateStats.won1v1Debates + studentData.debateStats.wonAIDebates} Victories`, icon: <Target size={20}/>, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                         { label: "Avg Score", value: studentData.debateStats.avgScore.toFixed(1), sub: `${studentData.tier}`, icon: <Sparkles size={20}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
                         { label: "Total Points", value: studentData.debateStats.totalPoints.toString(), sub: `Rank: ${studentData.debateStats.rank}`, icon: <Crown size={20}/>, color: "text-amber-400", bg: "bg-amber-500/10" }
                     ].map((stat, i) => (
                         <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all hover:translate-y-[-2px]">
                             <div className="flex items-start justify-between mb-4">
                                 <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                     {stat.icon}
                                 </div>
                                 <Activity size={16} className="text-slate-700" />
                             </div>
                             <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                             <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                             <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
                         </div>
                     ))}
                 </div>

                 <div className="grid lg:grid-cols-3 gap-6">
                     {/* Academic Competency Chart */}
                     <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <BarChart className="text-brand-400" size={20} /> Skill Progress
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">Your current skill levels across key debate competencies.</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-1 rounded">Current</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {studentData.skillProgress.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">{skill.skill}</span>
                                        <div className="flex gap-3 items-center">
                                            <span className="text-sm font-bold text-white">{skill.current}%</span>
                                            {skill.trend === 'up' && <TrendingUp size={14} className="text-green-400" />}
                                            {skill.trend === 'down' && <AlertTriangle size={14} className="text-red-400" />}
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden relative">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.current}%` }}
                                            transition={{ delay: 0.1 + i*0.1 }}
                                            className="absolute inset-y-0 left-0 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>

                     {/* Strengths & Weaknesses */}
                     <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col shadow-2xl">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <Award className="text-orange-400" /> Analysis
                         </h3>
                         
                         <div className="mb-6">
                            <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <ThumbsUp size={14} /> Strengths
                            </h4>
                            <div className="space-y-2">
                                {studentData.debateStats.strengths.map((strength, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle size={14} className="text-green-400 shrink-0" />
                                        <span>{strength}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                         
                         <div>
                            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <AlertTriangle size={14} /> Areas to Improve
                            </h4>
                            <div className="space-y-2">
                                {studentData.debateStats.weaknesses.map((weakness, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                        <X size={14} className="text-amber-400 shrink-0" />
                                        <span>{weakness}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                     </div>
                 </div>

                 {/* Recent Activity */}
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                         <Clock className="text-cyan-400" /> Recent Debates
                     </h3>
                     <div className="space-y-4">
                         {studentData.sessionHistory.slice(0, 5).map((session, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                 <div className="flex items-center gap-4">
                                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.type === '1v1' ? 'bg-brand-500/10 text-brand-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                         {session.type === '1v1' ? <Users size={20} /> : <Bot size={20} />}
                                     </div>
                                     <div>
                                         <div className="font-bold text-white text-sm mb-1">{session.topic}</div>
                                         <div className="text-xs text-slate-500">
                                             vs {session.opponent} \u2022 {session.date} \u2022 {session.duration}
                                         </div>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <div className="text-right">
                                         <div className="text-2xl font-bold text-white">{session.score}</div>
                                         <div className="text-xs text-slate-500">Score</div>
                                     </div>
                                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${session.result === 'Won' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                         {session.result}
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
              </motion.div>
           )}

           {/* 1v1 Debate History Tab */}
           {activeTab === 'pvp' && (
              <motion.div 
                key="pvp-history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">1v1 Debate History</h3>
                      <div className="text-sm text-slate-400">
                          Total: {pvpSessions.length} \u2022 Won: {studentData.debateStats.won1v1Debates} \u2022 Win Rate: {((studentData.debateStats.won1v1Debates / studentData.debateStats.total1v1Debates) * 100).toFixed(1)}%
                      </div>
                  </div>
                  
                  {pvpSessions.map((session, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                  <h4 className="text-lg font-bold text-white mb-2">{session.topic}</h4>
                                  <div className="flex items-center gap-4 text-sm text-slate-400">
                                      <span className="flex items-center gap-1">
                                          <Users size={14} /> vs {session.opponent}
                                      </span>
                                      <span className="flex items-center gap-1">
                                          <Calendar size={14} /> {session.date}
                                      </span>
                                      <span className="flex items-center gap-1">
                                          <Clock size={14} /> {session.duration}
                                      </span>
                                  </div>
                              </div>
                              <div className={`px-4 py-2 rounded-xl text-sm font-bold ${session.result === 'Won' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                  {session.result}
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-2xl font-bold text-white mb-1">{session.score}</div>
                                  <div className="text-xs text-slate-500">Your Score</div>
                              </div>
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-2xl font-bold text-brand-400 mb-1">{session.yourArguments}</div>
                                  <div className="text-xs text-slate-500">Your Arguments</div>
                              </div>
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-2xl font-bold text-slate-500 mb-1">{session.opponentArguments}</div>
                                  <div className="text-xs text-slate-500">Opp Arguments</div>
                              </div>
                          </div>
                          
                          <div className="bg-slate-950 rounded-xl p-4">
                              <div className="flex items-start gap-2 mb-2">
                                  <Lightbulb size={16} className="text-amber-400 mt-0.5 shrink-0" />
                                  <div>
                                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Judge Feedback</div>
                                      <div className="text-sm text-slate-300">{session.feedback}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </motion.div>
           )}

           {/* AI Debate History Tab */}
           {activeTab === 'ai' && (
              <motion.div 
                key="ai-history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">AI Debate History</h3>
                      <div className="text-sm text-slate-400">
                          Total: {aiSessions.length} \u2022 Won: {studentData.debateStats.wonAIDebates} \u2022 Win Rate: {((studentData.debateStats.wonAIDebates / studentData.debateStats.totalAIDebates) * 100).toFixed(1)}%
                      </div>
                  </div>
                  
                  {aiSessions.map((session, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                  <h4 className="text-lg font-bold text-white mb-2">{session.topic}</h4>
                                  <div className="flex items-center gap-4 text-sm text-slate-400">
                                      <span className="flex items-center gap-1">
                                          <Bot size={14} /> {session.opponent}
                                      </span>
                                      <span className="flex items-center gap-1">
                                          <Calendar size={14} /> {session.date}
                                      </span>
                                      <span className="flex items-center gap-1">
                                          <Clock size={14} /> {session.duration}
                                      </span>
                                  </div>
                              </div>
                              <div className={`px-4 py-2 rounded-xl text-sm font-bold ${session.result === 'Won' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                  {session.result}
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-2xl font-bold text-white mb-1">{session.score}</div>
                                  <div className="text-xs text-slate-500">Your Score</div>
                              </div>
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-2xl font-bold text-purple-400 mb-1">{session.yourArguments}</div>
                                  <div className="text-xs text-slate-500">Your Arguments</div>
                              </div>
                              <div className="bg-slate-950 rounded-xl p-4 text-center">
                                  <div className="text-lg font-bold text-amber-400 mb-1">{session.judgeRating.toFixed(1)}/5</div>
                                  <div className="text-xs text-slate-500">AI Rating</div>
                              </div>
                          </div>
                          
                          <div className="bg-slate-950 rounded-xl p-4">
                              <div className="flex items-start gap-2">
                                  <Brain size={16} className="text-purple-400 mt-0.5 shrink-0" />
                                  <div>
                                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">AI Analysis</div>
                                      <div className="text-sm text-slate-300">{session.feedback}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </motion.div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OrgUserProfile;