"use client";

import React, { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaBars,
  FaCheck,
  FaTimes,
  FaClock,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Dummy data for weekly attendance
const initialWeeklyAttendance = [
  {
    id: 1,
    name: "Ahmad Rizki",
    nisn: "0051234567",
    class: "XII RPL 1",
    attendance: {
      monday: "present",
      tuesday: "present",
      wednesday: "late",
      thursday: "present",
      friday: "sick",
      saturday: "off",
      sunday: "off",
    },
  },
  {
    id: 2,
    name: "Budi Santoso",
    nisn: "0051234568",
    class: "XII RPL 1",
    attendance: {
      monday: "late",
      tuesday: "absent",
      wednesday: "present",
      thursday: "present",
      friday: "present",
      saturday: "off",
      sunday: "off",
    },
  },
  {
    id: 3,
    name: "Citra Dewi",
    nisn: "0051234569",
    class: "XII TKJ 2",
    attendance: {
      monday: "present",
      tuesday: "present",
      wednesday: "present",
      thursday: "permission",
      friday: "present",
      saturday: "off",
      sunday: "off",
    },
  },
  {
    id: 4,
    name: "Dedi Pratama",
    nisn: "0051234570",
    class: "XI MM 1",
    attendance: {
      monday: "sick",
      tuesday: "sick",
      wednesday: "present",
      thursday: "present",
      friday: "present",
      saturday: "off",
      sunday: "off",
    },
  },
  {
    id: 5,
    name: "Eka Putri",
    nisn: "0051234571",
    class: "X RPL 2",
    attendance: {
      monday: "present",
      tuesday: "present",
      wednesday: "present",
      thursday: "present",
      friday: "present",
      saturday: "off",
      sunday: "off",
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "present":
      return "bg-emerald-100 text-emerald-600";
    case "late":
      return "bg-amber-100 text-amber-600";
    case "absent":
      return "bg-red-100 text-red-600";
    case "permission":
      return "bg-blue-100 text-blue-600";
    case "sick":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-slate-100 text-slate-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <FaCheck className="w-3 h-3" />;
    case "late":
      return <FaClock className="w-3 h-3" />;
    case "absent":
      return <FaTimes className="w-3 h-3" />;
    case "permission":
      return <FaInfoCircle className="w-3 h-3" />;
    case "sick":
      return <FaInfoCircle className="w-3 h-3" />;
    default:
      return <span className="text-xs font-bold">-</span>;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "present":
      return "Hadir";
    case "late":
      return "Telat";
    case "absent":
      return "Alfa";
    case "permission":
      return "Izin";
    case "sick":
      return "Sakit";
    default:
      return "Libur";
  }
};

export default function AbsenMingguan({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Filter logic
  const filteredData = initialWeeklyAttendance.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisn.includes(searchTerm) ||
      item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const days = [
    { key: "monday", label: "Sen" },
    { key: "tuesday", label: "Sel" },
    { key: "wednesday", label: "Rab" },
    { key: "thursday", label: "Kam" },
    { key: "friday", label: "Jum" },
    { key: "saturday", label: "Sab" },
    { key: "sunday", label: "Min" },
  ];

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
            <h1 className="text-2xl font-bold text-slate-800">
              Absen Mingguan
            </h1>
            <p className="text-slate-500 text-sm">
              Rekap kehadiran siswa dalam satu minggu
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm p-1">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors">
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <div className="px-4 py-1 text-sm font-medium text-slate-700 flex items-center gap-2">
              <FaCalendarAlt className="text-emerald-500" />
              <span>20 Nov - 26 Nov 2023</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors">
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all text-sm">
            <FaDownload className="w-4 h-4" />
            Export Rekap
          </button>
        </div>
      </div>

      {/* Legend / Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          {
            label: "Hadir",
            color: "bg-emerald-100 text-emerald-600",
            count: 145,
          },
          { label: "Telat", color: "bg-amber-100 text-amber-600", count: 12 },
          { label: "Sakit", color: "bg-purple-100 text-purple-600", count: 5 },
          { label: "Izin", color: "bg-blue-100 text-blue-600", count: 3 },
          { label: "Alfa", color: "bg-red-100 text-red-600", count: 8 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${stat.color
                  .split(" ")[0]
                  .replace("bg-", "bg-opacity-100 bg-")}`}
              ></div>
              <span className="text-xs font-medium text-slate-600">
                {stat.label}
              </span>
            </div>
            <span className="text-lg font-bold text-slate-800">
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari siswa, NISN, atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <FaSearch className="absolute left-3.5 top-2.5 text-slate-400 w-4 h-4" />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-colors">
              <FaFilter className="w-3 h-3" />
              Filter Kelas
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Nama Siswa
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kelas
                </th>
                {days.map((day) => (
                  <th
                    key={day.key}
                    className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center"
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="font-medium text-slate-800">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        {item.nisn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {item.class}
                      </span>
                    </td>
                    {days.map((day) => {
                      const status =
                        item.attendance[
                          day.key as keyof typeof item.attendance
                        ];
                      return (
                        <td key={day.key} className="px-4 py-4 text-center">
                          <div className="flex justify-center group/tooltip relative">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
                                status
                              )}`}
                            >
                              {getStatusIcon(status)}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block z-20">
                              <div className="bg-slate-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                                {getStatusLabel(status)}
                              </div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
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
              <div key={item.id} className="p-4 space-y-4 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-slate-800">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {item.nisn}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {item.class}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day) => {
                    const status =
                      item.attendance[day.key as keyof typeof item.attendance];
                    return (
                      <div
                        key={day.key}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-[10px] text-slate-400 font-medium uppercase">
                          {day.label}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
                            status
                          )}`}
                        >
                          {getStatusIcon(status)}
                        </div>
                      </div>
                    );
                  })}
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

        {/* Pagination */}
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
