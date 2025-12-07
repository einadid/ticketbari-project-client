import { Helmet } from 'react-helmet-async';

const MyBookedTickets = () => {
  return (
    <>
      <Helmet>
        <title>My Booked Tickets | TicketBari</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          My Booked Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
      </div>
    </>
  );
};

export default MyBookedTickets;