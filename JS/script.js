// Food Hub Application JavaScript

// Global State
let currentUser = null;
let users = [];
let currentView = 'restaurants';
let selectedRestaurant = null;
let cart = [];
let orders = [];
let reviews = [];
let selectedCategory = 'all';
let currentAuthMode = 'login';
let currentReviewMenuItem = null;
let currentReviewRating = 0;

// Initialize App
function initApp() {
    loadDataFromStorage();
    renderRestaurants();
    updateCartBadge();
    updateUIForUser();
    setupEventListeners();
}

// Local Storage Functions
function loadDataFromStorage() {
    const savedUser = localStorage.getItem('foodhub-user');
    const savedUsers = localStorage.getItem('foodhub-users');
    const savedCart = localStorage.getItem('foodhub-cart');
    const savedOrders = localStorage.getItem('foodhub-orders');
    const savedReviews = localStorage.getItem('foodhub-reviews');

    if (savedUser) currentUser = JSON.parse(savedUser);
    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedOrders) orders = JSON.parse(savedOrders);
    if (savedReviews) reviews = JSON.parse(savedReviews);
}

function saveToStorage() {
    if (currentUser) {
        localStorage.setItem('foodhub-user', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('foodhub-user');
    }
    localStorage.setItem('foodhub-users', JSON.stringify(users));
    localStorage.setItem('foodhub-cart', JSON.stringify(cart));
    localStorage.setItem('foodhub-orders', JSON.stringify(orders));
    localStorage.setItem('foodhub-reviews', JSON.stringify(reviews));
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('restaurantSearch').addEventListener('input', (e) => {
        renderRestaurants(e.target.value);
    });

    document.getElementById('menuSearch').addEventListener('input', (e) => {
        renderMenuItems(e.target.value);
    });
}

// Rating Functions
function getRestaurantRating(restaurantId) {
    const restaurantReviews = reviews.filter(r => r.restaurantId === restaurantId);
    if (restaurantReviews.length === 0) return { average: 0, count: 0 };
    const average = restaurantReviews.reduce((sum, r) => sum + r.rating, 0) / restaurantReviews.length;
    return { average, count: restaurantReviews.length };
}

function getMenuItemRating(menuItemId) {
    const itemReviews = reviews.filter(r => r.menuItemId === menuItemId);
    if (itemReviews.length === 0) return { average: 0, count: 0 };
    const average = itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length;
    return { average, count: itemReviews.length };
}

// Navigation Functions
function goToHome() {
    currentView = 'restaurants';
    selectedRestaurant = null;
    cart = [];
    saveToStorage();
    
    document.getElementById('homePage').classList.add('active');
    document.getElementById('menuPage').classList.remove('active');
    document.getElementById('adminPage').classList.remove('active');
    
    renderRestaurants();
    updateCartBadge();
}

function goToMenu(restaurant) {
    selectedRestaurant = restaurant;
    currentView = 'menu';
    selectedCategory = 'all';
    
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('menuPage').classList.add('active');
    document.getElementById('adminPage').classList.remove('active');
    
    renderRestaurantHeader();
    renderCategoryTabs();
    renderMenuItems();
}

function goToAdmin() {
    currentView = 'admin';
    
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('menuPage').classList.remove('active');
    document.getElementById('adminPage').classList.add('active');
    
    renderAdminDashboard();
}

// Render Functions
function renderRestaurants(searchQuery = '') {
    const grid = document.getElementById('restaurantsGrid');
    const title = document.getElementById('restaurantsTitle');
    
    let filtered = mockRestaurants;
    
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = mockRestaurants.filter(r => 
            r.name.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            r.categories.some(cat => cat.toLowerCase().includes(query))
        );
        title.textContent = 'Search Results';
    } else {
        title.textContent = 'Available Restaurants';
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 3rem;"><p style="color: var(--text-gray);">No restaurants found matching your search.</p></div>';
        return;
    }
    
    grid.innerHTML = filtered.map(restaurant => {
        const { average, count } = getRestaurantRating(restaurant.id);
        return `
            <div class="restaurant-card" onclick="goToMenu(${JSON.stringify(restaurant).replace(/"/g, '&quot;')})">
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-info">
                    <div class="restaurant-header">
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <div class="rating-badge">
                            <i class="fas fa-star"></i>
                            <span>${count > 0 ? average.toFixed(1) : 'New'}</span>
                        </div>
                    </div>
                    <p class="restaurant-description">${restaurant.description}</p>
                    <div class="restaurant-details">
                        <span><i class="fas fa-clock"></i> ${restaurant.deliveryTime}</span>
                        <span><i class="fas fa-dollar-sign"></i> Min $${restaurant.minimumOrder}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderRestaurantHeader() {
    if (!selectedRestaurant) return;
    
    const { average, count } = getRestaurantRating(selectedRestaurant.id);
    const header = document.getElementById('restaurantHeader');
    
    header.innerHTML = `
        <h1>${selectedRestaurant.name}</h1>
        <p>${selectedRestaurant.description}</p>
        <div class="restaurant-meta">
            <span>⭐ ${count > 0 ? average.toFixed(1) : 'New'} ${count > 0 ? `(${count} reviews)` : ''}</span>
            <span>🕒 ${selectedRestaurant.deliveryTime}</span>
            <span>💰 Min $${selectedRestaurant.minimumOrder}</span>
        </div>
    `;
}

function renderCategoryTabs() {
    if (!selectedRestaurant) return;
    
    const tabsContainer = document.getElementById('categoryTabs');
    const categories = ['all', ...selectedRestaurant.categories];
    
    tabsContainer.innerHTML = categories.map(cat => `
        <button class="category-tab ${cat === selectedCategory ? 'active' : ''}" 
                onclick="selectCategory('${cat}')">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');
}

function selectCategory(category) {
    selectedCategory = category;
    renderCategoryTabs();
    renderMenuItems();
}

function renderMenuItems(searchQuery = '') {
    if (!selectedRestaurant) return;
    
    const grid = document.getElementById('menuGrid');
    let items = mockMenuItems.filter(item => item.restaurantId === selectedRestaurant.id);
    
    // Filter by category
    if (selectedCategory !== 'all') {
        items = items.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        items = items.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    }
    
    if (items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><p style="color: var(--text-gray);">No items found</p></div>';
        return;
    }
    
    grid.innerHTML = items.map(item => {
        const { average, count } = getMenuItemRating(item.id);
        return `
            <div class="menu-item-card">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image" onclick="showItemDetails('${item.id}')">
                <div class="menu-item-info">
                    <div class="menu-item-header">
                        <h4 class="menu-item-name" onclick="showItemDetails('${item.id}')">${item.name}</h4>
                        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="menu-item-rating">
                            <i class="fas fa-star" style="color: var(--primary-orange);"></i>
                            <span>${count > 0 ? average.toFixed(1) : 'New'} ${count > 0 ? `(${count})` : ''}</span>
                        </div>
                        <button class="btn-add-cart" onclick="addToCart('${item.id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Cart Functions
function addToCart(itemId) {
    if (!currentUser) {
        showToast('Please login to add items to cart', 'error');
        showLoginModal();
        return;
    }
    
    if (currentUser.role !== 'customer') {
        showToast('Please login as a customer to order food', 'error');
        return;
    }
    
    const item = mockMenuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(c => c.menuItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ menuItem: item, quantity: 1 });
    }
    
    saveToStorage();
    updateCartBadge();
    showToast(`${item.name} added to cart`, 'success');
}

function updateCartQuantity(itemId, quantity) {
    if (quantity === 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(c => c.menuItem.id === itemId);
    if (item) {
        item.quantity = quantity;
        saveToStorage();
        renderCart();
        updateCartBadge();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(c => c.menuItem.id !== itemId);
    saveToStorage();
    renderCart();
    updateCartBadge();
    showToast('Item removed from cart', 'success');
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('active');
    
    if (drawer.classList.contains('active')) {
        renderCart();
    }
}

function renderCart() {
    const itemsContainer = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        footer.innerHTML = '';
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;
    
    itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.menuItem.image}" alt="${item.menuItem.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.menuItem.name}</div>
                <div class="cart-item-price">$${item.menuItem.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateCartQuantity('${item.menuItem.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity('${item.menuItem.id}', ${item.quantity + 1})">+</button>
                    <button class="btn-remove" onclick="removeFromCart('${item.menuItem.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    footer.innerHTML = `
        <div class="cart-total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn-primary btn-full" onclick="proceedToCheckout()">
            Proceed to Checkout
        </button>
    `;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    toggleCart();
    showCheckoutModal();
}

// Auth Functions
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function switchAuthTab(mode) {
    currentAuthMode = mode;
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const nameGroup = document.getElementById('nameGroup');
    const submitBtn = document.getElementById('authSubmitBtn');
    const title = document.getElementById('authTitle');
    
    if (mode === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        nameGroup.style.display = 'none';
        submitBtn.textContent = 'Login';
        title.textContent = 'Login';
    } else {
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
        nameGroup.style.display = 'block';
        submitBtn.textContent = 'Sign Up';
        title.textContent = 'Sign Up';
    }
}

function handleAuth(event) {
    event.preventDefault();
    
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const role = document.getElementById('authRole').value;
    
    if (currentAuthMode === 'signup') {
        const name = document.getElementById('authName').value;
        handleSignUp(name, email, password);
    } else {
        handleLogin(email, password, role);
    }
}

function handleSignUp(name, email, password) {
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showToast('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        password,
        role: 'customer'
    };
    
    users.push(newUser);
    currentUser = newUser;
    saveToStorage();
    
    closeLoginModal();
    updateUIForUser();
    showToast(`Welcome ${newUser.name}!`, 'success');
    
    // Reset form
    document.getElementById('authForm').reset();
}

function handleLogin(email, password, role) {
    // Check demo accounts
    if (email === 'customer@demo.com' && password === 'demo123' && role === 'customer') {
        currentUser = {
            id: 'demo-customer',
            name: 'Demo Customer',
            email,
            password,
            role: 'customer'
        };
        saveToStorage();
        closeLoginModal();
        updateUIForUser();
        showToast(`Welcome ${currentUser.name}!`, 'success');
        document.getElementById('authForm').reset();
        return;
    }
    
    if (email === 'admin@demo.com' && password === 'demo123' && role === 'admin') {
        currentUser = {
            id: 'demo-admin',
            name: 'Restaurant Admin',
            email,
            password,
            role: 'admin'
        };
        saveToStorage();
        closeLoginModal();
        updateUIForUser();
        goToAdmin();
        showToast(`Welcome ${currentUser.name}!`, 'success');
        document.getElementById('authForm').reset();
        return;
    }
    
    // Check registered users
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        if (user.role !== role) {
            showToast(`This account is registered as ${user.role}`, 'error');
            return;
        }
        
        currentUser = user;
        saveToStorage();
        closeLoginModal();
        updateUIForUser();
        
        if (user.role === 'admin') {
            goToAdmin();
        }
        
        showToast(`Welcome back ${user.name}!`, 'success');
        document.getElementById('authForm').reset();
    } else {
        showToast('Invalid email or password', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    cart = [];
    saveToStorage();
    updateUIForUser();
    goToHome();
    showToast('Logged out successfully', 'success');
}

function updateUIForUser() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const orderHistoryBtn = document.getElementById('orderHistoryBtn');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = currentUser.name;
        
        if (currentUser.role === 'customer') {
            orderHistoryBtn.style.display = 'inline-flex';
        } else {
            orderHistoryBtn.style.display = 'none';
        }
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
        orderHistoryBtn.style.display = 'none';
    }
}

// Checkout Functions
function showCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('active');
    renderCheckoutSummary();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function renderCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;
    
    summary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div class="order-summary-item">
                <span>${item.quantity}x ${item.menuItem.name}</span>
                <span>$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="order-summary-item">
            <span>Delivery Fee</span>
            <span>$${deliveryFee.toFixed(2)}</span>
        </div>
        <div class="order-summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

function placeOrder(event) {
    event.preventDefault();
    
    if (!selectedRestaurant || !currentUser) return;
    
    const address = document.getElementById('deliveryAddress').value;
    const phone = document.getElementById('phoneNumber').value;
    const notes = document.getElementById('orderNotes').value;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const total = subtotal + 2.99;
    
    const newOrder = {
        id: 'ORD' + Date.now().toString(36).toUpperCase(),
        userId: currentUser.id,
        restaurantId: selectedRestaurant.id,
        restaurantName: selectedRestaurant.name,
        items: [...cart],
        total,
        status: 'preparing',
        address,
        phone,
        notes,
        createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    cart = [];
    saveToStorage();
    updateCartBadge();
    
    closeCheckoutModal();
    showOrderTracking(newOrder);
    showToast('Order placed successfully!', 'success');
    
    document.getElementById('checkoutForm').reset();
}

// Order Tracking Functions
function showOrderTracking(order) {
    document.getElementById('trackingModal').classList.add('active');
    renderOrderTracking(order);
}

function closeTrackingModal() {
    document.getElementById('trackingModal').classList.remove('active');
}

function renderOrderTracking(order) {
    const content = document.getElementById('trackingContent');
    
    const steps = [
        { key: 'preparing', icon: 'fa-utensils', title: 'Preparing', description: 'Your food is being prepared' },
        { key: 'on-the-way', icon: 'fa-truck', title: 'On the Way', description: 'Your order is out for delivery' },
        { key: 'delivered', icon: 'fa-check-circle', title: 'Delivered', description: 'Enjoy your meal!' }
    ];
    
    const currentIndex = steps.findIndex(s => s.key === order.status);
    
    content.innerHTML = `
        <div class="order-tracking">
            <div class="order-id">Order #${order.id}</div>
            <p>${order.restaurantName}</p>
            
            <div class="tracking-steps">
                ${steps.map((step, index) => {
                    let className = 'tracking-step';
                    if (index < currentIndex) className += ' completed';
                    if (index === currentIndex) className += ' active';
                    
                    return `
                        <div class="${className}">
                            <div class="step-icon">
                                <i class="fas ${step.icon}"></i>
                            </div>
                            <div class="step-info">
                                <div class="step-title">${step.title}</div>
                                <div class="step-description">${step.description}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="order-summary">
                <h3>Order Items</h3>
                ${order.items.map(item => `
                    <div class="order-summary-item">
                        <span>${item.quantity}x ${item.menuItem.name}</span>
                        <span>$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="order-summary-total">
                    <span>Total</span>
                    <span>$${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
}

// Order History Functions
function showOrderHistory() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    document.getElementById('historyModal').classList.add('active');
    renderOrderHistory();
}

function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('active');
}

function renderOrderHistory() {
    const content = document.getElementById('historyContent');
    const userOrders = orders.filter(o => o.userId === currentUser.id).reverse();
    
    if (userOrders.length === 0) {
        content.innerHTML = '<div class="empty-cart"><i class="fas fa-receipt"></i><p>No orders yet</p></div>';
        return;
    }
    
    content.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-card-header">
                <div class="order-info">
                    <h3>${order.restaurantName}</h3>
                    <div class="order-date">${new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div class="order-status ${order.status}">${order.status.replace('-', ' ')}</div>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.quantity}x ${item.menuItem.name}</span>
                        <span>$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-card-footer">
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
                <div class="order-actions">
                    <button class="btn-outline" onclick='showOrderTracking(${JSON.stringify(order)})'>
                        Track Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Menu Item Details Functions
function showItemDetails(itemId) {
    const item = mockMenuItems.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('itemDetailsModal').classList.add('active');
    renderItemDetails(item);
}

function closeItemDetailsModal() {
    document.getElementById('itemDetailsModal').classList.remove('active');
}

function renderItemDetails(item) {
    const title = document.getElementById('itemDetailsTitle');
    const content = document.getElementById('itemDetailsContent');
    const { average, count } = getMenuItemRating(item.id);
    const itemReviews = reviews.filter(r => r.menuItemId === item.id);
    
    title.textContent = item.name;
    
    content.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-details-image">
        
        <div class="item-details-info">
            <div class="item-details-header">
                <div>
                    <p>${item.description}</p>
                    <div class="menu-item-rating" style="margin-top: 0.5rem;">
                        <i class="fas fa-star" style="color: var(--primary-orange);"></i>
                        <span>${count > 0 ? average.toFixed(1) : 'No reviews yet'} ${count > 0 ? `(${count} reviews)` : ''}</span>
                    </div>
                </div>
                <div class="menu-item-price">$${item.price.toFixed(2)}</div>
            </div>
            
            <div class="item-details-footer">
                <button class="btn-primary" onclick="addToCart('${item.id}'); closeItemDetailsModal();">
                    Add to Cart
                </button>
                ${currentUser && currentUser.role === 'customer' ? `
                    <button class="btn-outline" onclick="showReviewModal('${item.id}')">
                        Write a Review
                    </button>
                ` : ''}
            </div>
        </div>
        
        <div class="reviews-section">
            <div class="reviews-header">
                <h3>Customer Reviews</h3>
            </div>
            
            ${itemReviews.length === 0 ? `
                <div class="empty-reviews">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            ` : itemReviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${review.userName}</span>
                        <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
                    </div>
                    <div class="review-date">${new Date(review.createdAt).toLocaleDateString()}</div>
                    <p class="review-comment">${review.comment}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Review Functions
function showReviewModal(itemId) {
    const item = mockMenuItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (!currentUser) {
        showToast('Please login to write a review', 'error');
        showLoginModal();
        return;
    }
    
    if (currentUser.role !== 'customer') {
        showToast('Only customers can write reviews', 'error');
        return;
    }
    
    currentReviewMenuItem = item;
    currentReviewRating = 0;
    document.getElementById('reviewModal').classList.add('active');
    document.getElementById('reviewForm').reset();
    updateReviewStars();
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
    currentReviewMenuItem = null;
    currentReviewRating = 0;
}

function setReviewRating(rating) {
    currentReviewRating = rating;
    document.getElementById('reviewRating').value = rating;
    updateReviewStars();
}

function updateReviewStars() {
    const stars = document.querySelectorAll('#reviewStarRating i');
    stars.forEach((star, index) => {
        if (index < currentReviewRating) {
            star.className = 'fas fa-star';
        } else {
            star.className = 'far fa-star';
        }
    });
}

function submitReview(event) {
    event.preventDefault();
    
    if (!currentUser || !currentReviewMenuItem) return;
    
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value;
    
    if (!rating) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    const newReview = {
        id: 'review_' + Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        menuItemId: currentReviewMenuItem.id,
        restaurantId: currentReviewMenuItem.restaurantId,
        rating,
        comment,
        createdAt: new Date().toISOString()
    };
    
    reviews.push(newReview);
    saveToStorage();
    
    closeReviewModal();
    showToast('Review submitted successfully!', 'success');
    
    // Refresh item details if modal is open
    if (document.getElementById('itemDetailsModal').classList.contains('active')) {
        renderItemDetails(currentReviewMenuItem);
    }
}

// Admin Dashboard Functions
function renderAdminDashboard() {
    const stats = document.getElementById('adminStats');
    const ordersList = document.getElementById('adminOrdersList');
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'preparing').length;
    
    stats.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Total Orders</div>
            <div class="stat-value">${totalOrders}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value">$${totalRevenue.toFixed(2)}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Pending Orders</div>
            <div class="stat-value">${pendingOrders}</div>
        </div>
    `;
    
    const recentOrders = [...orders].reverse().slice(0, 20);
    
    ordersList.innerHTML = `
        <h2>Recent Orders</h2>
        ${recentOrders.map(order => `
            <div class="admin-order-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <h3>Order #${order.id}</h3>
                        <p>${order.restaurantName}</p>
                        <p style="font-size: 0.875rem; color: var(--text-gray);">
                            ${new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                            <option value="on-the-way" ${order.status === 'on-the-way' ? 'selected' : ''}>On the Way</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                    </div>
                </div>
                
                <div style="background: var(--bg-gray); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.5rem;">
                    ${order.items.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.875rem;">
                            <span>${item.quantity}x ${item.menuItem.name}</span>
                            <span>$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <strong>Phone:</strong> ${order.phone || 'N/A'}<br>
                        <strong>Address:</strong> ${order.address || 'N/A'}
                    </div>
                    <div><strong>Total: $${order.total.toFixed(2)}</strong></div>
                </div>
            </div>
        `).join('')}
    `;
}

function updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        saveToStorage();
        showToast(`Order ${orderId} updated to ${status}`, 'success');
        renderAdminDashboard();
    }
}

// Toast Notification Function
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icons[type]} toast-icon"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize app when page loads
window.addEventListener('DOMContentLoaded', initApp);
