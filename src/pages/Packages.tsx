import React from 'react';
import { Link } from 'react-router-dom';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
}

const Packages: React.FC = () => {
  const packages: Package[] = [
    {
      id: 1,
      name: "Weekend Getaway",
      description: "Perfect for a quick break with family or friends",
      price: 250,
      duration: "2 nights",
      features: [
        "2-night stay in luxury lodge",
        "Full breakfast included",
        "Access to 100+ carp",
        "Fishing equipment provided",
        "Free parking"
      ],
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "Weekend Warrior",
      description: "Ideal for serious anglers wanting to maximize their time",
      price: 350,
      duration: "2 nights",
      features: [
        "2-night stay in luxury lodge",
        "Full breakfast included",
        "Access to 100+ carp",
        "Fishing equipment provided",
        "Free parking",
        "Exclusive fishing area",
        "Fish counting service"
      ],
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Weekend Luxury",
      description: "The ultimate fishing experience with premium amenities",
      price: 500,
      duration: "2 nights",
      features: [
        "2-night stay in luxury lodge",
        "Full breakfast included",
        "Access to 100+ carp",
        "Fishing equipment provided",
        "Free parking",
        "Exclusive fishing area",
        "Fish counting service",
        "Personal fishing guide",
        "Evening meal included"
      ],
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      name: "Weeklong Adventure",
      description: "Extended stay for serious fishing enthusiasts",
      price: 800,
      duration: "7 nights",
      features: [
        "7-night stay in luxury lodge",
        "Full breakfast included",
        "Access to 100+ carp",
        "Fishing equipment provided",
        "Free parking",
        "Exclusive fishing area",
        "Fish counting service",
        "Personal fishing guide",
        "Evening meals included",
        "Weekly fish reports"
      ],
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Fishing Packages</h1>
        <p className="text-textSecondary max-w-2xl mx-auto">
          Choose from our range of packages designed to suit every fishing enthusiast's needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
            <img 
              src={pkg.image} 
              alt={pkg.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <span className="text-2xl font-bold text-primary">£{pkg.price}</span>
              </div>
              <p className="text-textSecondary mb-4">{pkg.description}</p>
              <p className="text-sm text-textSecondary mb-4">{pkg.duration}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-textSecondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/booking" 
                className="block w-full text-center bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl p-8 border border-border">
        <h2 className="text-2xl font-bold mb-4">Package Inclusions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">What's Included</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Access to our 100+ carp lake</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Full breakfast included</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Fishing equipment provided</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Free parking</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Special Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Exclusive fishing areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Weekly fish counting service</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Personal fishing guides</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Evening meals included</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
