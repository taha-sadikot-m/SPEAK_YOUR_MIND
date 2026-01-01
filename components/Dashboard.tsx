import React, { useState, useEffect } from 'react';
import { Mic2, LayoutDashboard, Swords, Trophy, Briefcase, Settings, LogOut, MessageSquare, Video, Calendar } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onLogout: () => void;
  defaultTab?: 'debate' | 'interview';
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, defaultTab = 'debate' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
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

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
              <Mic2 size={20} />
            </div>
            <span className="text-xl font-bold font-display text-white">SYM</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">Platform</div>
          <button 
            onClick={() => setActiveTab('debate')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'debate' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Swords size={20} />
            <span className="font-medium">MyDebate</span>
          </button>
          <button 
            onClick={() => setActiveTab('interview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'interview' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Briefcase size={20} />
            <span className="font-medium">MyInterview</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Trophy size={20} />
            <span className="font-medium">Events</span>
          </button>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-8">Account</div>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8">
          <div className="md:hidden flex items-center space-x-2 text-white">
            <Mic2 size={24} />
            <span className="font-bold">SYM</span>
          </div>
          <h2 className="text-xl font-display font-bold text-white hidden md:block">
            {activeTab === 'debate' ? 'Debate Arena' : 'Interview Studio'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-white">
                {currentStudent ? currentStudent.name : 'Student'}
              </span>
              <span className="text-xs text-slate-400">
                {currentStudent ? currentStudent.tier : 'Member'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold">
                {currentStudent ? getInitials(currentStudent.name) : 'ST'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {activeTab === 'debate' ? (
            <div className="space-y-8">
               <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 transition-colors cursor-pointer group">
                     <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-2">Quick Sparring</h3>
                     <p className="text-sm text-slate-400">Practice a random topic with AI for 10 minutes.</p>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-colors cursor-pointer group">
                     <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                        <Swords size={24} />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-2">Ranked Match</h3>
                     <p className="text-sm text-slate-400">Find an opponent and compete for ladder points.</p>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-colors cursor-pointer group">
                     <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                        <Trophy size={24} />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-2">Tournaments</h3>
                     <p className="text-sm text-slate-400">View upcoming events and register your team.</p>
                  </div>
               </div>

               <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                           <div className="flex items-center space-x-4">
                              <div className={`w-2 h-12 rounded-full ${i === 1 ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                              <div>
                                 <div className="font-bold text-white">Topic: Universal Basic Income</div>
                                 <div className="text-xs text-slate-500">2 hours ago • vs AI (Hard)</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="font-mono text-brand-400 font-bold">8.4/10</div>
                              <div className="text-xs text-slate-500">Score</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-8">
               <div className="bg-gradient-to-r from-accent-900/50 to-slate-900 p-8 rounded-3xl border border-accent-500/20 relative overflow-hidden">
                  <div className="relative z-10">
                     <h2 className="text-2xl font-bold text-white mb-2">Start New Session</h2>
                     <p className="text-slate-300 max-w-xl mb-6">Upload a new resume or continue from your previous profile to start a mock interview.</p>
                     <button className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                        Upload Resume & JD
                     </button>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                     <Briefcase size={200} />
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Video size={20} className="mr-2 text-brand-400"/>
                        Video Recordings
                     </h3>
                     <div className="space-y-3">
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-brand-500/30 transition-colors cursor-pointer">
                           Frontend Developer Mock - Yesterday
                        </div>
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-brand-500/30 transition-colors cursor-pointer">
                           Product Manager Behavioral - 3 days ago
                        </div>
                     </div>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Calendar size={20} className="mr-2 text-yellow-400"/>
                        Upcoming
                     </h3>
                     <div className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm">
                        No scheduled interviews
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;