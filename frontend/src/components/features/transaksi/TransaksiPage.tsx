"use client";

import { useState } from "react";
import { 
  Search, Download, ChevronDown, Calendar, FileText, 
  CheckCircle, Clock, XCircle, Info, FileSpreadsheet, 
  RefreshCcw, AlertCircle, X, Loader2, CheckCircle2,
  Wallet, DollarSign, Activity, FileCheck
} from "lucide-react";

// Mock Data
const mockTransactions = [
  { id: "TRX-2026-0998", ksm: "UPKP Pusat", jenis: "Residu", jumlah: "12 Kg", total: "Rp 1.800.000", bayar: "QRIS", tgl: "18 Jul 2026", status: "Berhasil" },
  { id: "TRX-2026-0986", ksm: "UPKP Utara", jenis: "Sampah Organik", jumlah: "8 Kg", total: "Rp 1.200.000", bayar: "Kode Billing", tgl: "18 Jul 2026", status: "Pending" },
  { id: "TRX-2026-0987", ksm: "UPKP Selatan", jenis: "Sampah Murni", jumlah: "15 Kg", total: "Rp 2.250.000", bayar: "Kode Billing", tgl: "17 Jul 2026", status: "Gagal" },
  { id: "TRX-2026-0988", ksm: "UPKP Barat", jenis: "Sampah Anorganik", jumlah: "5 Kg", total: "Rp 750.000", bayar: "QRIS", tgl: "17 Jul 2026", status: "Berhasil" },
  { id: "TRX-2026-0989", ksm: "UPKP Timur", jenis: "Sampah Murni", jumlah: "20 Kg", total: "Rp 3.000.000", bayar: "Kode Billing", tgl: "16 Jul 2026", status: "Pending" },
];

