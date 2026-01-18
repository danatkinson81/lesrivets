import React from 'react';
import { supabase } from '../lib/supabaseClient';

const Rules: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rules & Regulations</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Please read our fishing and venue rules to ensure a safe and enjoyable experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Fishing Rules</h2>
            <p className="text-textSecondary mb-4">
              Our fishing rules are designed to ensure the health of our fish population and 
              provide the best possible experience for all guests. Please read and follow these 
              guidelines during your stay.
            </p>
            <p className="text-textSecondary mb-4">
              We take the sustainability of our lake seriously and ask all guests to comply 
              with our regulations to maintain the quality of our fishing environment.
            </p>
            <p className="text-textSecondary">
              Any violations of these rules may result in immediate removal from the venue.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4 text-primary">Fishing Regulations</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Maximum catch per person: 3 carp per day</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Minimum size limit: 20lbs</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Use only approved bait types</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>No night fishing permitted</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Proper disposal of fishing waste</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4 text-primary">Venue Rules</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Quiet hours: 10pm - 8am</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>No smoking in accommodation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Respect wildlife and natural habitat</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Follow all posted safety guidelines</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Report any incidents to staff immediately</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Safety Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Water Safety</h3>
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
              <h3 className="text-xl font-bold mb-4">Fishing Safety</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Use appropriate tackle for fish size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Proper handling of fishing equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Follow local fishing regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Report any safety concerns to staff</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Important Information</h2>
          <div className="bg-surface p-8 rounded-lg border border-border max-w-3xl mx-auto">
            <p className="text-textSecondary mb-4">
              These rules are in place to protect both our guests and the environment. 
              We reserve the right to modify or update these rules as necessary to 
              maintain the quality and safety of our venue.
            </p>
            <p className="text-textSecondary">
              If you have any questions about our rules or regulations, please contact 
              our staff during your stay. We're here to help ensure you have a memorable 
              and safe experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
