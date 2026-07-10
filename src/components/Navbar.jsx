import React from "react";
import { FaUserShield, FaBell } from "react-icons/fa";
import { MdCircle } from "react-icons/md";

export default function Navbar() {
  const currentWorkingDate = new Date().toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });

  return (
    <header className="bg-white border-b border-amber-100 h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest hidden md:inline">
          System Date: {currentWorkingDate}
        </span>
        <div className="flex items-center gap-2 bg-amber-100/50 px-3 py-1 rounded-full text-xs font-bold text-amber-800 border border-amber-200">
          <MdCircle className="text-amber-500 text-[8px] animate-ping" />
          Active Production Hive Workspace
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-stone-500 hover:text-amber-600 transition-colors text-lg">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-amber-500 w-2 h-2 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l pl-6 border-stone-200">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md">
            <FaUserShield />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-stone-800 leading-tight">Neha (Queen Bee)</p>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
