"use client";

import { useState } from "react";
import { 
  Search, Download, TrendingUp, TrendingDown, 
  Trash2, Filter, RotateCcw, CheckCircle2, Clock, Truck,
  AlertCircle, X, Loader2, FolderSearch, Eye,
  CheckCircle, XCircle, FileText
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

// --- Mock Data ---

const chartDataHarian = [
  { label: "Sen", murni: 12, liar: 7, rdf: 4, residu: 3, bursam: 2, tossa: 5, toSbi: 3 },
  { label: "Sel", murni: 15, liar: 8, rdf: 5, residu: 4, bursam: 3, tossa: 6, toSbi: 4 },
  { label: "Rab", murni: 14, liar: 9, rdf: 6, residu: 4, bursam: 2, tossa: 5, toSbi: 5 },
  { label: "Kam", murni: 18, liar: 10, rdf: 8, residu: 5, bursam: 4, tossa: 7, toSbi: 6 },
  { label: "Jum", murni: 22, liar: 12, rdf: 9, residu: 6, bursam: 5, tossa: 8, toSbi: 7 },
  { label: "Sab", murni: 25, liar: 15, rdf: 11, residu: 8, bursam: 6, tossa: 10, toSbi: 8 },
  { label: "Min", murni: 20, liar: 11, rdf: 7, residu: 5, bursam: 4, tossa: 6, toSbi: 5 },
];

const generateChartData = (multiplier: number, labels: string[]) => {
  return labels.map(label => ({
    label,
    murni: Math.floor(Math.random() * 10 * multiplier) + 10 * multiplier,
    liar: Math.floor(Math.random() * 8 * multiplier) + 5 * multiplier,
    rdf: Math.floor(Math.random() * 6 * multiplier) + 3 * multiplier,
    residu: Math.floor(Math.random() * 5 * multiplier) + 2 * multiplier,
    bursam: Math.floor(Math.random() * 4 * multiplier) + 1 * multiplier,
    tossa: Math.floor(Math.random() * 7 * multiplier) + 4 * multiplier,
    toSbi: Math.floor(Math.random() * 5 * multiplier) + 3 * multiplier,
  }));
};

const chartDataMingguan = generateChartData(4, ["M1", "M2", "M3", "M4"]);
const chartDataBulanan = generateChartData(15, ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]);
const chartDataTahunan = generateChartData(150, ["2021", "2022", "2023", "2024", "2025"]);

const chartLines = [
  { key: "murni", label: "Sampah Murni", color: "#10b981" },
  { key: "organik", label: "Sampah Organik", color: "#14CC99" },
  { key: "anorganik", label: "Sampah Anorganik", color: "#3b82f6" },
  { key: "rdf", label: "Bahan RDF", color: "#f59e0b" },
  { key: "residu", label: "Residu", color: "#ef4444" },
];

const mockTableData = [
  { id: 1, jenis: "Sampah Murni", total: "2432.32", rata: "347.47", perubahan: "+2.5%", isUp: true, ukpk: "UPKP Pusat" },
  { id: 2, jenis: "Sampah Organik", total: "1842.10", rata: "263.15", perubahan: "+4.2%", isUp: true, ukpk: "UPKP Utara" },
  { id: 3, jenis: "Sampah Anorganik", total: "1250.40", rata: "178.62", perubahan: "+1.8%", isUp: true, ukpk: "UPKP Timur" },
  { id: 4, jenis: "Bahan RDF", total: "985.50", rata: "140.78", perubahan: "+5.4%", isUp: true, ukpk: "UPKP Selatan" },
  { id: 5, jenis: "Residu", total: "450.25", rata: "64.32", perubahan: "-0.8%", isUp: false, ukpk: "UPKP Pusat" },
];

