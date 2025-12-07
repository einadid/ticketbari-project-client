import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaTimes,
  FaTicketAlt
} from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TicketCard from '../../components/shared/TicketCard';
import SectionTitle from '../../components/shared/SectionTitle';

const AllTickets = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams] = useSearchParams();
  
  // States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [transportType, setTransportType] = useState(searchParams.get('transportType') || 'all');
  const [sortPrice, setSortPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // URL Params থেকে initial state সেট করা (Home page থেকে search করে আসলে)
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const typeParam = searchParams.get('transportType');
    if (searchParam) setSearch(searchParam);
    if (typeParam) setTransportType(typeParam);
  }, [searchParams]);

  // Fetch tickets with all filters
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allTickets', search, transportType, sortPrice, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (transportType !== 'all') params.append('transportType', transportType);
      if (sortPrice) params.append('sortPrice', sortPrice);
      params.append('page', currentPage);
      params.append('limit', limit);

      const res = await axiosPublic.get(`/tickets?${params.toString()}`);
      return res.data;
    }
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  const transportTypes = [
    { value: 'all', label: 'All', icon: null },
    { value: 'bus', label: 'Bus', icon: FaBus },
    { value: 'train', label: 'Train', icon: FaTrain },
    { value: 'launch', label: 'Launch', icon: FaShip },
    { value: 'plane', label: 'Flight', icon: FaPlane },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const clearFilters = () => {
    setSearch('');
    setTransportType('all');
    setSortPrice('');
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>All Tickets | TicketBari</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SectionTitle 
            heading="Find Your Journey" 
            subHeading="Explore the best deals across Bangladesh"
          />

          {/* Controls Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 sticky top-20 z-20 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative group">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search location (e.g., Dhaka, Cox's Bazar)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-primary focus:outline-none transition-all"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-400 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </form>

              {/* Filters & Sort */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Transport Type */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                  {transportTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setTransportType(type.value);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                        transportType === type.value
                          ? 'bg-primary text-white shadow-md shadow-primary/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.icon && <type.icon />}
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Sort Button */}
                <button
                  onClick={() => setSortPrice(prev => 
                    prev === 'lowToHigh' ? 'highToLow' : prev === 'highToLow' ? '' : 'lowToHigh'
                  )}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all min-w-[140px] justify-center ${
                    sortPrice
                      ? 'bg-secondary text-white shadow-md shadow-secondary/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {sortPrice === 'lowToHigh' ? (
                    <><FaSortAmountUp /> Price: Low-High</>
                  ) : sortPrice === 'highToLow' ? (
                    <><FaSortAmountDown /> Price: High-Low</>
                  ) : (
                    <><FaFilter /> Sort by Price</>
                  )}
                </button>

                {/* Reset Button */}
                {(search || transportType !== 'all' || sortPrice) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-all"
                  >
                    <FaTimes /> Reset
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : tickets.length > 0 ? (
            <>
              {/* Tickets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {tickets.map((ticket, index) => (
                  <TicketCard key={ticket._id} ticket={ticket} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === i + 1
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-gray-800 border dark:border-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Results Found */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTicketAlt className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Tickets Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any tickets matching your criteria. Try changing your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTickets;