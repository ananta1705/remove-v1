"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Mail, 
  ArrowLeft,
  Trash2,
  MapPin,
  Leaf,
  Truck,
  CheckCircle2
} from "lucide-react";

export function LupaSandiPage() {
  const router = useRouter();
  
  // State for form
  const [email, setEmail] = useState("");
  
  // State for simulation
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mouse Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call for sending reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col lg:flex-row bg-[#0ebf8f] font-sans overflow-hidden"
    >
      
      {/* Left Section - #14CC99 Vivid Teal Branding Area */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #14CC99 0%, #0ebf8f 40%, #0aab80 70%, #089e76 100%)' }}>
        
        {/* Animated Mesh Gradient Blobs */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/15 rounded-full blur-[100px] mix-blend-overlay pointer-events-none animate-blob"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] mix-blend-overlay pointer-events-none animate-blob"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` 
          }}
        />
        <div 
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-[#06917f]/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none animate-blob"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -15}px)` 
          }}
        />

        {/* Floating Icons Background Pattern */}
        <div className="absolute inset-0 pointer-events-none text-white opacity-15">
          <Trash2 className="absolute top-[15%] left-[20%] w-20 h-20" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }} />
          <MapPin className="absolute top-[10%] right-[20%] w-24 h-24" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)` }} />
          <Leaf className="absolute bottom-[25%] left-[10%] w-28 h-28" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)` }} />
          <Truck className="absolute bottom-[15%] right-[15%] w-20 h-20" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }} />
        </div>

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/25 border border-white/40 mb-8 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wide uppercase">Sistem ReMove</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Pemulihan<br />Akses Akun
          </h1>
          <p className="mt-6 text-lg text-white/90 max-w-md font-medium leading-relaxed">
            Tidak perlu khawatir jika Anda melupakan kata sandi. Masukkan email Anda dan kami akan membantu Anda memulihkannya.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-white/80">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <img src="/images/logo.png" alt="ReMove" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <p className="font-bold text-white">ReMove Indonesia</p>
              <p className="text-sm">Platform Pengelolaan Sampah</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form Area */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
        <div className="w-full max-w-md mx-auto p-8 relative z-10">
          
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm font-semibold text-[#557865] hover:text-[#14CC99] transition-colors mb-8 group w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Masuk
          </button>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-[#1a2b22] tracking-tight mb-3">
              Lupa Kata Sandi?
            </h2>
            <p className="text-[#557865] text-[14.5px] leading-relaxed">
              Silakan masukkan alamat email yang terdaftar. Kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-[13.5px] font-bold text-[#2d4638]">
                  Alamat Email Terdaftar
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ab0a3] group-focus-within:text-[#14CC99] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@dlhbanyumas.go.id"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border border-[#dce6e0] rounded-xl text-[#1a2b22] placeholder:text-[#9ab0a3] focus:outline-none focus:border-[#14CC99] focus:ring-[3px] focus:ring-[#14CC99]/20 transition-all text-[14.5px]"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-300 bg-[#14CC99] hover:bg-[#11b386] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-80 shadow-lg shadow-[#14CC99]/30 hover:shadow-[#14CC99]/40"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Tautan Reset</span>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-[#14CC99]/10 border border-[#14CC99]/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-[#14CC99]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#14CC99]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2b22] mb-2">Tautan Terkirim!</h3>
              <p className="text-[#557865] text-sm mb-6">
                Silakan periksa kotak masuk email Anda (<strong>{email}</strong>) untuk instruksi pengaturan ulang kata sandi. Jangan lupa cek folder spam jika tidak menemukannya.
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-300 bg-[#14CC99] hover:bg-[#11b386] shadow-md shadow-[#14CC99]/20"
              >
                Kembali ke Halaman Masuk
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-[#f0f5f2] text-center">
            <p className="text-[12.5px] text-[#9ab0a3] font-medium">
              Butuh bantuan lebih lanjut? <a href="#" className="text-[#14CC99] hover:underline font-bold">Hubungi Administrator</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
