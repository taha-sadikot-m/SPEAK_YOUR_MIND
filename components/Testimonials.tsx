import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  organization: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: "SYM has been a game-changer in our school. It's enhanced communication, boosted confidence, and fostered a culture of transparency and collaboration, making our teachers feel valued and heard.",
      author: 'Anbumani HM',
      position: 'Principal',
      organization: 'Manjammal Girls School'
    },
    {
      id: '2',
      quote: "SYM has transformed our students' confidence and communication skills. We've seen shy students lead discussions and foster a culture of respect and understanding. It's been truly inspiring",
      author: 'Joshua Manuel',
      position: 'Principal',
      organization: 'MMHSS Chennai'
    },
    {
      id: '3',
      quote: "Our students engage in meaningful conversations and enriched our campus community. It's now an integral part of our university culture, fostering open dialogue and critical thinking.",
      author: 'Dr. Subbiah Bharathi',
      position: 'Director',
      organization: 'SRM IST'
    },
    {
      id: '4',
      quote: "The CSR Program by SYM has made a significant impact on our government schools. It has empowered students to express themselves confidently, leading to more engaged classrooms and improved academic performance.",
      author: 'M. Muthiah',
      position: 'Chief Education Officer',
      organization: 'Tenkasi District, TN'
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
    hidden: { opacity: 0, y: 20 },
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-accent-900/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8 md:mb-12"
          >
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">Real Impact</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight md:leading-none max-w-5xl mx-auto mb-8"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-neon-pink animate-shimmer bg-[length:200%_auto]">Testimonials</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            What educators, administrators, and leaders say about Speak Your Mind
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-brand-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/50 border border-slate-800 group-hover:border-accent-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col">
                
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-accent-400 opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-1 italic">
                  "{testimonial.quote}"
                </p>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-accent-500 to-brand-500 rounded-full mb-6 group-hover:w-20 transition-all duration-300"></div>

                {/* Author Info */}
                <div className="flex flex-col">
                  <h4 className="text-white font-bold text-lg">{testimonial.author}</h4>
                  <p className="text-accent-400 text-sm font-semibold mb-1">{testimonial.position}</p>
                  <p className="text-slate-400 text-sm">{testimonial.organization}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 md:pt-12"
        >
          <p className="text-slate-400 text-lg mb-8">
            Join hundreds of schools, colleges, and organizations transforming communication
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-500 hover:to-brand-500 text-white font-bold rounded-full transition-all shadow-lg shadow-accent-500/20 transform hover:scale-105">
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
