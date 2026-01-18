import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Admin: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data for bookings
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '07700 900123',
        date: '2023-06-15',
        time: '10:00',
        guests: 2,
        package: 'Premium Package',
        amount: '£75',
        status: 'pending',
        specialRequests: 'Please provide fishing equipment'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '07700 900456',
        date: '2023-06-16',
        time: '14:00',
        guests: 4,
        package: 'Luxury Package',
        amount: '£120',
        status: 'confirmed',
        specialRequests: 'Vegetarian lunch required'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '07700 900789',
        date: '2023-06-17',
        time: '09:00',
        guests: 1,
        package: 'Basic Package',
        amount: '£45',
        status: 'cancelled',
        specialRequests: 'None'
      }
    ];
    
    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const updateBookingStatus = (id: number, status: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => 
    activeTab === 'all' || booking.status === activeTab
  );

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-textSecondary">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Manage bookings and view lake information
          </p>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'pending' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'confirmed' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'cancelled' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
              }`}
            >
              Cancelled
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Package</th>
                  <th className="text-left py-3 px-4">Guests</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-surface/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FaUser className="text-primary mr-2" />
                        <span>{booking.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-primary mr-2" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{booking.package}</td>
                    <td className="py-3 px-4">{booking.guests}</td>
                    <td className="py-3 px-4">{booking.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' 
                          ? 'bg-success/20 text-success' 
                          : booking.status === 'pending' 
                            ? 'bg-warning/20 text-warning' 
                            : 'bg-error/20 text-error'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {booking.status !== 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="p-2 text-success hover:bg-success/20 rounded-full"
                            title="Confirm"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="p-2 text-error hover:bg-error/20 rounded-full"
                            title="Cancel"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-textSecondary">No bookings found.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4">Total Bookings</h3>
            <p className="text-3xl font-bold text-primary">{bookings.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4">Pending</h3>
            <p className="text-3xl font-bold text-warning">{bookings.filter(b => b.status === 'pending').length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4">Confirmed</h3>
            <p className="text-3xl font-bold text-success">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6">Lake Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Current Stock</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Common Carp</span>
                  <span>45 fish</span>
                </li>
                <li className="flex justify-between">
                  <span>Mirror Carp</span>
                  <span>32 fish</span>
                </li>
                <li className="flex justify-between">
                  <span>Koi Carp</span>
                  <span>15 fish</span>
                </li>
                <li className="flex justify-between">
                  <span>Bighead Carp</span>
                  <span>28 fish</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Family Fishing Weekend</span>
                  <span>June 22-24</span>
                </li>
                <li className="flex justify-between">
                  <span>Annual Carp Competition</span>
                  <span>July 15</span>
                </li>
                <li className="flex justify-between">
                  <span>Summer Workshop</span>
                  <span>August 5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
