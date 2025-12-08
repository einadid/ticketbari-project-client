import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const PopularRoutes = () => {
  const routes = [
    {
      id: 1,
      from: 'Dhaka',
      to: 'Chittagong',
      image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=500',
      transport: ['bus', 'train'],
      price: 'From ৳450',
      duration: '5-6 hours',
    },
    {
      id: 2,
      from: 'Dhaka',
      to: 'Sylhet',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=500',
      transport: ['bus', 'train'],
      price: 'From ৳550',
      duration: '4-5 hours',
    },
    {
      id: 3,
      from: 'Dhaka',
      to: "Cox's Bazar",
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      transport: ['bus', 'plane'],
      price: 'From ৳1200',
      duration: '8-10 hours',
    },
    {
      id: 4,
      from: 'Dhaka',
      to: 'Barishal',
      image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=500',
      transport: ['launch', 'bus'],
      price: 'From ৳800',
      duration: '6-8 hours',
    },
    {
      id: 5,
      from: 'Dhaka',
      to: 'Rajshahi',
      image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      transport: ['bus', 'train', 'plane'],
      price: 'From ৳600',
      duration: '5-6 hours',
    },
    {
      id: 6,
      from: 'Dhaka',
      to: 'Khulna',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500',
      transport: ['bus', 'train'],
      price: 'From ৳500',
      duration: '6-7 hours',
    },
  ];

  const transportIcons = {
    bus: FaBus,
    train: FaTrain,
    plane: FaPlane,
    launch: FaShip,
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            🗺️ Explore Bangladesh
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Popular Routes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most traveled routes across Bangladesh. Book your tickets now and explore!
          </p>
        </motion.div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/all-tickets?search=${route.from}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${route.image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Route */}
                    <div className="flex items-center gap-2 text-white mb-2">
                      <span className="text-xl font-bold">{route.from}</span>
                      <FaArrowRight className="text-primary" />
                      <span className="text-xl font-bold">{route.to}</span>
                    </div>

                    {/* Transport Types */}
                    <div className="flex items-center gap-2 mb-3">
                      {route.transport.map((t) => {
                        const Icon = transportIcons[t];
                        return (
                          <span
                            key={t}
                            className="flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs"
                          >
                            <Icon />
                            <span className="capitalize">{t}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Price & Duration */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-white/80 font-bold text-lg">{route.price}</span>
                      <span className="text-white/80 text-sm">{route.duration}</span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary rounded-2xl transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;