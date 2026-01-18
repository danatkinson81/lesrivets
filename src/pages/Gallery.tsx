import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [venuePhotos, setVenuePhotos] = useState<any[]>([]);
  const [fishSubmissions, setFishSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Categories for venue gallery
  const categories = [
    { id: 'all', name: 'All Photos', icon: '📷' },
    { id: 'accommodation', name: 'Accommodation', icon: '🏠' },
    { id: 'pool', name: 'Pool', icon: '🏊' },
    { id: 'lake', name: 'Lake', icon: '🌊' },
    { id: 'swims', name: 'Swims', icon: '💧' },
    { id: 'facilities', name: 'Facilities', icon: '🏨' },
    { id: 'outside', name: 'Outside', icon: '🌳' }
  ];

  // Fetch gallery data
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Fetch venue photos
        const { data: venueData, error: venueError } = await supabase
          .from('gallery_venue_photos')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        // Fetch approved fish submissions
        const { data: fishData, error: fishError } = await supabase
          .from('gallery_fish_submissions')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (venueError) throw venueError;
        if (fishError) throw fishError;

        setVenuePhotos(venueData || []);
        setFishSubmissions(fishData || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Filter photos based on category
  const filteredVenuePhotos = activeCategory === 'all' 
    ? venuePhotos 
    : venuePhotos.filter(photo => photo.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-textSecondary">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-error">Error loading gallery: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Explore our beautiful lake and fishing experiences
          </p>
        </div>

        {/* Venue Gallery Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Venue Gallery</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenuePhotos.length > 0 ? (
              filteredVenuePhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                >
                  <div className="h-64 bg-gray-200 border-2 border-dashed w-full" />
                  <div className="p-4">
                    <p className="text-textSecondary">{photo.title || photo.description || 'Venue photo'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-textSecondary">No photos found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Fish Gallery Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Fish Gallery</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fishSubmissions.length > 0 ? (
              fishSubmissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className="bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                >
                  <div className="h-64 bg-gray-200 border-2 border-dashed w-full" />
                  <div className="p-4">
                    <p className="text-textSecondary font-bold">{submission.species}</p>
                    <p className="text-textSecondary">{submission.weight} lbs</p>
                    <p className="text-textSecondary text-sm">{submission.angler_name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-textSecondary">No fish submissions yet. Be the first to submit your catch!</p>
              </div>
            )}
          </div>
        </div>

        {/* Fish Submission Form */}
        <div className="bg-surface p-8 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6">Submit Your Catch</h2>
          <p className="text-textSecondary mb-6">
            Share your fishing experience with us! We love to see photos from our guests.
          </p>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="anglerName" className="block text-textSecondary mb-2">Angler Name/Alias</label>
              <input 
                type="text" 
                id="anglerName" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name or alias"
              />
            </div>
            <div>
              <label htmlFor="species" className="block text-textSecondary mb-2">Species</label>
              <input 
                type="text" 
                id="species" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fish species"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-textSecondary mb-2">Weight (lbs)</label>
              <input 
                type="number" 
                id="weight" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fish weight"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-textSecondary mb-2">Date</label>
              <input 
                type="date" 
                id="date" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="photo" className="block text-textSecondary mb-2">Photo</label>
              <input 
                type="file" 
                id="photo" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Submit Fish
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Submission Guidelines</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Photos must be taken at our lake</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Include your name and date</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Photos should be high quality</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Respect other visitors' privacy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
