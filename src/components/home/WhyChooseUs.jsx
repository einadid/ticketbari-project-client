import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaHeadset, FaWallet } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    { icon: FaShieldAlt, title: 'Secure Booking', description: '100% secure payments with SSL encryption.', color: 'from-blue-500 to-indigo-500' },
    { icon: FaClock, title: 'Instant Confirmation', description: 'Get instant booking confirmation via email.', color: 'from-green-500 to-teal-500' },
    { icon: FaHeadset, title: '24/7 Support', description: 'Our support team is always ready to help.', color: 'from-purple-500 to-pink-500' },
    { icon: FaWallet, title: 'Best Prices', description: 'We guarantee the best prices always.', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            ⭐ Why TicketBari?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Why Travelers Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;