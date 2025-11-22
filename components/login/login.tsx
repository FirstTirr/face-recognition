"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Blobs (Consistent with Landing) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row relative z-10">
        {/* Left Side - Visual/Brand (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-50" />
          {/* Abstract Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-8 transform group-hover:rotate-6 transition-transform duration-500">
              <img
                src="/logoRounded.png"
                alt="Logo"
                className="w-14 h-14 brightness-0 invert"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              FaceRecog System
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">
              Sistem absensi masa depan.
              <br />
              Cepat, Akurat, dan Aman.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-medium group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
              Kembali ke Beranda
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Selamat Datang
            </h1>
            <p className="text-slate-400 text-lg">
              Silakan masuk untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-slate-500 group-focus-within:text-cyan-400 transition-colors text-lg" />
                </div>
                <input
                  type="text"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white text-lg rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="Masukkan ID Pengguna"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-slate-500 group-focus-within:text-cyan-400 transition-colors text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-950/50 border border-slate-700 text-white text-lg rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="Masukkan Kata Sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xl" />
                  ) : (
                    <FaEye className="text-xl" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
                >
                  Lupa Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-cyan-500/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk Sekarang <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Butuh bantuan?{" "}
              <a
                href="#"
                className="text-cyan-500 hover:text-cyan-400 font-medium"
              >
                Hubungi Admin
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center w-full text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} FaceRecog System. All rights reserved.
      </div>
    </div>
  );
}
