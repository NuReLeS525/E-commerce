import { useState } from "react";
import toast from "react-hot-toast";

const CreateCustomerForm = ({ registerCustomer, isRegistering }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password too short");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await registerCustomer(formData);
    if (success) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Register New Customer</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button
          className="btn btn-dark px-4"
          type="submit"
          disabled={isRegistering}
        >
          {isRegistering ? "Creating..." : "Create Customer Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
