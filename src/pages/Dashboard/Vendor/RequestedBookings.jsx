import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaTimes, FaClipboardList } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const RequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['vendorBookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/vendor/${user.email}`);
      return res.data;
    }
  });

  const handleStatus = async (id, status) => {
    try {
      const endpoint = status === 'accepted' ? `/bookings/accept/${id}` : `/bookings/reject/${id}`;
      const res = await axiosSecure.patch(endpoint);
      if (res.data.modifiedCount > 0) {
        toast.success(`Booking ${status} successfully!`);
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
        <title>Requested Bookings | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaClipboardList className="text-primary" /> Requested Bookings
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Ticket</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Qty</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Total Price</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{booking.userName}</p>
                        <p className="text-xs text-gray-500">{booking.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {booking.ticketTitle}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">
                      {booking.bookingQuantity}
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      ৳{booking.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                        ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                          booking.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                          booking.status === 'paid' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {booking.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleStatus(booking._id, 'accepted')}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Accept"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              onClick={() => handleStatus(booking._id, 'rejected')}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">No actions</span>
                        )}
                      </div>
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

export default RequestedBookings;