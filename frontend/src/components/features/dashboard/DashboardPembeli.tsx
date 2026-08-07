"use client";

import { Coins, TrendingUp, Gift, ShoppingBag, Award, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardPembeli() {
  const router = useRouter();

  const stats = [
    {
      label: "Total Poin",
      value: "2,450",
      change: "+125 poin bulan ini",
      icon: Coins,
      color: "bg-[#22C55E]/10 text-[#22C55E]",
    },
    {
      label: "Sampah Terkumpul",
      value: "48.5 kg",
      change: "+5.2 kg minggu ini",
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Reward Ditukar",
      value: "8",
      change: "3 bulan terakhir",
      icon: Gift,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Komoditas Terpantau",
      value: "4 Jenis",
      change: "Informasi Stok Olahan",
      icon: ShoppingBag,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "collect",
      title: "Sampah Plastik Terverifikasi",
      desc: "2.5 kg • Terdaftar ke TPS",
      date: "Hari ini, 10:30",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      id: 2,
      type: "redeem",
      title: "Verifikasi Data Setoran",
      desc: "500 kg • SKRD Lunas",
      date: "Kemarin, 14:20",
      icon: Gift,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 3,
      type: "shop",
      title: "Pembaruan Stok Kompos",
      desc: "30 Ton • TPST Wilayah Selatan",
      date: "2 hari lalu",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 4,
      type: "collect",
      title: "Sampah Organik Terverifikasi",
      desc: "3.2 kg • Terdaftar ke TPS",
      date: "3 hari lalu",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
  ];

  const quickActions = [
    {
      title: "Tracking Sampah",
      desc: "Lacak pengangkutan sampah",
      icon: TrendingUp,
      color: "bg-blue-500",
      onClick: () => router.push("/pembeli/tracking"),
    },
    {
      title: "Informasi Poin & Edukasi",
      desc: "Pantau kontribusi pengelolaan",
      icon: Coins,
      color: "bg-[#22C55E]",
      onClick: () => router.push("/pembeli/poin"),
    },
    {
      title: "Katalog Stok Olahan",
      desc: "Informasi ketersediaan RDF & Kompos",
      icon: ShoppingBag,
      color: "bg-purple-500",
      onClick: () => router.push("/pembeli/belanja"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#22C55E] to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">Selamat Datang! 👋</h2>
            <p className="text-green-50 mb-4">
              Mari jaga lingkungan dengan memilah dan mendaur ulang sampah
            </p>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl w-fit">
              <Award className="w-5 h-5" />
              <span>Level: Eco Warrior</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <Coins className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 dark:text-slate-400">{stat.label}</p>
                <div className={`w-10 h-10 ${stat.color.includes('22C55E') ? 'bg-green-500' : stat.color.includes('blue') ? 'bg-blue-500' : stat.color.includes('purple') ? 'bg-purple-500' : 'bg-yellow-500'} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all text-left group"
            >
              <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#22C55E] transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-3">{action.desc}</p>
              <div className="flex items-center gap-2 text-[#22C55E]">
                <span className="text-sm font-medium">Buka</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
          <button className="text-sm text-[#22C55E] hover:text-[#16a34a] font-medium">
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{activity.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}