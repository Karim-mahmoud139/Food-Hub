// Authentication Logic for Login and Signup Pages

// Global State for Auth
let users = [];

// Initialize Auth
document.addEventListener('DOMContentLoaded', () => {
    loadUsersFromStorage();
    setupAuthEventListeners();
});

// Local Storage Functions
function loadUsersFromStorage() {
    const savedUsers = localStorage.getItem('foodhub-users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

function saveUsersToStorage() {
    localStorage.setItem('foodhub-users', JSON.stringify(users));
}

function saveCurrentUser(user) {
    localStorage.setItem('foodhub-user', JSON.stringify(user));
}

// Event Listeners
function setupAuthEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
}

// Handle Login
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Check demo accounts
    if (email === 'customer@demo.com' && password === 'demo123' && role === 'customer') {
        const user = {
            id: 'demo-customer',
            name: 'Demo Customer',
            email,
            password,
            role: 'customer'
        };
        loginSuccess(user);
        return;
    }
    
    if (email === 'admin@demo.com' && password === 'demo123' && role === 'admin') {
        const user = {
            id: 'demo-admin',
            name: 'Restaurant Admin',
            email,
            password,
            role: 'admin'
        };
        loginSuccess(user);
        return;
    }
    
    // Check registered users
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        if (user.role !== role) {
            alert(`This account is registered as ${user.role}`);
            return;
        }
        loginSuccess(user);
    } else {
        alert('Invalid email or password');
    }
}

function loginSuccess(user) {
    saveCurrentUser(user);
    window.location.href = 'index.html';
}

// Handle Signup
function handleSignupSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role') ? document.getElementById('role').value : 'customer'; // Default to customer if role not present
    
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        password,
        role
    };
    
    users.push(newUser);
    saveUsersToStorage();
    saveCurrentUser(newUser);
    
    window.location.href = 'index.html';
}
