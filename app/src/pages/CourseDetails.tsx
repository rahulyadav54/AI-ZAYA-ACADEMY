import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { mockCourses, mockLessons, mockQuizzes } from '@/data/mockData';
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  Award,
  Globe,
  Smartphone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';

export function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);

  const course = mockCourses.find((c) => c.id === id);
  const lessons = mockLessons.filter((l) => l.courseId === id);
  const quizzes = mockQuizzes.filter((q) => q.courseId === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsEnrolling(true);
    // Simulate enrollment
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsEnrolling(false);
    navigate(`/student/courses/${course.id}/learn`);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Course Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-violet-600">{course.category}</Badge>
                  <Badge className={levelColors[course.level]}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </Badge>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-300 text-lg mb-6">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-400">({course.studentsCount.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Last updated {new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructorId}`}
                    alt={course.instructorName}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{course.instructorName}</p>
                    <p className="text-sm text-gray-400">Course Instructor</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="h-6 w-6 text-violet-600 ml-1" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">${course.price}</span>
                </div>

                <Button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  30-day money-back guarantee
                </p>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">This course includes:</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Play className="h-4 w-4" />
                    <span>{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Smartphone className="h-4 w-4" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-semibold text-gray-900">Course Content</h3>
                      <p className="text-gray-600 mt-1">
                        {course.lessonsCount} lessons • {course.duration} total length
                      </p>
                    </div>

                    <div className="divide-y">
                      {/* Module 1 */}
                      <div>
                        <button
                          onClick={() => toggleModule('module-1')}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedModules.includes('module-1') ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                            <span className="font-medium text-gray-900">Module 1: Getting Started</span>
                          </div>
                          <span className="text-sm text-gray-500">{lessons.length} lessons</span>
                        </button>
                        {expandedModules.includes('module-1') && (
                          <div className="divide-y">
                            {lessons.map((lesson, index) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-4 pl-12 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <Play className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-700">{index + 1}. {lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Module 2 */}
                      <div>
                        <button
                          onClick={() => toggleModule('module-2')}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedModules.includes('module-2') ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                            <span className="font-medium text-gray-900">Module 2: Practice & Assessment</span>
                          </div>
                          <span className="text-sm text-gray-500">{quizzes.length} quizzes</span>
                        </button>
                        {expandedModules.includes('module-2') && (
                          <div className="divide-y">
                            {quizzes.map((quiz, index) => (
                              <div
                                key={quiz.id}
                                className="flex items-center justify-between p-4 pl-12 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-700">Quiz {index + 1}: {quiz.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{quiz.questions.length} questions</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="overview" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Master the fundamentals and advanced concepts',
                        'Build real-world projects for your portfolio',
                        'Learn industry best practices',
                        'Get hands-on experience with practical exercises',
                        'Prepare for professional certifications',
                        'Access to exclusive learning resources',
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>No prior experience needed - we'll teach you everything</li>
                      <li>A computer with internet access</li>
                      <li>Willingness to learn and practice</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{course.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructorId}`}
                        alt={course.instructorName}
                        className="h-20 w-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.instructorName}</h3>
                        <p className="text-violet-600 mb-2">Senior Instructor</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentsCount.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Play className="h-4 w-4" />
                            <span>12 courses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>4.8 rating</span>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Experienced instructor with over 10 years of industry experience. 
                          Passionate about teaching and helping students achieve their goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <span className="text-5xl font-bold text-gray-900">{course.rating}</span>
                        <div className="flex items-center gap-1 justify-center mt-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i <= Math.round(course.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Course Rating</p>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 w-3">{rating}</span>
                            <Star className="h-3 w-3 text-gray-400" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-8">
                              {rating === 5 ? '70%' : rating === 4 ? '20%' : '10%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-6">
                      {[
                        {
                          name: 'Alex Johnson',
                          rating: 5,
                          date: '2 weeks ago',
                          comment: 'Excellent course! The instructor explains everything clearly and the projects are very practical.',
                        },
                        {
                          name: 'Maria Garcia',
                          rating: 5,
                          date: '1 month ago',
                          comment: 'Best investment I made for my career. Highly recommended!',
                        },
                        {
                          name: 'David Kim',
                          rating: 4,
                          date: '2 months ago',
                          comment: 'Great content, well structured. Would love more advanced topics.',
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
                              alt={review.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
