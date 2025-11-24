import { Restaurant, MenuItem, Order } from './types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    description: 'Authentic Italian pizza with fresh ingredients',
    image: 'https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTExMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    deliveryTime: '30-40 min',
    minimumOrder: 15,
    categories: ['Pizza', 'Appetizers', 'Desserts', 'Drinks']
  },
  {
    id: '2',
    name: 'Burger Haven',
    description: 'Gourmet burgers and crispy fries',
    image: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MzkyMDkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    deliveryTime: '20-30 min',
    minimumOrder: 10,
    categories: ['Burgers', 'Sides', 'Shakes', 'Salads']
  },
  {
    id: '3',
    name: 'Pasta Paradise',
    description: 'Homemade pasta and Italian classics',
    image: 'https://images.unsplash.com/photo-1706051555972-579324abeb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTE3MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    deliveryTime: '25-35 min',
    minimumOrder: 12,
    categories: ['Pasta', 'Salads', 'Appetizers', 'Desserts']
  },
  {
    id: '4',
    name: 'Sushi Station',
    description: 'Fresh sushi and Japanese cuisine',
    image: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYzODY2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    deliveryTime: '35-45 min',
    minimumOrder: 20,
    categories: ['Sushi', 'Rolls', 'Appetizers', 'Drinks']
  }
];

export const mockMenuItems: MenuItem[] = [
  // Pizza Palace Items
  {
    id: 'p1',
    restaurantId: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTExMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pizza',
    rating: 4.5,
    reviews: 124
  },
  {
    id: 'p2',
    restaurantId: '1',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and mozzarella cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTExMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pizza',
    rating: 4.7,
    reviews: 98
  },
  {
    id: 'p3',
    restaurantId: '1',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM5ODE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Appetizers',
    rating: 4.3,
    reviews: 67
  },
  {
    id: 'p4',
    restaurantId: '1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwZm9vZHxlbnwxfHx8fDE3NjM5MTU3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Desserts',
    rating: 4.8,
    reviews: 145
  },
  // Burger Haven Items
  {
    id: 'b1',
    restaurantId: '2',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MzkyMDkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Burgers',
    rating: 4.6,
    reviews: 203
  },
  {
    id: 'b2',
    restaurantId: '2',
    name: 'Chicken Burger',
    description: 'Crispy chicken breast with coleslaw and mayo',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MzkyMDkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Burgers',
    rating: 4.5,
    reviews: 156
  },
  {
    id: 'b3',
    restaurantId: '2',
    name: 'French Fries',
    description: 'Crispy golden fries with sea salt',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM5ODE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sides',
    rating: 4.4,
    reviews: 89
  },
  {
    id: 'b4',
    restaurantId: '2',
    name: 'Chocolate Shake',
    description: 'Rich and creamy chocolate milkshake',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwZm9vZHxlbnwxfHx8fDE3NjM5MTU3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Shakes',
    rating: 4.7,
    reviews: 112
  },
  // Pasta Paradise Items
  {
    id: 'pa1',
    restaurantId: '3',
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1706051555972-579324abeb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTE3MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pasta',
    rating: 4.8,
    reviews: 167
  },
  {
    id: 'pa2',
    restaurantId: '3',
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic and chili',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1706051555972-579324abeb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGZvb2R8ZW58MXx8fHwxNzYzOTE3MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pasta',
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'pa3',
    restaurantId: '3',
    name: 'Caesar Salad',
    description: 'Romaine lettuce with caesar dressing and croutons',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM5ODE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Salads',
    rating: 4.4,
    reviews: 78
  },
  // Sushi Station Items
  {
    id: 's1',
    restaurantId: '4',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYzODY2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Rolls',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 's2',
    restaurantId: '4',
    name: 'Salmon Nigiri',
    description: 'Fresh salmon over seasoned rice',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYzODY2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sushi',
    rating: 4.9,
    reviews: 234
  },
  {
    id: 's3',
    restaurantId: '4',
    name: 'Edamame',
    description: 'Steamed soybeans with sea salt',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM5ODE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Appetizers',
    rating: 4.5,
    reviews: 92
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    restaurantId: '1',
    restaurantName: 'Pizza Palace',
    items: [
      {
        menuItem: mockMenuItems[0],
        quantity: 2
      },
      {
        menuItem: mockMenuItems[2],
        quantity: 1
      }
    ],
    total: 31.97,
    deliveryFee: 2.99,
    status: 'delivered',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    address: '123 Main St, City',
    phone: '+1234567890'
  },
  {
    id: 'ORD002',
    userId: '1',
    restaurantId: '2',
    restaurantName: 'Burger Haven',
    items: [
      {
        menuItem: mockMenuItems[4],
        quantity: 1
      },
      {
        menuItem: mockMenuItems[6],
        quantity: 2
      }
    ],
    total: 18.97,
    deliveryFee: 2.99,
    status: 'on-the-way',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    address: '123 Main St, City',
    phone: '+1234567890'
  }
];
