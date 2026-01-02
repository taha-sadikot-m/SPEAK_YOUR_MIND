import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyChooseSYM from './components/WhyChooseSYM';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import DebateDashboard from './components/dashboards/DebateDashboard';
import InterviewDashboard from './components/dashboards/InterviewDashboard';
import UserProfile from './components/profile/UserProfile';
import OrgUserProfile from './components/profile/OrgUserProfile';
import CourseDetail from './components/prepare/CourseDetail';
// New Admin Dashboards
import SystemAdminDashboard from './components/admin/SystemAdminDashboard';
import OrgAdminDashboard from './components/admin/OrgAdminDashboard';
// New Debate Modes
import PracticeMode from './components/debate/PracticeMode';
import PVPMode from './components/debate/PVPMode';
import EventsMode from './components/debate/EventsMode';
import SpectateMode from './components/debate/SpectateMode';
// Seed Data
import { initializeSeedData } from './data/seedData';

import { AppView, UserType, Course } from './types';
import { Mic, MessageSquare, DollarSign, Heart, Briefcase } from 'lucide-react';

const COURSES: Record<string, Course> = {
  'public-speaking': {
    id: 'public-speaking',
    title: "Public Speaking",
    description: "Master the art of presence, voice modulation, and stage confidence to captivate any audience.",
    ageGroup: "10-18+",
    outcomes: ["Voice Projection Mastery", "Stage Presence Techniques", "Fear Management", "Impulse Control"],
    icon: <Mic size={24}/>,
    color: "from-blue-500 to-cyan-400",
    schedule: [
      { day: 'Mon & Wed', time: '4:00 PM - 5:30 PM', platform: 'Zoom' },
      { day: 'Sat (Workshop)', time: '11:00 AM - 1:00 PM', platform: 'Meet' }
    ]
  },
  'communication': {
    id: 'communication',
    title: "Communication Skills",
    description: "Develop deep interpersonal connections and master emotional intelligence in your conversations.",
    ageGroup: "All Ages",
    outcomes: ["Active Listening Mastery", "Non-verbal Cues", "Conflict Resolution", "Empathy Building"],
    icon: <MessageSquare size={24}/>,
    color: "from-purple-500 to-pink-500",
    schedule: [
      { day: 'Tue & Thu', time: '5:00 PM - 6:30 PM', platform: 'Meet' },
      { day: 'Sun (Practice)', time: '10:00 AM - 11:30 AM', platform: 'Zoom' }
    ]
  },
  'financial-literacy': {
    id: 'financial-literacy',
    title: "Financial Literacy",
    description: "Build a strong foundation for your future wealth through budgeting, investing, and economic intelligence.",
    ageGroup: "14-25",
    outcomes: ["Budgeting Foundations", "Stock Market Basics", "Wealth Preservation", "Tax Intelligence"],
    icon: <DollarSign size={24}/>,
    color: "from-emerald-500 to-teal-400",
    schedule: [
      { day: 'Fri', time: '6:00 PM - 8:00 PM', platform: 'Zoom' },
      { day: 'Sat', time: '2:00 PM - 4:00 PM', platform: 'Meet' }
    ]
  },
  'sex-education': {
    id: 'sex-education',
    title: "Sex Education",
    description: "Comprehensive health and relationship education focusing on safety, consent, and personal well-being.",
    ageGroup: "13-19",
    outcomes: ["Consent Education", "Health & Safety", "Safe Relationships", "Emotional Boundaries"],
    icon: <Heart size={24}/>,
    color: "from-rose-500 to-orange-400",
    schedule: [
      { day: 'Wed', time: '7:00 PM - 8:30 PM', platform: 'Meet' }
    ]
  },
  'interview-basics': {
    id: 'interview-basics',
    title: "Interview Basics",
    description: "Get corporate ready with the fundamental skills for entry-level and advanced career interviews.",
    ageGroup: "18+",
    outcomes: ["Resume Architecture", "STAR Method Mastery", "Body Language", "Salary Negotiation"],
    icon: <Briefcase size={24}/>,
    color: "from-slate-500 to-slate-400",
    schedule: [
      { day: 'Mon - Fri', time: '12:00 PM - 1:00 PM', platform: 'Zoom' }
    ]
  }
};

