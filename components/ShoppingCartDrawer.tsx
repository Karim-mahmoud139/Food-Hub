import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function ShoppingCartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            Your Cart ({items.length} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="size-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">Your cart is empty</p>
            <p className="text-sm text-gray-400">Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.menuItem.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="size-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm mb-1 truncate">{item.menuItem.name}</h4>
                    <p className="text-sm text-orange-600 mb-2">
                      ${item.menuItem.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.menuItem.id, Math.max(0, item.quantity - 1))
                        }
                        className="size-7 p-0"
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="size-7 p-0"
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span>Total</span>
                <span className="text-orange-600">${(total + 2.99).toFixed(2)}</span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
