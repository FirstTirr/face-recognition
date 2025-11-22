"use client";

import React, { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUsers,
  FaFilter,
  FaSort,
  FaChalkboardTeacher,
} from "react-icons/fa";

interface Kelas {
  id: number;
  nama: string; // e.g. "X RPL 1"
  jurusan: string; // e.g. "Rekayasa Perangkat Lunak"
  jumlahSiswa: number;
  waliKelas: string;
}

const TabelKelas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [kelasList, setKelasList] = useState<Kelas[]>([
    {
      id: 1,
      nama: "X RPL 1",
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 32,
      waliKelas: "Budi Santoso, S.Kom",
    },
    {
      id: 2,
      nama: "X RPL 2",
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 31,
      waliKelas: "Siti Aminah, S.Pd",
    },
    {
      id: 3,
      nama: "XI TKJ 1",
      jurusan: "Teknik Komputer dan Jaringan",
      jumlahSiswa: 30,
      waliKelas: "Rudi Hermawan, S.T",
    },
    {
      id: 4,
      nama: "XII MM 2",
      jurusan: "Multimedia",
      jumlahSiswa: 29,
      waliKelas: "Dewi Sartika, S.Sn",
    },
  ]);

  const filteredKelas = kelasList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.waliKelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaChalkboardTeacher className="text-indigo-600 shrink-0" />
              Data Kelas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Kelola daftar kelas dan wali kelas
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm hover:shadow-md">
            <FaPlus className="w-3 h-3" />
            Tambah Kelas
          </button>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari kelas atau wali kelas..."
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
                Kelas
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Wali Kelas
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                Jumlah Siswa
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredKelas.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4 text-sm text-slate-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {item.nama.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.nama}
                      </p>
                      <p className="text-xs text-slate-500">{item.jurusan}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{item.waliKelas}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    <FaUsers className="mr-1.5 w-3 h-3" />
                    {item.jumlahSiswa}
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
        {filteredKelas.map((item) => (
          <div key={item.id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                  {item.nama.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.nama}
                  </h3>
                  <p className="text-xs text-slate-500">{item.jurusan}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                <FaUsers className="mr-1.5 w-3 h-3" />
                {item.jumlahSiswa}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaChalkboardTeacher className="text-slate-400" />
                Wali Kelas: {item.waliKelas}
              </div>
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
      {filteredKelas.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">
            Tidak ada kelas ditemukan
          </h3>
          <p className="text-slate-500 mt-1">
            Coba kata kunci pencarian lain atau tambah kelas baru.
          </p>
        </div>
      )}

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Menampilkan{" "}
          <span className="font-medium">{filteredKelas.length}</span> dari{" "}
          <span className="font-medium">{kelasList.length}</span> data
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

export default TabelKelas;
