import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import ProductList from "../components/ProductList";

export default function AdminDashboardManager() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      {/* SIDE NAVIGATION */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* VIEWPORT CONTROLLER SECTION */}
      <div className="flex-1 flex flex-col min-h-full">
        {/* GLOBAL EXECUTIVE APPBAR BAR */}
        <header className="bg-white border-b border-stone-200/60 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-black text-stone-800 uppercase tracking-wider">
              {currentTab === "dashboard"
                ? "Dashboard Summary"
                : "Product Inventory"}
            </h2>
            <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5">
              System Date: Wed, Jul 1, 2026
            </p>
          </div>

          {/* SEARCH COMPARTMENT PANEL */}
          {currentTab === "inventory" && (
            <div className="relative w-64 flex items-center bg-stone-50 border border-stone-200 rounded-full px-4 py-2 focus-within:bg-white focus-within:border-amber-500 transition-all">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-stone-700 font-medium placeholder-stone-400"
              />
              <span className="text-xs opacity-60 ml-2">🔍</span>
            </div>
          )}

          {/* RIGHT ADMINISTRATOR PROFILE LINK */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-black text-stone-800">
                Neha (Queen Bee)
              </span>
              <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">
                Super Administrator
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center font-black text-white text-sm border-2 border-white shadow-md">
              👑
            </div>
          </div>
        </header>

        {/* COMPONENT VIEW MOUNTING CANVAS */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-120px)]">
          {currentTab === "dashboard" && <Dashboard />}
          {currentTab === "inventory" && (
            <ProductList searchQuery={searchQuery} />
          )}
          {currentTab === "add-product" && (
            <div className="bg-white p-8 rounded-3xl border border-stone-200/60 text-center py-20 text-stone-400 font-medium">
              📥 Product Addition Intake Forms Interface Initializing...
            </div>
          )}
        </main>

        {/* BRANDED LOWER LEGAL COMPLIANCE ELEMENT */}
        <footer className="py-3 text-center bg-stone-50 border-t border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-widest flex-shrink-0">
          Powered by Beezy Buy 🐝
        </footer>
      </div>
    </DashboardLayout>
  );
}
