import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTicketAlt, FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ['adminTickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tickets');
      return res.data;
    }
  });

  const handleStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/admin/tickets/${id}`, { verificationStatus: status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Ticket ${status} successfully!`);
        refetch();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Manage Tickets | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaTicketAlt className="text-primary" /> Manage Tickets
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100 dark:border-gray-700">
              <img src={ticket.image} alt={ticket.title} className="w-full md:w-32 h-32 rounded-xl object-cover" />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{ticket.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                    ${ticket.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      ticket.verificationStatus === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'}`}>
                    {ticket.verificationStatus}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Vendor: <span className="font-semibold">{ticket.vendorName}</span> ({ticket.vendorEmail})
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Route: {ticket.fromLocation} → {ticket.toLocation}
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleStatus(ticket._id, 'approved')}
                  disabled={ticket.verificationStatus !== 'pending'}
                  className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                >
                  <FaCheck /> Approve
                </button>
                <button 
                  onClick={() => handleStatus(ticket._id, 'rejected')}
                  disabled={ticket.verificationStatus !== 'pending'}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageTickets;