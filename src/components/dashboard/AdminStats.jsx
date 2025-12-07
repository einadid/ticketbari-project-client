import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaTicketAlt, FaMoneyBillWave, FaStore } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../shared/Loading';

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon={FaUsers} 
        title="Total Users" 
        value={stats.totalUsers} 
        color="bg-blue-500" 
      />
      <StatCard 
        icon={FaStore} 
        title="Total Vendors" 
        value={stats.totalVendors} 
        color="bg-purple-500" 
      />
      <StatCard 
        icon={FaTicketAlt} 
        title="Total Tickets" 
        value={stats.totalTickets} 
        color="bg-orange-500" 
      />
      <StatCard 
        icon={FaMoneyBillWave} 
        title="Total Revenue" 
        value={`৳${stats.totalRevenue}`} 
        color="bg-green-500" 
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4">
    <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center text-white text-2xl shadow-md`}>
      <Icon />
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h4>
    </div>
  </div>
);

export default AdminStats;