"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaCamera,
  FaUserCheck,
  FaTimes,
  FaCheck,
  FaTimesCircle,
  FaSpinner,
  FaShieldAlt,
  FaUser,
  FaGraduationCap,
  FaExclamationTriangle,
  FaRedo,
  FaUserCircle,
} from "react-icons/fa";

interface ScanResult {
  name: string;
  class: string;
  nis: string;
  photo: string;
  confidence: number;
}

const FaceRecognition: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data for demo
  const mockResults: ScanResult[] = [
    {
      name: "Ahmad Rizki Pratama",
      class: "XII RPL 1",
      nis: "2021001234",
      photo: "https://picsum.photos/seed/ahmad/200/200.jpg",
      confidence: 98.5,
    },
    {
      name: "Siti Nurhaliza",
      class: "XI MM 2",
      nis: "2021005678",
      photo: "https://picsum.photos/seed/siti/200/200.jpg",
      confidence: 96.2,
    },
    {
      name: "Budi Santoso",
      class: "X TKJ 3",
      nis: "2021009012",
      photo: "https://picsum.photos/seed/budi/200/200.jpg",
      confidence: 94.8,
    },
  ];

  useEffect(() => {
    // Simulate camera activation
    if (cameraActive) {
      setTimeout(() => {
        startCamera();
      }, 500);
    }
  }, [cameraActive]);

  const startCamera = async () => {
    // Cek support kamera
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(
        "Perangkat atau browser Anda tidak mendukung akses kamera.\n" +
          "Gunakan browser terbaru seperti Google Chrome, Mozilla Firefox, atau Safari.\n" +
          "Jika Anda membuka dari aplikasi lain (misal: Facebook, Instagram, TikTok, WebView), buka langsung di browser utama."
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setError(
        "Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan."
      );
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          completeScan();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const completeScan = () => {
    // Simulate successful scan with random result
    setTimeout(() => {
      const randomResult =
        mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(randomResult);
      setScanComplete(true);
      setIsScanning(false);
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }, 500);
  };

  const handleValidation = (isValid: boolean) => {
    setShowResult(false);
    if (isValid) {
      // Handle successful validation
      console.log("Face validated successfully:", scanResult);
      // Reset after successful validation
      setTimeout(() => {
        resetScanner();
      }, 1000);
    } else {
      // Handle failed validation
      console.log("Face validation failed");
      // Restart scanning
      setTimeout(() => {
        resetScanner();
        startScanning();
      }, 1000);
    }
  };

  const resetScanner = () => {
    setIsScanning(false);
    setScanComplete(false);
    setShowResult(false);
    setScanResult(null);
    setScanProgress(0);
    setError(null);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    resetScanner();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Face Recognition
                </h1>
                <p className="text-sm text-slate-500">Sistem absensi wajah</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cameraActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {cameraActive ? "Kamera Aktif" : "Kamera Nonaktif"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Full Width Camera Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            {/* Scanner Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                Pemindai Wajah
              </h2>
              <p className="text-indigo-100 text-sm">
                Posisikan wajah Anda di dalam frame untuk memulai pemindaian
              </p>
            </div>

            {/* Scanner Body - Full Width Large Camera */}
            <div className="p-2 sm:p-4 lg:p-6">
              {/* Large Camera View - Mobile Optimized */}
              <div className="relative w-full">
                {/* Aspect ratio container for better face framing - Mobile Optimized */}
                <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  {!cameraActive ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <FaCamera className="w-20 h-20 sm:w-24 sm:h-24 text-slate-600 mb-6" />
                      <p className="text-slate-400 text-center text-lg sm:text-xl mb-8 px-4">
                        Kamera belum aktif
                      </p>
                      <button
                        onClick={() => setCameraActive(true)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-3 text-lg font-medium"
                      >
                        <FaCamera className="w-5 h-5" />
                        Aktifkan Kamera
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay elips lonjong ke atas, lebih besar di tablet/laptop/desktop */}
                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2"
                        style={{
                          transform: "translate(-50%, -50%)",
                          width: "68vw",
                          height: "85vw",
                          maxWidth: "95%",
                          maxHeight: "92%",
                          minWidth: "120px",
                          minHeight: "160px",
                          border: "4px solid #a78bfa",
                          borderRadius: "50% / 60%",
                          boxSizing: "border-box",
                          zIndex: 10,
                          ...(window.innerWidth >= 640
                            ? {
                                width: "38vw",
                                height: "55vw",
                                minWidth: "160px",
                                minHeight: "200px",
                                maxWidth: "420px",
                                maxHeight: "520px",
                              }
                            : {}),
                          ...(window.innerWidth >= 1024
                            ? {
                                width: "28vw",
                                height: "38vw",
                                minWidth: "140px",
                                minHeight: "180px",
                                maxWidth: "340px",
                                maxHeight: "400px",
                              }
                            : {}),
                        }}
                      />

                      {/* Scanning Overlay - UI minimalis */}
                      {isScanning && (
                        <div className="absolute inset-0 flex flex-col items-end justify-end">
                          <div className="w-full bg-black/80 p-4 rounded-b-2xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-base font-medium">
                                Mendeteksi wajah...
                              </span>
                              <span className="text-white text-lg font-bold">
                                {scanProgress}%
                              </span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-indigo-400 to-purple-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${scanProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Success Overlay - Larger */}
                      {scanComplete && !showResult && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 flex flex-col items-center shadow-2xl">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                              <FaUserCheck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" />
                            </div>
                            <p className="text-slate-800 font-bold text-lg sm:text-xl lg:text-2xl mb-2">
                              Wajah terdeteksi!
                            </p>
                            <p className="text-slate-500 text-sm sm:text-base lg:text-lg">
                              Memproses data...
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Control Buttons - Larger and more prominent */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!cameraActive ? (
                  <button
                    onClick={() => setCameraActive(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-3 text-lg font-medium w-full sm:w-auto"
                  >
                    <FaCamera className="w-5 h-5" />
                    Aktifkan Kamera
                  </button>
                ) : (
                  <>
                    {!isScanning && !scanComplete && (
                      <button
                        onClick={startScanning}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-3 text-lg font-medium w-full sm:w-auto"
                      >
                        <FaUserCheck className="w-5 h-5" />
                        Mulai Pemindaian
                      </button>
                    )}
                    {isScanning && (
                      <button
                        onClick={resetScanner}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-10 py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-3 text-lg font-medium w-full sm:w-auto"
                      >
                        <FaTimes className="w-5 h-5" />
                        Batalkan
                      </button>
                    )}
                    <button
                      onClick={stopCamera}
                      className="border-2 border-slate-300 text-slate-700 px-10 py-4 rounded-xl hover:bg-slate-50 transition-all duration-200 flex items-center gap-3 text-lg font-medium w-full sm:w-auto"
                    >
                      <FaTimes className="w-5 h-5" />
                      Matikan Kamera
                    </button>
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <FaExclamationTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Section - Below Camera */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instructions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaUserCircle className="w-5 h-5 text-indigo-600" />
              Petunjuk Pemindaian
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-indigo-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Pastikan pencahayaan baik
                  </p>
                  <p className="text-xs text-slate-500">
                    Hindari bayangan atau cahaya terlalu terang
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-indigo-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Posisikan wajah di frame
                  </p>
                  <p className="text-xs text-slate-500">
                    Pastikan seluruh wajah terlihat jelas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-indigo-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Hindari penggunaan masker
                  </p>
                  <p className="text-xs text-slate-500">
                    Wajah harus terlihat sepenuhnya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaGraduationCap className="w-5 h-5 text-indigo-600" />
              Pemindaian Terakhir
            </h3>
            <div className="space-y-3">
              {mockResults.slice(0, 3).map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <img
                    src={result.photo}
                    alt={result.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {result.name}
                    </p>
                    <p className="text-xs text-slate-500">{result.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      {result.confidence}%
                    </p>
                    <p className="text-xs text-slate-400">Akurasi</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && scanResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaUserCheck className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={() => setShowResult(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                Pemindaian Berhasil!
              </h2>
              <p className="text-green-100 text-sm">
                Wajah berhasil dikenali dengan akurasi {scanResult.confidence}%
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={scanResult.photo}
                  alt={scanResult.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-100"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800">
                    {scanResult.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-1">
                    NIS: {scanResult.nis}
                  </p>
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600">
                      {scanResult.class}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Tingkat Kepercayaan
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {scanResult.confidence}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      scanResult.confidence >= 95
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : scanResult.confidence >= 85
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600"
                        : "bg-gradient-to-r from-red-500 to-pink-600"
                    }`}
                    style={{ width: `${scanResult.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Validation Question */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-center text-slate-700 font-medium mb-4">
                  Apakah ini benar data Anda?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleValidation(false)}
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <FaTimesCircle className="w-4 h-4" />
                    Tidak, itu bukan saya
                  </button>
                  <button
                    onClick={() => handleValidation(true)}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <FaCheck className="w-4 h-4" />
                    Ya, itu saya
                  </button>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setTimeout(() => {
                      resetScanner();
                      startScanning();
                    }, 300);
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                >
                  <FaRedo className="w-3 h-3" />
                  Scan Ulang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for Face Detection */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FaceRecognition;
