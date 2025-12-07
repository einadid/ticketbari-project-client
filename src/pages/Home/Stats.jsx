import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaTicketAlt, FaRoute, FaSmile } from 'react-icons/fa';

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: FaUsers,
      value: 50000,
      suffix: '+',
      label: 'Happy Travelers',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FaTicketAlt,
      value: 100000,
      suffix: '+',
      label: 'Tickets Booked',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: FaRoute,
      value: 500,
      suffix: '+',
      label: 'Routes Available',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: FaSmile,
      value: 99,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100 dark:border-gray-700">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <stat.icon className="text-2xl text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-1">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  )}
                </div>

                {/* Label */}
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;