// src/pages/AdminPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AddRestaurantModal from '../components/AddRestaurantModal';
import AddMenuItemModal from '../components/AddMenuItemModal';

const AdminPage = () => {
  const { orders, setOrders, showToast, currentUser, isAuthReady, reviews, restaurants } = useAppContext();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [isChecking, setIsChecking] = useState(true);

  // Modal States
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [targetRestaurantId, setTargetRestaurantId] = useState('');
  const [addItemStep, setAddItemStep] = useState('initial'); // 'initial' or 'select-restaurant'

  // لازم كل الـ hooks تكون في الأول قبل أي return
  // فلترة الطلبات حسب الحالة
  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter(o => o.status === statusFilter);
  }, [orders, statusFilter]);

  // حساب الإحصائيات حسب المطاعم
  const restaurantStats = useMemo(() => {
    const stats = {};
    orders.forEach(order => {
      if (!stats[order.restaurantId]) {
        stats[order.restaurantId] = {
          name: order.restaurantName,
          count: 0,
          revenue: 0
        };
      }
      stats[order.restaurantId].count++;
      stats[order.restaurantId].revenue += order.total;
    });
    return Object.values(stats).sort((a, b) => b.revenue - a.revenue);
  }, [orders]);

  // بنتحقق من الـ authentication بعد ما الـ context يجهز
  useEffect(() => {
    if (!isAuthReady) {
      setIsChecking(true);
      return;
    }

    setIsChecking(false);

    // لو مش admin، بنرجع للصفحة الرئيسية
    if (!currentUser || currentUser.role !== 'admin') {
      // لو الـ user عمل logout، مش لازم نعرض toast
      if (currentUser === null) {
        navigate('/', { replace: true });
      } else {
        showToast('Admins only', 'error');
        navigate('/', { replace: true });
      }
    }
  }, [currentUser, isAuthReady, navigate, showToast]);

  // حساب الإحصائيات
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'preparing').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  // لو لسه بنتحقق، بنعرض loading
  if (isChecking || !isAuthReady) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
            <p className="text-text-gray dark:text-slate-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // لو مش admin بعد ما الـ auth جهز، بنعرض redirecting (الـ redirect هيحصل في الـ useEffect)
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-text-gray dark:text-slate-400">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  // دالة تغيير حالة الطلب
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  // بنفلتر المراجعات اللي بتاعة طلبات موجودة فعلاً
  const reviewFeed = [...reviews]
    .reverse()
    .filter(review => orders.some(order => order.id === review.orderId));

  // Handlers for Add Logic
  const handleOpenAddOptions = () => {
    setAddItemStep('initial');
    setTargetRestaurantId('');
    setShowAddOptions(true);
  };

  const handleSelectRestaurantForMenuItem = () => {
    if (!targetRestaurantId) {
      showToast('Please select a restaurant first', 'error');
      return;
    }
    setShowAddOptions(false);
    setShowAddMenuItem(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 text-text-dark dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Restaurant Admin Dashboard</h1>

        <button
          onClick={handleOpenAddOptions}
          className="flex items-center justify-center gap-2 bg-primary-orange text-white px-6 py-3 rounded-xl hover:bg-primary-orange-dark transition-all shadow-lg hover:shadow-primary-orange/30 active:scale-95 font-semibold"
        >
          <i className="fas fa-plus"></i>
          <span>Add New</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
          <div className="mb-1 text-sm text-text-gray dark:text-slate-400">Total Orders</div>
          <div className="text-2xl font-bold text-primary-orange">{totalOrders}</div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
          <div className="mb-1 text-sm text-text-gray dark:text-slate-400">Total Revenue</div>
          <div className="text-2xl font-bold text-primary-orange">${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
          <div className="mb-1 text-sm text-text-gray dark:text-slate-400">Preparing</div>
          <div className="text-2xl font-bold text-orange-500">{pendingOrders}</div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
          <div className="mb-1 text-sm text-text-gray dark:text-slate-400">Delivered</div>
          <div className="text-2xl font-bold text-green-500">{deliveredOrders}</div>
        </div>
      </div>

      {/* Sales Reports Section */}
      <div className="mb-8 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
        <h2 className="mb-4 text-xl font-bold text-text-dark dark:text-white">Sales Reports by Restaurant</h2>
        {restaurantStats.length === 0 ? (
          <p className="text-text-gray dark:text-slate-400">No sales data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-color/70 dark:border-slate-700">
                  <th className="pb-2 text-left font-semibold text-text-dark dark:text-white">Restaurant</th>
                  <th className="pb-2 text-right font-semibold text-text-dark dark:text-white">Orders</th>
                  <th className="pb-2 text-right font-semibold text-text-dark dark:text-white">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {restaurantStats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-border-color/30 dark:border-slate-800">
                    <td className="py-3 text-text-dark dark:text-white">{stat.name}</td>
                    <td className="py-3 text-right text-text-gray dark:text-slate-300">{stat.count}</td>
                    <td className="py-3 text-right font-semibold text-primary-orange">${stat.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Orders Management */}
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-dark dark:text-white">Orders Management</h2>
          <select
            className="rounded border border-border-color px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="preparing">Preparing</option>
            <option value="on-the-way">On the Way</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        {filteredOrders.length === 0 ? (
          <p className="text-text-gray dark:text-slate-400">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {[...filteredOrders].reverse().slice(0, 15).map(order => (
              <div key={order.id} className="border-b border-border-color/70 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-text-dark dark:text-white">Order #{order.id}</h3>
                    <p className="text-sm text-text-gray dark:text-slate-400">{order.restaurantName}</p>
                    <p className="text-xs text-text-gray dark:text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <select
                    className="rounded border border-border-color px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="preparing">Preparing</option>
                    <option value="on-the-way">On the Way</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <div className="mb-2 rounded bg-bg-gray p-3 dark:bg-slate-800/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-text-dark dark:text-slate-100">
                      <span>{item.quantity}x {item.menuItem.name}</span>
                      <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-text-gray dark:text-slate-300">
                  <div>
                    <div>📞 {order.phone || 'N/A'}</div>
                    <div>📍 {order.address || 'N/A'}</div>
                  </div>
                  <div className="font-bold text-text-dark dark:text-white">Total: ${order.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/70">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-dark dark:text-white">Latest Customer Ratings</h2>
          <span className="text-xs uppercase tracking-wide text-text-gray dark:text-slate-400">
            {reviewFeed.length} feedback{reviewFeed.length === 1 ? '' : 's'}
          </span>
        </div>
        {reviewFeed.length === 0 ? (
          <p className="text-text-gray dark:text-slate-400">No reviews yet. Encourage customers to rate their meals.</p>
        ) : (
          <div className="space-y-4">
            {reviewFeed.slice(0, 8).map(review => (
              <div
                key={review.id}
                className="rounded-lg border border-border-color/70 p-4 dark:border-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-text-dark dark:text-white">
                      {review.menuItemName} • {review.restaurantName || 'N/A'}
                    </p>
                    <p className="text-xs text-text-gray dark:text-slate-400">
                      Order #{review.orderId} • {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary-orange">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <i
                        key={idx}
                        className={`fas fa-star ${idx < review.rating ? 'text-primary-orange' : 'text-border-color dark:text-slate-700'}`}
                      ></i>
                    ))}
                    <span className="ml-2 text-sm text-text-dark dark:text-white">{review.rating}/5</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-dark dark:text-slate-200">
                  {review.comment || 'No written feedback provided.'}
                </p>
                <div className="mt-2 text-xs text-text-gray dark:text-slate-400">
                  Total order value: ${review.orderTotal?.toFixed(2) || '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Options Modal */}
      {showAddOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div
            className="absolute inset-0"
            onClick={() => setShowAddOptions(false)}
          ></div>

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all dark:bg-slate-800 dark:border dark:border-slate-700 animate-in fade-in zoom-in duration-300">
            <div className="bg-primary-orange p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {addItemStep === 'initial' ? 'What would you like to add?' : 'Select Restaurant'}
                </h2>
                <button onClick={() => setShowAddOptions(false)} className="text-white/80 hover:text-white">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {addItemStep === 'initial' ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowAddOptions(false);
                      setShowAddRestaurant(true);
                    }}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-primary-orange hover:bg-primary-orange/5 hover:shadow-lg dark:bg-slate-700/50 dark:hover:bg-slate-700"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-primary-orange dark:bg-slate-600 dark:text-orange-400">
                      <i className="fas fa-store text-3xl"></i>
                    </div>
                    <span className="font-bold text-text-dark dark:text-white">Restaurant</span>
                  </button>

                  <button
                    onClick={() => setAddItemStep('select-restaurant')}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-primary-orange hover:bg-primary-orange/5 hover:shadow-lg dark:bg-slate-700/50 dark:hover:bg-slate-700"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-slate-600 dark:text-blue-400">
                      <i className="fas fa-utensils text-3xl"></i>
                    </div>
                    <span className="font-bold text-text-dark dark:text-white">Menu Item</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                      Select a restaurant to add items to:
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      value={targetRestaurantId}
                      onChange={(e) => setTargetRestaurantId(e.target.value)}
                    >
                      <option value="">-- Select Restaurant --</option>
                      {restaurants.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setAddItemStep('initial')}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSelectRestaurantForMenuItem}
                      disabled={!targetRestaurantId}
                      className="flex-1 rounded-lg bg-primary-orange px-4 py-2 text-sm font-medium text-white hover:bg-primary-orange-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddRestaurantModal
        isOpen={showAddRestaurant}
        onClose={() => setShowAddRestaurant(false)}
      />

      <AddMenuItemModal
        isOpen={showAddMenuItem}
        onClose={() => setShowAddMenuItem(false)}
        restaurantId={targetRestaurantId}
        categories={restaurants.find(r => r.id === targetRestaurantId)?.categories || []}
      />
    </div>
  );
};

export default AdminPage;