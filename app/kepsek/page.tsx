"use client";

import React, { useState } from "react";
import NavWaka from "@/components/kepsek/navKepsek";
import BlokirAbsen from "@/components/waka/blokirAbsen";
import AbsenHarian from "@/components/waka/absenHarian";
import AbsenMingguan from "@/components/waka/absenMingguan";
import Dashboard from "@/components/admin/dashboard";

export default function Home() {
  const [view, setView] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <NavWaka onSelect={(v) => setView(v)} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72">
            <NavWaka
              mobile
              onSelect={(v) => {
                setView(v);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 transition-all duration-300">
        {view === "dashboard" && (
          <Dashboard onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {view === "blokir-absen" && (
          <BlokirAbsen onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {view === "absen-harian" && (
          <AbsenHarian onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {view === "absen-mingguan" && (
          <AbsenMingguan onOpenSidebar={() => setSidebarOpen(true)} />
        )}
      </main>
    </div>
  );
}
