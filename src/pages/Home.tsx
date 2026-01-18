import React from 'react';
import { Link } from 'react-router-dom';
import { FaFish, FaHome, FaCalendarAlt, FaStar } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        ></div>
        
        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Carp Fishing Experience</h1>
          <p className="text-xl md:text-2xl mb-8">Luxury accommodation with exclusive lake hire</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Book Your Stay
            </Link>
            <Link to="/accommodation" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              View Accommodation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">Experience the ultimate in carp fishing with our premium facilities and services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="text-primary text-4xl mb-4">
                <FaFish />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Fish Stock</h3>
              <p className="text-textSecondary mb-4">Our lake is home to trophy carp, with fish weighing over 30lbs regularly caught.</p>
              <Link to="/stock" className="text-primary hover:underline">View our stock</Link>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="text-primary text-4xl mb-4">
                <FaHome />
              </div>
              <h3 className="text-xl font-bold mb-3">Luxury Accommodation</h3>
              <p className="text-textSecondary mb-4">Comfortable and well-appointed lodges with stunning lake views and modern amenities.</p>
              <Link to="/accommodation" className="text-primary hover:underline">View accommodation</Link>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="text-primary text-4xl mb-4">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Lake Hire</h3>
              <p className="text-textSecondary mb-4">Private lake access for the ultimate fishing experience with no crowds.</p>
              <Link to="/lake" className="text-primary hover:underline">Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Visitors Say</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">Hear from our satisfied customers about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-background p-6 rounded-lg border border-border">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-textSecondary mb-4 italic">
                  "The best carp fishing experience I've ever had. The lake is pristine and the staff are incredibly helpful."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-bold">John Smith</h4>
                    <p className="text-textSecondary text-sm">Regular Visitor</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Fishing Adventure?</h2>
          <p className="text-textSecondary max-w-2xl mx-auto mb-8">
            Book your stay today and experience the ultimate in carp fishing with luxury accommodation.
          </p>
          <Link to="/book" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
