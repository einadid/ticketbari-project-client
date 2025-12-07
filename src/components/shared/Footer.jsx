import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBus, 
  FaTrain,
  FaPlane,
  FaShip,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
  FaCcPaypal,
  FaTicketAlt,
  FaMapMarkedAlt,
  FaHeadset
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/', icon: FaMapMarkedAlt },
      { name: 'All Tickets', path: '/all-tickets', icon: FaTicketAlt },
      { name: 'About Us', path: '/about', icon: FaBus },
      { name: 'Contact Us', path: '/contact', icon: FaHeadset }
    ],
    support: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Refund Policy', path: '/refund' }
    ]
  };

  // Floating travel icons configuration
  const floatingIcons = [
    { Icon: FaPlane, delay: 0, duration: 25, x: '10%', y: '15%', color: 'text-blue-400/20' },
    { Icon: FaBus, delay: 5, duration: 28, x: '80%', y: '25%', color: 'text-orange-400/20' },
    { Icon: FaTrain, delay: 10, duration: 22, x: '15%', y: '70%', color: 'text-indigo-400/20' },
    { Icon: FaShip, delay: 15, duration: 26, x: '75%', y: '65%', color: 'text-sky-400/20' },
    { Icon: FaTicketAlt, delay: 3, duration: 24, x: '50%', y: '40%', color: 'text-purple-400/20' },
    { Icon: FaPlane, delay: 8, duration: 27, x: '90%', y: '80%', color: 'text-blue-300/15', rotate: true },
  ];

  return (
    <footer className="relative bg-slate-900 text-gray-300 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="travel-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-blue-400" />
              <circle cx="75" cy="75" r="2" fill="currentColor" className="text-orange-400" />
              <path d="M50 10 L60 30 L40 30 Z" fill="currentColor" className="text-indigo-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#travel-pattern)" />
        </svg>
      </div>

      {/* Floating Travel Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -30, 0],
            rotate: item.rotate ? [0, 10, -10, 0] : 0,
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon className="text-6xl" />
        </motion.div>
      ))}

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30"
              >
                <FaBus className="text-white text-2xl" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Ticket<span className="text-blue-400">Bari</span>
                </h2>
                <p className="text-sm text-gray-400">Book Your Journey</p>
              </div>
            </Link>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
              <p className="text-gray-300 leading-relaxed">
                🚌 Book bus, train, launch & flight tickets easily. Your trusted travel partner for seamless journey booking experience across Bangladesh.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: FaFacebook, color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
                  { icon: FaTwitter, color: 'bg-sky-500', hoverColor: 'hover:bg-sky-600' },
                  { icon: FaInstagram, color: 'bg-pink-600', hoverColor: 'hover:bg-pink-700' },
                  { icon: FaYoutube, color: 'bg-red-600', hoverColor: 'hover:bg-red-700' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl ${social.color} ${social.hoverColor} flex items-center justify-center transition-all shadow-lg`}
                  >
                    <social.icon className="text-white text-lg" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600 rounded-full -mb-3"></span>
            </h3>
            <ul className="space-y-3 mt-8">
              {footerLinks.quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-md">
                      <link.icon className="text-sm" />
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Support Links */}
            <h4 className="text-lg font-semibold text-white mt-8 mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500 rounded-full -mb-3"></span>
            </h3>
            <ul className="space-y-5 mt-8">
              <motion.li 
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Our Office</p>
                  <p className="text-gray-400 text-sm">123 Travel Street, Dhaka</p>
                  <p className="text-gray-400 text-sm">Bangladesh - 1205</p>
                </div>
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaPhone className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Call Us</p>
                  <p className="text-gray-400 text-sm">+880 1234-567890</p>
                  <p className="text-gray-400 text-sm">+880 9876-543210</p>
                </div>
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email Us</p>
                  <p className="text-gray-400 text-sm">support@ticketbari.com</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 4: Payment & Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Payment Methods
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-indigo-600 rounded-full -mb-3"></span>
            </h3>
            <p className="text-gray-400 mb-5 mt-8">We accept all major payment methods for your convenience</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { Icon: FaCcVisa, color: 'bg-blue-600' },
                { Icon: FaCcMastercard, color: 'bg-orange-500' },
                { Icon: FaCcStripe, color: 'bg-indigo-600' },
                { Icon: FaCcPaypal, color: 'bg-sky-600' }
              ].map((payment, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex items-center justify-center shadow-lg"
                >
                  <payment.Icon className="text-4xl text-white" />
                </motion.div>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <h4 className="text-white font-bold">Newsletter</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">Get travel deals & updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 focus:outline-none focus:border-blue-500 text-white placeholder:text-gray-500 transition-all shadow-md"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xl shadow-blue-500/30 font-medium"
                >
                  <FaEnvelope />
                </motion.button>
              </div>
            </div>

            {/* Download App Section */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-5 bg-orange-500 rounded-2xl p-5 shadow-xl text-center"
            >
              <FaTicketAlt className="text-white text-3xl mx-auto mb-2" />
              <p className="text-white font-bold text-sm">Download Our App</p>
              <p className="text-white/80 text-xs mt-1">Coming Soon!</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center md:text-left flex items-center gap-2"
            >
              <span className="text-2xl">🎫</span>
              © {currentYear} <span className="text-blue-400 font-bold">TicketBari</span>. All rights reserved.
              <span className="hidden md:inline">| Made with ❤️ in Bangladesh</span>
            </motion.p>
            
            <div className="flex items-center gap-6">
              {[
                { name: 'Terms', path: '/terms' },
                { name: 'Privacy', path: '/privacy' },
                { name: 'Cookies', path: '/cookies' }
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-white/5"
          >
            {[
              { text: '🔒 Secure Payment', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
              { text: '✓ Verified Partner', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
              { text: '⚡ Instant Booking', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
              { text: '🎯 Best Prices', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-xl border ${badge.color} text-xs font-semibold backdrop-blur-sm`}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;