"use client";

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Dashboard from "@/components/admin/dashboard";
import CrudAkun from "@/components/admin/crudAkun";
import AccountTable from "@/components/admin/tabelAkun";
import TabelJurusan from "@/components/admin/tabelJurusan";
import CrudJurusan from "@/components/admin/crudJurusan";
import TabelKelas from "@/components/admin/tabelKelas";
import CrudKelas from "@/components/admin/crudKelas";
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

      <main className="flex-1 p-4 md:p-6 bg-white min-h-screen md:ml-64">
        {/* Mobile Header for non-dashboard views */}
        {view !== "dashboard" && (
          <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm -mx-4 -mt-4 px-4 py-3 mb-6 border-b border-slate-200 flex items-center gap-4 shadow-sm transition-all">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm active:scale-95 transition-transform"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-800 capitalize truncate">
              {view === "add-account"
                ? "Tambah Akun"
                : view === "account-table"
                ? "Manajemen Akun"
                : view === "major-table"
                ? "Data Jurusan"
                : view === "add-major"
                ? "Tambah Jurusan"
                : view === "class-table"
                ? "Data Kelas"
                : view === "add-class"
                ? "Tambah Kelas"
                : view}
            </h2>
          </div>
        )}

        {view === "dashboard" && (
          <Dashboard onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {view === "add-account" && <CrudAkun />}
        {view === "account-table" && <AccountTable />}
        {view === "major-table" && <TabelJurusan />}
        {view === "add-major" && <CrudJurusan />}
        {view === "class-table" && <TabelKelas />}
        {view === "add-class" && <CrudKelas />}
        {view !== "dashboard" &&
          view !== "add-account" &&
          view !== "account-table" &&
          view !== "major-table" &&
          view !== "add-major" &&
          view !== "class-table" &&
          view !== "add-class" && (
            <div>
              <h2 className="text-xl font-semibold">{view}</h2>
              <p>Konten untuk {view} akan ditampilkan di sini.</p>
            </div>
          )}
      </main>
    </div>
  );
}
