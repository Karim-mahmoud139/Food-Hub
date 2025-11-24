import { Star, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  averageRating: number;
  reviewCount: number;
}

export function RestaurantCard({ restaurant, onClick, averageRating, reviewCount }: RestaurantCardProps) {
  const displayRating = reviewCount > 0 ? averageRating : 0;
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
            <Star className="size-4 text-orange-500 fill-orange-500" />
            <span className="text-sm text-orange-600">
              {reviewCount > 0 ? displayRating.toFixed(1) : 'New'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{restaurant.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="size-4" />
            <span>Min ${restaurant.minimumOrder}</span>
          </div>
        </div>
      </div>
    </div>
  );
}