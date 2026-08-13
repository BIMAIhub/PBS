import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  BookOpen,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';

interface NavbarProps {
  onOpenLms: () => void;
  onOpenCounselling: () => void;
  onOpenConsultancy: () => void;
  onSearch: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLms,
  onOpenCounselling,
  onOpenConsultancy,
  onSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      const coursesEl = document.getElementById('courses-section');
      if (coursesEl) {
        coursesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Bar Announcement */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              15+ Yrs AEC Exp
            </span>
            <span className="hidden sm:inline">Upskilling platform for Architects, Engineers & BIM Designers</span>
            <span className="sm:hidden font-medium">BIMifying the world bit by bit</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={onOpenCounselling}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-1 rounded-full flex items-center gap-1 transition-all shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-slate-900" />
              Schedule 1:1 Free Counselling
            </button>
            <a 
              href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=Hi%20Pragmatic%20BIM%20Solution,%20I%20want%20to%20inquire%20about%20BIM%20courses%20and%20services.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-500 shadow-xs group-hover:border-emerald-600 transition-all">
            <div className="text-emerald-700 font-black tracking-tight text-lg leading-none">
              PBS
            </div>
            <div className="text-[8px] font-bold text-emerald-800 tracking-wider uppercase text-center mt-0.5">
              BIM
            </div>
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5">
              Pragmatic <span className="text-emerald-600">BIM Solution</span>
            </div>
            <div className="text-xs text-emerald-700 italic font-serif tracking-tight font-medium">
              "{COMPANY_INFO.slogan}"
            </div>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search Revit, Navisworks, Dynamo, MEP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-9 pr-4 py-2 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        </form>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#courses-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Courses
          </a>
          <a href="#services-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            BIM Services
          </a>
          <a href="#projects-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            Projects
          </a>
          <a href="#why-pbs-section" className="hover:text-emerald-600 transition-colors">
            Why PBS
          </a>
          <a href="#testimonials-section" className="hover:text-emerald-600 transition-colors">
            Reviews
          </a>
          <a href="#contact-section" className="hover:text-emerald-600 transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultancy}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200 transition-all"
          >
            Hire BIM Team
          </button>
          
          <button
            onClick={onOpenLms}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all pbs-btn-pulse"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Portal</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search Revit, Navisworks, Dynamo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-sm pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <nav className="flex flex-col space-y-2 pt-2 text-sm font-medium text-slate-800">
            <a 
              href="#courses-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-emerald-50 rounded-lg flex items-center justify-between text-emerald-800 font-semibold"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Course Catalog
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#services-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                BIM Consultancy Services
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#projects-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Featured BIM Projects (Al ULA)
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#why-pbs-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>Why Choose PBS (15 Yrs Exp)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#testimonials-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>Student Success Stories</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#contact-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>Contact & Address</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLms();
              }}
              className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Access Student LMS Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCounselling();
              }}
              className="w-full bg-amber-400 text-slate-900 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1:1 Free Counselling</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
