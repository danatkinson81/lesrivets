import React from 'react';
import { FaFishingRod, FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Our Lake</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Discover the history, vision, and unique features that make our carp fishing lake a premier destination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-textSecondary mb-4">
              Founded in 2005, our carp fishing lake has grown from a small private pond to one of the most sought-after destinations in the region. 
              Our passion for carp fishing and commitment to excellence has made us a premier location for anglers of all levels.
            </p>
            <p className="text-textSecondary mb-4">
              With over 18 years of experience, we've perfected the art of creating the perfect fishing environment while maintaining 
              the natural beauty of our surroundings. Our lake is home to trophy carp, with fish regularly exceeding 30lbs.
            </p>
            <p className="text-textSecondary">
              We pride ourselves on providing exceptional service, pristine fishing conditions, and luxury accommodation that 
              allows our guests to fully enjoy their fishing experience.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface p-8 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaFishingRod />
            </div>
            <h3 className="text-xl font-bold mb-3">Premium Fishing</h3>
            <p className="text-textSecondary">
              Our lake is stocked with trophy carp and other species, providing exceptional fishing opportunities for all skill levels.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-bold mb-3">Prime Location</h3>
            <p className="text-textSecondary">
              Situated in the heart of the Lake District, our location offers stunning scenery and peaceful surroundings.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaCalendarAlt />
            </div>
            <h3 className="text-xl font-bold mb-3">Year-Round Access</h3>
            <p className="text-textSecondary">
              Open all year round, our lake provides excellent fishing conditions in every season.
            </p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
          <p className="text-textSecondary mb-4">
            Our vision is to be the premier destination for carp fishing enthusiasts, combining exceptional fishing 
            opportunities with luxury accommodation and outstanding service. We aim to create a sustainable 
            environment where both fish and anglers can thrive.
          </p>
          <p className="text-textSecondary">
            We're committed to maintaining the highest standards of environmental stewardship while providing 
            unforgettable fishing experiences for our guests.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">What Our Visitors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-textSecondary mb-4 italic">
                "The best fishing experience I've ever had. The staff are incredibly knowledgeable and helpful."
              </p>
              <p className="font-bold">Sarah Johnson</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-textSecondary mb-4 italic">
                "The accommodation is luxurious and the lake is pristine. Will definitely be coming back!"
              </p>
              <p className="font-bold">Michael Thompson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
