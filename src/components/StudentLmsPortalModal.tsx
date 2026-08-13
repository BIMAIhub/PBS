import React, { useState, useEffect } from 'react';
import { COURSES_DATA, COMPANY_INFO } from '../data/pbsData';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  X, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Download, 
  Award, 
  GraduationCap, 
  FileCheck, 
  Sparkles, 
  Lock, 
  UserCheck, 
  Search,
  ExternalLink,
  Printer,
  Maximize2,
  Minimize2,
  HelpCircle,
  RotateCcw,
  Clock,
  Video,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
  QrCode,
  LogOut,
  Sliders,
  Volume2,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  Compass,
  Target,
  Trophy,
  Medal,
  Unlock,
  Star,
  Crown,
  Flame,
  Gift,
  Share2,
  User,
  Edit3,
  Save,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  MessageSquare,
  MessageCircle,
  ThumbsUp,
  Send,
  Pin,
  Filter,
  Tag,
  Plus,
  CornerDownRight,
  Lightbulb
} from 'lucide-react';

interface StudentLmsPortalModalProps {
  onClose: () => void;
}

interface DiscussionComment {
  id: string;
  author: string;
  avatar: string;
  role: 'student' | 'instructor' | 'ta';
  content: string;
  timestamp: string;
}

interface DiscussionThread {
  id: string;
  courseId: string;
  lessonTitle: string;
  author: string;
  authorAvatar: string;
  authorRole: 'student' | 'instructor' | 'ta';
  title: string;
  content: string;
  timestampRef?: string;
  category: 'Question' | 'Insight' | 'Tip' | 'Bug';
  timestamp: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isPinned?: boolean;
  isResolved?: boolean;
  replies: DiscussionComment[];
}

