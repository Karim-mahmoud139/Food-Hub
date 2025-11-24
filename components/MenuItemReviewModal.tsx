import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { MenuItem, Review } from '../types';

interface MenuItemReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  onSubmitReview: (menuItemId: string, restaurantId: string, rating: number, comment: string) => void;
}

export function MenuItemReviewModal({
  isOpen,
  onClose,
  menuItem,
  onSubmitReview
}: MenuItemReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (menuItem && rating > 0) {
      onSubmitReview(menuItem.id, menuItem.restaurantId, rating, comment);
      setRating(0);
      setComment('');
      onClose();
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  if (!menuItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review {menuItem.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="mb-4">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            <h4 className="text-gray-900 mb-1">{menuItem.name}</h4>
            <p className="text-sm text-gray-500">{menuItem.description}</p>
          </div>

          {/* Star Rating */}
          <div>
            <Label className="text-sm text-gray-700 mb-2 block">Your Rating</Label>
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
              <p className="text-center text-sm text-gray-600 mt-2">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">
              Your Review (Optional)
            </Label>
            <Textarea
              placeholder="Share your thoughts about this dish..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
