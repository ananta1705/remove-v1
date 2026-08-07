"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, MapPin, Award, Save, Camera } from "lucide-react";

const petugasMap: Record<string, any> = {
  "1": { nama: "Andi Prasetyo", nik: "3201010101800001", email: "andi@remove.com", no_hp: "081234567890", alamat: "Jl. Merdeka No. 12, Bandung", wilayah: "Pusat", tgl_gabung: "2022-03-01", status: "Aktif" },
  "2": { nama: "Budi Santoso", nik: "3201010101800002", email: "budi@remove.com", no_hp: "081234567891", alamat: "Jl. Sudirman No. 45, Bandung", wilayah: "Utara", tgl_gabung: "2022-07-15", status: "Aktif" },
  "3": { nama: "Citra Dewi", nik: "3201010101800003", email: "citra@remove.com", no_hp: "081234567892", alamat: "Jl. Ahmad Yani No. 22, Bandung", wilayah: "Selatan", tgl_gabung: "2021-01-10", status: "Aktif" },
  "4": { nama: "Doni Firmansyah", nik: "3201010101800004", email: "doni@remove.com", no_hp: "081234567893", alamat: "Jl. Diponegoro No. 67, Bandung", wilayah: "Barat", tgl_gabung: "2023-09-01", status: "Cuti" },
};

export function EditPetugas() {
  const router = useRouter();
  const { id } = useParams();
  const idString = Array.isArray(id) ? id[0] : (id || "1");
  const defaultData = petugasMap[idString] ?? petugasMap["1"];
  const [form, setForm] = useState(defaultData);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev: any) => ({ ...prev, [k]: e.target.value }));

  const inputClass = "w-full px-4 py-2.5 text-sm bg-white/60 border border-gray-200 dark:border-slate-700/50 rounded-xl focus:outline-none focus:border-[#14CC99] focus:ring-1 focus:ring-[#14CC99]/20 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1.5";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/petugas")}
          className="p-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Petugas</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Memperbarui data {form.nama}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-800/50">
          <div className="w-7 h-7 bg-[#14CC99]/10 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-[#14CC99]" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-slate-100">Informasi Petugas</h3>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#14CC99]/20 to-teal-600/20 rounded-2xl flex items-center justify-center border border-[#14CC99]/20">
              <User className="w-8 h-8 text-[#14CC99]" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#14CC99] rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-slate-100">{form.nama}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">ID: PTG-{String(id).padStart(4, "0")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelClass}>Nama Lengkap</label>
            <input value={form.nama} onChange={set("nama")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>NIK</label>
            <input value={form.nik} onChange={set("nik")} maxLength={16} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>No. Handphone</label>
            <input value={form.no_hp} onChange={set("no_hp")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={set("email")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tanggal Bergabung</label>
            <input type="date" value={form.tgl_gabung} onChange={set("tgl_gabung")} className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Alamat</label>
            <textarea value={form.alamat} onChange={set("alamat")} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Wilayah Tugas</label>
            <select value={form.wilayah} onChange={set("wilayah")} className={inputClass}>
              {["Pusat", "Utara", "Selatan", "Barat", "Timur"].map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={set("status")} className={inputClass}>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={() => router.push("/admin/petugas")}
            className="px-5 py-2.5 text-sm text-gray-600 dark:text-slate-300 bg-white/60 border border-gray-200 dark:border-slate-700/50 rounded-xl hover:bg-white/80 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => { alert("Data petugas berhasil diperbarui!"); router.push("/admin/petugas"); }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-[#14CC99] to-teal-600 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Save className="w-4 h-4" /> Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
