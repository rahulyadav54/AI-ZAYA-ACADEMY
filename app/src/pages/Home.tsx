import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { mockCourses } from '@/data/mockData';
import {
  GraduationCap,
  Brain,
  Trophy,
  Users,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  BarChart3,
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const featuredCourses = mockCourses.slice(0, 3);

  const stats = [
    { label: 'Active Students', value: '50K+', icon: Users },
    { label: 'Expert Instructors', value: '200+', icon: GraduationCap },
    { label: 'Quality Courses', value: '1,000+', icon: BookOpen },
    { label: 'Success Rate', value: '95%', icon: Trophy },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized learning paths and 24/7 AI tutoring assistance tailored to your pace and style.',
    },
    {
      icon: Play,
      title: 'Interactive Video Lessons',
      description: 'Learn with high-quality video content, interactive exercises, and hands-on projects.',
    },
    {
      icon: Trophy,
      title: 'Earn Certificates',
      description: 'Receive industry-recognized certificates upon course completion to boost your career.',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and progress tracking.',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with fellow learners, join study groups, and collaborate on projects.',
    },
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'Discover new courses based on your interests, goals, and learning history.',
    },
  ];

  const testimonials = [
    {
      name: 'Emily Johnson',
      role: 'Software Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      content: 'AI ZAYA transformed my career. The AI tutor helped me understand complex programming concepts that I struggled with for months.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      content: 'The personalized learning experience is incredible. I completed the Data Science course and landed my dream job within weeks!',
      rating: 5,
    },
    {
      name: 'Sarah Williams',
      role: 'UX Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahw',
      content: 'Best online learning platform I\'ve ever used. The courses are comprehensive and the AI tutor is always there to help.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Learning Platform</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Master New Skills with{' '}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>{' '}
                Learning
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Access world-class courses, get personalized AI tutoring, and earn 
                recognized certificates. Start your learning journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/courses')}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-2"
                >
                  Get Started Free
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 50,000+ learners</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students learning"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Course Completed!</p>
                  <p className="text-xs text-gray-500">Web Development Bootcamp</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-900">AI Tutor Active</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-xl bg-violet-600/20 flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-violet-400" />
                  </div>
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI ZAYA?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the future of learning with our cutting-edge features designed 
              to help you succeed in your educational journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-colors group"
              >
                <div className="h-14 w-14 rounded-xl bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="h-7 w-7 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Courses
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Explore our most popular courses taught by industry experts and start learning today.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/courses')}
              className="mt-4 md:mt-0"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Start your learning journey in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', description: 'Create your free account and set your learning goals', icon: Users },
              { step: '02', title: 'Choose Course', description: 'Browse and select from our wide range of courses', icon: BookOpen },
              { step: '03', title: 'Learn & Practice', description: 'Watch videos, take quizzes, and practice with AI tutor', icon: Play },
              { step: '04', title: 'Get Certified', description: 'Complete the course and earn your certificate', icon: Trophy },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full">
                    <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied learners who have transformed their careers with AI ZAYA
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join AI ZAYA today and get access to world-class courses, AI tutoring, 
              and a community of learners. Your future starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/courses')}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
