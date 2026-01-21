import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { Footer, Navbar, CreateCustomerForm } from "../components";

const Profile = () => {
  const navigate = useNavigate();
  const {
    registerCustomer,
    isRegistering,
    isAuthenticated,
    authUser,
    logout,
  } = useAuthStore();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center">
              <div className="mb-3">
                <i className="fa fa-user-circle fa-5x text-secondary"></i>
              </div>
              <h4>{authUser?.fullName || "User"}</h4>
              <p className="text-muted">
                {authUser?.email || authUser?.username}
              </p>
              <span className="badge bg-info mb-3">
                {authUser?.role || "CUSTOMER"}
              </span>
              {authUser?.role === "ROLE_ADMIN" && (
                <Link to="/admin" className="btn btn-primary w-100 mb-2">
                  <i className="fa fa-cog me-2"></i>
                  Admin Dashboard
                </Link>
              )}
              <button className="btn btn-outline-danger w-100" onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          <div className="col-md-8">
            {authUser?.role === "ROLE_TRADER" ? (
              <CreateCustomerForm registerCustomer={registerCustomer} isRegistering={isRegistering} />
            ) : (
              <div className="card shadow-sm p-4 bg-light"></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
