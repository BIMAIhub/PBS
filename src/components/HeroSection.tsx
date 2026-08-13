import React from 'react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Users, 
  Building2, 
  ShieldCheck, 
  Play, 
  Download,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onOpenCounselling: () => void;
  onOpenLms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onOpenCounselling,
  onOpenLms
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Subtle BIM Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a0a_1px,transparent_1px),linear-gradient(to_bottom,#16a34a0a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{COMPANY_INFO.experienceYears} Years AEC Industry & BIM Training Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">BIM & Revit</span> from Real Industry Experts
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Upskilling platform for <span className="font-semibold text-slate-900">Architects, Engineers & BIM Designers</span>. Learn 3D Modeling, MEP Plant Rooms, Navisworks Clash Detection, Dynamo Scripting & Civil 3D with hands-on project files.
            </p>

            {/* Rating & Social Proof */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 text-sm">4.9/5</span>
                <span className="text-slate-500 text-xs">(100+ Engineers)</span>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Word-of-Mouth Trusted Brand</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onOpenCounselling}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Schedule 1:1 Free Counselling</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-2xs hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse All Courses</span>
              </button>
            </div>

            {/* Quick Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs sm:text-sm font-semibold text-slate-700 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Real Project Models</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>ISO 19650 Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Industry Certificate</span>
              </div>
            </div>

          </div>

          {/* Right Column - Brand Badge Frame & Slide Highlights (Matching Screenshot + Logo Green Frame) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Brand Hero Card with Logo Green Frame */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500/80 relative space-y-6">
                
                {/* Logo Frame Box */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-black tracking-tight">Pragmatic BIM Solution</div>
                      <div className="text-emerald-100 text-sm italic font-serif">"{COMPANY_INFO.slogan}"</div>
                    </div>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                      Official
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-emerald-50 leading-relaxed font-medium">
                    15 Years of professional experience in handling BIM projects and providing trainings to professionals in AEC industry.
                  </p>
                </div>

                {/* Key Metrics Grid (Slide 5 replica) */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">5+ Yrs</div>
                    <div className="text-[11px] font-bold text-slate-600 mt-0.5">Global Training</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Revit, Navisworks, Dynamo</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">100+</div>
                    <div className="text-[11px] font-bold text-slate-600 mt-0.5">Engineers</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Trained in 5 Countries</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">45+</div>
                    <div className="text-[11px] font-bold text-slate-600 mt-0.5">Buildings</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Modeled in Al ULA</div>
                  </div>
                </div>

                {/* Featured Project Callout (Slide 7) */}
                <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      A10 - AL ULA SHLAL DEVELOPMENT
                    </span>
                    <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[10px]">
                      Case Study
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    400+ Coordinated MEP Drawings & 45+ Buildings Modeled in 4 Months by our 10+ Specialist Engineers team.
                  </p>
                </div>

                {/* Quick Interactive Demo Button */}
                <button
                  onClick={onOpenLms}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Preview Student LMS Portal & Certificates</span>
                </button>

              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-900 font-black text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1 rotate-3 animate-bounce">
                <Award className="w-4 h-4" />
                <span>15+ Years Trust</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
