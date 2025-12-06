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
  FaBus,
  FaImage
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
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

  // Handle Register
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Create user in Firebase
      const result = await createUser(data.email, data.password);
      
      // Update profile
      await updateUserProfile(data.name, data.photoURL);

      // Save user to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photoURL || 'https://i.ibb.co/5GzXkwq/user.png',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      await axiosPublic.post('/users', userInfo);
      
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
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
        createdAt: new Date().toISOString()
      };
      
      await axiosPublic.post('/users', userInfo);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | TicketBari</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-secondary/5 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl flex flex-row-reverse rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
          
          {/* Right Side - Image/Illustration */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary to-primary p-12 flex-col justify-between"
          >
            <div className="flex justify-end">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaBus className="text-white text-xl" />
                </div>
                <h1 className="text-2xl font-bold text-white">TicketBari</h1>
              </Link>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Join Us Today! <br />
                Start Your Journey
              </h2>
              <p className="text-white/80 text-lg">
                Create an account to book tickets, manage your trips, 
                and enjoy exclusive offers.
              </p>
              
              {/* Benefits */}
              <div className="space-y-4 pt-6">
                {[
                  'Easy ticket booking',
                  'Exclusive member discounts',
                  'Trip history & management',
                  'Secure payments'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-white/60 text-sm text-right">
              © 2025 TicketBari. All rights reserved.
            </div>
          </motion.div>

          {/* Left Side - Form */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 p-8 md:p-12"
          >
            <div className="max-w-md mx-auto">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <FaBus className="text-white text-xl" />
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-primary">Ticket</span>
                  <span className="text-secondary">Bari</span>
                </h1>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the details to get started
                </p>
              </div>

              {/* Google Sign Up */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-6"
              >
                <FaGoogle className="text-xl text-red-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Sign up with Google
                </span>
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                        errors.name 
                          ? 'border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary'
                      } bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                        errors.email 
                          ? 'border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary'
                      } bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Enter photo URL (optional)"
                      {...register('photoURL')}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      {...register('password', {
                        required: 'Password is required',
                        validate: validatePassword
                      })}
                      className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 ${
                        errors.password 
                          ? 'border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary'
                      } bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                  )}
                  
                  {/* Password Requirements */}
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p className={password?.length >= 6 ? 'text-green-500' : ''}>
                      • At least 6 characters
                    </p>
                    <p className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>
                      • One uppercase letter
                    </p>
                    <p className={/[a-z]/.test(password) ? 'text-green-500' : ''}>
                      • One lowercase letter
                    </p>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    {...register('terms', {
                      required: 'You must accept the terms and conditions'
                    })}
                    className="checkbox checkbox-sm checkbox-primary mt-1" 
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500">{errors.terms.message}</p>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;