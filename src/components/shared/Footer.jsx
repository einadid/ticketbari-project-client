// src/components/shared/Footer.jsx
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
  FaHeadset,
  FaArrowRight,
  FaGooglePlay,
  FaApple
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
    ],
    services: [
      { name: 'Bus Tickets', path: '/bus', icon: FaBus },
      { name: 'Train Tickets', path: '/train', icon: FaTrain },
      { name: 'Launch Tickets', path: '/launch', icon: FaShip },
      { name: 'Flight Tickets', path: '/flight', icon: FaPlane }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: FaTwitter, color: 'hover:bg-sky-500', label: 'Twitter' },
    { icon: FaInstagram, color: 'hover:bg-pink-600', label: 'Instagram' },
    { icon: FaYoutube, color: 'hover:bg-red-600', label: 'YouTube' }
  ];

  const paymentMethods = [
    { Icon: FaCcVisa, name: 'Visa' },
    { Icon: FaCcMastercard, name: 'Mastercard' },
    { Icon: FaCcStripe, name: 'Stripe' },
    { Icon: FaCcPaypal, name: 'PayPal' }
  ];

  // Floating travel icons configuration
  const floatingIcons = [
    { Icon: FaPlane, delay: 0, duration: 25, x: '5%', y: '10%', size: 'text-4xl md:text-6xl' },
    { Icon: FaBus, delay: 5, duration: 28, x: '85%', y: '20%', size: 'text-3xl md:text-5xl' },
    { Icon: FaTrain, delay: 10, duration: 22, x: '10%', y: '75%', size: 'text-3xl md:text-5xl' },
    { Icon: FaShip, delay: 15, duration: 26, x: '80%', y: '70%', size: 'text-4xl md:text-6xl' },
    { Icon: FaTicketAlt, delay: 3, duration: 24, x: '45%', y: '35%', size: 'text-3xl md:text-5xl' },
  ];

  // Footer Logo Component (inline)
  const FooterLogo = () => (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Animated Icon Container */}
      <motion.div
        className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/40"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10 text-white">
          <FaBus className="text-xl sm:text-2xl" />
        </div>
      </motion.div>

      {/* Text Logo - Fixed for dark background */}
      <div className="flex flex-col -space-y-1">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
          Ticket<span className="text-blue-400">Bari</span>
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
          Book Your Journey
        </span>
      </div>
    </Link>
  );

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-gray-300 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="travel-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#travel-pattern)" />
        </svg>
      </div>

      {/* Floating Travel Icons - Hidden on very small screens */}
      <div className="hidden sm:block">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/[0.03]"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <item.Icon className={item.size} />
          </motion.div>
        ))}
      </div>

      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        
        {/* Top Section - Logo & Newsletter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 pb-12 border-b border-white/10">
          {/* Logo & Description - Using inline FooterLogo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            {/* Footer Logo */}
            <FooterLogo />
            
            <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              🚌 Your trusted travel partner for seamless journey booking. 
              Book bus, train, launch & flight tickets easily across Bangladesh.
            </p>
          </motion.div>

          {/* Newsletter - Full width on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-auto lg:min-w-[400px]"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Subscribe Newsletter</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Get travel deals & updates</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-gray-500 transition-all text-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-lg shadow-blue-500/25 font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  Subscribe
                  <FaArrowRight className="text-xs" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="col-span-1"
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-blue-400 transition-colors group text-sm sm:text-base"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-all">
                      <link.icon className="text-xs sm:text-sm" />
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-1"
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-orange-400 transition-colors group text-sm sm:text-base"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-orange-600/20 transition-all">
                      <link.icon className="text-xs sm:text-sm" />
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Support Links */}
            <h4 className="text-sm sm:text-base font-semibold text-white mt-6 mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-purple-500 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 3 }}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-xs sm:text-sm"
                  >
                    <span className="w-1 h-1 bg-purple-500/50 rounded-full"></span>
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
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-span-2 sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-green-500 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <motion.li 
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-3 sm:p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-0.5">Our Office</p>
                  <p className="text-gray-400 text-xs sm:text-sm">123 Travel Street, Dhaka</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Bangladesh - 1205</p>
                </div>
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-3 sm:p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaPhone className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-0.5">Call Us</p>
                  <p className="text-gray-400 text-xs sm:text-sm">+880 1234-567890</p>
                  <p className="text-gray-400 text-xs sm:text-sm">+880 9876-543210</p>
                </div>
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-3 sm:p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-0.5">Email Us</p>
                  <p className="text-gray-400 text-xs sm:text-sm">support@ticketbari.com</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 4: Payment & App */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-2 sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Payment Methods
            </h3>
            
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
              {paymentMethods.map((payment, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-center"
                >
                  <payment.Icon className="text-2xl sm:text-3xl text-white" />
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-6">
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 ${social.color} flex items-center justify-center transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-white text-sm sm:text-base" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Download App */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <FaTicketAlt className="text-white text-xl sm:text-2xl" />
                <div>
                  <p className="text-white font-bold text-sm">Download App</p>
                  <p className="text-white/80 text-xs">Coming Soon!</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-black/20 hover:bg-black/30 rounded-lg py-2 px-3 transition-colors"
                >
                  <FaGooglePlay className="text-white text-sm" />
                  <span className="text-white text-xs font-medium">Play Store</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-black/20 hover:bg-black/30 rounded-lg py-2 px-3 transition-colors"
                >
                  <FaApple className="text-white text-sm" />
                  <span className="text-white text-xs font-medium">App Store</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { text: '🔒 Secure Payment', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
              { text: '✓ Verified Partner', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
              { text: '⚡ Instant Booking', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
              { text: '🎯 Best Prices', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
              { text: '🌟 24/7 Support', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full sm:rounded-xl border ${badge.color} text-[10px] sm:text-xs font-semibold backdrop-blur-sm whitespace-nowrap`}
              >
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center sm:text-left text-xs sm:text-sm flex flex-wrap items-center justify-center sm:justify-start gap-1"
            >
              <span className="text-lg sm:text-xl">🎫</span>
              <span>© {currentYear}</span>
              <span className="text-white font-bold">Ticket</span>
              <span className="text-blue-400 font-bold">Bari</span>
              <span className="hidden xs:inline">. All rights reserved.</span>
              <span className="hidden md:inline text-gray-500">| Made with ❤️ in Bangladesh</span>
            </motion.p>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {[
                { name: 'Terms', path: '/terms' },
                { name: 'Privacy', path: '/privacy' },
                { name: 'Cookies', path: '/cookies' }
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;