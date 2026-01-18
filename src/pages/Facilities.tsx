import React from 'react';
import { supabase } from '../lib/supabaseClient';

const Facilities: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Facilities</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Discover the premium facilities available at our carp fishing lake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Premium Facilities</h2>
            <p className="text-textSecondary mb-4">
              Our lake offers a range of premium facilities designed to provide the ultimate 
              fishing and relaxation experience for our guests. From comfortable accommodation 
              to state-of-the-art fishing equipment, we've thoughtfully designed every aspect 
              of our venue.
            </p>
            <p className="text-textSecondary mb-4">
              Whether you're planning a solo fishing trip, a family holiday, or a romantic getaway, 
              our facilities are designed to meet your needs and exceed your expectations.
            </p>
            <p className="text-textSecondary">
              All our facilities are maintained to the highest standards to ensure your comfort 
              and safety throughout your stay.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fishing Equipment</h3>
            <p className="text-textSecondary">
              High-quality rods, reels, and tackle for all skill levels
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Bait Shop</h3>
            <p className="text-textSecondary">
              Fresh and frozen bait for all fishing needs
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Bait Boat</h3>
            <p className="text-textSecondary">
              Access to our fleet of bait boats for lake access
            </p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Facility Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Accommodation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Spacious and comfortable lodges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Modern amenities and facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Private decks with lake views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Free WiFi and parking</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Fishing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Expert fishing guides available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Equipment rental and sales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Private lake access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Seasonal feeding programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Facility Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <p className="text-textSecondary">Acres</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <p className="text-textSecondary">Feet Deep</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <p className="text-textSecondary">Lbs Average</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-textSecondary">Fish Stocked</p>
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Book Your Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
