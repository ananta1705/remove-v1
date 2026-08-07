"use client";

import { useState, useEffect } from "react";
import { 
  Search, Calendar, Filter, X, Eye, 
  Download, FileText, CheckCircle2, Clock, 
  AlertCircle, Truck, User, Weight, Activity,
  ChevronRight, ArrowDownToLine, Receipt,
  RefreshCcw, ChevronLeft, ChevronRight as ChevronRightIcon,
  Loader2
} from "lucide-react";

// Updated Mock Data with comprehensive operational fields & requested waste types
const riwayatData = [
  { 
    id: 1, 
    tanggal: "18 Juli 2026", 
    waktu: "14:01", 
    skrd: "SKRD-20260718-001", 
    noTiket: "TKT-001-A",
    upkp: "UPKP Pusat",
    kendaraan: "R 1234 AB",
    supir: "Budi Santoso",
    jenis: "Organik", 
    gross: 450,
    tara: 200,
    berat: 250, 
    hargaPerKg: 150,
    estimasi: "Rp 37.500", 
    metode: "QRIS", 
    status: "Lunas",
    adminName: "Joko Widodo",
    verificationDate: "18 Juli 2026, 14:15 WIB",
    adminNote: null
  },
  { 
    id: 2, 
    tanggal: "18 Juli 2026", 
    waktu: "11:45", 
    skrd: "SKRD-20260718-002", 
    noTiket: "TKT-002-B",
    upkp: "UPKP Utara",
    kendaraan: "R 5678 CD",
    supir: "Agus Pratama",
    jenis: "Anorganik", 
    gross: 320,
    tara: 150,
    berat: 170, 
    hargaPerKg: 150,
    estimasi: "Rp 25.500", 
    metode: "Kode Billing", 
    status: "Lunas",
    adminName: "Budi Gunawan",
    verificationDate: "18 Juli 2026, 12:00 WIB",
    adminNote: null
  },
  { 
    id: 3, 
    tanggal: "18 Juli 2026", 
    waktu: "10:22", 
    skrd: "SKRD-20260718-003", 
    noTiket: "TKT-003-C",
    upkp: "UPKP Selatan",
    kendaraan: "R 9012 EF",
    supir: "Joko Supriyanto",
    jenis: "Residu", 
    gross: 510,
    tara: 210,
    berat: 300, 
    hargaPerKg: 150,
    estimasi: "Rp 45.000", 
    metode: "Kode Billing", 
    status: "Menunggu Verifikasi",
    adminName: null,
    verificationDate: null,
    adminNote: null
  },
  { 
    id: 4, 
    tanggal: "17 Juli 2026", 
    waktu: "08:55", 
    skrd: "SKRD-20260717-004", 
    noTiket: "TKT-004-D",
    upkp: "UPKP Pusat",
    kendaraan: "R 3456 GH",
    supir: "Maman",
    jenis: "RDF", 
    gross: 280,
    tara: 120,
    berat: 160, 
    hargaPerKg: 150,
    estimasi: "Rp 24.000", 
    metode: "QRIS", 
    status: "Gagal",
    adminName: "Joko Widodo",
    verificationDate: "17 Juli 2026, 09:30 WIB",
    adminNote: "Bukti foto resi timbangan buram dan tidak terbaca. Mohon konfirmasi ulang."
  },
];

