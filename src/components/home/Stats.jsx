import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaUsers, FaTicketAlt, FaRoute, FaSmile } from 'react-icons/fa';
import CountUp from 'react-countup'; // এনিমেশনের জন্য
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Stats = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch Real Data
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['publicStats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/public-stats');
      return res.data;
    }
  });

  // Fallback values if data is loading or error
  const statsData = [
    { 
      icon: FaUsers, 
      value: stats.totalUsers || 0, 
      suffix: '+',
      label: 'Happy Travelers', 
      color: 'from-orange-500 to-red-500' 
    },
    { 
      icon: FaTicketAlt, 
      value: stats.totalTicketsSold || 0, 
      suffix: '+',
      label: 'Tickets Booked', 
      color: 'from-blue-500 to-indigo-500' 
    },
    { 
      icon: FaRoute, 
      value: stats.totalRoutes || 0, 
      suffix: '+',
      label: 'Routes Available', 
      color: 'from-teal-500 to-cyan-500' 
    },
    { 
      icon: FaSmile, 
      value: stats.satisfactionRate || 99, 
      suffix: '%',
      label: 'Satisfaction Rate', 
      color: 'from-purple-500 to-pink-500' 
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center border border-slate-100 dark:border-slate-700"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="text-2xl text-white" />
              </div>
              
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                )}
                <span>{stat.suffix}</span>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;