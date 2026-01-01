import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, Mic, Hand, Users, Flag, MessageSquare, Plus, Clock, 
  CheckCircle, XCircle, Search, ChevronRight, Calendar, User, ArrowRight, Shield, Zap, Trophy, BarChart3, Star, Bot, Send, Play, Pause, AudioLines, Globe, UserPlus, Sparkles
} from 'lucide-react';
import DebateLayout from './DebateLayout';

interface PVPModeProps {
  onBack: () => void;
}

type ViewState = 'dashboard' | 'create' | 'arena';
type TabState = 'active' | 'pending';

interface Challenge {
  id: string;
  opponent: string;
  opponentRank: string;
  topic: string;
  status: 'pending' | 'active' | 'completed';
  role: 'Pro' | 'Con';
  rounds: number;
  timestamp: string;
  isIncoming?: boolean; // If true, user needs to accept/reject. If false, user sent it.
}

interface Message {
    id: string;
    sender: 'user' | 'opponent';
    type: 'text' | 'audio';
    content: string; // The text or transcription
    audioDuration?: string;
    timestamp: string;
}

const PVPMode: React.FC<PVPModeProps> = ({ onBack }) => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeTab, setActiveTab] = useState<TabState>('active');
  const [selectedBattle, setSelectedBattle] = useState<Challenge | null>(null);

  // Mock Data
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      opponent: 'Sarah_Logic',
      opponentRank: 'Gold II',
      topic: 'Universal Basic Income is necessary for the future',
      status: 'active',
      role: 'Pro',
      rounds: 2,
      timestamp: 'Started 5m ago'
    },
    {
      id: '2',
      opponent: 'DebateKing_99',
      opponentRank: 'Silver I',
      topic: 'Space exploration is a waste of resources',
      status: 'pending',
      role: 'Con',
      rounds: 1,
      timestamp: 'Received 2h ago',
      isIncoming: true
    },
    {
      id: '3',
      opponent: 'Alex_Rhetoric',
      opponentRank: 'Platinum III',
      topic: 'AI will replace human teachers',
      status: 'pending',
      role: 'Pro',
      rounds: 3,
      timestamp: 'Sent 1d ago',
      isIncoming: false
    }
  ]);

  // Actions
  const handleAccept = (id: string) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'active', timestamp: 'Starting now...' } : c));
    setActiveTab('active');
  };

  const handleReject = (id: string) => {
    setChallenges(prev => prev.filter(c => c.id !== id));
  };

  const handleCreateChallenge = (data: any) => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      opponent: data.opponent || 'Random_User',
      opponentRank: 'Unranked',
      topic: data.topic,
      status: 'pending',
      role: data.role === 'Pro' ? 'Pro' : 'Con',
      rounds: parseInt(data.rounds),
      timestamp: 'Just now',
      isIncoming: false
    };
    setChallenges([newChallenge, ...challenges]);
    setView('dashboard');
    setActiveTab('pending');
  };

  const enterArena = (battle: Challenge) => {
    setSelectedBattle(battle);
    setView('arena');
  };

  const endDebate = () => {
    // In a real app, this would save to history/backend
    if (selectedBattle) {
        setChallenges(prev => prev.filter(c => c.id !== selectedBattle.id));
    }
    setView('dashboard');
    setSelectedBattle(null);
  };

  // --- Views ---

  if (view === 'create') {
    return (
        <CreateChallengeView 
            onCancel={() => setView('dashboard')} 
            onSubmit={handleCreateChallenge} 
        />
    );
  }

  if (view === 'arena' && selectedBattle) {
    return (
        <ActiveArenaView 
            battle={selectedBattle} 
            onExit={endDebate} 
        />
    );
  }

  // Dashboard View
  const filteredChallenges = challenges.filter(c => c.status === activeTab);

  return (
    <DebateLayout title="1:1 Debate Arena" subtitle="PVP Challenges" onBack={onBack} accentColor="text-red-400">
      <div className="max-w-5xl mx-auto min-h-[600px]">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="bg-slate-900/50 p-1 rounded-xl flex space-x-1 border border-slate-800">
                <button 
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    <Swords size={16} />
                    Active Battles
                    {challenges.filter(c => c.status === 'active').length > 0 && (
                        <span className="bg-white text-red-600 px-1.5 py-0.5 rounded text-[10px]">{challenges.filter(c => c.status === 'active').length}</span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'pending' ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    <Clock size={16} />
                    Pending
                    {challenges.filter(c => c.status === 'pending').length > 0 && (
                        <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">{challenges.filter(c => c.status === 'pending').length}</span>
                    )}
                </button>
            </div>

            <button 
                onClick={() => setView('create')}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-xl shadow-white/5"
            >
                <Plus size={18} />
                <span>Create Challenge</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-50" />
            </button>
        </div>

        {/* Content List */}
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {filteredChallenges.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed"
                    >
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                            {activeTab === 'active' ? <Swords size={32} /> : <Clock size={32} />}
                        </div>
                        <h3 className="text-xl font-bold text-slate-400 mb-2">No {activeTab} challenges found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            {activeTab === 'active' 
                                ? "You don't have any ongoing debates. Check your pending requests or start a new one!" 
                                : "No pending challenges. Create a new challenge to invite opponents."}
                        </p>
                    </motion.div>
                ) : (
                    filteredChallenges.map((challenge) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                {/* Left: Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                            challenge.status === 'active' 
                                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                            {challenge.status === 'active' ? 'Live Arena' : 'Pending Request'}
                                        </span>
                                        <span className="text-slate-500 text-xs flex items-center gap-1">
                                            <Calendar size={10} /> {challenge.timestamp}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{challenge.topic}</h3>
                                    <div className="flex items-center gap-6 text-sm text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
                                                {challenge.opponent.substring(0,2).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-white">{challenge.opponent}</span>
                                            <span className="text-xs px-1.5 py-0.5 bg-slate-800 rounded text-slate-500">{challenge.opponentRank}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Shield size={14} />
                                            Role: <span className={challenge.role === 'Pro' ? 'text-green-400' : 'text-red-400'}>{challenge.role}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Zap size={14} />
                                            {challenge.rounds} Rounds
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    {challenge.status === 'active' ? (
                                        <button 
                                            onClick={() => enterArena(challenge)}
                                            className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all hover:scale-105"
                                        >
                                            <span>Enter Arena</span>
                                            <Swords size={18} />
                                        </button>
                                    ) : (
                                        <>
                                            {challenge.isIncoming ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleReject(challenge.id)}
                                                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors border border-slate-700"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAccept(challenge.id)}
                                                        className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all"
                                                    >
                                                        <CheckCircle size={18} />
                                                        Accept Challenge
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="px-6 py-3 bg-slate-800/50 text-slate-500 font-bold rounded-xl border border-slate-800 flex items-center gap-2 cursor-not-allowed">
                                                    <Clock size={18} />
                                                    Awaiting Opponent
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
      </div>
    </DebateLayout>
  );
};

// --- Sub-Component: Create Challenge Form (Enhanced) ---
const CreateChallengeView = ({ onCancel, onSubmit }: { onCancel: () => void, onSubmit: (data: any) => void }) => {
    const [step, setStep] = useState(1);
    const [opponentType, setOpponentType] = useState<'random' | 'direct' | null>(null);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        topic: '',
        role: 'Pro',
        rounds: '2 Rounds',
        timePerRound: '2 Minutes'
    });

    // Mock users for search
    const onlineUsers = [
        { name: "Sarah_Logic", rank: "Gold II", status: "Online" },
        { name: "DebateKing_99", rank: "Silver I", status: "In Match" },
        { name: "Alex_Rhetoric", rank: "Platinum III", status: "Online" },
        { name: "Iron_Sophist", rank: "Bronze I", status: "Online" }
    ];

    const filteredUsers = onlineUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const suggestions = [
        "AI will replace human teachers within 20 years",
        "Social media does more harm than good to society",
        "Universal Basic Income is necessary for the future",
        "Space exploration is a waste of resources",
    ];

    const handleSend = () => {
        const opponent = opponentType === 'random' ? 'Random Matchmaking' : (selectedUser || 'Unknown');
        onSubmit({ ...formData, opponent });
    };

    return (
        <DebateLayout title="New Challenge" subtitle="Configure Match" onBack={onCancel} accentColor="text-white">
            <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Left: Configuration Panel */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* 1. Opponent Selection */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                             
                             <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span>
                                Select Opponent Mode
                             </h3>

                             <div className="grid md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => { setOpponentType('random'); setSelectedUser(null); }}
                                    className={`relative p-6 rounded-2xl border text-left transition-all overflow-hidden ${opponentType === 'random' ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                                >
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className={`p-3 rounded-xl ${opponentType === 'random' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-500'}`}>
                                            <Globe size={24} />
                                        </div>
                                        {opponentType === 'random' && <div className="text-cyan-400"><CheckCircle size={20} /></div>}
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-1 relative z-10">Quick Match</h4>
                                    <p className="text-slate-400 text-xs relative z-10">Find a similarly ranked opponent instantly.</p>
                                    {opponentType === 'random' && <div className="absolute inset-0 bg-cyan-500/5"></div>}
                                </button>

                                <button 
                                    onClick={() => setOpponentType('direct')}
                                    className={`relative p-6 rounded-2xl border text-left transition-all overflow-hidden ${opponentType === 'direct' ? 'bg-purple-900/20 border-purple-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                                >
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className={`p-3 rounded-xl ${opponentType === 'direct' ? 'bg-purple-500 text-white' : 'bg-slate-900 text-purple-500'}`}>
                                            <UserPlus size={24} />
                                        </div>
                                        {opponentType === 'direct' && <div className="text-purple-400"><CheckCircle size={20} /></div>}
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-1 relative z-10">Direct Challenge</h4>
                                    <p className="text-slate-400 text-xs relative z-10">Invite a friend or search for a specific user.</p>
                                    {opponentType === 'direct' && <div className="absolute inset-0 bg-purple-500/5"></div>}
                                </button>
                             </div>

                             {/* Direct Challenge Search Area */}
                             <AnimatePresence>
                                 {opponentType === 'direct' && (
                                     <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-6 border-t border-slate-800 pt-6 overflow-hidden"
                                     >
                                         <div className="relative mb-4">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input 
                                                type="text" 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search username..."
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                                            />
                                         </div>
                                         <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                                             {filteredUsers.map((user, i) => (
                                                 <div 
                                                    key={i}
                                                    onClick={() => setSelectedUser(user.name)}
                                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${selectedUser === user.name ? 'bg-purple-500/10 border-purple-500/50' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'}`}
                                                 >
                                                     <div className="flex items-center gap-3">
                                                         <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">
                                                             {user.name.substring(0,2).toUpperCase()}
                                                         </div>
                                                         <div>
                                                             <div className="text-sm font-bold text-white">{user.name}</div>
                                                             <div className="text-[10px] text-slate-500">{user.rank}</div>
                                                         </div>
                                                     </div>
                                                     <div className="flex items-center gap-2">
                                                         <div className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                         <span className="text-[10px] text-slate-400">{user.status}</span>
                                                     </div>
                                                 </div>
                                             ))}
                                         </div>
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                        </div>

                        {/* 2. Topic Configuration */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">2</span>
                                Set Topic & Rules
                             </h3>
                            
                             <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Debate Topic</label>
                                    <input 
                                        type="text" 
                                        value={formData.topic}
                                        onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                        placeholder="e.g. Artificial Intelligence will replace doctors..."
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-colors"
                                    />
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {suggestions.map((s, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setFormData({...formData, topic: s})}
                                                className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg text-[10px] text-slate-400 hover:text-white transition-colors"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Side</label>
                                        <select 
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none"
                                        >
                                            <option value="Pro">Pro (For)</option>
                                            <option value="Con">Con (Against)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Rounds</label>
                                        <select 
                                            value={formData.rounds}
                                            onChange={(e) => setFormData({...formData, rounds: e.target.value})}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none"
                                        >
                                            <option value="1">1 Round</option>
                                            <option value="2">2 Rounds</option>
                                            <option value="3">3 Rounds</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Time / Round</label>
                                        <select 
                                            value={formData.timePerRound}
                                            onChange={(e) => setFormData({...formData, timePerRound: e.target.value})}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none"
                                        >
                                            <option value="1 Minute">1 Minute</option>
                                            <option value="2 Minutes">2 Minutes</option>
                                            <option value="3 Minutes">3 Minutes</option>
                                        </select>
                                    </div>
                                </div>
                             </div>
                        </div>

                    </div>

                    {/* Right: Summary & Action */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                                <h4 className="text-white font-bold mb-4 flex items-center">
                                    <Sparkles size={16} className="text-cyan-400 mr-2" />
                                    Match Summary
                                </h4>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between pb-3 border-b border-slate-800">
                                        <span className="text-slate-500">Opponent</span>
                                        <span className="text-white font-medium">
                                            {opponentType === 'random' ? 'Quick Match (Auto)' : (selectedUser || 'Not Selected')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-slate-800">
                                        <span className="text-slate-500">Topic</span>
                                        <span className="text-white font-medium truncate max-w-[150px]">{formData.topic || 'Not set'}</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-slate-800">
                                        <span className="text-slate-500">Settings</span>
                                        <span className="text-white font-medium">{formData.rounds}, {formData.role}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Est. Duration</span>
                                        <span className="text-cyan-400 font-bold">~15 Mins</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleSend}
                                disabled={!opponentType || (opponentType === 'direct' && !selectedUser) || !formData.topic}
                                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                <Swords size={20} />
                                Send Challenge
                            </button>
                            
                            <button 
                                onClick={onCancel}
                                className="w-full py-3 bg-transparent text-slate-500 font-bold hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </DebateLayout>
    );
};

// --- Helper: Audio Message Component ---
const AudioMessage = ({ duration, sender }: { duration: string, sender: 'user' | 'opponent' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    return (
        <div className={`
            flex items-center gap-3 p-3 rounded-xl border mb-2
            ${sender === 'user' 
                ? 'bg-brand-900/40 border-brand-500/30' 
                : 'bg-slate-900/40 border-slate-700/50'}
        `}>
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0
                    ${sender === 'user' ? 'bg-brand-500 text-white' : 'bg-slate-700 text-white'}
                `}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            
            <div className="flex-1 space-y-1">
                <div className="h-6 flex items-center gap-0.5 opacity-70">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 rounded-full ${sender === 'user' ? 'bg-brand-400' : 'bg-slate-400'}`}
                            style={{ 
                                height: isPlaying ? `${Math.random() * 100}%` : `${Math.sin(i) * 50 + 50}%`,
                                transition: 'height 0.2s ease'
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            
            <span className="text-[10px] font-mono opacity-60 tabular-nums">
                {duration}
            </span>
        </div>
    );
};

// --- Sub-Component: Active Arena ---
const ActiveArenaView = ({ battle, onExit }: { battle: Challenge, onExit: () => void }) => {
    const [showResult, setShowResult] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Timer State
    const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Initial Messages (Past History)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'opponent',
            type: 'audio',
            content: "While the initial cost is high, the long-term reduction in poverty-related expenses—healthcare, crime, administration—makes UBI a fiscally responsible choice. It simplifies the welfare state.",
            audioDuration: "0:14",
            timestamp: "10:02 AM"
        },
        {
            id: '2',
            sender: 'opponent',
            type: 'text',
            content: "Furthermore, automation is displacing jobs at an unprecedented rate. We need a safety net that is decoupled from employment.",
            timestamp: "10:03 AM"
        }
    ]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            type: 'text',
            content: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            // Stop Recording - Simulate sending an audio message
            setIsRecording(false);
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: 'user',
                type: 'audio',
                content: "I argue that UBI might actually disincentivize work. Without the necessity to earn, productivity could plummet, damaging the economy we rely on to fund the program.",
                audioDuration: "0:12",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
        } else {
            setIsRecording(true);
        }
    };

    const handleFinish = () => {
        setShowResult(true);
    };

    return (
        <DebateLayout title="The Arena" subtitle={`Ranked Match • ${battle.opponentRank}`} onBack={onExit} accentColor="text-red-400">
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
             
             {/* Result Modal Overlay */}
             <AnimatePresence>
                {showResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-red-500"></div>
                            
                            <div className="text-center mb-8">
                                <div className="inline-block p-4 bg-brand-500/20 rounded-full text-brand-400 mb-4 border border-brand-500/30">
                                    <Trophy size={40} className="fill-current" />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white mb-2">Debate Concluded</h2>
                                <p className="text-slate-400">Winner: <span className="text-brand-400 font-bold">You</span></p>
                            </div>

                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-400 font-bold text-xs uppercase">Total Score</span>
                                    <span className="text-2xl font-mono font-bold text-white">1,340 pts</span>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Logical Consistency</span>
                                        <span className="text-green-400 font-bold">94/100</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Emotional Resonance</span>
                                        <span className="text-yellow-400 font-bold">88/100</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Rebuttal Strength</span>
                                        <span className="text-brand-400 font-bold">91/100</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={onExit}
                                className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Return to Dashboard
                            </button>
                        </motion.div>
                    </div>
                )}
             </AnimatePresence>

             {/* Sidebar (Desktop Only) - Info Card */}
             <div className="hidden lg:flex lg:col-span-4 flex-col h-full">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-lg h-full flex flex-col relative overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                        {/* Topic Section */}
                        <div className="mb-8 relative z-10">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="p-1.5 bg-red-500/10 rounded-md text-red-400"><Swords size={12} /></span>
                                <span>Current Motion</span>
                            </div>
                            <h2 className="text-xl font-display font-bold text-white leading-tight">
                                "{battle.topic}"
                            </h2>
                        </div>

                        {/* Stats / Timer */}
                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Round</div>
                                <div className="text-2xl font-mono font-bold text-white">2 <span className="text-sm text-slate-600">/ {battle.rounds}</span></div>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Time Left</div>
                                <div className="text-2xl font-mono font-bold text-red-400">{formatTime(timeLeft)}</div>
                            </div>
                        </div>

                        {/* Players */}
                        <div className="space-y-4 flex-1 relative z-10">
                             {/* User */}
                             <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-900/10 border border-brand-500/20">
                                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 border border-brand-500/30">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">You</div>
                                    <div className="text-xs text-brand-400 font-bold uppercase">{battle.role}</div>
                                </div>
                             </div>
                             
                             <div className="flex justify-center">
                                <div className="w-px h-8 bg-slate-800"></div>
                             </div>

                             {/* Opponent */}
                             <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/30 border border-slate-800">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
                                    {battle.opponent.substring(0,2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{battle.opponent}</div>
                                    <div className="text-xs text-red-400 font-bold uppercase">{battle.role === 'Pro' ? 'Con' : 'Pro'}</div>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">{battle.opponentRank}</span>
                                </div>
                             </div>
                        </div>

                        {/* Status Footer */}
                         <div className="mt-auto pt-6 border-t border-slate-800/50 relative z-10">
                             <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                                <span>Live Connection</span>
                                <span className="flex items-center gap-1 text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Stable</span>
                             </div>
                          </div>
                    </div>
             </div>

             {/* Right Column: Chat Interface */}
             <div className="col-span-12 lg:col-span-8 flex flex-col h-full">

                {/* Top Bar: Compact Game State (Mobile Only) */}
                <div className="lg:hidden shrink-0 mb-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                            <User className="text-brand-400" size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-brand-400 font-bold uppercase tracking-wider">You ({battle.role})</div>
                            <div className="h-1.5 w-24 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-brand-500 w-[75%] shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Round 2</div>
                        <div className="px-4 py-1 bg-slate-800 rounded-lg border border-slate-700 text-xl font-mono font-bold text-white">{formatTime(timeLeft)}</div>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                        <div>
                            <div className="text-xs text-red-400 font-bold uppercase tracking-wider">{battle.opponent}</div>
                            <div className="h-1.5 w-24 bg-slate-800 rounded-full mt-1 overflow-hidden ml-auto">
                                <div className="h-full bg-red-500 w-[65%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <User className="text-red-400" size={20} />
                        </div>
                    </div>
                </div>
        
                {/* Chat History Area */}
                <div className="flex-1 flex flex-col bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl">
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
                        <div className="text-center py-4">
                            <div className="inline-block px-3 py-1 bg-slate-900 rounded-full text-[10px] text-slate-500 border border-slate-800 uppercase tracking-widest">
                                Debate Started • {battle.timestamp}
                            </div>
                        </div>

                        {messages.map((msg) => (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {/* Avatar */}
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg mt-1
                                    ${msg.sender === 'user' 
                                        ? 'bg-brand-500/20 border-brand-500/30 text-brand-400' 
                                        : 'bg-red-500/20 border-red-500/30 text-red-400'}
                                `}>
                                    {msg.sender === 'user' ? "JD" : battle.opponent.substring(0,2).toUpperCase()}
                                </div>

                                {/* Content */}
                                <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                                    <div className={`
                                        p-4 rounded-2xl text-sm leading-relaxed border shadow-md relative group
                                        ${msg.sender === 'user'
                                        ? 'bg-brand-900/20 border-brand-500/20 text-white rounded-tr-none'
                                        : 'bg-slate-800/80 border-slate-700 text-slate-200 rounded-tl-none'}
                                    `}>
                                        {msg.type === 'audio' && msg.audioDuration && (
                                            <>
                                                <AudioMessage duration={msg.audioDuration} sender={msg.sender} />
                                                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                                                    <MessageSquare size={10} /> Transcript
                                                </div>
                                            </>
                                        )}
                                        
                                        <p className={msg.type === 'audio' ? 'text-slate-300 italic pl-2 border-l-2 border-slate-600' : ''}>
                                            {msg.content}
                                        </p>

                                        <div className={`text-[10px] mt-2 opacity-50 font-mono ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp}
                                        </div >
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        <div ref={chatEndRef} />
                    </div>
        
                    {/* Bottom Input Deck */}
                    <div className="shrink-0 bg-slate-950 border-t border-slate-800 p-4 relative z-20">
                        <div className="flex items-end gap-2">
                            {/* Recording Button */}
                            <button 
                                    onClick={handleToggleRecording}
                                    className={`
                                        h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
                                        ${isRecording 
                                            ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse' 
                                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}
                                    `}
                            >
                                {isRecording ? <AudioLines size={20} /> : <Mic size={20} />}
                            </button>

                            {/* Text Input */}
                            <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 relative">
                                {isRecording ? (
                                    <div className="h-12 flex items-center px-4 text-red-400 font-mono text-sm animate-pulse">
                                        Recording audio... Click mic to stop.
                                    </div>
                                ) : (
                                    <textarea 
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        placeholder="Type your argument here..."
                                        className="w-full bg-transparent text-white p-3 pr-12 outline-none text-sm resize-none h-12 max-h-32 scrollbar-hide focus:ring-0"
                                    />
                                )}
                                
                                {!isRecording && (
                                    <button 
                                            onClick={handleSendMessage}
                                            disabled={!inputText.trim()}
                                            className="absolute right-1 bottom-1 p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 disabled:opacity-0 disabled:pointer-events-none transition-all"
                                    >
                                            <Send size={16} />
                                    </button>
                                )}
                            </div>

                            <button 
                                    onClick={handleFinish}
                                    className="h-12 w-12 rounded-xl bg-slate-800 text-yellow-500 hover:bg-slate-700 flex flex-col items-center justify-center gap-0.5 border border-slate-700 transition-colors shrink-0"
                                    title="End Debate"
                            >
                                    <Flag size={18} />
                            </button>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </DebateLayout>
    );
};

export default PVPMode;