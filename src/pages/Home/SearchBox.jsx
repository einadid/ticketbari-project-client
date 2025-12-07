import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBus, 
  FaTrain, 
  FaShip, 
  FaPlane,
  FaExchangeAlt
} from 'react-icons/fa';

const SearchBox = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [transportType, setTransportType] = useState('all');
  const navigate = useNavigate();

  const transportTypes = [
    { value: 'all', label: 'All', icon: null },
    { value: 'bus', label: 'Bus', icon: FaBus },
    { value: 'train', label: 'Train', icon: FaTrain },
    { value: 'launch', label: 'Launch', icon: FaShip },
    { value: 'plane', label: 'Flight', icon: FaPlane },
  ];

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = fromLocation || toLocation;
    navigate(`/all-tickets?search=${searchQuery}&transportType=${transportType}`);
  };

  return (
    <section className="relative -mt-24 z-30 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
          {/* Transport Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {transportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setTransportType(type.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  transportType === type.value
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type.icon && <type.icon className="text-lg" />}
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* From Location */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />
                  <input
                    type="text"
                    placeholder="Departure City"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary focus:outline-none transition-colors text-lg"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                  <FaExchangeAlt className="text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* To Location */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-lg" />
                  <input
                    type="text"
                    placeholder="Arrival City"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-secondary focus:outline-none transition-colors text-lg"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
                >
                  <FaSearch />
                  <span>Search Tickets</span>
                </button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Popular:</span>
            {['Dhaka → Chittagong', 'Dhaka → Sylhet', 'Dhaka → Cox\'s Bazar'].map((route) => (
              <button
                key={route}
                onClick={() => {
                  const [from, to] = route.split(' → ');
                  setFromLocation(from);
                  setToLocation(to);
                }}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              >
                {route}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchBox;