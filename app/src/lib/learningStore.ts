import type { Course, User } from '@/types';

const PROGRESS_KEY = 'zaya_learning_progress';
const CERT_KEY = 'zaya_certificates';

type StoredProgress = {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  quizPassed: boolean;
};

type StoredCertificate = {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  userName: string;
  issuedAt: string;
  certificateId: string;
};

function readJson<T>(key: string): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJson<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCourseProgress(userId: string, courseId: string): StoredProgress {
  const rows = readJson<StoredProgress>(PROGRESS_KEY);
  return (
    rows.find((row) => row.userId === userId && row.courseId === courseId) ?? {
      userId,
      courseId,
      completedLessonIds: [],
      quizPassed: false,
    }
  );
}

export function saveCourseProgress(progress: StoredProgress) {
  const rows = readJson<StoredProgress>(PROGRESS_KEY);
  const idx = rows.findIndex((row) => row.userId === progress.userId && row.courseId === progress.courseId);
  if (idx === -1) {
    rows.push(progress);
  } else {
    rows[idx] = progress;
  }
  writeJson(PROGRESS_KEY, rows);
}

export function getCertificates(userId: string): StoredCertificate[] {
  return readJson<StoredCertificate>(CERT_KEY).filter((c) => c.userId === userId);
}

export function hasCertificate(userId: string, courseId: string): boolean {
  return getCertificates(userId).some((c) => c.courseId === courseId);
}

export function issueCertificate(user: User, course: Course): StoredCertificate {
  const rows = readJson<StoredCertificate>(CERT_KEY);
  const existing = rows.find((row) => row.userId === user.id && row.courseId === course.id);
  if (existing) return existing;

  const cert: StoredCertificate = {
    id: `cert-${Date.now()}`,
    userId: user.id,
    courseId: course.id,
    courseName: course.title,
    userName: user.name,
    issuedAt: new Date().toISOString(),
    certificateId: `ZAYA-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };
  rows.push(cert);
  writeJson(CERT_KEY, rows);
  return cert;
}