function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>(UserType.PERSONAL);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Initialize seed data on first load
  useEffect(() => {
    const isInitialized = localStorage.getItem('seed_data_initialized');
    if (!isInitialized) {
      initializeSeedData();
      localStorage.setItem('seed_data_initialized', 'true');
    }
  }, []);
  const [intendedDashboard, setIntendedDashboard] = useState<AppView>(AppView.DEBATE_DASHBOARD);

  const handleLoginSuccess = (type: UserType) => {
    setIsLoggedIn(true);
    setUserType(type);
    
    if (type === UserType.SYSTEM_ADMIN) {
      setView(AppView.SYSTEM_ADMIN_DASHBOARD);
    } else if (type === UserType.ORG_ADMIN) {
      setView(AppView.ORG_ADMIN_DASHBOARD);
    } else {
      setView(AppView.LANDING);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(UserType.PERSONAL);
    setView(AppView.LANDING);
  };

  const handleFeatureClick = (tab: string) => {
    if (tab.startsWith('course-')) {
       const courseId = tab.replace('course-', '');
       const course = COURSES[courseId];
       if (course) {
          setSelectedCourse(course);
          setView(AppView.PREPARE_COURSE);
       }
       return;
    }

    if (tab === 'prepare') {
        document.getElementById('prepare')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    if (tab === 'perform') {
        if (isLoggedIn) setView(AppView.DEBATE_EVENTS);
        else setView(AppView.LOGIN);
        return;
    }

    const target = tab === 'debate' ? AppView.DEBATE_DASHBOARD : AppView.INTERVIEW_DASHBOARD;
    
    if (isLoggedIn) {
      setView(target);
    } else {
      setIntendedDashboard(target);
      setView(AppView.LOGIN);
    }
  };

  const handleProfileView = () => {
    if (userType === UserType.ORGANIZATION || userType === UserType.ORG_ADMIN) {
      setView(AppView.ORG_MEMBER_PROFILE);
    } else {
      setView(AppView.USER_PROFILE);
    }
  };

  const renderView = () => {
    switch (view) {
      case AppView.LOGIN:
        return (
          <Login 
            onNavigate={setView} 
            onLoginSuccess={(type) => handleLoginSuccess(type)}
            targetView={AppView.LANDING} 
          />
        );
      case AppView.ADMIN_LOGIN:
        return (
          <AdminLogin 
            onNavigate={setView} 
            onLoginSuccess={(type) => handleLoginSuccess(type)}
          />
        );
      case AppView.REGISTER:
        return <Register onNavigate={setView} />;
      case AppView.FORGOT_PASSWORD:
        return <ForgotPassword onNavigate={setView} />;
      case AppView.RESET_PASSWORD:
        return <ResetPassword onNavigate={setView} />;
      
      // Course Detail
      case AppView.PREPARE_COURSE:
        return selectedCourse ? (
           <CourseDetail course={selectedCourse} onBack={() => setView(AppView.LANDING)} />
        ) : null;

      // Admin Dashboards
      case AppView.SYSTEM_ADMIN_DASHBOARD:
        return <SystemAdminDashboard onLogout={handleLogout} onBack={() => setView(AppView.LANDING)} />;
      case AppView.ORG_ADMIN_DASHBOARD:
        return <OrgAdminDashboard onLogout={handleLogout} onBack={() => setView(AppView.LANDING)} />;

      // Dashboards
      case AppView.DEBATE_DASHBOARD:
        return (
          <DebateDashboard 
            onLogout={handleLogout} 
            onBack={() => setView(AppView.LANDING)}
            onViewProfile={handleProfileView}
            onNavigate={setView}
          />
        );
      case AppView.INTERVIEW_DASHBOARD:
        return <InterviewDashboard onLogout={handleLogout} onBack={() => setView(AppView.LANDING)} />;
      case AppView.USER_PROFILE:
        return <UserProfile onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;
      case AppView.ORG_MEMBER_PROFILE:
        return <OrgUserProfile onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;
      
      // Debate Modes
      case AppView.DEBATE_PRACTICE:
        return <PracticeMode onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;
      case AppView.DEBATE_PVP:
        return <PVPMode onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;
      case AppView.DEBATE_EVENTS:
        return <EventsMode onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;
      case AppView.DEBATE_SPECTATE:
        return <SpectateMode onBack={() => setView(AppView.DEBATE_DASHBOARD)} />;

      case AppView.LANDING:
      default:
        return (
          <>
            <Navbar 
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onGetStarted={() => {
                if (isLoggedIn) {
                   const element = document.getElementById('practice');
                   element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                   setIntendedDashboard(AppView.DEBATE_DASHBOARD); 
                   setView(AppView.LOGIN);
                }
              }} 
            />
            <main className="relative z-10">
              <Hero />
              <Features onNavigateToPlatform={handleFeatureClick} />
              <WhyChooseSYM />
              <Partners />
              <Testimonials />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      {renderView()}
    </div>
  );
}

export default App;