"use client";

import { Search, Filter, Download, Eye, Edit, Trash2, Users, FileText, User, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ManajemenData() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"laporan" | "pengguna">("laporan");

  const reports = [
    { 
      id: "LP-089", 
      warga: "Ahmad Fauzi",
      lokasi: "Jl. Gatot Subroto No. 23",
      jenis: "Organik",
      status: "Selesai",
      tanggal: "25 Mar 2026",
      petugas: "Rudi H."
    },
    { 
      id: "LP-088", 
      warga: "Siti Nurhaliza",
      lokasi: "Jl. Diponegoro No. 45",
      jenis: "Anorganik",
      status: "Diproses",
      tanggal: "25 Mar 2026",
      petugas: "Ahmad F."
    },
    { 
      id: "LP-087", 
      warga: "Bambang Wijaya",
      lokasi: "Jl. Ahmad Yani No. 12",
      jenis: "B3",
      status: "Menunggu",
      tanggal: "24 Mar 2026",
      petugas: "-"
    },
    { 
      id: "LP-086", 
      warga: "Dewi Kartika",
      lokasi: "Jl. Sudirman No. 67",
      jenis: "Campuran",
      status: "Selesai",
      tanggal: "24 Mar 2026",
      petugas: "Rudi H."
    },
  ];

  const users = [
    {
      id: 1,
      nama: "Ahmad Fauzi",
      email: "ahmad.fauzi@email.com",
      role: "Warga",
      totalLaporan: 12,
      poin: 1250,
      status: "Aktif"
    },
    {
      id: 2,
      nama: "Rudi Hartono",
      email: "rudi.h@email.com",
      role: "Petugas",
      totalLaporan: 48,
      poin: 0,
      status: "Aktif"
    },
    {
      id: 3,
      nama: "Siti Nurhaliza",
      email: "siti.n@email.com",
      role: "Warga",
      totalLaporan: 8,
      poin: 850,
      status: "Aktif"
    },
    {
      id: 4,
      nama: "Bambang Wijaya",
      email: "bambang.w@email.com",
      role: "Warga",
      totalLaporan: 5,
      poin: 520,
      status: "Nonaktif"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
      case "Aktif":
        return "bg-green-50 text-green-600";
      case "Diproses":
        return "bg-blue-50 text-blue-600";
      case "Menunggu":
        return "bg-yellow-50 text-yellow-600";
      case "Nonaktif":
        return "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300";
      default:
        return "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 dark:text-white mb-1">Manajemen Data</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Kelola data laporan dan pengguna</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("laporan")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
            activeTab === "laporan"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:text-white"
          }`}
        >
          <FileText className="w-5 h-5" />
          Laporan
        </button>
        <button
          onClick={() => setActiveTab("pengguna")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
            activeTab === "pengguna"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:text-white"
          }`}
        >
          <Users className="w-5 h-5" />
          Pengguna
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === "laporan" ? "Cari laporan..." : "Cari pengguna..."}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
          />
        </div>
        <button className="bg-white/70 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl hover:bg-white dark:bg-slate-900 transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-slate-300" />
          <span className="text-gray-700 dark:text-slate-200">Filter</span>
        </button>
        <button className="bg-[#22C55E] text-white px-6 py-3 rounded-xl hover:bg-[#16a34a] transition-colors flex items-center gap-2 shadow-sm">
          <Download className="w-5 h-5" />
          Export
        </button>
        {activeTab === "pengguna" && (
          <button
            className="bg-[#14CC99] text-white px-6 py-3 rounded-xl hover:bg-[#12b589] transition-colors flex items-center gap-2 shadow-sm"
            onClick={() => router.push("/admin/pengguna/tambah")}
          >
            <Plus className="w-5 h-5" />
            Tambah Pengguna
          </button>
        )}
      </div>

      {/* Data Table */}
      {activeTab === "laporan" ? (
        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Warga</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Lokasi</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Jenis</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Petugas</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:bg-slate-800">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{report.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{report.warga}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{report.lokasi}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{report.jenis}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{report.petugas}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{report.tanggal}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-slate-800">
            <p className="text-sm text-gray-600 dark:text-slate-300">Menampilkan 1-4 dari 89 data</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">
                Sebelumnya
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">2</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">3</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Nama</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Total Laporan</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Poin</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-slate-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:bg-slate-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{user.nama}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        user.role === "Petugas" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.totalLaporan}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.poin}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-slate-800">
            <p className="text-sm text-gray-600 dark:text-slate-300">Menampilkan 1-4 dari 124 pengguna</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">
                Sebelumnya
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">2</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">3</button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-200 transition-colors">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}