export function TransaksiPage() {
  // Filter States
  const [search, setSearch] = useState("");
  const [filterKSM, setFilterKSM] = useState("Semua KSM");
  const [filterJenis, setFilterJenis] = useState("Semua Jenis Sampah");
  const [filterTanggal, setFilterTanggal] = useState("");
  
  // Local active filters (applied when button is clicked)
  const [activeSearch, setActiveSearch] = useState("");
  const [activeKSM, setActiveKSM] = useState("Semua KSM");
  const [activeJenis, setActiveJenis] = useState("Semua Jenis Sampah");

  // Modal States
  const [modalType, setModalType] = useState<"NONE" | "DETAIL" | "EXPORT" | "LOADING" | "SUCCESS">("NONE");
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [exportType, setExportType] = useState<"PDF" | "EXCEL">("PDF");

  const handleApplyFilter = () => {
    setActiveSearch(search);
    setActiveKSM(filterKSM);
    setActiveJenis(filterJenis);
  };

  const handleResetFilter = () => {
    setSearch("");
    setFilterKSM("Semua KSM");
    setFilterJenis("Semua Jenis Sampah");
    setFilterTanggal("");
    setActiveSearch("");
    setActiveKSM("Semua KSM");
    setActiveJenis("Semua Jenis Sampah");
  };

  const filtered = mockTransactions.filter(t => {
    if (activeSearch && !t.id.toLowerCase().includes(activeSearch.toLowerCase()) && !t.ksm.toLowerCase().includes(activeSearch.toLowerCase())) return false;
    if (activeKSM !== "Semua KSM" && t.ksm !== activeKSM) return false;
    if (activeJenis !== "Semua Jenis Sampah" && t.jenis !== activeJenis) return false;
    return true;
  });

  const openExportModal = (type: "PDF" | "EXCEL") => {
    setExportType(type);
    setModalType("EXPORT");
  };

  const handleSimulateExport = () => {
    setModalType("LOADING");
    setTimeout(() => {
      setModalType("SUCCESS");
      setTimeout(() => {
        setModalType("NONE");
        window.open(exportType === "PDF" ? "/admin/transaksi/preview-pdf" : "/admin/transaksi/preview-excel", "_blank");
      }, 1500);
    }, 2000);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case "Berhasil": return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", icon: CheckCircle2 };
      case "Pending": return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: Clock };
      default: return { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", icon: XCircle };
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan Transaksi</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Monitoring dan pengelolaan seluruh transaksi retribusi sampah.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => openExportModal("PDF")} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-gray-100 dark:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700">
            <FileText className="w-4 h-4 text-red-500" /> Export PDF
          </button>
          <button onClick={() => openExportModal("EXCEL")} className="flex items-center gap-2 px-4 py-2.5 bg-[#10b981] text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20">
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Pemasukan", value: "Rp 124.5M", desc: "Dari 8,420 transaksi", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Transaksi", value: "8,420", desc: "Periode bulan ini", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Belum Terbayar", value: "Rp 12.8M", desc: "Dari 145 pending", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Transaksi Berhasil", value: "98.2%", desc: "Tingkat kesuksesan", icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{card.label}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Penyaringan Data</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-[2]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari ID Transaksi..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="relative flex-1">
            <select value={filterKSM} onChange={e => setFilterKSM(e.target.value)} className="w-full pl-4 pr-9 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer font-medium text-gray-600 dark:text-slate-300">
              <option>Semua KSM</option><option>UPKP Pusat</option><option>UPKP Utara</option><option>UPKP Selatan</option><option>UPKP Barat</option><option>UPKP Timur</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} className="w-full pl-4 pr-9 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer font-medium text-gray-600 dark:text-slate-300">
              <option>Semua Jenis Sampah</option><option>Sampah Murni</option><option>Sampah Organik</option><option>Sampah Anorganik</option><option>Residu</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="date" value={filterTanggal} onChange={e => setFilterTanggal(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all font-medium text-gray-600 dark:text-slate-300"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleApplyFilter} className="px-5 py-2.5 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20 text-sm whitespace-nowrap">
              Terapkan
            </button>
            <button onClick={handleResetFilter} className="p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-gray-200 dark:border-slate-700" title="Reset Filter">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Data Tidak Ditemukan</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mb-6">Belum ada data transaksi pada periode yang dipilih atau filter tidak cocok.</p>
            <button onClick={handleResetFilter} className="px-6 py-2.5 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20 text-sm">
              Kembalikan Filter
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">ID Transaksi</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">UPKP / KSM</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Jenis Sampah</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Jumlah Setoran</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Total Pembayaran</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Metode</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Tanggal</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(tx => {
                    const style = getStatusStyle(tx.status);
                    const StatusIcon = style.icon;
                    return (
                      <tr 
                        key={tx.id} 
                        onClick={() => { setSelectedTx(tx); setModalType("DETAIL"); }}
                        className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-700 dark:text-slate-200">{tx.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{tx.ksm}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{tx.jenis}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 font-medium">{tx.jumlah}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#10b981]">{tx.total}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 px-2.5 py-1 rounded-md">{tx.bayar}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-slate-400">{tx.tgl}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 w-fit text-[10px] font-bold px-2.5 py-1 rounded-lg border ${style.bg} ${style.text} ${style.border}`}>
                            <StatusIcon className="w-3 h-3" /> {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 text-xs text-gray-400">
              <span>Menampilkan {filtered.length} transaksi terbaru</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:bg-slate-800 font-medium text-gray-600 dark:text-slate-300 transition-colors">Sebelumnya</button>
                <button className="w-8 h-8 rounded-lg font-bold bg-[#10b981] text-white transition-colors">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:bg-slate-800 font-medium text-gray-600 dark:text-slate-300 transition-colors">Berikutnya</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ALL MODALS */}

      {/* 1. Modal Detail Transaksi */}
      {modalType === "DETAIL" && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModalType("NONE")}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalType("NONE")} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
            
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-slate-800">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rincian Transaksi</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{selectedTx.tgl}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">ID Transaksi</span>
                <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{selectedTx.id}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">UPKP / KSM</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedTx.ksm}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Jenis Sampah</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTx.jenis}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Jumlah Setoran (Netto)</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedTx.jumlah}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Metode Pembayaran</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTx.bayar}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Referensi / Kode Bayar</span>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedTx.bayar === "QRIS" ? "NMID-89230491-QRIS" : "VA-9880-0192-3849"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Status Pembayaran</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border ${getStatusStyle(selectedTx.status).bg} ${getStatusStyle(selectedTx.status).text} ${getStatusStyle(selectedTx.status).border}`}>
                  {selectedTx.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total Pembayaran</span>
                <span className="text-2xl font-black text-[#10b981]">{selectedTx.total}</span>
              </div>
            </div>

            <button onClick={() => setModalType("NONE")} className="w-full py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-200 transition-colors">Tutup</button>
          </div>
        </div>
      )}

      {/* 2. Modal Konfirmasi Export */}
      {modalType === "EXPORT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModalType("NONE")}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${exportType === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
              {exportType === "PDF" ? <FileText className="w-8 h-8" /> : <FileSpreadsheet className="w-8 h-8" />}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Export {exportType}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
              Apakah Anda ingin mengunduh laporan transaksi dalam format {exportType}?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleSimulateExport} 
                className={`flex-1 py-3 text-white text-sm font-bold rounded-xl transition-colors shadow-md ${exportType === 'PDF' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-[#10b981] hover:bg-emerald-600 shadow-emerald-500/20'}`}
              >
                Ya, Unduh
              </button>
              <button onClick={() => setModalType("NONE")} className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Loading Export */}
      {modalType === "LOADING" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center max-w-xs w-full">
            <Loader2 className="w-12 h-12 text-[#10b981] animate-spin mb-4" />
            <p className="font-bold text-gray-900 dark:text-white">Mempersiapkan Dokumen...</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Harap tunggu sebentar.</p>
          </div>
        </div>
      )}

      {/* 4. Modal Success Message */}
      {modalType === "SUCCESS" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unduhan Selesai!</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Laporan transaksi berhasil di-export ke format {exportType}.</p>
          </div>
        </div>
      )}

    </div>
  );
}
