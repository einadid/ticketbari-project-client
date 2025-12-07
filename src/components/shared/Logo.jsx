import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", showSubtitle = true }) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Animated Icon Container */}
      <motion.div
        className="relative w-12 h-12 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10 text-white">
          <FaBus className="text-2xl" />
        </div>
      </motion.div>

      {/* Text Logo */}
      <div className="flex flex-col -space-y-1">
        <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          Ticket<span className="text-blue-600 dark:text-blue-400">Bari</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
            Book Your Journey
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;