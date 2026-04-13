import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import {
  Search,
  Play,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
} from 'lucide-react';

export function MyCourses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  // Get enrolled courses with details
  const enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((e) => ({
      ...e,
      course: mockCourses.find((c) => c.id === e.courseId),
    }))
    .filter((item) => {
      if (!searchQuery) return true;
      return (
        item.course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course?.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'completed') return item.progress === 100;
      if (filter === 'in-progress') return item.progress < 100;
      return true;
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
          <Button onClick={() => navigate('/courses')}>
            Browse More Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'in-progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map((enrollment, index) => (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group">
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="sm:w-2/5 relative">
                      <img
                        src={enrollment.course?.thumbnail}
                        alt={enrollment.course?.title}
                        className="w-full h-48 sm:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
                        {enrollment.course?.category}
                      </Badge>
                      {enrollment.progress === 100 && (
                        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                        {enrollment.course?.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {enrollment.course?.instructorName}
                      </p>

                      {/* Progress */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {enrollment.progress === 100 ? 'Completed' : 'In Progress'}
                          </span>
                          <span className="font-medium text-violet-600">
                            {enrollment.progress}%
                          </span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                        <p className="text-xs text-gray-500">
                          {enrollment.completedLessons.length} of {enrollment.course?.lessonsCount} lessons completed
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{enrollment.course?.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{enrollment.course?.lessonsCount} lessons</span>
                        </div>
                      </div>

                      {/* Action */}
                      <Button
                        className="w-full"
                        onClick={() => navigate(`/student/courses/${enrollment.courseId}/learn`)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {enrollment.progress === 0
                          ? 'Start Course'
                          : enrollment.progress === 100
                          ? 'Review Course'
                          : 'Continue Learning'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No courses found' : 'No enrolled courses'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Start your learning journey by enrolling in a course'}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
