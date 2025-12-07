import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaBus, FaTrain, FaShip, FaPlane, FaArrowRight, FaSearch } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroBanner = () => {
  const slides = [
    {
      id: 1,
      title: "Your Journey Starts Here",
      subtitle: "Book Tickets Easily",
      description: "Find and book bus, train, launch & flight tickets at the best prices. Fast, secure, and hassle-free.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200",
      accent: "bg-amber-500",
    },
    {
      id: 2,
      title: "Travel Across Bangladesh",
      subtitle: "Explore Beautiful Destinations",
      description: "Discover amazing routes and travel comfortably to your favorite destinations.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200",
      accent: "bg-blue-500",
    },
    {
      id: 3,
      title: "Best Prices Guaranteed",
      subtitle: "Save More, Travel More",
      description: "Compare prices across multiple operators and get the best deals every time.",
      image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200",
      accent: "bg-teal-500",
    },
  ];

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-slate-900/60" />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl text-white"
                >
                  <span className={`inline-block px-4 py-2 rounded-full ${slide.accent} text-white text-sm font-semibold mb-6`}>
                    {slide.subtitle}
                  </span>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/all-tickets">
                      <button className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg">
                        <FaSearch />
                        Find Tickets
                      </button>
                    </Link>
                    <Link to="/all-tickets">
                      <button className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-colors">
                        Explore Routes
                        <FaArrowRight />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Transport Quick Links */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-3">
        {[
          { icon: FaBus, label: 'Bus', color: 'bg-amber-500 hover:bg-amber-600' },
          { icon: FaTrain, label: 'Train', color: 'bg-blue-500 hover:bg-blue-600' },
          { icon: FaShip, label: 'Launch', color: 'bg-teal-500 hover:bg-teal-600' },
          { icon: FaPlane, label: 'Flight', color: 'bg-violet-500 hover:bg-violet-600' },
        ].map((item) => (
          <Link key={item.label} to={`/all-tickets?transportType=${item.label.toLowerCase()}`}>
            <button className={`flex items-center gap-2 px-5 py-2.5 ${item.color} text-white rounded-full text-sm font-medium shadow-lg transition-colors`}>
              <item.icon />
              {item.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Custom Styles */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 5px;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;