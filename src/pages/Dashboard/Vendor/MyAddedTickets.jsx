import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaEdit, FaTrash, FaList } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ['myTickets', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor/${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF6B35',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tickets/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
          }
        } catch (error) {
          Swal.fire('Error!', error.response?.data?.message || 'Failed to delete.', 'error');
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>My Added Tickets | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaList className="text-primary" /> My Added Tickets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
              <div className="relative h-48">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                  {ticket.verificationStatus === 'pending' && <span className="text-yellow-600">Pending</span>}
                  {ticket.verificationStatus === 'approved' && <span className="text-green-600">Approved</span>}
                  {ticket.verificationStatus === 'rejected' && <span className="text-red-600">Rejected</span>}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{ticket.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {ticket.fromLocation} → {ticket.toLocation}
                </p>
                
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="font-bold text-primary">৳{ticket.price}</span>
                  <span className="text-gray-500">{ticket.ticketQuantity} Seats</span>
                </div>

                <div className="mt-auto flex gap-3">
                  <Link to={`/dashboard/update-ticket/${ticket._id}`} className="flex-1">
                    <button 
                      disabled={ticket.verificationStatus === 'rejected'}
                      className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaEdit /> Update
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(ticket._id)}
                    disabled={ticket.verificationStatus === 'rejected'}
                    className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAddedTickets;