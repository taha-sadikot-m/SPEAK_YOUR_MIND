
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Users, Building, Shield, Settings, LogOut, Search, 
  MoreVertical, CheckCircle, XCircle, Trash2, Plus, LayoutGrid, 
  Calendar, BookOpen, MessageSquare, Briefcase, TrendingUp, AlertCircle,
  ToggleLeft, ToggleRight, Eye, Edit, Filter, Download, UserCheck, UserX,
  MapPin, Clock, Globe, Award, ChevronRight, X, Save
} from 'lucide-react';

interface SystemAdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

type AdminTab = 'overview' | 'organizations' | 'users' | 'events' | 'courses';

interface Organization {
  id: number;
  name: string;
  domain: string;
  users: number;
  status: 'Active' | 'Disabled';
  industry: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  org: string;
  role: string;
  status: 'Active' | 'Disabled';
}

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  status: 'Registration Open' | 'Drafting' | 'Published';
  pool: string;
  color: string;
}

interface Course {
  id: number;
  title: string;
  students: number;
  modules: number;
  status: 'Active' | 'Draft';
}

const STORAGE_KEYS = {
  ORGS: 'system_admin_organizations',
  USERS: 'system_admin_users',
  EVENTS: 'system_admin_events',
  COURSES: 'system_admin_courses'
};

const INITIAL_ORGS: Organization[] = [
  { id: 1, name: "Google", domain: "@google.com", users: 1240, status: "Active", industry: "Technology" },
  { id: 2, name: "Speak Your Mind", domain: "@sym.io", users: 85, status: "Active", industry: "Education" },
  { id: 3, name: "Initech", domain: "@initech.biz", users: 430, status: "Disabled", industry: "Finance" },
  { id: 4, name: "Tesla", domain: "@tesla.com", users: 890, status: "Active", industry: "Automotive" },
];

const INITIAL_USERS: User[] = [
  { id: 101, name: "John Doe", email: "john@google.com", org: "Google", role: "Gold Orator", status: "Active" },
  { id: 102, name: "Sarah Smith", email: "sarah@sym.io", org: "SYM Academy", role: "Admin", status: "Active" },
  { id: 103, name: "Mike Ross", email: "mike@initech.biz", org: "Initech", role: "Debater", status: "Disabled" },
  { id: 104, name: "Emily Blunt", email: "emily@tesla.com", org: "Tesla", role: "Senior Scholar", status: "Active" },
];

const INITIAL_EVENTS: Event[] = [
  { id: 1, title: "Grand Rhetoric 2024", date: "Nov 15", type: "Oxford Style", status: "Registration Open", pool: "$2,000", color: "from-yellow-400 to-amber-600" },
  { id: 2, title: "Winter Blitz Sparring", date: "Dec 05", type: "Speed Debate", status: "Drafting", pool: "Badges Only", color: "from-blue-400 to-cyan-400" },
  { id: 3, title: "Corporate Interview-a-thon", date: "Jan 12", type: "Mock Marathon", status: "Published", pool: "Recruiter Access", color: "from-purple-400 to-pink-400" },
];

const INITIAL_COURSES: Course[] = [
  { id: 1, title: "Syllogistic Foundations", students: 1200, modules: 8, status: "Active" },
  { id: 2, title: "Emotional Intelligence in Debate", students: 850, modules: 12, status: "Draft" },
  { id: 3, title: "Advanced Body Language", students: 3400, modules: 6, status: "Active" },
];

