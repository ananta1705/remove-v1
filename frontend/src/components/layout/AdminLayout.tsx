"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, MapPin, FileText, Users, User,
  Banknote, Bell, LogOut, ChevronRight, ChevronDown, Database
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const logoImage = "/images/logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",         path: "/admin" },
  { icon: MapPin,          label: "Monitoring TPS",    path: "/admin/monitoring" },
  { icon: FileText,        label: "Laporan Sampah",    path: "/admin/laporan" },
  { icon: Users,           label: "Petugas",           path: "/admin/petugas" },
  { icon: Banknote,        label: "Transaksi",         path: "/admin/transaksi" },
  { icon: Bell,            label: "Notifikasi",        path: "/admin/notifikasi" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    pathname === path || (path !== "/admin" && pathname.startsWith(path));

  // Generate Breadcrumbs
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    
    let currentPath = "";
    for (let i = 0; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;
      let label = paths[i].charAt(0).toUpperCase() + paths[i].slice(1);
      
      // Formatting some specific paths for better display
      if (label === "Admin" && i === 0) label = "Dashboard";
      if (label === "Monitoring") label = "Monitoring TPS";
      if (label === "Laporan") label = "Laporan Sampah";
      
      breadcrumbs.push({ label, path: currentPath, isLast: i === paths.length - 1 });
    }
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-teal-50/20 to-[#14CC99]/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-gray-100 dark:border-slate-800 shadow-lg flex flex-col z-20">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden">
              <img
                src={logoImage}
                alt="ReMove Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-[15px] text-gray-900 dark:text-white font-extrabold tracking-tight">ReMove Admin</h1>
              <p className="text-[11px] text-[#14CC99] font-semibold uppercase tracking-wider">Pengelolaan Sampah</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? "bg-gradient-to-r from-[#14CC99] to-[#0ebf8f] text-white shadow-md shadow-[#14CC99]/20"
                    : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-400 group-hover:text-[#14CC99] transition-colors"}`} />
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout (Sidebar Bottom) */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-sm font-semibold">Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 px-8 py-4 z-10 sticky top-0">
          <div className="flex items-center justify-between">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2">
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  <button 
                    onClick={() => router.push(crumb.path)}
                    className={`text-sm font-semibold transition-colors hover:text-[#14CC99] ${
                      crumb.isLast ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-slate-400"
                    }`}
                  >
                    {crumb.label}
                  </button>
                  {!crumb.isLast && <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => router.push("/admin/notifikasi")}
                className="relative p-2.5 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
              >
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative border-l border-gray-200 dark:border-slate-700 pl-4" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                >
                  <div className="w-9 h-9 bg-emerald-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-emerald-100 dark:border-slate-700 group-hover:border-[#14CC99] transition-colors">
                    <User className="w-4 h-4 text-[#14CC99]" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight">Admin DLH</p>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-slate-400">Administrator</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Admin DLH Banyumas</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">admin@dlhbanyumas.go.id</p>
                    </div>
                    <button 
                      onClick={() => router.push("/")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Keluar Sistem
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50/50 dark:bg-slate-950/50">
          <div className="p-6 sm:p-8 w-full">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
