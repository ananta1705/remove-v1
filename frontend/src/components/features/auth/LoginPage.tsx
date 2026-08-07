"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  Mail, 
  Lock, 
  ArrowRight,
  Layers,
  Database,
  Truck,
  LineChart,
  Trash2,
  MapPin,
  Leaf,
  Droplet
} from "lucide-react";

export function LoginPage() {
  const router = useRouter();
  
  // State for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // State for simulation
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRedirecting(true);
      setTimeout(() => {
        // Simple mock routing based on email
        if (email.toLowerCase().includes("petugas")) {
          router.push("/petugas");
        } else {
          router.push("/admin");
        }
      }, 800);
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
          <Droplet className="absolute top-[45%] right-[10%] w-16 h-16" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 30}px)` }} />
          <Database className="absolute top-[55%] left-[30%] w-16 h-16" strokeWidth={1.5} style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }} />
        </div>

        {/* Top Header */}
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-3.5 mb-16">
            <div className="w-11 h-11 rounded-[12px] flex items-center justify-center p-2">
              <img src="/images/logo.png" alt="ReMove Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[22px] font-bold text-white tracking-tight">ReMove</span>
          </div>

          <div className="max-w-xl">
            {/* Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/25 border border-white/40 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <span className="text-[11px] font-semibold text-white tracking-widest uppercase">
                Dinas Lingkungan Hidup · Kab. Banyumas
              </span>
            </div>

            <h1 className="text-[2.75rem] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
              Kelola sampah kota,
              <span className="block text-white/90 mt-1 font-black">
                satu platform terpadu.
              </span>
            </h1>
            
            <p className="text-[1.05rem] text-white/75 mb-12 leading-[1.6] max-w-[400px]">
              ReMove menghubungkan TPS, armada, dan retribusi dalam satu sistem digital — supaya operasional pengelolaan sampah berjalan lebih rapi dan terukur.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-[500px]">
              {[
                { label: "Monitoring TPS", icon: Layers },
                { label: "Data Sampah", icon: Database },
                { label: "Retribusi Digital", icon: Truck },
                { label: "Laporan Operasional", icon: LineChart },
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 transition-all duration-300 hover:bg-white/30 hover:border-white/50 animate-fade-in-up hover:-translate-y-0.5 cursor-default group"
                  style={{ animationDelay: `${idx * 100 + 150}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center shrink-0 transition-colors">
                    <feature.icon className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-sm text-white">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Left */}
        <div className="relative z-10 text-[13px] text-white/60 font-medium">
          ReMove IWMS v1.0 <span className="mx-2">•</span> © 2026 DLH Banyumas
        </div>
      </div>

      {/* Right Section - Light Login Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#f4f9f6] p-6 sm:p-12 relative z-10">
        
        <div 
          className="w-full max-w-[440px] bg-white p-10 sm:p-12 rounded-[32px] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05)] border border-[#e8f0eb] animate-fade-in-up relative overflow-hidden"
          style={{ animationDelay: '100ms' }}
        >
          {isRedirecting && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in-up">
                <Loader2 className="w-8 h-8 text-[#14CC99] animate-spin mb-4" />
                <p className="text-sm font-medium text-[#14CC99]">Mengalihkan ke Dashboard...</p>
             </div>
          )}

          {/* Top Logo in Card */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center p-2">
                 <img src="/images/logo.png" alt="ReMove Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-[#1a2b22] tracking-tight">ReMove</span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-[26px] font-bold text-[#1a2b22] mb-3 tracking-tight">Selamat datang kembali</h2>
            <p className="text-[14.5px] text-[#6b8577] leading-relaxed">
              Masuk menggunakan akun yang telah diberikan oleh admin untuk mengakses sistem.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-[13.5px] font-bold text-[#2d4638]">
                Alamat email
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
                  disabled={isLoading || isRedirecting}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-[13.5px] font-bold text-[#2d4638]">
                Kata sandi
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ab0a3] group-focus-within:text-[#14CC99] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-11 pr-11 py-3.5 bg-transparent border border-[#dce6e0] rounded-xl text-[#1a2b22] placeholder:text-[#9ab0a3] focus:outline-none focus:border-[#14CC99] focus:ring-[3px] focus:ring-[#14CC99]/20 transition-all text-[14.5px]"
                  disabled={isLoading || isRedirecting}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ab0a3] hover:text-[#14CC99] transition-colors focus:outline-none"
                  disabled={isLoading || isRedirecting}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-1 pb-3">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 appearance-none border border-[#c4d4ca] rounded-[4px] checked:bg-[#14CC99] checked:border-[#14CC99] transition-colors cursor-pointer"
                  />
                  {rememberMe && <div className="absolute w-2 h-2 bg-white rounded-sm pointer-events-none" />}
                </div>
                <span className="text-[13.5px] text-[#557865] group-hover:text-[#14CC99] transition-colors select-none">
                  Ingat saya
                </span>
              </label>
              
              <button 
                type="button" 
                onClick={() => router.push('/lupa-sandi')}
                className="text-[13.5px] font-bold text-[#14CC99] border-b-2 border-[#14CC99] hover:opacity-80 transition-opacity pb-0.5"
              >
                Lupa kata sandi?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isRedirecting}
              className="w-full py-3.5 rounded-xl text-white font-bold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-300 bg-[#14CC99] hover:bg-[#11b386] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-80 shadow-lg shadow-[#14CC99]/30 hover:shadow-[#14CC99]/40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke sistem</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10">
             <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#e2ebe5]"></div>
                <span className="flex-shrink-0 mx-4 text-[#8ba395] text-[11px] font-medium tracking-wide">
                  akses khusus internal
                </span>
                <div className="flex-grow border-t border-[#e2ebe5]"></div>
             </div>
             
             <div className="text-center text-[10px] text-[#9ab0a3] leading-[1.6] mt-4 font-medium">
                <p>ReMove — Integrated Waste Management System · Versi 1.0</p>
                <p>© 2026 Dinas Lingkungan Hidup Kabupaten Banyumas</p>
             </div>
          </div>
        </div>
        
        {/* Mobile footer watermark */}
        <div className="lg:hidden absolute bottom-6 text-[#9ab0a3] text-xs font-bold flex items-center gap-2 opacity-50">
          <Layers className="w-4 h-4" />
          <span>ReMove</span>
        </div>
      </div>
    </div>
  );
}
