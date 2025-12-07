import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaBullhorn } from 'react-icons/fa';
import SectionTitle from '../shared/SectionTitle';
import TicketCard from '../shared/TicketCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AdvertisedTickets = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ['advertisedTickets'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tickets/advertised');
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
    console.error('Advertised Tickets Error:', error);
    return null;
  }

  // যদি কোনো advertised ticket না থাকে, section দেখাবে না
  if (tickets.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            <FaBullhorn /> Featured Deals
          </motion.div>
          <SectionTitle heading="Hot Deals & Offers" subHeading="Don't miss out" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <TicketCard key={ticket._id} ticket={ticket} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisedTickets;