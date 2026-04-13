import { useState, useEffect, useCallback } from 'react';
import type { Course, Enrollment, Lesson, Quiz, Certificate } from '@/types';
import { mockCourses, mockEnrollments, mockLessons, mockQuizzes, mockCertificates } from '@/data/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      await delay(500);
      setCourses(mockCourses);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const getCourseById = useCallback((id: string) => {
    return courses.find(c => c.id === id);
  }, [courses]);

  const searchCourses = useCallback((query: string, category?: string, level?: string) => {
    return courses.filter(course => {
      const matchesQuery = !query || 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || category === 'All' || course.category === category;
      const matchesLevel = !level || level === 'All Levels' || course.level === level.toLowerCase();
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [courses]);

  return { courses, loading, getCourseById, searchCourses };
}

export function useEnrollments(userId?: string) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      await delay(400);
      if (userId) {
        setEnrollments(mockEnrollments.filter(e => e.userId === userId));
      } else {
        setEnrollments(mockEnrollments);
      }
      setLoading(false);
    };
    fetchEnrollments();
  }, [userId]);

  const enrollInCourse = useCallback(async (userId: string, courseId: string) => {
    await delay(600);
    const newEnrollment: Enrollment = {
      id: `e${Date.now()}`,
      userId,
      courseId,
      enrolledAt: new Date(),
      progress: 0,
      completedLessons: [],
    };
    setEnrollments(prev => [...prev, newEnrollment]);
    return newEnrollment;
  }, []);

  const updateProgress = useCallback(async (enrollmentId: string, lessonId: string) => {
    await delay(300);
    setEnrollments(prev => prev.map(enrollment => {
      if (enrollment.id === enrollmentId) {
        const completedLessons = [...enrollment.completedLessons, lessonId];
        const course = mockCourses.find(c => c.id === enrollment.courseId);
        const totalLessons = course?.lessonsCount || 1;
        const progress = Math.round((completedLessons.length / totalLessons) * 100);
        return { ...enrollment, completedLessons, progress };
      }
      return enrollment;
    }));
  }, []);

  const isEnrolled = useCallback((courseId: string) => {
    return enrollments.some(e => e.courseId === courseId);
  }, [enrollments]);

  return { enrollments, loading, enrollInCourse, updateProgress, isEnrolled };
}

export function useLessons(courseId?: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      await delay(400);
      if (courseId) {
        setLessons(mockLessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order));
      } else {
        setLessons(mockLessons);
      }
      setLoading(false);
    };
    fetchLessons();
  }, [courseId]);

  const getLessonById = useCallback((id: string) => {
    return lessons.find(l => l.id === id);
  }, [lessons]);

  return { lessons, loading, getLessonById };
}

export function useQuizzes(courseId?: string) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      await delay(400);
      if (courseId) {
        setQuizzes(mockQuizzes.filter(q => q.courseId === courseId));
      } else {
        setQuizzes(mockQuizzes);
      }
      setLoading(false);
    };
    fetchQuizzes();
  }, [courseId]);

  const getQuizById = useCallback((id: string) => {
    return quizzes.find(q => q.id === id);
  }, [quizzes]);

  const submitQuiz = useCallback(async (quizId: string, answers: number[]) => {
    await delay(500);
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return null;

    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (q.correctAnswer === answers[idx]) correct++;
    });

    return {
      score: correct,
      totalQuestions: quiz.questions.length,
      passed: correct >= quiz.questions.length * 0.7,
      percentage: Math.round((correct / quiz.questions.length) * 100),
    };
  }, [quizzes]);

  return { quizzes, loading, getQuizById, submitQuiz };
}

export function useCertificates(userId?: string) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      await delay(400);
      if (userId) {
        setCertificates(mockCertificates.filter(c => c.userId === userId));
      } else {
        setCertificates(mockCertificates);
      }
      setLoading(false);
    };
    fetchCertificates();
  }, [userId]);

  const generateCertificate = useCallback(async (userId: string, courseId: string, courseName: string, userName: string) => {
    await delay(600);
    const newCertificate: Certificate = {
      id: `cert${Date.now()}`,
      userId,
      courseId,
      courseName,
      userName,
      issuedAt: new Date(),
      certificateId: `ZAYA-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };
    setCertificates(prev => [...prev, newCertificate]);
    return newCertificate;
  }, []);

  return { certificates, loading, generateCertificate };
}
