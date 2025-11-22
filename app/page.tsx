"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaUserShield,
  FaUserTie,
  FaChalkboardTeacher,
  FaCamera,
  FaFingerprint,
  FaChartPie,
  FaShieldAlt,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaBolt,
  FaClock,
  FaMobileAlt,
  FaDatabase,
} from "react-icons/fa";
import Footer from "@/components/footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      {/* Floating Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
              scrolled ? "shadow-lg shadow-cyan-500/5" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
                <img
                  src="/logoRounded.png"
                  alt="logo"
                  className="w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/20"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Face<span className="text-cyan-400"> Recognition</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Tentang", "Fitur", "Cara Kerja", "Akses"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                href="/login"
                className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                Login
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 p-4 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-4 md:hidden">
            {["Tentang", "Fitur", "Cara Kerja", "Akses"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white font-medium"
              >
                {item}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-3 bg-cyan-500 text-white rounded-xl font-bold"
            >
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Next Gen School Attendance
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Absensi Wajah <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Berbasis Machine Learning
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Revolusi sistem kehadiran sekolah dengan teknologi pengenalan wajah
            yang akurat, cepat, dan aman. Hilangkan antrian panjang dan
            manipulasi data absensi manual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#cara-kerja"
              className="group relative px-8 py-4 bg-cyan-500 text-slate-900 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                <FaCamera /> Pelajari Lebih Lanjut
              </span>
            </Link>
            <a
              href="#akses"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm"
            >
              Portal Akses
            </a>
          </div>

          {/* Stats Strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            {[
              { label: "Akurasi Model", value: "99.9%" },
              { label: "Kecepatan Scan", value: "< 1 Detik" },
              { label: "Siswa Terdaftar", value: "1,200+" },
              { label: "Uptime Server", value: "24/7" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 relative z-10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/10 p-8 md:p-16 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Revolusi Pendidikan Dimulai dari Kedisiplinan
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  FaceRecog bukan sekadar alat absensi. Ini adalah langkah awal
                  menuju digitalisasi sekolah yang menyeluruh. Kami percaya
                  bahwa efisiensi administrasi akan memberikan lebih banyak
                  waktu bagi pendidik untuk fokus pada hal yang paling penting:
                  <span className="text-cyan-400 font-semibold">
                    {" "}
                    Mencerdaskan Bangsa.
                  </span>
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    "100% Paperless",
                    "Eco Friendly",
                    "Smart Campus",
                    "Real-time Data",
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">
                      0%
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Kecurangan
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      50%
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Lebih Efisien
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                      10k+
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Wajah Terdeteksi
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-rose-400 mb-1">
                      24h
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Monitoring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="fitur"
        className="py-24 relative z-10 bg-slate-900/50 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Teknologi Masa Depan
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Kami menggabungkan hardware canggih dan software cerdas untuk
              menciptakan ekosistem absensi yang sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaFingerprint />,
                title: "Biometrik Presisi",
                desc: "Algoritma pengenalan wajah tingkat lanjut yang mampu membedakan wajah asli dan foto, memastikan kehadiran 100% valid.",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
              },
              {
                icon: <FaChartPie />,
                title: "Analitik Real-time",
                desc: "Dashboard interaktif bagi guru dan admin untuk memantau kehadiran siswa detik demi detik dengan visualisasi data yang intuitif.",
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
              },
              {
                icon: <FaShieldAlt />,
                title: "Keamanan Enkripsi",
                desc: "Seluruh data biometrik siswa dienkripsi dengan standar militer (AES-256), menjamin privasi dan keamanan data sensitif.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                icon: <FaBolt />,
                title: "Performa Kilat",
                desc: "Optimasi sistem yang memungkinkan proses absensi ratusan siswa selesai dalam hitungan menit tanpa antrian.",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/20",
              },
              {
                icon: <FaMobileAlt />,
                title: "Akses Multi-Platform",
                desc: "Pantau kehadiran dari mana saja melalui perangkat desktop, tablet, maupun smartphone dengan tampilan responsif.",
                color: "text-pink-400",
                bg: "bg-pink-500/10",
                border: "border-pink-500/20",
              },
              {
                icon: <FaDatabase />,
                title: "Auto Backup",
                desc: "Data kehadiran tersimpan otomatis di cloud dengan sistem backup berkala, mencegah kehilangan data penting.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-slate-950/50 backdrop-blur-md border ${feature.border} hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cara-kerja" className="py-24 relative z-10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Cara Kerja Sistem
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Registrasi Wajah",
                    desc: "Admin mendaftarkan wajah siswa ke dalam database sistem menggunakan kamera beresolusi tinggi.",
                  },
                  {
                    step: "02",
                    title: "Proses Scanning",
                    desc: "Siswa melakukan scan wajah di perangkat yang tersedia. AI akan mencocokkan wajah dalam < 1 detik.",
                  },
                  {
                    step: "03",
                    title: "Pencatatan Otomatis",
                    desc: "Sistem mencatat waktu kehadiran dan status siswa secara real-time ke database pusat.",
                  },
                  {
                    step: "04",
                    title: "Pelaporan",
                    desc: "Guru dan orang tua dapat melihat laporan kehadiran harian, mingguan, atau bulanan secara instan.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-slate-500 text-sm font-mono">
                    System Status: Online
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Initializing Camera...</span>
                    <span className="text-green-400">OK</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Loading Face Models...</span>
                    <span className="text-green-400">Done (120ms)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Connecting to Database...</span>
                    <span className="text-green-400">Connected</span>
                  </div>
                  <div className="h-px bg-slate-800 my-4" />
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <FaUserTie className="text-slate-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          Detecting Face...
                        </div>
                        <div className="text-cyan-400 animate-pulse">
                          Scanning...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Portal (The "Anti-mainstream" part) */}
      <section id="akses" className="py-24 relative z-10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Portal Akses
              </h2>
              <p className="text-slate-400 max-w-md">
                Pilih gerbang masuk sesuai dengan peran Anda dalam ekosistem
                sekolah.
              </p>
            </div>
            <div className="h-1 w-full md:w-1/3 bg-linear-to-r from-cyan-500/50 to-transparent rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Administrator",
                role: "System Control",
                href: "/login",
                icon: <FaUserShield />,
                gradient: "from-blue-600 to-blue-900",
                accent: "border-blue-500/30",
              },
              {
                title: "Kesiswaan",
                role: "Student Monitor",
                href: "/login",
                icon: <FaUserTie />,
                gradient: "from-violet-600 to-violet-900",
                accent: "border-violet-500/30",
              },
              {
                title: "Kepala Sekolah",
                role: "Executive View",
                href: "/login",
                icon: <FaChalkboardTeacher />,
                gradient: "from-emerald-600 to-emerald-900",
                accent: "border-emerald-500/30",
              },
              {
                title: "Scan Station",
                role: "AI Terminal",
                href: "/login",
                icon: <FaCamera />,
                gradient: "from-rose-600 to-rose-900",
                accent: "border-rose-500/30",
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={`group relative h-80 rounded-3xl overflow-hidden border ${
                  item.accent
                } transition-all duration-500 hover:shadow-2xl hover:shadow-${
                  item.gradient.split("-")[1]
                }-500/20`}
              >
                {/* Card Background with Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-b ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/60 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                      <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
                      {item.role}
                    </p>
                    <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
