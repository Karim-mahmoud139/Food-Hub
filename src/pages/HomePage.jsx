// src/pages/HomePage.jsx
// الصفحة الرئيسية - عرض المطاعم
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import RestaurantCard from '../components/RestaurantCard';
import AddRestaurantModal from '../components/AddRestaurantModal';

const HomePage = () => {
  const { restaurants, currentUser, setSelectedRestaurant } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = currentUser?.role === 'admin';
  console.log('Current User:', currentUser); // Debugging
  console.log('Is Admin:', isAdmin); // Debugging

  // Get unique categories from all restaurants
  const categories = ['All', ...new Set(restaurants.flatMap(r => r.categories))];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || restaurant.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    navigate(`/menu/${restaurant.id}`);
  };

  return (
    <div className="min-h-screen bg-bg-gray pb-20 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section - Orange Background */}
      <div className="bg-primary-orange py-16 text-center text-white dark:bg-primary-orange-dark">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Order Food from Your Favorite Restaurants
        </h1>
        <p className="mb-8 text-lg text-gray-100">
          Fast delivery • Real-time tracking • Best prices
        </p>

        {/* Search Bar */}
        <div className="mx-auto max-w-2xl px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              className="w-full rounded-full border-none bg-white/90 py-4 pl-12 pr-4 text-text-dark placeholder-gray-500 focus:ring-2 focus:ring-white/50 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>
      </div>

      {/* Categories Filter - Scrolling Bar with Arrows */}
      <div className="sticky top-[64px] z-30 bg-white/95 py-4 shadow-sm backdrop-blur dark:bg-slate-900/95 dark:shadow-slate-800/50">
        <div className="container mx-auto px-4 relative group">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('category-scroll-container');
              if (container) container.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll Left"
          >
            <div className="bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-gray-100 dark:border-slate-700 text-primary-orange">
              <i className="fas fa-chevron-left"></i>
            </div>
          </button>

          <div
            id="category-scroll-container"
            className="flex gap-3 overflow-x-auto pb-0 no-scrollbar px-1 scroll-smooth"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 flex-shrink-0
                  ${selectedCategory === category
                    ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/30 scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('category-scroll-container');
              if (container) container.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll Right"
          >
            <div className="bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-gray-100 dark:border-slate-700 text-primary-orange">
              <i className="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-text-dark dark:text-white">Available Restaurants</h2>

        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h3 className="text-xl font-semibold text-text-dark dark:text-white">No restaurants found</h3>
            <p className="text-text-gray dark:text-gray-400">Try changing your search or category filter</p>
          </div>
        )}
      </div>

      {/* Admin Add Restaurant Button */}
      {isAdmin && (
        <>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-orange text-white shadow-lg transition-transform hover:scale-110 hover:bg-primary-orange-dark focus:outline-none focus:ring-4 focus:ring-primary-orange/30 animate-bounce-subtle"
            title="Add New Restaurant"
          >
            <i className="fas fa-plus text-2xl"></i>
          </button>
          <AddRestaurantModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </>
      )}
    </div>
  );
};

export default HomePage;