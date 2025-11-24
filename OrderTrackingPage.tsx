import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Order } from './types';
import { OrderStatusTracker } from './components/OrderStatusTracker';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { mockOrders } from './data/mockData';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // In a real app, this would come from your backend
  // For demo, we'll simulate order status progression
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Check if it's a new order (starts with ORD)
    if (orderId?.startsWith('ORD')) {
      // Create a new order for tracking
      const newOrder: Order = {
        id: orderId,
        userId: '1',
        restaurantId: '1',
        restaurantName: 'Demo Restaurant',
        items: [],
        total: 0,
        deliveryFee: 2.99,
        status: 'pending',
        createdAt: new Date(),
        address: '123 Main St',
        phone: '+1234567890',
      };
      setOrder(newOrder);

      // Simulate status updates
      const timer1 = setTimeout(() => {
        setOrder(prev => prev ? { ...prev, status: 'preparing' } : null);
      }, 3000);

      const timer2 = setTimeout(() => {
        setOrder(prev => prev ? { ...prev, status: 'on-the-way' } : null);
      }, 8000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Load existing order
      const existingOrder = mockOrders.find(o => o.id === orderId);
      if (existingOrder) {
        setOrder(existingOrder);
      }
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Button onClick={() => navigate('/orders')}>View Order History</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate('/orders')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Order #{order.id}</h2>
              <p className="text-muted-foreground">
                {order.restaurantName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Total</p>
              <p className="text-orange-600">
                ${(order.total + order.deliveryFee).toFixed(2)}
              </p>
            </div>
          </div>

          <OrderStatusTracker order={order} />

          {order.status === 'delivered' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800">
                Your order has been delivered! Enjoy your meal!
              </p>
            </div>
          )}

          {order.status === 'on-the-way' && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800">
                Your order is on the way! Expected delivery in 15-20 minutes.
              </p>
            </div>
          )}

          {order.status === 'preparing' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                Your order is being prepared with care!
              </p>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Details */}
          <Card className="p-6">
            <h3 className="mb-4">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{order.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{order.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <h3 className="mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">{item.quantity}x</span>
                      <span>{item.menuItem.name}</span>
                    </div>
                    <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Order items will appear here
                </p>
              )}
              <div className="pt-3 border-t">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
