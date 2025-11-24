import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RestaurantCard } from './components/RestaurantCard';
import { MenuItemCard } from './components/MenuItemCard';
import { ShoppingCartDrawer } from './components/ShoppingCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { RatingModal } from './components/RatingModal';
import { LoginModal } from './components/LoginModal';
import { MenuItemReviewModal } from './components/MenuItemReviewModal';
import { MenuItemDetailsModal } from './components/MenuItemDetailsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ArrowLeft, Clock, Search } from 'lucide-react';
import { Input } from './components/ui/input';
import { Toaster } from './components/ui/sonner';
import { mockRestaurants, mockMenuItems } from './data/mockData';
import { User, Restaurant, MenuItem, CartItem, Order, Review } from './types';
import { toast } from 'sonner@2.0.3';

type View = 'restaurants' | 'menu' | 'admin';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [view, setView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);
  const [reviewingMenuItem, setReviewingMenuItem] = useState<MenuItem | null>(null);
  const [detailsMenuItem, setDetailsMenuItem] = useState<MenuItem | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('foodhub-cart');
    const savedOrders = localStorage.getItem('foodhub-orders');
    const savedUser = localStorage.getItem('foodhub-user');
    const savedUsers = localStorage.getItem('foodhub-users');
    const savedReviews = localStorage.getItem('foodhub-reviews');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('foodhub-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodhub-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodhub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodhub-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('foodhub-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('foodhub-reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Calculate ratings
  const getMenuItemRating = (menuItemId: string) => {
    const itemReviews = reviews.filter((r) => r.menuItemId === menuItemId);
    if (itemReviews.length === 0) return { average: 0, count: 0 };
    const average = itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length;
    return { average, count: itemReviews.length };
  };

  const getRestaurantRating = (restaurantId: string) => {
    const restaurantReviews = reviews.filter((r) => r.restaurantId === restaurantId);
    if (restaurantReviews.length === 0) return { average: 0, count: 0 };
    const average = restaurantReviews.reduce((sum, r) => sum + r.rating, 0) / restaurantReviews.length;
    return { average, count: restaurantReviews.length };
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      toast.error('Email already registered');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      password,
      role: 'customer'
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    toast.success(`Welcome ${newUser.name}!`);
  };

  const handleLogin = (email: string, password: string, role: 'customer' | 'admin') => {
    // Check for demo accounts
    if (email === 'customer@demo.com' && password === 'demo123' && role === 'customer') {
      const demoUser: User = {
        id: 'demo-customer',
        name: 'Demo Customer',
        email,
        password,
        role: 'customer'
      };
      setUser(demoUser);
      toast.success(`Welcome ${demoUser.name}!`);
      return;
    }

    if (email === 'admin@demo.com' && password === 'demo123' && role === 'admin') {
      const demoAdmin: User = {
        id: 'demo-admin',
        name: 'Restaurant Admin',
        email,
        password,
        role: 'admin'
      };
      setUser(demoAdmin);
      toast.success(`Welcome ${demoAdmin.name}!`);
      setView('admin');
      return;
    }

    // Check registered users
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      if (foundUser.role !== role) {
        toast.error(`This account is registered as ${foundUser.role}`);
        return;
      }
      setUser(foundUser);
      toast.success(`Welcome back ${foundUser.name}!`);
      if (foundUser.role === 'admin') {
        setView('admin');
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setView('restaurants');
    setSelectedRestaurant(null);
    toast.success('Logged out successfully');
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('menu');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      setIsLoginModalOpen(true);
      toast.error('Please login to add items to cart');
      return;
    }
    if (user.role !== 'customer') {
      toast.error('Please login as a customer to order food');
      return;
    }

    const existingItem = cart.find((cartItem) => cartItem.menuItem.id === item.id);
    
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }]);
    }
    
    toast.success(`${item.name} added to cart`);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    
    setCart(
      cart.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.menuItem.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = (address: string, phone: string, notes: string) => {
    if (!selectedRestaurant || !user) return;

    const total = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    const newOrder: Order = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      userId: user.id,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name,
      items: [...cart],
      total: total + 2.99,
      status: 'preparing',
      createdAt: new Date().toISOString()
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    setIsCheckoutOpen(false);
    setTrackingOrder(newOrder);
    setIsTrackingOpen(true);
    
    toast.success('Order placed successfully!');
  };

  const handleTrackOrder = (order: Order) => {
    setTrackingOrder(order);
    setIsTrackingOpen(true);
    setIsHistoryOpen(false);
  };

  const handleRateOrder = (order: Order) => {
    setRatingOrder(order);
    setIsRatingOpen(true);
    setIsHistoryOpen(false);
  };

  const handleSubmitOrderRating = (orderId: string, rating: number, review: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, rating, review } : order
      )
    );
    toast.success('Thank you for your feedback!');
  };

  const handleOrderComplete = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'delivered' } : order
      )
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  const handleViewMenuItem = (item: MenuItem) => {
    setDetailsMenuItem(item);
    setIsDetailsModalOpen(true);
  };

  const handleWriteReview = (item: MenuItem) => {
    if (!user) {
      setIsLoginModalOpen(true);
      toast.error('Please login to write a review');
      return;
    }
    if (user.role !== 'customer') {
      toast.error('Only customers can write reviews');
      return;
    }
    setReviewingMenuItem(item);
    setIsDetailsModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleSubmitMenuItemReview = (
    menuItemId: string,
    restaurantId: string,
    rating: number,
    comment: string
  ) => {
    if (!user) return;

    const newReview: Review = {
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      userName: user.name,
      menuItemId,
      restaurantId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews([...reviews, newReview]);
    toast.success('Review submitted successfully!');
  };

  const handleBackToRestaurants = () => {
    setView('restaurants');
    setSelectedRestaurant(null);
    setCart([]);
  };

  const handleLogoClick = () => {
    if (user?.role === 'admin') {
      setView('admin');
    } else {
      handleBackToRestaurants();
    }
  };

  const handleAdminClick = () => {
    setView('admin');
  };

  // Get menu items for selected restaurant
  const restaurantMenuItems = selectedRestaurant
    ? mockMenuItems.filter((item) => item.restaurantId === selectedRestaurant.id)
    : [];

  // Filter menu items by category and search
  const filteredMenuItems = restaurantMenuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = selectedRestaurant
    ? ['all', ...selectedRestaurant.categories]
    : [];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userOrders = orders.filter((order) => order.userId === user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onAdminClick={handleAdminClick}
        onLogoClick={handleLogoClick}
      />

      {/* Admin Dashboard */}
      {view === 'admin' && user?.role === 'admin' && (
        <AdminDashboard orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />
      )}

      {/* Customer Views */}
      {view !== 'admin' && (
        <>
          {/* Restaurant List View */}
          {view === 'restaurants' && (
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="mb-8">
                <h1 className="text-gray-900 mb-2">Welcome to Food Hub</h1>
                <p className="text-gray-600">Choose from our partner restaurants</p>
              </div>

              {user && user.role === 'customer' && (
                <div className="mb-6 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsHistoryOpen(true)}
                    className="gap-2"
                  >
                    <Clock className="size-4" />
                    Order History
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRestaurants.map((restaurant) => {
                  const { average, count } = getRestaurantRating(restaurant.id);
                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleRestaurantSelect(restaurant)}
                      averageRating={average}
                      reviewCount={count}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Menu View */}
          {view === 'menu' && selectedRestaurant && (
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Restaurant Header */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={handleBackToRestaurants}
                  className="mb-4 gap-2"
                >
                  <ArrowLeft className="size-4" />
                  Back to Restaurants
                </Button>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h1 className="text-gray-900 mb-2">{selectedRestaurant.name}</h1>
                  <p className="text-gray-600 mb-4">{selectedRestaurant.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    {(() => {
                      const { average, count } = getRestaurantRating(selectedRestaurant.id);
                      return (
                        <>
                          <span>★ {count > 0 ? average.toFixed(1) : 'New'} {count > 0 && `(${count} reviews)`}</span>
                          <span>🕒 {selectedRestaurant.deliveryTime}</span>
                          <span>💰 Min ${selectedRestaurant.minimumOrder}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList>
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No items found</p>
                  </div>
                ) : (
                  filteredMenuItems.map((item) => {
                    const { average, count } = getMenuItemRating(item.id);
                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={() => handleAddToCart(item)}
                        onViewDetails={() => handleViewMenuItem(item)}
                        averageRating={average}
                        reviewCount={count}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals and Drawers */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />

      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        restaurantName={selectedRestaurant?.name || ''}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        order={trackingOrder}
        onOrderComplete={handleOrderComplete}
      />

      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={userOrders}
        onTrackOrder={handleTrackOrder}
        onRateOrder={handleRateOrder}
      />

      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        order={ratingOrder}
        onSubmitRating={handleSubmitOrderRating}
      />

      <MenuItemReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        menuItem={reviewingMenuItem}
        onSubmitReview={handleSubmitMenuItemReview}
      />

      <MenuItemDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        menuItem={detailsMenuItem}
        reviews={reviews}
        onAddToCart={() => detailsMenuItem && handleAddToCart(detailsMenuItem)}
        onWriteReview={() => detailsMenuItem && handleWriteReview(detailsMenuItem)}
        canReview={user?.role === 'customer'}
      />
    </div>
  );
}

export default App;
