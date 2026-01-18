import React from 'react';
import { FaBed, FaSwimmingPool, FaWifi, FaUtensils, FaParking, FaMountain } from 'react-icons/fa';

const Accommodation: React.FC = () => {
  const accommodations = [
    {
      id: 1,
      name: "Lakeview Lodge",
      price: "£120",
      description: "Spacious lodge with stunning lake views and modern amenities",
      features: ["2 Bedrooms", "Kitchenette", "Private Deck", "Free WiFi", "Parking"],
      image: "https://images.pexels.com/photos/1029546/pexels-photo-1029546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Carp Cottage",
      price: "£150",
      description: "Cozy cottage perfect for families with private garden",
      features: ["3 Bedrooms", "Full Kitchen", "Garden", "Free WiFi", "Parking"],
      image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Premium Suite",
      price: "£200",
      description: "Luxury suite with jacuzzi and panoramic lake views",
      features: ["2 Bedrooms", "Jacuzzi", "Spa Bath", "Private Terrace", "Free WiFi", "Parking"],
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const features = [
    { icon: <FaBed />, name: "Comfortable Bedrooms" },
    { icon: <FaSwimmingPool />, name: "Swimming Pool" },
    { icon: <FaWifi />, name: "Free WiFi" },
    { icon: <FaUtensils />, name: "Kitchen Facilities" },
    { icon: <FaParking />, name: "Free Parking" },
    { icon: <FaMountain />, name: "Scenic Location" }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Accommodation</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Luxury lodges and cottages designed for the perfect fishing getaway
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Luxury Accommodation</h2>
            <p className="text-textSecondary mb-4">
              Our accommodation options are designed to provide comfort and convenience for your fishing adventure. 
              Each lodge and cottage is thoughtfully furnished with modern amenities while maintaining a warm, 
              welcoming atmosphere.
            </p>
            <p className="text-textSecondary mb-4">
              Whether you're planning a solo fishing trip, a family holiday, or a romantic getaway, 
              we have the perfect accommodation to suit your needs.
            </p>
            <p className="text-textSecondary">
              All our lodges are equipped with everything you need for a comfortable stay, 
              including kitchen facilities, free WiFi, and private parking.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Accommodation Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accommodations.map((acc) => (
              <div key={acc.id} className="bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors">
                <div className="h-48 bg-gray-200 border-2 border-dashed w-full" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{acc.name}</h3>
                    <span className="text-primary font-bold">{acc.price}<span className="text-textSecondary text-sm">/night</span></span>
                  </div>
                  <p className="text-textSecondary mb-4">{acc.description}</p>
                  <ul className="space-y-2 mb-6">
                    {acc.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-textSecondary">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Facilities & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-primary text-3xl mb-3 flex justify-center">
                  {feature.icon}
                </div>
                <p className="text-textSecondary">{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
