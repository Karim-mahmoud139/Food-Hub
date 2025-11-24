import { Order } from '../types';
import { CheckCircle2, Circle, Clock, Truck, Package } from 'lucide-react';

interface OrderStatusTrackerProps {
  order: Order;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'preparing', label: 'Preparing', icon: Clock },
  { key: 'on-the-way', label: 'On the Way', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export function OrderStatusTracker({ order }: OrderStatusTrackerProps) {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === order.status
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center relative z-10 flex-1"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isCompleted
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`text-sm text-center ${
                  isCurrent ? 'text-orange-600' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
