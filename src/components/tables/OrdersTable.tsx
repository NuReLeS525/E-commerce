import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { ordersApi } from "../../api/orders";
import { OrderEntity, OrderStatus } from "../../api/types";

// Функция для получения цвета статуса заказа
const getOrderStatusColor = (status: OrderStatus): "success" | "warning" | "error" | "info" => {
  switch (status) {
    case 'DELIVERED': return 'success';
    case 'IN_TRANSIT': return 'info';
    case 'ACCEPTED': return 'warning';
    case 'PICKED_UP': return 'warning';
    case 'ASSIGNED': return 'warning';
    case 'FAILED': return 'error';
    default: return 'info';
  }
};

// Русские названия статусов
const getOrderStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'ASSIGNED': return 'Assigned';
    case 'ACCEPTED': return 'Accepted';
    case 'PICKED_UP': return 'Picked Up';
    case 'IN_TRANSIT': return 'In Transit';
    case 'DELIVERED': return 'Delivered';
    case 'FAILED': return 'Failed';
    default: return status;
  }
};

// Форматирование даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Форматирование цены
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // loadOrders();
    // Временно для теста (в useEffect)
    setOrders([
      {
        id: 1,
        customerEntity: {
          id: 1,
          userEntity: {
            id: 1,
            email: "john.doe@example.com",
            fullName: "John Doe",
            username: "johndoe",
            active: true,
            approved: true,
            verified: true
          },
          address: "123 Main St",
          city: "New York"
        },
        city: "New York",
        address: "123 Main St, Apt 4B",
        createdAt: new Date().toISOString(),
        totalPrice: 299.99,
        status: "ASSIGNED",
        trader: {
          id: 1,
          email: "trader@example.com",
          fullName: "Tech Trader",
          username: "techtrader",
          roles: [{ id: 1, name: "TRADER" }],
          otpEnabled: false,
          otpAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true,
          approved: true,
          rejected: false,
          verified: true
        },
        orderItems: [
          {
            id: 1,
            product: {
              id: 1,
              name: "iPhone 15",
              description: "Latest Apple smartphone",
              price: 999.99,
              stockQuantity: 50,
              category: { id: 1, name: "Electronics" },
              trader: {} as any
            },
            quantity: 2,
            currentPrice: 999.99
          },
          {
            id: 2,
            product: {
              id: 2,
              name: "AirPods Pro",
              description: "Wireless earbuds",
              price: 249.99,
              stockQuantity: 100,
              category: { id: 1, name: "Electronics" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 249.99
          }
        ]
      },
      {
        id: 2,
        customerEntity: {
          id: 2,
          userEntity: {
            id: 2,
            email: "jane.smith@example.com",
            fullName: "Jane Smith",
            username: "janesmith",
            active: true,
            approved: true,
            verified: true
          },
          address: "456 Oak Ave",
          city: "Los Angeles"
        },
        city: "Los Angeles",
        address: "456 Oak Ave, Suite 2",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        totalPrice: 149.50,
        status: "IN_TRANSIT",
        trader: {
          id: 2,
          email: "fashion@example.com",
          fullName: "Fashion Trader",
          username: "fashiontrader",
          roles: [{ id: 1, name: "TRADER" }],
          otpEnabled: false,
          otpAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true,
          approved: true,
          rejected: false,
          verified: true
        },
        orderItems: [
          {
            id: 3,
            product: {
              id: 3,
              name: "Leather Jacket",
              description: "Premium leather jacket",
              price: 149.50,
              stockQuantity: 20,
              category: { id: 2, name: "Clothing" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 149.50
          }
        ]
      },
      {
        id: 3,
        customerEntity: {
          id: 3,
          userEntity: {
            id: 3,
            email: "mike.wilson@example.com",
            fullName: "Mike Wilson",
            username: "mikew",
            active: true,
            approved: true,
            verified: false
          },
          address: "789 Pine St",
          city: "Chicago"
        },
        city: "Chicago",
        address: "789 Pine St, Floor 3",
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        totalPrice: 67.98,
        status: "DELIVERED",
        trader: {
          id: 3,
          email: "books@example.com",
          fullName: "Book Trader",
          username: "booktrader",
          roles: [{ id: 1, name: "TRADER" }],
          otpEnabled: false,
          otpAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true,
          approved: true,
          rejected: false,
          verified: true
        },
        orderItems: [
          {
            id: 4,
            product: {
              id: 4,
              name: "The Great Gatsby",
              description: "Classic novel",
              price: 12.99,
              stockQuantity: 200,
              category: { id: 3, name: "Books" },
              trader: {} as any
            },
            quantity: 2,
            currentPrice: 12.99
          },
          {
            id: 5,
            product: {
              id: 5,
              name: "1984",
              description: "Dystopian novel",
              price: 14.99,
              stockQuantity: 150,
              category: { id: 3, name: "Books" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 14.99
          },
          {
            id: 6,
            product: {
              id: 6,
              name: "Bookmark",
              description: "Leather bookmark",
              price: 2.99,
              stockQuantity: 500,
              category: { id: 4, name: "Accessories" },
              trader: {} as any
            },
            quantity: 3,
            currentPrice: 2.99
          }
        ]
      },
      {
        id: 4,
        customerEntity: {
          id: 4,
          userEntity: {
            id: 4,
            email: "sarah.connor@example.com",
            fullName: "Sarah Connor",
            username: "sarahc",
            active: true,
            approved: true,
            verified: true
          },
          address: "321 Tech Blvd",
          city: "Seattle"
        },
        city: "Seattle",
        address: "321 Tech Blvd, Suite 100",
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        totalPrice: 1299.99,
        status: "ACCEPTED",
        trader: {
          id: 4,
          email: "gaming@example.com",
          fullName: "Gaming Trader",
          username: "gamingtrader",
          roles: [{ id: 1, name: "TRADER" }],
          otpEnabled: false,
          otpAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true,
          approved: true,
          rejected: false,
          verified: true
        },
        orderItems: [
          {
            id: 7,
            product: {
              id: 7,
              name: "PlayStation 5",
              description: "Next-gen gaming console",
              price: 499.99,
              stockQuantity: 10,
              category: { id: 1, name: "Electronics" },
              trader: {} as any
            },
            quantity: 2,
            currentPrice: 499.99
          },
          {
            id: 8,
            product: {
              id: 8,
              name: "DualSense Controller",
              description: "Wireless controller",
              price: 69.99,
              stockQuantity: 30,
              category: { id: 1, name: "Electronics" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 69.99
          },
          {
            id: 9,
            product: {
              id: 9,
              name: "Gaming Headset",
              description: "Wireless gaming headset",
              price: 129.99,
              stockQuantity: 25,
              category: { id: 1, name: "Electronics" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 129.99
          }
        ]
      },
      {
        id: 5,
        customerEntity: {
          id: 5,
          userEntity: {
            id: 5,
            email: "alex.kim@example.com",
            fullName: "Alex Kim",
            username: "alexk",
            active: true,
            approved: true,
            verified: false
          },
          address: "555 Market St",
          city: "San Francisco"
        },
        city: "San Francisco",
        address: "555 Market St, 5th Floor",
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        totalPrice: 89.97,
        status: "PICKED_UP",
        trader: {
          id: 5,
          email: "sports@example.com",
          fullName: "Sports Trader",
          username: "sportstrader",
          roles: [{ id: 1, name: "TRADER" }],
          otpEnabled: false,
          otpAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true,
          approved: true,
          rejected: false,
          verified: true
        },
        orderItems: [
          {
            id: 10,
            product: {
              id: 10,
              name: "Running Shoes",
              description: "Professional running shoes",
              price: 89.97,
              stockQuantity: 45,
              category: { id: 5, name: "Sports" },
              trader: {} as any
            },
            quantity: 1,
            currentPrice: 89.97
          }
        ]
      }
    ]);
    setLoading(false);
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getAll();

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.warn('Unexpected response format:', response.data);
        setOrders([]);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load orders');
      console.error('Error loading orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
    try {
      await ordersApi.update(id, { status: newStatus });
      loadOrders();
    } catch (err: any) {
      alert('Failed to update order status');
    }
  };

  const refresh = () => {
    loadOrders();
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col justify-center items-center p-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Order ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Customer
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Items
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Delivery
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Trader
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {orders.map((order) => {
              const customer = order.customerEntity?.userEntity;
              const trader = order.trader;

              return (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      #{order.id}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {customer?.fullName || 'N/A'}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {customer?.email || 'N/A'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatDate(order.createdAt)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="font-medium">{order.orderItems?.length || 0}</span> items
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 font-medium">
                    {formatPrice(order.totalPrice)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <div>
                      <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                        {order.city || 'N/A'}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.address || 'N/A'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <option value="ASSIGNED">Assigned</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="PICKED_UP">Picked Up</option>
                      <option value="IN_TRANSIT">In Transit</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                      {trader?.fullName || 'N/A'}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {(!orders || orders.length === 0) && !loading && (
        <div className="flex flex-col justify-center items-center p-8 text-gray-500 dark:text-gray-400">
          <p className="mb-4">No orders found</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}