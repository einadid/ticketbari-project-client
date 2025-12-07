import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaShieldAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const UserProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <>
      <Helmet>
        <title>My Profile | TicketBari</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          My Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="-mt-16 mb-4">
              <img
                src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                alt={user?.displayName}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user?.displayName || 'Not set'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                    {role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendar className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserProfile;