// User Types
export type UserRole = 'student' | 'instructor' | 'admin';
export type { UserRole as default };

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  createdAt: Date;
}

// Lesson Types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  isCompleted?: boolean;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completedLessons: string[];
}

// Quiz Types
export interface Quiz {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  attemptedAt: Date;
  answers: number[];
}

// Certificate Types
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  userName: string;
  issuedAt: Date;
  certificateId: string;
}

// AI Tutor Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  recentEnrollments: Enrollment[];
  popularCourses: Course[];
}

export interface StudentProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: Date;
}
