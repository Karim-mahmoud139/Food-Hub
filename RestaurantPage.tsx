import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRestaurants, mockMenuItems } from './data/mockData';
import { MenuItemCard } from './components/MenuItemCard';
import { Star, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = mockRestaurants.find((r) => r.id === id);
  const menuItems = mockMenuItems.filter((item) => item.restaurantId === id);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Restaurant not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Button>

          <div className="flex gap-6">
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
              <ImageWithFallback
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="mb-2">{restaurant.name}</h1>
              <p className="text-muted-foreground mb-4">{restaurant.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{restaurant.rating}</span>
                  <span className="text-muted-foreground">
                    ({restaurant.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Delivery: ${restaurant.deliveryFee}</span>
                </div>
                <div className="text-muted-foreground">
                  Min. order: ${restaurant.minOrder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-6">Menu</h2>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No items found in this category.
              </p>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
