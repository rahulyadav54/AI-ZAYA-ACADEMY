import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses } from '@/data/mockData';
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
  Users,
  BookOpen,
  DollarSign,
  Star,
  PlusCircle,
  Edit,
  Eye,
} from 'lucide-react';

const monthlyEarnings = [
  { month: 'Jan', earnings: 2500 },
  { month: 'Feb', earnings: 3200 },
  { month: 'Mar', earnings: 2800 },
  { month: 'Apr', earnings: 4100 },
  { month: 'May', earnings: 3800 },
  { month: 'Jun', earnings: 5200 },
];

const studentGrowth = [
  { month: 'Jan', students: 450 },
  { month: 'Feb', students: 580 },
  { month: 'Mar', students: 620 },
  { month: 'Apr', students: 750 },
  { month: 'May', students: 890 },
  { month: 'Jun', students: 1100 },
];

export function InstructorDashboard() {
  const navigate = useNavigate();

  // Mock instructor courses
  const myCourses = mockCourses.slice(0, 4);
  const totalStudents = myCourses.reduce((acc, c) => acc + c.studentsCount, 0);
  const totalEarnings = myCourses.reduce((acc, c) => acc + c.studentsCount * c.price * 0.7, 0);
  const avgRating = myCourses.reduce((acc, c) => acc + c.rating, 0) / myCourses.length;

  const stats = [
    {
      title: 'My Courses',
      value: myCourses.length.toString(),
      icon: BookOpen,
      color: 'bg-violet-500',
    },
    {
      title: 'Total Students',
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Avg. Rating',
      value: avgRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h2>
            <p className="text-gray-600">Manage your courses and track your impact</p>
          </div>
          <Button onClick={() => navigate('/instructor/create')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </div>

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

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="earnings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">My Courses</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/instructor/courses')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {myCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group">
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{course.category}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentsCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{course.price}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <img
                  src={myCourses[0]?.thumbnail}
                  alt={myCourses[0]?.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{myCourses[0]?.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{myCourses[0]?.studentsCount.toLocaleString()} students enrolled</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-violet-600">{myCourses[0]?.rating}</p>
                    <p className="text-gray-500">Rating</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ${(myCourses[0]?.studentsCount * myCourses[0]?.price).toLocaleString()}
                    </p>
                    <p className="text-gray-500">Revenue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    student: 'Alice Johnson',
                    course: 'Complete Web Development Bootcamp',
                    rating: 5,
                    comment: 'Excellent course! Learned so much.',
                    date: '2 days ago',
                  },
                  {
                    student: 'Bob Smith',
                    course: 'Python for Data Science',
                    rating: 5,
                    comment: 'Very comprehensive and well-structured.',
                    date: '5 days ago',
                  },
                  {
                    student: 'Carol White',
                    course: 'UI/UX Design Masterclass',
                    rating: 4,
                    comment: 'Great content, would love more projects.',
                    date: '1 week ago',
                  },
                ].map((review, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.student}`}
                      alt={review.student}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{review.student}</p>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-violet-600 mb-1">{review.course}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