// --- Mock Data for Validation Queue ---
const initialValidationData = [
  { 
    id: 101, 
    petugas: "Ahmad Fauzi",
    supir: "Ahmad Fauzi",
    upkp: "UPKP Pusat",
    noTiket: "TKT-003-C",
    skrd: "SKRD-20260718-003",
    kendaraan: "R 9012 EF",
    jenis: "Residu",
    tanggal: "18 Jul 2026",
    waktu: "10:22",
    beratKotor: 510,
    beratKosong: 210,
    beratBersih: 300,
    hargaPerKg: 150,
    estimasi: "Rp 45.000",
    metode: "Kode Billing",
    status: "Menunggu Verifikasi",
    adminName: null,
    verificationDate: null,
    adminNote: null
  },
  { 
    id: 102, 
    petugas: "Siti Aminah",
    supir: "Siti Aminah",
    upkp: "UPKP Selatan",
    noTiket: "TKT-005-E",
    skrd: "SKRD-20260718-005",
    kendaraan: "R 5678 CD",
    jenis: "Organik",
    tanggal: "18 Jul 2026",
    waktu: "11:30",
    beratKotor: 800,
    beratKosong: 250,
    beratBersih: 550,
    hargaPerKg: 150,
    estimasi: "Rp 82.500",
    metode: "Kode Billing",
    status: "Menunggu Verifikasi",
    adminName: null,
    verificationDate: null,
    adminNote: null
  },
  { 
    id: 103, 
    petugas: "Budi Santoso",
    supir: "Budi Santoso",
    upkp: "UPKP Utara",
    noTiket: "TKT-001-A",
    skrd: "SKRD-20260718-001",
    kendaraan: "R 1234 AB",
    jenis: "Sampah Murni",
    tanggal: "18 Jul 2026",
    waktu: "14:01",
    beratKotor: 450,
    beratKosong: 200,
    beratBersih: 250,
    hargaPerKg: 150,
    estimasi: "Rp 37.500",
    metode: "QRIS",
    status: "Lunas",
    adminName: "Joko Widodo",
    verificationDate: "18 Juli 2026, 14:15 WIB",
    adminNote: null
  },
  { 
    id: 104, 
    petugas: "Maman",
    supir: "Maman",
    upkp: "UPKP Pusat",
    noTiket: "TKT-004-D",
    skrd: "SKRD-20260717-004",
    kendaraan: "R 3456 GH",
    jenis: "RDF",
    tanggal: "17 Jul 2026",
    waktu: "08:55",
    beratKotor: 280,
    beratKosong: 120,
    beratBersih: 160,
    hargaPerKg: 150,
    estimasi: "Rp 24.000",
    metode: "QRIS",
    status: "Gagal",
    adminName: "Joko Widodo",
    verificationDate: "17 Juli 2026, 09:30 WIB",
    adminNote: "Bukti foto resi timbangan buram dan tidak terbaca. Mohon konfirmasi ulang."
  }
];

