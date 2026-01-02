import React from 'react';
import { motion } from 'framer-motion';
import './Partners.css';

const Partners: React.FC = () => {
  // Partner images from the public/images/partners folder - 3 rows of combined partner images
  const partnerRows = [
    {
      id: 'row1',
      src: '/images/partners/2223b4dc-8080-472a-bb16-4fd14ae064d1.png',
      alt: 'Partners Row 1'
    },
    {
      id: 'row2',
      src: '/images/partners/eddba6aa-7bda-425f-9fcc-fc819734e150.png',
      alt: 'Partners Row 2'
    },
    {
      id: 'row3',
      src: '/images/partners/fbaad841-e5fe-4c6e-9e32-1950d8d3e6d8.png',
      alt: 'Partners Row 3'
    }
  ];

  const MarqueeRow: React.FC<{ image: string; alt: string; delay?: number }> = ({ image, alt, delay = 0 }) => {
    return (
      <div className="marquee-wrapper h-32 md:h-48">
        <div className="marquee" style={{ animationDelay: `${delay}s` }}>
          <img 
            src={image} 
            alt={alt}
            className="marquee-item filter brightness-90 hover:brightness-110 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.background = 'linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))';
            }}
          />
          <img 
            src={image} 
            alt={alt}
            className="marquee-item filter brightness-90 hover:brightness-110 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.background = 'linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))';
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="relative mb-20 md:mb-32 pt-10 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-brand-900/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8 md:mb-12"
          >
            <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">Trusted By</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight md:leading-none max-w-5xl mx-auto mb-8"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-neon-pink animate-shimmer bg-[length:200%_auto]">Partners</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Join the organizations that are revolutionizing communication and education
          </motion.p>
        </div>

        {/* Horizontal Scrolling Partner Rows */}
        <div className="space-y-6 md:space-y-8">
          {partnerRows.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <MarqueeRow image={row.src} alt={row.alt} delay={idx * 0.5} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 md:mt-32 text-center"
        >
          <p className="text-slate-400 text-lg mb-8">
            Want to partner with us? Let's build the future of communication together.
          </p>
          <button className="px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-full transition-all shadow-lg shadow-brand-500/20">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
