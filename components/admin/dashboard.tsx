"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaEye,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  gradient: string;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  time: string;
  status: "success" | "pending" | "error";
}

const Dashboard: React.FC<{ onOpenSidebar?: () => void }> = ({
  onOpenSidebar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("7days");
  const [showNotifications, setShowNotifications] = useState(false);
  const [chartRange, setChartRange] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const statCards: StatCard[] = [
    {
      title: "Total Siswa",
      value: "1,240",
      change: 3.2,
      icon: <FaUsers className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Guru",
      value: "85",
      change: 0.0,
      icon: <FaUserCircle className="w-6 h-6" />,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Kelas",
      value: "32",
      change: 1.5,
      icon: <FaChartLine className="w-6 h-6" />,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Total Jurusan",
      value: "8",
      change: 0.0,
      icon: <FaCog className="w-6 h-6" />,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      user: "Ahmad Rizki",
      action: "Menambah produk baru",
      time: "2 menit yang lalu",
      status: "success",
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      action: "Update profil pengguna",
      time: "15 menit yang lalu",
      status: "success",
    },
    {
      id: 3,
      user: "Budi Santoso",
      action: "Menghapus data kategori",
      time: "1 jam yang lalu",
      status: "error",
    },
    {
      id: 4,
      user: "Dewi Lestari",
      action: "Export laporan penjualan",
      time: "2 jam yang lalu",
      status: "success",
    },
    {
      id: 5,
      user: "Eko Prasetyo",
      action: "Menunggu verifikasi",
      time: "3 jam yang lalu",
      status: "pending",
    },
  ];

  const topStudents = [
    { name: "Andi Wijaya", hadir: 22, pct: 98 },
    { name: "Rina Damayanti", hadir: 20, pct: 95 },
    { name: "Budi Santoso", hadir: 19, pct: 92 },
    { name: "Siti Nurhaliza", hadir: 18, pct: 90 },
    { name: "Dewi Lestari", hadir: 17, pct: 88 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button - opens sidebar when parent provides handler */}
            <button
              onClick={() => {
                if (onOpenSidebar) {
                  onOpenSidebar();
                } else {
                  setMobileMenuOpen(!mobileMenuOpen);
                }
              }}
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              {onOpenSidebar ? (
                <FaBars className="w-5 h-5" />
              ) : mobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>

            {/* Search Bar - Hidden on mobile, shown on larger screens */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari data, laporan, atau pengguna..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Search Button - Visible only on mobile */}
              <button className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100">
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-md text-slate-600 hover:bg-slate-100 relative"
                >
                </button>

                {/* Notification Dropdown - Adjusted for mobile */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">
                        Notifikasi
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-slate-50 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-800">
                          Pesanan baru #1234
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          5 menit yang lalu
                        </p>
                      </div>
                      <div className="p-4 hover:bg-slate-50 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-800">
                          Update sistem berhasil
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          1 jam yang lalu
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu - Adjusted for mobile */}
              <div className="relative flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
                <button
                  onClick={() => setUserMenuOpen((s) => !s)}
                  className="flex items-center gap-2 rounded-md p-1 hover:bg-slate-100 transition-colors"
                  aria-label="Open user menu"
                >
                  <img
                    src="https://picsum.photos/seed/admin123/32/32.jpg"
                    alt="Admin"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-800">
                      Admin User
                    </p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                  <FaEllipsisH className="w-4 h-4 text-slate-600 hidden sm:block" />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden">
                    
                    <div className="border-t border-slate-100" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        // placeholder logout: navigate to /login; replace with real logout logic
                        router.push("/login");
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Visible when mobile menu is open */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-slate-200">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari data, laporan, atau pengguna..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title - Adjusted for mobile */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Selamat datang kembali! Berikut ringkasan aktivitas terkini.
          </p>
        </div>

        {/* Statistics Cards - Already responsive but adjusted spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`p-4 sm:p-6 bg-gradient-to-r ${card.gradient}`}>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="text-xs sm:text-sm opacity-90">
                      {card.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">
                      {card.value}
                    </p>
                  </div>
                  <div className="text-white opacity-80">{card.icon}</div>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center">
                  {card.change > 0 ? (
                    <FaArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  ) : (
                    <FaArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      card.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <span className="text-xs text-slate-500">vs bulan lalu</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Tables Section - Improved mobile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Sales Chart - Adjusted for mobile */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-3 sm:mb-0">
                Grafik Absensi
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartRange("daily")}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                    chartRange === "daily"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  Harian
                </button>
                <button
                  onClick={() => setChartRange("weekly")}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                    chartRange === "weekly"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Mingguan
                </button>
                <button
                  onClick={() => setChartRange("monthly")}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                    chartRange === "monthly"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Chart - Improved mobile display */}
            <div className="h-48 sm:h-64">
              {(() => {
                const getChartData = (
                  range: "daily" | "weekly" | "monthly"
                ) => {
                  if (range === "daily") {
                    return {
                      // last 7 days shown as weekday names
                      values: [30, 75, 45, 90, 22, 80, 60],
                      labels: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                    };
                  }
                  if (range === "weekly") {
                    return {
                      values: [55, 68, 72, 80, 66, 74, 90, 82, 70, 75, 60, 78],
                      labels: Array.from({ length: 12 }, (_, i) => `W${i + 1}`),
                    };
                  }
                  // monthly
                  return {
                    values: [45, 60, 55, 70, 80, 75, 85, 90, 78, 82, 88, 95],
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mei",
                      "Jun",
                      "Jul",
                      "Agu",
                      "Sep",
                      "Okt",
                      "Nov",
                      "Des",
                    ],
                  };
                };

                const data = getChartData(chartRange);
                const maxVal = Math.max(...data.values);
                const ticks = [1, 0.75, 0.5, 0.25, 0];

                return (
                  <div className="h-full flex">
                    {/* Y-axis labels - Hidden on very small screens */}
                    <div className="hidden sm:flex w-12 sm:w-16 flex-col justify-between pr-2 sm:pr-4">
                      {ticks.map((t, i) => (
                        <span key={i} className="text-xs text-slate-400">
                          {Math.round(maxVal * t)}
                        </span>
                      ))}
                    </div>

                    {/* Bars */}
                    <div className="flex-1 flex items-end justify-between space-x-1 sm:space-x-2">
                      {data.values.map((height, index) => {
                        const scale = Math.max(height / maxVal, 0.06);
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center h-full"
                          >
                            <div className="flex-1 w-full flex items-end">
                              <div
                                className={`w-full bg-blue-500 rounded-t transition-transform origin-bottom`}
                                style={{
                                  transform: `scaleY(${scale})`,
                                  height: "100%",
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-500 mt-1 sm:mt-2">
                              {data.labels[index]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-center text-xs text-slate-500">
              <FaCalendarAlt className="w-3 h-3 mr-1" />
              {chartRange === "daily"
                ? "7 hari terakhir"
                : chartRange === "weekly"
                ? "12 minggu terakhir"
                : "12 bulan terakhir"}
            </div>
          </div>

          {/* Top Products - Adjusted for mobile */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Top 5 Siswa (Kehadiran)
              </h2>
              <button className="text-slate-400 hover:text-slate-600">
                <FaEllipsisH className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium text-slate-600">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {student.hadir} kali hadir
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-medium text-slate-800 whitespace-nowrap">
                      {student.pct}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities Table - Mobile-friendly card view */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-800">
              Aktivitas Terkini
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg flex items-center">
                <FaFilter className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg flex items-center">
                <FaDownload className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Pengguna
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Aktivitas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Waktu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://picsum.photos/seed/user${activity.id}/32/32.jpg`}
                          alt={activity.user}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-sm font-medium text-slate-900">
                          {activity.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {activity.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === "success"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.status === "success"
                          ? "Berhasil"
                          : activity.status === "pending"
                          ? "Menunggu"
                          : "Gagal"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-slate-200">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://picsum.photos/seed/user${activity.id}/40/40.jpg`}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {activity.user}
                      </p>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === "success"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.status === "success"
                          ? "Berhasil"
                          : activity.status === "pending"
                          ? "Menunggu"
                          : "Gagal"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">
                      {activity.action}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">{activity.time}</p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
`=-1`;