export function RiwayatPetugas() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Simulate error state
  
  // Filters
  const [search, setSearch] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua Kategori");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 124; // Mock
  const totalItems = 1240; // Mock total across all pages
  
  // Modals & States
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRiwayat, setSelectedRiwayat] = useState<any>(null);
  
  // Export States
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportType, setExportType] = useState<'PDF' | 'Excel' | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setIsPageLoading(true);
    setHasError(false);
    setTimeout(() => setIsPageLoading(false), 600);
  };

  // Filter Logic
  const filteredData = riwayatData.filter(item => {
    if (search && !item.skrd.toLowerCase().includes(search.toLowerCase()) && !item.kendaraan.toLowerCase().includes(search.toLowerCase()) && !item.supir.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterJenis !== "Semua Kategori" && item.jenis !== filterJenis) return false;
    if (filterStatus !== "Semua Status" && item.status !== filterStatus) return false;
    if (filterTanggal && item.tanggal !== filterTanggal) return false;
    return true;
  });

  const hasActiveFilters = search || filterTanggal || filterJenis !== "Semua Kategori" || filterStatus !== "Semua Status";
  const currentCount = filteredData.length;

  const resetFilters = () => {
    setSearch("");
    setFilterTanggal("");
    setFilterJenis("Semua Kategori");
    setFilterStatus("Semua Status");
  };

  const openDetail = (data: any) => {
    setSelectedRiwayat(data);
    setDetailModalOpen(true);
  };

  // Consistent Status Badges
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Lunas": 
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm transition-all hover:bg-emerald-100"><CheckCircle2 className="w-3.5 h-3.5" /> Lunas</span>;
      case "Menunggu Verifikasi": 
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-amber-50 text-amber-600 border border-amber-200 shadow-sm transition-all hover:bg-amber-100"><Clock className="w-3.5 h-3.5" /> Verifikasi</span>;
      case "Gagal": 
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-red-50 text-red-600 border border-red-200 shadow-sm transition-all hover:bg-red-100"><AlertCircle className="w-3.5 h-3.5" /> Gagal</span>;
      default: 
        return <span className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-gray-50 text-gray-600 border border-gray-200 shadow-sm">{status}</span>;
    }
  };

  // Consistent Waste Category Badges
  const getWasteBadge = (type: string) => {
    let colorClass = "";
    let dotColor = "";
    switch(type) {
      case "Organik": colorClass = "bg-green-50 text-green-700 border-green-200"; dotColor = "bg-green-500"; break;
      case "Anorganik": colorClass = "bg-blue-50 text-blue-700 border-blue-200"; dotColor = "bg-blue-500"; break;
      case "Residu": colorClass = "bg-red-50 text-red-700 border-red-200"; dotColor = "bg-red-500"; break;
      case "RDF": colorClass = "bg-purple-50 text-purple-700 border-purple-200"; dotColor = "bg-purple-500"; break;
      case "Middle Tossa": colorClass = "bg-amber-50 text-amber-700 border-amber-200"; dotColor = "bg-amber-500"; break;
      default: colorClass = "bg-gray-50 text-gray-700 border-gray-200"; dotColor = "bg-gray-500"; break;
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border ${colorClass} transition-all`}>
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} /> {type}
      </span>
    );
  };

  const triggerExport = (type: 'PDF' | 'Excel') => {
    setExportType(type);
    setIsExportDialogOpen(true);
  };

  const handleConfirmExport = () => {
    if (!exportType) return;
    setIsExporting(true);
    
    setTimeout(() => {
      let content = "";
      let mimeType = "";
      let extension = "";

      if (exportType === 'Excel') {
        // Generate valid CSV for Excel
        content = "Tanggal,No. SKRD,UPKP,Truk,Supir,Jenis Sampah,Berat Netto (Kg),Tagihan,Status\n";
        filteredData.forEach(row => {
          content += `"${row.tanggal}, ${row.waktu}","${row.skrd}","${row.upkp}","${row.kendaraan}","${row.supir}","${row.jenis}","${row.berat}","${row.estimasi}","${row.status}"\n`;
        });
        mimeType = "text/csv;charset=utf-8;";
        extension = "csv";
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Riwayat_Input_${new Date().getTime()}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Simulate PDF using browser's native print-to-PDF feature for a real document (lembaran) view
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          const htmlContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Laporan_Riwayat_Input</title>
                <style>
                  body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; }
                  .header { border-bottom: 2px solid #10b981; padding-bottom: 15px; margin-bottom: 25px; }
                  h1 { color: #111827; font-size: 24px; margin: 0 0 5px 0; letter-spacing: -0.5px; }
                  p { color: #64748b; margin: 0; font-size: 13px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
                  th, td { border: 1px solid #e2e8f0; padding: 12px 14px; text-align: left; }
                  th { background-color: #f8fafc; color: #475569; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
                  tr:nth-child(even) { background-color: #f8fafc; }
                  .badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; }
                  .status-lunas { color: #059669; background: #ecfdf5; }
                  .status-gagal { color: #dc2626; background: #fef2f2; }
                  .status-pending { color: #d97706; background: #fffbeb; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>Laporan Riwayat Input Sampah</h1>
                  <p>Tanggal Cetak: ${new Date().toLocaleString('id-ID')} WIB</p>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>No. SKRD</th>
                      <th>Truk / Supir</th>
                      <th>Jenis Sampah</th>
                      <th>Berat Netto</th>
                      <th>Tagihan</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${filteredData.map(row => {
                      let statusClass = 'status-pending';
                      if (row.status === 'Lunas') statusClass = 'status-lunas';
                      if (row.status === 'Gagal') statusClass = 'status-gagal';
                      return `
                      <tr>
                        <td><strong>${row.tanggal}</strong><br><span style="color: #64748b; font-size: 11px;">${row.waktu} WIB</span></td>
                        <td><strong>${row.skrd}</strong><br><span style="color: #059669; font-size: 11px;">${row.upkp}</span></td>
                        <td>${row.kendaraan}<br><span style="color: #64748b; font-size: 11px;">${row.supir}</span></td>
                        <td>${row.jenis}</td>
                        <td><strong>${row.berat} Kg</strong></td>
                        <td>${row.estimasi}</td>
                        <td><span class="badge ${statusClass}">${row.status}</span></td>
                      </tr>
                    `}).join('')}
                  </tbody>
                </table>
                <script>
                  window.onload = () => {
                    setTimeout(() => {
                      window.print();
                    }, 500);
                  }
                </script>
              </body>
            </html>
          `;
          printWindow.document.write(htmlContent);
          printWindow.document.close();
        }
      }

      setIsExporting(false);
      setIsExportDialogOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setExportType(null);
    }, 1500);
  };

  if (isPageLoading) {
    return (
      <div className="space-y-6 pb-20 animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        </div>
        <div className="h-24 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        <div className="h-[500px] bg-gray-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-300 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Gagal Memuat Data</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mb-8">Terjadi kesalahan pada sistem saat mencoba mengambil data riwayat. Silakan coba lagi dalam beberapa saat.</p>
        <button onClick={handleRetry} className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
          <RefreshCcw className="w-4 h-4" /> Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 relative">
      
      {/* Toast Notifikasi */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border border-[#10b981]/20 rounded-xl shadow-xl px-5 py-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">Export Berhasil</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Riwayat input telah berhasil diunduh.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-4 text-gray-400 hover:text-gray-600 dark:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal Konfirmasi Export */}
      {isExportDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${exportType === 'PDF' ? 'bg-red-50' : 'bg-emerald-50'}`}>
              {exportType === 'PDF' ? (
                <Download className="w-8 h-8 text-red-500" />
              ) : (
                <ArrowDownToLine className="w-8 h-8 text-emerald-600" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Export Riwayat</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
              Anda akan mengunduh data riwayat input sesuai dengan filter yang aktif dalam format {exportType === 'PDF' ? 'PDF (.pdf)' : 'Excel (.xlsx)'}. Lanjutkan?
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setIsExportDialogOpen(false)}
                disabled={isExporting}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmExport}
                disabled={isExporting}
                className={`flex-1 py-2.5 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${exportType === 'PDF' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#14CC99] hover:bg-[#12b589]'}`}
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Export"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. PAGE HEADER */}
      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-slate-400 mb-2">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#10b981]">Riwayat Input</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Riwayat Input</h1>
          <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">Pantau seluruh riwayat input operasional sampah yang telah Anda catat.</p>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group min-h-[140px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Input Hari Ini</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">24 <span className="text-lg font-bold text-gray-400">Transaksi</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center gap-2 text-[11px] font-medium text-gray-400">
            <Clock className="w-3.5 h-3.5" /> Terakhir diperbarui: Hari ini, 14:01 WIB
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group min-h-[140px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Berat Sampah</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">8.250 <span className="text-lg font-bold text-gray-400">Kg</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
              <Weight className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center gap-2 text-[11px] font-medium text-gray-400">
            <Clock className="w-3.5 h-3.5" /> Terakhir diperbarui: Hari ini, 14:01 WIB
          </div>
        </div>

        {/* Card 3 - Status Operasional */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group min-h-[140px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[12px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Status Operasional</p>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Aktif
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center gap-2 text-[12px] font-semibold text-gray-600 dark:text-slate-300 relative z-10">
            24 Transaksi diproses hari ini.
          </div>
        </div>
      </div>

      {/* 3. FILTER TOOLBAR & EXPORT */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-[24px] shadow-sm border border-gray-100 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Filters */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative group/input lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Cari SKRD, Truk, atau Supir..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            
            <div className="relative group/input">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
              <input 
                type="date" 
                value={filterTanggal} onChange={e => setFilterTanggal(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-600 dark:text-slate-300"
              />
            </div>
            
            <div className="relative group/input">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
              <select 
                value={filterJenis} onChange={e => setFilterJenis(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer text-gray-600 dark:text-slate-300"
              >
                <option>Semua Kategori</option>
                <option>Organik</option>
                <option>Anorganik</option>
                <option>Residu</option>
                <option>RDF</option>
                <option>Middle Tossa</option>
              </select>
            </div>

            <div className="relative group/input">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
              <select 
                value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer text-gray-600 dark:text-slate-300"
              >
                <option>Semua Status</option>
                <option>Lunas</option>
                <option>Menunggu Verifikasi</option>
                <option>Gagal</option>
              </select>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button 
              disabled={filteredData.length === 0}
              onClick={() => triggerExport('PDF')}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 hover:border-gray-300 hover:text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            >
              <Download className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:-translate-y-0.5 transition-all" />
              Export PDF
            </button>
            <button 
              disabled={filteredData.length === 0}
              onClick={() => triggerExport('Excel')}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-[13px] font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 hover:border-gray-300 hover:text-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            >
              <ArrowDownToLine className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:-translate-y-0.5 transition-all" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Filter Badges & Result Counter */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <p className="text-[12px] font-semibold text-gray-500 dark:text-slate-400">
            Menampilkan <span className="text-gray-900 dark:text-white font-bold">{currentCount}</span> dari <span className="text-gray-900 dark:text-white font-bold">{totalItems.toLocaleString('id-ID')}</span> data
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            {search && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-bold">Pencarian: {search} <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSearch("")} /></span>}
            {filterTanggal && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-bold">Tgl: {filterTanggal} <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFilterTanggal("")} /></span>}
            {filterJenis !== "Semua Kategori" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-bold">Kategori: {filterJenis} <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFilterJenis("Semua Kategori")} /></span>}
            {filterStatus !== "Semua Status" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-bold">Status: {filterStatus} <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFilterStatus("Semua Status")} /></span>}
            
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors ml-1 underline decoration-red-500/30 underline-offset-2">Reset</button>
            )}
          </div>
        </div>

      </div>

      {/* 4. TABLE / EMPTY STATE */}
      {filteredData.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-slate-800 p-16 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <FileText className="w-12 h-12 text-gray-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Riwayat tidak ditemukan.</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 max-w-sm">Tidak ada data operasional yang sesuai dengan kriteria Anda. Silakan ubah filter atau lakukan input data baru.</p>
          <div className="flex gap-3">
            <button onClick={resetFilters} className="px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Reset Filter
            </button>
            <button className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              Input Sampah
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 overflow-hidden hidden md:flex md:flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Tanggal</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">No. SKRD & UPKP</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Truk & Supir</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Jenis Sampah</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Berat Netto</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Tagihan & Metode</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Status</th>
                  <th className="px-6 py-5 text-center text-[11px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
                {filteredData.map((row, idx) => (
                  <tr 
                    key={row.id} 
                    className="group hover:bg-emerald-50/40 dark:hover:bg-slate-800/40 transition-colors duration-200 even:bg-gray-50/30 dark:even:bg-slate-800/10"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{row.tanggal}</p>
                      <p className="text-[11px] font-semibold text-gray-500 dark:text-slate-400">{row.waktu} WIB</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-mono font-bold text-gray-900 dark:text-white">{row.skrd}</p>
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{row.upkp}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-bold text-gray-900 dark:text-white flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-gray-400" /> {row.kendaraan}</p>
                      <p className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-400" /> {row.supir}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getWasteBadge(row.jenis)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-[14px] font-black text-gray-900 dark:text-white">{row.berat} Kg</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-gray-900 dark:text-white">{row.estimasi}</p>
                      <p className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 mt-0.5">{row.metode}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(row.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => openDetail(row)}
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-500 hover:bg-gray-50 hover:text-[#10b981] hover:border-[#10b981]/30 transition-all shadow-sm group-hover:scale-105"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 8. PAGINATION */}
          <div className="border-t border-gray-100 dark:border-slate-800 p-4 px-6 flex items-center justify-between bg-white dark:bg-slate-900">
            <p className="text-[12px] font-semibold text-gray-500 dark:text-slate-400">
              Menampilkan <span className="text-gray-900 dark:text-white font-bold">{currentCount}</span> dari <span className="text-gray-900 dark:text-white font-bold">{totalItems.toLocaleString('id-ID')}</span> data
            </p>
            <div className="flex items-center gap-1.5">
              <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-400 disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#10b981] text-white font-bold text-[12px] shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-bold text-[12px] transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-bold text-[12px] transition-colors">
                3
              </button>
              <span className="text-gray-400 text-sm px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-bold text-[12px] transition-colors">
                124
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE RESPONSIVE CARDS */}
      <div className="md:hidden space-y-4">
        {filteredData.map(row => (
          <div key={row.id} className="bg-white dark:bg-slate-900 rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 p-5">
            <div className="flex justify-between items-start border-b border-gray-50 dark:border-slate-800 pb-3 mb-3">
              <div>
                <p className="text-[12px] font-mono font-bold text-gray-900 dark:text-white">{row.skrd}</p>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">{row.upkp}</p>
              </div>
              {getStatusBadge(row.status)}
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-bold text-gray-900">{row.tanggal}, {row.waktu} WIB</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Truk / Supir</span>
                <span className="font-bold text-gray-900">{row.kendaraan} ({row.supir})</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Jenis Sampah</span>
                {getWasteBadge(row.jenis)}
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Berat Netto</span>
                <span className="font-black text-gray-900">{row.berat} Kg</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Tagihan</span>
                <span className="font-bold text-[#10b981]">{row.estimasi}</span>
              </div>
            </div>
            <button 
              onClick={() => openDetail(row)}
              className="w-full py-2.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-[12px] font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> Lihat Detail
            </button>
          </div>
        ))}
      </div>

      {/* 7. COMPREHENSIVE DETAIL MODAL */}
      {detailModalOpen && selectedRiwayat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setDetailModalOpen(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl max-w-lg w-full p-8 animate-in zoom-in-95 duration-300 relative border border-gray-100 dark:border-slate-800 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            
            <button onClick={() => setDetailModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:text-slate-300 transition-colors bg-gray-50 dark:bg-slate-800 rounded-full p-1.5 z-10 hover:scale-105">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-slate-800 relative z-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Detail Operasional</h2>
                <p className="text-[12px] font-medium text-gray-500 dark:text-slate-400">{selectedRiwayat.tanggal}, {selectedRiwayat.waktu} WIB</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
              {/* Identitas Card */}
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3 border border-gray-100 dark:border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Nomor SKRD</span>
                  <span className="text-[13px] font-mono font-black text-gray-900 dark:text-white">{selectedRiwayat.skrd}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Nomor Tiket</span>
                  <span className="text-[13px] font-mono font-bold text-gray-900 dark:text-white">{selectedRiwayat.noTiket}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Instansi / UPKP</span>
                  <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md">{selectedRiwayat.upkp}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-700 border-dashed">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Truk & Supir</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">{selectedRiwayat.kendaraan} ({selectedRiwayat.supir})</span>
                </div>
              </div>

              {/* Timbangan Flow */}
              <div className="border border-gray-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Rincian Timbangan</p>
                  {getWasteBadge(selectedRiwayat.jenis)}
                </div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-semibold text-gray-600 dark:text-slate-300">Berat Kotor (Gross)</span>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedRiwayat.gross} Kg</span>
                </div>
                <div className="flex justify-between text-[13px] mb-3 pb-3 border-b border-gray-100 dark:border-slate-700 border-dashed">
                  <span className="font-semibold text-gray-600 dark:text-slate-300">Berat Kosong (Tara)</span>
                  <span className="font-bold text-gray-900 dark:text-white">- {selectedRiwayat.tara} Kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-extrabold text-emerald-600 dark:text-emerald-400">Berat Bersih (Netto)</span>
                  <span className="text-[18px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">{selectedRiwayat.berat} Kg</span>
                </div>
              </div>

              {/* Tagihan & Status */}
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3 border border-gray-100 dark:border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Harga per Kg</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">Rp {selectedRiwayat.hargaPerKg}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Metode Pembayaran</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">{selectedRiwayat.metode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Status Pembayaran</span>
                  {getStatusBadge(selectedRiwayat.status)}
                </div>
                <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-200 dark:border-slate-700">
                  <span className="text-[14px] font-extrabold text-gray-900 dark:text-white">Total Tagihan</span>
                  <span className="text-2xl font-black text-[#10b981]">{selectedRiwayat.estimasi}</span>
                </div>
              </div>

              {/* Informasi Verifikasi Admin */}
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3 border border-gray-100 dark:border-slate-700/50 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                  <h3 className="text-[13px] font-bold text-gray-900 dark:text-white uppercase tracking-wide">Informasi Verifikasi</h3>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Status Verifikasi</span>
                  {getStatusBadge(selectedRiwayat.status)}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Tanggal & Waktu</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">{selectedRiwayat.verificationDate || '—'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Nama Admin</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">{selectedRiwayat.adminName || '—'}</span>
                </div>

                {/* Conditional Admin Note Alert */}
                {(selectedRiwayat.status === "Gagal" || selectedRiwayat.status === "Menunggu Verifikasi") ? (
                  <div className={`mt-3 p-3 rounded-xl border ${selectedRiwayat.status === "Gagal" ? "bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30" : "bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/30"}`}>
                    <p className={`text-[11px] font-bold mb-1 flex items-center gap-1.5 ${selectedRiwayat.status === "Gagal" ? "text-red-700 dark:text-red-400" : "text-amber-700 dark:text-amber-400"}`}>
                      <AlertCircle className="w-3.5 h-3.5" /> Catatan Admin:
                    </p>
                    <p className={`text-[12px] font-medium leading-relaxed ${selectedRiwayat.status === "Gagal" ? "text-red-600 dark:text-red-300" : "text-amber-600 dark:text-amber-300"}`}>
                      {selectedRiwayat.adminNote || "Belum ada catatan."}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700 border-dashed">
                    <div className="flex justify-between items-start">
                      <span className="text-[12px] font-bold text-gray-500 dark:text-slate-400">Catatan Admin</span>
                      <span className="text-[12px] font-medium text-gray-500 dark:text-slate-400 text-right max-w-[200px]">
                        {selectedRiwayat.adminNote || "Tidak ada catatan."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setDetailModalOpen(false)}
              className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg relative z-10"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
