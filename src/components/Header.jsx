// src/components/Header.jsx
// الهيدر بتاع الصفحة - فيه اللوجو والأزرار
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CartDrawer from './CartDrawer';
import OrderHistoryModal from './OrderHistoryModal';
import AuthModal from './AuthModal';

const Header = () => {
  const { currentUser, cart, handleLogout, isDarkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin';

  // عدد الأصناف في السلة
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

  useEffect(() => {
    if (currentUser) {
      setIsAuthOpen(false);
    } else {
      setIsCartOpen(false);
      setIsHistoryOpen(false);
    }
  }, [currentUser]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur transition-colors dark:bg-slate-900/95">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div
          className="logo flex items-center gap-2 cursor-pointer select-none group"
          onClick={() => navigate('/')}
        >
          <img
            src={process.env.PUBLIC_URL + '/logo192.png'}
            alt="FoodHub Logo"
            className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
          />
          <div className="text-2xl font-bold tracking-tight flex items-center">
            <span className="text-text-dark dark:text-white transition-colors">Food</span>
            <span className="text-text-dark dark:text-white transition-colors relative ml-0.5">
              Hub
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary-orange-dark rounded-full"></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle - Icon Only */}
          <button
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-color text-text-gray transition-all hover:border-primary-orange hover:bg-primary-orange/10 hover:text-primary-orange dark:border-slate-700 dark:text-slate-200 dark:hover:bg-primary-orange/20"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          </button>

          {/* Cart & History Buttons */}
          {currentUser && !isAdmin && (
            <div className="flex items-center gap-3">
              {/* Cart Button - Icon Only with Badge */}
              <button
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-color text-text-gray transition-all hover:border-primary-orange hover:bg-primary-orange/10 hover:text-primary-orange dark:border-slate-700 dark:text-slate-200 dark:hover:bg-primary-orange/20"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${cartCount} items`}
                title="Shopping Cart"
              >
                <i className="fas fa-shopping-cart text-lg"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-orange text-white text-xs font-bold shadow-lg">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Order History Button - Icon Only */}
              <button
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-color text-text-gray transition-all hover:border-primary-orange hover:bg-primary-orange/10 hover:text-primary-orange dark:border-slate-700 dark:text-slate-200 dark:hover:bg-primary-orange/20"
                onClick={() => setIsHistoryOpen(true)}
                aria-label="View order history"
                title="Order History"
              >
                <i className="fas fa-history text-lg"></i>
              </button>
            </div>
          )}

          {/* Login Button */}
          {!currentUser && (
            <button
              className="rounded-lg bg-primary-orange px-4 py-2 font-medium text-white transition hover:bg-primary-orange-dark"
              onClick={handleLoginClick}
            >
              Login / Sign Up
            </button>
          )}

          {/* Logout Button */}
          {currentUser && (
            <button
              className="rounded-lg bg-text-dark px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-black"
              onClick={() => {
                // بنعمل logout الأول
                handleLogout();
                // لو كان في صفحة الـ admin أو history، لازم نخرج منها
                const currentPath = window.location.pathname;
                if (currentPath.includes('/admin') || currentPath.includes('/history')) {
                  // بنستخدم setTimeout عشان نضمن إن الـ state اتحدث
                  setTimeout(() => {
                    navigate('/', { replace: true });
                  }, 50);
                }
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {currentUser && !isAdmin && (
        <>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <OrderHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
        </>
      )}
      {!currentUser && (
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      )}
    </header>
  );
};

export default Header;