import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { FaBus, FaTrain, FaShip, FaPlane, FaArrowRight } from 'react-icons/fa';

// Swiper CSS import করুন
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Travel Across Bangladesh",
      subtitle: "Book Your Journey Today",
      description: "Experience seamless ticket booking for Bus, Train, Launch & Flight. Best prices guaranteed!",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069",
      icon: FaBus,
      color: "from-orange-600 to-red-600",
      buttonText: "Book Bus Tickets"
    },
    {
      id: 2,
      title: "Rail Your Way",
      subtitle: "Comfortable Train Journeys",
      description: "Book train tickets instantly. Enjoy scenic routes and comfortable travel across the country.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2084",
      icon: FaTrain,
      color: "from-blue-600 to-indigo-600",
      buttonText: "Book Train Tickets"
    },
    {
      id: 3,
      title: "Sail in Style",
      subtitle: "Launch & Ferry Services",
      description: "Explore riverine Bangladesh with our premium launch booking service. Cabins available!",
      image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2044",
      icon: FaShip,
      color: "from-teal-600 to-cyan-600",
      buttonText: "Book Launch Tickets"
    },
    {
      id: 4,
      title: "Fly High",
      subtitle: "Domestic & International Flights",
      description: "Get the best deals on flights. Quick booking, instant confirmation, and 24/7 support.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074",
      icon: FaPlane,
      color: "from-purple-600 to-pink-600",
      buttonText: "Book Flight Tickets"
    }
  ];

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={true}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="max-w-2xl text-white"
                    >
                      {/* Icon Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${slide.color} text-white text-sm font-medium mb-6`}
                      >
                        <slide.icon className="text-lg" />
                        <span>{slide.subtitle}</span>
                      </motion.div>

                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                      >
                        {slide.title}
                      </motion.h1>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Link to="/all-tickets">
                          <button className={`group flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${slide.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                            {slide.buttonText}
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                        <Link to="/all-tickets">
                          <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
                            View All Tickets
                          </button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Transport Type Icons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-4">
        {[
          { icon: FaBus, label: 'Bus', color: 'bg-orange-500' },
          { icon: FaTrain, label: 'Train', color: 'bg-blue-500' },
          { icon: FaShip, label: 'Launch', color: 'bg-teal-500' },
          { icon: FaPlane, label: 'Flight', color: 'bg-purple-500' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className={`flex items-center gap-2 px-4 py-2 ${item.color} text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform`}
          >
            <item.icon />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 40px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(to right, #FF6B35, #004E89);
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;