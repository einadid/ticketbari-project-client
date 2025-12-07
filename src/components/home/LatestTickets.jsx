import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../shared/SectionTitle';
import TicketCard from '../shared/TicketCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const LatestTickets = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ['latestTickets'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tickets/latest');
      return res.data;
    }
  });

  // data যদি array না হয় তাহলে empty array ব্যবহার করুন
  const tickets = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    console.error('Latest Tickets Error:', error);
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4"
          >
            <FaClock /> Just Added
          </motion.div>
          <SectionTitle heading="Latest Tickets" subHeading="Fresh tickets for you" />
        </div>

        {tickets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tickets.map((ticket, index) => (
                <TicketCard key={ticket._id} ticket={ticket} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/all-tickets">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
                  View All Tickets <FaArrowRight />
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tickets available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;