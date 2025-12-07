import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaExchangeAlt, FaBus, FaTrain, FaShip, FaPlane } from 'react-icons/fa';

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
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = fromLocation || toLocation;
    navigate(`/all-tickets?search=${searchQuery}&transportType=${transportType}`);
  };

  return (
    <section className="relative -mt-20 z-30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
          {/* Transport Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {transportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setTransportType(type.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  transportType === type.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200'
                }`}
              >
                {type.icon && <type.icon />}
                {type.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  placeholder="From City"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center items-center">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaExchangeAlt />
              </button>
            </div>

            <div className="md:col-span-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type="text"
                  placeholder="To City"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-secondary focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <button
  type="submit"
  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg
    bg-primary-600 hover:bg-primary-700 text-white"
>
  <FaSearch />
  Search Tickets
</button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchBox;