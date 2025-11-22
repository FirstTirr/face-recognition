"use client";

import React, { useState } from "react";
import {
  FaSearch,
  FaBan,
  FaTimes,
  FaExclamationTriangle,
  FaCheck,
  FaBars,
} from "react-icons/fa";

// Dummy data for students
const initialStudents = [
  {
    id: 1,
    name: "Ahmad Rizki",
    nisn: "1234567890",
    class: "XII RPL 1",
    isBlocked: false,
    blockReason: "",
  },
  {
    id: 2,
    name: "Budi Santoso",
    nisn: "1234567891",
    class: "XII RPL 1",
    isBlocked: false,
    blockReason: "",
  },
  {
    id: 3,
    name: "Citra Dewi",
    nisn: "1234567892",
    class: "XII TKJ 2",
    isBlocked: false,
    blockReason: "",
  },
  {
    id: 4,
    name: "Dedi Pratama",
    nisn: "1234567893",
    class: "XI MM 1",
    isBlocked: false,
    blockReason: "",
  },
  {
    id: 5,
    name: "Eka Putri",
    nisn: "1234567894",
    class: "X RPL 2",
    isBlocked: false,
    blockReason: "",
  },
];

export default function BlokirAbsen({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [students, setStudents] = useState(initialStudents);

  // Filter students based on search
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn.includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockClick = (student: any) => {
    setSelectedStudent(student);
    setReason("");
    setCustomReason("");
    setIsModalOpen(true);
  };

  const handleUnblockClick = (student: any) => {
    if (
      window.confirm(
        `Apakah anda yakin ingin membuka blokir untuk siswa ${student.name}?`
      )
    ) {
      setStudents(
        students.map((s) =>
          s.id === student.id ? { ...s, isBlocked: false, blockReason: "" } : s
        )
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSubmitBlock = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = reason === "Lainnya" ? customReason : reason;

    if (!finalReason) {
      alert("Mohon pilih atau isi alasan pemblokiran.");
      return;
    }

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, isBlocked: true, blockReason: finalReason }
          : s
      )
    );

    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
            <h1 className="text-2xl font-bold text-slate-800">Blokir Absen</h1>
            <p className="text-slate-500 text-sm">
              Kelola pemblokiran akses absen siswa bermasalah
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Cari nama, NISN, atau kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
          />
          <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nama Siswa
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  NISN
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                      {student.nisn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {student.isBlocked ? (
                        <button
                          onClick={() => handleUnblockClick(student)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200 transition-all text-sm font-medium group"
                        >
                          <FaCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          Buka Blokir
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockClick(student)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200 transition-all text-sm font-medium group"
                        >
                          <FaBan className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          Blokir
                        </button>
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
                        Tidak ada data siswa ditemukan
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div key={student.id} className="p-4 space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-slate-800">
                      {student.name}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {student.nisn}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {student.class}
                  </span>
                </div>

                <div className="pt-2">
                  {student.isBlocked ? (
                    <button
                      onClick={() => handleUnblockClick(student)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-all text-sm font-medium"
                    >
                      <FaCheck className="w-3.5 h-3.5" />
                      Buka Blokir
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockClick(student)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all text-sm font-medium"
                    >
                      <FaBan className="w-3.5 h-3.5" />
                      Blokir
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center text-slate-400">
                <FaSearch className="w-8 h-8 mb-3 opacity-50" />
                <p className="text-sm font-medium">
                  Tidak ada data siswa ditemukan
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-500" />
                Blokir Absen Siswa
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitBlock} className="p-6 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">
                  Siswa yang akan diblokir:
                </p>
                <p className="font-bold text-slate-800 text-lg">
                  {selectedStudent.name}
                </p>
                <p className="text-xs text-slate-500">
                  {selectedStudent.class} • {selectedStudent.nisn}
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Pilih Alasan Pemblokiran
                </label>
                <div className="space-y-2">
                  {["Cabut", "Alfa", "Sering Terlambat", "Lainnya"].map(
                    (option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                          reason === option
                            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/20"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={option}
                          checked={reason === option}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                        />
                        <span className="ml-3 text-sm font-medium text-slate-700">
                          {option}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Custom Reason Input */}
              {reason === "Lainnya" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Keterangan Lainnya
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Tuliskan alasan spesifik..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm min-h-20"
                    required
                  />
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <FaBan />
                  Blokir Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
