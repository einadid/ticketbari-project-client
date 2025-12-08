import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaBus, 
  FaTrain, 
  FaShip, 
  FaPlane,
  FaCheckCircle,
  FaTicketAlt,
  FaChair
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/shared/Loading';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Ticket Details
  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  const {
    title,
    image,
    fromLocation,
    toLocation,
    transportType,
    price,
    ticketQuantity,
    departureDateTime,
    perks = [],
    vendorEmail,
    vendorName
  } = ticket;

  // Icons Configuration
  const transportIcons = {
    bus: FaBus,
    train: FaTrain,
    launch: FaShip,
    plane: FaPlane,
  };
  const Icon = transportIcons[transportType] || FaBus;

  // Check valid conditions
  const departureDate = new Date(departureDateTime);
  const isExpired = new Date() > departureDate;
  const isSoldOut = ticketQuantity === 0;
  const maxBooking = Math.min(5, ticketQuantity); // Max 5 tickets per booking

  // Handle Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (user?.email === vendorEmail) {
      return toast.error("Vendor cannot book their own ticket!");
    }

    const bookingData = {
      ticketId: id,
      ticketTitle: title,
      ticketImage: image,
      fromLocation,
      toLocation,
      departureDateTime,
      unitPrice: price,
      bookingQuantity: parseInt(bookingQuantity),
      totalPrice: price * parseInt(bookingQuantity),
      userEmail: user.email,
      userName: user.displayName,
      vendorEmail,
      status: 'pending'
    };

    try {
      await axiosSecure.post('/bookings', bookingData);
      toast.success('Booking requested successfully!');
      setIsModalOpen(false);
      navigate('/dashboard/my-booked-tickets');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} | TicketDetails</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Image */}
            <div className="relative h-64 md:h-96">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary rounded-full text-sm font-bold capitalize flex items-center gap-2">
                    <Icon /> {transportType}
                  </span>
                  {isExpired && <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold">Expired</span>}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-lg">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{fromLocation}</span>
                  <span>→</span>
                  <span>{toLocation}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Details Column */}
                <div className="md:col-span-2 space-y-6">
                  {/* Journey Info */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                      <FaClock className="text-primary" /> Journey Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Departure Date</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {format(departureDate, 'dd MMMM yyyy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {format(departureDate, 'hh:mm a')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vendor</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{vendorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Available Seats</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{ticketQuantity}</p>
                      </div>
                    </div>
                  </div>

                  {/* Perks */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Perks & Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                      {perks.map((perk, index) => (
                        <span key={index} className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium flex items-center gap-2">
                          <FaCheckCircle /> {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="md:col-span-1">
                  <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl p-6 sticky top-24 shadow-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price per person</p>
                    <div className="text-4xl font-bold text-primary mb-6">৳{price}</div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Status</span>
                        {isSoldOut ? (
                          <span className="text-red-500 font-bold">Sold Out</span>
                        ) : (
                          <span className="text-green-500 font-bold">Available</span>
                        )}
                      </div>

                      <button
  onClick={() => setIsModalOpen(true)}
  disabled={isExpired || isSoldOut || ticketQuantity === 0}
  className="
    w-full py-4 rounded-xl font-bold shadow-lg
    transition-all transform hover:scale-[1.02]

    /* Light + Dark safe */
    bg-primary-600 hover:bg-primary-700 text-white

    /* Disabled state */
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  {isExpired ? 'Expired' : isSoldOut ? 'Sold Out' : 'Book Now'}
</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Confirm Booking</h2>
            
            <form onSubmit={handleBooking}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Seats
                </label>
                <div className="flex items-center gap-4">
                  <FaChair className="text-2xl text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max={maxBooking}
                    value={bookingQuantity}
                    onChange={(e) => setBookingQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-transparent text-lg font-bold focus:border-primary focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Maximum {maxBooking} seats allowed per booking</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6">
                <div className="flex justify-between mb-2">
                  <span>Unit Price</span>
                  <span>৳{price}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span>Total Amount</span>
                  <span className="text-primary">৳{price * bookingQuantity}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
  type="submit"
  className="
    flex-1 py-3 rounded-xl font-bold
    transition-all

    bg-primary-600 hover:bg-primary-700 text-white
  "
>
  Confirm
</button>

              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TicketDetails;