"use client";

import React, { useState } from "react";
import {
  FaSave,
  FaTimes,
  FaGraduationCap,
  FaCode,
  FaAlignLeft,
  FaToggleOn,
} from "react-icons/fa";

export default function CrudJurusan() {
  const [form, setForm] = useState({
    nama: "",
    kode: "",
    deskripsi: "",
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.nama.trim()) newErrors.nama = "Nama jurusan wajib diisi";
    if (!form.kode.trim()) newErrors.kode = "Kode jurusan wajib diisi";
    if (!form.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitting form:", form);
      // Handle submission logic here
      alert("Data jurusan berhasil disimpan (Simulasi)");
    }
  };

  const handleReset = () => {
    setForm({
      nama: "",
      kode: "",
      deskripsi: "",
      status: "active",
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaGraduationCap className="text-indigo-600" />
              Form Data Jurusan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tambah atau edit informasi jurusan sekolah
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Jurusan */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaGraduationCap className="text-slate-400" />
                Nama Jurusan
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Contoh: Rekayasa Perangkat Lunak"
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

            {/* Kode Jurusan */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FaCode className="text-slate-400" />
                Kode Jurusan
              </label>
              <input
                type="text"
                name="kode"
                value={form.kode}
                onChange={handleChange}
                placeholder="Contoh: RPL"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.kode
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                } focus:ring-2 outline-none transition-all font-mono`}
              />
              {errors.kode && (
                <p className="text-xs text-red-500">{errors.kode}</p>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FaAlignLeft className="text-slate-400" />
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={4}
              placeholder="Jelaskan secara singkat tentang jurusan ini..."
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.deskripsi
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
              } focus:ring-2 outline-none transition-all resize-none`}
            />
            {errors.deskripsi && (
              <p className="text-xs text-red-500">{errors.deskripsi}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FaToggleOn className="text-slate-400" />
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={form.status === "active"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                  Aktif
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={form.status === "inactive"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-slate-500 peer-checked:bg-slate-500 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                  Tidak Aktif
                </span>
              </label>
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
              Simpan Jurusan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
