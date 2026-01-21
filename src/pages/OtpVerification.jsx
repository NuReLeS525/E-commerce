import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ otp: "" });
  const { verifyOtp, isVerifyingOtp } = useAuthStore();

  const validateForm = () => {
    if (!formData.otp) {
      toast.error("Verification code is required");
      return false;
    }

    if (formData.otp.length > 6) {
      toast.error("Verification code must be 6 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const success = await verifyOtp(formData.otp);
    if (!success) return;
    navigate("/");
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
              <h1 className="text-center mb-4">Verification</h1>
              <form onSubmit={handleSubmit}>
                <div className="my-3 text-center">
                  <label className="mb-5">
                    Enter the 6-digit code sent to your email
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="form-control text-center fs-4"
                    style={{ letterSpacing: "5px" }}
                    placeholder="XXXXXX"
                    value={formData.otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 6) setFormData({ otp: value });
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="my-2 btn btn-dark w-100"
                    type="submit"
                    disabled={isVerifyingOtp}
                  >
                    Submit
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

export default OtpVerification;
