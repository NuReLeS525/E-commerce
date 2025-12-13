import React from "react";

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

import { Footer, Navbar } from "../components";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
  });

  const { verifyOtp, isVerifyingOtp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verifyOtp(formData.otp);
    if (success) navigate("/Home");
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">OTP Verification</h1>
        <div className="row h-100 d-flex justify-content-center align-items-center">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label>We've sent you verification code to your email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter verification code"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
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
      <Footer />
    </>
  );
};

export default OtpVerification;
