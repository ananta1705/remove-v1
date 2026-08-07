"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Trash2, Truck, Users, DollarSign, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const weeklyTrend = [
  { day: "Sen", organik: 320, anorganik: 180 },
  { day: "Sel", organik: 410, anorganik: 220 },
  { day: "Rab", organik: 480, anorganik: 260 },
  { day: "Kam", organik: 390, anorganik: 200 },
  { day: "Jum", organik: 520, anorganik: 290 },
  { day: "Sab", organik: 460, anorganik: 240 },
  { day: "Min", organik: 350, anorganik: 160 },
];

const distribusiData = [
  { name: "Sampah Murni", value: 35, color: "#16a34a" },
  { name: "Sampah Organik", value: 30, color: "#14CC99" },
  { name: "Sampah Anorganik", value: 20, color: "#3b82f6" },
  { name: "Bahan RDF", value: 10, color: "#f59e0b" },
  { name: "Residu", value: 5, color: "#ef4444" },
];

const breakdownData = [
  { id: 1, name: "Sampah Murni", value: 150, fill: "#15803d" },
  { id: 2, name: "Sampah Liar", value: 175, fill: "#4ade80" },
  { id: 3, name: "Bahan RDF", value: 175, fill: "#a7f3d0" },
  { id: 4, name: "Residu", value: 195, fill: "#14b8a6" },
  { id: 5, name: "Bursam", value: 195, fill: "#0f766e" },
  { id: 6, name: "Midle tossa", value: 230, fill: "#10b981" },
  { id: 7, name: "Rdf to sbi", value: 230, fill: "#22c55e" },
  { id: 8, name: "Midle tossa", value: 280, fill: "#14b8a6" },
  { id: 9, name: "Residu", value: 250, fill: "#15803d" },
  { id: 10, name: "Sampah Liar", value: 200, fill: "#4ade80" },
  { id: 11, name: "Sampah Murni", value: 170, fill: "#15803d" },
];

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const words = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="#9ca3af" fontSize={10}>
        <tspan x="0" dy="0">{words[0]}</tspan>
        {words.length > 1 && <tspan x="0" dy="12">{words.slice(1).join(" ")}</tspan>}
      </text>
    </g>
  );
};

const aktivitas = [
  { no: 1, sopir: "Ananta", avatar: "AN", color: "bg-[#14CC99]", tanggal: "21 Mar 2024\n08:00 AM", keterangan: "Belum Mulai", qris: "Rp 2.000 Kg", berat: "status" },
  { no: 2, sopir: "Puti", avatar: "PU", color: "bg-blue-500", tanggal: "21 Mar 2024\n09:00 AM", keterangan: "Menunggu", qris: "Rp 2.000 Kg", berat: "Diproses" },
  { no: 3, sopir: "Maharani", avatar: "MH", color: "bg-purple-500", tanggal: "21 Mar 2024\n10:00 AM", keterangan: "Di Jalan", qris: "Rp 2.500 Kg", berat: "Proses" },
  { no: 4, sopir: "Mahananta", avatar: "MN", color: "bg-pink-500", tanggal: "21 Mar 2024\n11:00 AM", keterangan: "Di Jalan", qris: "Rp 2.200 Kg", berat: "Selesai" },
  { no: 5, sopir: "Ananta Puti", avatar: "AP", color: "bg-amber-500", tanggal: "21 Mar 2024\n12:00 AM", keterangan: "Pending", qris: "Rp 2.100 Kg", berat: "Pending" },
];

