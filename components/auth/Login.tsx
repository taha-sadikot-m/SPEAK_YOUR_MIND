import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Github, Building, User, CheckCircle, ShieldCheck } from 'lucide-react';
import { AppView, UserType } from '../../types';
import AuthLayout from './AuthLayout';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginProps {
  onNavigate: (view: AppView) => void;
  targetView?: AppView;
  onLoginSuccess?: (type: UserType) => void;
}

type LoginType = 'personal' | 'organization';

const MOCK_ORGS = [
  "Google", "Microsoft", "Speak Your Mind", "Amazon", "Meta", "Tesla", "Acme Corp", "Globex", "Initech", "Hooli"
];

const Login: React.FC<LoginProps> = ({ onNavigate, targetView, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>('personal');
  const [isFirstTimeOrgUser, setIsFirstTimeOrgUser] = useState(false);
  
  const [orgSearch, setOrgSearch] = useState('');
  const [showOrgSuggestions, setShowOrgSuggestions] = useState(false);
  const [filteredOrgs, setFilteredOrgs] = useState<string[]>([]);
  const orgInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orgSearch.length > 0) {
      const filtered = MOCK_ORGS.filter(org => 
        org.toLowerCase().includes(orgSearch.toLowerCase())
      );
      setFilteredOrgs(filtered);
      setShowOrgSuggestions(filtered.length > 0);
    } else {
      setShowOrgSuggestions(false);
    }
  }, [orgSearch]);

  const handleOrgSelect = (org: string) => {
    setOrgSearch(org);
    setShowOrgSuggestions(false);
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      if (loginType === 'organization') {
        // Get form data
        const form = e.target as HTMLFormElement;
        const usernameInput = form.querySelector('input[name="username"]') as HTMLInputElement;
        const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
        
        if (usernameInput && passwordInput) {
          const username = usernameInput.value.trim();
          const password = passwordInput.value;
          
          // Check student credentials
          const studentsData = localStorage.getItem('student_credentials');
          if (studentsData) {
            const students = JSON.parse(studentsData);
            
            // Try to find student by roll number or email
            const student = students.find((s: any) => {
              // Match by email
              if (s.email.toLowerCase() === username.toLowerCase()) {
                return s.password === password;
              }
              // Match by roll number
              if (s.userData.rollNumber === username) {
                return s.password === password;
              }
              return false;
            });
            
            if (student) {
              // Store current student data
              localStorage.setItem('current_student', JSON.stringify(student.userData));
              onLoginSuccess?.(UserType.ORGANIZATION);
              return;
            }
          }
        }
        
        // If not a student, check for regular org login
        if (orgSearch === "Speak Your Mind") {
          setIsFirstTimeOrgUser(true);
        } else {
          onLoginSuccess?.(UserType.ORGANIZATION);
        }
      } else {
        onLoginSuccess?.(UserType.PERSONAL);
      }
    }, 1200);
  };

  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess?.(UserType.ORGANIZATION);
    }, 1500);
  };

  if (isFirstTimeOrgUser) {
    return (
      <AuthLayout 
        title="Set New Password" 
        subtitle="This is your first login. Please set a personal password."
        onNavigate={onNavigate}
      >
        <form onSubmit={handleNewPasswordSubmit} className="space-y-5">
          <div className="bg-brand-500/10 border border-brand-500/20 p-4 rounded-xl flex items-center gap-3 mb-4">
            <ShieldCheck className="text-brand-400 shrink-0" size={20} />
            <p className="text-xs text-slate-300">Your organization <span className="text-white font-bold">{orgSearch}</span> requires you to update your credentials.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">New Password</label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400 transition-colors" />
               </div>
               <input type="password" required className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" placeholder="Create your own password" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <span>Complete Account Setup</span>}
          </button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle={
        loginType === 'personal' ? "Sign in to your personal training dashboard." : 
        "Access your organization's speaking portal."
      }
      onNavigate={onNavigate}
    >
      <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-8 relative">
        <button onClick={() => setLoginType('personal')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all relative z-10 ${loginType === 'personal' ? 'text-white' : 'text-slate-500'}`}>
          <User size={14} /> Personal
        </button>
        <button onClick={() => setLoginType('organization')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all relative z-10 ${loginType === 'organization' ? 'text-white' : 'text-slate-500'}`}>
          <Building size={14} /> Organization
        </button>
        <motion.div 
          animate={{ x: loginType === 'personal' ? 0 : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-brand-600 rounded-lg"
        />
      </div>

      <form onSubmit={handleInitialSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          {loginType === 'personal' ? (
            <motion.div key="text-login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-500 group-focus-within:text-brand-400" />
                   </div>
                   <input name="email" type="email" required className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" placeholder="you@example.com" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="org-login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
              <div className="space-y-1.5 relative" ref={orgInputRef}>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Organization</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-slate-500 group-focus-within:text-brand-400" />
                   </div>
                   <input type="text" required value={orgSearch} onChange={(e) => setOrgSearch(e.target.value)} onFocus={() => orgSearch.length > 0 && setShowOrgSuggestions(true)} onBlur={() => setTimeout(() => setShowOrgSuggestions(false), 200)} className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" placeholder="Organization name..." />
                </div>
                <AnimatePresence>
                  {showOrgSuggestions && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50">
                      {filteredOrgs.map((org, i) => (
                        <button key={i} type="button" onClick={() => handleOrgSelect(org)} className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">{org}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Student Roll Number / Email</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-500 group-focus-within:text-brand-400" />
                   </div>
                   <input name="username" type="text" required className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" placeholder="Roll number (e.g., 4501) or email" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
             <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
             <button type="button" onClick={() => onNavigate(AppView.FORGOT_PASSWORD)} className="text-xs text-brand-400 hover:text-brand-300">Forgot?</button>
          </div>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-brand-400" />
             </div>
             <input name="password" type="password" required className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-brand-500 outline-none transition-all" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
          {loading ? <Loader2 size={20} className="animate-spin" /> : <><span>Sign In</span><ArrowRight size={18} /></>}
        </button>
      </form>

      {loginType === 'personal' && (
        <div className="mt-8 text-center text-slate-400 text-sm">
          No account? <button onClick={() => onNavigate(AppView.REGISTER)} className="text-brand-400 font-bold">Sign Up</button>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-800 text-center">
        <button 
          onClick={() => onNavigate(AppView.ADMIN_LOGIN)} 
          className="text-xs text-slate-500 hover:text-brand-400 transition-colors"
        >
          Admin Portal →
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;