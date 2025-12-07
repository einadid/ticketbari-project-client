import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaBullhorn } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ['adminTickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tickets');
      return res.data.filter(ticket => ticket.verificationStatus === 'approved');
    }
  });

  const handleAdvertise = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/admin/tickets/advertise/${id}`, { isAdvertised: !currentStatus });
      if (res.data.modifiedCount > 0) {
        toast.success(currentStatus ? 'Removed from advertisement' : 'Added to advertisement');
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Advertise Tickets | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaBullhorn className="text-primary" /> Advertise Tickets
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Vendor</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Advertise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={ticket.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="font-semibold text-gray-800 dark:text-white">{ticket.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{ticket.vendorName}</td>
                    <td className="px-6 py-4 font-bold text-primary">৳{ticket.price}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleAdvertise(ticket._id, ticket.isAdvertised)}
                        className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${
                          ticket.isAdvertised 
                            ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {ticket.isAdvertised ? 'Advertised' : 'Advertise'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseTickets;