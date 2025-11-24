export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minimumOrder: number;
  categories: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  deliveryFee?: number;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  createdAt: string | Date;
  address?: string;
  phone?: string;
  rating?: number;
  review?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  menuItemId: string;
  restaurantId: string;
  rating: number;
  comment: string;
  createdAt: string;
}