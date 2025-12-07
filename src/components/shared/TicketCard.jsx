import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBus, 
  FaTrain, 
  FaShip, 
  FaPlane, 
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa';
import { format } from 'date-fns';

const TicketCard = ({ ticket, index = 0 }) => {
  const {
    _id,
    title,
    image,
    fromLocation,
    toLocation,
    transportType,
    price,
    ticketQuantity,
    departureDateTime,
    perks = []
  } = ticket;

  // Transport type icon ও color
  const transportConfig = {
    bus: { icon: FaBus, color: 'bg-orange-500', gradient: 'from-orange-500 to-red-500' },
    train: { icon: FaTrain, color: 'bg-blue-500', gradient: 'from-blue-500 to-indigo-500' },
    launch: { icon: FaShip, color: 'bg-teal-500', gradient: 'from-teal-500 to-cyan-500' },
    plane: { icon: FaPlane, color: 'bg-purple-500', gradient: 'from-purple-500 to-pink-500' },
  };

  const config = transportConfig[transportType] || transportConfig.bus;
  const TransportIcon = config.icon;

  // Format date
  const formattedDate = departureDateTime 
    ? format(new Date(departureDateTime), 'dd MMM yyyy, hh:mm a')
    : 'TBA';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Transport Type Badge */}
          <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color} text-white text-sm font-medium`}>
            <TransportIcon />
            <span className="capitalize">{transportType}</span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-lg font-bold text-primary">৳{price}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">/seat</span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Route on Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <span className="font-medium">{fromLocation}</span>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed border-white/50 relative">
              <TransportIcon className="absolute left-1/2 -translate-x-1/2 -top-2 bg-black/50 rounded-full p-1 text-lg" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{toLocation}</span>
              <FaMapMarkerAlt className="text-secondary" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Departure Time */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaClock className="text-primary" />
              <span className="text-sm">{formattedDate}</span>
            </div>

            {/* Available Seats */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaTicketAlt className="text-secondary" />
              <span className="text-sm">{ticketQuantity} seats left</span>
            </div>
          </div>

          {/* Perks */}
          {perks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {perks.slice(0, 3).map((perk, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
                >
                  <FaCheck className="text-[10px]" />
                  {perk}
                </span>
              ))}
              {perks.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{perks.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Button */}
          <Link to={`/ticket/${_id}`} className="mt-auto">
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${config.gradient} text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 group/btn`}>
              <span>See Details</span>
              <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;