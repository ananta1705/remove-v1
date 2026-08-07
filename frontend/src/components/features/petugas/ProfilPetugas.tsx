"use client";

import { useState, useEffect } from "react";
import { 
  User, Mail, Phone, MapPin, BadgeCheck, Edit, Key,
  LogOut, Bell, ChevronRight, Activity, Calendar, Clock, ArrowUpRight,
  AlertCircle, RefreshCcw, CheckCircle2, Loader2, X, Eye, EyeOff
} from "lucide-react";

// --- Mock Initial Data ---
const performance = {
  totalInput: 1248,
  pencapaian: "+12.5%",
  targetMingguan: {
    current: 34,
    total: 40
  }
};
// -----------------

export function ProfilPetugas() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Data State
  const [petugasData, setPetugasData] = useState({
    nama: "Ahmad Sukarjo",
    nip: "19850612 201001 1 004",
    upkp: "Purwokerto Selatan",
    telepon: "+62 812 3456 7890",
    email: "ahmad.sukarjo@remove.com",
    role: "Petugas Lapangan",
    shift: "Pagi",
    bergabung: "Januari 2026",
    status: "Aktif",
    verifikasi: "Terverifikasi"
  });

  // Modal States
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Form States
  const [editForm, setEditForm] = useState({ nama: '', telepon: '', email: '' });
  const [passForm, setPassForm] = useState({ old: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [notifForm, setNotifForm] = useState({ push: true, email: false });

  // Action States
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleRetry = () => {
    setIsPageLoading(true);
    setHasError(false);
    setTimeout(() => setIsPageLoading(false), 600);
  };

  const openEditModal = () => {
    setEditForm({ nama: petugasData.nama, telepon: petugasData.telepon, email: petugasData.email });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setPetugasData({ ...petugasData, ...editForm });
      setIsSaving(false);
      setIsEditModalOpen(false);
      triggerToast("Profil berhasil diperbarui!");
    }, 1000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsPasswordModalOpen(false);
      setPassForm({ old: '', new: '', confirm: '' });
      triggerToast("Kata sandi berhasil diubah!");
    }, 1000);
  };

  const handleSaveNotif = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsNotifModalOpen(false);
      triggerToast("Pengaturan notifikasi disimpan!");
    }, 1000);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  if (isPageLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        </div>
        <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        <div className="h-24 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Gagal Memuat Profil</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          Terjadi kesalahan koneksi saat mencoba mengambil data profil Anda. Silakan periksa koneksi dan coba lagi.
        </p>
        <button onClick={handleRetry} className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
          <RefreshCcw className="w-4 h-4" /> Coba Lagi
        </button>
      </div>
    );
  }

  const targetProgress = Math.round((performance.targetMingguan.current / performance.targetMingguan.total) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300 relative">
      
      {/* GLOBAL TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border border-[#10b981]/20 rounded-xl shadow-xl px-5 py-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Berhasil</p>
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage("")} className="ml-4 text-gray-400 hover:text-gray-600 dark:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MODAL 1: EDIT PROFIL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => !isSaving && setIsEditModalOpen(false)}>
          <form onSubmit={handleSaveEdit} className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Informasi Pribadi</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 p-1 bg-gray-50 dark:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Nama Lengkap</label>
                <input 
                  type="text" required
                  value={editForm.nama} onChange={e => setEditForm({...editForm, nama: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Nomor Telepon</label>
                <input 
                  type="text" required
                  value={editForm.telepon} onChange={e => setEditForm({...editForm, telepon: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Alamat Email</label>
                <input 
                  type="email" required
                  value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
                />
              </div>
              
              <div className="pt-2">
                <p className="text-[11px] font-medium text-gray-400 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Data NIP dan UPKP diatur oleh Admin. Hubungi Admin Pusat jika ada kesalahan data kepegawaian.
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button type="button" onClick={() => setIsEditModalOpen(false)} disabled={isSaving} className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">Batal</button>
              <button type="submit" disabled={isSaving} className="flex-1 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Data"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: UBAH KATA SANDI */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => !isSaving && setIsPasswordModalOpen(false)}>
          <form onSubmit={handleSavePassword} className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl max-w-sm w-full p-6 sm:p-8 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Ubah Kata Sandi</h3>
              <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 p-1 bg-gray-50 dark:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Kata Sandi Lama</label>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} required
                    value={passForm.old} onChange={e => setPassForm({...passForm, old: e.target.value})}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Kata Sandi Baru</label>
                <input 
                  type={showPass ? "text" : "password"} required minLength={6}
                  value={passForm.new} onChange={e => setPassForm({...passForm, new: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Konfirmasi Kata Sandi Baru</label>
                <input 
                  type={showPass ? "text" : "password"} required minLength={6}
                  value={passForm.confirm} onChange={e => setPassForm({...passForm, confirm: e.target.value})}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 transition-all ${passForm.confirm && passForm.new !== passForm.confirm ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700 focus:border-[#10b981] focus:ring-[#10b981]'}`}
                />
                {passForm.confirm && passForm.new !== passForm.confirm && (
                  <p className="text-[11px] font-bold text-red-500">Kata sandi tidak cocok</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button type="button" onClick={() => setIsPasswordModalOpen(false)} disabled={isSaving} className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">Batal</button>
              <button type="submit" disabled={isSaving || (passForm.new !== passForm.confirm)} className="flex-1 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Perbarui"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: PENGATURAN NOTIFIKASI */}
      {isNotifModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => !isSaving && setIsNotifModalOpen(false)}>
          <form onSubmit={handleSaveNotif} className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl max-w-sm w-full p-6 sm:p-8 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Pengaturan Notifikasi</h3>
              <button type="button" onClick={() => setIsNotifModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 p-1 bg-gray-50 dark:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Notifikasi Sistem</h4>
                  <p className="text-[11px] font-medium text-gray-500 mt-0.5">Pemberitahuan dalam aplikasi</p>
                </div>
                <button type="button" onClick={() => setNotifForm({...notifForm, push: !notifForm.push})} className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 border ${notifForm.push ? 'bg-[#10b981] border-[#10b981]' : 'bg-gray-200 dark:bg-slate-700 border-gray-300 dark:border-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifForm.push ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Notifikasi Email</h4>
                  <p className="text-[11px] font-medium text-gray-500 mt-0.5">Laporan rekap harian & mingguan</p>
                </div>
                <button type="button" onClick={() => setNotifForm({...notifForm, email: !notifForm.email})} className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 border ${notifForm.email ? 'bg-[#10b981] border-[#10b981]' : 'bg-gray-200 dark:bg-slate-700 border-gray-300 dark:border-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifForm.email ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button type="submit" disabled={isSaving} className="w-full py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Preferensi"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsLogoutModalOpen(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Konfirmasi Keluar</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin keluar dari akun? Anda perlu masuk kembali untuk mengakses sistem.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER PAGE */}
      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-slate-400 mb-2">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#10b981]">Profil</span>
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Profil Petugas</h1>
        <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">Kelola identitas dan pengaturan akun Anda.</p>
      </div>

      {/* 1. PROFILE HEADER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-md transition-shadow">
        
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
            <span className="text-4xl font-black text-[#10b981]">
              {petugasData.nama.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#10b981] rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm" title={petugasData.verifikasi}>
            <BadgeCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full pt-1">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{petugasData.nama}</h2>
            <span className="inline-flex items-center justify-center px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-[#10b981] text-[11px] font-bold rounded-lg border border-emerald-100 dark:border-emerald-800/50">
              {petugasData.role}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-4">{petugasData.nip}</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[13px] text-gray-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-500">UPKP:</span> {petugasData.upkp}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-500">Shift:</span> {petugasData.shift}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-500">Bergabung Sejak:</span> {petugasData.bergabung}
            </div>
          </div>
        </div>
        
        {/* Edit Button */}
        <div className="shrink-0 mt-4 md:mt-0 w-full md:w-auto">
          <button onClick={openEditModal} className="w-full md:w-auto px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:border-[#10b981] hover:text-[#10b981] hover:shadow-sm transition-all flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" /> Edit Profil
          </button>
        </div>
      </div>

      {/* 2. PERFORMANCE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Total Input</p>
            <Activity className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{performance.totalInput.toLocaleString('id-ID')}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Pencapaian</p>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#10b981] transition-colors" />
          </div>
          <h3 className="text-3xl font-black text-[#10b981]">{performance.pencapaian}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Target Mingguan</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-gray-900 dark:text-white">{performance.targetMingguan.current} / {performance.targetMingguan.total} Laporan</span>
              <span className="text-[#10b981]">{targetProgress}% Selesai</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#10b981] h-2.5 rounded-full relative overflow-hidden transition-all duration-1000" 
                style={{ width: `${targetProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PENGATURAN AKUN */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          Pengaturan Akun
        </h3>
        
        <div className="space-y-3">
          <button onClick={openEditModal} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-[#10b981] hover:shadow-sm transition-all flex items-center justify-between group text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-slate-700 transition-colors">
                <User className="w-5 h-5 text-gray-500 dark:text-slate-400 group-hover:text-[#10b981] transition-colors" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white group-hover:text-[#10b981] transition-colors">Informasi Pribadi</h4>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Ubah data diri, email, dan telepon Anda</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-[#10b981] group-hover:translate-x-1 transition-transform" />
          </button>

          <button onClick={() => setIsPasswordModalOpen(true)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-[#10b981] hover:shadow-sm transition-all flex items-center justify-between group text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-slate-700 transition-colors">
                <Key className="w-5 h-5 text-gray-500 dark:text-slate-400 group-hover:text-[#10b981] transition-colors" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white group-hover:text-[#10b981] transition-colors">Ubah Kata Sandi</h4>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Perbarui kata sandi keamanan Anda</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-[#10b981] group-hover:translate-x-1 transition-transform" />
          </button>

          <button onClick={() => setIsNotifModalOpen(true)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-[#10b981] hover:shadow-sm transition-all flex items-center justify-between group text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-slate-700 transition-colors">
                <Bell className="w-5 h-5 text-gray-500 dark:text-slate-400 group-hover:text-[#10b981] transition-colors" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white group-hover:text-[#10b981] transition-colors">Pengaturan Notifikasi</h4>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Atur preferensi pemberitahuan aplikasi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-[#10b981] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. KELUAR DARI AKUN */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 sm:p-8">
        <button onClick={() => setIsLogoutModalOpen(true)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/10 hover:shadow-sm transition-all flex items-center justify-between group text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center transition-colors">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-red-600 dark:text-red-400">Keluar dari Akun</h4>
              <p className="text-xs font-medium text-red-500/70">Akhiri sesi operasional Anda saat ini</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-300 dark:text-red-800 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
