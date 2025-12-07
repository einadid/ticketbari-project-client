import { Helmet } from 'react-helmet-async';
import HeroBanner from '../../components/home/HeroBanner';
import SearchBox from '../../components/home/SearchBox';
import Stats from '../../components/home/Stats';
import AdvertisedTickets from '../../components/home/AdvertisedTickets';
import LatestTickets from '../../components/home/LatestTickets';
import PopularRoutes from '../../components/home/PopularRoutes';
import WhyChooseUs from '../../components/home/WhyChooseUs';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>TicketBari | Book Bus, Train, Launch & Flight Tickets</title>
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Search Box */}
        <SearchBox />

        {/* Stats */}
        <Stats />

        {/* Advertised Tickets - Server থেকে data আসলে দেখাবে */}
        <AdvertisedTickets />

        {/* Latest Tickets */}
        <LatestTickets />

        {/* Popular Routes */}
        <PopularRoutes />

        {/* Why Choose Us */}
        <WhyChooseUs />
      </div>
    </>
  );
};

export default Home;