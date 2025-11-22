"use client";

import React, { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBook,
  FaCode,
  FaInfoCircle,
  FaEllipsisV,
  FaGraduationCap,
  FaFilter,
  FaSort,
} from "react-icons/fa";

interface Jurusan {
  id: number;
  nama: string;
  kode: string;
  deskripsi: string;
  jumlahSiswa: number;
  status: "active" | "inactive";
}

const TabelJurusan: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([
    {
      id: 1,
      nama: "Rekayasa Perangkat Lunak",
      kode: "RPL",
      deskripsi:
        "Jurusan yang mempelajari tentang pengembangan perangkat lunak, coding, dan desain sistem.",
      jumlahSiswa: 120,
      status: "active",
    },
    {
      id: 2,
      nama: "Teknik Komputer dan Jaringan",
      kode: "TKJ",
      deskripsi:
        "Fokus pada perakitan komputer, instalasi jaringan, dan administrasi server.",
      jumlahSiswa: 115,
      status: "active",
    },
    {
      id: 3,
      nama: "Multimedia",
      kode: "MM",
      deskripsi:
        "Mempelajari desain grafis, animasi, fotografi, dan videografi.",
      jumlahSiswa: 108,
      status: "active",
    },
    {
      id: 4,
      nama: "Akuntansi",
      kode: "AK",
      deskripsi: "Mempelajari pembukuan, laporan keuangan, dan perpajakan.",
      jumlahSiswa: 95,
      status: "active",
    },
    {
      id: 5,
      nama: "Perkantoran",
      kode: "OTKP",
      deskripsi: "Manajemen administrasi perkantoran dan kearsipan.",
      jumlahSiswa: 88,
      status: "inactive",
    },
  ]);

  const filteredJurusan = jurusanList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaGraduationCap className="text-indigo-600 shrink-0" />
              Data Jurusan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Kelola daftar jurusan dan program studi
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm hover:shadow-md">
            <FaPlus className="w-3 h-3" />
            Tambah Jurusan
          </button>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama atau kode jurusan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center gap-2 transition-colors">
              <FaFilter className="w-3 h-3" />
              Filter
            </button>
            <button className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center gap-2 transition-colors">
              <FaSort className="w-3 h-3" />
              Urutkan
            </button>
          </div>
        </div>
      </div>

      {/* Table Section - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                No
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Info Jurusan
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Kode
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredJurusan.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4 text-sm text-slate-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                      {item.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.nama}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                    {item.kode}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                    {item.deskripsi}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="md:hidden divide-y divide-slate-100">
        {filteredJurusan.map((item) => (
          <div key={item.id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0">
                  {item.nama.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.nama}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 font-mono mt-1">
                    {item.kode}
                  </span>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.status === "active" ? "Aktif" : "Tidak Aktif"}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600">{item.deskripsi}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-50">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <FaEdit className="w-3 h-3" /> Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                <FaTrash className="w-3 h-3" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJurusan.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">
            Tidak ada jurusan ditemukan
          </h3>
          <p className="text-slate-500 mt-1">
            Coba kata kunci pencarian lain atau tambah jurusan baru.
          </p>
        </div>
      )}

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Menampilkan{" "}
          <span className="font-medium">{filteredJurusan.length}</span> dari{" "}
          <span className="font-medium">{jurusanList.length}</span> data
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
            Sebelumnya
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabelJurusan;
