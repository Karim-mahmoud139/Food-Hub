import { Plus, Star } from 'lucide-react';
import { MenuItem } from '../types';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
  onViewDetails: () => void;
  averageRating: number;
  reviewCount: number;
}

export function MenuItemCard({ item, onAddToCart, onViewDetails, averageRating, reviewCount }: MenuItemCardProps) {
  const displayRating = reviewCount > 0 ? averageRating : 0;
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="relative h-40 overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-gray-900">{item.name}</h4>
          <span className="text-orange-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {reviewCount > 0 ? (
              <>
                <div className="flex items-center gap-1">
                  <Star className="size-3 text-orange-500 fill-orange-500" />
                  <span>{displayRating.toFixed(1)}</span>
                </div>
                <span>({reviewCount} reviews)</span>
              </>
            ) : (
              <span className="text-gray-400">No reviews yet</span>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 gap-1"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}