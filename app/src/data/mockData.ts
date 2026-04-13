import type { User, Course, Lesson, Enrollment, Quiz, Certificate, ChatMessage, DashboardStats } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@zaya.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course. Build real-world projects and become a full-stack developer.',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Development',
    level: 'beginner',
    duration: '42 hours',
    lessonsCount: 156,
    studentsCount: 12543,
    rating: 4.8,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    title: 'Python for Data Science and Machine Learning',
    description: 'Master Python programming and learn data science, machine learning, and deep learning concepts. Work with pandas, numpy, matplotlib, scikit-learn, and TensorFlow.',
    price: 94.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Data Science',
    level: 'intermediate',
    duration: '38 hours',
    lessonsCount: 142,
    studentsCount: 8932,
    rating: 4.7,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Learn to design beautiful interfaces and user experiences. Master Figma, design principles, color theory, typography, and create stunning portfolio projects.',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Design',
    level: 'beginner',
    duration: '28 hours',
    lessonsCount: 98,
    studentsCount: 6543,
    rating: 4.9,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '4',
    title: 'React Native - Build Mobile Apps',
    description: 'Build native mobile apps for iOS and Android using React Native. Learn navigation, state management, API integration, and deploy to app stores.',
    price: 84.99,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Development',
    level: 'intermediate',
    duration: '32 hours',
    lessonsCount: 112,
    studentsCount: 4321,
    rating: 4.6,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '5',
    title: 'Digital Marketing Complete Course',
    description: 'Master SEO, social media marketing, email marketing, Google Ads, and analytics. Learn to create and execute successful digital marketing strategies.',
    price: 69.99,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Marketing',
    level: 'beginner',
    duration: '24 hours',
    lessonsCount: 86,
    studentsCount: 9876,
    rating: 4.5,
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '6',
    title: 'AWS Certified Solutions Architect',
    description: 'Prepare for the AWS Solutions Architect certification. Learn EC2, S3, RDS, Lambda, VPC, and more. Practice with hands-on labs and mock exams.',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    instructorId: '2',
    instructorName: 'Sarah Smith',
    category: 'Cloud Computing',
    level: 'advanced',
    duration: '45 hours',
    lessonsCount: 168,
    studentsCount: 3456,
    rating: 4.8,
    createdAt: new Date('2024-03-20'),
  },
];

// Mock Lessons
export const mockLessons: Lesson[] = [
  // Course 1: Web Development
  {
    id: 'l1',
    courseId: '1',
    title: 'Introduction to Web Development',
    description: 'Overview of web development, how the internet works, and setting up your development environment.',
    videoUrl: 'https://www.youtube.com/embed/ysEN5RaKOlA',
    duration: '15:30',
    order: 1,
  },
  {
    id: 'l2',
    courseId: '1',
    title: 'HTML5 Fundamentals',
    description: 'Learn the building blocks of web pages with HTML5 tags, elements, and document structure.',
    videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    duration: '22:45',
    order: 2,
  },
  {
    id: 'l3',
    courseId: '1',
    title: 'CSS3 Styling Basics',
    description: 'Style your web pages with CSS3 selectors, properties, colors, fonts, and the box model.',
    videoUrl: 'https://www.youtube.com/embed/1PnVor36_40',
    duration: '28:15',
    order: 3,
  },
  {
    id: 'l4',
    courseId: '1',
    title: 'JavaScript Basics',
    description: 'Introduction to JavaScript programming, variables, data types, and basic syntax.',
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    duration: '35:00',
    order: 4,
  },
  {
    id: 'l5',
    courseId: '1',
    title: 'React Fundamentals',
    description: 'Build modern UIs with React components, props, state, and hooks.',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    duration: '42:30',
    order: 5,
  },
  // Course 2: Python Data Science
  {
    id: 'l6',
    courseId: '2',
    title: 'Python Introduction',
    description: 'Getting started with Python programming language and environment setup.',
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    duration: '18:20',
    order: 1,
  },
  {
    id: 'l7',
    courseId: '2',
    title: 'NumPy for Numerical Computing',
    description: 'Learn NumPy arrays, operations, and mathematical functions for data processing.',
    videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI',
    duration: '25:45',
    order: 2,
  },
  {
    id: 'l8',
    courseId: '2',
    title: 'Pandas Data Analysis',
    description: 'Data manipulation and analysis with pandas DataFrames and Series.',
    videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
    duration: '32:10',
    order: 3,
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: 'e1',
    userId: '1',
    courseId: '1',
    enrolledAt: new Date('2024-04-01'),
    progress: 65,
    completedLessons: ['l1', 'l2', 'l3'],
  },
  {
    id: 'e2',
    userId: '1',
    courseId: '2',
    enrolledAt: new Date('2024-04-05'),
    progress: 30,
    completedLessons: ['l6'],
  },
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    courseId: '1',
    lessonId: 'l2',
    title: 'HTML Basics Quiz',
    questions: [
      {
        id: 'qq1',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages.',
      },
      {
        id: 'qq2',
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<h1>', '<head>', '<header>'],
        correctAnswer: 1,
        explanation: '<h1> is used for the main heading, and it is the largest by default.',
      },
      {
        id: 'qq3',
        question: 'Which attribute specifies an image source?',
        options: ['src', 'href', 'link', 'source'],
        correctAnswer: 0,
        explanation: 'The src attribute specifies the path to the image file.',
      },
      {
        id: 'qq4',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<lb>', '<br>', '<break>', '<ln>'],
        correctAnswer: 1,
        explanation: '<br> is the correct tag for a line break in HTML.',
      },
      {
        id: 'qq5',
        question: 'Which HTML element defines the title of a document?',
        options: ['<meta>', '<head>', '<title>', '<header>'],
        correctAnswer: 2,
        explanation: 'The <title> element defines the title that appears in the browser tab.',
      },
    ],
  },
  {
    id: 'q2',
    courseId: '1',
    lessonId: 'l3',
    title: 'CSS Fundamentals Quiz',
    questions: [
      {
        id: 'qq6',
        question: 'Which property changes the text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correctAnswer: 2,
        explanation: 'The color property is used to set the text color in CSS.',
      },
      {
        id: 'qq7',
        question: 'How do you select an element with id "demo"?',
        options: ['.demo', '#demo', 'demo', '*demo'],
        correctAnswer: 1,
        explanation: 'The # symbol is used to select elements by their ID in CSS.',
      },
      {
        id: 'qq8',
        question: 'Which property sets the background color?',
        options: ['bgcolor', 'background-color', 'color-background', 'bg-color'],
        correctAnswer: 1,
        explanation: 'background-color is the correct CSS property for setting background color.',
      },
    ],
  },
];

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: 'c1',
    userId: '1',
    courseId: '3',
    courseName: 'UI/UX Design Masterclass',
    userName: 'John Doe',
    issuedAt: new Date('2024-04-10'),
    certificateId: 'ZAYA-2024-001234',
  },
];

// Mock AI Tutor Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: 'Hello! I\'m your AI tutor. How can I help you with your learning today?',
    timestamp: new Date('2024-04-13T10:00:00'),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 15432,
  totalCourses: 48,
  totalEnrollments: 45678,
  totalRevenue: 2345678,
  recentEnrollments: mockEnrollments,
  popularCourses: mockCourses.slice(0, 3),
};

// Categories
export const courseCategories = [
  'All',
  'Development',
  'Data Science',
  'Design',
  'Marketing',
  'Cloud Computing',
  'Business',
  'Photography',
  'Music',
];

// Course Levels
export const courseLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
