import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { FaBus, FaTrain, FaShip, FaPlane, FaArrowRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  const slides = [
    {
      id: 1,
      title: "Travel Across Bangladesh",
      subtitle: "Book Your Journey Today",
      description: "Experience seamless ticket booking for Bus, Train, Launch & Flight.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200",
      color: "from-orange-600 to-red-600",
    },
    {
      id: 2,
      title: "Rail Your Way",
      subtitle: "Comfortable Train Journeys",
      description: "Book train tickets instantly. Enjoy scenic routes across the country.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: 3,
      title: "Sail in Style",
      subtitle: "Launch & Ferry Services",
      description: "Explore riverine Bangladesh with our premium launch booking service.",
      image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200",
      color: "from-teal-600 to-cyan-600",
    },
  ];

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl text-white"
                >
                  <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${slide.color} text-sm font-medium mb-4`}>
                    {slide.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg text-gray-200 mb-8">{slide.description}</p>
                  <Link to="/all-tickets">
                    <button className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${slide.color} text-white font-semibold rounded-xl hover:scale-105 transition-transform`}>
                      Book Now <FaArrowRight />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Transport Icons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-4">
        {[
          { icon: FaBus, label: 'Bus', color: 'bg-orange-500' },
          { icon: FaTrain, label: 'Train', color: 'bg-blue-500' },
          { icon: FaShip, label: 'Launch', color: 'bg-teal-500' },
          { icon: FaPlane, label: 'Flight', color: 'bg-purple-500' },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-4 py-2 ${item.color} text-white rounded-full cursor-pointer hover:scale-110 transition-transform`}
          >
            <item.icon />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;