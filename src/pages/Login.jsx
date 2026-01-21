import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login(formData);
    if (!result.success) return;

    if (result.otpRequired) {
      navigate("/verification");
    } else {
      navigate("/");
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
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="my-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="my-3 d-flex justify-content-center">
                  <p>
                    Trader?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-underline text-info"
                    >
                      Create new account
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="my-2 btn btn-dark w-100"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>
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

export default Login;
