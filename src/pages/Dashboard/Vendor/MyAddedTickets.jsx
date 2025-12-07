import { Helmet } from 'react-helmet-async';

const MyAddedTickets = () => {
  return (
    <>
      <Helmet>
        <title>My Added Tickets | TicketBari</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          My Added Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
      </div>
    </>
  );
};

export default MyAddedTickets;