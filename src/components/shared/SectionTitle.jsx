import { motion } from 'framer-motion';

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-primary font-medium mb-2"
      >
        — {subHeading} —
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white"
      >
        {heading}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
      />
    </motion.div>
  );
};

export default SectionTitle;