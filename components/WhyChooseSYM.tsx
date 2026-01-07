import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Send, User, Mail, Phone, Building2, MessageSquare, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../services/inquiryService';
import type { InquiryFormData } from '../types/inquiry';

interface StatCard {
  id: string;
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const WhyChooseSYM: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await submitInquiry(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', organization: '', message: '' });
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button 
            onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-4 bg-gradient-to-r from-yellow-600 to-brand-600 hover:from-yellow-500 hover:to-brand-500 text-white font-bold rounded-full transition-all shadow-lg shadow-yellow-500/20 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Today
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </motion.div>
      </div>

      {/* Inquiry Form Section */}
      <div id="inquiry-form" className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-600/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/50 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Form Header */}
            <div className="text-center pt-12 px-8 md:px-12">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-display font-black text-white mb-4"
              >
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-brand-400">Connect</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-lg max-w-2xl mx-auto"
              >
                Fill out the form below and we'll get back to you within 24 hours
              </motion.p>
            </div>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={48} className="text-green-400" />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-3">Thank You!</h4>
                  <p className="text-slate-400 text-lg">Your inquiry has been submitted successfully. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <>
                  {/* Error Message */}
                  {submitStatus === 'error' && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-red-400 font-semibold">Error</p>
                        <p className="text-red-300 text-sm">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      />
                    </motion.div>

                    {/* Phone Input */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      />
                    </motion.div>

                    {/* Organization Input */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Organization / Institution"
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      />
                    </motion.div>
                  </div>

                  {/* Message Input */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <MessageSquare className="absolute left-4 top-6 text-slate-400" size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-yellow-600 to-brand-600 hover:from-yellow-500 hover:to-brand-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSYM;
