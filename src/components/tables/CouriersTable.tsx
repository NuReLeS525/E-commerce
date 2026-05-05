import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { couriersApi } from "../../api/couriers";
import { Courier } from "../../api/types";

// Функция для определения цвета бейджа на основе статуса
const getStatusColor = (active: boolean, approved: boolean) => {
  if (active && approved) return "success";
  if (!active) return "error";
  if (!approved) return "warning";
  return "error";
};

// Функция для получения текста статуса
const getStatusText = (active: boolean, approved: boolean) => {
  if (active && approved) return "Active";
  if (!active) return "Inactive";
  if (!approved) return "Pending";
  return "Unknown";
};

export default function CouriersTable() {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    loadCouriers();
    setLoading(false);
    // setCouriers([
    //   { 
    //     id: 1, 
    //     userEntity: { 
    //       id: 1, 
    //       fullName: 'John Doe', 
    //       email: 'john@example.com', 
    //       username: 'johndoe',
    //       active: true, 
    //       approved: true,
    //       verified: true 
    //     } 
    //   },
    //   { 
    //     id: 2, 
    //     userEntity: { 
    //       id: 2, 
    //       fullName: 'Jane Smith', 
    //       email: 'jane@example.com', 
    //       username: 'janesmith',
    //       active: true, 
    //       approved: false,
    //       verified: false 
    //     } 
    //   },
    //   { 
    //     id: 3, 
    //     userEntity: { 
    //       id: 3, 
    //       fullName: 'Bob Johnson', 
    //       email: 'bob@example.com', 
    //       username: 'bobj',
    //       active: false, 
    //       approved: true,
    //       verified: true, 
    //     } 
    //   }
    // ])
  }, []);

  const loadCouriers = async () => {
    try {
      setLoading(true);
      // Используем API из твоего couriers.ts
      const response = await couriersApi.getAll(); 
      // response.data содержит массив курьеров
      setCouriers(response.data);
      setError(null);
    } catch (err: any) {
      // Обработка ошибок из response interceptor'а
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load couriers';
      setError(errorMessage);
      console.error('Error loading couriers:', err);
      
      // Если 401 - редирект на логин (обрабатывается в interceptor'е)
    } finally {
      setLoading(false);
    }
  };

  // Функция для ручного обновления (можно вызвать после добавления/удаления)
  const refresh = () => {
    loadCouriers();
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
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Courier
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Username
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
                ID
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {couriers.map((courier) => {
              const user = courier.userEntity;
              const statusColor = getStatusColor(user.active, user.approved);
              const statusText = getStatusText(user.active, user.approved);

              return (
                <TableRow key={courier.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/* Аватарка с инициалом */}
                      <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {user.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.fullName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          Courier
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.username || '-'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Badge size="sm" color={statusColor}>
                        {statusText}
                      </Badge>
                      {user.verified && (
                        <span className="text-blue-500" title="Verified">✓</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    #{courier.id}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Пустое состояние */}
      {couriers.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center p-8 text-gray-500 dark:text-gray-400">
          <p className="mb-4">No couriers found</p>
          <p>{couriers.length} {couriers}</p>
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