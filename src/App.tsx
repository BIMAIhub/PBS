import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SoftwareMarquee } from './components/SoftwareMarquee';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { WhyChoosePBS } from './components/WhyChoosePBS';
import { BimServicesSection } from './components/BimServicesSection';
import { MasterclassesSection } from './components/MasterclassesSection';
import { StudentTestimonials } from './components/StudentTestimonials';
import { StudentLmsPortalModal } from './components/StudentLmsPortalModal';
import { CounsellingModal } from './components/CounsellingModal';
import { BimConsultancyModal } from './components/BimConsultancyModal';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Course } from './types';
import { COMPANY_INFO } from './data/pbsData';
import { MessageCircle, Download, CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showLmsModal, setShowLmsModal] = useState<boolean>(false);
  const [showCounsellingModal, setShowCounsellingModal] = useState<boolean>(false);
  const [showConsultancyModal, setShowConsultancyModal] = useState<boolean>(false);

  // Search term
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Brochure Download Notification Toast
  const [brochureCourse, setBrochureCourse] = useState<Course | null>(null);

  const handleDownloadSyllabus = (course: Course) => {
    setBrochureCourse(course);
    
    // Create a dummy text download for syllabus brochure
    const content = `PRAGMATIC BIM SOLUTION - OFFICIAL SYLLABUS & CURRICULUM
Course: ${course.title} (${course.category})
Duration: ${course.duration} | ${course.hours}
Upcoming Batch: ${course.upcomingBatch}

Instructor Experience: 15 Years AEC Industry & BIM Projects Handling.

Curriculum Breakdown:
${course.curriculum.map((m, i) => `Module ${i + 1}: ${m.moduleTitle}\nLessons:\n${m.lessons.map(l => '  - ' + l).join('\n')}`).join('\n\n')}

Software Covered: ${course.softwareCovered.join(', ')}

Contact Office:
${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state}
Phone: ${COMPANY_INFO.phonePrimary} | Email: ${COMPANY_INFO.emailPrimary}
Website: Pragmatic BIM Solution
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/[^a-zA-Z0-9]/g, '_')}_Syllabus_PBS.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        onOpenCounselling={() => setShowCounsellingModal(true)}
        onOpenConsultancy={() => setShowConsultancyModal(true)}
        onOpenLms={() => setShowLmsModal(true)}
        onSearchChange={(val) => setSearchTerm(val)}
        searchTerm={searchTerm}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onExploreCourses={handleScrollToCourses}
          onOpenCounselling={() => setShowCounsellingModal(true)}
          onOpenLms={() => setShowLmsModal(true)}
        />

        {/* Software Marquee & Company Trust Banner */}
        <SoftwareMarquee />

        {/* Course Catalog Grid */}
        <CourseCatalog
          onSelectCourse={(course) => setSelectedCourse(course)}
          onDownloadSyllabus={handleDownloadSyllabus}
          filterTerm={searchTerm}
        />

        {/* Why Choose PBS Differentiators */}
        <WhyChoosePBS />

        {/* AEC BIM Consultancy & Services Portfolio */}
        <BimServicesSection
          onOpenConsultancy={() => setShowConsultancyModal(true)}
        />

        {/* Weekend Masterclasses */}
        <MasterclassesSection />

        {/* Student Testimonials & Success Stories */}
        <StudentTestimonials />

        {/* Educational Blog Posts */}
        <BlogSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCounselling={() => setShowCounsellingModal(true)}
        onOpenConsultancy={() => setShowConsultancyModal(true)}
        onOpenLms={() => setShowLmsModal(true)}
      />

      {/* Modals */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onDownloadSyllabus={handleDownloadSyllabus}
      />

      {showLmsModal && (
        <StudentLmsPortalModal onClose={() => setShowLmsModal(false)} />
      )}

      {showCounsellingModal && (
        <CounsellingModal onClose={() => setShowCounsellingModal(false)} />
      )}

      {showConsultancyModal && (
        <BimConsultancyModal onClose={() => setShowConsultancyModal(false)} />
      )}

      {/* Download Toast Notification */}
      {brochureCourse && (
        <div className="fixed bottom-20 right-6 z-40 bg-slate-900 text-white p-4 rounded-2xl border-2 border-emerald-500 shadow-2xl flex items-center gap-3 animate-fadeIn max-w-sm">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <div className="font-bold text-emerald-400">Syllabus Download Started!</div>
            <div className="text-slate-300 truncate">{brochureCourse.title}</div>
          </div>
          <button
            onClick={() => setBrochureCourse(null)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Persistent Floating WhatsApp CTA */}
      <a
        href={COMPANY_INFO.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 font-extrabold text-xs sm:text-sm border-2 border-white/30 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">WhatsApp Us (+91 8208918726)</span>
      </a>

    </div>
  );
}
