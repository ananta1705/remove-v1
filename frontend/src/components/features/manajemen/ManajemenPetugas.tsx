"use client";

import { useState } from "react";
import { 
  Search, Filter, Plus, Edit, Trash2, User, Award, 
  TrendingUp, RefreshCcw, Mail, Phone, MapPin, 
  CheckCircle2, X, AlertTriangle, Briefcase, Activity
} from "lucide-react";

// Mock Data
const mockPetugas = [
  { id: 1, nama: "Ananta Puti", nik: "3201010101800001", wilayah: "Pusat", email: "anantaputi.p@remove.com", telepon: "081234567891", status: "Aktif", totalTugas: 154, selesai: 150, pending: 4, rating: 4.8 },
  { id: 2, nama: "Ananta Puti Maharani", nik: "3201010101800002", wilayah: "Utara", email: "anantaputimaharani.s@remove.com", telepon: "081234567892", status: "Aktif", totalTugas: 120, selesai: 115, pending: 5, rating: 4.5 },
  { id: 3, nama: "Mahananta", nik: "3201010101800003", wilayah: "Selatan", email: "mahananta.d@remove.com", telepon: "081234567893", status: "Aktif", totalTugas: 210, selesai: 210, pending: 0, rating: 4.9 },
  { id: 4, nama: "Mahannta", nik: "3201010101800004", wilayah: "Barat", email: "mahannata.f@remove.com", telepon: "081234567894", status: "Nonaktif", totalTugas: 85, selesai: 80, pending: 5, rating: 4.2 },
];

