import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award } from 'lucide-react';

interface StatCard {
  id: string;
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const WhyChooseSYM: React.FC = () => {
  const stats: StatCard[] = [
    {
      id: '1',
      number: '25,000+',
      label: 'Students Trained',
      description: 'Transforming lives and communication skills across schools and institutions',
      icon: <Users size={40} />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: '2',
      number: '200+',
      label: 'MUN Conferences Conducted',
      description: 'Leading meaningful conversations and fostering global citizenship',
      icon: <Globe size={40} />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      number: 'Official',
      label: 'UNSDG Partner',
      description: 'United Nations Sustainable Development Goals alignment',
      icon: <Award size={40} />,
      color: 'from-emerald-500 to-teal-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="relative mb-20 md:mb-32 pt-10 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-yellow-900/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight md:leading-none max-w-5xl mx-auto mb-6"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-brand-400 animate-shimmer bg-[length:200%_auto]">SYM?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-3xl mx-auto mb-4"
          >
            Join a movement that's making real impact in education and communication worldwide
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/50 border border-slate-800 group-hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col items-center text-center">
                
                {/* Icon Container */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/30 group-hover:shadow-lg group-hover:shadow-white/10 transition-all`}>
                  {stat.icon}
                </div>

                {/* Number */}
                <h3 className={`text-5xl md:text-6xl font-display font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.number}
                </h3>

                {/* Label */}
                <h4 className="text-white font-bold text-xl md:text-2xl mb-4">{stat.label}</h4>

                {/* Description */}
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {stat.description}
                </p>

                {/* Accent Line */}
                <div className={`w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full mt-6 group-hover:w-16 transition-all duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 md:pt-20"
        >
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            We're trusted by leading institutions, governments, and organizations across the globe
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-brand-600 hover:from-yellow-500 hover:to-brand-500 text-white font-bold rounded-full transition-all shadow-lg shadow-yellow-500/20 transform hover:scale-105">
            Discover Our Impact
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSYM;
