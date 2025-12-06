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
  FaTachometerAlt
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/all-tickets', label: 'All Tickets', private: true },
    { to: '/dashboard', label: 'Dashboard', private: true }
  ];

  // Active link style
  const activeStyle = "text-primary font-semibold";
  const normalStyle = "text-gray-700 dark:text-gray-200 hover:text-primary transition-colors";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center"
            >
              <FaBus className="text-white text-xl" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-primary">Ticket</span>
                <span className="text-secondary">Bari</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Book Your Journey
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              (!link.private || user) && (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `${isActive ? activeStyle : normalStyle} text-lg font-medium`
                  }
                >
                  {link.label}
                </NavLink>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </motion.button>

            {user ? (
              /* User Dropdown */
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1 pr-4"
                >
                  <img
                    src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10">
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {user.displayName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FaUser className="text-primary" />
                          <span className="text-gray-700 dark:text-gray-200">My Profile</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FaTachometerAlt className="text-secondary" />
                          <span className="text-gray-700 dark:text-gray-200">Dashboard</span>
                        </Link>
                        <hr className="my-2 border-gray-100 dark:border-gray-700" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login/Register Buttons */
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary-custom"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </motion.button>
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
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                (!link.private || user) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl ${
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-gray-700 dark:text-gray-200'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              ))}

              {user ? (
                <div className="pt-4 border-t dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <p className="font-semibold dark:text-white">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t dark:border-gray-800 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 text-center border-2 border-primary text-primary rounded-xl font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 text-center bg-primary text-white rounded-xl font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;