"use client";

import { Bell, CheckCircle2, AlertCircle, Info, Trash2, CheckCheck, Trash } from "lucide-react";
import { useState } from "react";

export function NotifikasiPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Laporan TKT-001-A Disetujui",
      message: "Admin Joko Widodo telah menyetujui laporan Anda. Pembayaran berhasil diproses.",
      time: "5 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Laporan TKT-004-D Ditolak",
      message: "Laporan ditolak. Catatan Admin: Bukti foto resi timbangan buram dan tidak terbaca. Mohon konfirmasi ulang.",
      time: "15 menit yang lalu",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Informasi Tambahan Diperlukan",
      message: "Admin meminta informasi tambahan untuk tiket TKT-003-C. Mohon pastikan data sesuai.",
      time: "30 menit yang lalu",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Laporan TKT-002-B Disetujui",
      message: "Admin Budi Gunawan telah menyetujui laporan Anda.",
      time: "1 jam yang lalu",
      read: true,
    },
    {
      id: 5,
      type: "warning",
      title: "Laporan Menunggu Verifikasi",
      message: "Laporan TKT-005-E sedang dalam antrean verifikasi Admin.",
      time: "2 jam yang lalu",
      read: true,
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertCircle;
      case "success": return CheckCircle2;
      case "info": return Info;
      default: return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
      case "success": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
      case "info": return "text-blue-500 bg-blue-50 dark:bg-blue-500/10";
      default: return "text-gray-500 bg-gray-50 dark:bg-gray-800";
    }
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteAll = () => setNotifications([]);
  const deleteNotif = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const total = notifications.length; 
  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  return (
    <div className="w-full max-w-6xl space-y-6 pb-10">
      
      {/* Header & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifikasi</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Pantau semua aktivitas sistem</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <CheckCheck className="w-4 h-4" /> Tandai Semua Dibaca
          </button>
          <button
            onClick={deleteAll}
            className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" /> Hapus Semua
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Notifikasi */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Total Notifikasi</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{total}</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md shadow-blue-500/20">
            <Bell className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* Belum Dibaca */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Belum Dibaca</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{unreadCount}</p>
          </div>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-md shadow-amber-500/20">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Sudah Dibaca */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Sudah Dibaca</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{readCount}</p>
          </div>
          <div className="w-10 h-10 bg-[#14CC99] rounded-full flex items-center justify-center shadow-md shadow-[#14CC99]/20">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 pt-2">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-gray-400 dark:text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Tidak ada notifikasi</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Saat ini belum ada notifikasi baru untuk Anda.
              </p>
            </div>
          </div>
        ) : (
          notifications.map(notif => {
            const Icon = getIcon(notif.type);
            const iconColorClass = getIconColor(notif.type);
            return (
              <div
                key={notif.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all flex items-start justify-between gap-4 
                  ${!notif.read ? "border-emerald-200 dark:border-emerald-500/30 shadow-[0_2px_10px_-4px_rgba(16,185,129,0.15)]" : "border-gray-100 dark:border-slate-800 shadow-sm"}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 mt-0.5">
                    <p className={`text-[15px] font-bold ${!notif.read ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-slate-300"}`}>
                      {notif.title}
                    </p>
                    <p className="text-[13px] text-gray-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                      {notif.message}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400 dark:text-slate-500 pt-1">
                      {notif.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-1">
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  )}
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                      title="Tandai dibaca"
                    >
                      <CheckCheck className="w-[18px] h-[18px]" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

