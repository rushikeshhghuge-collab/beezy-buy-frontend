import React from "react";
import { FaUserShield, FaBell } from "react-icons/fa";

export default function Navbar() {
  // Get current working date dynamically for the admin's convenience
  const currentWorkingDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="bg-white border-b border-amber-100 h-16 flex items-center justify-between px-8 shadow-sm">
      {/* Left Context Segment */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest hidden md:inline">
          System Date: {currentWorkingDate}
        </span>
        <div className="flex items-center gap-2 bg-amber-100/50 px-3 py-1 rounded-full text-xs font-bold text-amber-800 border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          🐝 Active Production Hive Workspace
        </div>
      </div>

      {/* Right User Workspace Metrics */}
      <div className="flex items-center gap-6">
        {/* Mock Notification Action Bell */}
        <button className="relative text-stone-500 hover:text-amber-600 transition-colors text-lg">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-amber-500 w-2 h-2 rounded-full"></span>
        </button>

        {/* Admin Credentials Block */}
        <div className="flex items-center gap-3 border-l pl-6 border-stone-200">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md">
            <FaUserShield />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-stone-800 leading-tight">
              Neha (Queen Bee)
            </p>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Super Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
