import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaEye, 
  FaEyeSlash,
  FaTimesCircle,
  FaSpinner,
  FaPlane,
  FaBus,
  FaTrain,
  FaShip,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUserShield
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle Email/Password Login
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('🎉 Welcome back! Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
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
      toast.success('🎉 Welcome back! Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Google login failed. Please try again.');
    }
  };

  // Floating travel icons
  const floatingIcons = [
    { Icon: FaPlane, delay: 0, duration: 20, top: '15%', left: '10%' },
    { Icon: FaBus, delay: 2, duration: 25, top: '25%', left: '85%' },
    { Icon: FaTrain, delay: 4, duration: 22, top: '65%', left: '12%' },
    { Icon: FaShip, delay: 6, duration: 28, top: '75%', left: '80%' },
  ];

  return (
    <>
      <Helmet>
        <title>Login to TicketBari - Your Journey Awaits</title>
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
            <Icon size={45} />
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
                {/* Main Heading */}
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <FaTicketAlt className="text-white text-2xl" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                        TicketBari
                      </h1>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        Your Journey Starts Here
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold text-slate-800 dark:text-white leading-tight mb-4"
                  >
                    Welcome Back,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      Traveler!
                    </span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-slate-600 dark:text-slate-300"
                  >
                    Sign in to access your bookings, manage trips, and discover 
                    new destinations across Bangladesh.
                  </motion.p>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-4">
                  {[
                    { icon: FaUserShield, title: 'Secure & Trusted', desc: 'Your data is encrypted and protected' },
                    { icon: FaTicketAlt, title: 'Instant Booking', desc: 'Book tickets in just a few clicks' },
                    { icon: FaMapMarkerAlt, title: '500+ Routes', desc: 'Travel anywhere in Bangladesh' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                        <item.icon className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-3 gap-4 mt-8 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg"
                >
                  {[
                    { label: 'Active Users', value: '50K+' },
                    { label: 'Daily Trips', value: '1000+' },
                    { label: 'Happy Customers', value: '98%' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Side - Login Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-10">
                  
                  {/* Mobile Logo */}
                  <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <FaTicketAlt className="text-white text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                      TicketBari
                    </h1>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Sign in to continue your journey
                    </p>
                  </div>

                  {/* Google Login */}
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

                  {/* Login Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
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
                          placeholder="Enter your password"
                          {...register('password', {
                            required: 'Password is required'
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
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Remember me
                        </span>
                      </label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30"
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <FaTicketAlt />
                          <span>Sign In to Travel</span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Register Link */}
                  <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
                    New to TicketBari?{' '}
                    <Link 
                      to="/register" 
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Create Account
                    </Link>
                  </p>

                  {/* Security Badge */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FaUserShield className="text-green-500" />
                      <span>Your data is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;