const SystemAdminDashboard: React.FC<SystemAdminDashboardProps> = ({ onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  
  // Data states
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Initialize data from localStorage
  useEffect(() => {
    const loadedOrgs = localStorage.getItem(STORAGE_KEYS.ORGS);
    const loadedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const loadedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
    const loadedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);

    setOrganizations(loadedOrgs ? JSON.parse(loadedOrgs) : INITIAL_ORGS);
    setUsers(loadedUsers ? JSON.parse(loadedUsers) : INITIAL_USERS);
    setEvents(loadedEvents ? JSON.parse(loadedEvents) : INITIAL_EVENTS);
    setCourses(loadedCourses ? JSON.parse(loadedCourses) : INITIAL_COURSES);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (organizations.length > 0) {
      localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(organizations));
    }
  }, [organizations]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    }
  }, [courses]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col shrink-0 z-20">
        <div className="p-8">
           <div className="flex items-center space-x-3 mb-10">
              <div className="p-2 bg-brand-600 rounded-lg text-white shadow-lg shadow-brand-500/20">
                 <Shield size={24} />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">SYM_SUPER</span>
           </div>
           
           <nav className="space-y-1.5">
              {[
                { id: 'overview', label: 'Analytics', icon: BarChart },
                { id: 'organizations', label: 'Organizations', icon: Building },
                { id: 'users', label: 'All Users', icon: Users },
                { id: 'events', label: 'Global Events', icon: Calendar },
                { id: 'courses', label: 'Course Catalog', icon: BookOpen },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
              <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-widest">
                 {activeTab}
              </h2>
              {activeTab !== 'overview' && (
                 <div className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 border border-slate-700">
                    System Control Active
                 </div>
              )}
           </div>
           
           <div className="flex items-center space-x-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                 <input type="text" placeholder="Quick find..." className="bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs focus:border-brand-500 outline-none w-48 lg:w-64" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                 <Settings size={18} className="text-slate-400" />
              </div>
           </div>
        </header>

        <div className="p-8">
           <AnimatePresence mode="wait">
              {activeTab === 'overview' && <OverviewPanel key="overview" organizations={organizations} users={users} events={events} />}
              {activeTab === 'organizations' && <OrganizationManagementPanel key="orgs" organizations={organizations} setOrganizations={setOrganizations} />}
              {activeTab === 'users' && <UserManagementPanel onOpenProfile={setSelectedProfile} key="users" users={users} setUsers={setUsers} organizations={organizations} />}
              {activeTab === 'events' && <EventsManagementPanel key="events" events={events} setEvents={setEvents} />}
              {activeTab === 'courses' && <CoursesManagementPanel key="courses" courses={courses} setCourses={setCourses} />}
           </AnimatePresence>
        </div>

        {/* Profile Details Drawer */}
        <AnimatePresence>
           {selectedProfile && (
              <ProfileDrawer profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
           )}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

// Fix: Use React.FC to allow React's reserved 'key' prop during conditional rendering in SystemAdminDashboard
const OverviewPanel: React.FC<{ organizations: Organization[], users: User[], events: Event[] }> = ({ organizations, users, events }) => {
  const activeOrgs = organizations.filter(o => o.status === 'Active').length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const totalOrgUsers = organizations.reduce((sum, org) => sum + org.users, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Organizations", value: activeOrgs.toString(), trend: `+${organizations.length - activeOrgs} disabled`, icon: Building, color: "text-blue-400" },
          { label: "Total Active Users", value: totalOrgUsers.toLocaleString(), trend: `${activeUsers} in system`, icon: Users, color: "text-brand-400" },
          { label: "Active Events", value: events.filter(e => e.status !== 'Drafting').length.toString(), trend: `${events.length} total`, icon: Briefcase, color: "text-purple-400" },
          { label: "Total Entries", value: (organizations.length + users.length + events.length).toString(), trend: "Combined", icon: MessageSquare, color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors shadow-2xl">
             <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-slate-950 ${stat.color}`}>
                   <stat.icon size={24} />
                </div>
                <div className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">{stat.trend}</div>
             </div>
             <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
             <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
          </div>
        ))}
     </div>

     <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2"><TrendingUp size={20} className="text-brand-400" /> Platform Growth Index</h3>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                 <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">Week</button>
                 <button className="px-3 py-1 bg-brand-600 text-white rounded text-[10px] font-bold ml-1">Month</button>
              </div>
           </div>
           <div className="h-64 flex items-end justify-between gap-3 px-4">
              {[40, 60, 45, 90, 65, 80, 100, 85, 75, 95, 110, 120].map((h, i) => (
                <div key={i} className="flex-1 bg-brand-600/20 rounded-t-lg relative group transition-all hover:bg-brand-500" style={{ height: `${h}%` }}>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      {h*10} Active Sessions
                   </div>
                </div>
              ))}
           </div>
           <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
           </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><AlertCircle size={20} className="text-yellow-400" /> System Audit Log</h3>
           <div className="space-y-4">
              {[
                { msg: "Organization Disabled: 'Acme Prep'", time: "2m ago", type: "error" },
                { msg: "New Admin Account: Microsoft Org", time: "15m ago", type: "success" },
                { msg: "Platform Event 'Grand Slam' created", time: "1h ago", type: "warning" },
                { msg: "API Rate limit reached: Tesla_API", time: "3h ago", type: "warning" },
              ].map((alert, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition-colors">
                   <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : alert.type === 'warning' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></div>
                   <div>
                      <div className="text-xs text-slate-300 font-bold mb-1">{alert.msg}</div>
                      <div className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">{alert.time}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
     </div>
    </motion.div>
  );
};

// Fix: Use React.FC to allow React's reserved 'key' prop during conditional rendering in SystemAdminDashboard
const OrganizationManagementPanel: React.FC<{ organizations: Organization[], setOrganizations: (orgs: Organization[]) => void }> = ({ organizations, setOrganizations }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

    const toggleStatus = (id: number) => {
        setOrganizations(organizations.map(org => org.id === id ? { ...org, status: org.status === 'Active' ? 'Disabled' : 'Active' } as Organization : org));
    };

    const deleteOrg = (id: number) => {
        if (confirm('Are you sure you want to delete this organization?')) {
            setOrganizations(organizations.filter(org => org.id !== id));
        }
    };

    const handleAddOrg = (orgData: Omit<Organization, 'id'>) => {
        const newOrg = {
            ...orgData,
            id: Math.max(0, ...organizations.map(o => o.id)) + 1
        };
        setOrganizations([...organizations, newOrg]);
        setShowAddModal(false);
    };

    const handleEditOrg = (orgData: Organization) => {
        setOrganizations(organizations.map(org => org.id === orgData.id ? orgData : org));
        setEditingOrg(null);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-2xl font-bold">Organization Registry</h3>
                   <p className="text-slate-400 text-sm">Control platform-level access for enterprises and schools.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                    <Plus size={20} /> Add New Organization
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Organization Info</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Industry</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Seat Usage</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Access Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map(org => (
                            <tr key={org.id} className={`border-b border-slate-800/50 hover:bg-slate-800/20 transition-all ${org.status === 'Disabled' ? 'opacity-60' : ''}`}>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-display font-bold text-brand-400 border border-slate-700">{org.name[0]}</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{org.name}</div>
                                            <div className="text-[10px] text-slate-500 font-mono tracking-tighter">{org.domain}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 rounded-lg bg-slate-950 text-[10px] font-bold text-slate-400 border border-slate-800 uppercase">{org.industry}</span>
                                </td>
                                <td className="px-8 py-6 text-sm font-mono font-bold text-white">{org.users} <span className="text-slate-600">/ 2000</span></td>
                                <td className="px-8 py-6">
                                    <button 
                                        onClick={() => toggleStatus(org.id)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${org.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}
                                    >
                                        {org.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {org.status}
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setEditingOrg(org)} className="p-2 text-slate-400 hover:text-white transition-colors" title="Edit"><Edit size={18} /></button>
                                        <button onClick={() => deleteOrg(org.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors" title="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Organization Modal */}
            {showAddModal && (
                <OrgModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddOrg}
                    title="Add New Organization"
                />
            )}

            {/* Edit Organization Modal */}
            {editingOrg && (
                <OrgModal 
                    onClose={() => setEditingOrg(null)} 
                    onSave={handleEditOrg}
                    title="Edit Organization"
                    initialData={editingOrg}
                />
            )}
        </motion.div>
    );
};

// Fix: Use React.FC to allow React's reserved 'key' prop during conditional rendering in SystemAdminDashboard
const UserManagementPanel: React.FC<{ onOpenProfile: (u: any) => void, users: User[], setUsers: (users: User[]) => void, organizations: Organization[] }> = ({ onOpenProfile, users, setUsers, organizations }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleStatus = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } as User : u));
    };

    const deleteUser = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleAddUser = (userData: Omit<User, 'id'>) => {
        const newUser = {
            ...userData,
            id: Math.max(0, ...users.map(u => u.id)) + 1
        };
        setUsers([...users, newUser]);
        setShowAddModal(false);
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Organization', 'Role', 'Status'];
        const rows = users.map(u => [u.id, u.name, u.email, u.org, u.role, u.status]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users_export.csv';
        a.click();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                   <h3 className="text-2xl font-bold">Global User Directory</h3>
                   <p className="text-slate-400 text-sm">Managing {users.length} accounts across {organizations.length} organizations.</p>
                </div>
                <div className="flex gap-3">
                   <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 border border-brand-500 rounded-xl text-xs font-bold text-white transition-all"><Plus size={16} /> Add User</button>
                   <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"><Download size={16} /> Export CSV</button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">User</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Organization</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Role</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status Control</th>
                            <th className="px-8 py-5 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className={`border-b border-slate-800/50 hover:bg-slate-800/20 transition-all ${u.status === 'Disabled' ? 'opacity-50' : ''}`}>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-400">{u.name[0]}</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{u.name}</div>
                                            <div className="text-[10px] text-slate-500">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm text-slate-300 font-medium">{u.org}</td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold text-brand-400">{u.role}</span>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-3">
                                      <button 
                                        onClick={() => toggleStatus(u.id)}
                                        className={`p-2 rounded-lg transition-all ${u.status === 'Active' ? 'bg-green-500/10 text-green-400 hover:bg-red-500/10 hover:text-red-400' : 'bg-red-500/10 text-red-400 hover:bg-green-500/10 hover:text-green-400'}`}
                                      >
                                         {u.status === 'Active' ? <UserCheck size={18} /> : <UserX size={18} />}
                                      </button>
                                      <span className={`text-[10px] font-bold uppercase tracking-widest ${u.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{u.status}</span>
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => onOpenProfile(u)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                                        >
                                            <Eye size={14} /> VIEW
                                        </button>
                                        <button onClick={() => deleteUser(u.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors" title="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <UserModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddUser}
                    organizations={organizations}
                />
            )}
        </motion.div>
    );
};

// Fix: Use React.FC to allow React's reserved 'key' prop during conditional rendering in SystemAdminDashboard
const EventsManagementPanel: React.FC<{ events: Event[], setEvents: (events: Event[]) => void }> = ({ events, setEvents }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const deleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
        const newEvent = {
            ...eventData,
            id: Math.max(0, ...events.map(e => e.id)) + 1
        };
        setEvents([...events, newEvent]);
        setShowAddModal(false);
    };

    const handleEditEvent = (eventData: Event) => {
        setEvents(events.map(e => e.id === eventData.id ? eventData : e));
        setEditingEvent(null);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                   <h3 className="text-2xl font-bold">Global Events & Competitions</h3>
                   <p className="text-slate-400 text-sm">Design high-stakes challenges for the whole community.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-yellow-500/20 transition-all">
                    <Plus size={20} /> Create Championship
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((ev) => (
                    <div key={ev.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${ev.color}`}></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                <Calendar size={20} className="text-slate-400" />
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${ev.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ev.status === 'Registration Open' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                {ev.status}
                            </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{ev.title}</h4>
                        <div className="space-y-2 mb-8">
                            <div className="flex items-center gap-2 text-xs text-slate-400"><Clock size={14} /> {ev.date}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-400"><Globe size={14} /> {ev.type}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-400"><Award size={14} /> {ev.pool}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingEvent(ev)} className="flex-1 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">Edit Event</button>
                            <button onClick={() => deleteEvent(ev.id)} className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Event Modal */}
            {showAddModal && (
                <EventModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddEvent}
                    title="Create New Event"
                />
            )}

            {/* Edit Event Modal */}
            {editingEvent && (
                <EventModal 
                    onClose={() => setEditingEvent(null)} 
                    onSave={handleEditEvent}
                    title="Edit Event"
                    initialData={editingEvent}
                />
            )}
        </motion.div>
    );
};

// Fix: Use React.FC to allow React's reserved 'key' prop during conditional rendering in SystemAdminDashboard
const CoursesManagementPanel: React.FC<{ courses: Course[], setCourses: (courses: Course[]) => void }> = ({ courses, setCourses }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const deleteCourse = (id: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const handleAddCourse = (courseData: Omit<Course, 'id'>) => {
        const newCourse = {
            ...courseData,
            id: Math.max(0, ...courses.map(c => c.id)) + 1
        };
        setCourses([...courses, newCourse]);
        setShowAddModal(false);
    };

    const handleEditCourse = (courseData: Course) => {
        setCourses(courses.map(c => c.id === courseData.id ? courseData : c));
        setEditingCourse(null);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Curriculum Architect</h3>
                <button onClick={() => setShowAddModal(true)} className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all">
                    <Plus size={20} /> Create New Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 group hover:border-brand-500/30 transition-all">
                        <div className="w-20 h-20 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center text-brand-400 shrink-0 group-hover:bg-brand-500/10 transition-colors">
                            <BookOpen size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                               <h4 className="text-xl font-bold text-white">{course.title}</h4>
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${course.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>{course.status}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
                               <span className="flex items-center gap-1"><Users size={14} /> {course.students}</span>
                               <span className="flex items-center gap-1"><LayoutGrid size={14} /> {course.modules} Units</span>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => setEditingCourse(course)} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"><Edit size={18}/></button>
                            <button onClick={() => deleteCourse(course.id)} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:text-white hover:bg-red-500 transition-all"><Trash2 size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Course Modal */}
            {showAddModal && (
                <CourseModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddCourse}
                    title="Create New Course"
                />
            )}

            {/* Edit Course Modal */}
            {editingCourse && (
                <CourseModal 
                    onClose={() => setEditingCourse(null)} 
                    onSave={handleEditCourse}
                    title="Edit Course"
                    initialData={editingCourse}
                />
            )}
        </motion.div>
    );
};

const ProfileDrawer = ({ profile, onClose }: { profile: any, onClose: () => void }) => (
    <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50 p-8 flex flex-col"
    >
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">User Profile Detail</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><XCircle size={24}/></button>
        </div>

        <div className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 rounded-3xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-4xl font-display font-bold text-brand-400 mb-4 shadow-2xl shadow-brand-500/20">
                {profile.name[0]}
            </div>
            <h4 className="text-2xl font-display font-bold text-white">{profile.name}</h4>
            <div className="text-sm text-slate-500 mb-4">{profile.email}</div>
            <span className="px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{profile.org}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Win Rate</div>
                <div className="text-xl font-mono font-bold text-green-400">68.5%</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">XP Level</div>
                <div className="text-xl font-mono font-bold text-brand-400">2,450</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sessions</div>
                <div className="text-xl font-mono font-bold text-white">142</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Rank</div>
                <div className="text-xl font-mono font-bold text-yellow-400">Gold II</div>
            </div>
        </div>

        <div className="space-y-4">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Administrative Controls</h5>
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-900 border-b border-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <UserX size={18} className="text-red-400" />
                        <span className="text-sm font-bold">Suspend Account</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-900 border-b border-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <Edit size={18} className="text-brand-400" />
                        <span className="text-sm font-bold">Change Organization</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3">
                        <Trash2 size={18} className="text-slate-600" />
                        <span className="text-sm font-bold">Purge User Data</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600" />
                </button>
            </div>
        </div>
        
        <button onClick={onClose} className="mt-auto w-full py-4 bg-white text-slate-950 font-bold rounded-2xl shadow-xl hover:bg-slate-200 transition-colors">Close Details</button>
    </motion.div>
);

// Organization Modal
const OrgModal: React.FC<{ onClose: () => void, onSave: (data: any) => void, title: string, initialData?: Organization }> = ({ onClose, onSave, title, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        domain: initialData?.domain || '',
        users: initialData?.users || 0,
        industry: initialData?.industry || '',
        status: initialData?.status || 'Active' as 'Active' | 'Disabled'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSave({ ...formData, id: initialData.id });
        } else {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Organization Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="e.g., Acme Corp" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Domain</label>
                        <input type="text" required value={formData.domain} onChange={(e) => setFormData({...formData, domain: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="@acme.com" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Industry</label>
                        <select value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none">
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Education">Education</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Initial Users</label>
                        <input type="number" required value={formData.users} onChange={(e) => setFormData({...formData, users: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="0" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-slate-950 border border-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"><Save size={18} /> Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// User Modal
const UserModal: React.FC<{ onClose: () => void, onSave: (data: any) => void, organizations: Organization[] }> = ({ onClose, onSave, organizations }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        org: '',
        role: 'Member',
        status: 'Active' as 'Active' | 'Disabled'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Add New User</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Full Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Organization</label>
                        <select required value={formData.org} onChange={(e) => setFormData({...formData, org: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none">
                            <option value="">Select Organization</option>
                            {organizations.map(org => (
                                <option key={org.id} value={org.name}>{org.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Role</label>
                        <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="Member" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-slate-950 border border-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"><Save size={18} /> Add User</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Event Modal
const EventModal: React.FC<{ onClose: () => void, onSave: (data: any) => void, title: string, initialData?: Event }> = ({ onClose, onSave, title, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        date: initialData?.date || '',
        type: initialData?.type || '',
        status: initialData?.status || 'Drafting' as Event['status'],
        pool: initialData?.pool || '',
        color: initialData?.color || 'from-blue-400 to-cyan-400'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSave({ ...formData, id: initialData.id });
        } else {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Event Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="Grand Championship 2026" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Date</label>
                        <input type="text" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="Jan 15" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Event Type</label>
                        <input type="text" required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="Oxford Style Debate" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Status</label>
                        <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as Event['status']})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none">
                            <option value="Drafting">Drafting</option>
                            <option value="Registration Open">Registration Open</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Prize Pool</label>
                        <input type="text" required value={formData.pool} onChange={(e) => setFormData({...formData, pool: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="$5,000" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Color Theme</label>
                        <select value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none">
                            <option value="from-yellow-400 to-amber-600">Gold</option>
                            <option value="from-blue-400 to-cyan-400">Blue</option>
                            <option value="from-purple-400 to-pink-400">Purple</option>
                            <option value="from-green-400 to-emerald-400">Green</option>
                            <option value="from-red-400 to-orange-400">Red</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-slate-950 border border-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"><Save size={18} /> Save Event</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Course Modal
const CourseModal: React.FC<{ onClose: () => void, onSave: (data: any) => void, title: string, initialData?: Course }> = ({ onClose, onSave, title, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        students: initialData?.students || 0,
        modules: initialData?.modules || 0,
        status: initialData?.status || 'Draft' as 'Active' | 'Draft'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSave({ ...formData, id: initialData.id });
        } else {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Course Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="Public Speaking Mastery" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Number of Modules</label>
                        <input type="number" required value={formData.modules} onChange={(e) => setFormData({...formData, modules: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="8" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Initial Students</label>
                        <input type="number" required value={formData.students} onChange={(e) => setFormData({...formData, students: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" placeholder="0" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Status</label>
                        <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Draft'})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none">
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-slate-950 border border-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"><Save size={18} /> Save Course</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SystemAdminDashboard;
