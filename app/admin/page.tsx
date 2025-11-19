"use client";

import React, { useState } from "react";
import Dashboard from "@/components/admin/dashboard";
import CrudAkun from "@/components/admin/crudAkun";
import AccountTable from "@/components/admin/tabelAkun";
import NavAdmin from "@/components/admin/navAdmin";

export default function Home() {
  const [view, setView] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <NavAdmin onSelect={(v) => setView(v)} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64">
            <NavAdmin
              mobile
              onSelect={(v) => {
                setView(v);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 bg-white min-h-screen md:ml-64">
        {/* Mobile: the small circled hamburger in the dashboard header will open sidebar */}

        {view === "dashboard" && (
          <Dashboard onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {view === "add-account" && <CrudAkun />}
        {view === "account-table" && <AccountTable />}
        {view !== "dashboard" &&
          view !== "add-account" &&
          view !== "account-table" && (
            <div>
              <h2 className="text-xl font-semibold">{view}</h2>
              <p>Konten untuk {view} akan ditampilkan di sini.</p>
            </div>
          )}
      </main>
    </div>
  );
}
