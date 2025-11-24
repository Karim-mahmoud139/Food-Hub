import { useState } from 'react';
import { mockRestaurants } from './data/mockData';
import { RestaurantCard } from './components/RestaurantCard';
import { Input } from './components/ui/input';
import { Search } from 'lucide-react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = mockRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center mb-2">Order Food from Your Favorite Restaurants</h1>
          <p className="text-center text-lg mb-8 opacity-90">
            Fast delivery • Real-time tracking • Best prices
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-6">
          {searchQuery ? 'Search Results' : 'Available Restaurants'}
        </h2>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No restaurants found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
