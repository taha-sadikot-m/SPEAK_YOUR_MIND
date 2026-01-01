import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Mic, BookOpen, Trophy, Swords } from 'lucide-react';

const Hero: React.FC = () => {
  const orbitalNodes = [
    { 
      label: "Prepare", 
      icon: BookOpen, 
      angle: 0, 
      color: "text-brand-400", 
      borderColor: "border-brand-500/30",
      bgColor: "bg-brand-500/10",
      glowColor: "shadow-brand-500/20"
    },
    { 
      label: "Practice", 
      icon: Swords, 
      angle: 120, 
      color: "text-accent-400", 
      borderColor: "border-accent-500/30",
      bgColor: "bg-accent-500/10",
      glowColor: "shadow-accent-500/20"
    },
    { 
      label: "Perform", 
      icon: Trophy, 
      angle: 240, 
      color: "text-yellow-500", 
      borderColor: "border-yellow-500/30",
      bgColor: "bg-yellow-500/10",
      glowColor: "shadow-yellow-500/20"
    }
  ];

  // Orbital radius constants
  const DESKTOP_RADIUS = 240;
  const MOBILE_RADIUS = 160;
  const ROTATION_DURATION = 45; // Slowed down from 25s for elegance

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-20 overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Aurora Gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent-600/10 rounded-full blur-[128px] animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-brand-600/10 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Typography */}
          <div className="text-center lg:text-left relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-medium text-slate-300 uppercase tracking-wider">The Ecosystem for Oratory Mastery</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight text-white mb-6 md:mb-8"
            >
              Speak Your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-neon-cyan animate-shimmer bg-[length:200%_100%]">
                Mind.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed"
            >
              Master high-stakes communication with an elite loop designed to <span className="text-brand-400 font-semibold">Prepare</span>, <span className="text-accent-400 font-semibold">Practice</span>, and <span className="text-yellow-500 font-semibold">Perform</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={() => document.getElementById('prepare')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center group shadow-2xl shadow-white/5"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-md flex items-center">
                <Play className="mr-2 w-4 h-4 fill-current" />
                Watch Platform Demo
              </button>
            </motion.div>
          </div>

          {/* Meaningful Visual: The Orbital Resonance Core */}
          <div className="relative h-[550px] md:h-[750px] w-full flex items-center justify-center">
            
            {/* The Central Hub (Voice Core) - Refined and Beautifully Sized */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, 1, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-30 w-40 h-40 md:w-56 md:h-56 flex flex-col items-center justify-center group"
            >
              {/* Complex Glow & Glass Layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/30 to-accent-500/30 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute inset-2 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl"></div>
              
              <div className="relative flex flex-col items-center gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                   <Mic size={48} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-[0.4em] uppercase">Resonance</span>
                    <div className="flex gap-1 h-3 mt-1 opacity-40">
                       {[...Array(5)].map((_, i) => (
                         <motion.div 
                           key={i} 
                           animate={{ height: [4, 12, 4] }}
                           transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                           className="w-0.5 bg-brand-400 rounded-full"
                         />
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Path Guides */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-white/[0.04] border-dashed"></div>
              <div className="absolute w-[220px] h-[220px] md:w-[350px] md:h-[350px] rounded-full border border-white/[0.06]"></div>
            </div>

            {/* The Orbital System (Roving Nodes - Slowed Down) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {orbitalNodes.map((node, index) => {
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      transform: `rotate(${node.angle}deg) translate(${typeof window !== 'undefined' && window.innerWidth < 768 ? MOBILE_RADIUS : DESKTOP_RADIUS}px) rotate(-${node.angle}deg)`
                    }}
                  >
                    {/* Counter-rotating child ensures the card stays upright */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className={`
                        w-16 h-16 md:w-20 md:h-20 bg-slate-900/95 backdrop-blur-xl 
                        border ${node.borderColor} rounded-2xl flex items-center justify-center 
                        ${node.color} shadow-2xl ${node.glowColor}
                        transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2
                      `}>
                        <node.icon size={28} />
                      </div>
                      <div className={`
                        mt-4 px-4 py-1.5 ${node.bgColor} border ${node.borderColor} 
                        rounded-full backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity
                      `}>
                         <span className={`text-[10px] font-bold ${node.color} uppercase tracking-[0.2em]`}>
                           {node.label}
                         </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Atmospheric Frequency Visualizer */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-1 h-20 opacity-20 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <motion.div 
                   key={i}
                   animate={{ 
                     height: [4, Math.random() * 60 + 5, 4],
                     opacity: [0.2, 0.8, 0.2]
                   }}
                   transition={{ 
                     duration: 0.7 + Math.random() * 0.5, 
                     repeat: Infinity,
                     delay: i * 0.03
                   }}
                   className="w-1 bg-gradient-to-t from-brand-500 via-accent-500 to-transparent rounded-full"
                />
              ))}
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;