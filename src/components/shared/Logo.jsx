import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* Animated Icon Container */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-primary-600 rounded-xl"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10 text-white">
          <FaBus className="text-lg" />
        </div>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
          Ticket<span className="text-primary-600">Bari</span>
        </span>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
          BOOK YOUR JOURNEY
        </span>
      </div>
    </div>
  );
};

export default Logo;