export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'Revit' | 'Navisworks' | 'Dynamo' | 'Civil 3D' | 'AutoCAD' | 'Combo';
  discipline?: 'AR' | 'ST' | 'MEP' | 'All';
  duration: string;
  hours: string;
  batchType: 'Live Interactive' | 'Recorded + Live Support' | 'Weekend Special' | 'Corporate Batch';
  rating: number;
  reviewsCount: number;
  originalPrice: number;
  discountedPrice: number;
  installmentPrice?: string;
  badge?: string;
  image: string;
  accentColor: string;
  description: string;
  curriculum: {
    moduleTitle: string;
    lessons: string[];
  }[];
  highlights: string[];
  softwareCovered: string[];
  upcomingBatch: string;
}

export interface BimProject {
  id: string;
  title: string;
  clientLocation: string;
  type: string;
  buildingsModeled: number;
  durationMonths: number;
  drawingsProduced: number;
  engineersInvolved: number;
  description: string;
  servicesProvided: string[];
  image: string;
  mepHighlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  courseTaken: string;
  avatar: string;
  rating: number;
  comment: string;
  videoUrl?: string;
  verified: boolean;
}

export interface BimService {
  id: string;
  title: string;
  iconName: string;
  description: string;
  deliverables: string[];
  benefits: string[];
}

export interface Masterclass {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  originalPrice: number;
  category: string;
  seatsLeft: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Courses' | 'Enrollment' | 'Certificates' | 'BIM Services' | 'Career';
}
