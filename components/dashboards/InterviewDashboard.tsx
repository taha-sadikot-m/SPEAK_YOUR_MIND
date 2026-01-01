import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, FileText, Video, TrendingUp, LogOut, Sparkles, Upload, Play, Clock, 
  Building, User, CheckCircle, XCircle, ChevronRight, ArrowLeft, Mic, Send, 
  AlertCircle, BarChart, Star, StopCircle, Award, ArrowRight, Activity, 
  MessageSquare, BookOpen, Volume2, MicOff, Maximize2, Minimize2, Eye, Brain,
  ThumbsUp, ThumbsDown, Zap, Search, AlertTriangle, Bot, Check, Home
} from 'lucide-react';

interface InterviewDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

// --- Types ---
type ViewState = 'dashboard' | 'setup' | 'room' | 'history' | 'analysis';

interface InterviewSession {
  id: string;
  company: string;
  role: string;
  customJD?: string;
  date: string;
  duration: string;
  status: 'Completed' | 'Aborted';
  verdict?: 'Strong Hire' | 'Hire' | 'Weak Hire' | 'No Hire';
  score?: number;
  speechMetrics?: {
    wpm: number;
    fillerWords: number;
    clarity: number; // 0-100
    confidence: number; // 0-100
  };
  competencies?: {
    technical: number;
    communication: number;
    problemSolving: number;
    culturalFit: number;
  };
  transcript: {
    id: number;
    question: string;
    answer: string;
    score: number; // 0-10
    feedback: string;
    betterAnswer: string;
    keySignals: { type: 'positive' | 'negative', text: string }[];
  }[];
}

// --- Mock Data ---
const MOCK_HISTORY: InterviewSession[] = [
  {
    id: 'int-1',
    company: 'Google',
    role: 'Frontend Engineer',
    date: 'Oct 24, 2023',
    duration: '45m',
    status: 'Completed',
    verdict: 'Hire',
    score: 88,
    speechMetrics: {
        wpm: 145,
        fillerWords: 12,
        clarity: 92,
        confidence: 85
    },
    competencies: {
        technical: 90,
        communication: 85,
        problemSolving: 88,
        culturalFit: 80
    },
    transcript: [
        { 
            id: 1,
            question: "Tell me about a time you optimized a slow application.", 
            answer: "I used lazy loading and memoization. It was a React app and it was slow on mobile. I checked the bundle size and it was huge. So I split the code and used React.memo for big lists.", 
            score: 8.5,
            feedback: "Good identification of the problem (bundle size) and solution (code splitting). However, you could quantify the impact more clearly.",
            betterAnswer: "In a previous React project, mobile load times exceeded 3s. I conducted a bundle analysis, identified unused dependencies, and implemented route-based code splitting. This reduced the initial bundle by 40% and improved TTI by 1.5s.",
            keySignals: [
                { type: 'positive', text: 'Technical Terminology' },
                { type: 'negative', text: 'Lacked Quantifiable Metrics' }
            ]
        }
    ]
  },
  {
    id: 'int-2',
    company: 'Startup Inc',
    role: 'Product Manager',
    date: 'Oct 20, 2023',
    duration: '12m',
    status: 'Aborted',
    transcript: []
  }
];

const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'Tesla', 'Other (Custom)'];
const ROLES = ['Frontend Engineer', 'Backend Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Other (Custom)'];

