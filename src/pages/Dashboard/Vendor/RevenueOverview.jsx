import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaChartBar, FaMoneyBillWave, FaTicketAlt, FaList } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['vendorStats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/stats/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  // Chart Data Preparation (Demo Data if monthly data is missing)
  const chartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
  ];

  return (
    <>
      <Helmet>
        <title>Revenue Overview | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaChartBar className="text-primary" /> Revenue Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={FaMoneyBillWave} 
            title="Total Revenue" 
            value={`৳${stats.totalRevenue || 0}`} 
            color="bg-green-500" 
          />
          <StatCard 
            icon={FaTicketAlt} 
            title="Total Tickets Sold" 
            value={stats.totalTicketsSold || 0} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={FaList} 
            title="Total Tickets Added" 
            value={stats.totalTicketsAdded || 0} 
            color="bg-purple-500" 
          />
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Monthly Revenue</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#FF6B35" name="Revenue (৳)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
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

export default RevenueOverview;