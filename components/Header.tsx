import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  user: { name: string; role: 'customer' | 'admin' } | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onAdminClick: () => void;
  onLogoClick: () => void;
}

export function Header({ 
  cartItemsCount, 
  onCartClick, 
  user, 
  onLoginClick, 
  onLogout,
  onAdminClick,
  onLogoClick
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-0 hover:opacity-80 transition-opacity"
          >
            <span className="bg-orange-500 text-black px-3 py-1.5">Food</span>
            <span className="bg-black text-orange-500 px-3 py-1.5">Hub</span>
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {user && user.role === 'admin' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAdminClick}
                className="gap-2"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Button>
            )}
            
            {user && user.role === 'customer' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCartClick}
                className="relative gap-2"
              >
                <ShoppingCart className="size-5" />
                Cart
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-600">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="size-4 text-gray-600" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLoginClick} size="sm" className="bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
