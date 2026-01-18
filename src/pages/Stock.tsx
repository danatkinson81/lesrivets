import React from 'react';
import { supabase } from '../lib/supabaseClient';

const Stock: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fish Stock</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Discover the premium carp fish stock in our lake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Premium Fish Stock</h2>
            <p className="text-textSecondary mb-4">
              Our lake is home to trophy carp, with fish regularly exceeding 30lbs. 
              We maintain a carefully managed fish population to ensure the best 
              possible fishing experience for our guests.
            </p>
            <p className="text-textSecondary mb-4">
              Our fish stock includes a variety of sizes and ages, from young carp 
              to mature trophy fish. We regularly stock our lake with premium 
              quality fish to maintain the health and diversity of our population.
            </p>
            <p className="text-textSecondary">
              All our fish are carefully selected and maintained to ensure the 
              highest standards of health and quality for our guests.
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
            <h3 className="text-xl font-bold mb-3">Trophy Carp</h3>
            <p className="text-textSecondary">
              Fish regularly exceeding 30lbs
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Stocked Fish</h3>
            <p className="text-textSecondary">
              Regular stocking program for health
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Diverse Population</h3>
            <p className="text-textSecondary">
              Variety of sizes and ages
            </p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Stock Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Breeding Program</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Controlled breeding for quality fish</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Genetic diversity maintained</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Regular health monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Seasonal breeding cycles</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Stocking Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Quality fish from trusted suppliers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Health certificates required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Gradual acclimation process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Regular population monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Stock Statistics</h2>
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
            Book Your Fishing Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stock;