const InterviewDashboard: React.FC<InterviewDashboardProps> = ({ onLogout, onBack }) => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [history, setHistory] = useState<InterviewSession[]>(MOCK_HISTORY);
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  useEffect(() => {
    // Load current student data from localStorage
    const studentData = localStorage.getItem('current_student');
    if (studentData) {
      setCurrentStudent(JSON.parse(studentData));
    }
  }, []);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [setupData, setSetupData] = useState({
    company: 'Google',
    customCompany: '',
    role: 'Frontend Engineer',
    customRole: '',
    jd: '',
    resumeUploaded: false
  });

  if (view === 'setup') {
    return (
      <InterviewSetup 
        onCancel={() => setView('dashboard')} 
        onStart={(data) => {
            setSetupData(data);
            setView('room');
        }}
      />
    );
  }

  if (view === 'room') {
    return (
      <InterviewRoom 
        config={setupData}
        onFinish={(session) => {
            setHistory([session, ...history]);
            setSelectedSession(session);
            setView('analysis');
        }}
        onAbort={(session) => {
            setHistory([session, ...history]);
            setView('dashboard');
        }}
      />
    );
  }

  if (view === 'analysis' && selectedSession) {
      return (
          <InterviewAnalysis 
            session={selectedSession} 
            onBack={() => setView('dashboard')} 
          />
      );
  }

  if (view === 'history') {
      return (
          <InterviewHistoryList 
            sessions={history} 
            onSelect={(s) => { setSelectedSession(s); setView('analysis'); }}
            onBack={() => setView('dashboard')}
          />
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-accent-500/30">
      <DashboardBackground />
      
      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 flex justify-between items-center w-full max-w-[95%] 2xl:max-w-[90%] mx-auto">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-3 group cursor-pointer" onClick={onBack}>
             <div className="bg-gradient-to-tr from-accent-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-900/20 group-hover:scale-105 transition-transform">
               <Briefcase size={24} className="text-white" />
             </div>
             <span className="text-xl font-display font-bold tracking-tight group-hover:text-accent-400 transition-colors">MyInterview</span>
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
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
          >
            <LogOut size={18} />
            <span className="hidden md:inline text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 pt-4 pb-20">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-1">
             <div className="absolute inset-0 bg-gradient-to-r from-accent-500 via-violet-500 to-brand-500 opacity-20 blur-xl"></div>
             <div className="relative bg-slate-950 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-2xl border-2 border-slate-700">
                        {currentStudent ? getInitials(currentStudent.name) : 'ST'}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-green-500 text-slate-900 p-1 rounded-lg border-2 border-slate-900">
                         <Sparkles size={14} className="fill-current" />
                      </div>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <TrendingUp size={12} className="text-green-400"/>
                        Market Ready
                      </div>
                      <div className="text-2xl font-display font-bold text-white flex items-center gap-2">
                         {currentStudent ? currentStudent.name : 'Student'}
                      </div>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Avg. Score</div>
                      <div className="font-bold text-accent-400 text-xl">88/100</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Sessions</div>
                      <div className="font-bold text-white text-xl">{history.length}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Top Skill</div>
                      <div className="font-bold text-white text-xl">System Design</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500">Target</div>
                      <div className="font-bold text-white text-xl">L5 Senior</div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <h2 className="text-3xl font-display font-bold text-white mb-6">Start Training</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <button 
                        onClick={() => setView('setup')}
                        className="group bg-slate-900 border border-slate-800 hover:border-accent-500/50 p-8 rounded-3xl text-left transition-all hover:shadow-2xl hover:shadow-accent-500/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
                            <Video size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center text-accent-400 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                                <Play size={24} className="ml-1" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">New Interview</h3>
                            <p className="text-slate-400">Configure a new mock session with custom JD and resume analysis.</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => setView('history')}
                        className="group bg-slate-900 border border-slate-800 hover:border-brand-500/50 p-8 rounded-3xl text-left transition-all hover:shadow-2xl hover:shadow-brand-500/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
                            <FileText size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-400 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">History & Analysis</h3>
                            <p className="text-slate-400">Review past performances, transcripts, and AI coaching notes.</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="lg:col-span-4">
                <h2 className="text-xl font-display font-bold text-white mb-6">Quick Stats</h2>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Offer Probability</span>
                            <span className="text-green-400 font-bold">High (72%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="w-[72%] bg-green-500 h-full rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Behavioral Questions</span>
                            <span className="text-accent-400 font-bold">Strong</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="w-[85%] bg-accent-500 h-full rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Technical Depth</span>
                            <span className="text-brand-400 font-bold">Improving</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="w-[60%] bg-brand-500 h-full rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

const InterviewSetup: React.FC<{onCancel: () => void, onStart: (data: any) => void}> = ({ onCancel, onStart }) => {
    const [company, setCompany] = useState(COMPANIES[0]);
    const [customCompany, setCustomCompany] = useState('');
    const [role, setRole] = useState(ROLES[0]);
    const [customRole, setCustomRole] = useState('');
    const [jd, setJd] = useState('');
    const [isResumeUploaded, setIsResumeUploaded] = useState(false);

    const handleSubmit = () => {
        onStart({ company, customCompany, role, customRole, jd, isResumeUploaded });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 relative overflow-hidden">
             <div className="fixed inset-0 bg-slate-950 -z-10"></div>
             <div className="max-w-3xl mx-auto relative z-10">
                <button onClick={onCancel} className="flex items-center text-slate-400 hover:text-white mb-8">
                    <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-white mb-2">Configure Session</h1>
                    <p className="text-slate-400">Customize the AI interviewer to match your target role.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Company</label>
                            <div className="relative">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <select 
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:border-accent-500 outline-none"
                                >
                                    {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            {company === 'Other (Custom)' && (
                                <input 
                                    type="text" 
                                    placeholder="Enter company name..."
                                    value={customCompany}
                                    onChange={(e) => setCustomCompany(e.target.value)}
                                    className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-accent-500 outline-none"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Role</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <select 
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:border-accent-500 outline-none"
                                >
                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            {role === 'Other (Custom)' && (
                                <input 
                                    type="text" 
                                    placeholder="Enter job title..."
                                    value={customRole}
                                    onChange={(e) => setCustomRole(e.target.value)}
                                    className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-accent-500 outline-none"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description (Optional)</label>
                        <textarea 
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            placeholder="Paste the job description here..."
                            className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:border-accent-500 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Resume Context</label>
                        <div 
                            onClick={() => setIsResumeUploaded(!isResumeUploaded)}
                            className={`
                                border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
                                ${isResumeUploaded ? 'border-green-500 bg-green-500/10' : 'border-slate-700 hover:border-accent-500 hover:bg-slate-800'}
                            `}
                        >
                            {isResumeUploaded ? (
                                <>
                                    <CheckCircle size={32} className="text-green-500 mb-2" />
                                    <span className="font-bold text-green-400">Resume_v4.pdf Uploaded</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={32} className="text-slate-500 mb-2" />
                                    <span className="font-bold text-slate-300">Click to Upload Resume</span>
                                </>
                            )}
                        </div>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="w-full py-4 bg-gradient-to-r from-accent-600 to-violet-600 hover:from-accent-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        Start Interview Session <ArrowRight size={20} />
                    </button>
                </div>
             </div>
        </div>
    );
};

// --- Mock Room Component ---
const InterviewRoom: React.FC<{config: any, onFinish: (s: InterviewSession) => void, onAbort: (s: InterviewSession) => void}> = ({ config, onFinish, onAbort }) => {
    return (
        <div className="h-screen bg-slate-950 flex flex-col md:flex-row items-center justify-center p-10">
             <div className="text-center space-y-6">
                <Bot size={80} className="mx-auto text-accent-400 animate-pulse" />
                <h1 className="text-4xl font-display font-bold">Interview Arena Active</h1>
                <p className="text-slate-400 max-w-md">Gemini 2.5 is initializing the session for {config.role} at {config.company}.</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={() => onAbort({} as any)} className="px-6 py-3 bg-red-500/10 text-red-400 rounded-xl font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Abort Session</button>
                    <button onClick={() => onFinish({} as any)} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all">Finish Session (Demo)</button>
                </div>
             </div>
        </div>
    );
};

const InterviewAnalysis: React.FC<{ session: InterviewSession, onBack: () => void }> = ({ session, onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </button>
                <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800">
                    <Brain size={60} className="mx-auto text-accent-400 mb-6" />
                    <h2 className="text-3xl font-display font-bold">Session Analytics Loaded</h2>
                    <p className="text-slate-400 mt-2">Analysis details for your mock interview are being processed.</p>
                </div>
            </div>
        </div>
    );
};

const InterviewHistoryList: React.FC<{ sessions: InterviewSession[], onSelect: (s: InterviewSession) => void, onBack: () => void }> = ({ sessions, onSelect, onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-8">
                    <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
                </button>
                <h1 className="text-3xl font-display font-bold text-white mb-8">Interview History</h1>
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div key={session.id} onClick={() => onSelect(session)} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl cursor-pointer hover:border-accent-500 transition-all flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-white text-lg">{session.role}</h3>
                                <p className="text-slate-500 text-sm">{session.company} • {session.date}</p>
                            </div>
                            <ChevronRight className="text-slate-600" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DashboardBackground = () => (
    <>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950 pointer-events-none -z-10"></div>
    </>
);

export default InterviewDashboard;