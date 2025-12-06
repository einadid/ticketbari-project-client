import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <div className="relative">
            {/* Bus/Train Icon */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7h8m-8 4h8m-6 4h4m-8 0a2 2 0 100-4H4a2 2 0 100 4zm16 0a2 2 0 100-4 2 2 0 000 4z" 
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold gradient-text"
        >
          TicketBari
        </motion.h2>
        
        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                backgroundColor: ['#FF6B35', '#004E89', '#FF6B35']
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          ))}
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading your journey...
        </p>
      </div>
    </div>
  );
};

export default Loading;