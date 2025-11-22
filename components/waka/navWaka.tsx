"use client";

import React, { useState } from "react";
import {
  FaHome,
  FaBan,
  FaClipboardList,
  FaCalendarDay,
  FaCalendarWeek,
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import Wm from "../wm";

export default function NavWaka({
  onSelect,
  mobile,
}: {
  onSelect?: (view: string) => void;
  mobile?: boolean;
}) {
  const [openAbsen, setOpenAbsen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleSelect = (view: string) => {
    setActiveMenu(view);
    onSelect?.(view);
  };

  const asideClass = mobile
    ? "w-72 h-full bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col shadow-2xl"
    : "w-72 fixed left-0 top-0 bottom-0 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800 z-50";

  const navClass =
    "flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar";

  return (
    <aside className={asideClass}>
      {/* Header / Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <img
          src="/logoRounded.png"
          alt="logo"
          className="w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/20"
        />
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight">
            Waka Kesiswaan
          </h1>
          <p className="text-xs text-slate-500 font-medium">School System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className={navClass}>
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Main Menu
          </p>

          {/* Dashboard */}
          <button
            onClick={() => handleSelect("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              activeMenu === "dashboard"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FaHome
              className={`w-5 h-5 ${
                activeMenu === "dashboard"
                  ? "text-white"
                  : "text-slate-400 group-hover:text-white"
              }`}
            />
            <span className="font-medium">Dashboard</span>
          </button>

          {/* Blokir Absen */}
          <button
            onClick={() => handleSelect("blokir-absen")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              activeMenu === "blokir-absen"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FaBan
              className={`w-5 h-5 ${
                activeMenu === "blokir-absen"
                  ? "text-white"
                  : "text-slate-400 group-hover:text-white"
              }`}
            />
            <span className="font-medium">Blokir Absen</span>
          </button>

          {/* Tabel Absen Dropdown */}
          <div className="space-y-1 pt-2">
            <button
              onClick={() => setOpenAbsen(!openAbsen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                openAbsen
                  ? "bg-slate-800 text-white"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaClipboardList
                  className={`w-5 h-5 ${
                    openAbsen
                      ? "text-emerald-400"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                <span className="font-medium">Tabel Absen</span>
              </div>
              <FaChevronRight
                className={`w-3 h-3 transition-transform duration-200 ${
                  openAbsen ? "rotate-90 text-emerald-400" : "text-slate-500"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openAbsen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-4 ml-2.5 border-l border-slate-700 space-y-1 my-1">
                <button
                  onClick={() => handleSelect("absen-harian")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    activeMenu === "absen-harian"
                      ? "text-emerald-400 bg-emerald-500/10 font-medium"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <FaCalendarDay className="w-3 h-3" />
                  Absen Perhari
                </button>
                <button
                  onClick={() => handleSelect("absen-mingguan")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    activeMenu === "absen-mingguan"
                      ? "text-emerald-400 bg-emerald-500/10 font-medium"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <FaCalendarWeek className="w-3 h-3" />
                  Absen Perminggu
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
          <img
          src="/logoRounded.png"
          alt="logo"
          className="w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/20"
        />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
              Waka Kesiswaan
            </p>
            <p className="text-xs text-slate-500 truncate">waka@school.id</p>
          </div>
          <button className="text-slate-400 hover:text-red-400 transition-colors p-1">
            <FaSignOutAlt className="w-4 h-4" />
          </button>
        </div>
        <Wm/>
      </div>
    </aside>
  );
}
