"use client";

import { X, MapPin, Save } from "lucide-react";
import { useState } from "react";

interface TambahTPSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function TambahTPSModal({ isOpen, onClose, onSave }: TambahTPSModalProps) {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    kapasitas: "",
    koordinatX: "",
    koordinatY: "",
    status: "Normal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      nama: "",
      alamat: "",
      kapasitas: "",
      koordinatX: "",
      koordinatY: "",
      status: "Normal",
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tambah TPS Baru</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Lengkapi informasi TPS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Nama TPS <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                placeholder="Contoh: TPS Gatot Subroto"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                placeholder="Contoh: Jl. Gatot Subroto No. 45"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Kapasitas (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="kapasitas"
                value={formData.kapasitas}
                onChange={handleChange}
                required
                placeholder="1000"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              >
                <option value="Normal">Normal</option>
                <option value="Peringatan">Peringatan</option>
                <option value="Penuh">Penuh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Koordinat X (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="koordinatX"
                value={formData.koordinatX}
                onChange={handleChange}
                required
                min="0"
                max="100"
                placeholder="35"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Posisi horizontal pada peta (0-100)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Koordinat Y (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="koordinatY"
                value={formData.koordinatY}
                onChange={handleChange}
                required
                min="0"
                max="100"
                placeholder="40"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Posisi vertikal pada peta (0-100)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-50 dark:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#14CC99] text-white rounded-xl hover:bg-[#12b589] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-5 h-5" />
              Simpan TPS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
