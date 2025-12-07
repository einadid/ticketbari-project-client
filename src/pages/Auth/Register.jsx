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
  FaImage,
  FaStore
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

  // ✅ Password validation
  const validatePassword = (value) => {
    if (!/[A-Z]/.test(value)) return 'Password must have one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must have one lowercase letter';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return true;
  };

  // ✅ Register Handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Firebase user create
      await createUser(data.email, data.password);

      // Update profile
      await updateUserProfile(data.name, data.photoURL);

      // Save user to DB
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photoURL || 'https://i.ibb.co/5GzXkwq/user.png',
        role: data.isVendor ? 'vendor' : 'user', // ⭐ Vendor Logic
        isFraud: false,
        createdAt: new Date().toISOString()
      };

      await axiosPublic.post('/users', userInfo);

      toast.success(
        data.isVendor ? 'Vendor account created successfully!' : 'Registration successful!'
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google Sign In (Always User)
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
      toast.error('Google sign-in failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | TicketBari</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-secondary/5 via-white to-primary/5 dark:bg-gray-900">
        <div className="w-full max-w-6xl flex flex-row-reverse rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">

          {/* Right Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary to-primary p-12 flex-col justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FaBus className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-white">TicketBari</h1>
            </Link>

            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Join TicketBari Today</h2>
              <p className="opacity-90">
                Book tickets or become a vendor and sell your own tickets.
              </p>
            </div>

            <p className="text-white/60 text-sm text-right">
              © 2025 TicketBari
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Photo */}
              <div className="relative">
                <FaImage className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="url"
                  placeholder="Photo URL (optional)"
                  {...register('photoURL')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', { required: true, validate: validatePassword })}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              {/* ⭐ Vendor Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl border">
                <input
                  type="checkbox"
                  {...register('isVendor')}
                  className="w-5 h-5 cursor-pointer"
                />
                <label className="flex items-center gap-2 font-medium cursor-pointer">
                  <FaStore className="text-primary" />
                  Register as Vendor
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-xl"
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border-2 rounded-xl flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
