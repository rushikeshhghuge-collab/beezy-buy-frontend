import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#0B3B24] p-4 lg:p-6 flex items-center justify-center antialiased">
      <div className="w-full max-w-[1440px] bg-[#FAF9F5] rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-[4px] border-[#E2C792] overflow-hidden flex min-h-[850px]">
        {children}
      </div>
    </div>
  );
}
