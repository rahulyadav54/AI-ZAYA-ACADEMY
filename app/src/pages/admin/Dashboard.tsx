import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockUsers } from '@/data/mockData';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  UserPlus,
  GraduationCap,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 67000 },
];

const enrollmentData = [
  { month: 'Jan', enrollments: 1200 },
  { month: 'Feb', enrollments: 1500 },
  { month: 'Mar', enrollments: 1300 },
  { month: 'Apr', enrollments: 1800 },
  { month: 'May', enrollments: 1600 },
  { month: 'Jun', enrollments: 2100 },
];

const categoryData = [
  { name: 'Development', value: 35 },
  { name: 'Design', value: 25 },
  { name: 'Business', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#6b7280'];

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '15,432',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Courses',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-violet-500',
    },
    {
      title: 'Total Revenue',
      value: '$234,567',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Enrollments',
      value: '8,549',
      change: '-2.4%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentUsers = mockUsers.slice(0, 5);
  const popularCourses = mockCourses.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600">Overview of your platform's performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button>
              <GraduationCap className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>
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
                      <div className={`flex items-center gap-1 mt-2 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span>{stat.change} from last month</span>
                      </div>
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
              <CardTitle className="text-lg">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrollments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((cat, index) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600">{cat.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Users</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-700'
                          : user.role === 'instructor'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Popular Courses</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Instructor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Students</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {popularCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-10 w-16 rounded object-cover"
                          />
                          <span className="font-medium text-gray-900 line-clamp-1">{course.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{course.instructorName}</td>
                      <td className="py-3 px-4 text-gray-600">{course.studentsCount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-900">{course.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        ${(course.studentsCount * course.price).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
