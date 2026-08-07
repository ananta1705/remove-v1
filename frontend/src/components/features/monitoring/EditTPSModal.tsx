"use client";

import { X, MapPin, Package, Calendar, Activity, Navigation } from "lucide-react";
import { useState } from "react";

interface EditTPSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  tpsData: {
    id: number;
    name: string;
    address: string;
    capacity: string;
    status: string;
    active: boolean;
    coordinates?: { x: number; y: number };
  };
}

export function EditTPSModal({ isOpen, onClose, onSave, tpsData }: EditTPSModalProps) {
  const [formData, setFormData] = useState({
    name: tpsData.name,
    address: tpsData.address,
    kapasitas: tpsData.capacity ? tpsData.capacity.split('/')[1].replace(' kg', '') : "1000",
    status: tpsData.status,
    active: tpsData.active,
    coordinates: tpsData.coordinates || { x: 50, y: 50 },
  });

  const [isSelectingLocation, setIsSelectingLocation] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectingLocation) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setFormData({ ...formData, coordinates: { x, y } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#14CC99] to-green-600 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Edit TPS</h3>
                <p className="text-sm text-green-50">Perbarui data dan lokasi TPS</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Interactive Map */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200">
                Lokasi pada Peta <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsSelectingLocation(!isSelectingLocation)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSelectingLocation
                    ? 'bg-[#14CC99] text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-200'
                }`}
              >
                <Navigation className="w-4 h-4 inline mr-2" />
                {isSelectingLocation ? 'Pilih Lokasi Aktif' : 'Aktifkan Pilih Lokasi'}
              </button>
            </div>
            
            <div
              onClick={handleMapClick}
              className={`relative bg-[#f5f5f5] h-[350px] rounded-xl overflow-hidden border-2 ${
                isSelectingLocation ? 'border-[#14CC99] cursor-crosshair' : 'border-gray-200 dark:border-slate-700'
              }`}
            >
              {/* Grid pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}></div>
              
              {/* Roads */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#d1d5db" strokeWidth="2" />
                <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#d1d5db" strokeWidth="2" />
                <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#d1d5db" strokeWidth="2" />
                <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#d1d5db" strokeWidth="2" />
              </svg>

              {/* Selected Location Marker */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full transition-all"
                style={{
                  left: `${formData.coordinates.x}%`,
                  top: `${formData.coordinates.y}%`,
                }}
              >
                {/* Shadow */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm"></div>
                
                {/* Pin */}
                <svg width="40" height="52" viewBox="0 0 40 52" fill="none" className="drop-shadow-lg">
                  <path
                    d="M20 0C8.954 0 0 8.954 0 20c0 15 20 32 20 32s20-17 20-32C40 8.954 31.046 0 20 0z"
                    fill="#14CC99"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <circle cx="20" cy="19" r="8" fill="white" />
                </svg>

                {/* Pulse effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full animate-ping opacity-30 bg-[#14CC99]"></div>
              </div>

              {/* Instructions Overlay */}
              {isSelectingLocation && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#14CC99] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg animate-bounce">
                  👆 Klik pada peta untuk memilih lokasi
                </div>
              )}

              {/* Coordinates Display */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-slate-200 font-mono shadow-sm">
                Lat: {formData.coordinates.y.toFixed(2)}°, Lng: {formData.coordinates.x.toFixed(2)}°
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
              💡 Klik tombol "Aktifkan Pilih Lokasi" lalu klik pada peta untuk mengubah lokasi TPS
            </p>
          </div>

          {/* Nama TPS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Nama TPS <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Masukkan nama TPS"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
              />
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Alamat <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                rows={3}
                placeholder="Masukkan alamat lengkap TPS"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] resize-none"
              />
            </div>
          </div>

          {/* Kapasitas & Status - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kapasitas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Kapasitas Maksimal (kg) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.kapasitas}
                  onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                  required
                  min="1"
                  placeholder="1000"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                >
                  <option value="Normal">Normal</option>
                  <option value="Peringatan">Peringatan</option>
                  <option value="Penuh">Penuh</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status Aktif */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.active ? 'bg-green-100' : 'bg-gray-200'}`}>
                  <Activity className={`w-6 h-6 ${formData.active ? 'text-green-600' : 'text-gray-500 dark:text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Status Operasional</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {formData.active ? 'TPS sedang beroperasi' : 'TPS tidak beroperasi'}
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-[#14CC99] transition-colors"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white dark:bg-slate-900 rounded-full transition-transform peer-checked:translate-x-7"></div>
              </div>
            </label>
          </div>

          {/* Info */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-xs text-blue-800 leading-relaxed">
              <span className="font-semibold">Catatan:</span> Perubahan data TPS akan langsung tersimpan dan terlihat di monitoring real-time.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#14CC99] text-white rounded-xl hover:bg-[#12b589] transition-colors font-medium shadow-lg shadow-[#14CC99]/30"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}