import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/pbsData';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Star, 
  Sparkles,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';

interface CourseCatalogProps {
  onSelectCourse: (course: Course) => void;
  onDownloadSyllabus: (course: Course) => void;
  filterTerm?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  onDownloadSyllabus,
  filterTerm = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Courses' },
    { id: 'Revit', label: 'Autodesk Revit (AR/ST/MEP)' },
    { id: 'Navisworks', label: 'Navisworks Manage & Clash' },
    { id: 'Dynamo', label: 'Dynamo Automation' },
    { id: 'Civil 3D', label: 'Civil 3D Infrastructure' },
    { id: 'AutoCAD', label: 'AutoCAD Essentials' },
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = !filterTerm || 
      course.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(filterTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(filterTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Structured BIM Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Find a course to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">fast-forward your career</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Practical, project-centric BIM courses designed by senior engineers with 15+ years of active industry experience.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-400 shadow-md shadow-emerald-900/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid (Matching Kaarwan screenshot design) */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No courses matched your search</h3>
            <p className="text-sm text-slate-400 mt-1">Try resetting category filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-emerald-500/80 hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-300 group"
              >
                {/* Course Banner Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md"
                      style={{ backgroundColor: course.accentColor }}
                    >
                      {course.category} {course.discipline ? `(${course.discipline})` : ''}
                    </span>
                    {course.badge && (
                      <span className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{course.rating}</span>
                    <span className="text-slate-400 text-[10px]">({course.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration} | {course.hours}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{course.batchType}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 pt-1">
                    {course.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Section */}
                  <div className="pt-3 border-t border-slate-700/80 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">₹{course.discountedPrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      {course.installmentPrice && (
                        <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                          or {course.installmentPrice}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded">
                      50% OFF
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => onDownloadSyllabus(course)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white text-xs font-bold py-2.5 rounded-xl border border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-300" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={() => onSelectCourse(course)}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-md hover:shadow-emerald-900/50 flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
