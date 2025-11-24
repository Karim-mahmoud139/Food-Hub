import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { Order } from '../types';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSubmitRating: (orderId: string, rating: number, review: string) => void;
}

export function RatingModal({ isOpen, onClose, order, onSubmitRating }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (order && rating > 0) {
      onSubmitRating(order.id, rating, review);
      setRating(0);
      setReview('');
      onClose();
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-gray-900 mb-2">{order.restaurantName}</h4>
            <p className="text-sm text-gray-500">
              How was your experience with this order?
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`size-10 ${
                    star <= (hoveredRating || rating)
                      ? 'text-orange-500 fill-orange-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-center text-sm text-gray-600">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          )}

          {/* Review Text */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">
              Share your experience (optional)
            </label>
            <Textarea
              placeholder="Tell us about your order..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          {/* Order Items Summary */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Items in this order:</p>
            <div className="space-y-1">
              {order.items.map((item) => (
                <p key={item.menuItem.id} className="text-sm text-gray-700">
                  {item.quantity}x {item.menuItem.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
              Submit Rating
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
