"use client";

import { X, MapPin, BarChart2, FileText, Clock, User, CheckCircle2 } from "lucide-react";

interface DetailTPSModalProps {
  isOpen: boolean;
  onClose: () => void;
  tpsData: any;
}

export function DetailTPSModal({ isOpen, onClose, tpsData }: DetailTPSModalProps) {
  if (!isOpen || !tpsData) return null;

  const rawTransactions: any[] = tpsData.transactions || [];

  // Calculate waste category breakdown dynamically based on SDD Categories
  const categoryColors: Record<string, string> = {
    "Sampah Murni": "bg-emerald-500",
    "Sampah Organik": "bg-[#14CC99]",
    "Sampah Anorganik": "bg-blue-500",
    "Residu": "bg-red-500",
    "Bahan RDF": "bg-amber-500",
  };

  const totalKg = rawTransactions.reduce((acc, curr) => acc + (curr.weightKg || 0), 0);

  const categoryMap: Record<string, number> = {
    "Sampah Murni": 0,
    "Sampah Organik": 0,
    "Sampah Anorganik": 0,
    "Residu": 0,
    "Bahan RDF": 0,
  };

  rawTransactions.forEach(t => {
    if (categoryMap[t.jenisSampah] !== undefined) {
      categoryMap[t.jenisSampah] += t.weightKg || 0;
    } else {
      categoryMap["Sampah Murni"] += t.weightKg || 0;
    }
  });

  const compositions = Object.keys(categoryMap).map(cat => {
    const weightVal = categoryMap[cat];
    const percentage = totalKg > 0 ? Math.round((weightVal / totalKg) * 100) : 0;
    return {
      label: cat,
      percentage,
      color: categoryColors[cat] || "bg-gray-400",
      weight: `${(weightVal / 1000).toFixed(2)} Ton`
    };
  }).filter(c => totalKg === 0 || c.percentage > 0);

  return (
    <div className="fixed inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Riwayat Operasional TPS</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Detail aktivitas dan data masuk berdasarkan transaksi setoran</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-4 h-4 text-gray-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* TPS Info Card */}
          <div className="bg-[#14CC99]/5 dark:bg-[#14CC99]/10 rounded-xl p-5 border border-[#14CC99]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{tpsData.name}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#14CC99]" /> {tpsData.upkp}
                </span>
                <span className="text-gray-500 dark:text-slate-400">{tpsData.address}</span>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto ${
              tpsData.statusAktivitas === "Ada Aktivitas"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400"
            }`}>
              {tpsData.statusAktivitas || "Ada Aktivitas"}
            </span>
          </div>

          {/* Operational Summary */}
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Ringkasan Operasional</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm">
                 <div className="flex items-center gap-2 mb-2">
                   <FileText className="w-4 h-4 text-purple-500" />
                   <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Total Transaksi</p>
                 </div>
                 <p className="text-xl font-bold text-gray-900 dark:text-white">{(tpsData.totalTransactions || 0).toLocaleString('id-ID')}</p>
               </div>
               <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm">
                 <div className="flex items-center gap-2 mb-2">
                   <BarChart2 className="w-4 h-4 text-blue-500" />
                   <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Total Volume Sampah</p>
                 </div>
                 <p className="text-xl font-bold text-gray-900 dark:text-white">{tpsData.totalVolume || 0} <span className="text-sm font-medium text-gray-500">Ton</span></p>
               </div>
               <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm">
                 <div className="flex items-center gap-2 mb-2">
                   <Clock className="w-4 h-4 text-orange-500" />
                   <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Aktivitas Terakhir</p>
                 </div>
                 <p className="text-sm font-bold text-gray-900 dark:text-white">{tpsData.lastActivity || "-"}</p>
               </div>
            </div>
          </div>

          {/* Waste Composition */}
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Komposisi Sampah Masuk (Kategori SDD)</h5>
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-xl shadow-sm">
              <div className="h-3 w-full bg-gray-100 dark:bg-slate-700 rounded-full flex overflow-hidden mb-6">
                 {compositions.map((comp) => (
                   <div key={comp.label} className={`h-full ${comp.color}`} style={{ width: `${comp.percentage}%` }} title={`${comp.label}: ${comp.percentage}%`} />
                 ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {compositions.map((comp) => (
                  <div key={comp.label}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${comp.color}`} />
                      <span className="text-xs font-medium text-gray-600 dark:text-slate-300">{comp.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">{comp.percentage}%</span>
                      <span className="text-xs text-gray-500">({comp.weight})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Riwayat Setoran Terbaru</h5>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700">
                      <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-slate-400">ID Tiket / Tanggal</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Jenis Sampah</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Berat Netto</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Petugas Input</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {rawTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs text-gray-500 dark:text-slate-400">
                          Belum ada catatan aktivitas transaksi setoran untuk TPS ini.
                        </td>
                      </tr>
                    ) : (
                      rawTransactions.map((act: any) => (
                        <tr key={act.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-slate-200">
                            <div className="font-mono text-xs font-bold text-gray-900 dark:text-white">{act.id}</div>
                            <div className="text-xs text-gray-500">{act.date}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300">
                              {act.jenisSampah}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-bold text-[#14CC99]">{act.weightKg} Kg</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-300">
                              <User className="w-3.5 h-3.5 text-gray-400" /> {act.petugas}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14CC99]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {act.status || "Selesai"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
