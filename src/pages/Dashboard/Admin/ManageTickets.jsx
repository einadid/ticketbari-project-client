import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { 
  FaTicketAlt, 
  FaCheck, 
  FaTimes, 
  FaTrash, 
  FaBullhorn,
  FaEye,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChair
} from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
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

  // Transport type icon
  const getTransportIcon = (type) => {
    switch (type) {
      case 'bus': return <FaBus className="text-green-500" />;
      case 'train': return <FaTrain className="text-blue-500" />;
      case 'launch': return <FaShip className="text-cyan-500" />;
      case 'plane': return <FaPlane className="text-orange-500" />;
      default: return <FaBus className="text-gray-500" />;
    }
  };

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle approve/reject status
  const handleStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/admin/tickets/${id}`, { 
        verificationStatus: status 
      });
      
      if (res.data.modifiedCount > 0) {
        toast.success(`Ticket ${status} successfully!`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  // Handle advertise toggle
  const handleAdvertise = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/admin/tickets/advertise/${id}`, { 
        isAdvertised: !currentStatus 
      });
      
      if (res.data.modifiedCount > 0) {
        toast.success(currentStatus ? 'Removed from advertisement' : 'Added to advertisement!');
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update advertisement');
    }
  };

  // Handle delete ticket
  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Delete Ticket?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel',
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#1f2937',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/admin/tickets/${id}`);
          
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Ticket has been deleted successfully.',
              icon: 'success',
              background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
              color: document.documentElement.classList.contains('dark') ? '#fff' : '#1f2937',
            });
          }
        } catch (error) {
          console.error(error);
          toast.error('Failed to delete ticket');
        }
      }
    });
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <Loading />;

  // Count stats
  const pendingCount = tickets.filter(t => t.verificationStatus === 'pending').length;
  const approvedCount = tickets.filter(t => t.verificationStatus === 'approved').length;
  const rejectedCount = tickets.filter(t => t.verificationStatus === 'rejected').length;

  return (
    <>
      <Helmet>
        <title>Manage Tickets | TicketBari Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FaTicketAlt className="text-primary" /> 
            Manage Tickets
          </h1>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <span className="text-yellow-700 dark:text-yellow-400 font-bold">{pendingCount}</span>
              <span className="text-yellow-600 dark:text-yellow-500 text-sm ml-1">Pending</span>
            </div>
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <span className="text-green-700 dark:text-green-400 font-bold">{approvedCount}</span>
              <span className="text-green-600 dark:text-green-500 text-sm ml-1">Approved</span>
            </div>
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <span className="text-red-700 dark:text-red-400 font-bold">{rejectedCount}</span>
              <span className="text-red-600 dark:text-red-500 text-sm ml-1">Rejected</span>
            </div>
          </div>
        </div>

        {/* No Tickets */}
        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
            <FaTicketAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">No tickets found</h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">Tickets will appear here when vendors add them.</p>
          </div>
        ) : (
          /* Tickets List */
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {tickets.map((ticket) => (
              <div 
                key={ticket._id} 
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
                  ticket.verificationStatus === 'pending' 
                    ? 'border-yellow-200 dark:border-yellow-800' 
                    : ticket.verificationStatus === 'approved'
                    ? 'border-green-200 dark:border-green-800'
                    : 'border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative lg:w-48 h-48 lg:h-auto flex-shrink-0">
                    <img 
                      src={ticket.image} 
                      alt={ticket.title} 
                      className="w-full h-full object-cover"
                    />
                    {/* Transport Type Badge */}
                    <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                      {getTransportIcon(ticket.transportType)}
                      <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                        {ticket.transportType}
                      </span>
                    </div>
                    {/* Advertised Badge */}
                    {ticket.isAdvertised && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaBullhorn /> Ads
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      {/* Title & Status */}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          by <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.vendorName}</span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-400">{ticket.vendorEmail}</span>
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize self-start ${getStatusBadge(ticket.verificationStatus)}`}>
                        {ticket.verificationStatus}
                      </span>
                    </div>

                    {/* Route Info */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.fromLocation}</span>
                      </div>
                      <HiArrowNarrowRight className="text-gray-400 text-xl" />
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.toLocation}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">৳{ticket.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaChair className="text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400">{ticket.ticketQuantity} seats</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <FaCalendarAlt className="text-purple-500" />
                        <span className="text-gray-600 dark:text-gray-400">{formatDate(ticket.departureDateTime)}</span>
                      </div>
                    </div>

                    {/* Perks */}
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ticket.perks.map((perk, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-lg"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {/* Approve Button */}
                      <button 
                        onClick={() => handleStatus(ticket._id, 'approved')}
                        disabled={ticket.verificationStatus === 'approved'}
                        className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 transition-all"
                        title="Approve Ticket"
                      >
                        <FaCheck /> Approve
                      </button>
                      
                      {/* Reject Button */}
                      <button 
                        onClick={() => handleStatus(ticket._id, 'rejected')}
                        disabled={ticket.verificationStatus === 'rejected'}
                        className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/50 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 transition-all"
                        title="Reject Ticket"
                      >
                        <FaTimes /> Reject
                      </button>

                      {/* Advertise Button (only for approved tickets) */}
                      {ticket.verificationStatus === 'approved' && (
                        <button 
                          onClick={() => handleAdvertise(ticket._id, ticket.isAdvertised)}
                          className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
                            ticket.isAdvertised 
                              ? 'bg-orange-500 text-white hover:bg-orange-600' 
                              : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
                          }`}
                          title={ticket.isAdvertised ? 'Remove from Ads' : 'Add to Ads'}
                        >
                          <FaBullhorn /> {ticket.isAdvertised ? 'Remove Ads' : 'Advertise'}
                        </button>
                      )}

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(ticket._id, ticket.title)}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 font-medium flex items-center gap-2 transition-all ml-auto"
                        title="Delete Ticket"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Created At Footer */}
                <div className="px-6 py-2 bg-gray-50 dark:bg-gray-700/30 text-xs text-gray-500 dark:text-gray-400">
                  Created: {formatDate(ticket.createdAt)}
                  {ticket.verifiedAt && ` • Verified: ${formatDate(ticket.verifiedAt)}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageTickets;