import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Calendar, Users, ArrowRight, Clock, Target, DollarSign, 
  CheckCircle, MapPin, Shield, CreditCard, ChevronLeft, Loader2 
} from 'lucide-react';
import DebateLayout from './DebateLayout';

interface EventsModeProps {
  onBack: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  fullDetails: string;
  price: number; // 0 for free
  spots: { total: number; filled: number };
  prizes: string;
  tags: string[];
  color: string;
}

const SAMPLE_EVENTS: Event[] = [
  {
    id: 'evt-free-001',
    title: "Sunday Blitz Debate",
    date: "October 29, 2023",
    time: "2:00 PM EST",
    description: "Fast-paced, low-stakes practice tournament for all skill levels.",
    fullDetails: "The Sunday Blitz is our weekly community gathering designed for rapid skill improvement. Rounds are shortened to 3-minute speeches with 1-minute rebuttals. Topics are released 5 minutes before the round starts. This is a perfect environment to test new strategies without affecting your global ranking significantly.",
    price: 0,
    spots: { total: 100, filled: 45 },
    prizes: "Winner Badge + 500 XP",
    tags: ["Casual", "Speed Debate", "All Ranks"],
    color: "text-green-400"
  },
  {
    id: 'evt-paid-002',
    title: "Grand Rhetoric Championship",
    date: "November 15, 2023",
    time: "10:00 AM EST",
    description: "High-stakes professional tournament with cash prizes. Pro members only.",
    fullDetails: "The Grand Rhetoric Championship is the season's premier event. Compete against the top debaters in the ecosystem in a full Oxford-style format. Judged by a panel of 3 expert AI agents and 2 human moderators. Registration includes entry to the bracket and a commemorative digital asset.",
    price: 15.00,
    spots: { total: 32, filled: 12 },
    prizes: "$2,000 Prize Pool + Championship Trophy",
    tags: ["Competitive", "Ranked", "Cash Prize"],
    color: "text-yellow-400"
  }
];

