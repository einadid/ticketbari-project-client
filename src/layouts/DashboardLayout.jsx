import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
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
  FaCog,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useTheme } from '../contexts/ThemeProvider';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  // Menu items based on role
  const menuItems = {
    user: [
      { path: '/dashboard/profile', icon: FaUser, label: 'My Profile' },
      { path: '/dashboard/my-booked-tickets', icon: FaTicketAlt, label: 'My Booked Tickets' },
      { path: '/dashboard/transaction-history', icon: FaHistory, label: 'Transaction History' },
    ],
    vendor: [
      { path: '/dashboard/vendor-profile', icon: FaUser, label: 'Vendor Profile' },
      { path: '/dashboard/add-ticket', icon: FaPlus, label: 'Add Ticket' },
      { path: '/dashboard/my-added-tickets', icon: FaList, label: 'My Added Tickets' },
      { path: '/dashboard/requested-bookings', icon: FaClipboardList, label: 'Requested Bookings' },
      { path: '/dashboard/revenue-overview', icon: FaChartBar, label: 'Revenue Overview' },
    ],
    admin: [
      { path: '/dashboard/admin-profile', icon: FaUser, label: 'Admin Profile' },
      { path: '/dashboard/manage-tickets', icon: FaTicketAlt, label: 'Manage Tickets' },
      { path: '/dashboard/manage-users', icon: FaUsers, label: 'Manage Users' },
      { path: '/dashboard/advertise-tickets', icon: FaBullhorn, label: 'Advertise Tickets' },
    ],
  };

  const currentMenu = menuItems[role] || menuItems.user;

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <item.icon className="text-lg" />
      <span className={`font-medium ${!isSidebarOpen && 'hidden lg:hidden'}`}>
        {item.label}
      </span>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-md z-50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <FaBus className="text-2xl text-primary" />
          <span className="text-xl font-bold">
            <span className="text-primary">Ticket</span>
            <span className="text-secondary">Bari</span>
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-xl z-40 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden lg:block`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <FaBus className="text-white" />
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold">
                <span className="text-primary">Ticket</span>
                <span className="text-secondary">Bari</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBars />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
              alt={user?.displayName}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="font-semibold text-gray-800 dark:text-white truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {role}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {currentMenu.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Bottom Links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <FaHome className="text-lg" />
            {isSidebarOpen && <span>Back to Home</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <FaSignOutAlt className="text-lg" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-50"
            >
              {/* Logo */}
              <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
                <Link to="/" className="flex items-center gap-2">
                  <FaBus className="text-2xl text-primary" />
                  <span className="text-xl font-bold">
                    <span className="text-primary">Ticket</span>
                    <span className="text-secondary">Bari</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-4 space-y-2">
                {currentMenu.map((item) => (
                  <NavItem key={item.path} item={item} />
                ))}
              </nav>

              {/* Bottom Links */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <FaHome className="text-lg" />
                  <span>Back to Home</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } pt-16 lg:pt-0`}
      >
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;