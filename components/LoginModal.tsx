import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string, role: 'customer' | 'admin') => void;
  onSignUp: (name: string, email: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin, onSignUp }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
    onClose();
    resetForm();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(name, email, password);
    onClose();
    resetForm();
  };

  const handleQuickLogin = (userRole: 'customer' | 'admin') => {
    const mockEmail = userRole === 'customer' ? 'customer@demo.com' : 'admin@demo.com';
    onLogin(mockEmail, 'demo123', userRole);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setMode('login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); resetForm(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Welcome to Food Hub' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'signup' ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Sign up to order delicious food from your favorite restaurants
            </p>
            
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">Minimum 6 characters</p>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-orange-600 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="customer" onValueChange={(v) => setRole(v as 'customer' | 'admin')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="admin">Restaurant Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Order delicious food from your favorite restaurants
                  </p>
                  <Button 
                    onClick={() => handleQuickLogin('customer')} 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Quick Login as Customer
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Manage your restaurant orders and menu
                  </p>
                  <Button 
                    onClick={() => handleQuickLogin('admin')} 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Quick Login as Admin
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-sm text-orange-600 hover:underline"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
