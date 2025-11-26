// Mock Data for Food Hub Application

const mockRestaurants = [
    {
        id: '1',
        name: 'Italian Bistro',
        description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        deliveryTime: '30-40 min',
        minimumOrder: 15,
        categories: ['pizza', 'pasta', 'salads', 'desserts']
    },
    {
        id: '2',
        name: 'Sushi Palace',
        description: 'Fresh sushi and Japanese specialties made by expert chefs',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
        deliveryTime: '25-35 min',
        minimumOrder: 20,
        categories: ['sushi', 'ramen', 'appetizers', 'desserts']
    },
    {
        id: '3',
        name: 'Burger House',
        description: 'Juicy burgers, crispy fries, and delicious milkshakes',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
        deliveryTime: '20-30 min',
        minimumOrder: 10,
        categories: ['burgers', 'sides', 'drinks', 'desserts']
    },
    {
        id: '4',
        name: 'Thai Spice',
        description: 'Flavorful Thai dishes with authentic spices and herbs',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
        deliveryTime: '35-45 min',
        minimumOrder: 18,
        categories: ['curries', 'noodles', 'rice', 'appetizers']
    },
    {
        id: '5',
        name: 'Mexican Cantina',
        description: 'Vibrant Mexican food with fresh ingredients and bold flavors',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
        deliveryTime: '30-40 min',
        minimumOrder: 12,
        categories: ['tacos', 'burritos', 'sides', 'desserts']
    },
    {
        id: '6',
        name: 'Chinese Dragon',
        description: 'Traditional Chinese dishes with modern presentation',
        image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800',
        deliveryTime: '25-35 min',
        minimumOrder: 15,
        categories: ['mains', 'rice', 'noodles', 'appetizers']
    }
];

const mockMenuItems = [
    // Italian Bistro Menu
    {
        id: 'm1',
        restaurantId: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
        category: 'pizza'
    },
    {
        id: 'm2',
        restaurantId: '1',
        name: 'Carbonara Pasta',
        description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
        category: 'pasta'
    },
    {
        id: 'm3',
        restaurantId: '1',
        name: 'Caesar Salad',
        description: 'Crispy romaine lettuce with Caesar dressing and croutons',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600',
        category: 'salads'
    },
    {
        id: 'm4',
        restaurantId: '1',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
        category: 'desserts'
    },
    // Sushi Palace Menu
    {
        id: 'm5',
        restaurantId: '2',
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber wrapped in seaweed and rice',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
        category: 'sushi'
    },
    {
        id: 'm6',
        restaurantId: '2',
        name: 'Spicy Tuna Roll',
        description: 'Fresh tuna with spicy mayo and sesame seeds',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600',
        category: 'sushi'
    },
    {
        id: 'm7',
        restaurantId: '2',
        name: 'Tonkotsu Ramen',
        description: 'Rich pork bone broth with noodles, egg, and chashu',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600',
        category: 'ramen'
    },
    {
        id: 'm8',
        restaurantId: '2',
        name: 'Edamame',
        description: 'Steamed soybeans with sea salt',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1583878439913-c5dd8c4c9fdb?w=600',
        category: 'appetizers'
    },
    // Burger House Menu
    {
        id: 'm9',
        restaurantId: '3',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
        category: 'burgers'
    },
    {
        id: 'm10',
        restaurantId: '3',
        name: 'BBQ Bacon Burger',
        description: 'Beef patty with bacon, BBQ sauce, and onion rings',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600',
        category: 'burgers'
    },
    {
        id: 'm11',
        restaurantId: '3',
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
        category: 'sides'
    },
    {
        id: 'm12',
        restaurantId: '3',
        name: 'Chocolate Milkshake',
        description: 'Thick and creamy chocolate milkshake',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600',
        category: 'drinks'
    },
    // Thai Spice Menu
    {
        id: 'm13',
        restaurantId: '4',
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with shrimp, peanuts, and lime',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
        category: 'noodles'
    },
    {
        id: 'm14',
        restaurantId: '4',
        name: 'Green Curry',
        description: 'Coconut curry with vegetables and your choice of protein',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
        category: 'curries'
    },
    {
        id: 'm15',
        restaurantId: '4',
        name: 'Thai Fried Rice',
        description: 'Jasmine rice stir-fried with vegetables and egg',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600',
        category: 'rice'
    },
    {
        id: 'm16',
        restaurantId: '4',
        name: 'Spring Rolls',
        description: 'Fresh vegetables wrapped in rice paper with peanut sauce',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600',
        category: 'appetizers'
    },
    // Mexican Cantina Menu
    {
        id: 'm17',
        restaurantId: '5',
        name: 'Beef Tacos',
        description: 'Three soft tacos with seasoned beef, salsa, and guacamole',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
        category: 'tacos'
    },
    {
        id: 'm18',
        restaurantId: '5',
        name: 'Chicken Burrito',
        description: 'Large flour tortilla filled with chicken, rice, beans, and cheese',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600',
        category: 'burritos'
    },
    {
        id: 'm19',
        restaurantId: '5',
        name: 'Nachos Supreme',
        description: 'Tortilla chips topped with cheese, jalapeños, and sour cream',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600',
        category: 'sides'
    },
    {
        id: 'm20',
        restaurantId: '5',
        name: 'Churros',
        description: 'Fried dough pastry with cinnamon sugar and chocolate sauce',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1599599440361-75ebbae6548d?w=600',
        category: 'desserts'
    },
    // Chinese Dragon Menu
    {
        id: 'm21',
        restaurantId: '6',
        name: 'Kung Pao Chicken',
        description: 'Spicy stir-fried chicken with peanuts and vegetables',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600',
        category: 'mains'
    },
    {
        id: 'm22',
        restaurantId: '6',
        name: 'Sweet and Sour Pork',
        description: 'Crispy pork with bell peppers in tangy sweet and sour sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
        category: 'mains'
    },
    {
        id: 'm23',
        restaurantId: '6',
        name: 'Chow Mein',
        description: 'Stir-fried noodles with vegetables and your choice of protein',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1645177628172-a94c30a5e1f1?w=600',
        category: 'noodles'
    },
    {
        id: 'm24',
        restaurantId: '6',
        name: 'Dumplings',
        description: 'Steamed pork dumplings with soy dipping sauce',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600',
        category: 'appetizers'
    }
];
