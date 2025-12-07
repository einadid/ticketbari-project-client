import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  FaChevronDown
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/all-tickets', label: 'All Tickets', private: true },
    { to: '/dashboard', label: 'Dashboard', private: true }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-soft border-b border-slate-200 dark:border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
              <FaBus className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                Ticket<span className="text-primary-600">Bari</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              (!link.private || user) && (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-lg font-medium text-sm transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              )
            ))}
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
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-700"
                  />
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-200">
                    {user.displayName?.split(' ')[0]}
                  </span>
                  <FaChevronDown className={`text-xs text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-elevated border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <FaUser className="text-slate-400" />
                          My Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <FaTachometerAlt className="text-slate-400" />
                          Dashboard
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
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
                  <button className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                (!link.private || user) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      block px-4 py-3 rounded-xl font-medium
                      ${isActive 
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' 
                        : 'text-slate-600 dark:text-slate-300'
                      }
                    `}
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
              
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-3 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;