export function ManajemenPetugas() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [filterWilayah, setFilterWilayah] = useState("Semua Wilayah");

  // Modal States
  const [modalType, setModalType] = useState<"NONE" | "DETAIL" | "ADD" | "EDIT" | "DELETE" | "STATUS" | "SUCCESS">("NONE");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const filtered = mockPetugas.filter(p => {
    if (search && !p.nama.toLowerCase().includes(search.toLowerCase()) && !p.nik.includes(search)) return false;
    if (filterStatus !== "Semua Status" && p.status !== filterStatus) return false;
    if (filterWilayah !== "Semua Wilayah" && p.wilayah !== filterWilayah) return false;
    return true;
  });

  const openModal = (type: any, user: any = null) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("NONE");
    setSelectedUser(null);
  };

  const handleSimulateAction = (message: string) => {
    setModalType("SUCCESS");
    setSuccessMessage(message);
    setTimeout(() => closeModal(), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Petugas</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Kelola data petugas lapangan serta pantau kinerja operasional mereka.</p>
        </div>
        <button 
          onClick={() => openModal("ADD")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#10b981] text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          Tambah Petugas
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Petugas", value: "4", icon: User, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Petugas Aktif", value: "3", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Petugas Nonaktif", value: "1", icon: AlertTriangle, color: "text-gray-500 dark:text-slate-400", bg: "bg-gray-100 dark:bg-slate-800" },
          { label: "Tugas Hari Ini", value: "34", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Rata-rata Rating", value: "4.6", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama atau NIK petugas..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer text-gray-600 dark:text-slate-300 font-medium"
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={filterWilayah} onChange={e => setFilterWilayah(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer text-gray-600 dark:text-slate-300 font-medium"
            >
              <option>Semua Wilayah</option>
              <option>Pusat</option>
              <option>Utara</option>
              <option>Selatan</option>
              <option>Barat</option>
            </select>
          </div>
          <button
            onClick={() => { setSearch(""); setFilterStatus("Semua Status"); setFilterWilayah("Semua Wilayah"); }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-emerald-600 transition-colors px-3"
          >
            <RefreshCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Petugas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-all relative overflow-hidden group">
            {/* Header / Basic Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-xl border-2 border-white shadow-sm">
                {p.nama.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{p.nama}</h3>
                <p className="text-[10px] font-mono text-gray-500 dark:text-slate-400 mt-1">{p.nik}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold ${p.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & UPKP */}
            <div className="space-y-1.5 mb-5 border-t border-gray-50 pt-3">
              <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {p.wilayah}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {p.email}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {p.telepon}</p>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-gray-50 dark:bg-slate-800 p-2.5 rounded-xl text-center">
                <p className="text-xs text-gray-500 dark:text-slate-400">Tugas Selesai</p>
                <p className="font-bold text-gray-900 dark:text-white mt-0.5">{p.selesai}</p>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl text-center">
                <p className="text-xs text-amber-600">Rating</p>
                <p className="font-bold text-amber-600 mt-0.5 flex justify-center items-center gap-1"><Award className="w-3.5 h-3.5"/> {p.rating}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 border-t border-gray-100 dark:border-slate-800 pt-4">
              <button onClick={() => openModal("DETAIL", p)} className="flex-1 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors">
                Detail
              </button>
              <div className="flex gap-1.5">
                <button onClick={() => openModal("EDIT", p)} className="p-2 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors tooltip" title="Edit">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => openModal("STATUS", p)} className="p-2 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-colors tooltip" title="Ubah Status">
                  <Activity className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => openModal("DELETE", p)} className="p-2 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors tooltip" title="Hapus">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ALL MODALS */}

      {/* 1. Modal Detail Petugas */}
      {modalType === "DETAIL" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="bg-emerald-50 p-6 flex flex-col items-center relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-emerald-600/50 hover:text-emerald-600 bg-white dark:bg-slate-900 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg mb-3">
                {selectedUser.nama.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedUser.nama}</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold mt-1 ${selectedUser.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600 dark:text-slate-300'}`}>{selectedUser.status} Akun</span>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Informasi Kontak</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">NIP</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedUser.nik}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">UPKP</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedUser.wilayah}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Telepon</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedUser.telepon}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Email</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedUser.email}</p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Kinerja</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl text-center border border-gray-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">Selesai</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white">{selectedUser.selesai}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl text-center border border-amber-100">
                  <p className="text-[10px] font-bold text-amber-600 uppercase">Pending</p>
                  <p className="text-xl font-black text-amber-600">{selectedUser.pending}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl text-center border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">Rating</p>
                  <p className="text-xl font-black text-emerald-600">{selectedUser.rating}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => openModal("EDIT", selectedUser)} className="flex-1 py-3 bg-[#10b981] text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20">Edit Data</button>
                <button onClick={closeModal} className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Add / Edit Petugas */}
      {(modalType === "ADD" || modalType === "EDIT") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-xl w-full p-6 lg:p-8 animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:text-slate-300"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{modalType === "ADD" ? "Tambah Petugas Baru" : "Edit Data Petugas"}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{modalType === "ADD" ? "Lengkapi formulir berikut untuk mendaftarkan petugas." : "Ubah informasi petugas di bawah ini."}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Nama Lengkap</label>
                <input type="text" defaultValue={selectedUser?.nama} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">NIP</label>
                <input type="text" defaultValue={selectedUser?.nik} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Telepon</label>
                <input type="text" defaultValue={selectedUser?.telepon} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Email</label>
                <input type="email" defaultValue={selectedUser?.email} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Area Penugasan (UPKP)</label>
                <select defaultValue={selectedUser?.wilayah} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none">
                  <option>Pusat</option><option>Utara</option><option>Selatan</option><option>Barat</option><option>Timur</option>
                </select>
              </div>
              {modalType === "ADD" && (
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Password Sementara</label>
                  <input type="password" placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => handleSimulateAction(modalType === "ADD" ? "Petugas baru berhasil ditambahkan!" : "Perubahan data berhasil disimpan!")} className="flex-1 py-3 bg-[#10b981] text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20">Simpan Data</button>
              <button onClick={closeModal} className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Konfirmasi (Status & Delete) */}
      {(modalType === "STATUS" || modalType === "DELETE") && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${modalType === 'DELETE' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
              {modalType === "DELETE" ? <Trash2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Konfirmasi Aksi</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
              {modalType === "DELETE" 
                ? `Apakah Anda yakin ingin menghapus data petugas bernama ${selectedUser.nama}? Tindakan ini tidak dapat dibatalkan.` 
                : `Apakah Anda yakin ingin mengubah status akun ${selectedUser.nama} menjadi ${selectedUser.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}?`}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleSimulateAction(modalType === "DELETE" ? "Data petugas berhasil dihapus." : "Status petugas berhasil diubah.")} 
                className={`flex-1 py-3 text-white text-sm font-bold rounded-xl transition-colors shadow-md ${modalType === 'DELETE' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-[#10b981] hover:bg-emerald-600 shadow-emerald-500/20'}`}
              >
                {modalType === "DELETE" ? "Hapus" : "Ya, Ubah Status"}
              </button>
              <button onClick={closeModal} className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700">Batal</button>
            </div>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Berhasil!</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">{successMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}
