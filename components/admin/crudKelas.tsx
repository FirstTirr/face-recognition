"use client";

import React, { useState } from "react";
import {
  FaSave,
  FaTimes,
  FaChalkboardTeacher,
  FaUsers,
  FaGraduationCap,
  FaUserTie,
} from "react-icons/fa";

export default function CrudKelas() {
  const [form, setForm] = useState({
    nama: "",
    jurusan: "",
    waliKelas: "",
    jumlahSiswa: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mock data for Jurusan dropdown
  const jurusanOptions = [
    "Rekayasa Perangkat Lunak",
    "Teknik Komputer dan Jaringan",
    "Multimedia",
    "Akuntansi",
    "Perkantoran",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.nama.trim()) newErrors.nama = "Nama kelas wajib diisi";
    if (!form.jurusan.trim()) newErrors.jurusan = "Jurusan wajib dipilih";
    if (!form.waliKelas.trim()) newErrors.waliKelas = "Wali kelas wajib diisi";
    if (!form.jumlahSiswa.trim())
      newErrors.jumlahSiswa = "Jumlah siswa wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitting form:", form);
      // Handle submission logic here
      alert("Data kelas berhasil disimpan (Simulasi)");
    }
  };

  const handleReset = () => {
    setForm({
      nama: "",
      jurusan: "",
      waliKelas: "",
      jumlahSiswa: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaChalkboardTeacher className="text-indigo-600" />
              Form Data Kelas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tambah atau edit informasi kelas dan wali kelas
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Kelas */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaChalkboardTeacher className="text-slate-400" />
                Nama Kelas
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Contoh: X RPL 1"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.nama
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                } focus:ring-2 outline-none transition-all`}
              />
              {errors.nama && (
                <p className="text-xs text-red-500">{errors.nama}</p>
              )}
            </div>

            {/* Jurusan */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaGraduationCap className="text-slate-400" />
                Jurusan
              </label>
              <select
                name="jurusan"
                value={form.jurusan}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.jurusan
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                } focus:ring-2 outline-none transition-all bg-white`}
              >
                <option value="">Pilih Jurusan</option>
                {jurusanOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.jurusan && (
                <p className="text-xs text-red-500">{errors.jurusan}</p>
              )}
            </div>

            {/* Wali Kelas */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaUserTie className="text-slate-400" />
                Wali Kelas
              </label>
              <input
                type="text"
                name="waliKelas"
                value={form.waliKelas}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso, S.Kom"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.waliKelas
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                } focus:ring-2 outline-none transition-all`}
              />
              {errors.waliKelas && (
                <p className="text-xs text-red-500">{errors.waliKelas}</p>
              )}
            </div>

            {/* Jumlah Siswa */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaUsers className="text-slate-400" />
                Jumlah Siswa
              </label>
              <input
                type="number"
                name="jumlahSiswa"
                value={form.jumlahSiswa}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.jumlahSiswa
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                } focus:ring-2 outline-none transition-all`}
              />
              {errors.jumlahSiswa && (
                <p className="text-xs text-red-500">{errors.jumlahSiswa}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              Simpan Kelas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
