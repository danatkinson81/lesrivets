import React from 'react';
import { FaWater, FaFish, FaTree, FaSun } from 'react-icons/fa';

const Lake: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The Lake</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Discover the pristine waters where trophy carp are regularly caught
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Premium Lake</h2>
            <p className="text-textSecondary mb-4">
              Our 12-acre lake is carefully maintained to provide the perfect environment for carp fishing. 
              With depths reaching 8 feet and a variety of underwater structures, our lake offers excellent 
              fishing opportunities for anglers of all skill levels.
            </p>
            <p className="text-textSecondary mb-4">
              The lake is stocked with premium carp, with fish regularly exceeding 30lbs. 
              We maintain strict fishing regulations to ensure the health and sustainability of our fish population.
            </p>
            <p className="text-textSecondary">
              Whether you're a seasoned angler or new to carp fishing, our lake provides an exceptional 
              fishing experience with stunning scenery and peaceful surroundings.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaWater />
            </div>
            <h3 className="text-xl font-bold mb-3">Water Quality</h3>
            <p className="text-textSecondary">Crystal clear waters with excellent oxygen levels</p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaFish />
            </div>
            <h3 className="text-xl font-bold mb-3">Fish Stock</h3>
            <p className="text-textSecondary">Premium carp with trophy fish regularly caught</p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaTree />
            </div>
            <h3 className="text-xl font-bold mb-3">Natural Habitat</h3>
            <p className="text-textSecondary">Rich underwater vegetation and structures</p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <FaSun />
            </div>
            <h3 className="text-xl font-bold mb-3">Seasonal Access</h3>
            <p className="text-textSecondary">Open year-round for optimal fishing</p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Lake Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fishing Zones</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Deep water areas for large carp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Shallow areas for smaller fish</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Underwater structures for feeding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Spawning areas for breeding fish</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Lake Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Regular water quality testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Vegetation control and maintenance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Stocking programs for sustainable fish population</span>
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
          <h2 className="text-2xl font-bold mb-6">Lake Statistics</h2>
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
            Book Your Lake Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lake;
