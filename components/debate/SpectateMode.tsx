import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle, Heart, Share2, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import DebateLayout from './DebateLayout';

interface SpectateModeProps {
  onBack: () => void;
}

const SpectateMode: React.FC<SpectateModeProps> = ({ onBack }) => {
  return (
    <DebateLayout title="The Gallery" subtitle="Live Spectating" onBack={onBack} accentColor="text-purple-400">
      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
         
         {/* Main Stage (Video Feed Mockup) */}
         <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex-1 bg-black rounded-3xl border border-slate-800 relative overflow-hidden group">
               {/* Overlay Info */}
               <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
                  <div>
                     <div className="flex items-center space-x-2 mb-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Live Now</span>
                     </div>
                     <h2 className="text-white font-bold text-xl drop-shadow-md">"Universal Basic Income is Necessary"</h2>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                     <Eye size={14} className="text-purple-400" />
                     <span className="text-xs font-bold text-white">1.2k</span>
                  </div>
               </div>

               {/* Split Screen Video Mockup */}
               <div className="absolute inset-0 flex">
                  <div className="w-1/2 bg-slate-900 border-r border-slate-800 relative">
                     <div className="absolute bottom-4 left-4">
                        <div className="text-white font-bold text-lg drop-shadow-md">Pro_Debater_X</div>
                        <div className="text-green-400 text-xs font-bold">Affirmative</div>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <User size={100} />
                     </div>
                  </div>
                  <div className="w-1/2 bg-slate-900 relative">
                     <div className="absolute bottom-4 right-4 text-right">
                        <div className="text-white font-bold text-lg drop-shadow-md">Logic_Lord</div>
                        <div className="text-red-400 text-xs font-bold">Negative</div>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <User size={100} />
                     </div>
                     {/* Active Speaker Indicator */}
                     <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-1">
                         {[1,2,3,4].map(i => <div key={i} className="w-1 h-8 bg-white/50 animate-pulse rounded-full mx-auto"></div>)}
                     </div>
                  </div>
               </div>

               {/* Live Voting Bar */}
               <div className="absolute bottom-6 left-6 right-6 h-12 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 flex items-center px-4 space-x-4">
                  <ThumbsUp className="text-green-400 cursor-pointer hover:scale-110 transition-transform" size={20} />
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden flex">
                     <div className="bg-green-500 h-full w-[55%] transition-all duration-500"></div>
                     <div className="bg-red-500 h-full w-[45%] transition-all duration-500"></div>
                  </div>
                  <ThumbsDown className="text-red-400 cursor-pointer hover:scale-110 transition-transform" size={20} />
               </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex gap-4">
               <button className="flex-1 bg-slate-900 hover:bg-slate-800 py-3 rounded-xl border border-slate-800 text-slate-300 font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share Debate
               </button>
               <button className="flex-1 bg-slate-900 hover:bg-slate-800 py-3 rounded-xl border border-slate-800 text-slate-300 font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  <Heart size={16} /> Support Streamer
               </button>
            </div>
         </div>

         {/* Right Column: Live Chat */}
         <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950/30">
               <h3 className="text-sm font-bold text-white flex items-center">
                  <MessageCircle size={16} className="mr-2 text-purple-400" />
                  Live Chat
               </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
               {[
                  { user: "User123", msg: "That point about inflation was weak.", color: "text-blue-400" },
                  { user: "DebateFan", msg: "Agreed! He missed the core stat.", color: "text-yellow-400" },
                  { user: "Moderator", msg: "Please keep chat civil.", color: "text-red-400 font-bold" },
                  { user: "Newbie", msg: "Who is winning?", color: "text-slate-400" },
                  { user: "ProViewer", msg: "Affirmative has better structure so far.", color: "text-green-400" },
               ].map((chat, i) => (
                  <div key={i} className="text-sm">
                     <span className={`font-bold mr-2 ${chat.color}`}>{chat.user}:</span>
                     <span className="text-slate-300">{chat.msg}</span>
                  </div>
               ))}
               {/* Simulated fade for old messages */}
               <div className="h-4"></div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800">
               <input 
                  type="text" 
                  placeholder="Say something..." 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm"
               />
            </div>
         </div>
      </div>
    </DebateLayout>
  );
};

export default SpectateMode;