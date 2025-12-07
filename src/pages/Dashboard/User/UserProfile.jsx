import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaEdit,
  FaCamera
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { format } from 'date-fns';

const UserProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  // Role অনুযায়ী ব্যাজ কালার
  const roleColors = {
    admin: 'bg-red-500 text-white',
    vendor: 'bg-blue-500 text-white',
    user: 'bg-green-500 text-white'
  };

  return (
    <>
      <Helmet>
        <title>My Profile | TicketBari Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              Hello, {user?.displayName?.split(' ')[0]}! 👋
            </h1>
            <p className="opacity-90">Welcome to your dashboard. Here's your profile overview.</p>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700 relative">
              
              {/* Profile Image with Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 animate-spin-slow"></div>
                <img
                  src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 relative z-10"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full z-20 hover:bg-primary transition-colors">
                  <FaCamera size={14} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {user?.displayName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user?.email}</p>

              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${roleColors[role] || 'bg-gray-500'}`}>
                {role}
              </span>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <span className="block font-bold text-lg text-gray-800 dark:text-white">0</span>
                    Bookings
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="text-center">
                    <span className="block font-bold text-lg text-gray-800 dark:text-white">0</span>
                    Reviews
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
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Personal Information</h3>
                <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium text-sm">
                  <FaEdit /> Edit Profile
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={user?.metadata?.creationTime ? format(new Date(user.metadata.creationTime), 'dd MMM yyyy') : 'N/A'} 
                  />
                </div>

                {/* Account Status */}
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/30 flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-full text-green-600">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 dark:text-green-400">Account Verified</h4>
                    <p className="text-sm text-green-600 dark:text-green-500/80 mt-1">
                      Your account is fully verified. You can access all features based on your role.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

const InfoItem = ({ icon: Icon, label, value, isCapital }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-primary">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
        {label}
      </p>
      <p className={`font-semibold text-gray-800 dark:text-white ${isCapital ? 'capitalize' : ''}`}>
        {value || 'Not set'}
      </p>
    </div>
  </div>
);

export default UserProfile;