const statusColor: Record<string, string> = {
  "Belum Mulai": "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300",
  "Menunggu": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Di Jalan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Selesai": "bg-[#14CC99]/15 text-[#14CC99]",
  "Pending": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Diproses": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Proses": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "status": "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">{label}</p>
      {payload.map((p: any, idx: number) => {
        const color = p.color || p.payload?.fill || "#14CC99";
        const displayName = p.name === "value" ? label : p.name;
        return (
          <p key={idx} className="flex items-center gap-2" style={{ color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
            {displayName}: {p.value} ton
          </p>
        );
      })}
    </div>
  );
};

export function DashboardAdmin() {
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }, []);

  return (
    <div className="space-y-5">
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
            Selamat Datang, Admin 👋
          </h1>
          <p className="text-[15px] text-white/90 font-medium leading-relaxed max-w-lg">
            Semangat bekerja! Pastikan semua data kendaraan diinput akurat ke dalam sistem hari ini.
          </p>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: "Total Sampah Mingguan", value: "2850 Ton", sub: "+5% dari minggu lalu", icon: Trash2, iconBg: "bg-emerald-50 dark:bg-emerald-500/10", iconColor: "text-emerald-600", trendIcon: TrendingUp, trendColor: "text-emerald-500", glow: "from-emerald-50 dark:from-emerald-900/10" },
          { label: "Total Kendaraan Aktual", value: "10 Truk", sub: "8 aktif · 2 maintenance", icon: Truck, iconBg: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-600", trendIcon: TrendingUp, trendColor: "text-blue-500", glow: "from-blue-50 dark:from-blue-900/10" },
          { label: "Total Petugas Aktif", value: "16 Orang", sub: "Semua terjadwal", icon: Users, iconBg: "bg-amber-50 dark:bg-amber-500/10", iconColor: "text-amber-600", trendIcon: TrendingUp, trendColor: "text-emerald-500", glow: "from-amber-50 dark:from-amber-900/10" },
          { label: "Retribusi Bulan Ini", value: "Rp 12.4 Jt", sub: "+28% dari bulan lalu", icon: DollarSign, iconBg: "bg-[#14CC99]/10 dark:bg-[#14CC99]/5", iconColor: "text-[#14CC99]", trendIcon: TrendingUp, trendColor: "text-emerald-500", glow: "from-[#14CC99]/10 dark:from-[#14CC99]/5" },
        ].map((card, idx) => {
          const Icon = card.icon;
          const TrendIcon = card.trendIcon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[156px] relative overflow-hidden group">
              <div className={`absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl ${card.glow} to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="flex justify-between items-start relative z-10">
                <p className="text-[13px] font-bold text-gray-500 dark:text-slate-400">{card.label}</p>
                <div className={`w-10 h-10 rounded-[14px] ${card.iconBg} flex items-center justify-center ${card.iconColor} group-hover:scale-110 group-hover:bg-[#14CC99] group-hover:text-white transition-all`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">{card.value}</h3>
                <div className="flex items-center gap-1.5">
                  <TrendIcon className={`w-3.5 h-3.5 ${card.trendColor}`} />
                  <p className={`text-[12px] font-bold ${card.trendColor}`}>{card.sub}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        {/* Donut Chart */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50 dark:border-slate-700/50 flex flex-col h-full">
          <h3 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Distribusi Jenis Sampah</h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mb-6">Persentase hari ini</p>

          <div className="relative flex-1 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distribusiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {distribusiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-base font-bold text-gray-800 dark:text-slate-100">Total</p>
                <p className="text-xs font-bold text-gray-700 dark:text-slate-200 mt-0.5">120.74</p>
                <p className="text-[10px] font-bold text-gray-500 dark:text-slate-400 mt-0.5">TON</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {distribusiData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="text-gray-500 dark:text-slate-400">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50 dark:border-slate-700/50 relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-slate-100">Tren Sampah Mingguan</h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Breakdown organik vs anorganik</p>
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-[#14CC99]/10 dark:bg-[#14CC99]/15 text-[#14CC99] text-xs font-semibold hover:bg-[#14CC99]/20 transition-colors">
              7 Hari
            </button>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={breakdownData} margin={{ top: 10, right: 10, bottom: 20, left: -20 }} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.15} vertical={false} />
              <XAxis dataKey="name" tick={<CustomXAxisTick />} axisLine={false} tickLine={false} interval={0} />
              <YAxis ticks={[0, 65, 130, 195, 260]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(20,204,153,0.05)" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {breakdownData.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-md border border-white/50 dark:border-slate-700/50">
        <div className="px-6 py-4 border-b border-gray-100/60 dark:border-slate-700/50">
          <h3 className="font-semibold text-gray-800 dark:text-slate-100">Aktivitas Terbaru</h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Daftar aktivitas pengangkutan sampah hari ini</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100/60 dark:border-slate-700/50">
                {["Nomor", "Sopir", "Tanggal", "Keterangan", "QRIS", "Berat"].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs text-gray-400 dark:text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/30">
              {aktivitas.map(row => (
                <tr key={row.no} className="hover:bg-white/60 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3.5 text-gray-500 dark:text-slate-400 text-xs font-medium">{row.no}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 ${row.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{row.avatar}</span>
                      </div>
                      <span className="text-gray-700 dark:text-slate-200 font-medium text-xs">{row.sopir}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 dark:text-slate-400 text-xs whitespace-pre-line leading-relaxed">{row.tanggal}</td>
                  <td className="px-6 py-3.5 text-gray-600 dark:text-slate-300 text-xs">{row.keterangan}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-slate-200 text-xs font-medium">{row.qris}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[row.berat] ?? "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                      {row.berat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-100/60 dark:border-slate-700/50 flex items-center justify-between text-xs text-gray-400 dark:text-slate-500">
          <span>Menampilkan 1 - 5 dari 100 transaksi</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-gray-200/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors dark:text-slate-300">Sebelumnya</button>
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-[#14CC99] text-white shadow-sm shadow-[#14CC99]/30" : "bg-white/60 dark:bg-slate-700/60 border border-gray-200/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300"}`}>{p}</button>
            ))}
            <button className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-gray-200/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors dark:text-slate-300">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
