"use client";

import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  role: "admin" | "moderator" | "user";
}

const initialUsers: User[] = [
  { id: 1, name: "Ahmad Rizki", role: "admin" },
  { id: 2, name: "Siti Nurhaliza", role: "user" },
  { id: 3, name: "Budi Santoso", role: "moderator" },
];

export default function CrudAkun() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", password: "", role: "user" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const resetForm = () => {
    setForm({ name: "", password: "", role: "user" });
    setErrors({});
    setEditingId(null);
    setIsEditing(false);
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!isEditing && !form.password.trim())
      e.password = "Password wajib diisi";
    if (form.password && form.password.length > 0 && form.password.length < 6)
      e.password = "Password minimal 6 karakter";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing && editingId != null) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId
            ? { ...u, name: form.name, role: form.role as User["role"] }
            : u
        )
      );
    } else {
      const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prev) => [
        ...prev,
        {
          id,
          name: form.name.trim(),
          role: form.role as User["role"],
        },
      ]);
    }

    resetForm();
  };

  const startEdit = (u: User) => {
    setIsEditing(true);
    setEditingId(u.id);
    setForm({ name: u.name, password: "", role: u.role });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Hapus akun ini?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            Manajemen Akun
          </h1>
          <p className="text-sm text-slate-500">
            Tambah, edit, atau hapus akun dengan cepat.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form column */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-100 mb-6 overflow-hidden">
              <div className="px-5 py-4 bg-rose-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-slate-800">
                      {isEditing ? "Edit Akun" : "Tambah Akun"}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Form sederhana dengan warna lembut dan transisi halus.
                    </p>
                  </div>
                  <div>
                    {isEditing ? (
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-md hover:bg-slate-50 transition"
                      >
                        <FaTimes /> Batal
                      </button>
                    ) : (
                      <div className="text-sm text-slate-400">&nbsp;</div>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Nama
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-50 border ${
                      errors.name ? "border-red-200" : "border-transparent"
                    } focus:outline-none focus:ring-2 focus:ring-slate-200 transition`}
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Password
                  </label>
                  <input
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    type="password"
                    className={`w-full px-4 py-2 rounded-lg bg-slate-50 border ${
                      errors.password ? "border-red-200" : "border-transparent"
                    } focus:outline-none focus:ring-2 focus:ring-slate-200 transition`}
                    placeholder={
                      isEditing
                        ? "Kosongkan jika tidak ingin mengubah"
                        : "Minimal 6 karakter"
                    }
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Role
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        form.role === "user"
                          ? "bg-white border border-slate-200"
                          : "bg-slate-50"
                      } transition w-full sm:w-auto`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={form.role === "user"}
                        onChange={() => setForm({ ...form, role: "user" })}
                        className="hidden"
                      />
                      <div className="text-sm text-slate-700">User</div>
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        form.role === "moderator"
                          ? "bg-white border border-slate-200"
                          : "bg-slate-50"
                      } transition w-full sm:w-auto`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="moderator"
                        checked={form.role === "moderator"}
                        onChange={() => setForm({ ...form, role: "moderator" })}
                        className="hidden"
                      />
                      <div className="text-sm text-slate-700">Moderator</div>
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        form.role === "admin"
                          ? "bg-white border border-slate-200"
                          : "bg-slate-50"
                      } transition w-full sm:w-auto`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={form.role === "admin"}
                        onChange={() => setForm({ ...form, role: "admin" })}
                        className="hidden"
                      />
                      <div className="text-sm text-slate-700">
                        Administrator
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
                  >
                    <FaSave /> {isEditing ? "Update" : "Simpan"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FaTimes /> Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* List column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-slate-800">
                  Daftar Akun
                </h3>
                <div className="text-sm text-slate-500">
                  {users.length} akun
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{u.name}</div>
                      <div className="text-xs text-slate-500">
                        <span className="capitalize">{u.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => startEdit(u)}
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 transition"
                      >
                        <FaEdit className="text-slate-600" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
                      >
                        <FaTrash /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
