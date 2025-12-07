import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaEdit,
  FaCamera,
  FaCheckCircle
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { format } from 'date-fns';

const UserProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  // Role অনুযায়ী কালার এবং ব্যাকগ্রাউন্ড
  const roleConfig = {
    admin: { 
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      banner: 'bg-red-600',
      icon: '👑'
    },
    vendor: { 
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      banner: 'bg-blue-600',
      icon: '🏪'
    },
    user: { 
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      banner: 'bg-emerald-600',
      icon: '👤'
    }
  };

  const config = roleConfig[role] || roleConfig.user;

  return (
    <>
      <Helmet>
        <title>My Profile | TicketBari Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* ✅ Welcome Banner - Fixed with Solid Color */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${config.banner} rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-lg`}
        >
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{config.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold">
                Hello, {user?.displayName?.split(' ')[0] || 'User'}!
              </h1>
            </div>
            <p className="text-white/90 text-lg">
              Welcome to your dashboard. Here's your profile overview.
            </p>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,74.1,43.2C66.7,57.2,57.6,70.6,45,78.5C32.4,86.4,16.2,88.7,0.5,87.9C-15.3,87,-30.5,83,-43.8,75.4C-57.1,67.8,-68.4,56.5,-76.5,43.1C-84.6,29.6,-89.5,14.8,-89.1,0.3C-88.6,-14.3,-82.8,-28.5,-74.7,-41.3C-66.5,-54.1,-56,-65.4,-43.2,-73.4C-30.4,-81.4,-15.2,-86.1,0.4,-86.8C16,-87.5,32,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 text-center border border-slate-200 dark:border-slate-700">
              
              {/* Profile Image */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-slate-100 dark:border-slate-700 shadow-md"
                />
                <button className="absolute bottom-1 right-1 p-2 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 transition-colors">
                  <FaCamera size={12} />
                </button>
              </div>

              {/* Name & Email */}
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                {user?.displayName || 'User'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                {user?.email}
              </p>

              {/* Role Badge */}
              <span className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${config.badge}`}>
                <FaShieldAlt size={10} />
                {role}
              </span>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-around text-sm">
                  <div className="text-center">
                    <span className="block font-bold text-lg text-slate-800 dark:text-white">0</span>
                    <span className="text-slate-500 dark:text-slate-400">Bookings</span>
                  </div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div className="text-center">
                    <span className="block font-bold text-lg text-slate-800 dark:text-white">0</span>
                    <span className="text-slate-500 dark:text-slate-400">Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 md:p-8 border border-slate-200 dark:border-slate-700 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Personal Information
                </h3>
                <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                  <FaEdit size={14} /> Edit Profile
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem 
                  icon={FaUser} 
                  label="Full Name" 
                  value={user?.displayName} 
                />
                <InfoItem 
                  icon={FaEnvelope} 
                  label="Email Address" 
                  value={user?.email} 
                />
                <InfoItem 
                  icon={FaShieldAlt} 
                  label="Account Role" 
                  value={role} 
                  isCapital 
                />
                <InfoItem 
                  icon={FaCalendarAlt} 
                  label="Member Since" 
                  value={user?.metadata?.creationTime 
                    ? format(new Date(user.metadata.creationTime), 'dd MMM yyyy') 
                    : 'N/A'
                  } 
                />
              </div>

              {/* Account Status */}
              <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-4">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                  <FaCheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400">
                    Account Verified
                  </h4>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500/80 mt-0.5">
                    Your account is fully verified and you can access all features.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// Info Item Component
const InfoItem = ({ icon: Icon, label, value, isCapital }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary-600">
      <Icon size={16} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`font-semibold text-slate-800 dark:text-white truncate ${isCapital ? 'capitalize' : ''}`}>
        {value || 'Not set'}
      </p>
    </div>
  </div>
);

export default UserProfile;