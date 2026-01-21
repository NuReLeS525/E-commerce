import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { AdminTraders, AdminProducts, AdminCategories } from "../components/admin";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { authUser, isAuthenticated } = useAuthStore();
  const {
    pendingTraders,
    products,
    categories,
    isLoadingTraders,
    isLoadingProducts,
    isLoadingCategories,
    getPendingTraders,
    getProducts,
    getCategories,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState("traders");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (authUser?.role !== "ROLE_ADMIN" && authUser?.role !== "ADMIN") {
      navigate("/");
      toast.error("Access denied. Admin only.");
      return;
    }
    loadData();
  }, [isAuthenticated, authUser]);

  const loadData = () => {
    getPendingTraders();
    getProducts();
    getCategories();
  };

  if (!isAuthenticated || (authUser?.role !== "ROLE_ADMIN" && authUser?.role !== "ADMIN")) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Admin Dashboard</h2>
              <button
                className="btn btn-outline-primary"
                onClick={loadData}
                disabled={isLoadingTraders || isLoadingProducts || isLoadingCategories}
              >
                <i className="fa fa-refresh"></i> Refresh
              </button>
            </div>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "traders" ? "active" : ""}`}
                  onClick={() => setActiveTab("traders")}
                >
                  <i className="fa fa-users me-2"></i>
                  Pending Traders ({pendingTraders.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "products" ? "active" : ""}`}
                  onClick={() => setActiveTab("products")}
                >
                  <i className="fa fa-shopping-bag me-2"></i>
                  Products ({products.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "categories" ? "active" : ""}`}
                  onClick={() => setActiveTab("categories")}
                >
                  <i className="fa fa-tags me-2"></i>
                  Categories ({categories.length})
                </button>
              </li>
            </ul>

            {activeTab === "traders" && <AdminTraders />}
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "categories" && <AdminCategories />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
