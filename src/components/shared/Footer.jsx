import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBus, 
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
  FaCcPaypal
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'All Tickets', path: '/all-tickets' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' }
    ],
    support: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Refund Policy', path: '/refund' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                <FaBus className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Ticket<span className="text-primary">Bari</span>
                </h2>
                <p className="text-sm text-gray-400">Book Your Journey</p>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Book bus, train, launch & flight tickets easily. Your trusted travel partner for seamless journey booking experience.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaFacebook, color: 'hover:bg-blue-600' },
                { icon: FaTwitter, color: 'hover:bg-sky-500' },
                { icon: FaInstagram, color: 'hover:bg-pink-600' },
                { icon: FaYoutube, color: 'hover:bg-red-600' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center transition-colors ${social.color}`}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <p className="text-gray-400">123 Travel Street, Dhaka</p>
                  <p className="text-gray-400">Bangladesh - 1205</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <p className="text-gray-400">+880 1234-567890</p>
                  <p className="text-gray-400">+880 9876-543210</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-primary" />
                </div>
                <p className="text-gray-400">support@ticketbari.com</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Payment Methods
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full -mb-2"></span>
            </h3>
            <p className="text-gray-400 mb-4">We accept all major payment methods</p>
            <div className="grid grid-cols-2 gap-3">
              {[FaCcVisa, FaCcMastercard, FaCcStripe, FaCcPaypal].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-xl p-3 flex items-center justify-center"
                >
                  <Icon className="text-3xl text-gray-400" />
                </motion.div>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary text-white"
                />
                <button className="px-4 py-3 bg-primary text-white rounded-r-xl hover:bg-orange-600 transition-colors">
                  <FaEnvelope />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} <span className="text-primary">TicketBari</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;