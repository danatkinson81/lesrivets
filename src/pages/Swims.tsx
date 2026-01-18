import React from 'react';
import { supabase } from '../lib/supabaseClient';

const Swims: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Swims</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Discover the swimming opportunities available at our premium fishing lake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Lake Swimming</h2>
            <p className="text-textSecondary mb-4">
              Our pristine 12-acre lake offers excellent swimming opportunities for guests. 
              The water is crystal clear and maintained to the highest standards for safe swimming.
            </p>
            <p className="text-textSecondary mb-4">
              The lake features gentle slopes and shallow areas perfect for families with children, 
              while deeper sections provide an ideal spot for experienced swimmers.
            </p>
            <p className="text-textSecondary">
              Swimming is available during daylight hours and is subject to weather conditions. 
              Life guards are on duty during peak periods.
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
            <h3 className="text-xl font-bold mb-3">Shallow Areas</h3>
            <p className="text-textSecondary">
              Gentle slopes perfect for families with children
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Deep Water</h3>
            <p className="text-textSecondary">
              Ideal for experienced swimmers and water sports
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Safety</h3>
            <p className="text-textSecondary">
              Life guards on duty during peak periods
            </p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Swimming Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Safety Rules</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Swimming only in designated areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Life guards on duty during peak periods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Swimming not permitted in poor weather</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Children must be supervised at all times</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Facilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Changing rooms and showers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Shower facilities with hot water</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Lockers available for storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>First aid facilities on site</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Swimming Statistics</h2>
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
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <p className="text-textSecondary">Swimming Areas</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-textSecondary">Access</p>
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Book Your Swim Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swims;
