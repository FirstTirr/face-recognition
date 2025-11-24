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
  FaFingerprint,
  FaHistory,
  FaBolt,
  FaBarcode,
  FaEye,
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
  const [formData, setFormData] = useState({
    name: "",
    kelas: "",
    nisn: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
    <div className="min-h-screen bg-[#E0E7F1] text-slate-900 font-mono p-4 md:p-8 selection:bg-orange-400 selection:text-black overflow-x-hidden">
      <style jsx global>{`
        @keyframes scan-fast {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
        .animate-scan-fast {
          animation: scan-fast 2s linear infinite;
        }
        .brutalist-shadow {
          box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
        }
        .brutalist-shadow-sm {
          box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
        }
        .brutalist-shadow-lg {
          box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);
        }
        .blur-mask {
          mask-image: radial-gradient(
            ellipse 160px 225px at center,
            transparent 98%,
            black 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 160px 225px at center,
            transparent 98%,
            black 100%
          );
        }
        @media (min-width: 640px) {
          .blur-mask {
            mask-image: radial-gradient(
              ellipse 200px 275px at center,
              transparent 98%,
              black 100%
            );
            -webkit-mask-image: radial-gradient(
              ellipse 200px 275px at center,
              transparent 98%,
              black 100%
            );
          }
        }
      `}</style>

      {/* The Grid Layout */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[85vh]">
        {/* LEFT COLUMN: CONTROLS & INFO (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Branding Card */}
          <div className="bg-white border-4 border-black brutalist-shadow p-6 relative overflow-hidden group transition-transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 border-l-4 border-b-4 border-black">
              BETA_V2
            </div>
            <h1 className="text-4xl font-black uppercase leading-none mb-2 tracking-tighter">
              Face
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                Recog.
              </span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <FaBolt className="text-yellow-500" /> Biometric Security System
            </p>
          </div>

          {/* Status Terminal */}
          <div className="bg-black text-green-400 p-4 border-4 border-black brutalist-shadow flex-1 min-h-[200px] font-mono text-xs overflow-hidden relative">
            <div className="absolute top-2 right-2 animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="space-y-2 opacity-90 font-bold">
              <p>&gt; SYSTEM_INIT...</p>
              <p>&gt; CHECKING_PERMISSIONS... [OK]</p>
              <p>
                &gt; CAMERA_MODULE...{" "}
                {cameraActive ? (
                  <span className="text-green-400 bg-green-900/30 px-1">
                    [ACTIVE]
                  </span>
                ) : (
                  <span className="text-red-500 bg-red-900/30 px-1">
                    [OFFLINE]
                  </span>
                )}
              </p>
              {isScanning && <p>&gt; SCANNING_SEQUENCE_STARTED...</p>}
              {scanComplete && <p>&gt; DATA_RECEIVED. PROCESSING...</p>}
              <p className="animate-pulse">_</p>
            </div>

            {/* Decorative ASCII or Lines */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
          </div>

          {/* Registration Form */}
          <div className="bg-white border-4 border-black brutalist-shadow p-6">
            <div className="bg-black text-white p-3 -mx-6 -mt-6 mb-6 font-bold uppercase text-sm flex justify-between items-center border-b-4 border-black">
              <span>Student Data</span>
              <FaUserCircle />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-orange-50 transition-colors"
                  placeholder="MASUKKAN NAMA..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Kelas</label>
                <select
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-orange-50 transition-colors appearance-none bg-white cursor-pointer"
                >
                  <option value="">PILIH KELAS...</option>
                  <option value="X RPL 1">X RPL 1</option>
                  <option value="X RPL 2">X RPL 2</option>
                  <option value="XI RPL 1">XI RPL 1</option>
                  <option value="XI RPL 2">XI RPL 2</option>
                  <option value="XII RPL 1">XII RPL 1</option>
                  <option value="XII RPL 2">XII RPL 2</option>
                  <option value="X TKJ 1">X TKJ 1</option>
                  <option value="X TKJ 2">X TKJ 2</option>
                  <option value="XI TKJ 1">XI TKJ 1</option>
                  <option value="XI TKJ 2">XI TKJ 2</option>
                  <option value="XII TKJ 1">XII TKJ 1</option>
                  <option value="XII TKJ 2">XII TKJ 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">NISN</label>
                <input
                  type="text"
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-orange-50 transition-colors"
                  placeholder="NOMOR INDUK..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CAMERA VIEWPORT (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Main Viewport Frame */}
          <div className="flex-1 bg-white border-4 border-black brutalist-shadow-lg relative flex flex-col min-h-[600px] md:min-h-[700px]">
            {/* Viewport Header */}
            <div className="border-b-4 border-black p-3 flex justify-between items-center bg-slate-100">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-black bg-red-500"></div>
                <div className="w-4 h-4 rounded-full border-2 border-black bg-yellow-500"></div>
                <div className="w-4 h-4 rounded-full border-2 border-black bg-green-500"></div>
              </div>
              <div className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Cam_Feed_01
              </div>
              <FaBarcode className="text-2xl opacity-50" />
            </div>

            {/* Camera Area */}
            <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden flex items-center justify-center group">
              {!cameraActive ? (
                <div className="text-center space-y-6 z-10 p-8">
                  <div className="inline-block p-8 border-4 border-dashed border-slate-700 rounded-full bg-slate-800/50 backdrop-blur-sm">
                    <FaCamera className="text-6xl text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-3xl uppercase tracking-widest mb-2">
                      Signal Lost
                    </h2>
                    <p className="text-slate-500 font-mono text-sm">
                      CAMERA FEED DISCONNECTED
                    </p>
                  </div>
                  <button
                    onClick={() => setCameraActive(true)}
                    className="bg-orange-500 hover:bg-orange-400 text-black font-black uppercase py-4 px-8 border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-3 mx-auto"
                  >
                    <FaBolt /> Initialize Camera
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

                  {/* Blur Overlay */}
                  <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 blur-mask"></div>

                  {/* HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none border-20 border-black/10 z-10">
                    <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white/80"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white/80"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white/80"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white/80"></div>

                    {/* Face Frame */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[450px] sm:w-[400px] sm:h-[550px] border-2 border-white/30 rounded-[50%]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-3 py-1 font-bold border border-white/20">
                        TARGET ZONE
                      </div>
                    </div>
                  </div>

                  {/* Scanning Effect */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-green-500/10 z-20">
                      <div className="w-full h-1 bg-green-500 shadow-[0_0_20px_rgba(0,255,0,0.8)] absolute animate-scan-fast"></div>
                      <div className="absolute bottom-10 left-0 right-0 text-center">
                        <span className="bg-black text-green-400 px-6 py-3 font-mono font-bold text-xl border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(0,255,0,0.4)]">
                          ANALYZING... {scanProgress}%
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Control Bar */}
            <div className="border-t-4 border-black p-4 bg-white flex flex-wrap gap-4 justify-center">
              {cameraActive && !isScanning && !scanComplete && (
                <button
                  onClick={startScanning}
                  className="flex-1 bg-black text-white font-black uppercase py-4 px-6 border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all flex items-center justify-center gap-2 text-lg brutalist-shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <FaUserCheck /> Start Scan
                </button>
              )}
              {isScanning && (
                <button
                  onClick={resetScanner}
                  className="flex-1 bg-red-600 text-white font-black uppercase py-4 px-6 border-4 border-black hover:bg-red-500 transition-all flex items-center justify-center gap-2 brutalist-shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <FaTimes /> Abort
                </button>
              )}
              {cameraActive && (
                <button
                  onClick={stopCamera}
                  className="bg-slate-200 text-black font-bold uppercase py-4 px-6 border-4 border-black hover:bg-slate-300 transition-all brutalist-shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Brutalist Modal */}
      {showResult && scanResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg border-4 border-black shadow-[16px_16px_0px_0px_#f97316] relative animate-in fade-in zoom-in duration-300">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h2 className="font-black uppercase text-xl tracking-tighter flex items-center gap-2">
                <FaCheck className="text-green-500" /> Identity_Verified
              </h2>
              <button
                onClick={() => setShowResult(false)}
                className="hover:text-orange-500 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative self-center sm:self-start">
                  <img
                    src={scanResult.photo}
                    className="w-32 h-32 object-cover border-4 border-black"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-green-500 border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <FaCheck className="text-white" />
                  </div>
                </div>
                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5">
                      Full Name
                    </label>
                    <div className="text-2xl font-black leading-tight mt-1">
                      {scanResult.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5">
                      ID Number
                    </label>
                    <div className="font-mono font-bold mt-1">
                      {scanResult.nis}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5">
                      Class
                    </label>
                    <div className="font-bold mt-1">{scanResult.class}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t-4 border-black pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold uppercase text-sm">
                    Confidence Score
                  </span>
                  <span className="font-black text-3xl">
                    {scanResult.confidence}%
                  </span>
                </div>
                <div className="h-6 w-full border-4 border-black p-1 bg-white">
                  <div
                    className="h-full bg-orange-500 transition-all duration-1000"
                    style={{ width: `${scanResult.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleValidation(false)}
                  className="border-4 border-black py-3 font-bold uppercase hover:bg-red-500 hover:text-white transition-all brutalist-shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleValidation(true)}
                  className="bg-black text-white border-4 border-black py-3 font-bold uppercase hover:bg-orange-500 hover:text-black transition-all brutalist-shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  Confirm
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setTimeout(() => {
                      resetScanner();
                      startScanning();
                    }, 300);
                  }}
                  className="text-xs font-bold uppercase text-slate-400 hover:text-black flex items-center justify-center gap-2 mx-auto"
                >
                  <FaRedo /> Reset Scanner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FaceRecognition;
