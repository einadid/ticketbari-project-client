import { motion } from 'framer-motion';
import { FaUsers, FaTicketAlt, FaRoute, FaSmile } from 'react-icons/fa';

const Stats = () => {
  const stats = [
    { icon: FaUsers, value: '50K+', label: 'Happy Travelers', color: 'from-orange-500 to-red-500' },
    { icon: FaTicketAlt, value: '100K+', label: 'Tickets Booked', color: 'from-blue-500 to-indigo-500' },
    { icon: FaRoute, value: '500+', label: 'Routes Available', color: 'from-teal-500 to-cyan-500' },
    { icon: FaSmile, value: '99%', label: 'Satisfaction Rate', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-2xl text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
              <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;