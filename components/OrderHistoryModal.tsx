import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Order } from '../types';
import { Package, Star, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onRateOrder: (order: Order) => void;
}

export function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
  onRateOrder
}: OrderHistoryModalProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-blue-100 text-blue-700';
      case 'on-the-way':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Order History
          </DialogTitle>
        </DialogHeader>

        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No orders yet</p>
            <p className="text-sm text-gray-400">
              Your order history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{order.restaurantName}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Order #{order.id} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {order.items.map((item) => (
                    <div key={item.menuItem.id} className="text-sm text-gray-600">
                      {item.quantity}x {item.menuItem.name}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {order.status !== 'delivered' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onTrackOrder(order)}
                      className="flex-1"
                    >
                      Track Order
                    </Button>
                  )}
                  {order.status === 'delivered' && !order.rating && (
                    <Button
                      size="sm"
                      onClick={() => onRateOrder(order)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 gap-1"
                    >
                      <Star className="size-4" />
                      Rate Order
                    </Button>
                  )}
                  {order.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="size-4 text-orange-500 fill-orange-500" />
                      <span>You rated {order.rating} stars</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
