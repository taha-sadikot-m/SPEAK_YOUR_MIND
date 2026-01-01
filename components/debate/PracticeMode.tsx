import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, Send, Bot, RefreshCw, Zap, Brain, AlertCircle, BarChart3, Pause, Play, 
  Swords, BookOpen, Lightbulb, Shield, User, Crown, Flame, Sprout, ArrowRight, Settings, Info, Loader2
} from 'lucide-react';
import DebateLayout from './DebateLayout';
import { generateDebateOpening } from '../../services/geminiService';

interface PracticeModeProps {
  onBack: () => void;
}

type Mode = 'topic' | 'scenario';
type Difficulty = 'easy' | 'medium' | 'hard';
type Position = 'supporting' | 'opposing';
type Opening = 'user' | 'ai';

const PracticeMode: React.FC<PracticeModeProps> = ({ onBack }) => {
  // Session State
  const [isSetup, setIsSetup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Configuration State
  const [mode, setMode] = useState<Mode>('topic');
  const [topicInput, setTopicInput] = useState('');
  const [scenarioInput, setScenarioInput] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [position, setPosition] = useState<Position>('supporting');
  const [opening, setOpening] = useState<Opening>('user');

  // Active Session State
  const [isRecording, setIsRecording] = useState(false);
  
  // Messages
  const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);

  const startDebate = async () => {
    if ((mode === 'topic' && topicInput) || (mode === 'scenario' && scenarioInput)) {
      
      const topic = mode === 'topic' ? topicInput : scenarioInput;
      const role = position === 'supporting' ? 'Pro' : 'Con';

      if (opening === 'ai') {
         setIsLoading(true);
         try {
            const aiResponse = await generateDebateOpening(topic, { difficulty, userRole: role });
            setMessages([
               { sender: 'ai', text: aiResponse }
            ]);
         } catch (error) {
            setMessages([
               { sender: 'ai', text: "I'm ready. Let's begin the debate." }
            ]);
         }
         setIsLoading(false);
      } else {
         // User starts - clean slate
         setMessages([]);
      }

      setIsSetup(false);
    }
  };

  const fillTopic = (text: string) => setTopicInput(text);
  const fillScenario = (text: string) => setScenarioInput(text);

  // --- Render: Setup Screen ---
  if (isSetup) {
    return (
      <DebateLayout 
        title="Choose Your Battlefield" 
        subtitle="Configuration" 
        onBack={onBack}
        accentColor="text-cyan-400"
      >
        <div className="max-w-5xl mx-auto pb-12">
          
          {/* Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-1 mb-8">
             <div className="grid grid-cols-2 gap-1">
                <button 
                  onClick={() => setMode('topic')}
                  className={`py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all font-bold ${mode === 'topic' ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                   <Lightbulb size={20} />
                   <span>Topic Debate</span>
                </button>
                <button 
                  onClick={() => setMode('scenario')}
                  className={`py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all font-bold ${mode === 'scenario' ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                   <BookOpen size={20} />
                   <span>Scenario Challenge</span>
                </button>
             </div>
          </div>

          {/* Main Input Section */}
          <motion.div 
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Input Field */}
            <div>
               <div className="flex items-center space-x-2 mb-4 text-cyan-400">
                  {mode === 'topic' ? <Swords size={20} /> : <BookOpen size={20} />}
                  <h3 className="font-bold text-lg">{mode === 'topic' ? 'Craft Your Debate Topic' : 'Describe Your Complex Scenario'}</h3>
               </div>
               
               {mode === 'topic' ? (
                 <input 
                   type="text" 
                   value={topicInput}
                   onChange={(e) => setTopicInput(e.target.value)}
                   placeholder="Enter a clear, debatable statement (e.g., 'Artificial intelligence will replace human creativity')"
                   className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                 />
               ) : (
                 <textarea 
                   value={scenarioInput}
                   onChange={(e) => setScenarioInput(e.target.value)}
                   placeholder="Present a complex situation, dilemma, or decision-making scenario that involves multiple perspectives..."
                   className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all h-40 resize-none"
                 />
               )}
               <p className="text-right text-xs text-slate-500 mt-2">
                 {mode === 'topic' ? '0/200 characters • Make it specific' : '0/800 characters • Provide context'}
               </p>
            </div>

            {/* Suggestions */}
            <div>
               <div className="flex items-center space-x-2 mb-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
                  <SparklesIcon />
                  <span>{mode === 'topic' ? 'Or choose from these compelling topics:' : 'Or explore these strategic scenarios:'}</span>
               </div>
               
               <div className="grid gap-3">
                  {mode === 'topic' ? (
                    [
                      "Artificial intelligence will replace human creativity in the next decade",
                      "Social media platforms should be held responsible for mental health issues",
                      "Remote work permanently changes the future of employment",
                      "Cryptocurrency will replace traditional banking systems"
                    ].map((t, i) => (
                      <div key={i} onClick={() => fillTopic(t)} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800 transition-all group">
                         <div className="flex items-center space-x-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-cyan-500 group-hover:bg-cyan-500/20"><TrophyIcon /></div>
                            <span className="text-slate-300 font-medium group-hover:text-white">{t}</span>
                         </div>
                         <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))
                  ) : (
                    [
                       "As CEO, decide whether to implement AI that cuts 40% of jobs but triples profits.",
                       "University President: Accept $50M from a controversial billionaire or maintain independence?",
                       "Mayor: Build affordable housing or preserve historic neighborhoods in a gentrification crisis."
                    ].map((s, i) => (
                      <div key={i} onClick={() => fillScenario(s)} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800 transition-all group">
                         <div className="flex items-center space-x-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-cyan-500 group-hover:bg-cyan-500/20"><Swords size={16} /></div>
                            <span className="text-slate-300 font-medium group-hover:text-white text-sm">{s}</span>
                         </div>
                         <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))
                  )}
               </div>
            </div>

            {/* Configuration Panel */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
               <div className="flex items-center space-x-2 mb-8">
                  <div className="p-2 bg-pink-500 rounded-lg text-white"><Settings size={20} /></div>
                  <div>
                     <h3 className="font-bold text-white text-lg">Strategic Configuration</h3>
                     <p className="text-slate-400 text-xs">Define your battle stance and parameters</p>
                  </div>
               </div>

               <div className="space-y-6">
                  {/* Position */}
                  <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block"><Shield size={12} className="inline mr-1" /> Choose Your Position</label>
                     <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setPosition('supporting')}
                          className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${position === 'supporting' ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Swords size={18} /> <span>Supporting</span>
                        </button>
                        <button 
                          onClick={() => setPosition('opposing')}
                          className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${position === 'opposing' ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Shield size={18} /> <span>Opposing</span>
                        </button>
                     </div>
                  </div>

                  {/* Opening */}
                  <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block"><User size={12} className="inline mr-1" /> Opening Move</label>
                     <div className="grid grid-cols-2 gap-4">
                        <button 
                           onClick={() => setOpening('user')}
                           className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${opening === 'user' ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <User size={18} /> <span>You Start</span>
                        </button>
                        <button 
                           onClick={() => setOpening('ai')}
                           className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${opening === 'ai' ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Crown size={18} className="text-yellow-400" /> <span>Gemini Opens</span>
                        </button>
                     </div>
                  </div>

                  {/* Intensity */}
                  <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block"><Zap size={12} className="inline mr-1" /> Combat Intensity</label>
                     <div className="grid grid-cols-3 gap-4">
                        <button 
                           onClick={() => setDifficulty('easy')}
                           className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Sprout size={18} /> <span>Easy</span>
                        </button>
                        <button 
                           onClick={() => setDifficulty('medium')}
                           className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Zap size={18} /> <span>Medium</span>
                        </button>
                        <button 
                           onClick={() => setDifficulty('hard')}
                           className={`p-4 rounded-xl border flex items-center justify-center space-x-2 font-bold transition-all ${difficulty === 'hard' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                        >
                           <Flame size={18} /> <span>Hard</span>
                        </button>
                     </div>
                     <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center">
                        <Zap size={10} className="text-yellow-500 mr-1" /> Balanced challenge with strategic depth
                     </p>
                  </div>
               </div>
            </div>

            <button 
               onClick={startDebate}
               disabled={mode === 'topic' ? !topicInput : !scenarioInput || isLoading}
               className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg shadow-xl shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
               {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
               {isLoading ? 'Preparing Arena...' : 'Enter The Dojo'}
            </button>
          </motion.div>
        </div>
      </DebateLayout>
    );
  }

  // --- Render: Active Debate Session (Dojo) ---
  return (
    <DebateLayout 
      title="The Dojo" 
      subtitle={`${mode === 'topic' ? 'Topic Debate' : 'Scenario'} • ${difficulty} Mode`} 
      onBack={() => setIsSetup(true)}
      accentColor="text-cyan-400"
    >
      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
        
        {/* Left Column: Debate Info Sidebar */}
        <div className="lg:col-span-4 h-full flex flex-col">
           <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-lg h-full flex flex-col">
              
              {/* Info Header */}
              <div className="mb-6">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-500/10 rounded-md text-cyan-400">
                        {mode === 'topic' ? <Lightbulb size={12} /> : <BookOpen size={12} />}
                    </div>
                    <span>Current Motion</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <ClockTimer />
                 </div>
                 <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                    "{mode === 'topic' ? topicInput : scenarioInput}"
                 </h2>
              </div>

              {/* Roles Stack */}
              <div className="space-y-4 flex-1">
                 {/* User Card */}
                 <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <User size={40} />
                     </div>
                     <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30 text-brand-400 font-bold text-xs">YOU</div>
                        <span className="text-sm font-bold text-slate-300">Your Position</span>
                     </div>
                     <div className={`text-lg font-bold relative z-10 ${position === 'supporting' ? 'text-green-400' : 'text-red-400'}`}>
                        {position === 'supporting' ? 'Supporting (Pro)' : 'Opposing (Con)'}
                     </div>
                 </div>

                 {/* VS Badge */}
                 <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-lg">
                        <span className="text-[10px] font-bold text-slate-500">VS</span>
                    </div>
                 </div>

                 {/* AI Card */}
                 <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Bot size={40} />
                     </div>
                     <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-400"><Bot size={16}/></div>
                        <span className="text-sm font-bold text-slate-300">Gemini 2.5</span>
                     </div>
                     <div className={`text-lg font-bold relative z-10 ${position === 'supporting' ? 'text-red-400' : 'text-green-400'}`}>
                        {position === 'supporting' ? 'Opposing (Con)' : 'Supporting (Pro)'}
                     </div>
                 </div>
              </div>

              {/* Progress/Footer */}
              <div className="mt-auto pt-6 border-t border-slate-800/50">
                 <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                    <span>Session Status</span>
                    <span className="flex items-center gap-1 text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Active</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gradient-to-r from-brand-500 to-cyan-500 rounded-full"></div>
                 </div>
              </div>

           </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-8 h-full flex flex-col bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl">
           
           {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.length === 0 && (
                 <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-2">
                    <Swords size={32} className="opacity-20" />
                    <p className="text-sm">The floor is open. Make your opening statement.</p>
                 </div>
              )}
              {messages.map((msg, idx) => (
                  <div key={idx} className={`flex items-start gap-4 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                     {/* Avatar */}
                     <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg
                        ${msg.sender === 'user' 
                           ? 'bg-brand-500/20 border-brand-500/30 text-brand-400' 
                           : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'}
                     `}>
                        {msg.sender === 'user' ? <div className="font-bold text-xs">JD</div> : <Bot size={20} />}
                     </div>

                     {/* Bubble */}
                     <div className={`
                        p-5 rounded-2xl text-sm leading-relaxed border shadow-md
                        ${msg.sender === 'user'
                           ? 'bg-brand-900/20 border-brand-500/20 text-white rounded-tr-none'
                           : 'bg-slate-800 border-slate-700 text-slate-200 rounded-tl-none'}
                     `}>
                        {msg.text}
                     </div>
                  </div>
              ))}
           </div>

           {/* Input Area */}
           <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setIsRecording(!isRecording)}
                   className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-all
                      ${isRecording 
                        ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'}
                   `}
                 >
                    <Mic size={20} />
                 </button>
                 
                 <div className="flex-1 relative">
                    <input 
                       type="text" 
                       placeholder={isRecording ? "Listening..." : "Type your argument..."}
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600"
                    />
                    <button className="absolute right-2 top-2 bottom-2 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-lg">
                       <Send size={18} />
                    </button>
                 </div>
              </div>
              <div className="text-center mt-2 flex items-center justify-center gap-2">
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                    {isRecording ? 'Listening...' : 'Press Mic to Speak'}
                 </span>
              </div>
           </div>
        </div>
      </div>
    </DebateLayout>
  );
};

// Helper Components
const ClockTimer = () => {
  const [time, setTime] = React.useState(600); 

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return <span className="font-mono text-cyan-400">{format(time)}</span>;
};

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

export default PracticeMode;