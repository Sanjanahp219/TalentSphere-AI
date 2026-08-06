import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import {
  Sparkles,
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Bot,
  User,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import './navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // States: menuOpen for mobile overlay, isCollapsed for desktop collapsed width
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync main content padding offset when sidebar collapses/expands
  useEffect(() => {
    const mainEl = document.querySelector('.ts-main-content');
    if (mainEl) {
      if (isCollapsed) {
        mainEl.classList.add('ts-main-content-collapsed');
      } else {
        mainEl.classList.remove('ts-main-content-collapsed');
      }
    }
  }, [isCollapsed]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
            TalentSphere AI
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
        />
      )}

      {/* Vertical Sidebar */}
      <aside
        className={`ts-sidebar-container ${isCollapsed ? 'ts-sidebar-collapsed' : ''} ${
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header & Toggle Button INSIDE Side Menu */}
        <div
          className={`flex items-center pb-4 border-b border-slate-800 flex-shrink-0 ${
            isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between'
          }`}
        >
          <Link
            to="/dashboard"
            className="ts-sidebar-brand"
            onClick={() => setMenuOpen(false)}
            title={isCollapsed ? "TalentSphere AI" : ""}
          >
            <div className="ts-sidebar-brand-icon">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="ts-sidebar-brand-title block truncate">
                  TalentSphere AI
                </span>
                <span className="ts-sidebar-brand-subtitle block truncate">
                  Workforce Intelligence
                </span>
              </div>
            )}
          </Link>

          {/* Toggle Open/Close Button INSIDE the Side Menu */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMenuOpen(false);
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-800/80 flex-shrink-0"
            title={isCollapsed ? "Expand Side Menu" : "Collapse Side Menu"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 hidden lg:block" />
                <X className="w-4 h-4 lg:hidden" />
              </>
            )}
          </button>
        </div>

        {/* Navigation Links inside Side Menu (Scrollable) */}
        <nav className="ts-sidebar-nav mt-3 py-1 flex-1 overflow-y-auto min-h-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : ''}
                onClick={() => setMenuOpen(false)}
                className={`ts-sidebar-link ${isActive ? 'ts-sidebar-link-active' : ''} ${
                  isCollapsed ? 'ts-sidebar-link-collapsed' : ''
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer inside Side Menu (Pinned at bottom) */}
        <div className="ts-sidebar-footer flex-shrink-0">
          {user ? (
            <>
              <div className={`ts-sidebar-user ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="ts-sidebar-avatar flex-shrink-0" title={isCollapsed ? user.name || 'User' : ''}>
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                {!isCollapsed && (
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-semibold text-slate-200 truncate">{user.name || 'User'}</p>
                    <p className="text-xs text-slate-400 truncate capitalize">{user.role || 'Employee'}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                title={isCollapsed ? 'Sign Out' : ''}
                className={`ts-sidebar-logout-btn ${isCollapsed ? 'ts-sidebar-logout-btn-collapsed' : ''}`}
              >
                <LogOut className="w-4 h-4" />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              title={isCollapsed ? 'Sign In' : ''}
              className={`w-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs font-medium rounded-xl text-center hover:opacity-90 transition-opacity flex items-center justify-center ${
                isCollapsed ? 'w-10 h-10 mx-auto p-0' : 'py-2.5 px-4'
              }`}
            >
              {!isCollapsed ? 'Sign In' : <User className="w-4 h-4" />}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};



export default Navbar;


