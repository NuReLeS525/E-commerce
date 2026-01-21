import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { traderRegister, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (!formData.confirmPassword) {
      toast.error("Please confirm password");
      return false;
    }

    if (!(formData.password === formData.confirmPassword)) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const success = await traderRegister(formData);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-md-6 col-lg-4 mx-auto border rounded p-4 shadow-sm">
              <h1 className="text-center mb-4">Trader Registration</h1>
              <p className="text-center text-muted">
                Create your trader account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form my-3">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={formData.fullName}
                    placeholder="Enter Full Name"
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="Email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    value={formData.email}
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="Password">Password (min 8 characters)</label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    value={formData.password}
                    placeholder="Password"
                    minLength={8}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    minLength={8}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="text-center">
                  <button
                    className="my-2 w-100 btn btn-dark"
                    type="submit"
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className="my-3 d-flex justify-content-center">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-underline text-info"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