export function LaporanSampah() {
  const [activeTab, setActiveTab] = useState<"Analitik" | "Validasi">("Validasi");
  
  // Analytics State
  const [filterUKPK, setFilterUKPK] = useState("Semua");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [chartTab, setChartTab] = useState("Harian");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [appliedFilters, setAppliedFilters] = useState({
    ukpk: "Semua", jenis: "Semua", startDate: "", endDate: ""
  });

  // Validation State
  const [validationData, setValidationData] = useState(initialValidationData);
  const [validationSearch, setValidationSearch] = useState("");
  const [validationFilterStatus, setValidationFilterStatus] = useState("Semua");
  
  // Modal State
  const [selectedValidation, setSelectedValidation] = useState<any>(null);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [isRejecting, setIsRejecting] = useState(false); // To show text area
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleApplyFilter = () => setAppliedFilters({ ukpk: filterUKPK, jenis: filterJenis, startDate, endDate });
  const handleResetFilter = () => {
    setFilterUKPK("Semua"); setFilterJenis("Semua"); setStartDate(""); setEndDate("");
    setAppliedFilters({ ukpk: "Semua", jenis: "Semua", startDate: "", endDate: "" });
    setSearch("");
  };

  const handleConfirmExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false); setIsExportDialogOpen(false); setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      window.open("/admin/laporan/preview-excel", "_blank");
    }, 2000);
  };

  const filteredTableData = mockTableData.filter(row => {
    if (search && !row.jenis.toLowerCase().includes(search.toLowerCase())) return false;
    if (appliedFilters.jenis !== "Semua" && row.jenis !== appliedFilters.jenis) return false;
    if (appliedFilters.ukpk !== "Semua" && row.ukpk !== appliedFilters.ukpk) return false;
    return true;
  });

  const totalVolume = filteredTableData.reduce((acc, row) => acc + parseFloat(row.total), 0).toFixed(2);
  const isFiltered = appliedFilters.jenis !== "Semua" || appliedFilters.ukpk !== "Semua";
  
  const currentChartData = chartTab === "Harian" ? chartDataHarian 
    : chartTab === "Mingguan" ? chartDataMingguan 
    : chartTab === "Bulanan" ? chartDataBulanan 
    : chartTab === "Tahunan" ? chartDataTahunan : chartDataHarian;

  // Validation Actions
  const openValidationModal = (item: any) => {
    setSelectedValidation(item);
    setIsRejecting(false);
    setRejectionNote("");
    setIsValidationModalOpen(true);
  };

  const handleAcceptReport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setValidationData(prev => prev.map(item => 
        item.id === selectedValidation.id ? { 
          ...item, 
          status: "Lunas", 
          adminNote: rejectionNote.trim() ? rejectionNote.trim() : null,
          adminName: "Admin Pusat",
          verificationDate: "18 Jul 2026, 15:30 WIB"
        } : item
      ));
      setIsProcessing(false);
      setIsValidationModalOpen(false);
      setToastMsg("Laporan berhasil disetujui (Lunas).");
    }, 800);
  };

  const handleRejectReport = () => {
    if (!rejectionNote.trim()) {
      alert("Catatan penolakan wajib diisi!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setValidationData(prev => prev.map(item => 
        item.id === selectedValidation.id ? { 
          ...item, 
          status: "Gagal", 
          adminNote: rejectionNote,
          adminName: "Admin Pusat",
          verificationDate: "18 Jul 2026, 15:30 WIB"
        } : item
      ));
      setIsProcessing(false);
      setIsValidationModalOpen(false);
      setToastMsg("Laporan telah ditolak.");
    }, 800);
  };

  const filteredValidationData = validationData.filter(row => {
    if (validationSearch && !row.petugas.toLowerCase().includes(validationSearch.toLowerCase()) && !row.noTiket.toLowerCase().includes(validationSearch.toLowerCase())) return false;
    if (validationFilterStatus !== "Semua" && row.status !== validationFilterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Lunas": return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-lg text-xs font-bold">Lunas</span>;
      case "Menunggu Verifikasi": return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-lg text-xs font-bold">Menunggu</span>;
      case "Gagal": return <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200/60 rounded-lg text-xs font-bold">Gagal</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Toast Notifications */}
      {(showToast || toastMsg) && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border border-[#10b981]/20 rounded-xl shadow-xl px-5 py-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">{toastMsg ? "Aksi Berhasil" : "Export Berhasil"}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{toastMsg || "Laporan sampah telah berhasil diunduh."}</p>
          </div>
          <button onClick={() => { setShowToast(false); setToastMsg(""); }} className="ml-4 text-gray-400 hover:text-gray-600 dark:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Export Dialog */}
      {isExportDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Export Laporan</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
              Anda akan mengunduh laporan data sampah sesuai dengan filter yang aktif dalam format Excel (.xlsx). Lanjutkan?
            </p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setIsExportDialogOpen(false)} disabled={isExporting} className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 font-medium rounded-xl hover:bg-gray-200">Batal</button>
              <button onClick={handleConfirmExport} disabled={isExporting} className="flex-1 py-2.5 bg-[#14CC99] text-white font-medium rounded-xl hover:bg-[#12b589] flex items-center justify-center gap-2">
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Export"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header & Tabs */}
      <div className="flex flex-col gap-5 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan & Validasi Sampah</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Monitoring, analisis, dan persetujuan laporan operasional.</p>
          </div>
          <button onClick={() => setIsExportDialogOpen(true)} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#14CC99] text-white font-semibold rounded-xl hover:bg-[#12b589] transition-all shadow-md shadow-[#14CC99]/20">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-px">
          <button
            onClick={() => setActiveTab("Validasi")}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "Validasi" ? "border-[#14CC99] text-[#14CC99]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Antrean Validasi
          </button>
          <button
            onClick={() => setActiveTab("Analitik")}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "Analitik" ? "border-[#14CC99] text-[#14CC99]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Analitik & Rekapitulasi
          </button>
        </div>
      </div>

      {/* --- VALIDASI TAB --- */}
      {activeTab === "Validasi" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Laporan Menunggu Validasi</h3>
                <p className="text-xs text-gray-500">Periksa dan berikan catatan untuk laporan dari petugas.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <select 
                value={validationFilterStatus} onChange={e => setValidationFilterStatus(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Semua">Semua Status</option>
                <option value="Menunggu Verifikasi">Menunggu</option>
                <option value="Lunas">Selesai (Lunas)</option>
                <option value="Gagal">Ditolak (Gagal)</option>
              </select>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" placeholder="Cari tiket atau petugas..." value={validationSearch} onChange={e => setValidationSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100">No. Tiket & Waktu</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100">Petugas / UPKP</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100">Jenis Sampah</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100">Netto (Kg)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredValidationData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{row.noTiket}</p>
                      <p className="text-xs text-gray-500">{row.tanggal}, {row.waktu}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{row.petugas}</p>
                      <p className="text-xs text-gray-500">{row.upkp}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{row.jenis}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#14CC99]">{row.beratBersih} Kg</td>
                    <td className="px-6 py-4">{getStatusBadge(row.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openValidationModal(row)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                          row.status === "Menunggu Verifikasi" 
                            ? "bg-[#14CC99] text-white hover:bg-[#12b589]" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {row.status === "Menunggu Verifikasi" ? "Validasi" : "Lihat Detail"}
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredValidationData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Tidak ada data ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ANALITIK TAB --- */}
      {activeTab === "Analitik" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-slate-200">
              <Filter className="w-4 h-4 text-emerald-500" /> Filter Data Analitik
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">UPKP</label>
                <select value={filterUKPK} onChange={e => setFilterUKPK(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500">
                  <option value="Semua">Semua UPKP</option>
                  <option value="UKPK Pusat">UPKP Pusat</option>
                  <option value="UKPK Utara">UPKP Utara</option>
                  <option value="UKPK Selatan">UPKP Selatan</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">Jenis Sampah</label>
                <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500">
                  <option value="Semua">Semua Jenis Sampah</option>
                  <option value="Sampah Murni">Sampah Murni</option>
                  <option value="Bahan RDF">Bahan RDF</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">Tanggal Mulai</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">Tanggal Selesai</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={handleResetFilter} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-2"><RotateCcw className="w-3.5 h-3.5" /> Reset Filter</button>
              <button onClick={handleApplyFilter} className="px-5 py-2 text-sm font-medium text-white bg-[#14CC99] hover:bg-[#12b589] rounded-xl">Terapkan Filter</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "Total Laporan", value: isFiltered ? "142" : "1,248", trend: "+12%", icon: Trash2, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Total Sampah", value: `${totalVolume} T`, trend: "+5.2%", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50" },
              { label: "Selesai", value: isFiltered ? "95" : "856", trend: "+8%", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
              { label: "Diproses", value: isFiltered ? "24" : "312", trend: "-2%", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Menunggu", value: isFiltered ? "23" : "80", trend: "-15%", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
            ].map((card, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl ${card.bg}`}><card.icon className={`w-5 h-5 ${card.color}`} /></div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${card.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                    {card.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{card.trend}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Trend Volume Sampah</h3>
                  <p className="text-xs text-gray-500 mt-1">Pergerakan total volume dalam satuan Ton.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {["Harian", "Mingguan", "Bulanan", "Tahunan"].map(tab => (
                    <button key={tab} onClick={() => setChartTab(tab)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg ${chartTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>{tab}</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}/>
                    {chartLines.map(line => (
                      <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-gray-900">Live Summary</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {chartLines.map((line, idx) => {
                  const volume = mockTableData[idx] ? mockTableData[idx].total : "120.00";
                  return (
                    <div key={line.key} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
                        <span className="text-xs font-semibold text-gray-700">{line.label}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{volume} T</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL VALIDASI --- */}
      {isValidationModalOpen && selectedValidation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#14CC99]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Validasi Laporan</h2>
                  <p className="text-xs text-gray-500">{selectedValidation.noTiket}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsValidationModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Modal */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Info Petugas & Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Diinput Oleh</p>
                  <p className="text-sm font-bold text-gray-900">{selectedValidation.petugas} ({selectedValidation.supir})</p>
                  <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">{selectedValidation.upkp}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Status Laporan</p>
                  {getStatusBadge(selectedValidation.status)}
                </div>
              </div>

              {/* Data Timbangan & Transaksi */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Nomor SKRD</p>
                    <p className="text-sm font-mono font-bold text-gray-900">{selectedValidation.skrd}</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Waktu Input</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.tanggal}, {selectedValidation.waktu}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 grid grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Jenis Sampah</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.jenis}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Kendaraan</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.kendaraan}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Berat Kotor (Gross)</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.beratKotor} Kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Berat Kosong (Tara)</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.beratKosong} Kg</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-900">Berat Bersih (Netto)</p>
                  <p className="text-xl font-black text-[#14CC99]">{selectedValidation.beratBersih} Kg</p>
                </div>
                
                <div className="p-4 rounded-2xl border border-gray-100 bg-white grid grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Harga per Kg</p>
                    <p className="text-sm font-bold text-gray-900">Rp {selectedValidation.hargaPerKg}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Metode Pembayaran</p>
                    <p className="text-sm font-bold text-gray-900">{selectedValidation.metode}</p>
                  </div>
                  <div className="col-span-2 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-sm font-bold text-gray-900">Estimasi Tagihan</p>
                    <p className="text-lg font-black text-[#14CC99]">{selectedValidation.estimasi}</p>
                  </div>
                </div>
              </div>

              {/* Verifikasi / Rejection Note Display */}
              {(selectedValidation.status === "Gagal" || selectedValidation.status === "Lunas") && (
                <div className={`p-4 border rounded-2xl ${selectedValidation.status === "Gagal" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`text-xs font-bold flex items-center gap-1.5 ${selectedValidation.status === "Gagal" ? "text-red-700" : "text-emerald-700"}`}>
                      {selectedValidation.status === "Gagal" ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      Informasi Verifikasi
                    </p>
                    <div className="text-right">
                      <p className={`text-[11px] font-semibold ${selectedValidation.status === "Gagal" ? "text-red-600" : "text-emerald-600"}`}>{selectedValidation.adminName}</p>
                      <p className={`text-[10px] ${selectedValidation.status === "Gagal" ? "text-red-500" : "text-emerald-500"}`}>{selectedValidation.verificationDate}</p>
                    </div>
                  </div>
                  
                  {selectedValidation.adminNote && (
                    <div className={`mt-2 pt-2 border-t ${selectedValidation.status === "Gagal" ? "border-red-200" : "border-emerald-200"}`}>
                      <p className="text-[11px] font-semibold text-gray-500 mb-1">Catatan Admin:</p>
                      <p className={`text-sm font-medium leading-relaxed ${selectedValidation.status === "Gagal" ? "text-red-600" : "text-emerald-700"}`}>
                        {selectedValidation.adminNote}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Form Input Catatan Verifikasi */}
              {selectedValidation.status === "Menunggu Verifikasi" && (
                <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-2xl">
                  <label className="block text-xs font-bold text-blue-900 mb-2">
                    Catatan Verifikasi <span className="font-medium text-blue-700">(Opsional untuk Setuju, Wajib untuk Tolak)</span>
                  </label>
                  <textarea 
                    value={rejectionNote}
                    onChange={(e) => setRejectionNote(e.target.value)}
                    placeholder="Misal: Data sudah sesuai, atau bukti foto buram..."
                    className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-24"
                  />
                </div>
              )}

            </div>

            {/* Footer Modal Actions */}
            {selectedValidation.status === "Menunggu Verifikasi" && (
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button 
                  onClick={handleRejectReport}
                  disabled={isProcessing || !rejectionNote.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                  title={!rejectionNote.trim() ? "Isi catatan terlebih dahulu untuk menolak" : ""}
                >
                  <XCircle className="w-4 h-4" /> Tolak Laporan
                </button>
                <button 
                  onClick={handleAcceptReport}
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#14CC99] text-white font-bold text-sm rounded-xl hover:bg-[#12b589] transition-colors shadow-md shadow-[#14CC99]/20 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Setujui (Lunas)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
