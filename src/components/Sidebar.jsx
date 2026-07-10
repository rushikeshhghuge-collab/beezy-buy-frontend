import React from "react";
import { MdDashboard, MdInventory, MdAddBox, MdLogout, MdClose } from "react-icons/md";
import logoBadge from "../assets/bee-logo-.jpeg";

const menuItems = [
  { id: "dashboard", label: "Dashboard Stats", icon: MdDashboard },
  { id: "inventory", label: "Products Inventory", icon: MdInventory },
  { id: "add-product", label: "Add New Product", icon: MdAddBox },
];

export default function Sidebar({ currentTab, setCurrentTab, isOpen, onClose }) {
  const handleNav = (id) => {
    setCurrentTab(id);
    onClose();
  };

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-[#0A1A12] flex flex-col justify-between p-6
          border-r border-[#E2C792]/20 z-50 transition-transform duration-300
          lg:static lg:translate-x-0 lg:flex-shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white lg:hidden"
        >
          <MdClose className="text-xl" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 rounded-full border-2 border-[#E2C792] shadow-[0_0_15px_rgba(226,199,146,0.2)] overflow-hidden bg-white flex items-center justify-center mb-3">
            <img src={logoBadge} alt="Logo" className="w-full h-full object-cover scale-150 transform origin-center" />
          </div>
          <h1 className="text-lg font-black text-[#E2C792] tracking-widest uppercase">Beezy Buy</h1>
          <p className="text-[9px] text-emerald-500/80 uppercase font-bold tracking-widest mt-0.5">Admin Hive Network</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 mt-10 space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const isActive = currentTab === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white shadow-[0_6px_15px_rgba(255,159,13,0.3)] scale-[1.01]"
                    : "text-emerald-100/60 hover:bg-emerald-950/40 hover:text-white"
                }`}
              >
                <Icon className="text-base flex-shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-4 border-t border-emerald-950/60">
          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-950/60 text-[10px] text-red-400 font-bold tracking-widest uppercase py-3 rounded-lg hover:bg-red-950/30 transition-all"
          >
            <MdLogout className="text-sm" />
            Leave The Hive
          </button>
        </div>
      </aside>
    </>
  );
}
