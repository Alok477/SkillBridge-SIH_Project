import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, LogOut, ChevronRight, User, Settings,
  LayoutDashboard, BookOpen, UserCheck, Compass, Briefcase, 
  FileText, Award, Calendar, BarChart2, Users, GitFork, 
  Share2, HelpCircle
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Logo } from '../components/ui/Logo';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Define sidebar items based on current active role
  const getSidebarItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Portfolio', path: '/student/portfolio', icon: Award },
          { label: 'Skill Assessment', path: '/student/assessment', icon: BookOpen },
          { label: 'Skill Profile', path: '/student/skills', icon: UserCheck },
          { label: 'Career Path', path: '/student/career', icon: Compass },
          { label: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
          { label: 'Applications', path: '/student/applications', icon: FileText }
        ];
      case 'industry':
        return [
          { label: 'Overview', path: '/industry/dashboard', icon: LayoutDashboard },
          { label: 'Post Opportunity', path: '/industry/opportunities/create', icon: Briefcase },
          { label: 'Candidate Matching', path: '/industry/candidates', icon: UserCheck },
          { label: 'Learning Programs', path: '/industry/programs', icon: Calendar }
        ];
      case 'institution':
        return [
          { label: 'Overview', path: '/institution/dashboard', icon: BarChart2 },
          { label: 'Student Management', path: '/institution/students', icon: Users }
        ];
      case 'academician':
        return [
          { label: 'Overview', path: '/academician/dashboard', icon: LayoutDashboard }
        ];
      default:
        return [];
    }
  };

  const menuItems = getSidebarItems();

  return (
    <div className="min-h-screen flex bg-background text-zinc-100">
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0d0d0f] border-r border-zinc-800/80 flex flex-col justify-between transform transition-transform duration-300 lg:transform-none lg:static lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col flex-grow">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/60">
            <Link to={user?.role === 'student' ? '/student/portfolio' : (user ? `/${user.role}/dashboard` : '/')} className="flex items-center gap-2" aria-label="Go to dashboard">
              <Logo />
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-brand/10 text-white border-l-2 border-brand font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand' : 'text-zinc-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Sidebar Footer / User Quick Profile */}
        <div className="p-4 border-t border-zinc-800/60 bg-[#0a0a0b]/40">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar name={user?.name || 'Academic Portal'} sizeClass="w-8 h-8 text-[11px]" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Academic Portal'}</p>
              <p className="text-xs text-zinc-500 truncate capitalize">{user?.role} Portal</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-zinc-500 hover:text-accent-red p-1.5 rounded-md hover:bg-zinc-800/30 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header bar */}
        <header className="h-16 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800/30 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs text-zinc-500 capitalize tracking-wider font-semibold bg-zinc-800/50 px-2.5 py-1 rounded-md">
              {user?.role} Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile actions drop */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-800/30 transition-all border border-transparent hover:border-zinc-800/60"
              >
                <Avatar name={user?.name} sizeClass="w-8 h-8 text-[11px]" />
                <span className="text-xs font-medium text-zinc-300 hidden sm:inline max-w-[100px] truncate">{user?.name}</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-48 bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1 z-30 animate-[slideIn_0.15s_ease-out_forwards]">
                  <Link 
                    to={user?.role === 'student' ? '/student/portfolio' : `/${user?.role}/dashboard`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/30 transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { setProfileDropdownOpen(false); handleLogout(); }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-accent-red hover:bg-red-500/10 transition-colors border-t border-zinc-800/50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main contents pane */}
        <main ref={contentRef} className="flex-grow overflow-y-auto px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8 fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
