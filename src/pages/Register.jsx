import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData);
      navigate('/Login')
    };
  };
  
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">Register</h1>
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label for="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={formData.username}
                  placeholder="Enter Your Name"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="form my-3">
                <label for="Email">Email address</label>
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
              <div className="form  my-3">
                <label for="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 w-100 btn btn-dark"
                  type="submit"
                  disabled={isRegistering}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register