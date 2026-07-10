import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdLockClock } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import logoBadge from "../assets/bee-logo-.jpeg";
import { api } from "../api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  // Auto-fill from the currently logged-in user's email
  const [email, setEmail] = useState(
    () => localStorage.getItem("beezy_current_user") || ""
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((p) => p - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimer = () =>
    `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email!"); return; }
    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/send-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      toast.success(`OTP sent to ${email}!`);
      setStep(2);
      setTimer(300);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) { toast.error("Please enter the OTP!"); return; }
    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/verify-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to verify OTP");
      toast.success("OTP verified!");
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) { toast.error("Please fill all fields!"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match!"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters!"); return; }
    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      // Update password in localStorage if this email matches a signup user
      const raw = localStorage.getItem("beezy_user");
      if (raw) {
        try {
          const user = JSON.parse(raw);
          if (user?.email?.toLowerCase() === email.trim().toLowerCase()) {
            localStorage.setItem("beezy_user", JSON.stringify({ ...user, password: newPassword }));
          }
        } catch { /* ignore */ }
      }

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/send-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");
      toast.success("OTP resent!");
      setTimer(300);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputRow = "relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm";
  const btnClass = "w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="bg-[#0B3B24] min-h-screen w-full flex flex-col justify-between overflow-x-hidden antialiased select-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="w-full pt-6 pb-2 text-center z-30">
        <nav className="flex justify-center gap-10 text-emerald-100/90 text-[13px] font-medium tracking-widest">
          <a href="#" className="hover:text-amber-400 transition-colors">Skincare .</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Body Care .</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Beauty .</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Hair Care .</a>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 md:px-12 py-12 relative z-10">
        <div className="w-full max-w-[460px] z-20 flex-shrink-0 relative mt-12">
          <div
            className="w-full rounded-[2.5rem] pt-24 pb-12 px-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] border-[3px] border-[#E2C792] flex flex-col items-center relative"
            style={{ backgroundColor: "#f4f4f1" }}
          >
            <div className="absolute -top-[75px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-[4px] border-[#E2C792] overflow-hidden flex items-center justify-center z-50">
              <img src={logoBadge} alt="Beezy Buy Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="w-full text-center">

              {/* STEP 1 — Enter email */}
              {step === 1 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">Reset Password</h2>
                  <p className="text-stone-500 text-sm mb-8">OTP will be sent to your registered email inbox</p>
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className={inputRow}>
                      <MdEmail className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                      <input
                        type="email"
                        placeholder="Your registered email"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                    {email && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 font-semibold">
                        OTP will be sent to: <strong>{email}</strong>
                      </p>
                    )}
                    <div className="pt-2">
                      <button type="submit" disabled={loading} className={btnClass}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2 — Enter OTP */}
              {step === 2 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">Enter OTP</h2>
                  <p className="text-stone-500 text-sm mb-1">
                    OTP sent to <strong className="text-stone-800">{email}</strong>
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs mb-8 font-semibold">
                    <MdLockClock className="text-base" />
                    <span>Valid for {timer > 0 ? formatTimer() : <span className="text-red-500">Expired</span>}</span>
                  </div>
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className={inputRow}>
                      <MdLock className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="6-digit OTP"
                        maxLength="6"
                        className="bg-transparent w-full outline-none font-bold text-stone-700 placeholder-stone-400 tracking-[0.4em] text-center text-xl"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="pt-2">
                      <button type="submit" disabled={loading || timer === 0} className={btnClass}>
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  </form>
                  <button
                    onClick={handleResendOTP}
                    disabled={timer > 0 || loading}
                    className="mt-4 flex items-center justify-center gap-1.5 mx-auto text-amber-700 hover:text-amber-900 text-xs font-bold disabled:text-stone-400 disabled:cursor-not-allowed"
                  >
                    <FiRefreshCw className="text-sm" />
                    {timer > 0 ? `Resend in ${formatTimer()}` : "Resend OTP"}
                  </button>
                </>
              )}

              {/* STEP 3 — New password */}
              {step === 3 && (
                <>
                  <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-2">New Password</h2>
                  <p className="text-stone-500 text-sm mb-8">Set your new password below</p>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className={inputRow}>
                      <MdLock className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={loading}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-stone-400 hover:text-amber-700 ml-2 flex-shrink-0">
                        {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                      </button>
                    </div>
                    <div className={inputRow}>
                      <MdLock className="text-stone-400 text-lg mr-3 flex-shrink-0" />
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
                      <button type="submit" disabled={loading} className={btnClass}>
                        {loading ? "Resetting..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              <div className="mt-6 space-y-2 text-xs font-medium tracking-wide">
                <a href="/" className="text-amber-950/70 hover:text-amber-900 underline block">Back to Login</a>
                <p className="text-stone-500">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-stone-800 font-bold hover:underline">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full h-1 relative z-0 pointer-events-none">
        <div className="absolute bottom-0 right-12 p-8 opacity-[0.12] flex gap-1">
          <div className="w-14 h-16 bg-[#122b1c] clip-hex transform translate-y-3"></div>
          <div className="w-14 h-16 bg-[#122b1c] clip-hex"></div>
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `.clip-hex { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }` }} />
    </div>
  );
}
