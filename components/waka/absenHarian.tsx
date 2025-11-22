"use client";

import React, { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaDownload,
  FaBars,
} from "react-icons/fa";

// Dummy data for daily attendance
const initialAttendance = [
  {
    id: 1,
    name: "Ahmad Rizki",
    nisn: "0051234567",
    rombel: "XII RPL 1",
    arrivalTime: "06:45:23",
    departureTime: "15:30:00",
    status: "ontime", // ontime, late
  },
  {
    id: 2,
    name: "Budi Santoso",
    nisn: "0051234568",
    rombel: "XII RPL 1",
    arrivalTime: "07:20:15",
    departureTime: "15:35:10",
    status: "late",
  },
  {
    id: 3,
    name: "Citra Dewi",
    nisn: "0051234569",
    rombel: "XII TKJ 2",
    arrivalTime: "06:55:00",
    departureTime: "--:--:--",
    status: "ontime",
  },
  {
    id: 4,
    name: "Dedi Pratama",
    nisn: "0051234570",
    rombel: "XI MM 1",
    arrivalTime: "07:05:45",
    departureTime: "15:40:22",
    status: "ontime",
  },
  {
    id: 5,
    name: "Eka Putri",
    nisn: "0051234571",
    rombel: "X RPL 2",
    arrivalTime: "--:--:--",
    departureTime: "--:--:--",
    status: "absent",
  },
];

export default function AbsenHarian({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, ontime, late
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Filter logic
  const filteredData = initialAttendance.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisn.includes(searchTerm) ||
      item.rombel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            >
              <FaBars />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Absen Harian</h1>
            <p className="text-slate-500 text-sm">
              Pantau kehadiran siswa hari ini
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm shadow-sm w-full sm:w-auto"
            />
            <FaCalendarAlt className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all text-sm">
            <FaDownload className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Info Cards / Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Time Rules */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FaClock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Jadwal Absen</h3>
            <div className="flex flex-col sm:flex-row sm:gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Masuk: 06:00 - 07:15
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Pulang: 10:00 - 18:00
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FaFilter className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Keterangan Status
            </h3>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md text-emerald-700 border border-emerald-100">
                <FaCheckCircle className="w-3 h-3" /> Tepat Waktu
              </span>
              <span className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md text-red-700 border border-red-100">
                <FaTimesCircle className="w-3 h-3" /> Terlambat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari siswa, NISN, atau rombel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <FaSearch className="absolute left-3.5 top-2.5 text-slate-400 w-4 h-4" />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Status</option>
              <option value="ontime">Tepat Waktu</option>
              <option value="late">Terlambat</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nama Siswa
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  NISN
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Rombel
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-100/50 border-l border-slate-200">
                  Waktu Kedatangan
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-100/50 border-l border-slate-200">
                  Waktu Kepulangan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                      {item.nisn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {item.rombel}
                      </span>
                    </td>

                    {/* Arrival Time */}
                    <td className="px-6 py-4 text-center border-l border-slate-100">
                      {item.arrivalTime !== "--:--:--" ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-sm font-medium text-slate-700">
                            {item.arrivalTime}
                          </span>
                          {item.status === "ontime" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                              <FaCheckCircle className="w-3 h-3" /> Tepat Waktu
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase tracking-wide">
                              <FaTimesCircle className="w-3 h-3" /> Terlambat
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm italic">
                          Belum Hadir
                        </span>
                      )}
                    </td>

                    {/* Departure Time */}
                    <td className="px-6 py-4 text-center border-l border-slate-100">
                      {item.departureTime !== "--:--:--" ? (
                        <span className="font-mono text-sm font-medium text-slate-700">
                          {item.departureTime}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm italic">
                          Belum Pulang
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <FaSearch className="w-8 h-8 mb-3 opacity-50" />
                      <p className="text-sm font-medium">
                        Tidak ada data absensi ditemukan
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {item.nisn}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {item.rombel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Kedatangan</p>
                    {item.arrivalTime !== "--:--:--" ? (
                      <div>
                        <p className="font-mono font-bold text-slate-700">
                          {item.arrivalTime}
                        </p>
                        {item.status === "ontime" ? (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600">
                            <FaCheckCircle className="w-3 h-3" /> Tepat Waktu
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-red-600">
                            <FaTimesCircle className="w-3 h-3" /> Terlambat
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">
                        Belum Hadir
                      </p>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Kepulangan</p>
                    {item.departureTime !== "--:--:--" ? (
                      <p className="font-mono font-bold text-slate-700">
                        {item.departureTime}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400 italic">
                        Belum Pulang
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center text-slate-400">
                <FaSearch className="w-8 h-8 mb-3 opacity-50" />
                <p className="text-sm font-medium">
                  Tidak ada data absensi ditemukan
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Pagination (Static for now) */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Menampilkan{" "}
            <span className="font-bold text-slate-700">
              {filteredData.length}
            </span>{" "}
            data
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
