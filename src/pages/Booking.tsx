import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [packages, setPackages] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [bookingData, setBookingData] = useState({
    packageId: '',
    leadName: '',
    email: '',
    phone: '',
    anglers: 1,
    guests: 1,
    specialRequests: '',
    rulesAgreed: false
  });
  const [bookingReference, setBookingReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Add-ons state
  const [baitProducts, setBaitProducts] = useState<any[]>([]);
  const [baitBundles, setBaitBundles] = useState<any[]>([]);
  const [selectedBait, setSelectedBait] = useState<{[key: string]: number}>({});
  const [baitBundlesSelected, setBaitBundlesSelected] = useState<{[key: string]: boolean}>({});
  const [baitBoatHire, setBaitBoatHire] = useState(false);
  const [baitBoatDays, setBaitBoatDays] = useState<Date[]>([]);
  const [addonsTotal, setAddonsTotal] = useState(0);

  // Fetch packages, availability, and bait data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch packages
        const { data: packagesData, error: packagesError } = await supabase
          .from('booking_packages')
          .select('*')
          .order('created_at', { ascending: true });

        // Fetch availability
        const { data: availabilityData, error: availabilityError } = await supabase
          .from('availability_weeks')
          .select('*')
          .eq('is_available', true)
          .order('week_start', { ascending: true });

        // Fetch bait products
        const { data: baitProductsData, error: baitProductsError } = await supabase
          .from('bait_products')
          .select('*')
          .order('created_at', { ascending: true });

        // Fetch bait bundles
        const { data: baitBundlesData, error: baitBundlesError } = await supabase
          .from('bait_bundles')
          .select('*')
          .order('created_at', { ascending: true });

        if (packagesError) throw packagesError;
        if (availabilityError) throw availabilityError;
        if (baitProductsError) throw baitProductsError;
        if (baitBundlesError) throw baitBundlesError;

        setPackages(packagesData || []);
        setAvailability(availabilityData || []);
        setBaitProducts(baitProductsData || []);
        setBaitBundles(baitBundlesData || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleDate = (date: Date) => {
    setSelectedDates(prev => {
      const isSelected = prev.some(d => d.toDateString() === date.toDateString());
      if (isSelected) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const toggleBaitBoatDay = (date: Date) => {
    setBaitBoatDays(prev => {
      const isSelected = prev.some(d => d.toDateString() === date.toDateString());
      if (isSelected) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const generateBookingReference = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LR-${year}-${randomNum}`;
  };

  const handleBaitQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 0) return;
    setSelectedBait(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleBaitBundleSelect = (bundleId: string) => {
    setBaitBundlesSelected(prev => ({
      ...prev,
      [bundleId]: !prev[bundleId]
    }));
  };

  const calculateAddonsTotal = () => {
    let total = 0;
    
    // Calculate bait products total
    Object.entries(selectedBait).forEach(([productId, quantity]) => {
      const product = baitProducts.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    
    // Calculate bait bundles total
    Object.entries(baitBundlesSelected).forEach(([bundleId, selected]) => {
      if (selected) {
        const bundle = baitBundles.find(b => b.id === bundleId);
        if (bundle && bundle.products) {
          bundle.products.forEach((item: any) => {
            const product = baitProducts.find(p => p.id === item.product_id);
            if (product) {
              total += product.price * item.quantity;
            }
          });
        }
      }
    });
    
    // Calculate bait boat hire total
    if (baitBoatHire) {
      // Assuming £20 per day for bait boat hire
      total += baitBoatDays.length * 20;
    }
    
    setAddonsTotal(total);
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          user_id: (await supabase.auth.getUser()).data.user?.id,
          package_id: bookingData.packageId,
          status: 'awaiting_payment',
          special_requests: bookingData.specialRequests
        }])
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create booking dates
      const datesToInsert = selectedDates.map(date => ({
        booking_id: bookingData.id,
        date: date.toISOString().split('T')[0]
      }));

      const { error: datesError } = await supabase
        .from('booking_dates')
        .insert(datesToInsert);

      if (datesError) throw datesError;

      // Create booking addons
      const addonsToInsert: any[] = [];
      
      // Add bait products
      Object.entries(selectedBait).forEach(([productId, quantity]) => {
        if (quantity > 0) {
          const product = baitProducts.find(p => p.id === productId);
          if (product) {
            addonsToInsert.push({
              booking_id: bookingData.id,
              type: 'bait_product',
              ref_id: productId,
              name_snapshot: product.name,
              unit_label_snapshot: product.category,
              quantity: quantity,
              unit_price_gbp: product.price,
              line_total_gbp: product.price * quantity
            });
          }
        }
      });
      
      // Add bait bundles
      Object.entries(baitBundlesSelected).forEach(([bundleId, selected]) => {
        if (selected) {
          const bundle = baitBundles.find(b => b.id === bundleId);
          if (bundle) {
            addonsToInsert.push({
              booking_id: bookingData.id,
              type: 'bait_bundle',
              ref_id: bundleId,
              name_snapshot: bundle.name,
              unit_label_snapshot: 'Bundle',
              quantity: 1,
              unit_price_gbp: 0, // Will be calculated from bundle products
              line_total_gbp: 0
            });
          }
        }
      });
      
      // Add bait boat hire
      if (baitBoatHire) {
        addonsToInsert.push({
          booking_id: bookingData.id,
          type: 'bait_boat',
          ref_id: null,
          name_snapshot: 'Bait Boat Hire',
          unit_label_snapshot: `${baitBoatDays.length} day${baitBoatDays.length !== 1 ? 's' : ''}`,
          quantity: baitBoatDays.length,
          unit_price_gbp: 20,
          line_total_gbp: baitBoatDays.length * 20
        });
        
        // Create booking bait boat days
        const boatDaysToInsert = baitBoatDays.map(date => ({
          booking_id: bookingData.id,
          date: date.toISOString().split('T')[0]
        }));
        
        const { error: boatDaysError } = await supabase
          .from('booking_bait_boat_days')
          .insert(boatDaysToInsert);
          
        if (boatDaysError) throw boatDaysError;
      }
      
      // Insert addons
      if (addonsToInsert.length > 0) {
        const { error: addonsError } = await supabase
          .from('booking_addons')
          .insert(addonsToInsert);
          
        if (addonsError) throw addonsError;
      }

      // Generate booking reference
      const reference = generateBookingReference();
      setBookingReference(reference);

      // Move to confirmation step
      setStep(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Generate calendar weeks
  const generateCalendarWeeks = () => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay()); // Start from Sunday
    
    for (let i = 0; i < 12; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + (i * 7));
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      weeks.push({
        start: weekStart,
        end: weekEnd,
        isAvailable: availability.some(a => {
          const availStart = new Date(a.week_start);
          const availEnd = new Date(a.week_end);
          return availStart <= weekStart && weekEnd <= availEnd;
        })
      });
    }
    
    return weeks;
  };

  const weeks = generateCalendarWeeks();

  // Calculate total price
  const calculateTotalPrice = () => {
    const packagePrice = packages.find(p => p.id === bookingData.packageId)?.price || 0;
    return packagePrice + addonsTotal;
  };

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-error">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Visit</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Secure your spot at our premium carp fishing lake
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-4 left-0 right-0 h-1 bg-surface z-0"></div>
            <div 
              className={`absolute top-4 left-0 h-1 bg-primary z-10 transition-all duration-500 ${
                step === 1 ? 'w-0' : step === 2 ? 'w-1/4' : step === 3 ? 'w-2/4' : step === 4 ? 'w-3/4' : 'w-full'
              }`}
            ></div>
            
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative z-20">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-primary text-white' : 'bg-surface text-textSecondary border border-border'
                }`}>
                  {num}
                </div>
                <p className="text-center mt-2 text-sm font-medium">
                  {num === 1 ? 'Package' : num === 2 ? 'Dates' : num === 3 ? 'Details' : num === 4 ? 'Add-ons' : 'Confirm'}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg border border-border">
            {/* Step 1: Package Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Select Your Package</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        bookingData.packageId === pkg.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary'
                      }`}
                      onClick={() => setBookingData(prev => ({ ...prev, packageId: pkg.id }))}
                    >
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-primary text-2xl font-bold mb-4">£{pkg.price}</p>
                      <p className="text-textSecondary mb-4">{pkg.description}</p>
                      <p className="text-textSecondary mb-4">Duration: {pkg.duration} hours</p>
                      <div className="flex items-center">
                        <span className="text-textSecondary">Select this package</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!bookingData.packageId}
                    className={`font-bold py-3 px-8 rounded-lg transition-colors ${
                      bookingData.packageId 
                        ? 'bg-primary hover:bg-primary/90 text-white' 
                        : 'bg-surface text-textSecondary cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Select Your Dates</h2>
                
                <p className="text-textSecondary mb-6">
                  Choose the Saturday-to-Saturday week(s) you'd like to book. 
                  Available weeks are shown below.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weeks.map((week, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        week.isAvailable 
                          ? 'border-border hover:border-primary' 
                          : 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
                      } ${
                        selectedDates.some(d => 
                          d >= week.start && d <= week.end
                        ) ? 'border-primary bg-primary/10' : ''
                      }`}
                      onClick={() => week.isAvailable && toggleDate(week.start)}
                    >
                      <div className="text-center">
                        <p className="font-bold">
                          {week.start.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} - 
                          {week.end.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm mt-1">
                          {week.isAvailable ? 'Available' : 'Unavailable'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface hover:bg-surface/80 text-textSecondary font-bold py-3 px-8 rounded-lg border border-border transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={selectedDates.length === 0}
                    className={`font-bold py-3 px-8 rounded-lg transition-colors ${
                      selectedDates.length > 0 
                        ? 'bg-primary hover:bg-primary/90 text-white' 
                        : 'bg-surface text-textSecondary cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Party Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Party Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-textSecondary mb-2">Lead Name *</label>
                    <input
                      type="text"
                      name="leadName"
                      value={bookingData.leadName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter lead name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-textSecondary mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-textSecondary mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-textSecondary mb-2">Number of Anglers *</label>
                    <select
                      name="anglers"
                      value={bookingData.anglers}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Angler' : 'Anglers'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-textSecondary mb-2">Number of Guests *</label>
                    <select
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-textSecondary mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Any special requests or requirements..."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="rulesAgreed"
                    checked={bookingData.rulesAgreed}
                    onChange={handleInputChange}
                    required
                    className="mt-1 mr-3 h-5 w-5 text-primary border-border rounded focus:ring-primary"
                  />
                  <label className="text-textSecondary">
                    I agree to the <a href="/rules" className="text-primary hover:underline">rules and terms</a> of the lake
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface hover:bg-surface/80 text-textSecondary font-bold py-3 px-8 rounded-lg border border-border transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!bookingData.rulesAgreed}
                    className={`font-bold py-3 px-8 rounded-lg transition-colors ${
                      bookingData.rulesAgreed 
                        ? 'bg-primary hover:bg-primary/90 text-white' 
                        : 'bg-surface text-textSecondary cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Add-ons */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Add-ons</h2>
                
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-4">Bait Products</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {baitProducts.map((product) => (
                      <div key={product.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{product.name}</h4>
                            <p className="text-textSecondary text-sm">{product.description}</p>
                            <p className="text-primary font-bold">£{product.price}</p>
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => handleBaitQuantityChange(product.id, Math.max(0, (selectedBait[product.id] || 0) - 1))}
                              className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="mx-2 w-8 text-center">{selectedBait[product.id] || 0}</span>
                            <button
                              type="button"
                              onClick={() => handleBaitQuantityChange(product.id, (selectedBait[product.id] || 0) + 1)}
                              className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Bait Bundles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {baitBundles.map((bundle) => (
                      <div 
                        key={bundle.id} 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          baitBundlesSelected[bundle.id] 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => handleBaitBundleSelect(bundle.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 classNameref={bundle.name}</h4>
                            <p className="text-textSecondary text-sm">{bundle.description}</p>
                            <p className="text-primary font-bold">
                              {bundle.products && bundle.products.length > 0 ? 
                                `Bundle with ${bundle.products.length} products` : 
                                'No products in bundle'
                              }
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">
                              {baitBundlesSelected[bundle.id] ? 'Selected' : 'Select'}
                            </span>
                            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
                              {baitBundlesSelected[bundle.id] && (
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Bait Boat Hire</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="baitBoatHire"
                        checked={baitBoatHire}
                        onChange={(e) => setBaitBoatHire(e.target.checked)}
                        className="mr-3 h-5 w-5 text-primary border-border rounded focus:ring-primary"
                      />
                      <label htmlFor="baitBoatHire" className="text-textSecondary">
                        Add bait boat hire for {baitBoatDays.length} day{baitBoatDays.length !== 1 ? 's' : ''}
                      </label>
                    </div>
                    
                    {baitBoatHire && (
                      <div className="mt-4">
                        <p className="text-textSecondary mb-2">Select days for bait boat hire:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {weeks.map((week, index) => (
                            <div 
                              key={index}
                              className={`border rounded-lg p-2 cursor-pointer transition-all ${
                                baitBoatDays.some(d => 
                                  d >= week.start && d <= week.end
                                ) ? 'border-primary bg-primary/10' : 'border-border'
                              }`}
                              onClick={() => {
                                // Toggle all days in this week
                                const weekDays = [];
                                for (let i = 0; i < 7; i++) {
                                  const day = new Date(week.start);
                                  day.setDate(week.start.getDate() + i);
                                  weekDays.push(day);
                                }
                                
                                const allSelected = weekDays.every(d => 
                                  baitBoatDays.some(bd => bd.toDateString() === d.toDateString())
                                );
                                
                                if (allSelected) {
                                  // Remove all days in this week
                                  setBaitBoatDays(prev => 
                                    prev.filter(d => !weekDays.some(wd => wd.toDateString() === d.toDateString()))
                                  );
                                } else {
                                  // Add all days in this week
                                  const newDays = [...baitBoatDays];
                                  weekDays.forEach(day => {
                                    if (!newDays.some(d => d.toDateString() === day.toDateString())) {
                                      newDays.push(day);
                                    }
                                  });
                                  setBaitBoatDays(newDays);
                                }
                              }}
                            >
                              <div className="text-center">
                                <p className="font-bold">
                                  {week.start.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                                </p>
                                <p className="text-sm">
                                  {week.isAvailable ? 'Available' : 'Unavailable'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-surface p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total Add-ons:</span>
                      <span className="text-primary font-bold">£{addonsTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-surface hover:bg-surface/80 text-textSecondary font-bold py-3 px-8 rounded-lg border border-border transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Booking Confirmed!</h2>
                
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-textSecondary">Booking Reference</p>
                      <p className="font-bold text-primary">{bookingReference}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Package</p>
                      <p className="font-medium">
                        {packages.find(p => p.id === bookingData.packageId)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Lead Name</p>
                      <p className="font-medium">{bookingData.leadName}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Email</p>
                      <p className="font-medium">{bookingData.email}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Phone</p>
                      <p className="font-medium">{bookingData.phone}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Anglers</p>
                      <p className="font-medium">{bookingData.anglers}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Guests</p>
                      <p className="font-medium">{bookingData.guests}</p>
                    </div>
                    <div>
                      <p className="text-textSecondary">Dates</p>
                      <p className="font-medium">
                        {selectedDates.length > 0 
                          ? selectedDates.map(d => d.toLocaleDateString('en-GB')).join(', ')
                          : 'None selected'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Add-ons</h4>
                    <div className="bg-surface p-4 rounded-lg border border-border">
                      {Object.entries(selectedBait).filter(([_, quantity]) => quantity > 0).length > 0 && (
                        <div className="mb-2">
                          <p className="font-bold">Bait Products:</p>
                          {Object.entries(selectedBait)
                            .filter(([_, quantity]) => quantity > 0)
                            .map(([productId, quantity]) => {
                              const product = baitProducts.find(p => p.id === productId);
                              return (
                                <div key={productId} className="flex justify-between">
                                  <span>{product?.name} x{quantity}</span>
                                  <span>£{(product?.price || 0 * quantity).toFixed(2)}</span>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      
                      {Object.entries(baitBundlesSelected).filter(([_, selected]) => selected).length > 0 && (
                        <div className="mb-2">
                          <p className="font-bold">Bait Bundles:</p>
                          {Object.entries(baitBundlesSelected)
                            .filter(([_, selected]) => selected)
                            .map(([bundleId, selected]) => {
                              const bundle = baitBundles.find(b => b.id === bundleId);
                              return (
                                <div key={bundleId} className="flex justify-between">
                                  <span>{bundle?.name}</span>
                                  <span>Bundle</span>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      
                      {baitBoatHire && (
                        <div className="mb-2">
                          <p className="font-bold">Bait Boat Hire:</p>
                          <div className="flex justify-between">
                            <span>{baitBoatDays.length} day{baitBoatDays.length !== 1 ? 's' : ''}</span>
                            <span>£{(baitBoatDays.length * 20).toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t border-border mt-2 pt-2 flex justify-between">
                        <span className="font-bold">Total Add-ons:</span>
                        <span className="font-bold text-primary">£{addonsTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-surface p-4 rounded-lg border border-border">
                    <h4 className="font-bold mb-2">Payment Summary</h4>
                    <div className="flex justify-between mb-1">
                      <span>Package Price:</span>
                      <span>£{packages.find(p => p.id === bookingData.packageId)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Add-ons:</span>
                      <span>£{addonsTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border mt-2 pt-2 flex justify-between">
                      <span className="font-bold">Total Price:</span>
                      <span className="font-bold text-primary">£{calculateTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-surface p-4 rounded-lg border border-border mt-6">
                    <h4 className="font-bold mb-2">Next Steps</h4>
                    <p className="text-textSecondary mb-2">
                      Your booking is now awaiting payment. A confirmation email with payment instructions will be sent to {bookingData.email}.
                    </p>
                    <p className="text-textSecondary">
                      Please complete your payment via bank transfer within 48 hours to secure your booking.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setBookingData({
                        packageId: '',
                        leadName: '',
                        email: '',
                        phone: '',
                        anglers: 1,
                        guests: 1,
                        specialRequests: '',
                        rulesAgreed: false
                      });
                      setSelectedDates([]);
                      setSelectedBait({});
                      setBaitBundlesSelected({});
                      setBaitBoatHire(false);
                      setBaitBoatDays([]);
                      setAddonsTotal(0);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
