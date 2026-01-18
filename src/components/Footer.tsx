import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-primary text-white px-2 py-1 rounded mr-2">CFL</span>
              Carp Fishing Lake
            </h3>
            <p className="text-textSecondary mb-4">
              Premium carp fishing experience with luxury accommodation and exclusive lake hire.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-textSecondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-textSecondary hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/accommodation" className="text-textSecondary hover:text-primary transition-colors">Accommodation</Link></li>
              <li><Link to="/lake" className="text-textSecondary hover:text-primary transition-colors">The Lake</Link></li>
              <li><Link to="/book" className="text-textSecondary hover:text-primary transition-colors">Book Now</Link></li>
              <li><Link to="/contact" className="text-textSecondary hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/facilities" className="text-textSecondary hover:text-primary transition-colors">Facilities</Link></li>
              <li><Link to="/rules" className="text-textSecondary hover:text-primary transition-colors">Rules & Regulations</Link></li>
              <li><Link to="/stock" className="text-textSecondary hover:text-primary transition-colors">Fish Stock</Link></li>
              <li><Link to="/gallery" className="text-textSecondary hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/bait" className="text-textSecondary hover:text-primary transition-colors">Bait</Link></li>
              <li><Link to="/bait-boat-hire" className="text-textSecondary hover:text-primary transition-colors">Bait Boat Hire</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-textSecondary">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                <span>123 Fishing Lane, Lake District, UK</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary" />
                <span>+44 1234 567890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary" />
                <span>info@carpfishinglake.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-textSecondary text-sm">
          <p>&copy; {new Date().getFullYear()} Carp Fishing Lake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
