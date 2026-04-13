import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Award,
  Play,
} from 'lucide-react';

const weeklyProgress = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 2.0 },
];

const monthlyProgress = [
  { month: 'Jan', courses: 1 },
  { month: 'Feb', courses: 2 },
  { month: 'Mar', courses: 1 },
  { month: 'Apr', courses: 3 },
];

export function Progress() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((e) => ({
      ...e,
      course: mockCourses.find((c) => c.id === e.courseId),
    }));

  const totalLessons = enrolledCourses.reduce(
    (acc, curr) => acc + (curr.course?.lessonsCount || 0),
    0
  );
  const completedLessons = enrolledCourses.reduce(
    (acc, curr) => acc + curr.completedLessons.length,
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lessons Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedLessons}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">24.5</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">7 days</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Learning Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Courses Completed per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="courses"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {enrolledCourses.length > 0 ? (
              <div className="space-y-6">
                {enrolledCourses.map((enrollment) => (
                  <div key={enrollment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={enrollment.course?.thumbnail}
                          alt={enrollment.course?.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{enrollment.course?.title}</p>
                          <p className="text-sm text-gray-500">
                            {enrollment.completedLessons.length} of {enrollment.course?.lessonsCount} lessons
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-violet-600">{enrollment.progress}%</span>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/student/courses/${enrollment.courseId}/learn`)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </Button>
                      </div>
                    </div>
                    <ProgressBar value={enrollment.progress} className="h-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">No enrolled courses yet</p>
                <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Award, label: 'First Course', desc: 'Completed 1 course', color: 'bg-yellow-100 text-yellow-600', earned: true },
                { icon: Target, label: 'Week Streak', desc: '7 days in a row', color: 'bg-orange-100 text-orange-600', earned: true },
                { icon: BookOpen, label: 'Knowledge Seeker', desc: '10 lessons completed', color: 'bg-blue-100 text-blue-600', earned: true },
                { icon: Clock, label: 'Time Master', desc: '24 hours learned', color: 'bg-green-100 text-green-600', earned: true },
              ].map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl text-center ${achievement.earned ? 'bg-gray-50' : 'bg-gray-100 opacity-50'}`}
                >
                  <div className={`h-12 w-12 mx-auto rounded-full ${achievement.color} flex items-center justify-center mb-3`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-gray-900">{achievement.label}</p>
                  <p className="text-xs text-gray-500">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
