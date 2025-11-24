import { useState } from 'react';
import { Order } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle
} from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function AdminDashboard({ orders, onUpdateOrderStatus }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('orders');

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'delivered').length;
  const completedOrders = orders.filter((o) => o.status === 'delivered').length;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-blue-100 text-blue-700';
      case 'on-the-way':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    if (currentStatus === 'preparing') return 'on-the-way';
    if (currentStatus === 'on-the-way') return 'delivered';
    return null;
  };

  // Group orders by status
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const onTheWayOrders = orders.filter((o) => o.status === 'on-the-way');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Restaurant Dashboard</h1>
        <p className="text-gray-600">Manage your orders and view sales reports</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <ShoppingBag className="size-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Total Orders</span>
          </div>
          <p className="text-2xl text-gray-900">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="size-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total Revenue</span>
          </div>
          <p className="text-2xl text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Clock className="size-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Active Orders</span>
          </div>
          <p className="text-2xl text-gray-900">{activeOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CheckCircle className="size-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <p className="text-2xl text-gray-900">{completedOrders}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reports">Sales Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Preparing Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Package className="size-5 text-blue-600" />
              Preparing ({preparingOrders.length})
            </h3>
            {preparingOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders being prepared</p>
            ) : (
              <div className="space-y-3">
                {preparingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 mb-2">
                        {order.items.map((item) => (
                          <p key={item.menuItem.id} className="text-sm text-gray-600">
                            {item.quantity}x {item.menuItem.name}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-orange-600">${order.total.toFixed(2)}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        const nextStatus = getNextStatus(order.status);
                        if (nextStatus) onUpdateOrderStatus(order.id, nextStatus);
                      }}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Mark as On the Way
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* On the Way Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Package className="size-5 text-orange-600" />
              On the Way ({onTheWayOrders.length})
            </h3>
            {onTheWayOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders on the way</p>
            ) : (
              <div className="space-y-3">
                {onTheWayOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 mb-2">
                        {order.items.map((item) => (
                          <p key={item.menuItem.id} className="text-sm text-gray-600">
                            {item.quantity}x {item.menuItem.name}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-orange-600">${order.total.toFixed(2)}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        const nextStatus = getNextStatus(order.status);
                        if (nextStatus) onUpdateOrderStatus(order.id, nextStatus);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark as Delivered
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Delivered Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="size-5 text-green-600" />
              Recently Delivered ({deliveredOrders.slice(0, 5).length})
            </h3>
            {deliveredOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No delivered orders</p>
            ) : (
              <div className="space-y-3">
                {deliveredOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-600">${order.total.toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="size-5 text-orange-600" />
              Sales Reports
            </h3>

            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Average Order Value</p>
                  <p className="text-2xl text-gray-900">
                    ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                  <p className="text-2xl text-gray-900">
                    {totalOrders > 0
                      ? Math.round((completedOrders / totalOrders) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              {/* Top Items */}
              <div>
                <h4 className="text-gray-900 mb-3">Popular Items</h4>
                <div className="space-y-2">
                  {(() => {
                    const itemCounts: Record<
                      string,
                      { name: string; count: number; revenue: number }
                    > = {};
                    orders.forEach((order) => {
                      order.items.forEach((item) => {
                        const key = item.menuItem.id;
                        if (!itemCounts[key]) {
                          itemCounts[key] = {
                            name: item.menuItem.name,
                            count: 0,
                            revenue: 0
                          };
                        }
                        itemCounts[key].count += item.quantity;
                        itemCounts[key].revenue += item.quantity * item.menuItem.price;
                      });
                    });

                    return Object.values(itemCounts)
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border rounded-lg p-3"
                        >
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.count} orders
                            </p>
                          </div>
                          <p className="text-sm text-orange-600">
                            ${item.revenue.toFixed(2)}
                          </p>
                        </div>
                      ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
