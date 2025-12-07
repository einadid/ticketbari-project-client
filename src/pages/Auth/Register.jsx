import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaEye, 
  FaEyeSlash,
  FaCamera,
  FaTimesCircle,
  FaCheckCircle,
  FaSpinner,
  FaPlane,
  FaBus,
  FaTrain,
  FaShip,
  FaMapMarkerAlt,
  FaStore
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useImageUpload from '../../hooks/useImageUpload';
import Logo from '../../components/shared/Logo';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [accountType, setAccountType] = useState('user');
  
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const password = watch('password');

  // Password validation
  const validatePassword = (value) => {
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return true;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPG, PNG, WEBP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setValue('image', null);
  };

  // Handle Register
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let photoURL = 'https://i.ibb.co/5GzXkwq/user.png';

      if (selectedFile) {
        setUploadProgress(true);
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          photoURL = uploadedUrl;
        }
        setUploadProgress(false);
      }

      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: accountType,
        isFraud: false,
        createdAt: new Date().toISOString()
      };
      
      await axiosPublic.post('/users', userInfo);
      
      const successMessage = accountType === 'vendor' 
        ? '🎉 Vendor account created successfully! Start adding tickets.' 
        : '🎉 Welcome aboard! Registration successful!';
      
      toast.success(successMessage);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
      setUploadProgress(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
        role: 'user',
        isFraud: false,
        createdAt: new Date().toISOString()
      };
      
      await axiosPublic.post('/users', userInfo);
      toast.success('🎉 Welcome aboard! Login successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  // Floating travel icons animation
  const floatingIcons = [
    { Icon: FaPlane, delay: 0, duration: 20, top: '10%', left: '5%' },
    { Icon: FaBus, delay: 2, duration: 25, top: '30%', left: '90%' },
    { Icon: FaTrain, delay: 4, duration: 22, top: '60%', left: '8%' },
    { Icon: FaShip, delay: 6, duration: 28, top: '80%', left: '85%' },
    { Icon: FaMapMarkerAlt, delay: 3, duration: 24, top: '50%', left: '95%' },
  ];

  return (
    <>
      <Helmet>
        <title>Join TicketBari - Book Your Next Journey</title>
      </Helmet>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Travel Icons */}
        {floatingIcons.map(({ Icon, delay, duration, top, left }, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-400/20 dark:text-blue-500/10"
            style={{ top, left }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={40} />
          </motion.div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Side - Travel Showcase */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:block"
              >
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <Logo showSubtitle={true} />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold text-slate-800 dark:text-white leading-tight mb-4"
                >
                  Book Tickets,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Travel Anywhere
                  </span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-600 dark:text-slate-300 mb-8"
                >
                  Join thousands of travelers booking their perfect journeys. 
                  Bus, Train, Flight & Launch tickets at your fingertips.
                </motion.p>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FaBus, title: 'Bus Tickets', color: 'from-orange-500 to-red-500' },
                    { icon: FaTrain, title: 'Train Tickets', color: 'from-green-500 to-emerald-500' },
                    { icon: FaPlane, title: 'Flight Tickets', color: 'from-blue-500 to-cyan-500' },
                    { icon: FaShip, title: 'Launch Tickets', color: 'from-purple-500 to-pink-500' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                        <item.icon className="text-white text-xl" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Book instantly
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Side - Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-10">
                  
                  {/* Mobile Logo */}
                  <div className="lg:hidden flex justify-center mb-6">
                    <Logo showSubtitle={true} />
                  </div>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Start your journey with us today
                    </p>
                  </div>

                  {/* Account Type Selector */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAccountType('user')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        accountType === 'user'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <FaUser className={`mx-auto text-2xl mb-2 ${
                        accountType === 'user' ? 'text-blue-600' : 'text-slate-400'
                      }`} />
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        User Account
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Book tickets
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAccountType('vendor')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        accountType === 'vendor'
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <FaStore className={`mx-auto text-2xl mb-2 ${
                        accountType === 'vendor' ? 'text-indigo-600' : 'text-slate-400'
                      }`} />
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Vendor Account
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Sell tickets
                      </div>
                    </motion.button>
                  </div>

                  {/* Google Sign Up */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-200 mb-6 shadow-md"
                  >
                    <FaGoogle className="text-xl text-red-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      Continue with Google
                    </span>
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                  </div>

                  {/* Register Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Profile Picture Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Profile Picture
                      </label>
                      
                      <div className="flex items-center gap-4">
                        {/* Image Preview */}
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                            {imagePreview ? (
                              <img 
                                src={imagePreview} 
                                alt="Profile Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-2xl text-slate-400" />
                            )}
                          </div>
                          
                          {imagePreview && (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <FaTimesCircle />
                            </button>
                          )}
                        </div>

                        {/* Upload Button */}
                        <div className="flex-1">
                          <label 
                            htmlFor="image-upload"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
                          >
                            <FaCamera />
                            <span className="text-sm font-semibold">
                              {imagePreview ? 'Change Photo' : 'Upload Photo'}
                            </span>
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            JPG, PNG or WEBP. Max 5MB.
                          </p>
                        </div>
                      </div>

                      {uploadProgress && (
                        <div className="mt-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <FaSpinner className="animate-spin" />
                          <span className="text-sm font-medium">Uploading image...</span>
                        </div>
                      )}
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          {...register('name', {
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            }
                          })}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 ${
                            errors.name 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          } bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <FaTimesCircle className="text-xs" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          } bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <FaTimesCircle className="text-xs" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          {...register('password', {
                            required: 'Password is required',
                            validate: validatePassword
                          })}
                          className={`w-full pl-11 pr-12 py-3.5 rounded-xl border-2 ${
                            errors.password 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          } bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <FaTimesCircle className="text-xs" />
                          {errors.password.message}
                        </motion.p>
                      )}
                      
                      {/* Password Strength Indicator */}
                      <div className="mt-3 space-y-2">
                        {[
                          { test: password?.length >= 6, label: 'At least 6 characters' },
                          { test: /[A-Z]/.test(password), label: 'One uppercase letter' },
                          { test: /[a-z]/.test(password), label: 'One lowercase letter' },
                        ].map((requirement, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            {requirement.test ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                            )}
                            <span className={requirement.test ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-500 dark:text-slate-400'}>
                              {requirement.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="terms"
                          {...register('terms', {
                            required: 'You must accept the terms and conditions'
                          })}
                          className="w-4 h-4 mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                        />
                        <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                          I agree to the{' '}
                          <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.terms && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <FaTimesCircle className="text-xs" />
                          {errors.terms.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 ${
                        accountType === 'vendor'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-purple-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
                      } text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl`}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Creating Your Account...</span>
                        </>
                      ) : (
                        <>
                          {accountType === 'vendor' ? <FaStore /> : <FaUser />}
                          <span>
                            {accountType === 'vendor' ? 'Create Vendor Account' : 'Start Your Journey'}
                          </span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Login Link */}
                  <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Sign In Now
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;