import React, { useState, useEffect } from 'react';
import { Menu, X, Mic2, Sparkles, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onGetStarted: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted, isLoggedIn, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load current student data from localStorage when logged in
    if (isLoggedIn) {
      const studentData = localStorage.getItem('current_student');
      if (studentData) {
        setCurrentStudent(JSON.parse(studentData));
      }
    }
  }, [isLoggedIn]);

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
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
          w-full max-w-[95%] 2xl:max-w-[90%]
          ${isScrolled || isMobileMenuOpen ? 'glass-nav shadow-2xl shadow-violet-900/20' : 'bg-transparent border border-transparent'}
        `}>
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative bg-slate-900 p-2 rounded-full text-white border border-slate-700">
                <Mic2 size={20} />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              SYM
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {['MyDebate', 'MyInterview', 'Events'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA / User Profile */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center text-[10px] font-bold">
                    {currentStudent ? getInitials(currentStudent.name) : 'ST'}
                  </div>
                  <span className="text-xs font-medium text-slate-200">
                    {currentStudent ? currentStudent.name : 'Student'}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onGetStarted}
                className="group relative px-6 py-2 rounded-full bg-white text-slate-950 font-semibold text-sm overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2 group-hover:text-white transition-colors">
                  <span>Get Started</span>
                  <Sparkles size={14} />
                </span>
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-24 z-40 glass-nav rounded-3xl p-6 md:hidden border border-slate-700"
          >
             <div className="flex flex-col space-y-4">
               {['MyDebate', 'MyInterview', 'Events'].map((item) => (
                 <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-lg font-medium text-slate-200 py-2 border-b border-slate-800"
                 >
                   {item}
                 </a>
               ))}
               
               {isLoggedIn ? (
                  <button 
                   onClick={() => {
                     setIsMobileMenuOpen(false);
                     if(onLogout) onLogout();
                   }}
                   className="bg-red-500/10 text-red-400 w-full py-4 rounded-xl font-bold mt-4 border border-red-500/20"
                 >
                   Sign Out
                 </button>
               ) : (
                 <button 
                   onClick={() => {
                     setIsMobileMenuOpen(false);
                     onGetStarted();
                   }}
                   className="bg-gradient-to-r from-brand-600 to-accent-600 text-white w-full py-4 rounded-xl font-bold mt-4"
                 >
                   Get Started Now
                 </button>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;