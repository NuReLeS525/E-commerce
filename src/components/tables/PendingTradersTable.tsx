import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { tradersApi } from "../../api/traders";
import { Trader } from "../../api/types";

// Модальное окно для причины отказа
function RejectModal({ isOpen, onClose, onConfirm, traderName }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  traderName: string;
}) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Reject Trader: {traderName}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reason for rejection *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Enter rejection reason..."
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              // type="button"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              // type="button"
              onClick={() => onConfirm(reason)}
              disabled={!reason.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PendingTradersTable() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ isOpen: boolean; traderId: number; traderName: string }>({
    isOpen: false,
    traderId: 0,
    traderName: ''
  });

  useEffect(() => {
    // Временно закомментируем API
    loadPendingTraders();

    // Тестовые данные
    /* setTraders([
      {
        id: 1,
        userEntity: {
          id: 101,
          fullName: "Иван Петров",
          email: "ivan.petrov@example.com",
          username: "ivan_p",
          active: true,
          approved: false,
          verified: true
        },
        companyName: "ООО 'ТехноМаркет'",
        registrationNumber: "1234567890",
        phone: "+7 (999) 123-45-67",
        address: "г. Москва, ул. Ленина, д. 10",
        status: "PENDING",
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 дня назад
        documents: [
          {
            id: 1,
            fileName: "registration_certificate.pdf",
            fileUrl: "/docs/reg1.pdf",
            documentType: "REGISTRATION",
            uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString()
          },
          {
            id: 2,
            fileName: "tax_document.pdf",
            fileUrl: "/docs/tax1.pdf",
            documentType: "TAX",
            uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString()
          }
        ]
      },
      {
        id: 2,
        userEntity: {
          id: 102,
          fullName: "Елена Соколова",
          email: "elena.sokolova@example.com",
          username: "elena_s",
          active: true,
          approved: false,
          verified: true
        },
        companyName: "ИП Соколова",
        registrationNumber: "9876543210",
        phone: "+7 (999) 765-43-21",
        address: "г. Санкт-Петербург, Невский пр., д. 25",
        status: "PENDING",
        submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 дней назад
        documents: [
          {
            id: 3,
            fileName: "passport.pdf",
            fileUrl: "/docs/passport2.pdf",
            documentType: "PASSPORT",
            uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString()
          }
        ]
      },
      {
        id: 3,
        userEntity: {
          id: 103,
          fullName: "Алексей Смирнов",
          email: "alexey.smirnov@example.com",
          username: "alexey_s",
          active: true,
          approved: false,
          verified: false
        },
        companyName: "ООО 'СтройГрупп'",
        registrationNumber: "5554443332",
        phone: "+7 (999) 333-22-11",
        address: "г. Казань, ул. Баумана, д. 5",
        status: "PENDING",
        submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 день назад
        documents: [] // Нет документов
      },
      {
        id: 4,
        userEntity: {
          id: 104,
          fullName: "Мария Иванова",
          email: "maria.ivanova@example.com",
          username: "maria_i",
          active: true,
          approved: false,
          verified: true
        },
        companyName: "ООО 'МодаСтиль'",
        registrationNumber: "1112223334",
        phone: "+7 (999) 444-55-66",
        address: "г. Новосибирск, ул. Советская, д. 15",
        status: "PENDING",
        submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 дня назад
        documents: [
          {
            id: 4,
            fileName: "registration.pdf",
            fileUrl: "/docs/reg4.pdf",
            documentType: "REGISTRATION",
            uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString()
          },
          {
            id: 5,
            fileName: "license.pdf",
            fileUrl: "/docs/license4.pdf",
            documentType: "LICENSE",
            uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString()
          },
          {
            id: 6,
            fileName: "bank_details.pdf",
            fileUrl: "/docs/bank4.pdf",
            documentType: "BANK",
            uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString()
          }
        ]
      }
    ]); */

    setLoading(false);
  }, []);

  const loadPendingTraders = async () => {
    try {
      setLoading(true);
      const response = await tradersApi.getPending();
      setTraders(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load pending traders');
      console.error('Error loading traders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (!window.confirm('Are you sure you want to approve this trader?')) {
      return;
    }

    try {
      await tradersApi.approve(id);
      loadPendingTraders(); // Перезагружаем список
    } catch (err: any) {
      alert('Failed to approve trader: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (id: number, reason: string) => {

    try {
      await tradersApi.reject(id, { reason });
      setRejectModal({ isOpen: false, traderId: 0, traderName: '' });
      loadPendingTraders();
    } catch (err: any) {
      alert('Failed to reject trader: ' + (err.response?.data?.message || err.message));
    }
  };

  const refresh = () => {
    loadPendingTraders();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Pending Traders ({traders.length})
          </h2>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Trader
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Company
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Contact
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Submitted
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
                  Documents
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {traders.map((trader) => {
                const user = trader.userEntity;

                return (
                  <TableRow key={trader.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-medium">
                          {/* {user.fullName?.charAt(0)?.toUpperCase() || '?'} */}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {trader.fullName}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {/* @{user.username || 'username'} */}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {trader.email || '—'}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {/* Reg: {trader.registrationNumber || '—'} */}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <div>
                        <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                          {/* {user.email} */}
                        </span>
                        {trader.phone && (
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {/* {trader.phone} */}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatDate(trader.submittedAt)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <Badge size="sm" color="warning">
                        PENDING
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      {trader.documents && trader.documents.length > 0 ? (
                        <button
                          onClick={() => {/* Показать документы */ }}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {trader.documents.length} file(s)
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(trader.id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                          title="Approve"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectModal({
                            isOpen: true,
                            traderId: trader.id,
                            traderName: trader.fullName
                          })}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
                          title="Reject"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {traders.length === 0 && !loading && (
          <div className="flex flex-col justify-center items-center p-8 text-gray-500 dark:text-gray-400">
            <p>aoaoa</p>
            <p className="mb-4">No pending traders found</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно для отказа */}
      <RejectModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, traderId: 0, traderName: '' })}
        onConfirm={(reason) => handleReject(rejectModal.traderId, reason)}
        traderName={rejectModal.traderName}
      />
    </>
  );
}