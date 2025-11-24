import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Order } from '../types';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderComplete: (orderId: string) => void;
}

export function OrderTrackingModal({
  isOpen,
  onClose,
  order,
  onOrderComplete
}: OrderTrackingModalProps) {
  const [currentStatus, setCurrentStatus] = useState<Order['status']>('preparing');

  useEffect(() => {
    if (!order || !isOpen) return;

    setCurrentStatus(order.status);

    // Simulate order status progression
    const timers: NodeJS.Timeout[] = [];

    if (order.status === 'preparing') {
      timers.push(
        setTimeout(() => {
          setCurrentStatus('on-the-way');
        }, 5000)
      );
      timers.push(
        setTimeout(() => {
          setCurrentStatus('delivered');
          onOrderComplete(order.id);
        }, 10000)
      );
    } else if (order.status === 'on-the-way') {
      timers.push(
        setTimeout(() => {
          setCurrentStatus('delivered');
          onOrderComplete(order.id);
        }, 5000)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [order, isOpen, onOrderComplete]);

  if (!order) return null;

  const steps = [
    {
      status: 'preparing' as const,
      icon: Package,
      label: 'Preparing',
      description: 'Restaurant is preparing your order'
    },
    {
      status: 'on-the-way' as const,
      icon: Truck,
      label: 'On the Way',
      description: 'Your order is being delivered'
    },
    {
      status: 'delivered' as const,
      icon: CheckCircle,
      label: 'Delivered',
      description: 'Order has been delivered'
    }
  ];

  const getStepStatus = (stepStatus: Order['status']) => {
    const statusOrder = ['preparing', 'on-the-way', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Tracking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Order ID: {order.id}</p>
            <p className="text-orange-600">{order.restaurantName}</p>
            <p className="text-sm text-gray-600 mt-2">
              {order.items.length} items • ${order.total.toFixed(2)}
            </p>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(step.status);
              const Icon = step.icon;

              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center ${
                        status === 'completed'
                          ? 'bg-green-500 text-white'
                          : status === 'current'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h4
                      className={`mb-1 ${
                        status === 'current' ? 'text-orange-600' : 'text-gray-900'
                      }`}
                    >
                      {step.label}
                      {status === 'current' && (
                        <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                          In Progress
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {currentStatus === 'delivered' && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
              <CheckCircle className="size-12 text-green-500 mx-auto mb-2" />
              <p className="text-green-700 mb-1">Order Delivered Successfully!</p>
              <p className="text-sm text-green-600">
                Thank you for ordering with Food Hub
              </p>
            </div>
          )}

          <Button onClick={onClose} className="w-full bg-orange-500 hover:bg-orange-600">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
