"use client";

import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <div className="md:w-64 md:block hidden min-h-screen">
        <SideNav />
      </div>
      <div className="flex-1">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
