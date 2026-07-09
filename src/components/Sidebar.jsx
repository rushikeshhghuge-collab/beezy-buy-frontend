import React from "react";
import logoBadge from "../assets/bee-logo-.jpeg";

export default function Sidebar({ currentTab, setCurrentTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard Stats", icon: "📊" },
    { id: "inventory", label: "Products Inventory", icon: "📦" },
    { id: "add-product", label: "Add New Product", icon: "➕" },
  ];

  return (
    <aside className="w-[280px] bg-[#0A1A12] flex flex-col justify-between p-6 border-r border-[#E2C792]/20 flex-shrink-0">
      <div className="flex flex-col items-center pt-4">
        <div className="w-24 h-24 rounded-full border-2 border-[#E2C792] shadow-[0_0_15px_rgba(226,199,146,0.2)] overflow-hidden bg-white flex items-center justify-center mb-3">
          <img
            src={logoBadge}
            alt="Logo"
            className="w-full h-full object-cover scale-150 transform origin-center"
          />
        </div>
        <h1 className="text-lg font-black text-[#E2C792] tracking-widest uppercase">
          Beezy Buy
        </h1>
        <p className="text-[9px] text-emerald-500/80 uppercase font-bold tracking-widest mt-0.5">
          Admin Hive Network
        </p>
      </div>

      <nav className="flex-1 mt-10 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white shadow-[0_6px_15px_rgba(255,159,13,0.3)] scale-[1.01]"
                  : "text-emerald-100/60 hover:bg-emerald-950/40 hover:text-white"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-emerald-950/60">
        <button
          onClick={() => {
            localStorage.removeItem("beezy_authenticated");
            window.location.reload();
          }}
          className="w-full bg-emerald-950/60 text-[10px] text-red-400 font-bold tracking-widest uppercase py-3 rounded-lg hover:bg-red-950/30 transition-all text-center"
        >
          Leave The Hive
        </button>
      </div>
    </aside>
  );
}
