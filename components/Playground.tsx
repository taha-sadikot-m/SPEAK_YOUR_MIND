import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Terminal, Cpu, Sparkles } from 'lucide-react';
import { generateDebateOpening, generateInterviewQuestion } from '../services/geminiService';
import { PlatformMode } from '../types';

const Playground: React.FC = () => {
  const [mode, setMode] = useState<PlatformMode>(PlatformMode.DEBATE);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult('');
    
    if (mode === PlatformMode.DEBATE) {
      const response = await generateDebateOpening(input);
      setResult(response);
    } else {
      const response = await generateInterviewQuestion(input);
      setResult(response);
    }
    setLoading(false);
  };

  return (
    <section id="playground" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[95%] 2xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-slate-900 rounded-full border border-slate-800 mb-4">
             <Sparkles size={16} className="text-yellow-400 mr-2" />
             <span className="text-xs font-medium text-slate-400">Live Gemini 2.5 Demo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Command Center</h2>
          <p className="text-slate-400 text-sm md:text-base">Test the AI capabilities instantly. No account required.</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex flex-wrap items-center justify-between px-4 md:px-6 py-4 border-b border-slate-800 bg-slate-900/80 gap-4">
            <div className="flex space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
            </div>
            <div className="flex space-x-2 md:space-x-4 text-xs md:text-sm font-medium">
              <button 
                onClick={() => { setMode(PlatformMode.DEBATE); setResult(''); setInput(''); }}
                className={`transition-colors ${mode === PlatformMode.DEBATE ? 'text-brand-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                MODE_DEBATE
              </button>
              <button 
                onClick={() => { setMode(PlatformMode.INTERVIEW); setResult(''); setInput(''); }}
                className={`transition-colors ${mode === PlatformMode.INTERVIEW ? 'text-accent-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                MODE_INTERVIEW
              </button>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="mb-8">
              <label className="block text-[10px] md:text-xs font-mono text-slate-500 mb-2 uppercase tracking-widest">
                {mode === PlatformMode.DEBATE ? 'Input // Topic Parameter' : 'Input // Target Role'}
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center">
                    <Terminal className="absolute left-4 text-slate-500" size={20} />
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={mode === PlatformMode.DEBATE ? "e.g. Universal Basic Income" : "e.g. Senior Frontend Engineer"}
                      className="w-full bg-slate-950 text-white p-4 pl-12 pr-12 rounded-xl border border-slate-800 focus:border-brand-500 focus:ring-0 outline-none transition-all font-mono placeholder-slate-700 text-sm md:text-base"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={loading || !input}
                      className="absolute right-2 p-2 bg-slate-800 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    </button>
                </div>
              </div>
            </div>

            {/* Output Area */}
            <div className="min-h-[150px] bg-slate-950/50 rounded-xl border border-slate-800/50 p-4 md:p-6 relative font-mono text-xs md:text-sm">
               {!result && !loading && (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                     <div className="flex flex-col items-center">
                        <Cpu size={32} className="mb-2 opacity-50" />
                        <span>Awaiting Input...</span>
                     </div>
                  </div>
               )}
               
               <AnimatePresence>
                  {result && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative z-10"
                    >
                      <span className="text-brand-400 mr-2">sym_ai@core:~$</span>
                      <span className="text-slate-300 leading-relaxed typing-effect">
                        "{result}"
                      </span>
                      <span className="inline-block w-2 h-4 bg-brand-500 ml-1 animate-pulse align-middle"></span>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="bg-slate-900 px-4 md:px-6 py-2 border-t border-slate-800 flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500">
             <div>STATUS: {loading ? <span className="text-yellow-500">PROCESSING</span> : <span className="text-green-500">READY</span>}</div>
             <div>LATENCY: 42ms</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;