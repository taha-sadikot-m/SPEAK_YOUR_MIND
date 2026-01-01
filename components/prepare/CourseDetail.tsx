import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Video, Users, Clock, Calendar, Sparkles, BookOpen, Mic, MessageSquare, DollarSign, Heart, Briefcase } from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-brand-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-white bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <div className={`fixed top-0 left-0 w-full h-96 bg-gradient-to-b ${course.color.replace('from-', 'from-').split(' ')[0]}/20 to-transparent pointer-events-none`}></div>

      {/* Nav */}
      <nav className="relative z-20 px-6 py-8 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 rounded-full border border-brand-500/20">
          <BookOpen size={14} className="text-brand-400" />
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Foundation Course</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-6 pb-20 grid lg:grid-cols-12 gap-12">
        
        {/* Course Info */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-8 shadow-xl`}>
              {course.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              {course.description}
            </p>
          </motion.div>

          {/* Outcomes */}
          <section>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" /> Learning Outcomes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-300 text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Content Placeholder */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
             <h3 className="text-xl font-bold text-white mb-4">Course Overview</h3>
             <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  This course is designed to take students from a basic understanding to mastery of {course.title.toLowerCase()}. Through a combination of live instruction, interactive exercises, and peer-to-peer feedback, you'll gain the skills necessary to excel in any professional or academic environment.
                </p>
                <p>
                  Our curriculum is updated weekly with real-world case studies and the latest research to ensure you're learning the most relevant strategies for today's landscape.
                </p>
             </div>
          </section>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-5">
           <div className="sticky top-24 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <GraduationCap size={120} />
                 </div>
                 
                 <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Age Group</span>
                          <div className="text-2xl font-bold text-white">{course.ageGroup}</div>
                       </div>
                       <div className="text-right">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type</span>
                          <div className="text-sm font-bold text-brand-400">Instructor-Led</div>
                       </div>
                    </div>

                    <div className="w-full h-px bg-slate-800"></div>

                    <button className="w-full py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2">
                       Sign up for free demo <Video size={18} />
                    </button>
                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">No credit card required for demo</p>
                 </div>
              </div>

              {/* Schedule */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                 <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={16} className="text-brand-400" /> Live Class Schedule
                 </h4>
                 <div className="space-y-4">
                    {course.schedule.map((s, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 group hover:border-brand-500/30 transition-all">
                          <div>
                             <div className="text-sm font-bold text-white">{s.day}</div>
                             <div className="text-xs text-slate-500">{s.time}</div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                             <span className="text-[10px] font-bold text-slate-400 uppercase">{s.platform}</span>
                             <div className={`w-2 h-2 rounded-full ${s.platform === 'Zoom' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

const GraduationCap = ({ size, className }: { size?: number, className?: string }) => (
   <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

export default CourseDetail;