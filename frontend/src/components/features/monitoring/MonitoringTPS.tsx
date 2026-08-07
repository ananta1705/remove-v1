"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Search, Filter, Download, BarChart2, CheckCircle2, 
  AlertCircle, FileText, MapPin, Eye, ArrowUpRight,
  Plus, Edit, Trash2, Database, Loader2
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { DetailTPSModal } from "@/components/features/monitoring/DetailTPSModal";
import { TambahTPSModal } from "@/components/features/monitoring/TambahTPSModal";
import { EditTPSModal } from "@/components/features/monitoring/EditTPSModal";
import { DeleteTPSModal } from "@/components/features/monitoring/DeleteTPSModal";

const MapComponent = dynamic(() => import("@/components/features/monitoring/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-100 dark:bg-slate-800 flex items-center justify-center animate-pulse rounded-2xl">Memuat Peta...</div>
});

export function MonitoringTPS() {
  const [activeTab, setActiveTab] = useState<"operasional" | "manajemen">("operasional");
  
  // States for Operasional Filters
  const [searchQueryOps, setSearchQueryOps] = useState("");
  const [filterUPKPOps, setFilterUPKPOps] = useState("Semua UPKP");
  const [filterJenisSampahOps, setFilterJenisSampahOps] = useState("Semua Jenis Sampah");
  const [filterDateOps, setFilterDateOps] = useState("Semua Waktu");

  // Pagination States
  const [opsPage, setOpsPage] = useState(1);
  const [masterPage, setMasterPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [selectedTPS, setSelectedTPS] = useState<any>(null);
  const [searchQueryMaster, setSearchQueryMaster] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [editingTPS, setEditingTPS] = useState<any>(null);
  const [deletingTPS, setDeletingTPS] = useState<any>(null);
  const [selectedMapTPS, setSelectedMapTPS] = useState<number | null>(null);

  // Master TPS Data Reference
  const [tpsMasterData, setTpsMasterData] = useState([
    {
      id: 1,
      name: "TPS Purwokerto Selatan",
      address: "Jl. Pahlawan No. 45",
      upkp: "UPKP Wilayah Selatan",
      coordinates: { x: 33.3, y: 50 },
      active: true,
      status: "Normal",
    },
    {
      id: 2,
      name: "TPS Diponegoro",
      address: "Jl. Diponegoro No. 23",
      upkp: "UPKP Wilayah Timur",
      coordinates: { x: 66.6, y: 40 },
      active: true,
      status: "Normal",
    },
    {
      id: 3,
      name: "TPS Ahmad Yani",
      address: "Jl. Ahmad Yani No. 67",
      upkp: "UPKP Wilayah Barat",
      coordinates: { x: 50, y: 70 },
      active: true,
      status: "Normal",
    },
    {
      id: 4,
      name: "TPS Sudirman",
      address: "Jl. Sudirman No. 12",
      upkp: "UPKP Wilayah Utara",
      coordinates: { x: 75, y: 60 },
      active: false,
      status: "Tidak Aktif",
    },
    {
      id: 5,
      name: "TPS Gatot Subroto",
      address: "Jl. Gatot Subroto No. 89",
      upkp: "UPKP Wilayah Pusat",
      coordinates: { x: 40, y: 45 },
      active: true,
      status: "Normal",
    },
  ]);

  // Operational Transactions Inputted by Petugas (Linked via tpsId)
  const [wasteTransactions] = useState([
    { id: "TKT-2026-001", tpsId: 1, date: "18 Jul 2026, 14:30", jenisSampah: "Sampah Organik", weightKg: 450, petugas: "Budi Santoso", status: "Selesai" },
    { id: "TKT-2026-002", tpsId: 1, date: "18 Jul 2026, 11:15", jenisSampah: "Sampah Murni", weightKg: 320, petugas: "Budi Santoso", status: "Selesai" },
    { id: "TKT-2026-003", tpsId: 1, date: "17 Jul 2026, 16:45", jenisSampah: "Sampah Anorganik", weightKg: 180, petugas: "Ahmad Yani", status: "Selesai" },
    { id: "TKT-2026-004", tpsId: 1, date: "16 Jul 2026, 09:30", jenisSampah: "Residu", weightKg: 95, petugas: "Ahmad Yani", status: "Selesai" },
    { id: "TKT-2026-005", tpsId: 2, date: "18 Jul 2026, 13:10", jenisSampah: "Sampah Organik", weightKg: 510, petugas: "Siti Aminah", status: "Selesai" },
    { id: "TKT-2026-006", tpsId: 2, date: "18 Jul 2026, 09:20", jenisSampah: "Bahan RDF", weightKg: 280, petugas: "Siti Aminah", status: "Selesai" },
    { id: "TKT-2026-007", tpsId: 2, date: "17 Jul 2026, 15:40", jenisSampah: "Sampah Murni", weightKg: 420, petugas: "Joko Widodo", status: "Selesai" },
    { id: "TKT-2026-008", tpsId: 3, date: "18 Jul 2026, 10:00", jenisSampah: "Sampah Organik", weightKg: 380, petugas: "Maman", status: "Selesai" },
    { id: "TKT-2026-009", tpsId: 3, date: "17 Jul 2026, 14:15", jenisSampah: "Bahan RDF", weightKg: 210, petugas: "Maman", status: "Selesai" },
    { id: "TKT-2026-010", tpsId: 5, date: "18 Jul 2026, 16:45", jenisSampah: "Sampah Murni", weightKg: 650, petugas: "Supriadi", status: "Selesai" },
    { id: "TKT-2026-011", tpsId: 5, date: "18 Jul 2026, 08:30", jenisSampah: "Sampah Organik", weightKg: 490, petugas: "Supriadi", status: "Selesai" },
    { id: "TKT-2026-012", tpsId: 5, date: "17 Jul 2026, 11:20", jenisSampah: "Residu", weightKg: 140, petugas: "Supriadi", status: "Selesai" },
  ]);

  // Filter Logic helper for Transactions
  const filterTransaction = (t: typeof wasteTransactions[0]) => {
    if (filterJenisSampahOps !== "Semua Jenis Sampah" && t.jenisSampah !== filterJenisSampahOps) {
      return false;
    }
    if (filterDateOps === "Hari Ini" && !t.date.includes("18 Jul 2026")) {
      return false;
    }
    if (filterDateOps === "7 Hari Terakhir" && !t.date.includes("Jul 2026")) {
      return false;
    }
    return true;
  };

  // Combine Master TPS with dynamic Operational Transaction aggregations
  const operationalTPSList = tpsMasterData.map(master => {
    const tpsTx = wasteTransactions.filter(t => t.tpsId === master.id && filterTransaction(t));
    const totalWeightKg = tpsTx.reduce((sum, t) => sum + t.weightKg, 0);
    const totalVolumeTon = Number((totalWeightKg / 1000).toFixed(2));
    const lastTx = tpsTx[0];
    
    return {
      ...master,
      totalTransactions: tpsTx.length,
      totalVolume: totalVolumeTon,
      lastActivity: lastTx ? lastTx.date : "Tidak Ada Aktivitas",
      statusAktivitas: tpsTx.length > 0 ? "Ada Aktivitas" : "Tidak Ada Aktivitas",
      transactions: tpsTx,
    };
  });

  // Filtered Operational List based on Search & UPKP
  const filteredOpsTPS = operationalTPSList.filter(tps => {
    const matchesSearch = tps.name.toLowerCase().includes(searchQueryOps.toLowerCase()) || 
                          tps.upkp.toLowerCase().includes(searchQueryOps.toLowerCase());
    const matchesUPKP = filterUPKPOps === "Semua UPKP" || tps.upkp === filterUPKPOps;
    return matchesSearch && matchesUPKP;
  });

  // Filtered Master List for Master Data TPS tab
  const filteredMasterTPS = tpsMasterData.filter(tps => 
    tps.name.toLowerCase().includes(searchQueryMaster.toLowerCase()) || 
    tps.upkp.toLowerCase().includes(searchQueryMaster.toLowerCase())
  );

  // Overall Dashboard Summaries derived dynamically
  const activeTPSCount = filteredOpsTPS.filter(t => t.statusAktivitas === "Ada Aktivitas").length;
  const totalVolumeSum = Number(filteredOpsTPS.reduce((sum, t) => sum + t.totalVolume, 0).toFixed(1));
  const totalTransactionsSum = filteredOpsTPS.reduce((sum, t) => sum + t.totalTransactions, 0);
  const todayTransactionsCount = wasteTransactions.filter(t => t.date.includes("18 Jul 2026") && filterTransaction(t)).length;

  // Dynamic Chart Data Calculations
  const trendData = [
    { date: "12 Jul", volume: 12.4 },
    { date: "13 Jul", volume: 14.8 },
    { date: "14 Jul", volume: 15.2 },
    { date: "15 Jul", volume: 18.0 },
    { date: "16 Jul", volume: 16.5 },
    { date: "17 Jul", volume: 21.3 },
    { date: "18 Jul", volume: Number((totalVolumeSum || 19.5).toFixed(1)) },
  ];

  // SDD Waste Categories Composition breakdown
  const sddCategories = [
    { name: "Sampah Organik", color: "#14CC99" },
    { name: "Sampah Murni", color: "#10B981" },
    { name: "Sampah Anorganik", color: "#3B82F6" },
    { name: "Bahan RDF", color: "#F59E0B" },
    { name: "Residu", color: "#EF4444" },
  ];

  const totalFilteredWeight = wasteTransactions.filter(filterTransaction).reduce((acc, t) => acc + t.weightKg, 0);

  const compositionData = sddCategories.map(cat => {
    const catWeight = wasteTransactions.filter(t => filterTransaction(t) && t.jenisSampah === cat.name).reduce((acc, t) => acc + t.weightKg, 0);
    const value = totalFilteredWeight > 0 ? Math.round((catWeight / totalFilteredWeight) * 100) : 20;
    return { name: cat.name, value, color: cat.color };
  });

  // Pagination Logic
  const totalOpsPages = Math.ceil(filteredOpsTPS.length / itemsPerPage) || 1;
  const paginatedOpsTPS = filteredOpsTPS.slice((opsPage - 1) * itemsPerPage, opsPage * itemsPerPage);

  const totalMasterPages = Math.ceil(filteredMasterTPS.length / itemsPerPage) || 1;
  const paginatedMasterTPS = filteredMasterTPS.slice((masterPage - 1) * itemsPerPage, masterPage * itemsPerPage);

  // Reset Filters
  const handleResetFiltersOps = () => {
    setSearchQueryOps("");
    setFilterUPKPOps("Semua UPKP");
    setFilterJenisSampahOps("Semua Jenis Sampah");
    setFilterDateOps("Semua Waktu");
    setOpsPage(1);
  };

  // Handlers for Manajemen Master TPS
  const handleSaveTPS = (data: any) => {
    const newTPS = {
      id: Date.now(),
      name: data.nama,
      address: data.alamat,
      upkp: "UPKP Wilayah Pusat",
      coordinates: { x: Number(data.koordinatX), y: Number(data.koordinatY) },
      active: data.status !== "Tidak Aktif",
      status: data.status,
    };
    setTpsMasterData((prev) => [...prev, newTPS]);
    alert("Data TPS berhasil ditambahkan ke Master Data!");
    setIsModalOpen(false);
  };

  const handleEditTPS = (tps: any) => {
    setEditingTPS(tps);
    setIsEditModalOpen(true);
  };

  const handleUpdateTPS = (data: any) => {
    setTpsMasterData((prev) =>
      prev.map((tps) =>
        tps.id === editingTPS.id
          ? {
              ...tps,
              name: data.nama,
              address: data.alamat,
              coordinates: { x: Number(data.koordinatX), y: Number(data.koordinatY) },
              active: data.status !== "Tidak Aktif",
              status: data.status,
            }
          : tps
      )
    );
    alert("Master data TPS berhasil diperbarui!");
    setIsEditModalOpen(false);
    setEditingTPS(null);
  };

  const handleDeleteTPS = (tps: any) => {
    setDeletingTPS(tps);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTPS = () => {
    if (deletingTPS) {
      setTpsMasterData(prev => prev.filter(tps => tps.id !== deletingTPS.id));
      setIsDeleteModalOpen(false);
      setDeletingTPS(null);
    }
  };

  // Export CSV Functionality
  const handleConfirmExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Build CSV string from filteredOpsTPS
      const headers = ["ID TPS", "Nama TPS", "UPKP", "Alamat", "Total Transaksi", "Total Volume (Ton)", "Aktivitas Terakhir", "Status Aktivitas"];
      const rows = filteredOpsTPS.map(t => [
        t.id,
        `"${t.name}"`,
        `"${t.upkp}"`,
        `"${t.address}"`,
        t.totalTransactions,
        t.totalVolume,
        `"${t.lastActivity}"`,
        `"${t.statusAktivitas}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Laporan_Operasional_TPS_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setIsExportModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monitoring & Data TPS</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Sistem Informasi Pengelolaan Sampah Operasional - Monitoring Transaksi & Master TPS.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-xl w-full sm:w-fit border border-gray-200/50 dark:border-slate-700/50">
          <button
            onClick={() => setActiveTab("operasional")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "operasional"
                ? "bg-white dark:bg-slate-900 text-[#14CC99] shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Monitoring Aktivitas TPS
          </button>
          <button
            onClick={() => setActiveTab("manajemen")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "manajemen"
                ? "bg-white dark:bg-slate-900 text-[#14CC99] shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Database className="w-4 h-4" />
            Master Data TPS
          </button>
        </div>
      </div>

      {activeTab === "operasional" && (
        <div className="space-y-6 animate-fade-in">
          {/* Action & Filter Section */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#14CC99]" /> Filter Aktivitas Operasional
              </h3>
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-[#14CC99] text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-colors text-sm font-semibold shadow-sm"
              >
                <Download className="w-4 h-4" /> Export Laporan Operasional
              </button>
            </div>

            {/* Operational Multi-field Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Cari TPS atau UPKP..."
                  value={searchQueryOps}
                  onChange={(e) => { setSearchQueryOps(e.target.value); setOpsPage(1); }}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all"
                />
              </div>

              {/* Filter UPKP */}
              <select
                value={filterUPKPOps}
                onChange={(e) => { setFilterUPKPOps(e.target.value); setOpsPage(1); }}
                className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all cursor-pointer font-medium text-gray-700 dark:text-slate-200"
              >
                <option value="Semua UPKP">Semua UPKP</option>
                <option value="UPKP Wilayah Selatan">UPKP Wilayah Selatan</option>
                <option value="UPKP Wilayah Timur">UPKP Wilayah Timur</option>
                <option value="UPKP Wilayah Barat">UPKP Wilayah Barat</option>
                <option value="UPKP Wilayah Utara">UPKP Wilayah Utara</option>
                <option value="UPKP Wilayah Pusat">UPKP Wilayah Pusat</option>
              </select>

              {/* Filter Jenis Sampah (SDD Categories) */}
              <select
                value={filterJenisSampahOps}
                onChange={(e) => { setFilterJenisSampahOps(e.target.value); setOpsPage(1); }}
                className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all cursor-pointer font-medium text-gray-700 dark:text-slate-200"
              >
                <option value="Semua Jenis Sampah">Semua Jenis Sampah</option>
                <option value="Sampah Murni">Sampah Murni</option>
                <option value="Sampah Organik">Sampah Organik</option>
                <option value="Sampah Anorganik">Sampah Anorganik</option>
                <option value="Bahan RDF">Bahan RDF</option>
                <option value="Residu">Residu</option>
              </select>

              {/* Filter Rentang Tanggal */}
              <div className="flex gap-2">
                <select
                  value={filterDateOps}
                  onChange={(e) => { setFilterDateOps(e.target.value); setOpsPage(1); }}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all cursor-pointer font-medium text-gray-700 dark:text-slate-200"
                >
                  <option value="Semua Waktu">Semua Rentang Waktu</option>
                  <option value="Hari Ini">Hari Ini</option>
                  <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                </select>
                <button
                  onClick={handleResetFiltersOps}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap"
                  title="Reset Filter"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-[#14CC99]/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#14CC99]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">TPS Beraktivitas</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeTPSCount} TPS</h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Total Volume Masuk</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalVolumeSum} Ton</h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Total Setoran Transaksi</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalTransactionsSum.toLocaleString('id-ID')}</h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-orange-500/30 transition-colors">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Setoran Hari Ini</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{todayTransactionsCount} Trx</h3>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tren Volume Sampah Operasional</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Pergerakan total volume sampah masuk (Ton) berdasarkan transaksi setoran</p>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14CC99" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14CC99" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-700" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                      itemStyle={{ color: '#14CC99', fontWeight: '500' }}
                    />
                    <Area type="monotone" dataKey="volume" stroke="#14CC99" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Komposisi Jenis Sampah</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Distribusi kategori sampah SDD terakumulasi</p>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={compositionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {compositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: '500' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {compositionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-gray-600 dark:text-slate-300 font-medium truncate">{item.name}</span>
                    <span className="text-[11px] font-bold text-gray-900 dark:text-white ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aktivitas Operasional TPS</h3>
              <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                Menampilkan {paginatedOpsTPS.length} dari {filteredOpsTPS.length} TPS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Nama TPS & UPKP</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-center">Total Transaksi</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-center">Total Volume Sampah</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Aktivitas Terakhir</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Status Aktivitas</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {paginatedOpsTPS.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-slate-400">
                        Tidak ada data operasional TPS yang cocok dengan kriteria filter.
                      </td>
                    </tr>
                  ) : (
                    paginatedOpsTPS.map((tps) => (
                      <tr key={tps.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">{tps.name}</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">{tps.upkp}</div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="font-medium text-gray-700 dark:text-slate-200">{tps.totalTransactions.toLocaleString('id-ID')}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="font-semibold text-gray-900 dark:text-white">{tps.totalVolume}</span>
                          <span className="text-xs text-gray-500 dark:text-slate-400 ml-1">Ton</span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-slate-300">
                          {tps.lastActivity}
                        </td>
                        <td className="py-4 px-6">
                          <span 
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                              tps.statusAktivitas === "Ada Aktivitas" 
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                                : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {tps.statusAktivitas === "Ada Aktivitas" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            {tps.statusAktivitas}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={() => setSelectedTPS(tps)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#14CC99] hover:bg-[#14CC99]/10 rounded-lg transition-colors border border-[#14CC99]/20"
                          >
                            <Eye className="w-3.5 h-3.5" /> Detail Operasional
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalOpsPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 text-xs">
                <span className="text-gray-500 dark:text-slate-400">
                  Halaman {opsPage} dari {totalOpsPages}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={opsPage === 1}
                    onClick={() => setOpsPage(p => p - 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 font-medium text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: totalOpsPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOpsPage(idx + 1)}
                      className={`w-7 h-7 rounded-lg font-bold transition-colors ${
                        opsPage === idx + 1 
                          ? "bg-[#14CC99] text-white" 
                          : "border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    disabled={opsPage === totalOpsPages}
                    onClick={() => setOpsPage(p => p + 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 font-medium text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "manajemen" && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
               <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                  <Database className="w-5 h-5 text-[#14CC99]" />
                  <div className="flex flex-col">
                     <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Total Master Terdaftar</span>
                     <span className="text-sm font-bold text-gray-900 dark:text-white leading-none mt-0.5">{tpsMasterData.length} TPS</span>
                  </div>
               </div>
             </div>
             <button
               onClick={() => setIsModalOpen(true)}
               className="flex items-center justify-center gap-2 bg-[#14CC99] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-500 transition-all shadow-sm text-sm"
             >
               <Plus className="w-4 h-4" /> Tambah Data Master TPS
             </button>
          </div>

          {/* Map visualization retained strictly for Master Data TPS coordinate management */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Peta Master Lokasi TPS</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Pemetaan titik koordinat lokasi untuk pengelolaan Master Data TPS</p>
            <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
              <MapComponent 
                tpsList={filteredMasterTPS}
                selectedTPS={selectedMapTPS}
                onMarkerClick={(id: number | null) => setSelectedMapTPS(id)}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Master TPS</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Cari nama atau UPKP..."
                  value={searchQueryMaster}
                  onChange={(e) => { setSearchQueryMaster(e.target.value); setMasterPage(1); }}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Nama TPS</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Alamat & Koordinat</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">UPKP</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Status Master</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {paginatedMasterTPS.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-slate-400">
                        Data Master TPS tidak ditemukan.
                      </td>
                    </tr>
                  ) : (
                    paginatedMasterTPS.map((tps) => (
                      <tr key={tps.id} className={`hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${selectedMapTPS === tps.id ? 'bg-[#14CC99]/5 dark:bg-[#14CC99]/10' : ''}`}>
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{tps.name}</td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-700 dark:text-slate-200 mb-0.5">{tps.address}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                            <MapPin className="w-3 h-3" /> {tps.coordinates.x}, {tps.coordinates.y}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-slate-300">{tps.upkp}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            tps.active
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                              : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}>
                            {tps.active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            {tps.active ? "Terdaftar Aktif" : "Tidak Aktif"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditTPS(tps)}
                              className="p-2 text-gray-500 hover:text-[#14CC99] hover:bg-[#14CC99]/10 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="Edit TPS"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTPS(tps)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="Hapus TPS"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Master Pagination Controls */}
            {totalMasterPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 text-xs">
                <span className="text-gray-500 dark:text-slate-400">
                  Halaman {masterPage} dari {totalMasterPages}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={masterPage === 1}
                    onClick={() => setMasterPage(p => p - 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 font-medium text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: totalMasterPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMasterPage(idx + 1)}
                      className={`w-7 h-7 rounded-lg font-bold transition-colors ${
                        masterPage === idx + 1 
                          ? "bg-[#14CC99] text-white" 
                          : "border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    disabled={masterPage === totalMasterPages}
                    onClick={() => setMasterPage(p => p + 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 font-medium text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <DetailTPSModal
        isOpen={!!selectedTPS}
        onClose={() => setSelectedTPS(null)}
        tpsData={selectedTPS}
      />
      <TambahTPSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTPS}
      />
      {editingTPS && (
        <EditTPSModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateTPS}
          tpsData={editingTPS}
        />
      )}
      {deletingTPS && (
        <DeleteTPSModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteTPS}
          tpsName={deletingTPS.name}
        />
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => !isExporting && setIsExportModalOpen(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-emerald-50 text-[#14CC99]">
              <Download className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Export Laporan Operasional</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
              Anda akan mengunduh data operasional TPS ini dalam format CSV (compatible dengan Microsoft Excel). Lanjutkan?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleConfirmExport} 
                disabled={isExporting}
                className="flex-1 py-3 bg-[#14CC99] text-white text-sm font-bold rounded-xl hover:bg-[#12b589] transition-colors shadow-md shadow-[#14CC99]/20 flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Export CSV"}
              </button>
              <button 
                onClick={() => setIsExportModalOpen(false)} 
                disabled={isExporting}
                className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700 disabled:opacity-70"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
