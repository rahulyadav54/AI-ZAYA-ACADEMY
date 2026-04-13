import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { mockCourses, mockEnrollments, mockCertificates } from '@/data/mockData';
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Play,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get enrolled courses
  const enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((e) => ({
      ...e,
      course: mockCourses.find((c) => c.id === e.courseId),
    }));

  const certificates = mockCertificates.filter((c) => c.userId === user?.id);

  const stats = [
    {
      title: 'Courses Enrolled',
      value: enrolledCourses.length.toString(),
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Certificates',
      value: certificates.length.toString(),
      icon: Trophy,
      color: 'bg-yellow-500',
    },
    {
      title: 'Hours Learned',
      value: '24',
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      title: 'Avg. Progress',
      value: '65%',
      icon: TrendingUp,
      color: 'bg-violet-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-violet-100">
                You're making great progress. Keep up the momentum!
              </p>
            </div>
            <Button
              onClick={() => navigate('/student/ai-tutor')}
              variant="secondary"
              className="bg-white text-violet-600 hover:bg-violet-50"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Continue Learning</h3>
            <Button variant="ghost" onClick={() => navigate('/student/courses')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {enrolledCourses.slice(0, 2).map((enrollment) => (
                <Card key={enrollment.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={enrollment.course?.thumbnail}
                        alt={enrollment.course?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                        {enrollment.course?.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {enrollment.course?.instructorName}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{enrollment.progress}% complete</span>
                          <span className="text-gray-500">
                            {enrollment.completedLessons.length} / {enrollment.course?.lessonsCount} lessons
                          </span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => navigate(`/student/courses/${enrollment.courseId}/learn`)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h4>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            </Card>
          )}
        </motion.div>

        {/* Recent Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Certificates</h3>
            <Button variant="ghost" onClick={() => navigate('/student/certificates')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {certificates.map((cert) => (
                <Card key={cert.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{cert.courseName}</p>
                        <p className="text-sm text-gray-500">{cert.certificateId}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No certificates yet</h4>
              <p className="text-gray-600">Complete a course to earn your first certificate</p>
            </Card>
          )}
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recommended for You</h3>
            <Button variant="ghost" onClick={() => navigate('/courses')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {mockCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className="overflow-hidden group cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{course.instructorName}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-violet-600">${course.price}</span>
                    <span className="text-sm text-gray-500">{course.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
