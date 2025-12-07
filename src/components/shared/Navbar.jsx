import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBus, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaSun, 
  FaMoon,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronDown,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaList,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaBullhorn,
  FaHome,
  FaChevronRight
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { useTheme } from '../../contexts/ThemeProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);
  
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on dashboard
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
      navigate('/');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  // Dashboard menu items based on role
  const dashboardMenus = {
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

  const currentDashboardMenu = dashboardMenus[role] || dashboardMenus.user;

  // Main nav links
  const navLinks = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/all-tickets', label: 'All Tickets', icon: FaTicketAlt }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-200 dark:border-slate-800' 
          : isDashboardPage 
            ? 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 z-50">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <FaBus className="text-white text-sm sm:text-lg" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                Ticket<span className="text-primary-600">Bari</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
            
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {user ? (
              /* User Dropdown */
              <div className="relative user-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-700"
                  />
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0]}
                  </span>
                  <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-900/20 border-b border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 bg-primary-600 text-white rounded-full capitalize">
                          {role}
                        </span>
                      </div>
                      
                      {/* Quick Links */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <FaTachometerAlt className="text-primary-500" />
                          Dashboard
                        </Link>
                        <Link
                          to={role === 'admin' ? '/dashboard/admin-profile' : role === 'vendor' ? '/dashboard/vendor-profile' : '/dashboard/profile'}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <FaUser className="text-slate-400" />
                          My Profile
                        </Link>
                      </div>
                      
                      {/* Logout */}
                      <div className="border-t border-slate-200 dark:border-slate-700 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login/Register */
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>
            
            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU (All-in-One) ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="p-4 space-y-2">
                
                {/* Main Navigation Links */}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                      ${isActive 
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <link.icon className="text-lg" />
                    {link.label}
                  </NavLink>
                ))}

                {/* User Section (If Logged In) */}
                {user && (
                  <>
                    {/* Divider */}
                    <div className="border-t border-slate-200 dark:border-slate-700 my-3"></div>
                    
                    {/* User Profile Card */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 rounded-xl">
                      <img
                        src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 bg-primary-600 text-white rounded-full capitalize">
                          {role}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Section Header */}
                    <button
                      onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 mt-2 text-slate-500 dark:text-slate-400"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <FaTachometerAlt className="text-primary-500" />
                        Dashboard Menu
                      </span>
                      <FaChevronDown 
                        className={`text-xs transition-transform duration-200 ${isDashboardExpanded ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    {/* Dashboard Links (Collapsible) */}
                    <AnimatePresence>
                      {isDashboardExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1 pl-2 overflow-hidden"
                        >
                          {currentDashboardMenu.map((item, index) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                                ${isActive 
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400' 
                                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }
                              `}
                            >
                              <item.icon className="text-primary-500" />
                              <span className="flex-1">{item.label}</span>
                              <FaChevronRight className="text-xs text-slate-400" />
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Divider */}
                    <div className="border-t border-slate-200 dark:border-slate-700 my-3"></div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </>
                )}

                {/* Guest Section (If Not Logged In) */}
                {!user && (
                  <>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-3"></div>
                    
                    <div className="space-y-2">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <button className="w-full py-3 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                          Login
                        </button>
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                          Create Account
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;