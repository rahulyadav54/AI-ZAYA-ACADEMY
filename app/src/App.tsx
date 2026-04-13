import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Courses } from '@/pages/Courses';
import { CourseDetails } from '@/pages/CourseDetails';

// Student Pages
import { StudentDashboard } from '@/pages/student/Dashboard';
import { MyCourses } from '@/pages/student/MyCourses';
import { AITutor } from '@/pages/student/AITutor';
import { Certificates } from '@/pages/student/Certificates';
import { Progress } from '@/pages/student/Progress';
import { CourseLearning } from '@/pages/student/CourseLearning';

// Instructor Pages
import { InstructorDashboard } from '@/pages/instructor/Dashboard';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/Dashboard';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'instructor') {
      return <Navigate to="/instructor/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

// Public Route - redirects to dashboard if already logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'instructor') {
      return <Navigate to="/instructor/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      
      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <MyCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses/:id/learn"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <CourseLearning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/progress"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Progress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/certificates"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Certificates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/ai-tutor"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <AITutor />
          </ProtectedRoute>
        }
      />

      {/* Instructor Routes */}
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['instructor']}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
