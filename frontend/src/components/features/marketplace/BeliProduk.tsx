"use client";

import { ShoppingBag, Package, MapPin, Info, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const productStockList = [
  {
    id: 1,
    name: "Bahan RDF (Refuse-Derived Fuel)",
    category: "Bahan RDF",
    stock: "45 Ton",
    location: "TPST Purwokerto Pusat",
    keterangan: "Stok hasil olahan sampah anorganik terpisahkan untuk bahan bakar alternatif industri.",
  },
  {
    id: 2,
    name: "Pupuk Kompos Organik",
    category: "Kompos Organik",
    stock: "30 Ton",
    location: "TPS3R Wilayah Selatan",
    keterangan: "Hasil pengomposan sampah organik pasar dan pemukiman untuk pembenah tanah.",
  },
  {
    id: 3,
    name: "Cacahan Plastik PET Clean",
    category: "Daur Ulang Plastik",
    stock: "12 Ton",
    location: "TPST Wilayah Barat",
    keterangan: "Stok hasil pemilahan dan pencacahan botol plastik siap olah.",
  },
];

export function BeliProduk() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<typeof productStockList[0] | null>(null);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#14CC99]" /> Katalog Informasi Stok Olahan Sampah
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Sistem Informasi Ketersediaan Stok Komoditas Olahan Sampah (Khusus Monitoring & Informasi Publik)
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productStockList.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#14CC99]/10 text-[#14CC99] inline-block mb-3">
                {item.category}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{item.name}</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">{item.keterangan}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Ketersediaan Stok:</span>
                <span className="font-bold text-[#14CC99] flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" /> {item.stock}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lokasi:</span>
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {item.location}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(item)}
                className="w-full mt-3 py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-[#14CC99] text-gray-700 dark:text-slate-200 hover:text-white font-bold rounded-xl transition-all border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" /> Detail Informasi
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#14CC99]/10 text-[#14CC99]">{selectedItem.category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{selectedItem.name}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-1.5 bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-gray-600 rounded-full">✕</button>
            </div>

            <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">{selectedItem.keterangan}</p>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 text-xs border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Stok Olahan Terdaftar:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedItem.stock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lokasi Pengolahan:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedItem.location}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 bg-[#14CC99] text-white text-xs font-bold rounded-xl hover:bg-[#12b589] transition-colors"
            >
              Tutup Informasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
