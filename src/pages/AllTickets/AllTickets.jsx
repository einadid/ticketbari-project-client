import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaTimes,
  FaTicketAlt,
  FaRoute,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { HiLocationMarker, HiArrowNarrowRight } from 'react-icons/hi';
import { FaExchangeAlt } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TicketCard from '../../components/shared/TicketCard';

const AllTickets = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams] = useSearchParams();
  
  // States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [fromCity, setFromCity] = useState(searchParams.get('from') || '');
  const [toCity, setToCity] = useState(searchParams.get('to') || '');
  const [transportType, setTransportType] = useState(searchParams.get('transportType') || 'all');
  const [sortPrice, setSortPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const limit = 9;

  // Popular cities for suggestions
  const popularCities = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 
    "Cox's Bazar", 'Comilla', 'Rangpur', 'Barisal', 'Mymensingh'
  ];

  // URL Params থেকে initial state সেট করা
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const typeParam = searchParams.get('transportType');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (searchParam) setSearch(searchParam);
    if (typeParam) setTransportType(typeParam);
    if (fromParam) setFromCity(fromParam);
    if (toParam) setToCity(toParam);
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSortDropdown(false);
    if (showSortDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSortDropdown]);

  // Swap cities
  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Fetch tickets with all filters
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allTickets', search, fromCity, toCity, transportType, sortPrice, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (fromCity) params.append('from', fromCity);
      if (toCity) params.append('to', toCity);
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
  const totalTickets = data?.total || 0;

  const transportTypes = [
    { value: 'all', label: 'All', icon: FaTicketAlt },
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
    setFromCity('');
    setToCity('');
    setTransportType('all');
    setSortPrice('');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || fromCity || toCity || transportType !== 'all' || sortPrice;
  const activeFiltersCount = [search, fromCity, toCity, transportType !== 'all', sortPrice].filter(Boolean).length;

  return (
    <>
      <Helmet>
        <title>All Tickets | TicketBari - Your Travel Partner</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="travel-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" className="text-blue-600"/>
                <path d="M0 50h100M50 0v100" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#travel-pattern)"/>
          </svg>
        </div>

        <div className="relative z-10 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section - Stats সরানো হয়েছে */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 sm:mb-10"
            >
              {/* Logo */}
              <motion.div 
                className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <FaBus className="text-lg sm:text-2xl text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  <span className="text-slate-800 dark:text-white">Ticket</span>
                  <span className="text-blue-600 dark:text-blue-400">Bari</span>
                </h1>
              </motion.div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-2 sm:mb-4 px-2">
                Find Your Perfect
                <span className="block text-blue-600 dark:text-blue-400 mt-1 sm:mt-2">Journey Today</span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
                Book buses, trains, launches & flights with ease.
              </p>
            </motion.div>

            {/* Main Search & Filter Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/10 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-10 border border-white/20 dark:border-slate-700/50"
            >
              {/* From - To City Selection */}
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4 mb-4 sm:mb-6">
                {/* From City */}
                <div className="lg:col-span-5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    <HiLocationMarker className="inline mr-1 sm:mr-2 text-green-500" />
                    From
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Departure city..."
                      value={fromCity}
                      onChange={(e) => {
                        setFromCity(e.target.value);
                        setCurrentPage(1);
                      }}
                      list="fromCities"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:shadow-md transition-all text-base sm:text-lg font-medium placeholder:text-slate-400"
                    />
                    <datalist id="fromCities">
                      {popularCities.map(city => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                    {fromCity && (
                      <button
                        onClick={() => {
                          setFromCity('');
                          setCurrentPage(1);
                        }}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full text-slate-400 transition-colors"
                      >
                        <FaTimes className="text-xs sm:text-sm" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Swap Button */}
                <div className="lg:col-span-2 flex items-center justify-center py-1 lg:py-0 lg:pb-2 lg:items-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: 180 }}
                    onClick={swapCities}
                    className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all rotate-90 lg:rotate-0"
                  >
                    <FaExchangeAlt className="text-base sm:text-xl" />
                  </motion.button>
                </div>

                {/* To City */}
                <div className="lg:col-span-5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    <HiLocationMarker className="inline mr-1 sm:mr-2 text-red-500" />
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Destination city..."
                      value={toCity}
                      onChange={(e) => {
                        setToCity(e.target.value);
                        setCurrentPage(1);
                      }}
                      list="toCities"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:shadow-md transition-all text-base sm:text-lg font-medium placeholder:text-slate-400"
                    />
                    <datalist id="toCities">
                      {popularCities.map(city => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                    {toCity && (
                      <button
                        onClick={() => {
                          setToCity('');
                          setCurrentPage(1);
                        }}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full text-slate-400 transition-colors"
                      >
                        <FaTimes className="text-xs sm:text-sm" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick City Selection */}
              {(!fromCity || !toCity) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 sm:mb-6"
                >
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">Popular:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {popularCities.slice(0, 6).map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          if (!fromCity) {
                            setFromCity(city);
                          } else if (!toCity) {
                            setToCity(city);
                          }
                          setCurrentPage(1);
                        }}
                        className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Selected Route Display */}
              {fromCity && toCity && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg">
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="truncate max-w-[80px] sm:max-w-none">{fromCity}</span>
                    </span>
                    <HiArrowNarrowRight className="text-xl sm:text-2xl text-blue-500 flex-shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span className="truncate max-w-[80px] sm:max-w-none">{toCity}</span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-4 sm:mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-lg" />
                  <input
                    type="text"
                    placeholder="Search route, operator..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 sm:pl-14 pr-24 sm:pr-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:shadow-md transition-all text-sm sm:text-lg placeholder:text-slate-400"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  >
                    <FaSearch className="text-xs sm:text-sm" />
                    <span className="hidden xs:inline">Search</span>
                  </motion.button>
                </div>
              </form>

              {/* Transport Type Selection */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <FaRoute className="text-blue-500" />
                  Transport Type
                </p>
                
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible pb-2 sm:pb-0">
                  <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 min-w-max sm:min-w-0">
                    {transportTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setTransportType(type.value);
                          setCurrentPage(1);
                        }}
                        className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl font-semibold transition-all min-w-[70px] sm:min-w-0 ${
                          transportType === type.value
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                          transportType === type.value 
                            ? 'bg-white/20' 
                            : 'bg-white dark:bg-slate-600 shadow-md'
                        }`}>
                          <type.icon className={`text-base sm:text-xl ${
                            transportType === type.value ? 'text-white' : 'text-blue-500'
                          }`} />
                        </div>
                        <span className="text-[10px] sm:text-sm">{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort & Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Mobile: Sort Dropdown */}
                <div className="relative sm:hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSortDropdown(!showSortDropdown);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <FaSortAmountDown className="text-blue-500" />
                      {sortPrice === 'lowToHigh' ? 'Price: Low to High' : 
                       sortPrice === 'highToLow' ? 'Price: High to Low' : 
                       'Sort by Price'}
                    </span>
                    <FaChevronDown className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                      >
                        <button
                          onClick={() => {
                            setSortPrice('');
                            setShowSortDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${!sortPrice ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''}`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => {
                            setSortPrice('lowToHigh');
                            setShowSortDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 ${sortPrice === 'lowToHigh' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''}`}
                        >
                          <FaSortAmountUp /> Price: Low to High
                        </button>
                        <button
                          onClick={() => {
                            setSortPrice('highToLow');
                            setShowSortDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 ${sortPrice === 'highToLow' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''}`}
                        >
                          <FaSortAmountDown /> Price: High to Low
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop: Sort Options */}
                <div className="hidden sm:flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Sort:</span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSortPrice(sortPrice === 'lowToHigh' ? '' : 'lowToHigh')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        sortPrice === 'lowToHigh'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <FaSortAmountUp /> Low → High
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSortPrice(sortPrice === 'highToLow' ? '' : 'highToLow')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        sortPrice === 'highToLow'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <FaSortAmountDown /> High → Low
                    </motion.button>
                  </div>
                </div>

                {/* Reset Filters */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all w-full sm:w-auto"
                    >
                      <FaTimes /> Clear Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Results Count */}
            {!isLoading && tickets.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 sm:mb-6 px-1"
              >
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Showing <span className="font-bold text-slate-800 dark:text-white">{tickets.length}</span> of{' '}
                  <span className="font-bold text-slate-800 dark:text-white">{totalTickets}</span> tickets
                  {(fromCity || toCity) && (
                    <span className="block sm:inline sm:ml-2 text-xs sm:text-sm mt-1 sm:mt-0">
                      {fromCity && toCity ? `(${fromCity} → ${toCity})` : fromCity ? `(from ${fromCity})` : `(to ${toCity})`}
                    </span>
                  )}
                </p>
              </motion.div>
            )}

            {/* Results Section */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-[350px] sm:h-[420px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl animate-pulse overflow-hidden"
                  >
                    <div className="h-36 sm:h-48 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="h-5 sm:h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3"></div>
                      <div className="h-10 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-full mt-4"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : tickets.length > 0 ? (
              <>
                {/* Tickets Grid */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TicketCard ticket={ticket} index={index} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-slate-700 dark:text-slate-300 shadow-lg"
                    >
                      <FaChevronLeft className="sm:hidden" />
                      <span className="hidden sm:inline">← Previous</span>
                    </motion.button>
                    
                    <div className="flex gap-1.5 sm:gap-2">
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        const showOnMobile = Math.abs(pageNum - currentPage) <= 1 || pageNum === 1 || pageNum === totalPages;
                        
                        return (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all ${
                              !showOnMobile ? 'hidden sm:flex' : 'flex'
                            } items-center justify-center ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                                : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-slate-700 dark:text-slate-300 shadow-lg"
                    >
                      <FaChevronRight className="sm:hidden" />
                      <span className="hidden sm:inline">Next →</span>
                    </motion.button>
                  </motion.div>
                )}

                {totalPages > 1 && (
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 sm:hidden">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 sm:py-20 px-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50"
              >
                <motion.div 
                  className="w-20 h-20 sm:w-32 sm:h-32 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaTicketAlt className="text-4xl sm:text-6xl text-slate-300 dark:text-slate-500" />
                </motion.div>
                <h3 className="text-xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
                  No Tickets Found
                </h3>
                <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 sm:mb-8">
                  Try adjusting your filters or search for a different route.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
                >
                  <FaTimes /> Clear All Filters
                </motion.button>
              </motion.div>
            )}

            {/* Travel Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 sm:mt-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/20"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <FaStar className="text-white text-sm sm:text-base" />
                </div>
                Travel Tips
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: FaClock, title: 'Book Early', desc: 'Book at least 3 days in advance for best prices' },
                  { icon: FaShieldAlt, title: 'Secure Payment', desc: 'All transactions are encrypted' },
                  { icon: FaTicketAlt, title: 'E-Ticket', desc: 'Show digital ticket on your phone' },
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl sm:rounded-2xl"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <tip.icon className="text-base sm:text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white mb-0.5 sm:mb-1">{tip.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTickets;