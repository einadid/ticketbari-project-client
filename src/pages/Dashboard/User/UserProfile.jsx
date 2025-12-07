import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaEdit,
  FaCamera,
  FaCheckCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaSpinner
} from 'react-icons/fa';
import { format } from 'date-fns';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import EditProfileModal from '../../../components/dashboard/EditProfileModal';

const UserProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch user details from database
  const { data: userData = {}, isLoading, refetch } = useQuery({
    queryKey: ['userDetails', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/details/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Role অনুযায়ী কালার
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

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
          className={`${config.banner} rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-lg`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{config.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold">
                Hello, {userData?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'User'}!
              </h1>
            </div>
            <p className="text-white/90 text-lg">
              Welcome to your dashboard. Here's your profile overview.
            </p>
          </div>
          
          {/* Decorative */}
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
                  src={userData?.photo || user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-slate-100 dark:border-slate-700 shadow-md"
                />
              </div>

              {/* Name & Email */}
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                {userData?.name || user?.displayName || 'User'}
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
                {/* ✅ Edit Profile Button */}
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 font-medium text-sm transition-colors"
                >
                  <FaEdit size={14} /> Edit Profile
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem 
                  icon={FaUser} 
                  label="Full Name" 
                  value={userData?.name || user?.displayName} 
                />
                <InfoItem 
                  icon={FaEnvelope} 
                  label="Email Address" 
                  value={user?.email} 
                />
                <InfoItem 
                  icon={FaPhone} 
                  label="Phone Number" 
                  value={userData?.phone || 'Not set'} 
                />
                <InfoItem 
                  icon={FaShieldAlt} 
                  label="Account Role" 
                  value={role} 
                  isCapital 
                />
                <InfoItem 
                  icon={FaMapMarkerAlt} 
                  label="Address" 
                  value={userData?.address || 'Not set'} 
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

      {/* ✅ Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        refetch={refetch}
      />
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