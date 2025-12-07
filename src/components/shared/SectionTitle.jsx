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
      {subHeading && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 rounded-full">
          {subHeading}
        </span>
      )}
      <h2 className="section-title">{heading}</h2>
      <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full" />
    </motion.div>
  );
};

export default SectionTitle;