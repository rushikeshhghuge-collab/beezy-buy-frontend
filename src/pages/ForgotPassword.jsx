import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoBadge from "../assets/bee-logo-.jpeg";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!");
      setStep(2);
      setTimer(300); // 5 minutes timer
    } catch (error) {
      toast.error(error.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      toast.success("OTP verified successfully!");
      setStep(3);
    } catch (error) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast.success("OTP resent to your email!");
      setTimer(300); // Reset timer to 5 minutes
    } catch (error) {
      toast.error(error.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#0B3B24] min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden antialiased select-none"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* HEADER NAVIGATION */}
      <header className="w-full pt-6 pb-2 text-center z-30">
        <nav className="flex justify-center gap-10 text-emerald-100/90 text-[13px] font-medium tracking-widest">
          <a href="#" className="hover:text-amber-400 transition-colors">
            Skincare .
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">
            Body Care .
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">
            Beauty .
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">
            Hair Care .
          </a>
        </nav>
      </header>

      {/* CORE CONTENT LAYOUT - PERFECTLY CENTERED */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-12 py-12 relative z-10">
        <div className="w-full max-w-[460px] z-20 flex-shrink-0 relative mt-12">
          {/* FORGOT PASSWORD CARD */}
          <div
            className="w-full rounded-[2.5rem] pt-24 pb-12 px-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] border-[3px] border-[#E2C792] flex flex-col items-center relative"
            style={{
              backgroundColor: "#f4f4f1",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M10 30 Q 70 90 120 40 T 250 80 T 380 20 M30 150 Q 140 220 200 130 T 370 280 M80 320 Q 190 280 280 380' fill='none' stroke='rgba(130,120,110,0.06)' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: "cover",
            }}
          >
            {/* 🎯 LOGO BADGE */}
            <div className="absolute -top-[75px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-[4px] border-[#E2C792] overflow-hidden flex items-center justify-center z-50">
              <img
                src={logoBadge}
                alt="Beezy Buy Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* FORM BLOCKS */}
            <div className="w-full text-center">
              {/* STEP 1: Email */}
              {step === 1 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">
                    Reset Password
                  </h2>
                  <p className="text-stone-600 text-sm mb-8">
                    Enter your email to receive an OTP
                  </p>

                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                      <span className="text-stone-400 text-sm mr-3">✉️</span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending..." : "Send OTP 🐝"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: OTP Verification */}
              {step === 2 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">
                    Verify OTP
                  </h2>
                  <p className="text-stone-600 text-sm mb-2">
                    Enter the OTP sent to <strong>{email}</strong>
                  </p>
                  <p className="text-amber-700 text-xs mb-8">
                    ⏱️ Valid for {timer > 0 ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}` : "Expired"}
                  </p>

                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                      <span className="text-stone-400 text-sm mr-3">🔐</span>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium tracking-widest text-center text-2xl"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || timer === 0}
                        className="w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Verifying..." : "Verify OTP 🐝"}
                      </button>
                    </div>
                  </form>

                  <div className="mt-4">
                    <button
                      onClick={handleResendOTP}
                      disabled={timer > 0 || loading}
                      className="text-amber-700 hover:text-amber-900 text-xs font-bold disabled:text-stone-400 disabled:cursor-not-allowed"
                    >
                      {timer > 0 ? "Resend in " + Math.floor(timer / 60) + ":" + (timer % 60).toString().padStart(2, "0") : "Resend OTP"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3: New Password */}
              {step === 3 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">
                    Set New Password
                  </h2>
                  <p className="text-stone-600 text-sm mb-8">
                    Enter your new password
                  </p>

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                      <span className="text-stone-400 text-sm mr-3">🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs font-bold text-amber-800/80 hover:text-amber-900 tracking-wide pr-1"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                      <span className="text-stone-400 text-sm mr-3">🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Resetting..." : "Reset Password 🐝"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              <div className="mt-6 space-y-2 text-xs font-medium tracking-wide">
                <a
                  href="/"
                  className="text-amber-950/70 hover:text-amber-900 underline block"
                >
                  Back to Login
                </a>
                <p className="text-stone-500">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-stone-800 font-bold hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
            <div className="absolute left-5 bottom-5 flex gap-1 opacity-80 pointer-events-none">
              <div className="w-4 h-4.5 bg-[#1e422f] clip-hex"></div>
              <div className="w-4 h-4.5 bg-[#1e422f] clip-hex transform translate-y-2"></div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER CANVAS */}
      <footer className="w-full h-1 relative z-0 pointer-events-none">
        <div className="absolute bottom-0 right-12 p-8 opacity-[0.12] flex gap-1">
          <div className="w-14 h-16 bg-[#122b1c] clip-hex transform translate-y-3"></div>
          <div className="w-14 h-16 bg-[#122b1c] clip-hex"></div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .clip-hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `,
        }}
      />
    </div>
  );
}
