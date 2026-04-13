import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  FileText,
  PlusCircle,
  Menu,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { label: 'Users', href: '/admin/users', icon: Users },
          { label: 'Courses', href: '/admin/courses', icon: BookOpen },
          { label: 'Reports', href: '/admin/reports', icon: FileText },
          { label: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      case 'instructor':
        return [
          { label: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard },
          { label: 'My Courses', href: '/instructor/courses', icon: BookOpen },
          { label: 'Create Course', href: '/instructor/create', icon: PlusCircle },
          { label: 'Students', href: '/instructor/students', icon: Users },
          { label: 'Analytics', href: '/instructor/analytics', icon: BarChart3 },
          { label: 'Settings', href: '/instructor/settings', icon: Settings },
        ];
      default:
        return [
          { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
          { label: 'My Courses', href: '/student/courses', icon: BookOpen },
          { label: 'Progress', href: '/student/progress', icon: BarChart3 },
          { label: 'Certificates', href: '/student/certificates', icon: Trophy },
          { label: 'AI Tutor', href: '/student/ai-tutor', icon: MessageSquare },
          { label: 'Settings', href: '/student/settings', icon: Settings },
        ];
    }
  };

  const sidebarItems = getSidebarItems();
  const dashboardTitle = user?.role === 'admin' ? 'Admin Dashboard' : user?.role === 'instructor' ? 'Instructor Dashboard' : 'Student Dashboard';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex-shrink-0">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">AI ZAYA</span>
            <span className="text-xs text-gray-500 capitalize">{user?.role} Panel</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-violet-700' : 'text-gray-500'}`} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-4 border-t space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
          title={sidebarCollapsed ? 'Back to Home' : undefined}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
          {!sidebarCollapsed && <span>Back to Home</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          title={sidebarCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <span className="font-bold text-lg">AI ZAYA</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 z-50 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <SidebarContent />
          {/* Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-20 bg-white border rounded-full p-1 shadow-sm hover:shadow-md transition-shadow"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{dashboardTitle}</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-10 w-10 rounded-full border-2 border-violet-200"
              />
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
