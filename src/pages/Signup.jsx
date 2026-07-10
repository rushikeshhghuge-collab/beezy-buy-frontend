import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import logoBadge from "../assets/bee-logo-.jpeg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const getStoredUser = () => {
  const raw = localStorage.getItem("beezy_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) { toast.error("Please fill all fields!"); return; }
    if (!EMAIL_REGEX.test(email)) { toast.error("Please enter a valid email address."); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match!"); return; }
    if (!PASSWORD_RULES.test(password)) {
      toast.error("Password must be 8+ chars with uppercase, lowercase, number, and special symbol.");
      return;
    }
    const existingUser = getStoredUser();
    if (existingUser && existingUser.email === email) { toast.error("This email is already registered. Please log in."); return; }
    localStorage.setItem("beezy_user", JSON.stringify({ email, password }));
    localStorage.setItem("beezy_authenticated", "true");
    localStorage.setItem("beezy_current_user", email);
    toast.success("Account created successfully! Welcome to Beezy!");
    navigate("/dashboard");
  };

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
              <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-8">Join the Hive!</h2>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                  <MdEmail className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                  <MdLock className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-stone-400 hover:text-amber-700 ml-2 flex-shrink-0">
                    {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                  </button>
                </div>
                <p className="text-[11px] text-amber-900/80 mt-1 text-left px-2">
                  Password must be 8+ chars and include uppercase, lowercase, number, and special symbol.
                </p>

                <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                  <MdLock className="text-stone-400 text-lg mr-3 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase">
                    Sign Up
                  </button>
                </div>
              </form>

              <div className="mt-6 text-xs font-medium tracking-wide">
                <p className="text-stone-500">
                  Already have an account?{" "}
                  <a href="/" className="text-stone-800 font-bold hover:underline">Log In</a>
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
