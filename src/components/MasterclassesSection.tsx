import React, { useState } from 'react';
import { MASTERCLASSES } from '../data/pbsData';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const MasterclassesSection: React.FC = () => {
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>WEEKEND LIVE WORKSHOPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Our Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Masterclasses</span> to Unlock Your Potential
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Intensive 3-hour live weekend sessions led by senior BIM consultants with 15+ years of hands-on project experience.
          </p>
        </div>

        {/* Masterclass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MASTERCLASSES.map((mc) => {
            const isRegistered = registeredId === mc.id;

            return (
              <div
                key={mc.id}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-400/20 text-amber-300 font-extrabold px-3 py-1 rounded-full border border-amber-400/30">
                    {mc.category}
                  </span>
                  <span className="text-rose-400 text-[11px] font-bold animate-pulse">
                    🔥 Only {mc.seatsLeft} seats left
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {mc.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Mentor: {mc.instructor}
                  </p>
                </div>

                {/* Meta details */}
                <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{mc.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{mc.time} ({mc.duration})</span>
                  </div>
                </div>

                {/* Price & Registration */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-400">₹{mc.price}</span>
                      <span className="text-xs text-slate-500 line-through">₹{mc.originalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setRegisteredId(mc.id)}
                    disabled={isRegistered}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                      isRegistered
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md hover:shadow-amber-400/20'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Seat Booked!</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