const EventsMode: React.FC<EventsModeProps> = ({ onBack }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <DebateLayout 
      title="The Colosseum" 
      subtitle={selectedEvent ? "Event Registration" : "Upcoming Tournaments"} 
      onBack={selectedEvent ? () => setSelectedEvent(null) : onBack} 
      accentColor="text-yellow-400"
    >
      <div className="max-w-6xl mx-auto min-h-[600px]">
        <AnimatePresence mode="wait">
          {!selectedEvent ? (
            <EventListView 
              key="list" 
              events={SAMPLE_EVENTS} 
              onSelect={setSelectedEvent} 
            />
          ) : (
            <EventDetailView 
              key="detail" 
              event={selectedEvent} 
              onBack={() => setSelectedEvent(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </DebateLayout>
  );
};

// --- Sub-Component: List View ---
const EventListView: React.FC<{ events: Event[], onSelect: (e: Event) => void }> = ({ events, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid md:grid-cols-2 gap-6"
    >
      {events.map((event) => (
        <div 
          key={event.id}
          onClick={() => onSelect(event)}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-yellow-500/30 hover:bg-slate-900/80 transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Hover Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px] group-hover:bg-yellow-500/10 transition-colors pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${event.price === 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                {event.price === 0 ? 'FREE ENTRY' : `$${event.price} USD`}
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
              {event.title}
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-slate-400 text-sm">
                <Calendar size={16} className="mr-2 text-slate-500" />
                {event.date}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                 <Clock size={16} className="mr-2 text-slate-500" />
                 {event.time}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                 <Users size={16} className="mr-2 text-slate-500" />
                 {event.spots.filled} / {event.spots.total} Registered
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                 <Trophy size={16} className="mr-2 text-yellow-500" />
                 <span className="truncate">{event.price === 0 ? 'Badges' : 'Cash Prize'}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-800 group-hover:bg-yellow-500 group-hover:text-slate-950 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              View Details & Register
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// --- Sub-Component: Detail & Registration View ---
const EventDetailView: React.FC<{ event: Event, onBack: () => void }> = ({ event, onBack }) => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    teamName: '',
    agreeToRules: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto bg-slate-900 border border-green-500/30 rounded-3xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-4">Registration Confirmed!</h2>
        <p className="text-slate-400 mb-8">
          You are officially registered for <span className="text-white font-bold">{event.title}</span>. A confirmation email with the lobby link has been sent to {formData.email}.
        </p>
        <button onClick={onBack} className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors">
          Return to Events
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="grid lg:grid-cols-12 gap-8"
    >
      {/* Left: Event Info */}
      <div className="lg:col-span-7 space-y-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-white transition-colors mb-2 text-sm font-medium"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to List
        </button>

        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="flex items-center px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
              <Calendar size={14} className="mr-2 text-slate-500" /> {event.date}
            </span>
            <span className="flex items-center px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
              <Clock size={14} className="mr-2 text-slate-500" /> {event.time}
            </span>
            <span className="flex items-center px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
              <MapPin size={14} className="mr-2 text-slate-500" /> Online (Global)
            </span>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none">
          <h3 className="text-xl font-bold text-white mb-3">Event Details</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            {event.fullDetails}
          </p>
          
          <h3 className="text-xl font-bold text-white mb-3">Prizes & Rewards</h3>
          <div className="bg-gradient-to-r from-yellow-900/20 to-slate-900 border border-yellow-500/20 p-6 rounded-2xl flex items-center gap-4">
             <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                <Trophy size={24} />
             </div>
             <div>
                <div className="text-yellow-400 font-bold text-lg">{event.prizes}</div>
                <div className="text-slate-500 text-sm">awarded to top 3 finalists</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="lg:col-span-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 sticky top-24 shadow-2xl">
           <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-800">
              <div>
                 <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider">Entry Fee</span>
                 <span className={`text-3xl font-display font-bold ${event.price === 0 ? 'text-green-400' : 'text-white'}`}>
                    {event.price === 0 ? 'FREE' : `$${event.price.toFixed(2)}`}
                 </span>
              </div>
              <div className="text-right">
                 <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider">Availability</span>
                 <span className="text-slate-300 font-mono">
                    {event.spots.total - event.spots.filled} slots left
                 </span>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Participant Name</label>
                 <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                    required 
                 />
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                 <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                    required 
                 />
              </div>

              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Team Name (Optional)</label>
                 <input 
                    type="text" 
                    value={formData.teamName}
                    onChange={e => setFormData({...formData, teamName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                    placeholder="e.g. The Debating Dragons"
                 />
              </div>

              {/* Payment Section if Paid Event */}
              {event.price > 0 && (
                <div className="pt-4 mt-4 border-t border-slate-800">
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Payment Method</label>
                   <div className="p-4 bg-slate-950 border border-slate-700 rounded-xl flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <CreditCard size={18} className="text-slate-400" />
                         <span className="text-sm text-white">•••• 4242</span>
                      </div>
                      <span className="text-xs text-green-400 font-bold">Saved Card</span>
                   </div>
                   <p className="text-[10px] text-slate-500 text-center">
                      Secure payment processed via Stripe.
                   </p>
                </div>
              )}

              <div className="flex items-start gap-3 pt-2">
                 <input 
                    type="checkbox" 
                    id="rules"
                    checked={formData.agreeToRules}
                    onChange={e => setFormData({...formData, agreeToRules: e.target.checked})}
                    className="mt-1"
                 />
                 <label htmlFor="rules" className="text-xs text-slate-400 leading-tight">
                    I agree to the Tournament Rules and Code of Conduct. I understand that failure to show up may result in a ranking penalty.
                 </label>
              </div>

              <button 
                type="submit"
                disabled={!formData.agreeToRules || isSubmitting}
                className={`
                   w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 transition-all
                   ${event.price === 0 
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' 
                      : 'bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/20'}
                   disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                 {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                 ) : (
                    <>
                       {event.price === 0 ? 'Register for Free' : `Pay $${event.price} & Register`}
                       <ArrowRight size={18} />
                    </>
                 )}
              </button>
           </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EventsMode;