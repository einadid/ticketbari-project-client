import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaCamera, FaSpinner, FaSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useImageUpload from '../../hooks/useImageUpload';

const EditProfileModal = ({ isOpen, onClose, userData, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { uploadImage, uploading } = useImageUpload();
  const fileInputRef = useRef(null);
  
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Form এ আগের ডাটা লোড করা
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || user?.displayName || '',
        phone: userData.phone || '',
        address: userData.address || ''
      });
    }
  }, [userData, user, reset]);

  // Image Preview Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      let photoURL = userData?.photo || user?.photoURL;

      // যদি নতুন ছবি সিলেক্ট করা হয়
      if (fileInputRef.current?.files[0]) {
        const uploadedUrl = await uploadImage(fileInputRef.current.files[0]);
        if (uploadedUrl) {
          photoURL = uploadedUrl;
        }
      }

      // Firebase Profile Update
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: photoURL
      });

      // Database Update
      const updateData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        photo: photoURL
      };

      const res = await axiosSecure.patch(`/users/update/${user.email}`, updateData);
      
      if (res.data.modifiedCount > 0) {
        toast.success('Profile updated successfully!');
        refetch(); // Refetch user data
        onClose(); // Close modal
        setPreviewImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Edit Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28">
                    <img
                      src={previewImage || userData?.photo || user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-slate-200 dark:border-slate-700 shadow-md"
                    />
                    
                    {/* Upload Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute bottom-0 right-0 p-2.5 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <FaSpinner className="animate-spin" size={14} />
                      ) : (
                        <FaCamera size={14} />
                      )}
                    </button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Click camera icon to change photo</p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number (e.g., 01712345678)"
                      {...register('phone', {
                        pattern: {
                          value: /^(\+880|0)?1[3-9]\d{8}$/,
                          message: 'Please enter a valid Bangladeshi phone number'
                        }
                      })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Format: 01XXXXXXXXX</p>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Address (Optional)
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      placeholder="Enter your address"
                      rows={3}
                      {...register('address')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;