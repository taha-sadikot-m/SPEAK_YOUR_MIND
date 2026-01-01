import React from 'react';
import { Mic2, Twitter, Linkedin, Instagram, Github, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-24 pb-12">
      <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
           <div className="mb-12 md:mb-0">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="bg-white text-slate-950 p-2 rounded-lg">
                    <Mic2 size={24} />
                 </div>
                 <span className="text-2xl font-display font-bold text-white">SYM</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-lg leading-tight">
                 Ready to find your voice?
              </h2>
           </div>
           
           <div className="flex gap-4">
              <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold transition-colors">
                 Get Started
              </button>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-900 pt-16 mb-16">
           <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-400">
                 <li><a href="#" className="hover:text-brand-400 transition-colors">MyDebate</a></li>
                 <li><a href="#" className="hover:text-brand-400 transition-colors">MyInterview</a></li>
                 <li><a href="#" className="hover:text-brand-400 transition-colors">Events</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400">
                 <li><a href="#" className="hover:text-brand-400 transition-colors">About</a></li>
                 <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
                 <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400">
                 <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy</a></li>
                 <li><a href="#" className="hover:text-brand-400 transition-colors">Terms</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Social</h4>
              <div className="flex space-x-4">
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
              </div>
           </div>
        </div>

        <div className="flex justify-between items-center text-slate-600 text-sm">
           <p>&copy; {new Date().getFullYear()} Speak Your Mind. All rights reserved.</p>
           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Systems Operational</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;