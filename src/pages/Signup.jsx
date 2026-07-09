import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoBadge from "../assets/bee-logo-.jpeg";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    // Simple validation - in production, this would call a backend API
    localStorage.setItem("beezy_authenticated", "true");
    toast.success("Account created successfully! Welcome to Beezy!");
    navigate("/dashboard");
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
          {/* SIGNUP CARD */}
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
              <h2 className="text-[34px] font-bold text-[#321e11] tracking-tight mb-8">
                Join the Hive!
              </h2>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative flex items-center bg-white border border-[#D4AF37]/50 rounded-full px-5 py-3.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition-all shadow-sm">
                  <span className="text-stone-400 text-sm mr-3">✉️</span>
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
                  <span className="text-stone-400 text-sm mr-3">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#be8422] via-[#b67d1d] to-[#9c6612] text-white font-semibold py-3.5 rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-sm tracking-widest uppercase"
                  >
                    Sign Up 🐝
                  </button>
                </div>
              </form>

              <div className="mt-6 space-y-2 text-xs font-medium tracking-wide">
                <p className="text-stone-500">
                  Already have an account?{" "}
                  <a
                    href="/"
                    className="text-stone-800 font-bold hover:underline"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </div>

            {/* CARD ACCENT CORNER HEX */}
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
