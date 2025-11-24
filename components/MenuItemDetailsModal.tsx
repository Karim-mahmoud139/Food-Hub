import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MenuItem, Review } from '../types';
import { Star, Plus, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  reviews: Review[];
  onAddToCart: () => void;
  onWriteReview: () => void;
  canReview: boolean;
}

export function MenuItemDetailsModal({
  isOpen,
  onClose,
  menuItem,
  reviews,
  onAddToCart,
  onWriteReview,
  canReview
}: MenuItemDetailsModalProps) {
  if (!menuItem) return null;

  const itemReviews = reviews.filter((r) => r.menuItemId === menuItem.id);
  const averageRating =
    itemReviews.length > 0
      ? itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: itemReviews.filter((r) => r.rating === stars).length,
    percentage:
      itemReviews.length > 0
        ? (itemReviews.filter((r) => r.rating === stars).length / itemReviews.length) * 100
        : 0
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{menuItem.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image and Info */}
          <div className="space-y-4">
            <ImageWithFallback
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 mb-3">{menuItem.description}</p>
                <p className="text-orange-600">${menuItem.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="border-t pt-4">
            <h3 className="text-gray-900 mb-4">Customer Reviews</h3>
            
            {itemReviews.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageSquare className="size-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 mb-4">No reviews yet</p>
                {canReview && (
                  <Button
                    onClick={onWriteReview}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Be the first to review
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-start gap-8 mb-6">
                  {/* Average Rating */}
                  <div className="text-center">
                    <div className="text-4xl text-gray-900 mb-1">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star <= Math.round(averageRating)
                              ? 'text-orange-500 fill-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{itemReviews.length} reviews</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="flex-1">
                    {ratingDistribution.map(({ stars, count, percentage }) => (
                      <div key={stars} className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600 w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-orange-500 h-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {canReview && (
                  <Button
                    onClick={onWriteReview}
                    size="sm"
                    variant="outline"
                    className="mb-6 w-full"
                  >
                    Write a Review
                  </Button>
                )}

                {/* Reviews List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {itemReviews
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm">{review.userName}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`size-3 ${
                                    star <= review.rating
                                      ? 'text-orange-500 fill-orange-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              className="flex-1 bg-orange-500 hover:bg-orange-600 gap-2"
            >
              <Plus className="size-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
