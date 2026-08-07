"use client";

import { useRouter } from "next/navigation";
import { 
  Trash2, MapPin, Users, DollarSign, 
  Plus, History, User, Bell,
  CheckCircle2, Clock, Search,
  ChevronRight, ArrowRight,
  TrendingUp, TrendingDown,
  ChevronLeft, MoreHorizontal
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";

// Mock Data
const mockRecentInput = [
  { id: "TMB-1092", wkt: "10:45", nopol: "R 8922 BQ", supir: "Budi Santoso", jenis: "Sampah Murni", berat: "4.5 Ton", status: "Sudah Dibayar" },
  { id: "TMB-1091", wkt: "10:15", nopol: "R 1944 CA", supir: "Agus T.", jenis: "Residu", berat: "2.1 Ton", status: "Belum Dibayar" },
  { id: "TMB-1090", wkt: "09:30", nopol: "R 9011 AA", supir: "Hendra", jenis: "Organik", berat: "3.8 Ton", status: "Menunggu Verifikasi" },
  { id: "TMB-1089", wkt: "08:45", nopol: "R 8833 XX", supir: "Slamet", jenis: "Sampah Murni", berat: "5.2 Ton", status: "Sudah Dibayar" },
  { id: "TMB-1088", wkt: "08:10", nopol: "R 1122 ZZ", supir: "Yanto", jenis: "Sampah Murni", berat: "3.1 Ton", status: "Sudah Dibayar" },
];

const mockActivities = [
  { id: 1, wkt: "10:45", title: "Data Timbangan", msg: "Input data TMB-1092 berhasil.", icon: Plus, color: "text-[#14CC99]", bg: "bg-[#14CC99]/10" },
  { id: 2, wkt: "10:20", title: "Verifikasi QRIS", msg: "Pembayaran TMB-1089 lunas.", icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, wkt: "08:15", title: "Sistem Aktif", msg: "Shift pagi dimulai.", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
];

// Simple Animated Counter Component
const AnimatedNumber = ({ value }: { value: string }) => {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const timeout = setTimeout(() => setDisplay(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);
  return <span className="transition-all duration-1000 ease-out">{display}</span>;
};

export function DashboardPetugas() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Trigger progress animation after load
      setTimeout(() => setProgressWidth(83), 100);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }, []);

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Sudah Dibayar": return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Menunggu Verifikasi": return "bg-amber-50 text-amber-700 border-amber-200/60";
      default: return "bg-rose-50 text-rose-700 border-rose-200/60";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse w-full max-w-full">
        {/* Skeleton Hero */}
        <div className="h-32 bg-gray-100 dark:bg-slate-800 rounded-3xl" />
        {/* Skeleton Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-slate-800 rounded-2xl" />)}
        </div>
        {/* Skeleton Progress */}
        <div className="h-14 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[1,2,3,4].map(i => <div key={i} className="h-36 bg-gray-100 dark:bg-slate-800 rounded-3xl" />)}
        </div>
        {/* Skeleton Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-100 dark:bg-slate-800 rounded-3xl" />
          <div className="h-96 bg-gray-100 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out w-full max-w-full font-sans text-gray-900 dark:text-slate-100">
      
      {/* 1. HERO SECTION (SaaS Premium Style) */}
      <div className="relative bg-[#14CC99] overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgb(20,204,153,0.15)] flex flex-col md:flex-row justify-between items-start md:items-center p-8 lg:px-10 lg:py-8 gap-6 group">
        
        {/* Abstract Backgrounds & Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[200%] bg-gradient-to-l from-white/20 to-transparent rotate-12 transform origin-center transition-transform duration-1000 group-hover:rotate-6" />
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-[-20%] right-[10%] w-80 h-80 bg-[#0ea97d]/30 rounded-full blur-3xl mix-blend-multiply" />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-50" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/20 mb-4 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wide uppercase">{today}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
            Selamat Datang, Ahmad Fauzi 👋
          </h1>
          <p className="text-[15px] text-white/90 font-medium leading-relaxed max-w-lg">
            Semangat bekerja! Pastikan semua data kendaraan diinput akurat ke dalam sistem hari ini.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => router.push("/petugas/riwayat")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
          >
            <History className="w-4 h-4" />
            Riwayat
          </button>
          <button 
            onClick={() => router.push("/petugas/input")}
            className="flex items-center justify-center gap-2 px-7 py-3 bg-white text-[#14CC99] font-extrabold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/5"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            Input Data Sampah
          </button>
        </div>
      </div>



      {/* 3. DAILY PROGRESS */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-gray-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/20 rounded-full blur-2xl opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex-shrink-0">
          <h3 className="text-[15px] font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Target Operasional Harian <TrendingUp className="w-4 h-4 text-blue-500" />
          </h3>
          <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">
            25 dari 30 kendaraan telah diinput
          </p>
        </div>
        
        <div className="relative z-10 flex-1 flex items-center gap-4">
          <div className="flex-1 h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-[#14CC99] rounded-full relative transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%' }} />
            </div>
          </div>
          <span className="text-[15px] font-extrabold text-gray-900 dark:text-white flex-shrink-0 w-12 text-right">
            <AnimatedNumber value="83%" />
          </span>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[156px] relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent dark:from-emerald-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <p className="text-[13px] font-bold text-gray-500 dark:text-slate-400">Total Kendaraan</p>
            <div className="w-10 h-10 rounded-[14px] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1"><AnimatedNumber value="42" /></h3>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-[12px] font-bold text-emerald-600">+12% dari kemarin</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[156px] relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-[#14CC99]/10 to-transparent dark:from-[#14CC99]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <p className="text-[13px] font-bold text-gray-500 dark:text-slate-400">Total Berat Sampah</p>
            <div className="w-10 h-10 rounded-[14px] bg-[#14CC99]/10 flex items-center justify-center text-[#14CC99] group-hover:scale-110 group-hover:bg-[#14CC99] group-hover:text-white transition-all">
              <Trash2 className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1 flex items-baseline gap-1">
              <AnimatedNumber value="15.8" /> <span className="text-[15px] font-semibold text-gray-400">Ton</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
              <p className="text-[12px] font-bold text-gray-500">-2% (16.1 Ton)</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[156px] relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <p className="text-[13px] font-bold text-gray-500 dark:text-slate-400">UPKP Aktif</p>
            <div className="w-10 h-10 rounded-[14px] bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1"><AnimatedNumber value="16" /></h3>
            <p className="text-[12px] font-bold text-gray-500">Institusi & Layanan</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[156px] relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-amber-50 to-transparent dark:from-amber-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <p className="text-[13px] font-bold text-gray-500 dark:text-slate-400">Retribusi (Bulan Ini)</p>
            <div className="w-10 h-10 rounded-[14px] bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1 flex items-baseline gap-1">
              <span className="text-xl">Rp</span> <AnimatedNumber value="12.4" /> <span className="text-[15px] font-semibold text-gray-400">Jt</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-[12px] font-bold text-emerald-600">80% Tercapai</p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* 5. LATEST INPUT TABLE (SaaS Polished) */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden h-[500px]">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 bg-white dark:bg-slate-900 z-10 relative">
            <div>
              <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight">Input Terakhir</h2>
              <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">Data penimbangan terbaru di jembatan timbang.</p>
            </div>
            <button 
              onClick={() => router.push("/petugas/riwayat")}
              className="px-4 py-2 text-[13px] font-bold text-[#14CC99] hover:text-white bg-[#14CC99]/10 hover:bg-[#14CC99] rounded-xl transition-all flex items-center gap-1.5 w-fit focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 shadow-sm"
            >
              Lihat Riwayat Lengkap <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-x-auto relative">
            {mockRecentInput.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                 <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                   <Search className="w-8 h-8 text-gray-300" />
                 </div>
                 <p className="font-bold text-gray-900 dark:text-white">Belum ada input hari ini</p>
                 <p className="text-[13px] text-gray-500 mt-1">Data yang diinput akan muncul di sini.</p>
               </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="sticky top-0 bg-gray-50/95 dark:bg-slate-800/95 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-24">Waktu</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">No. Kendaraan</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Jenis & Berat</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
                  {mockRecentInput.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[13px] font-bold text-gray-500 dark:text-slate-400">{row.wkt}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-extrabold text-gray-900 dark:text-white tracking-tight">{row.nopol}</span>
                          <span className="text-[12px] font-medium text-gray-500 mt-0.5">{row.supir}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-gray-700 dark:text-slate-300">{row.jenis}</span>
                          <span className="text-[12px] font-extrabold text-[#14CC99] mt-0.5">{row.berat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-md border ${getBadgeStyle(row.status)} shadow-sm`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex items-center justify-between flex-shrink-0">
            <span className="text-[12px] font-medium text-gray-500">Menampilkan 5 data terbaru</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        
        {/* 6. RECENT ACTIVITIES PANEL */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 flex flex-col h-[500px]">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
            <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight">Aktivitas Sistem</h2>
            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            {mockActivities.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center">
                 <p className="text-[13px] text-gray-500">Tidak ada log aktivitas.</p>
               </div>
            ) : (
              <div className="space-y-6">
                {mockActivities.map((act, idx) => (
                  <div key={act.id} className="flex gap-4 relative group">
                    {/* Vertical Line */}
                    {idx !== mockActivities.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-24px] w-[2px] bg-gray-100 dark:bg-slate-800 transition-colors" />
                    )}
                    
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center z-10 flex-shrink-0 ${act.bg} shadow-sm group-hover:scale-110 transition-transform`}>
                      <act.icon className={`w-[18px] h-[18px] ${act.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white">{act.title}</p>
                        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">{act.wkt}</span>
                      </div>
                      <p className="text-[13px] font-medium text-gray-500 dark:text-slate-400 leading-relaxed">{act.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
