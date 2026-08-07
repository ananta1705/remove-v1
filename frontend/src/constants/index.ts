export const ROLES = {
  ADMIN: "admin",
  PETUGAS: "petugas",
  PEMBELI: "pembeli",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/",
  REGISTER: "/register",
  REGISTER_PETUGAS: "/register/petugas",
  ADMIN: {
    DASHBOARD: "/admin",
    MONITORING: "/admin/monitoring",
    LAPORAN: "/admin/laporan",
    PETUGAS: "/admin/petugas",
    PENGGUNA: "/admin/pengguna",
    MARKETPLACE: "/admin/marketplace",
    TRANSAKSI: "/admin/transaksi",
    NOTIFIKASI: "/admin/notifikasi",
    PENGATURAN: "/admin/pengaturan",
  },
  PEMBELI: {
    DASHBOARD: "/pembeli",
    TRACKING: "/pembeli/tracking",
    POIN: "/pembeli/poin",
    BELANJA: "/pembeli/belanja",
    TRANSAKSI: "/pembeli/transaksi",
  },
  PETUGAS: {
    DASHBOARD: "/petugas",
    INPUT: "/petugas/input",
    RIWAYAT: "/petugas/riwayat",
    TRACKING: "/petugas/tracking",
    NOTIFIKASI: "/petugas/notifikasi",
    PROFIL: "/petugas/profil",
  },
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.remove.example.com/v1";
