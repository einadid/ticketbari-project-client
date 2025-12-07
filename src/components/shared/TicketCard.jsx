import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaTrain, FaShip, FaPlane, FaMapMarkerAlt, FaClock, FaArrowRight, FaCheck } from 'react-icons/fa';

const TicketCard = ({ ticket, index = 0 }) => {
  const { _id, title, image, fromLocation, toLocation, transportType, price, ticketQuantity, perks = [] } = ticket;

  // Transport Config (Solid Colors, No Gradient)
  const transportConfig = {
    bus: { icon: FaBus, bgColor: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-600' },
    train: { icon: FaTrain, bgColor: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
    launch: { icon: FaShip, bgColor: 'bg-teal-500', lightBg: 'bg-teal-50', textColor: 'text-teal-600' },
    plane: { icon: FaPlane, bgColor: 'bg-violet-500', lightBg: 'bg-violet-50', textColor: 'text-violet-600' },
  };

  const config = transportConfig[transportType] || transportConfig.bus;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="card-hover group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Transport Badge */}
          <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bgColor} text-white text-xs font-semibold shadow-sm`}>
            <Icon size={12} />
            <span className="capitalize">{transportType}</span>
          </div>

          {/* Price */}
          <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-lg font-bold text-slate-800 dark:text-white">৳{price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {/* Route */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
            <FaMapMarkerAlt className={config.textColor} size={12} />
            <span>{fromLocation}</span>
            <FaArrowRight size={10} className="text-slate-400" />
            <span>{toLocation}</span>
          </div>

          {/* Seats */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <FaClock size={12} />
            <span>{ticketQuantity} seats available</span>
          </div>

          {/* Perks */}
          {perks.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {perks.slice(0, 3).map((perk, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-md"
                >
                  <FaCheck size={8} />
                  {perk}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1" />

          {/* Button */}
          <Link to={`/ticket/${_id}`}>
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${config.bgColor} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}>
              <span>View Details</span>
              <FaArrowRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;