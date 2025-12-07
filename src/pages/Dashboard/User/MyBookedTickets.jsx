import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FaTicketAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCreditCard, 
  FaHourglassHalf,
  FaCheckCircle,
  FaBan,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane
} from 'react-icons/fa';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['myBookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-bold">Departure Time Passed</span>;
    }
    return (
      <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>My Booked Tickets | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaTicketAlt className="text-primary" /> My Booked Tickets
        </h1>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, index) => (
              <BookingCard 
                key={booking._id} 
                booking={booking} 
                index={index} 
                renderer={renderer} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTicketAlt className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No Tickets Booked Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't booked any tickets yet. Start your journey today!
            </p>
            <Link to="/all-tickets">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors">
                Book a Ticket
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const BookingCard = ({ booking, index, renderer }) => {
  const {
    ticketTitle,
    ticketImage,
    fromLocation,
    toLocation,
    departureDateTime,
    bookingQuantity,
    totalPrice,
    status
  } = booking;

  const departureDate = new Date(departureDateTime);
  const isExpired = new Date() > departureDate;

  // Status Badge Logic
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><FaHourglassHalf /> Pending</span>;
      case 'accepted':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><FaCheckCircle /> Accepted</span>;
      case 'paid':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><FaCheckCircle /> Paid</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><FaBan /> Rejected</span>;
      case 'cancelled':
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><FaBan /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      {/* Header Image */}
      <div className="relative h-40">
        <img src={ticketImage} alt={ticketTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-4 right-4">
          {getStatusBadge(status)}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg line-clamp-1">{ticketTitle}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Locations */}
        <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt className="text-primary" />
          <span className="font-medium">{fromLocation} → {toLocation}</span>
        </div>

        {/* Time & Countdown */}
        <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaClock /> Departure:
            </span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {format(departureDate, 'dd MMM, hh:mm a')}
            </span>
          </div>
          
          {/* Show countdown only if not expired and not rejected */}
          {!isExpired && status !== 'rejected' && status !== 'cancelled' && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Time Left:</span>
              <Countdown date={departureDate} renderer={renderer} />
            </div>
          )}
        </div>

        {/* Price & Quantity */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
            <p className="font-bold text-gray-800 dark:text-white">{bookingQuantity} Seats</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Price</p>
            <p className="font-bold text-xl text-primary">৳{totalPrice}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {status === 'accepted' && !isExpired ? (
            <Link to={`/dashboard/payment/${booking._id}`}>
              <button className="w-full py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 
    bg-primary-600 hover:bg-primary-700 text-white">
    <FaCreditCard /> Pay Now
  </button>
            </Link>
          ) : status === 'paid' ? (
            <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl cursor-default flex items-center justify-center gap-2 opacity-80">
              <FaCheckCircle /> Payment Completed
            </button>
          ) : status === 'pending' ? (
            <button disabled className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold rounded-xl cursor-not-allowed">
              Waiting for Approval
            </button>
          ) : (
            <button disabled className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold rounded-xl cursor-not-allowed">
              {isExpired ? 'Expired' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyBookedTickets;