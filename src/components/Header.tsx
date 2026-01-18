import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Lake', path: '/lake' },
    { name: 'Swims', path: '/swims' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Rules', path: '/rules' },
    { name: 'Stock', path: '/stock' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Bait', path: '/bait' },
    { name: 'Bait Boat Hire', path: '/bait-boat-hire' },
    { name: 'Book', path: '/book' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Availability', path: '/admin/availability' },
    { name: 'Add-ons', path: '/admin/addons' },
    { name: 'Gallery', path: '/admin/gallery' },
    { name: 'Content', path: '/admin/content' },
    { name: 'Settings', path: '/admin/settings' },
    { name: 'Help', path: '/admin/help' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="bg-primary text-white px-3 py-1 rounded mr-2">CFL</span>
          Carp Fishing Lake
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary font-medium' : ''}`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          
          {user && (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm">
                <FaUser className="text-primary" />
                <span>Admin</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {adminItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-error/10 transition-colors flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-xl"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface absolute top-full left-0 right-0 menu-mobile">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`py-2 hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary font-medium' : ''}`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {user && (
              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium mb-2">Admin Menu</div>
                {adminItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="block py-2 hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left py-2 hover:text-error transition-colors flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
