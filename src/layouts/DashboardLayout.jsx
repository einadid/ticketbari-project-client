import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaTimes,
  FaBus,
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaList,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaBullhorn,
  FaHome,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useTheme } from '../contexts/ThemeProvider';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logOut } = useAuth();
  const [role] = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch {
      toast.error('Logout failed!');
    }
  };

  // ================= MENU CONFIG =================
  const menuItems = {
    user: [
      { path: '/dashboard/profile', icon: FaUser, label: 'My Profile' },
      { path: '/dashboard/my-booked-tickets', icon: FaTicketAlt, label: 'My Booked Tickets' },
      { path: '/dashboard/transaction-history', icon: FaHistory, label: 'Transaction History' }
    ],
    vendor: [
      { path: '/dashboard/vendor-profile', icon: FaUser, label: 'Vendor Profile' },
      { path: '/dashboard/add-ticket', icon: FaPlus, label: 'Add Ticket' },
      { path: '/dashboard/my-added-tickets', icon: FaList, label: 'My Added Tickets' },
      { path: '/dashboard/requested-bookings', icon: FaClipboardList, label: 'Requested Bookings' },
      { path: '/dashboard/revenue-overview', icon: FaChartBar, label: 'Revenue Overview' }
    ],
    admin: [
      { path: '/dashboard/admin-profile', icon: FaUser, label: 'Admin Profile' },
      { path: '/dashboard/manage-tickets', icon: FaTicketAlt, label: 'Manage Tickets' },
      { path: '/dashboard/manage-users', icon: FaUsers, label: 'Manage Users' },
      { path: '/dashboard/advertise-tickets', icon: FaBullhorn, label: 'Advertise Tickets' }
    ]
  };

  const currentMenu = menuItems[role] || menuItems.user;

  // Nav Item Component
  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${isActive
          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
        }`
      }
    >
      <item.icon className={`text-lg flex-shrink-0 ${isSidebarCollapsed ? 'mx-auto' : ''}`} />
      {!isSidebarCollapsed && (
        <span className="font-medium truncate">{item.label}</span>
      )}
    </NavLink>
  );

  // Mobile Nav Item
  const MobileNavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${isActive
          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
        }`
      }
    >
      <item.icon className="text-lg" />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

      {/* ================= MOBILE HEADER/NAVBAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <FaBus className="text-white text-sm" />
            </div>
            <span className="font-bold text-lg text-slate-800 dark:text-white">
              Ticket<span className="text-primary-600">Bari</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <FaSun className="text-amber-500" /> : <FaMoon />}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR/MENU ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Mobile Menu Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-slate-800 z-50 shadow-2xl overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                    <FaBus className="text-white text-sm" />
                  </div>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">
                    Ticket<span className="text-primary-600">Bari</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <FaTimes className="text-slate-500" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-slate-700 dark:to-slate-700">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-primary-500 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-white truncate">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user?.email}
                    </p>
                    <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 bg-primary-600 text-white rounded-full capitalize">
                      {role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Main</p>
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  >
                    <FaHome className="text-lg" />
                    <span className="font-medium">Home</span>
                  </Link>
                  <Link
                    to="/all-tickets"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  >
                    <FaTicketAlt className="text-lg" />
                    <span className="font-medium">All Tickets</span>
                  </Link>
                </div>
              </div>

              {/* Dashboard Menu */}
              <div className="p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FaTachometerAlt className="text-primary-500" />
                  Dashboard
                </p>
                <nav className="space-y-1">
                  {currentMenu.map(item => (
                    <MobileNavItem key={item.path} item={item} />
                  ))}
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside 
        className={`hidden lg:fixed lg:flex lg:flex-col h-full bg-white dark:bg-slate-800 
        border-r border-slate-200 dark:border-slate-700 shadow-xl z-40 transition-all duration-300
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <FaBus className="text-white text-lg" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-xl text-slate-800 dark:text-white">
                Ticket<span className="text-primary-600">Bari</span>
              </span>
            )}
          </Link>
          
          {/* Collapse Toggle */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* User Info */}
        <div className={`p-4 border-b border-slate-200 dark:border-slate-700 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'flex-col' : ''}`}>
            <img
              src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-primary-500 object-cover"
            />
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-white truncate">
                  {user?.displayName || 'User'}
                </p>
                <span className="text-xs font-medium px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full capitalize inline-block mt-1">
                  {role}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {currentMenu.map(item => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 
            hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            {theme === 'dark' ? <FaSun className="text-amber-500" /> : <FaMoon className="text-slate-500" />}
            {!isSidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Home Link */}
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 
            hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <FaHome className="text-lg" />
            {!isSidebarCollapsed && <span>Back to Home</span>}
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 
            hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <FaSignOutAlt className="text-lg" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main 
        className={`min-h-screen transition-all duration-300 
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} 
        pt-16 lg:pt-0`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
            >
              <FaHome />
              <span>Home</span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;