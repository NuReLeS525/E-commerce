import { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const AdminTraders = () => {
  const {
    pendingTraders,
    isLoadingTraders,
    approveTrader,
    rejectTrader,
  } = useAdminStore();

  const [processing, setProcessing] = useState(null);

  const handleApprove = async (traderId) => {
    setProcessing(traderId);
    try {
      await approveTrader(traderId);
    } catch (error) {
      console.error("Error approving trader:", error);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (traderId) => {
    if (!window.confirm("Are you sure you want to reject this trader?")) {
      return;
    }
    setProcessing(traderId);
    try {
      await rejectTrader(traderId);
    } catch (error) {
      console.error("Error rejecting trader:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          <i className="fa fa-users me-2"></i>
          Pending Traders
        </h4>
      </div>
      <div className="card-body">
        {isLoadingTraders ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading pending traders...</p>
          </div>
        ) : pendingTraders.length === 0 ? (
          <div className="text-center py-5">
            <i className="fa fa-check-circle fa-3x text-success mb-3"></i>
            <h5>No Pending Traders</h5>
            <p className="text-muted">All traders have been reviewed.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTraders.map((trader) => (
                  <tr key={trader.id}>
                    <td>{trader.id}</td>
                    <td>
                      <strong>{trader.fullName}</strong>
                    </td>
                    <td>{trader.email}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleApprove(trader.id)}
                          disabled={processing === trader.id}
                        >
                          {processing === trader.id ? (
                            <span className="spinner-border spinner-border-sm me-1"></span>
                          ) : (
                            <i className="fa fa-check me-1"></i>
                          )}
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(trader.id)}
                          disabled={processing === trader.id}
                        >
                          {processing === trader.id ? (
                            <span className="spinner-border spinner-border-sm me-1"></span>
                          ) : (
                            <i className="fa fa-times me-1"></i>
                          )}
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTraders;
