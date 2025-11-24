import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './HomePage';
import { RestaurantPage } from './RestaurantPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderTrackingPage } from './OrderTrackingPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import App from './App';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:orderId" element={<OrderTrackingPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


