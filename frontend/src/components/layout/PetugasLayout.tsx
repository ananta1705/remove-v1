"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PackagePlus, User, History, Bell, LogOut, ChevronDown, CheckCircle2, AlertCircle, Wallet, Check } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useRef, useEffect } from "react";

const logoImage = "/images/logo.png";

const navItems = [
  { path: "/petugas",           label: "Dashboard",     icon: LayoutDashboard, exact: true },
  { path: "/petugas/input",     label: "Input Sampah",  icon: PackagePlus },
  { path: "/petugas/profil",    label: "Profil",        icon: User },
  { path: "/petugas/riwayat",   label: "Riwayat Input", icon: History },
  { path: "/petugas/notifikasi",label: "Notifikasi",    icon: Bell },
];

export function PetugasLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string, exact?: boolean) =>
    exact ? pathname === path : pathname === path || pathname.startsWith(path + "/");

  const currentLabel = [...navItems].reverse().find((n) => isActive(n.path, n.exact))?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-teal-50/20 to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0F172A] flex flex-col flex-shrink-0 relative overflow-hidden z-20 shadow-2xl">
        {/* Glow effect top left */}
        <div className="absolute top-0 left-0 w-full h-32 bg-[#14CC99]/10 blur-[50px] pointer-events-none" />

        {/* Logo Area */}
        <div className="px-6 py-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl relative flex-shrink-0 flex items-center justify-center">
              <img
                src={logoImage}
                alt="ReMove"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <p className="text-white text-[15px] font-extrabold leading-tight tracking-wide">ReMove</p>
              <p className="text-[#14CC99] text-[11px] font-semibold tracking-wider uppercase mt-0.5">Portal Petugas</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto relative z-10">
          <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Menu Utama</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-[13.5px] transition-all duration-300 group relative overflow-hidden ${
                  active
                    ? "text-white font-bold"
                    : "text-slate-400 hover:text-white font-medium"
                }`}
              >
                {/* Active Background Glow */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#14CC99]/20 to-transparent border-l-4 border-[#14CC99]" />
                )}
                {/* Hover Background */}
                {!active && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 relative z-10 ${active ? "text-[#14CC99]" : "group-hover:text-[#14CC99]"}`} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Topbar */}
        <header className="h-[72px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-30 transition-all">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-gray-800 dark:text-white tracking-tight">{currentLabel}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Notification Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 text-gray-500 hover:text-[#14CC99] hover:bg-[#14CC99]/10 rounded-xl transition-all duration-300 group focus:outline-none"
              >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-[340px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Notifikasi</h3>
                      <p className="text-[11px] font-medium text-gray-500 mt-0.5">3 pesan baru belum dibaca</p>
                    </div>
                    <button className="text-[#14CC99] hover:text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Tandai Dibaca
                    </button>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    
                    {/* Item 1: Verified */}
                    <div className="p-4 border-b border-gray-100 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 cursor-pointer group">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug">Laporan #TRX-992 Diverifikasi</p>
                        <p className="text-xs text-gray-500 mt-1">Laporan input sampah kardus Anda telah disetujui oleh Admin (Bpk. Joko).</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-2">15 menit yang lalu</p>
                      </div>
                    </div>

                    {/* Item 2: Rejected */}
                    <div className="p-4 border-b border-gray-100 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 cursor-pointer group bg-red-50/30 dark:bg-red-900/10">
                      <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-red-600 dark:text-red-400 leading-snug">Laporan #TRX-993 Ditolak</p>
                        <p className="text-xs text-gray-500 mt-1">Laporan input Anda ditolak. Alasan: "Bukti foto resi timbangan buram/tidak terbaca."</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-2">1 jam yang lalu</p>
                      </div>
                    </div>

                    {/* Item 3: Payment */}
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 cursor-pointer group">
                      <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Wallet className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug">Pembayaran Berhasil</p>
                        <p className="text-xs text-gray-500 mt-1">Dana insentif untuk 40 laporan operasional minggu ini telah ditransfer ke rekening Anda.</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-2">Kemarin, 14:30 WIB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                    <button className="w-full py-2 text-xs font-bold text-gray-600 dark:text-slate-300 hover:text-[#14CC99] transition-colors">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#14CC99] to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#14CC99]/20">
                  AF
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-700 dark:text-white leading-tight">Ahmad Fauzi</p>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500">Petugas Timbang</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="p-4 border-b border-gray-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Ahmad Fauzi</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 truncate">petugas@remove.com</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => { setIsProfileOpen(false); router.push("/petugas/profil"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-[#14CC99] hover:bg-[#14CC99]/10 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" /> Profil Petugas
                    </button>
                    <button 
                      onClick={() => { setIsProfileOpen(false); router.push("/"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Keluar Sistem
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6 md:p-8 w-full min-h-full">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
