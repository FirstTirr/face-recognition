"use client";

import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaTimes,
  FaUserShield,
  FaUser,
  FaUserCog,
  FaFilter,
  FaSort,
  FaCheck,
  FaExclamationTriangle,
  FaUsers,
  FaEnvelope,
  FaKey,
  FaCrown,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaBars,
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisV,
  FaShieldAlt,
  FaLock,
  FaUnlock,
} from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "moderator";
  createdAt: string;
  lastLogin?: string;
  status: "active" | "inactive";
}

const AccountTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmad Rizki",
      email: "ahmad@example.com",
      password: "••••••••",
      role: "admin",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
      status: "active",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti@example.com",
      password: "••••••••",
      role: "user",
      createdAt: "2024-01-16",
      lastLogin: "2024-01-19",
      status: "active",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi@example.com",
      password: "••••••••",
      role: "moderator",
      createdAt: "2024-01-17",
      lastLogin: "2024-01-18",
      status: "inactive",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi@example.com",
      password: "••••••••",
      role: "user",
      createdAt: "2024-01-18",
      lastLogin: "2024-01-20",
      status: "active",
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      email: "eko@example.com",
      password: "••••••••",
      role: "moderator",
      createdAt: "2024-01-19",
      lastLogin: "2024-01-17",
      status: "active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "admin" | "user" | "moderator",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  // removed modal form UI; keep formData/editing logic but no modal
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const roleConfig = {
    admin: {
      label: "Administrator",
      icon: <FaCrown className="w-4 h-4" />,
      color: "from-indigo-400 to-indigo-500",
      bgLight: "bg-indigo-50",
      textLight: "text-indigo-700",
      borderLight: "border-indigo-200",
      badgeBg: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
    moderator: {
      label: "Moderator",
      icon: <FaUserCog className="w-4 h-4" />,
      color: "from-purple-400 to-purple-500",
      bgLight: "bg-purple-50",
      textLight: "text-purple-700",
      borderLight: "border-purple-200",
      badgeBg: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    user: {
      label: "User",
      icon: <FaUser className="w-4 h-4" />,
      color: "from-emerald-400 to-emerald-500",
      bgLight: "bg-emerald-50",
      textLight: "text-emerald-700",
      borderLight: "border-emerald-200",
      badgeBg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!editingId && !formData.password.trim()) {
      newErrors.password = "Password wajib diisi untuk akun baru";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (editingId) {
        setUsers(
          users.map((user) =>
            user.id === editingId
              ? {
                  ...user,
                  name: formData.name,
                  email: formData.email,
                  role: formData.role,
                  password: formData.password ? "••••••••" : user.password,
                }
              : user
          )
        );
      } else {
        const newUser: User = {
          id: Math.max(...users.map((u) => u.id)) + 1,
          name: formData.name,
          email: formData.email,
          password: "••••••••",
          role: formData.role,
          createdAt: new Date().toISOString().split("T")[0],
          status: "active",
        };
        setUsers([...users, newUser]);
      }

      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditingId(user.id);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setDeleteConfirm(null);
    // removed checkbox selection handling
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "user" });
    setEditingId(null);
    setErrors({});
  };

  const togglePasswordVisibility = (userId: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // checkbox selection removed

  const filteredAndSortedUsers = users
    .filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesStatus =
        filterStatus === "all" || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      if (sortBy === "date")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Manajemen Akun
                </h1>
                <p className="text-sm text-slate-500">
                  Kelola pengguna sistem dengan mudah
                </p>
              </div>
            </div>

            {/* Add button removed — form modal disabled */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Akun</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Administrator</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {users.filter((u) => u.role === "admin").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FaCrown className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Moderator</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {users.filter((u) => u.role === "moderator").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaUserCog className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">User</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {users.filter((u) => u.role === "user").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FaUser className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="all">Semua Role</option>
                <option value="admin">Administrator</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="name">Urutkan Nama</option>
                <option value="role">Urutkan Role</option>
                <option value="date">Urutkan Tanggal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-200/50">
                <tr>
                  <th className="px-6 py-4 text-left" />
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Nama
                  </th>
                  {/* Email column removed per request */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {paginatedUsers.map((user) => {
                  const config = roleConfig[user.role];
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="px-6 py-4" />
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white font-semibold`}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {user.name}
                            </div>
                            {/* ID removed */}
                          </div>
                        </div>
                      </td>
                      {/* Email cell removed per request */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 font-mono">
                            {showPassword[user.id]
                              ? "password123"
                              : user.password}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword[user.id] ? (
                              <FaEyeSlash className="w-4 h-4" />
                            ) : (
                              <FaEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white ${config.badgeBg}`}
                        >
                          {config.icon}
                          {config.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {user.status === "active" ? (
                            <FaCheckCircle className="w-3 h-3" />
                          ) : (
                            <FaTimesCircle className="w-3 h-3" />
                          )}
                          {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-slate-200/50">
            {paginatedUsers.map((user) => {
              const config = roleConfig[user.role];
              return (
                <div
                  key={user.id}
                  className="p-4 hover:bg-slate-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* checkbox removed */}
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white font-semibold`}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </div>
                        {/* ID removed */}
                      </div>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <FaEllipsisV className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {/* Email removed for mobile view */}

                    <div className="flex items-center gap-2">
                      <FaKey className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 font-mono">
                        {showPassword[user.id] ? "password123" : user.password}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword[user.id] ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white ${config.badgeBg}`}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {user.status === "active" ? (
                          <FaCheckCircle className="w-3 h-3" />
                        ) : (
                          <FaTimesCircle className="w-3 h-3" />
                        )}
                        {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/30">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(user.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedUsers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium text-lg">
                Tidak ada akun yang ditemukan
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200/50 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedUsers.length
                )}{" "}
                dari {filteredAndSortedUsers.length} akun
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200/50 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-gradient-to-r from-indigo-400 to-purple-500 text-white"
                            : "hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200/50 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full transform transition-all duration-300 scale-100 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="text-slate-600 text-center mb-6">
              Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                Hapus
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border-2 border-slate-200/50 text-slate-700 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTable;
