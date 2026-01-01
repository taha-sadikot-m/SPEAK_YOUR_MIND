
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserPlus, FileSpreadsheet, Trophy, Shield, LogOut, Search, 
  MoreVertical, CheckCircle, XCircle, Plus, LayoutGrid, Calendar, 
  BookOpen, MessageSquare, Briefcase, TrendingUp, ChevronRight, Filter, Download, ArrowUp, Zap,
  Settings, UserCheck, UserX, Eye, X, Loader2, UploadCloud, Info, Trash2, Edit
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: 'Active' | 'Disabled';
  sessions: number;
  score: number;
}

interface OrgEvent {
  id: string;
  title: string;
  status: 'Live' | 'Draft';
  participants: number;
  maxParticipants: number;
  deadline: string;
  type: 'Debate' | 'Interview';
}

interface OrgAdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

type OrgTab = 'members' | 'events' | 'analytics';

const OrgAdminDashboard: React.FC<OrgAdminDashboardProps> = ({ onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState<OrgTab>('members');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [addMemberCallback, setAddMemberCallback] = useState<((member: Member) => void) | null>(null);

  const handleAddUser = (callback: (member: Member) => void) => {
    setAddMemberCallback(() => callback);
    setShowAddUserModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col shrink-0 z-20">
        <div className="p-8">
           <div className="flex items-center space-x-3 mb-10">
              <div className="p-2 bg-accent-600 rounded-lg text-white shadow-lg shadow-accent-500/20">
                 <BuildingIcon size={24} />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">ORG_CENTRAL</span>
           </div>
           
           <nav className="space-y-1.5">
              {[
                { id: 'members', label: 'Member Control', icon: Users },
                { id: 'events', label: 'Internal Events', icon: Trophy },
                { id: 'analytics', label: 'Impact Data', icon: BarChart3Icon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <tab.icon size={18} />
                  <span className="font-bold text-sm">{tab.label}</span>
                </button>
              ))}
           </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
           <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold group">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Log Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
           <div className="flex flex-col">
              <h2 className="text-lg font-display font-bold text-white uppercase tracking-widest">
                 Speak Your Mind Academy
              </h2>
              <span className="text-[10px] font-bold text-accent-400 tracking-tighter uppercase">Enterprise Workspace</span>
           </div>
           
           <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                 <div className="text-xs font-bold text-white">Sarah Admin</div>
                 <div className="text-[10px] text-slate-500 uppercase">Org Manager</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent-600/10 flex items-center justify-center text-accent-400 font-bold border border-accent-600/30">SA</div>
           </div>
        </header>

        <div className="p-8">
           <AnimatePresence mode="wait">
              {activeTab === 'members' && (
                <MemberManagementTab 
                    onAddSingle={handleAddUser} 
                    onAddBulk={() => setShowBulkUpload(true)}
                    onViewProfile={setSelectedMember}
                />
              )}
              {activeTab === 'events' && <OrgEventsTab />}
              {activeTab === 'analytics' && <OrgAnalyticsTab />}
           </AnimatePresence>
        </div>

        {/* Member Detail Drawer */}
        <AnimatePresence>
            {selectedMember && (
                <MemberDrawer member={selectedMember} onClose={() => setSelectedMember(null)} />
            )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
            {showAddUserModal && <AddUserModal onClose={() => setShowAddUserModal(false)} onSave={addMemberCallback || undefined} />}
            {showBulkUpload && <BulkUploadModal onClose={() => setShowBulkUpload(false)} />}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* --- SUB-TAB COMPONENTS --- */

const MemberManagementTab = ({ onAddSingle, onAddBulk, onViewProfile }: any) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Load members from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('org_admin_members');
        if (stored) {
            setMembers(JSON.parse(stored));
        } else {
            // Initial data
            const initialMembers = [
                { id: "SYM_8829", name: "John Doe", email: "john.doe@academy.com", tier: "Gold Orator", status: "Active" as const, sessions: 42, score: 8.8 },
                { id: "SYM_1021", name: "Sarah Smith", email: "sarah.smith@academy.com", tier: "Silver Rhetoric", status: "Active" as const, sessions: 15, score: 7.2 },
                { id: "SYM_4432", name: "Mike Ross", email: "mike.ross@academy.com", tier: "Bronze Logos", status: "Disabled" as const, sessions: 0, score: 0 },
                { id: "SYM_2931", name: "Emily Blunt", email: "emily.blunt@academy.com", tier: "Gold Orator", status: "Active" as const, sessions: 28, score: 9.1 },
            ];
            setMembers(initialMembers);
            localStorage.setItem('org_admin_members', JSON.stringify(initialMembers));
        }
    }, []);

    // Save to localStorage whenever members change
    useEffect(() => {
        if (members.length > 0) {
            localStorage.setItem('org_admin_members', JSON.stringify(members));
        }
    }, [members]);

    const toggleStatus = (id: string) => {
        setMembers(members.map(m => m.id === id ? { ...m, status: m.status === 'Active' ? 'Disabled' : 'Active' } : m));
    };

    const deleteMember = (id: string) => {
        if (confirm('Are you sure you want to delete this member?')) {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    const addMember = (newMember: Member) => {
        setMembers([...members, newMember]);
    };

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                <div className="flex-1 w-full max-w-md">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by name or SYM_ID..." 
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-accent-500 outline-none shadow-inner" 
                        />
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={onAddBulk} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-xl">
                        <FileSpreadsheet size={18} className="text-green-500" /> Bulk Excel
                    </button>
                    <button onClick={() => onAddSingle(addMember)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-accent-600/20">
                        <UserPlus size={18} /> Add User
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Member Info</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Member ID</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Usage Stats</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(user => (
                            <tr key={user.id} className={`border-b border-slate-800/50 hover:bg-slate-800/10 transition-all ${user.status === 'Disabled' ? 'opacity-50' : ''}`}>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-accent-400 border border-accent-600/20 shadow-inner">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                           <div className="text-sm font-bold text-white">{user.name}</div>
                                           <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user.tier}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-mono text-xs text-slate-400">{user.id}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className="text-sm font-bold text-white">{user.sessions}</div>
                                            <div className="text-[8px] text-slate-500 uppercase font-black">Sessions</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-bold text-accent-400">{user.score || '--'}</div>
                                            <div className="text-[8px] text-slate-500 uppercase font-black">Avg Score</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <button 
                                        onClick={() => toggleStatus(user.id)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${user.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}
                                    >
                                        {user.status}
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => onViewProfile(user)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold transition-colors">VIEW PROFILE</button>
                                        <button onClick={() => deleteMember(user.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

const OrgEventsTab = () => {
    const [events, setEvents] = useState<OrgEvent[]>([]);
    const [editingEvent, setEditingEvent] = useState<OrgEvent | null>(null);
    const [showAddEvent, setShowAddEvent] = useState(false);

    // Load events from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('org_admin_events');
        if (stored) {
            setEvents(JSON.parse(stored));
        } else {
            const initialEvents = [
                { id: "evt_1", title: "Monthly Logic Sprint", status: "Live" as const, participants: 24, maxParticipants: 50, deadline: "2 days left", type: "Debate" as const },
                { id: "evt_2", title: "Quarterly Interview Jam", status: "Draft" as const, participants: 0, maxParticipants: 50, deadline: "Not set", type: "Interview" as const },
            ];
            setEvents(initialEvents);
            localStorage.setItem('org_admin_events', JSON.stringify(initialEvents));
        }
    }, []);

    // Save to localStorage whenever events change
    useEffect(() => {
        if (events.length > 0) {
            localStorage.setItem('org_admin_events', JSON.stringify(events));
        }
    }, [events]);

    const deleteEvent = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const addEvent = (newEvent: Omit<OrgEvent, 'id'>) => {
        const event = { ...newEvent, id: `evt_${Date.now()}` };
        setEvents([...events, event]);
    };

    const updateEvent = (updatedEvent: OrgEvent) => {
        setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-2xl font-bold">Internal Org Events</h3>
                   <p className="text-slate-400 text-sm">Create and manage tournaments exclusive to your academy.</p>
                </div>
                <button onClick={() => setShowAddEvent(true)} className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-accent-600/20">
                    <Plus size={20} /> New Org Challenge
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {events.map((ev) => (
                    <div key={ev.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 group hover:border-accent-500/30 transition-all relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                           {ev.type === 'Debate' ? <Trophy size={100}/> : <Briefcase size={100}/>}
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${ev.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                                {ev.status}
                            </span>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{ev.type} MODE</div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">{ev.title}</h4>
                        <div className="flex gap-8 mb-8">
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-black">Participants</div>
                                <div className="text-lg font-bold text-white">{ev.participants} <span className="text-xs text-slate-600">/ {ev.maxParticipants}</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-black">Timeline</div>
                                <div className="text-sm font-bold text-accent-400">{ev.deadline}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingEvent(ev)} className="flex-1 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">Edit Parameters</button>
                            <button onClick={() => deleteEvent(ev.id)} className="px-4 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Event Modal */}
            {(showAddEvent || editingEvent) && (
                <EventModal
                    onClose={() => {
                        setShowAddEvent(false);
                        setEditingEvent(null);
                    }}
                    onSave={(data) => {
                        if (editingEvent) {
                            updateEvent({ ...data, id: editingEvent.id });
                        } else {
                            addEvent(data);
                        }
                        setShowAddEvent(false);
                        setEditingEvent(null);
                    }}
                    initialData={editingEvent || undefined}
                    title={editingEvent ? 'Edit Event' : 'Create New Event'}
                />
            )}
        </motion.div>
    );
};

const OrgAnalyticsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
     <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Active Members", value: "842", sub: "92% of total seats", icon: Users, color: "text-accent-400" },
          { label: "Org Proficiency", value: "8.4", sub: "+0.5 this month", icon: TrendingUp, color: "text-green-400" },
          { label: "Internal Battles", value: "1,240", sub: "Since inception", icon: Zap, color: "text-yellow-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
             <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-slate-950 ${stat.color} border border-white/5 shadow-lg`}>
                   <stat.icon size={24} />
                </div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
             </div>
             <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
             <div className="text-xs text-slate-400 font-medium">{stat.sub}</div>
          </div>
        ))}
     </div>
  </motion.div>
);

/* --- MODALS & DRAWERS --- */

const AddUserModal = ({ onClose, onSave }: { onClose: () => void, onSave?: (member: Member) => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '',
        tier: 'Bronze Logos'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            const newMember: Member = {
                ...formData,
                status: 'Active',
                sessions: 0,
                score: 0
            };
            onSave(newMember);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              <div className="mb-8">
                 <h2 className="text-2xl font-display font-bold text-white mb-2">Register Member</h2>
                 <p className="text-slate-400 text-xs">Provision a new account with default security parameters.</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Member Full Name</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner" 
                        placeholder="e.g. Harvey Specter" 
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner" 
                        placeholder="e.g. harvey@academy.com" 
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Member ID</label>
                    <input 
                        type="text" 
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner font-mono" 
                        placeholder="e.g. SYM_9921" 
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tier Level</label>
                    <select 
                        value={formData.tier}
                        onChange={(e) => setFormData({...formData, tier: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                    >
                        <option>Bronze Logos</option>
                        <option>Silver Rhetoric</option>
                        <option>Gold Orator</option>
                    </select>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onClose} className="flex-1 py-4 border border-slate-800 rounded-2xl font-bold text-slate-500 hover:text-white transition-colors">Abort</button>
                    <button type="submit" className="flex-1 py-4 bg-accent-600 hover:bg-accent-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-accent-600/30">Create Profile</button>
                 </div>
              </form>
           </motion.div>
        </div>
    );
};

const BulkUploadModal = ({ onClose }: any) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsDone(true);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative text-center">
              <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              
              {!isDone ? (
                <>
                   <div className="w-20 h-20 bg-green-500/10 rounded-3xl border border-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400">
                      <UploadCloud size={40} className={isUploading ? 'animate-bounce' : ''} />
                   </div>
                   <h2 className="text-3xl font-display font-bold text-white mb-2">Bulk Member Onboarding</h2>
                   <p className="text-slate-400 text-sm mb-8">Upload your standardized Excel file (.xlsx) to create multiple profiles at once.</p>
                   
                   <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 mb-8 hover:border-accent-500/50 transition-all cursor-pointer bg-slate-950/50 group">
                      <input type="file" className="hidden" id="file-upload" disabled={isUploading} onChange={handleUpload} />
                      <label htmlFor="file-upload" className="cursor-pointer">
                         {isUploading ? (
                            <div className="flex flex-col items-center">
                               <Loader2 size={32} className="animate-spin text-accent-400 mb-4" />
                               <span className="text-slate-300 font-bold">Verifying Sheet Data...</span>
                            </div>
                         ) : (
                            <>
                               <div className="text-slate-500 group-hover:text-accent-400 transition-colors mb-4 flex justify-center"><FileSpreadsheet size={48}/></div>
                               <div className="text-sm font-bold text-slate-500 group-hover:text-slate-200">Drag file here or <span className="text-accent-400">Browse Files</span></div>
                            </>
                         )}
                      </label>
                   </div>
                   <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors underline uppercase tracking-widest">Download Template CSV</button>
                </>
              ) : (
                <div className="py-10">
                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      <CheckCircle size={48} />
                   </div>
                   <h2 className="text-3xl font-display font-bold text-white mb-2">Upload Successful!</h2>
                   <p className="text-slate-400 mb-8 font-medium">124 profiles were successfully created and provisioned.</p>
                   <button onClick={onClose} className="w-full py-4 bg-white text-slate-950 font-bold rounded-2xl">Return to Dashboard</button>
                </div>
              )}
           </motion.div>
        </div>
    );
};

const EventModal: React.FC<{ 
    onClose: () => void, 
    onSave: (data: Omit<OrgEvent, 'id'>) => void, 
    title: string, 
    initialData?: OrgEvent 
}> = ({ onClose, onSave, title, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        status: initialData?.status || 'Draft' as 'Live' | 'Draft',
        participants: initialData?.participants || 0,
        maxParticipants: initialData?.maxParticipants || 50,
        deadline: initialData?.deadline || '',
        type: initialData?.type || 'Debate' as 'Debate' | 'Interview'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                    <X size={24}/>
                </button>
                <div className="mb-8">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">{title}</h2>
                    <p className="text-slate-400 text-xs">Configure event parameters and timeline</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event Title</label>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                            placeholder="e.g. Spring Debate Tournament"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event Type</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value as 'Debate' | 'Interview'})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                            >
                                <option value="Debate">Debate</option>
                                <option value="Interview">Interview</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as 'Live' | 'Draft'})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Live">Live</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Max Participants</label>
                        <input 
                            type="number" 
                            value={formData.maxParticipants}
                            onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deadline</label>
                        <input 
                            type="text" 
                            value={formData.deadline}
                            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-accent-500 outline-none transition-colors shadow-inner"
                            placeholder="e.g. 7 days left"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-4 border border-slate-800 rounded-2xl font-bold text-slate-500 hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-4 bg-accent-600 hover:bg-accent-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-accent-600/30">
                            {initialData ? 'Update' : 'Create'} Event
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const MemberDrawer = ({ member, onClose }: any) => (
    <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 p-8 flex flex-col"
    >
        <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-accent-500/10 rounded-lg text-accent-400 border border-accent-500/20"><Eye size={20} /></div>
               <h3 className="text-lg font-bold text-white tracking-widest uppercase">Member Insights</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><XCircle size={24}/></button>
        </div>

        <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-2xl bg-accent-600/10 border border-accent-500/20 flex items-center justify-center text-3xl font-display font-bold text-accent-400 shadow-xl shadow-accent-600/10">
                {member.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
               <h4 className="text-2xl font-display font-bold text-white mb-1">{member.name}</h4>
               <div className="text-xs text-slate-500 font-mono mb-2">{member.id}</div>
               <span className="px-3 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 rounded-lg uppercase border border-slate-700">{member.tier}</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-950 p-5 rounded-[1.5rem] border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-5 text-green-500"><Zap size={40}/></div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Performance</div>
                <div className="text-2xl font-display font-bold text-green-400">High</div>
                <div className="text-[10px] text-slate-600 mt-1 font-bold">Top 15% of Org</div>
            </div>
            <div className="bg-slate-950 p-5 rounded-[1.5rem] border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-5 text-accent-500"><TrendingUp size={40}/></div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Growth Rate</div>
                <div className="text-2xl font-display font-bold text-accent-400">+22%</div>
                <div className="text-[10px] text-slate-600 mt-1 font-bold">MoM Improvement</div>
            </div>
        </div>

        <div className="space-y-4 flex-1">
            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Control</h5>
            <div className="bg-slate-950 rounded-[1.5rem] border border-slate-800 overflow-hidden divide-y divide-slate-800">
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-900 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all"><UserX size={18} /></div>
                        <span className="text-sm font-bold">Deactivate Account</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-700" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-900 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-all"><Zap size={18} /></div>
                        <span className="text-sm font-bold">Reset Password Key</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-700" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-900 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><Plus size={18} /></div>
                        <span className="text-sm font-bold">Assign to Internal Event</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-700" />
                </button>
            </div>
        </div>
        
        <button onClick={onClose} className="mt-8 w-full py-4 bg-white text-slate-950 font-bold rounded-[1.5rem] shadow-2xl hover:bg-slate-200 transition-all active:scale-95">Return to List</button>
    </motion.div>
);

// Helpers
const BuildingIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
);

const BarChart3Icon = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);

export default OrgAdminDashboard;