const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'disc-1',
    courseId: 'revit-mep-ar-st',
    lessonTitle: 'Lesson 1: Introduction to Revit UI & Project Templates',
    author: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    authorRole: 'student',
    title: 'Where can I find the default Metric Project Template (.rte) in Revit 2026?',
    content: 'Hi team, when I start a new project in Revit 2026, the Architectural Template dropdown is empty. What is the standard system directory path to load imperial or metric templates?',
    timestampRef: '02:45',
    category: 'Question',
    timestamp: '2 hours ago',
    upvotes: 14,
    hasUpvoted: false,
    isPinned: true,
    isResolved: true,
    replies: [
      {
        id: 'rep-1',
        author: 'Er. Pravin Yadav (PBS Lead Instructor)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'instructor',
        content: 'Hello Aarav! By default, Revit 2026 installs templates in C:\\ProgramData\\Autodesk\\RVT 2026\\Templates\\English\\. Make sure "Hidden Items" is checked in Windows File Explorer options to view ProgramData!',
        timestamp: '1 hour ago'
      },
      {
        id: 'rep-2',
        author: 'Priya Mehta',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        role: 'student',
        content: 'Thanks sir! That worked perfectly for me too. Don\'t forget to set the default template path under File > Options > File Locations.',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'disc-2',
    courseId: 'revit-mep-ar-st',
    lessonTitle: 'Lesson 1: Introduction to Revit UI & Project Templates',
    author: 'Rohan Deshmukh',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    authorRole: 'student',
    title: 'Essential Keyboard Shortcuts List for Revit UI Navigation',
    content: 'Pro-tip for fellow students! Here are my most used shortcuts for fast drafting:\n• KS - Keyboard Shortcuts dialog\n• VV / VG - Visibility Graphics Override\n• WT - Tile Windows\n• ZA - Zoom All\nHope this boosts everyone\'s productivity during exercises!',
    category: 'Tip',
    timestamp: '1 day ago',
    upvotes: 28,
    hasUpvoted: true,
    isPinned: true,
    isResolved: false,
    replies: [
      {
        id: 'rep-3',
        author: 'Sneha Kulkarni',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        role: 'student',
        content: 'Super helpful cheat sheet Rohan! Adding `TL` (Thin Lines toggle) to the list - absolute lifesaver when checking detailed wall joins.',
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'disc-3',
    courseId: 'revit-mep-ar-st',
    lessonTitle: 'Lesson 2: Level Setup, Grids & Reference Planes',
    author: 'Vikram Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    authorRole: 'student',
    title: 'How to stagger grid heads when grid lines overlap in close elevation views?',
    content: 'When setting up closely spaced structural column lines (e.g. 1.2m apart), the grid circles collide and overlap. Is there a built-in elbow break tool in Revit?',
    timestampRef: '06:18',
    category: 'Question',
    timestamp: '3 days ago',
    upvotes: 9,
    hasUpvoted: false,
    isPinned: false,
    isResolved: true,
    replies: [
      {
        id: 'rep-4',
        author: 'PBS Senior BIM TA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        role: 'ta',
        content: 'Hi Vikram! Select the grid line in elevation view, hover near the bubble, and click the small lightning/elbow icon labeled "Add Elbow". You can drag the blue dots to stagger grid heads cleanly!',
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: 'disc-4',
    courseId: 'navisworks-clash',
    lessonTitle: 'Lesson 1: Navisworks Interface, File Appending & NWD Export',
    author: 'Ananya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    authorRole: 'student',
    title: 'NWC Export vs Appending RVT Directly: Which is better for large models?',
    content: 'When coordinating 50,000 sqm hospital projects, should we export .NWC cache files from Revit or append raw .RVT models directly into Navisworks Manage?',
    timestampRef: '04:10',
    category: 'Insight',
    timestamp: '4 days ago',
    upvotes: 19,
    hasUpvoted: false,
    isPinned: false,
    isResolved: true,
    replies: [
      {
        id: 'rep-5',
        author: 'Er. Pravin Yadav (PBS Lead Instructor)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'instructor',
        content: 'Always export to .NWC using the Revit Navisworks Exporter plugin! NWC files are up to 80% smaller, load in seconds, and retain all IFC/COBie parameters without locking the native Revit model.',
        timestamp: '3 days ago'
      }
    ]
  }
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  'revit-mep-ar-st': [
    {
      id: 1,
      question: 'What is the key advantage of a Revit Central File in multi-discipline BIM projects?',
      options: [
        'It converts 3D geometry automatically into 2D AutoCAD DWG files',
        'It enables real-time worksharing and simultaneous multi-user editing via local local files',
        'It compresses Revit files by 90% without losing parameter data',
        'It locks all model elements so contractors cannot make modifications'
      ],
      correctIndex: 1,
      explanation: 'Revit Central Files allow team members to create local copies, borrow elements, and synchronize changes simultaneously in an ISO 19650 CDE workflow.'
    },
    {
      id: 2,
      question: 'According to BIM Forum specifications, what does LOD 400 represent?',
      options: [
        'Conceptual 3D massing model',
        'Generic geometry with approximate dimensions',
        'Fabrication & assembly model with precise shop drawings and connection details',
        'As-built facility management asset model'
      ],
      correctIndex: 2,
      explanation: 'LOD 400 provides model elements with detailed fabrication, assembly, and installation information suitable for shop drawings.'
    },
    {
      id: 3,
      question: 'In Revit MEP, how are system classifications (e.g. Supply Air, Hydronic Return) utilized?',
      options: [
        'To define line colors only in 2D views',
        'To drive automated fluid dynamics, pressure drop calculations, and system graphics',
        'To restrict access permissions for MEP engineers',
        'To export IFC files directly to Navisworks'
      ],
      correctIndex: 1,
      explanation: 'System Classifications in Revit MEP control physical fluid behavior, flow direction, pressure loss formulas, and system graphics.'
    },
    {
      id: 4,
      question: 'What is the function of a Shared Parameter (.txt file) in Autodesk Revit?',
      options: [
        'It converts imperial units to metric units automatically',
        'It creates custom parameters that can be shared across multiple families and included in project schedules',
        'It acts as a backup copy of the Revit project file',
        'It renders realistic ray-traced materials'
      ],
      correctIndex: 1,
      explanation: 'Shared Parameters are stored in an external text file and allow parameter consistency across families, schedules, and tags.'
    },
    {
      id: 5,
      question: 'How should hard clashes between HVAC ductwork and Structural steel beams be resolved in BIM coordination?',
      options: [
        'Delete the structural beam in Revit',
        'Ignore the clash if it is less than 50mm',
        'Lower duct elevation, route through an approved beam sleeve, or issue an RFI to Structural lead',
        'Hide the ductwork in 3D view'
      ],
      correctIndex: 2,
      explanation: 'MEP BIM coordinators re-route utilities or request structural sleeve approval to maintain structural integrity while maintaining duct flow.'
    }
  ],
  'navisworks-clash-manage': [
    {
      id: 1,
      question: 'What is the primary difference between a Hard Clash and a Clearance Clash in Navisworks?',
      options: [
        'Hard clash is 2D; Clearance clash is 3D',
        'Hard clash is physical geometry intersection; Clearance clash checks required maintenance or insulation buffer space',
        'Hard clash applies to structural steel only',
        'Clearance clash occurs only during 4D scheduling'
      ],
      correctIndex: 1,
      explanation: 'Hard clashes occur when two objects physically overlap; Clearance clashes detect when objects encroach upon required operating or insulation zones.'
    },
    {
      id: 2,
      question: 'Which file format in Navisworks contains complete combined geometry, data, and viewpoints as a standalone file?',
      options: [
        '.NWC (Cache file)',
        '.NWF (Federated file)',
        '.NWD (Navisworks Document file)',
        '.RVT (Revit file)'
      ],
      correctIndex: 2,
      explanation: '.NWD files contain all geometry and data compiled into a self-contained file ideal for client distribution and archiving.'
    },
    {
      id: 3,
      question: 'How does 4D BIM Simulation function in Navisworks TimeLiner?',
      options: [
        'It animates walk-through cameras inside buildings',
        'It links 3D model geometry objects with MS Project or Primavera P6 construction schedule tasks',
        'It calculates solar radiation over 24 hours',
        'It performs structural load stress testing over time'
      ],
      correctIndex: 1,
      explanation: 'Navisworks TimeLiner connects 3D model elements to project schedules (Gantt charts) to visualize construction sequencing in 4D.'
    },
    {
      id: 4,
      question: 'What is the SwitchBack feature in Navisworks Manage?',
      options: [
        'Reverts Navisworks to an older software version',
        'Opens the exact clash location and view directly inside the original authoring software (e.g. Revit)',
        'Switches color schemes from dark to light mode',
        'Toggles between Imperial and Metric measurements'
      ],
      correctIndex: 1,
      explanation: 'SwitchBack selects the clashing element in Navisworks and automatically opens and highlights it in Revit for instant editing.'
    },
    {
      id: 5,
      question: 'What is the purpose of a Clash Matrix in ISO 19650 BIM execution?',
      options: [
        'To list software license keys for team members',
        'To define trade-versus-trade priority rules and testing schedules (e.g., Structure vs HVAC, Plumbing vs Electrical)',
        'To estimate total concrete cubic volume',
        'To create marketing flyers for clients'
      ],
      correctIndex: 1,
      explanation: 'A Clash Matrix establishes systematic clash tests between specific trade models with defined tolerances and responsibility assignments.'
    }
  ],
  'dynamo-bim-scripting': [
    {
      id: 1,
      question: 'What are the core components of a node in Dynamo visual programming?',
      options: [
        'HTML, CSS, and JavaScript',
        'Input ports, Output ports, and internal execution logic',
        '3D Mesh, Texture, and Lighting',
        'Rows, Columns, and Cells'
      ],
      correctIndex: 1,
      explanation: 'Dynamo nodes process input data through internal logic and pass results downstream through output ports.'
    },
    {
      id: 2,
      question: 'How does a List.FilterByBoolMask node operate in Dynamo?',
      options: [
        'It deletes all text from parameter values',
        'It splits an input list into "in" and "out" sublists based on a boolean (True/False) mask',
        'It converts numbers into strings',
        'It locks all parameters in Revit'
      ],
      correctIndex: 1,
      explanation: 'List.FilterByBoolMask filters data based on boolean conditions, returning matching items in the "in" port and non-matching in "out".'
    },
    {
      id: 3,
      question: 'What is the primary advantage of using Dynamo Player in Revit?',
      options: [
        'It renders high-resolution video walkthroughs',
        'It allows non-programmer BIM engineers to execute automated scripts with simple input forms without opening the Dynamo workspace',
        'It updates Revit software automatically',
        'It translates Revit into 12 languages'
      ],
      correctIndex: 1,
      explanation: 'Dynamo Player provides a user-friendly UI button interface for running scripts without exposing complex node wiring.'
    },
    {
      id: 4,
      question: 'Which Dynamo node enables custom Python programming using the Revit API (Autodesk.Revit.DB)?',
      options: [
        'Math.Abs',
        'Python Script node',
        'Code Block',
        'String.Contains'
      ],
      correctIndex: 1,
      explanation: 'The Python Script node allows developers to access the full Revit API using IronPython or CPython syntax.'
    },
    {
      id: 5,
      question: 'What is DesignScript in Dynamo?',
      options: [
        'A textual programming language used inside Dynamo Code Blocks for concise data manipulation',
        'A 2D drafting plugin for AutoCAD',
        'A font style used in title blocks',
        'An cloud rendering service'
      ],
      correctIndex: 0,
      explanation: 'DesignScript is Dynamo’s native scripting language used inside Code Blocks to write multi-step logic compactly.'
    }
  ],
  'civil3d-infra-bim': [
    {
      id: 1,
      question: 'What Civil 3D object represents existing 3D terrain topography generated from land survey point data?',
      options: [
        'TIN Surface (Triangulated Irregular Network)',
        '2D Polyline',
        'Solid Hatch',
        'Viewports'
      ],
      correctIndex: 0,
      explanation: 'TIN Surfaces model existing or proposed ground elevations using interconnected triangles derived from survey point clouds.'
    },
    {
      id: 2,
      question: 'What is a Corridor in Autodesk Civil 3D?',
      options: [
        'An indoor hallway in a building model',
        'A dynamic 3D linear highway/road model created by combining an Alignment, Assembly, and Profile',
        'A structural column grid',
        'A drainage pipe diameter table'
      ],
      correctIndex: 1,
      explanation: 'Civil 3D Corridors combine horizontal alignments, vertical profiles, and cross-sectional assemblies to build 3D road and channel infrastructure.'
    },
    {
      id: 3,
      question: 'How do Civil 3D underground pipe networks coordinate with Revit building models?',
      options: [
        'By printing paper drawings',
        'By exporting via Shared Reference Point, IFC, or Civil Connection packages',
        'They cannot be coordinated',
        'Using PDF overlays'
      ],
      correctIndex: 1,
      explanation: 'Shared Reference Point utilities align Civil 3D real-world coordinates with Revit local origin coordinates for seamless multi-discipline coordination.'
    },
    {
      id: 4,
      question: 'What is a Subassembly in Civil 3D Corridor modeling?',
      options: [
        'A structural concrete beam',
        'A parametric cross-sectional component representing lane pavement, curb, gutter, daylight slope, or sidewalk',
        'A text annotation style',
        'A layer group'
      ],
      correctIndex: 1,
      explanation: 'Subassemblies are the modular building blocks placed along assemblies to define road lane geometry and cut/fill slopes.'
    },
    {
      id: 5,
      question: 'Why are Earthwork Cut & Fill calculations critical in infrastructure BIM?',
      options: [
        'To select structural paint colors',
        'To balance earth excavation (cut) and embankment (fill) volume costs on site',
        'To calculate indoor air conditioning loads',
        'To select solar panel angles'
      ],
      correctIndex: 1,
      explanation: 'Balancing Cut and Fill volumes minimizes expensive soil hauling or importing off-site, drastically reducing project construction budgets.'
    }
  ]
};

// Milestone Badges Configuration
const MILESTONE_BADGES = [
  {
    id: 'badge-25',
    threshold: 25,
    title: 'BIM Explorer',
    subtitle: '25% Milestone Unlocked',
    description: 'Awarded for completing 25% of course modules. Unlocked core UI, Levels & Grids, and project setup.',
    icon: Compass,
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    borderColor: 'border-amber-400/80',
    textColor: 'text-amber-300',
    glowColor: 'shadow-amber-500/30',
    bgColor: 'bg-amber-950/80',
    perks: ['Unlocked RVT Model Templates', 'Access to Level 1 Student Forum', '25% Progress Certificate Seal']
  },
  {
    id: 'badge-50',
    threshold: 50,
    title: 'BIM Specialist',
    subtitle: '50% Milestone Unlocked',
    description: 'Awarded for completing 50% of course modules. Mastered parametric family creation & clash matrix setup.',
    icon: Zap,
    gradient: 'from-emerald-400 via-teal-500 to-emerald-600',
    borderColor: 'border-emerald-400/80',
    textColor: 'text-emerald-300',
    glowColor: 'shadow-emerald-500/30',
    bgColor: 'bg-emerald-950/80',
    perks: ['Unlocked Navisworks Search Sets', 'Access to Live Studio Q&A', 'Halfway Mastery Badge']
  },
  {
    id: 'badge-75',
    threshold: 75,
    title: 'BIM Strategist',
    subtitle: '75% Milestone Unlocked',
    description: 'Awarded for completing 75% of course modules. Mastered Dynamo visual scripting & 4D construction simulation.',
    icon: Target,
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    borderColor: 'border-purple-400/80',
    textColor: 'text-purple-300',
    glowColor: 'shadow-purple-500/30',
    bgColor: 'bg-purple-950/80',
    perks: ['Unlocked Custom Dynamo Nodes Pack', 'Priority Mentor Review', 'Advanced BIM Specialist Badge']
  },
  {
    id: 'badge-100',
    threshold: 100,
    title: 'Certified BIM Master',
    subtitle: '100% Course Completion',
    description: 'Awarded for completing 100% of course modules! Official Verified PDF Certificate generated.',
    icon: Trophy,
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-200',
    glowColor: 'shadow-amber-400/40',
    bgColor: 'bg-amber-950/90',
    perks: ['Official Verified PDF Certificate', 'PBS Alumni Global Network Access', 'Direct Industry Referral']
  }
];

export const StudentLmsPortalModal: React.FC<StudentLmsPortalModalProps> = ({ onClose }) => {
  // Modal states
  const [activeTab, setActiveTab] = useState<'my-courses' | 'profile' | 'discussions' | 'milestones' | 'quiz' | 'resources' | 'certificate'>('my-courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES_DATA[0].id);
  const [selectedLesson, setSelectedLesson] = useState<string>('Lesson 1: Introduction to Revit UI & Project Templates');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Completed lessons state
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    'Lesson 1: Introduction to Revit UI & Project Templates': true,
    'Lesson 2: Setting up Levels, Grids & Central File': true,
  });

  // Milestone Badge Unlock Modal state
  const [unlockedBadgeModal, setUnlockedBadgeModal] = useState<typeof MILESTONE_BADGES[0] | null>(null);

  // Google User State & Editable Student Profile
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState<boolean>(true);
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState({
    name: 'Pravin Yadav',
    email: 'pravin.yadav.dar99@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    studentId: 'PBS-STU-2026-8812',
    enrolledDate: 'Jan 15, 2026',
    headline: 'BIM Architectural & MEP Modeler',
    location: 'Maharashtra, India',
    bio: 'Enthusiastic BIM Engineer mastering Revit 2026, Navisworks Manage, and Dynamo automation workflows at Pragmatic BIM Solution.'
  });

  // Student Profile Editing Form state
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editNameInput, setEditNameInput] = useState<string>(googleUser.name);
  const [editHeadlineInput, setEditHeadlineInput] = useState<string>(googleUser.headline);
  const [editEmailInput, setEditEmailInput] = useState<string>(googleUser.email);
  const [editLocationInput, setEditLocationInput] = useState<string>(googleUser.location);
  const [editBioInput, setEditBioInput] = useState<string>(googleUser.bio);
  const [selectedAvatarPreset, setSelectedAvatarPreset] = useState<string>(googleUser.avatar);

  const AVATAR_PRESETS = [
    { id: '1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', label: 'Executive' },
    { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', label: 'BIM Engineer' },
    { id: '3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', label: 'Architect' },
    { id: '4', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', label: 'Coordinator' },
    { id: '5', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', label: 'Specialist' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNameInput.trim()) return;

    const updatedName = editNameInput.trim();
    setGoogleUser(prev => ({
      ...prev,
      name: updatedName,
      email: editEmailInput.trim() || prev.email,
      avatar: selectedAvatarPreset,
      headline: editHeadlineInput.trim() || prev.headline,
      location: editLocationInput.trim() || prev.location,
      bio: editBioInput.trim() || prev.bio
    }));
    setCertStudentName(updatedName);
    setIsEditingProfile(false);

    setPdfSuccessToast('Profile & Display Name updated successfully!');
    setTimeout(() => setPdfSuccessToast(null), 3500);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Student name for certificate
  const [certStudentName, setCertStudentName] = useState<string>(googleUser.name);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfSuccessToast, setPdfSuccessToast] = useState<string | null>(null);

  // Module-Specific Discussion State
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(INITIAL_DISCUSSIONS);
  const [discussionScope, setDiscussionScope] = useState<'current-lesson' | 'all-course'>('current-lesson');
  const [discussionCategoryFilter, setDiscussionCategoryFilter] = useState<'All' | 'Question' | 'Insight' | 'Tip' | 'Bug'>('All');
  const [discussionSearch, setDiscussionSearch] = useState<string>('');
  const [isPostingThread, setIsPostingThread] = useState<boolean>(false);
  const [newThreadTitle, setNewThreadTitle] = useState<string>('');
  const [newThreadContent, setNewThreadContent] = useState<string>('');
  const [newThreadCategory, setNewThreadCategory] = useState<'Question' | 'Insight' | 'Tip' | 'Bug'>('Question');
  const [newThreadTimeRef, setNewThreadTimeRef] = useState<string>('');
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>('disc-1');
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const newThread: DiscussionThread = {
      id: `disc-${Date.now()}`,
      courseId: selectedCourseId,
      lessonTitle: selectedLesson,
      author: googleUser.name,
      authorAvatar: googleUser.avatar,
      authorRole: 'student',
      title: newThreadTitle.trim(),
      content: newThreadContent.trim(),
      timestampRef: newThreadTimeRef.trim() || undefined,
      category: newThreadCategory,
      timestamp: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      isPinned: false,
      isResolved: false,
      replies: []
    };

    setDiscussions(prev => [newThread, ...prev]);
    setNewThreadTitle('');
    setNewThreadContent('');
    setNewThreadTimeRef('');
    setIsPostingThread(false);
    setExpandedThreadId(newThread.id);

    setPdfSuccessToast('Question/Insight posted successfully!');
    setTimeout(() => setPdfSuccessToast(null), 3500);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleUpvoteThread = (threadId: string) => {
    setDiscussions(prev => prev.map(t => {
      if (t.id === threadId) {
        const hasUpvoted = !!t.hasUpvoted;
        return {
          ...t,
          upvotes: hasUpvoted ? t.upvotes - 1 : t.upvotes + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return t;
    }));
  };

  const handleAddReply = (threadId: string) => {
    const text = replyInputMap[threadId];
    if (!text || !text.trim()) return;

    const newReply: DiscussionComment = {
      id: `rep-${Date.now()}`,
      author: googleUser.name,
      avatar: googleUser.avatar,
      role: 'student',
      content: text.trim(),
      timestamp: 'Just now'
    };

    setDiscussions(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [...t.replies, newReply]
        };
      }
      return t;
    }));

    setReplyInputMap(prev => ({ ...prev, [threadId]: '' }));
  };

  const handleToggleResolveThread = (threadId: string) => {
    setDiscussions(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          isResolved: !t.isResolved
        };
      }
      return t;
    }));
  };

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  const currentQuestions = QUIZ_DATA[selectedCourseId] || QUIZ_DATA['revit-mep-ar-st'];

  // Course Completion Calculation across all modules
  const allCourseLessons = selectedCourse.curriculum.flatMap(m => m.lessons);
  const completedLessonsCount = allCourseLessons.filter(l => completedLessons[l]).length;
  const totalLessonsCount = allCourseLessons.length;
  const completionPercentage = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;
  const is100PercentCompleted = totalLessonsCount > 0 && completedLessonsCount === totalLessonsCount;

  // Count unlocked milestone badges
  const unlockedBadgesCount = MILESTONE_BADGES.filter(b => completionPercentage >= b.threshold).length;

  // Toggle lesson completion with Milestone trigger check
  const toggleLessonCompletion = (lesson: string) => {
    setCompletedLessons(prev => {
      const isCurrentlyDone = !!prev[lesson];
      const nextState = { ...prev, [lesson]: !isCurrentlyDone };
      const doneCount = allCourseLessons.filter(l => nextState[l]).length;
      const newPct = totalLessonsCount > 0 ? Math.round((doneCount / totalLessonsCount) * 100) : 0;

      // Check if toggling ON crossed a milestone threshold
      if (!isCurrentlyDone) {
        const newlyUnlocked = MILESTONE_BADGES.find(b => completionPercentage < b.threshold && newPct >= b.threshold);
        if (newlyUnlocked) {
          setUnlockedBadgeModal(newlyUnlocked);
          confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.5 }
          });
        } else if (doneCount === totalLessonsCount && totalLessonsCount > 0) {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
        }
      }

      return nextState;
    });
  };

  // Complete all modules in one click (for testing / quick unlock)
  const completeAllModules = () => {
    const fullState: Record<string, boolean> = { ...completedLessons };
    allCourseLessons.forEach(l => {
      fullState[l] = true;
    });
    setCompletedLessons(fullState);

    // Pop up the Certified BIM Master badge
    const masterBadge = MILESTONE_BADGES.find(b => b.threshold === 100);
    if (masterBadge) {
      setUnlockedBadgeModal(masterBadge);
    }

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 }
    });
  };

  // Dynamic PDF Certificate Generator
  const handleDownloadPdfCertificate = async () => {
    setIsGeneratingPdf(true);
    try {
      const certElement = document.getElementById('printable-certificate');
      let pdf: jsPDF;

      if (certElement) {
        const canvas = await html2canvas(certElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
        // Fallback vector PDF creation
        pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.setDrawColor(16, 185, 129);
        pdf.setLineWidth(3);
        pdf.rect(10, 10, pdfWidth - 20, pdfHeight - 20);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(6, 95, 70);
        pdf.text('PRAGMATIC BIM SOLUTION', pdfWidth / 2, 35, { align: 'center' });

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(26);
        pdf.setTextColor(15, 23, 42);
        pdf.text('CERTIFICATE OF PROFESSIONAL ACHIEVEMENT', pdfWidth / 2, 55, { align: 'center' });

        pdf.setFontSize(22);
        pdf.setTextColor(6, 95, 70);
        pdf.text(certStudentName || googleUser.name || 'Pravin Yadav', pdfWidth / 2, 85, { align: 'center' });

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(51, 65, 85);
        pdf.text(`Has achieved 100% module completion in ${selectedCourse.title}`, pdfWidth / 2, 110, { align: 'center' });
      }

      const cleanName = (certStudentName || googleUser.name || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `PBS_Certificate_${cleanName}_${selectedCourse.id}.pdf`;
      pdf.save(filename);

      setPdfSuccessToast(`Certificate downloaded: ${filename}`);
      setTimeout(() => setPdfSuccessToast(null), 5000);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Google Login Simulator
  const handleGoogleSelect = (account: { name: string; email: string; avatar: string }) => {
    setGoogleUser(prev => ({
      ...prev,
      name: account.name,
      email: account.email,
      avatar: account.avatar
    }));
    setCertStudentName(account.name);
    setIsGoogleLoggedIn(true);
    setShowGoogleModal(false);
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let score = 0;
    currentQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
    const passed = score >= Math.ceil(currentQuestions.length * 0.8); // 80%+ pass threshold
    setQuizPassed(passed);

    if (passed) {
      // Trigger confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setQuizScore(0);
  };

  // Print Certificate
  const handlePrintCertificate = () => {
    window.print();
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render Module-Specific Discussion Section
  const renderDiscussionSection = (isStandaloneTab: boolean = false) => {
    // Filter discussion threads
    const filteredDiscussions = discussions.filter(t => {
      // Scope check
      if (discussionScope === 'current-lesson' && !isStandaloneTab) {
        if (t.courseId !== selectedCourseId || t.lessonTitle !== selectedLesson) return false;
      } else if (isStandaloneTab && discussionScope === 'current-lesson') {
        if (t.courseId !== selectedCourseId || t.lessonTitle !== selectedLesson) return false;
      } else {
        // 'all-course'
        if (t.courseId !== selectedCourseId) return false;
      }

      // Category filter
      if (discussionCategoryFilter !== 'All' && t.category !== discussionCategoryFilter) return false;

      // Search query
      if (discussionSearch.trim()) {
        const q = discussionSearch.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchContent = t.content.toLowerCase().includes(q);
        const matchAuthor = t.author.toLowerCase().includes(q);
        const matchLesson = t.lessonTitle.toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchAuthor && !matchLesson) return false;
      }

      return true;
    });

    return (
      <div className={`bg-slate-950 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5 ${isStandaloneTab ? 'max-w-5xl mx-auto' : ''}`}>
        {/* Discussion Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>Module Discussion & Lesson Q&A</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">
                  {filteredDiscussions.length} posts
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-400 font-bold">
                {selectedCourse.title}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md">
                {selectedLesson}
              </span>
            </p>
          </div>

          {/* Action button to post */}
          <button
            onClick={() => setIsPostingThread(!isPostingThread)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
          >
            {isPostingThread ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel Post</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Ask Question / Share Insight</span>
              </>
            )}
          </button>
        </div>

        {/* Scope Toggles & Category Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80">
          {/* Scope selector tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setDiscussionScope('current-lesson')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                discussionScope === 'current-lesson'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              This Lesson Only
            </button>
            <button
              onClick={() => setDiscussionScope('all-course')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                discussionScope === 'all-course'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Entire Course Q&A
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-bold py-1">
            {(['All', 'Question', 'Insight', 'Tip', 'Bug'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setDiscussionCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  discussionCategoryFilter === cat
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800'
                }`}
              >
                {cat === 'Question' ? '❓ Question' : cat === 'Insight' ? '💡 Insight' : cat === 'Tip' ? '⚡ Tip' : cat === 'Bug' ? '🐛 Bug' : 'All Topics'}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={discussionSearch}
              onChange={(e) => setDiscussionSearch(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 outline-none focus:border-emerald-500 placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* New Thread Posting Form (Animated Expand) */}
        <AnimatePresence>
          {isPostingThread && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCreateThread}
              className="bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/60 shadow-xl space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Ask a Question or Share Lesson Insight
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Posting as: {googleUser.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Category selector */}
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Type of Post</label>
                  <select
                    value={newThreadCategory}
                    onChange={(e) => setNewThreadCategory(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 font-bold"
                  >
                    <option value="Question">❓ Question (Seeking Help)</option>
                    <option value="Insight">💡 Lesson Insight</option>
                    <option value="Tip">⚡ Pro-Tip / Shortcut</option>
                    <option value="Bug">🐛 Bug / Software Error</option>
                  </select>
                </div>

                {/* Timecode reference */}
                <div className="sm:col-span-7">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    Video Timestamp Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 03:45 or Leave empty"
                    value={newThreadTimeRef}
                    onChange={(e) => setNewThreadTimeRef(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Title / Main Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to break grid line heads in close elevation views?"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 text-xs p-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Detailed Explanation or Context</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your question, steps you tried, or your BIM insight in detail..."
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Submit Bar */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostingThread(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Post</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Discussion Thread Cards */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No discussion posts found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first student to ask a question or share an insight for <span className="text-emerald-400 font-semibold">{selectedLesson}</span>!
              </p>
              <button
                onClick={() => setIsPostingThread(true)}
                className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Start First Post
              </button>
            </div>
          ) : (
            filteredDiscussions.map((thread) => {
              const isExpanded = expandedThreadId === thread.id;
              const categoryBadgeColor = 
                thread.category === 'Question' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                thread.category === 'Insight' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                thread.category === 'Tip' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-red-500/20 text-red-300 border-red-500/30';

              return (
                <div
                  key={thread.id}
                  className={`bg-slate-900/90 rounded-2xl border transition-all shadow-md overflow-hidden ${
                    thread.isPinned 
                      ? 'border-amber-400/50 shadow-amber-950/20' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Thread Card Header */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={thread.authorAvatar}
                          alt={thread.author}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white">{thread.author}</span>
                            {thread.authorRole === 'instructor' && (
                              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-500/40">
                                Instructor
                              </span>
                            )}
                            {thread.authorRole === 'ta' && (
                              <span className="bg-amber-500/20 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-500/40">
                                BIM TA
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500">• {thread.timestamp}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-xs sm:max-w-md">
                            {thread.lessonTitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {thread.isPinned && (
                          <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1">
                            <Pin className="w-3 h-3 text-amber-300" />
                            <span>Pinned</span>
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${categoryBadgeColor}`}>
                          {thread.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Body */}
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        {thread.isResolved && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" title="Resolved" />
                        )}
                        <span>{thread.title}</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed whitespace-pre-line">
                        {thread.content}
                      </p>

                      {thread.timestampRef && (
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400">
                          <Clock className="w-3 h-3" />
                          <span>Timestamp: {thread.timestampRef}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-3">
                        {/* Upvote */}
                        <button
                          onClick={() => handleUpvoteThread(thread.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            thread.hasUpvoted
                              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${thread.hasUpvoted ? 'fill-emerald-400' : ''}`} />
                          <span>{thread.upvotes} Helpful</span>
                        </button>

                        {/* Reply Toggle */}
                        <button
                          onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-950 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>{thread.replies.length} Replies</span>
                        </button>
                      </div>

                      {/* Toggle Resolved if question */}
                      {thread.category === 'Question' && (
                        <button
                          onClick={() => handleToggleResolveThread(thread.id)}
                          className={`text-[11px] font-bold transition-colors flex items-center gap-1 ${
                            thread.isResolved ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{thread.isResolved ? 'Resolved' : 'Mark as Resolved'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Replies Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-950/80 p-4 border-t border-slate-800 space-y-3"
                      >
                        {/* Replies List */}
                        {thread.replies.length > 0 && (
                          <div className="space-y-2.5 pl-2 border-l-2 border-emerald-500/30">
                            {thread.replies.map((reply) => (
                              <div key={reply.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={reply.avatar}
                                      alt={reply.author}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="font-bold text-white text-[11px]">{reply.author}</span>
                                    {reply.role === 'instructor' && (
                                      <span className="bg-emerald-500/20 text-emerald-300 text-[8px] font-black px-1.5 py-0.2 rounded border border-emerald-500/30">
                                        Instructor
                                      </span>
                                    )}
                                    {reply.role === 'ta' && (
                                      <span className="bg-amber-500/20 text-amber-300 text-[8px] font-black px-1.5 py-0.2 rounded border border-amber-500/30">
                                        BIM TA
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-slate-300 text-xs pl-8 leading-relaxed">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Write a reply or answer..."
                            value={replyInputMap[thread.id] || ''}
                            onChange={(e) => setReplyInputMap(prev => ({ ...prev, [thread.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddReply(thread.id);
                              }
                            }}
                            className="flex-1 bg-slate-900 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-800 outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={() => handleAddReply(thread.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-lg overflow-y-auto animate-fadeIn ${isFullscreen ? '!p-0' : ''}`}>
      
      {/* Modal Container */}
      <div className={`bg-slate-900 text-white shadow-2xl border border-slate-800 relative flex flex-col transition-all duration-300 ${
        isFullscreen 
          ? 'w-screen h-screen max-w-none max-h-none rounded-none' 
          : 'rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-hidden my-4'
      }`}>
        
        {/* Top Control Bar: Fullscreen & Close */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 backdrop-blur-md transition-all shadow-md"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 backdrop-blur-md transition-all shadow-md"
            aria-label="Close Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-5 sm:p-7 border-b border-emerald-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-900/40">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span>PBS LEARNING MANAGEMENT SYSTEM</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[9px] font-bold">
                  v3.0 Google Auth
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Student LMS Portal & Certification
              </h2>
            </div>
          </div>

          {/* Google Auth Status / Login Option */}
          <div className="flex items-center gap-3">
            {isGoogleLoggedIn ? (
              <div className="bg-slate-950/80 p-2 sm:px-3 sm:py-2 rounded-2xl border border-emerald-500/40 flex items-center gap-3 shadow-inner">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
                  title="View Student Profile"
                >
                  <img
                    src={googleUser.avatar}
                    alt={googleUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="text-left text-xs pr-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{googleUser.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-emerald-400/90 font-mono truncate max-w-[150px]">
                      {googleUser.email}
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1"
                    title="Edit Student Profile & Display Name"
                  >
                    <User className="w-3 h-3" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => setShowGoogleModal(true)}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1.5 rounded-xl border border-slate-700 transition-colors"
                    title="Switch or Link Google Account"
                  >
                    Account
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowGoogleModal(true)}
                className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 border border-slate-200 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex flex-wrap items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('my-courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'my-courses'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Modules & Video Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-300" />
            <span>Student Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'discussions'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-300" />
            <span>Q&A Discussions</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] font-extrabold border border-emerald-500/30">
              {discussions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'milestones'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Milestones & Badges</span>
            <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-extrabold border border-amber-400/30">
              {unlockedBadgesCount}/4
            </span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>MCQ Knowledge Test</span>
            <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-extrabold border border-amber-400/30">
              Exam
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Project Assets & .RVT Files</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Verified Certificate</span>
            {quizPassed && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          {/* Top Header Learning Progress Pill */}
          <div className="ml-auto flex items-center gap-3 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Learning Progress:</span>
              <span className="text-amber-300 font-extrabold font-mono">{completionPercentage}%</span>
            </div>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full animate-shimmer-bar"
              />
            </div>
          </div>
        </div>

        {/* Portal Main Body Container */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 space-y-6 relative">
          
          {/* Toast Notification for PDF Generation */}
          <AnimatePresence>
            {pdfSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-3 font-bold text-xs"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>{pdfSuccessToast}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: My Courses & Lessons & Video Player */}
          {activeTab === 'my-courses' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* 100% Completion Celebration Banner */}
              {is100PercentCompleted && (
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 p-5 sm:p-6 rounded-3xl border-2 border-amber-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden"
                >
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-amber-900/50">
                      <Award className="w-8 h-8" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          🎉 100% MODULE COMPLETION ACHIEVED
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        Congratulations! You've Completed All {selectedCourse.title} Modules!
                      </h3>
                      <p className="text-xs text-emerald-100">
                        Your official verified PDF Certificate of Professional Achievement is generated and ready to download.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPdfCertificate}
                    disabled={isGeneratingPdf}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2.5 flex-shrink-0 relative z-10"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Building PDF Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4.5 h-4.5" />
                        <span>Download Dynamic PDF Certificate</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column: Course Selector & Module Lessons */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider mb-1.5">
                    Select Active BIM Program
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => {
                      setSelectedCourseId(e.target.value);
                      handleResetQuiz();
                    }}
                    className="w-full bg-slate-950 text-white text-xs font-bold p-3 rounded-2xl border border-slate-700 outline-none focus:border-emerald-500 shadow-sm"
                  >
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Overall Interactive Animated Learning Progress Bar Card */}
                <div className="bg-slate-950/90 rounded-3xl p-5 border border-emerald-800/50 shadow-xl space-y-4 relative overflow-hidden group">
                  {/* Subtle ambient background glow */}
                  <div className="absolute -right-12 -top-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

                  {/* Progress Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-wider">
                          Learning Progress Bar
                        </h3>
                        <p className="text-[10px] text-slate-400">
                          {completedLessonsCount} of {totalLessonsCount} Lessons Completed
                        </p>
                      </div>
                    </div>

                    {/* Percentage Counter Badge */}
                    <div className="flex items-center gap-1.5">
                      <motion.span 
                        key={completionPercentage}
                        initial={{ scale: 1.25, color: "#34d399" }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-black text-amber-300 font-mono tracking-tight"
                      >
                        {completionPercentage}%
                      </motion.span>
                    </div>
                  </div>

                  {/* Main Dynamic Animated CSS Progress Track */}
                  <div className="space-y-2 relative pt-1 pb-1">
                    {/* Bar Outer Track */}
                    <div className="w-full bg-slate-900 h-4 rounded-full p-0.5 border border-slate-800 relative shadow-inner overflow-hidden">
                      {/* Animated Fill Bar with Shimmer */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                        className="h-full rounded-full animate-shimmer-bar relative transition-all shadow-md"
                      >
                        {/* Internal Shine Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                      </motion.div>

                      {/* Pulsing Glowing Tip Indicator at current progress head */}
                      {completionPercentage > 0 && completionPercentage < 100 && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 -ml-2 rounded-full bg-amber-300 border-2 border-slate-950 progress-head-glow transition-all duration-300 pointer-events-none z-10"
                          style={{ left: `${completionPercentage}%` }}
                        />
                      )}
                    </div>

                    {/* Milestone Nodes (0%, 25%, 50%, 75%, 100%) */}
                    <div className="relative flex items-center justify-between px-1 text-[10px] font-bold text-slate-400 pt-1">
                      {[0, 25, 50, 75, 100].map((milestone) => {
                        const isReached = completionPercentage >= milestone;
                        const isCurrent = completionPercentage >= milestone && (milestone === 100 ? completionPercentage === 100 : completionPercentage < milestone + 25);

                        return (
                          <div key={milestone} className="flex flex-col items-center gap-1 relative group/ms">
                            <div 
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black transition-all border ${
                                isReached
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md shadow-emerald-900/50 scale-110'
                                  : 'bg-slate-800 text-slate-500 border-slate-700'
                              }`}
                            >
                              {isReached ? <CheckCircle2 className="w-3 h-3 text-slate-950" /> : `${milestone}`}
                            </div>
                            <span className={`text-[9px] font-extrabold ${isCurrent ? 'text-amber-300' : isReached ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {milestone === 0 ? 'Start' : milestone === 50 ? '50% Pro' : milestone === 100 ? 'Certified' : `${milestone}%`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress Stats Summary Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80 text-[10px]">
                    <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center">
                      <span className="text-slate-400 block font-bold">Modules Done</span>
                      <span className="text-emerald-300 font-extrabold text-xs">
                        {selectedCourse.curriculum.filter(m => m.lessons.every(l => completedLessons[l])).length} / {selectedCourse.curriculum.length}
                      </span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center">
                      <span className="text-slate-400 block font-bold">Total Hours</span>
                      <span className="text-slate-200 font-extrabold text-xs">{selectedCourse.hours}</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center">
                      <span className="text-slate-400 block font-bold">Status</span>
                      <span className={`font-extrabold text-xs ${is100PercentCompleted ? 'text-amber-300' : 'text-emerald-400'}`}>
                        {is100PercentCompleted ? '100% Complete' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  {/* 100% Quick Complete / Unlock Button */}
                  <div className="pt-1">
                    {!is100PercentCompleted ? (
                      <button
                        onClick={completeAllModules}
                        className="w-full bg-slate-800 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-emerald-700/50 flex items-center justify-center gap-2 transition-all shadow-sm group"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300 group-hover:scale-125 transition-transform" />
                        <span>Complete All Modules (100%)</span>
                      </button>
                    ) : (
                      <div className="w-full bg-emerald-950/90 text-emerald-300 p-2.5 rounded-xl border border-emerald-500/80 text-xs font-bold flex items-center justify-center gap-2 shadow-lg">
                        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                        <span>100% Course Modules Completed!</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Virtual Milestone Badges Quick Row */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="font-extrabold text-white uppercase tracking-wider text-[11px]">Milestone Badges ({unlockedBadgesCount}/4)</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Showcase</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {MILESTONE_BADGES.map((badge) => {
                      const isUnlocked = completionPercentage >= badge.threshold;
                      const Icon = badge.icon;

                      return (
                        <button
                          key={badge.id}
                          onClick={() => {
                            if (isUnlocked) {
                              setUnlockedBadgeModal(badge);
                            } else {
                              setActiveTab('milestones');
                            }
                          }}
                          className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all relative overflow-hidden group ${
                            isUnlocked
                              ? `bg-gradient-to-b ${badge.gradient} text-slate-950 border-white/40 shadow-md hover:scale-105 cursor-pointer font-bold`
                              : 'bg-slate-900/90 text-slate-500 border-slate-800 hover:bg-slate-800/80 cursor-pointer'
                          }`}
                          title={isUnlocked ? `Unlocked: ${badge.title}` : `Locked: Reach ${badge.threshold}%`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold ${
                            isUnlocked ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-500'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[9px] font-black truncate w-full">
                            {badge.threshold}% Badge
                          </span>

                          {isUnlocked ? (
                            <span className="text-[7px] font-black bg-slate-950/30 text-slate-950 px-1 py-0.2 rounded-full uppercase tracking-tighter">
                              UNLOCKED
                            </span>
                          ) : (
                            <span className="text-[7px] font-bold text-slate-500 flex items-center gap-0.5">
                              <Lock className="w-2 h-2" />
                              {badge.threshold}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modules & Lesson Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Course Modules</span>
                    <span className="text-emerald-400 font-mono text-[10px]">
                      {selectedCourse.curriculum.length} Modules
                    </span>
                  </h4>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {selectedCourse.curriculum.map((module, mIdx) => {
                      const moduleDoneCount = module.lessons.filter(l => completedLessons[l]).length;
                      const moduleTotalCount = module.lessons.length;
                      const modulePct = moduleTotalCount > 0 ? Math.round((moduleDoneCount / moduleTotalCount) * 100) : 0;

                      return (
                        <div key={mIdx} className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden">
                          {/* Module Header with Mini Animated Progress Bar */}
                          <div className="bg-slate-800/80 px-3.5 py-2.5 border-b border-slate-800 flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                              <span>Module {mIdx + 1}: {module.moduleTitle}</span>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                modulePct === 100 
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                                  : 'bg-slate-700/60 text-slate-300 border-slate-700'
                              }`}>
                                {moduleDoneCount}/{moduleTotalCount} ({modulePct}%)
                              </span>
                            </div>

                            {/* Mini Progress Bar for Module */}
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${modulePct}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`h-full rounded-full ${
                                  modulePct === 100 
                                    ? 'bg-gradient-to-r from-emerald-500 to-amber-300' 
                                    : 'bg-emerald-500'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="p-2 space-y-1.5">
                            {module.lessons.map((lesson, lIdx) => {
                              const isSelected = selectedLesson === lesson;
                              const isDone = !!completedLessons[lesson];

                              return (
                                <div
                                  key={lIdx}
                                  className={`group p-2.5 rounded-xl text-xs flex items-center justify-between transition-all border ${
                                    isSelected
                                      ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
                                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                                  }`}
                                >
                                  <button
                                    onClick={() => setSelectedLesson(lesson)}
                                    className="flex items-center gap-2 flex-1 text-left line-clamp-1 pr-2"
                                  >
                                    <Play className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'}`} />
                                    <span className="font-medium text-xs">{lesson}</span>
                                  </button>

                                  <button
                                    onClick={() => toggleLessonCompletion(lesson)}
                                    className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
                                      isDone 
                                        ? 'bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50' 
                                        : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                                    }`}
                                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                  >
                                    <CheckCircle2 className={`w-4 h-4 ${isDone ? 'fill-emerald-400 text-slate-900' : ''}`} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Video Lesson Streaming Player */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-950 rounded-3xl border border-slate-700/80 overflow-hidden shadow-2xl relative">
                  
                  {/* Simulated Screen */}
                  <div className="h-72 sm:h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center p-6 text-center space-y-4 relative">
                    
                    {/* Animated Pulse Play Ring */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                      <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/60 cursor-pointer hover:scale-110 transition-transform border-2 border-emerald-300/40 relative z-10">
                        <Play className="w-9 h-9 text-white fill-white ml-1" />
                      </div>
                    </div>

                    <div>
                      <div className="text-base sm:text-lg font-black text-white">{selectedLesson}</div>
                      <div className="text-xs text-emerald-400 font-semibold mt-1 flex items-center justify-center gap-2">
                        <Video className="w-3.5 h-3.5" />
                        <span>1080p Ultra-HD BIM Masterclass Stream</span>
                      </div>
                    </div>

                    {/* Bottom Controls Bar */}
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-[11px]">PBS Instructor</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-emerald-400 font-mono text-[11px]">15m 24s</span>
                      </div>

                      {/* Speed selector */}
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <Sliders className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-400">Speed:</span>
                        {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-1.5 py-0.5 rounded transition-colors ${
                              playbackSpeed === spd
                                ? 'bg-emerald-600 text-white font-extrabold'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Lesson Notes & Download Dataset CTA */}
                <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-3">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Lesson Guidelines & Exercise Downloads
                    </span>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className="text-emerald-400 hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      <span>Get Sample Files</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    Open your BIM authoring tool ({selectedCourse.category}). Follow the step-by-step instructions to model MEP duct/pipe runs, set up clash matrix rules, or run Dynamo visual scripts as demonstrated in this lesson.
                  </p>
                </div>

                {/* Module & Lesson Specific Discussion Q&A Area */}
                {renderDiscussionSection(false)}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: Q&A Discussions */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {renderDiscussionSection(true)}
          </motion.div>
        )}

          {/* TAB: Student Profile & Accomplishments */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile Card Header */}
              <div className="bg-gradient-to-r from-slate-950 via-emerald-950/70 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="relative group">
                      <img
                        src={googleUser.avatar}
                        alt={googleUser.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-emerald-400 shadow-xl"
                      />
                      <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-xl font-bold shadow-md">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                          {googleUser.studentId}
                        </span>
                        <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-400/30 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-300" />
                          VERIFIED STUDENT
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                        <span>{googleUser.name}</span>
                      </h2>

                      <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                        {googleUser.headline}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{googleUser.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{googleUser.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Enrolled: {googleUser.enrolledDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsEditingProfile(!isEditingProfile);
                      setEditNameInput(googleUser.name);
                      setEditHeadlineInput(googleUser.headline);
                      setEditEmailInput(googleUser.email);
                      setEditLocationInput(googleUser.location);
                      setEditBioInput(googleUser.bio);
                      setSelectedAvatarPreset(googleUser.avatar);
                    }}
                    className={`px-5 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg ${
                      isEditingProfile
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950 hover:scale-105'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Display Name & Profile'}</span>
                  </button>
                </div>

                {googleUser.bio && !isEditingProfile && (
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed relative z-10">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Student Bio & Career Goal</span>
                    {googleUser.bio}
                  </div>
                )}
              </div>

              {/* Editable Form Modal / Section */}
              <AnimatePresence>
                {isEditingProfile && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveProfile}
                    className="bg-slate-950 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 shadow-2xl space-y-6 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-base font-black text-white">Edit Student Display Name & Details</h3>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">Changes reflect on Certificates</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Display Name Field */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center justify-between">
                          <span>Full Display Name (Printed on Certificate) *</span>
                          <span className="text-[10px] text-slate-400 font-normal">Official Legal / Certificate Name</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editNameInput}
                          onChange={(e) => setEditNameInput(e.target.value)}
                          placeholder="e.g. Pravin Yadav"
                          className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-400 font-bold transition-colors"
                        />
                      </div>

                      {/* Professional Headline */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Professional Title / Role</label>
                        <input
                          type="text"
                          value={editHeadlineInput}
                          onChange={(e) => setEditHeadlineInput(e.target.value)}
                          placeholder="e.g. Senior BIM Coordinator"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Student Email Address</label>
                        <input
                          type="email"
                          value={editEmailInput}
                          onChange={(e) => setEditEmailInput(e.target.value)}
                          placeholder="e.g. student@example.com"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300">City / Country</label>
                        <input
                          type="text"
                          value={editLocationInput}
                          onChange={(e) => setEditLocationInput(e.target.value)}
                          placeholder="e.g. Mumbai, India"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Student Bio */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300">Short Bio / Career Goals</label>
                        <textarea
                          rows={2}
                          value={editBioInput}
                          onChange={(e) => setEditBioInput(e.target.value)}
                          placeholder="Tell us about your BIM journey..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>

                      {/* Avatar Presets Picker */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block">Select Profile Avatar Preset:</label>
                        <div className="flex flex-wrap items-center gap-3">
                          {AVATAR_PRESETS.map((preset) => (
                            <button
                              type="button"
                              key={preset.id}
                              onClick={() => setSelectedAvatarPreset(preset.url)}
                              className={`p-1 rounded-2xl border-2 transition-all flex items-center gap-2 bg-slate-900 ${
                                selectedAvatarPreset === preset.url
                                  ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-950/60'
                                  : 'border-slate-800 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={preset.url} alt={preset.label} className="w-10 h-10 rounded-xl object-cover" />
                              <span className="text-[11px] font-bold text-slate-300 pr-2">{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg flex items-center gap-2 hover:scale-105"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Profile & Update Certificates</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Student Overview Analytics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Enrolled Courses</span>
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{COURSES_DATA.length}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Active Enrollment</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Overall Progress</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-300">{completionPercentage}%</div>
                  <div className="text-[10px] text-slate-400">{completedLessonsCount} / {totalLessonsCount} Lessons</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Certificates</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-300">
                    {is100PercentCompleted || quizPassed ? 1 : 0}
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-semibold">
                    {is100PercentCompleted ? '1 Verified' : 'In Progress'}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Milestones</span>
                    <Trophy className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-2xl font-black text-white">{unlockedBadgesCount} / 4</div>
                  <div className="text-[10px] text-amber-300 font-semibold">Badges Earned</div>
                </div>
              </div>

              {/* Summary of Enrolled Courses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Summary of Enrolled Courses ({COURSES_DATA.length})</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {COURSES_DATA.map((course) => {
                    const isSelected = course.id === selectedCourseId;
                    const courseLessons = course.curriculum.flatMap(m => m.lessons);
                    const doneInCourse = courseLessons.filter(l => completedLessons[l]).length;
                    const totalInCourse = courseLessons.length;
                    const coursePct = totalInCourse > 0 ? Math.round((doneInCourse / totalInCourse) * 100) : 0;
                    const isFinished = coursePct === 100;

                    return (
                      <div
                        key={course.id}
                        className={`bg-slate-950 rounded-2xl border p-5 space-y-4 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                              {course.category}
                            </span>
                            {isFinished ? (
                              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-amber-300" />
                                <span>100% Completed</span>
                              </span>
                            ) : coursePct > 0 ? (
                              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                                In Progress
                              </span>
                            ) : (
                              <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                                Enrolled
                              </span>
                            )}
                          </div>

                          <div>
                            <h4 className="text-sm font-black text-white line-clamp-1">{course.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{course.description}</p>
                          </div>

                          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-slate-500" />
                              {course.hours}
                            </span>
                          </div>

                          {/* Individual Course Progress Track */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-slate-300">Course Progress</span>
                              <span className="text-emerald-400 font-mono">{coursePct}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div
                                style={{ width: `${coursePct}%` }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                              />
                            </div>
                            <div className="text-[10px] text-slate-500 text-right">
                              {doneInCourse} of {totalInCourse} lessons completed
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setActiveTab('my-courses');
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            isSelected
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{isSelected ? 'Resume Current Course' : 'Switch & Start Course'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Earned Verified Certificates Section */}
              <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4 text-amber-300" />
                      <span>Verified Credentials Gallery</span>
                    </div>
                    <h3 className="text-lg font-black text-white">
                      Earned Course Certificates
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Verified completion certificates generated for {googleUser.name}. Download PDF certificates directly or share credentials with employers.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('certificate')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate Studio</span>
                  </button>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {COURSES_DATA.map((course) => {
                    const courseLessons = course.curriculum.flatMap(m => m.lessons);
                    const doneInCourse = courseLessons.filter(l => completedLessons[l]).length;
                    const isEarned = doneInCourse === courseLessons.length && courseLessons.length > 0;

                    return (
                      <div
                        key={course.id}
                        className={`p-5 rounded-2xl border transition-all space-y-4 relative overflow-hidden ${
                          isEarned
                            ? 'bg-gradient-to-br from-amber-950/40 via-slate-950 to-emerald-950/40 border-amber-400/60 shadow-xl'
                            : 'bg-slate-900/60 border-slate-800/80 opacity-75'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${
                              isEarned ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-500'
                            }`}>
                              <Award className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                  isEarned ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                                }`}>
                                  {isEarned ? 'VERIFIED CREDENTIAL' : 'LOCKED'}
                                </span>
                              </div>
                              <h4 className="text-sm font-black text-white mt-1">{course.title}</h4>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-medium">Issued To:</span>
                            <span className="font-extrabold text-white">{googleUser.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-medium">Credential ID:</span>
                            <span className="font-mono text-emerald-400 font-bold">PBS-CERT-2026-8812</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-medium">Issuer:</span>
                            <span className="font-bold text-slate-200">Pragmatic BIM Solution</span>
                          </div>
                        </div>

                        <div>
                          {isEarned ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleDownloadPdfCertificate}
                                disabled={isGeneratingPdf}
                                className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Certificate'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCourseId(course.id);
                                  setActiveTab('certificate');
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700"
                              >
                                View
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedCourseId(course.id);
                                setActiveTab('my-courses');
                              }}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-800 flex items-center justify-center gap-2"
                            >
                              <Lock className="w-3.5 h-3.5 text-slate-500" />
                              <span>Complete Modules to Unlock Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: Learning Milestones & Badges Showcase */}
          {activeTab === 'milestones' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Milestones Header Hero Card */}
              <div className="bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                      <Trophy className="w-4 h-4 text-amber-300" />
                      <span>Learning Milestones System</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Earn Virtual Badges as You Master BIM
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                      Complete course curriculum modules to unlock milestone badges at 25%, 50%, 75%, and 100%. Each badge unlocks exclusive BIM assets, Q&A privileges, and certificate seals!
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 flex-shrink-0 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-md">
                      {unlockedBadgesCount}/4
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Badges Unlocked</span>
                      <span className="text-sm font-black text-emerald-300">{completionPercentage}% Completed</span>
                    </div>
                  </div>
                </div>

                {/* Overall Progress Tracker Bar inside Hero */}
                <div className="space-y-2 pt-2 relative z-10">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Milestone Roadmap ({selectedCourse.title})</span>
                    <span className="text-amber-300 font-mono font-black">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3.5 rounded-full p-0.5 border border-slate-800 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ type: 'spring', stiffness: 50 }}
                      className="h-full rounded-full animate-shimmer-bar"
                    />
                  </div>
                </div>
              </div>

              {/* Badges Grid (4 Milestone Cards: 25%, 50%, 75%, 100%) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MILESTONE_BADGES.map((badge) => {
                  const isUnlocked = completionPercentage >= badge.threshold;
                  const Icon = badge.icon;
                  const percentRemaining = Math.max(0, badge.threshold - completionPercentage);

                  return (
                    <div
                      key={badge.id}
                      className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                        isUnlocked
                          ? `bg-slate-950 border-emerald-500/60 shadow-xl shadow-emerald-950/40 hover:scale-[1.02]`
                          : 'bg-slate-950/60 border-slate-800/80 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Background Glow */}
                      {isUnlocked && (
                        <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tr ${badge.gradient} opacity-20 rounded-full blur-2xl pointer-events-none`} />
                      )}

                      <div className="flex items-start justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-3.5">
                          {/* Badge Icon Circle */}
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-transform group-hover:rotate-6 shadow-lg border ${
                              isUnlocked
                                ? `bg-gradient-to-br ${badge.gradient} text-slate-950 ${badge.borderColor}`
                                : 'bg-slate-800 text-slate-600 border-slate-700'
                            }`}
                          >
                            <Icon className={`w-7 h-7 ${isUnlocked ? 'text-slate-950' : 'text-slate-500'}`} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                isUnlocked
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-500 border-slate-700'
                              }`}>
                                {badge.threshold}% Milestone
                              </span>
                            </div>
                            <h3 className="text-base font-black text-white mt-0.5">
                              {badge.title}
                            </h3>
                            <p className={`text-xs font-bold ${isUnlocked ? badge.textColor : 'text-slate-500'}`}>
                              {badge.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Status Pill */}
                        <div className="flex-shrink-0">
                          {isUnlocked ? (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>UNLOCKED</span>
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-slate-500" />
                              <span>{percentRemaining}% left</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 mt-4 leading-relaxed relative z-10">
                        {badge.description}
                      </p>

                      {/* Unlocked Perks List */}
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 relative z-10">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Perks & Unlocks:
                        </span>
                        <div className="space-y-1.5">
                          {badge.perks.map((perk, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              {isUnlocked ? (
                                <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                              )}
                              <span className={isUnlocked ? 'text-slate-200 font-medium' : 'text-slate-500 font-medium'}>
                                {perk}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-5 pt-3 relative z-10">
                        {isUnlocked ? (
                          <button
                            onClick={() => {
                              setUnlockedBadgeModal(badge);
                              confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
                            }}
                            className="w-full bg-slate-900 hover:bg-emerald-950/80 text-emerald-300 text-xs font-bold py-2.5 px-4 rounded-xl border border-emerald-700/50 flex items-center justify-center gap-2 transition-all shadow-md group/btn"
                          >
                            <Gift className="w-4 h-4 text-amber-300 group-hover/btn:scale-110 transition-transform" />
                            <span>View & Share Badge Showcase</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveTab('my-courses')}
                            className="w-full bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-medium py-2.5 px-4 rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-colors"
                          >
                            <span>Complete {percentRemaining}% more lessons to unlock</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: MCQ Knowledge Test (Assessment) */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-5 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>CERTIFICATION EVALUATION TEST</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1">
                    {selectedCourse.title} — Quiz Assessment
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Score at least 80% (4 out of 5) to unlock your official verified PBS Certificate of Achievement.
                  </p>
                </div>

                {quizSubmitted && (
                  <button
                    onClick={handleResetQuiz}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition-all flex-shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 text-emerald-400" />
                    <span>Retake Test</span>
                  </button>
                )}
              </div>

              {/* Quiz Questions List */}
              <div className="space-y-6">
                {currentQuestions.map((q, qIndex) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div 
                      key={q.id}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0">
                          {qIndex + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 pl-0 sm:pl-10">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let optBg = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optBg = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              optBg = 'bg-red-950/80 border-red-500/80 text-red-200';
                            }
                          } else if (isOptionSelected) {
                            optBg = 'bg-emerald-900/60 border-emerald-500 text-white font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border flex items-center gap-3 ${optBg}`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                                isOptionSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-600'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Question Explanation if submitted */}
                      {quizSubmitted && (
                        <div className="pl-0 sm:pl-10 pt-2">
                          <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800' : 'bg-amber-950/50 text-amber-200 border border-amber-800'}`}>
                            <span className="font-extrabold mr-1">Explanation:</span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz CTA */}
              {!quizSubmitted ? (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < currentQuestions.length}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>Submit Exam Answers</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 p-6 rounded-2xl border-2 border-emerald-500 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500 mb-1">
                    {quizPassed ? <Award className="w-9 h-9 text-amber-300" /> : <RotateCcw className="w-8 h-8 text-amber-400" />}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {quizPassed ? 'Congratulations! You Passed!' : 'Needs Improvement'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      You scored <span className="text-emerald-400 font-extrabold text-sm">{quizScore} out of {currentQuestions.length}</span> ({Math.round((quizScore/currentQuestions.length)*100)}%).
                    </p>
                  </div>

                  {quizPassed ? (
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('certificate')}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        <span>Claim Verified Certificate Now</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-300">
                      Please review the lesson videos and retake the test to qualify for certification.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: Downloadable Project Assets */}
          {activeTab === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">Downloadable Sample BIM Project Datasets</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Access real multi-discipline Revit central models (.rvt), Navisworks clash matrices (.nwd), and Dynamo scripting files (.dyn) used in PBS training.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'PBS_Chiller_Plant_Room_LOD400.rvt', size: '142 MB', type: 'Revit Central Model' },
                  { name: 'Al_ULA_Resort_HVAC_Clash_Matrix.nwd', size: '68 MB', type: 'Navisworks Clash File' },
                  { name: 'Automated_Sheet_Creation_Script.dyn', size: '2.4 MB', type: 'Dynamo Automation' },
                  { name: 'MEP_Standard_Pipe_Fittings_Pack.rfa', size: '18 MB', type: 'Revit Families Pack' },
                  { name: 'ISO_19650_BIM_Execution_Plan_Template.docx', size: '1.2 MB', type: 'BEP Documentation' },
                  { name: 'Civil3D_Road_Corridor_Surface.dwg', size: '35 MB', type: 'Civil 3D Drawing' },
                ].map((res, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-emerald-500/80 transition-colors">
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        {res.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {res.type} • {res.size}
                      </div>
                    </div>

                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent("Pragmatic BIM Solution Sample Exercise File: " + res.name)}`}
                      download={res.name}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: Certificate Preview & Print */}
          {activeTab === 'certificate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {is100PercentCompleted ? '100% Course Modules Verified' : 'Course Progress: ' + completionPercentage + '%'}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Official PBS Professional Certificate
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Generate and download an official vector PDF certificate with QR code validation upon achieving 100% course completion.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleDownloadPdfCertificate}
                      disabled={isGeneratingPdf}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-lg disabled:opacity-50"
                    >
                      {isGeneratingPdf ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Generating PDF...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Dynamic PDF</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handlePrintCertificate}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors border border-slate-700"
                      title="Print Certificate"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Student Name on Certificate
                    </label>
                    <input
                      type="text"
                      value={certStudentName}
                      onChange={(e) => setCertStudentName(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Selected BIM Program
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none"
                    >
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Certificate Canvas Container */}
              <div id="printable-certificate" className="bg-white text-slate-900 p-8 sm:p-14 rounded-3xl border-8 border-emerald-700 shadow-2xl relative overflow-hidden text-center space-y-6">
                
                {/* Decorative Certificate Frame Corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-emerald-600" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-emerald-600" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-emerald-600" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-emerald-600" />

                <div className="space-y-2">
                  <div className="text-emerald-800 text-sm font-black tracking-widest uppercase">
                    PRAGMATIC BIM SOLUTION
                  </div>
                  <div className="text-xs text-slate-500 italic font-serif">
                    "{COMPANY_INFO.slogan}"
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 pt-2 tracking-wide uppercase">
                    Certificate of Professional Achievement
                  </h1>
                </div>

                <div className="text-xs text-slate-600 uppercase tracking-widest font-bold">
                  This is proudly presented to
                </div>

                <div className="text-3xl sm:text-5xl font-black text-emerald-800 underline decoration-emerald-500 decoration-2 underline-offset-8">
                  {certStudentName || 'Pravin Yadav'}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  for successfully passing all module examinations, capstone project model evaluations, and clash matrix resolutions in
                </p>

                <div className="text-lg sm:text-2xl font-bold text-slate-900 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-200 inline-block">
                  {selectedCourse.title}
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-2xl mx-auto">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-xs">PRAGMATIC BIM SOLUTION</div>
                    <div className="text-[10px] text-slate-500">15 Years AEC Industry Experience</div>
                    <div className="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                      <QrCode className="w-3 h-3" />
                      <span>Verify ID: PBS-CERT-2026-9942</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="font-serif italic font-bold text-slate-800 text-base">Authorized BIM Director</div>
                    <div className="text-[10px] text-slate-500">Pragmatic BIM Solution, Pune</div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </div>

      </div>

      {/* Animated Milestone Badge Unlock Celebration Modal */}
      <AnimatePresence>
        {unlockedBadgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-slate-950 border-2 border-amber-400 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 relative overflow-hidden"
            >
              <button
                onClick={() => setUnlockedBadgeModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Ambient Halo Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>MILESTONE BADGE UNLOCKED!</span>
              </div>

              {/* Big Badge Icon */}
              <div className="relative my-4 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${unlockedBadgeModal.gradient} text-slate-950 border-2 border-white flex items-center justify-center shadow-2xl relative z-10 transform hover:scale-110 transition-transform`}>
                    <unlockedBadgeModal.icon className="w-12 h-12 text-slate-950" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {unlockedBadgeModal.title}
                </h3>
                <p className={`text-xs font-bold ${unlockedBadgeModal.textColor} mt-0.5`}>
                  {unlockedBadgeModal.subtitle}
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {unlockedBadgeModal.description}
                </p>
              </div>

              {/* Perks Box */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-left space-y-2">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                  🎉 Perks & Privileges Unlocked:
                </span>
                <div className="space-y-1.5">
                  {unlockedBadgeModal.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setUnlockedBadgeModal(null)}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-3.5 px-6 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Awesome! Continue Learning</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Account Selector Simulator Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-900 shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-white">Sign in with Google</h3>
              <p className="text-xs text-slate-400">
                Choose a Google account to synchronize your PBS student LMS progress & certificate profile.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  name: 'Pravin Yadav',
                  email: 'pravin.yadav.dar99@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                },
                {
                  name: 'Aniket Sharma',
                  email: 'aniket.bim.eng@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
                }
              ].map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoogleSelect(acc)}
                  className="w-full bg-slate-950 hover:bg-slate-800 p-3 rounded-2xl border border-slate-800 hover:border-emerald-500/80 flex items-center gap-3 transition-all text-left"
                >
                  <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-full object-cover border border-emerald-400" />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-white">{acc.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{acc.email}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-500">
              By connecting Google, you authorize PBS LMS to issue certificates to your account email.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
