"use client";

import { Download } from "lucide-react";

export default function PreviewExcel() {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric", month: "2-digit", day: "2-digit"
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800 flex flex-col font-sans">
      
      {/* Fake Excel Toolbar */}
      <div className="bg-[#107c41] text-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-bold font-serif text-lg">X</div>
          <div>
            <p className="text-sm font-semibold">Laporan_Transaksi_Retribusi_Sampah_{currentDate}.xlsx</p>
            <p className="text-xs text-white/70">Tersimpan secara lokal (Hanya Simulasi UI)</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 text-[#107c41] rounded shadow hover:bg-gray-50 dark:bg-slate-800 text-xs font-bold">
          <Download className="w-3.5 h-3.5" /> Simpan Asli
        </button>
      </div>
      
      {/* Fake Ribbon */}
      <div className="bg-gray-50 dark:bg-slate-800 border-b border-gray-300 p-2 flex gap-4 text-sm text-gray-700 dark:text-slate-200">
        <span className="font-semibold text-[#107c41] border-b-2 border-[#107c41] pb-1 px-1">Beranda</span>
        <span className="hover:bg-gray-200 px-2 py-0.5 rounded cursor-pointer">Sisipkan</span>
        <span className="hover:bg-gray-200 px-2 py-0.5 rounded cursor-pointer">Tata Letak</span>
        <span className="hover:bg-gray-200 px-2 py-0.5 rounded cursor-pointer">Rumus</span>
        <span className="hover:bg-gray-200 px-2 py-0.5 rounded cursor-pointer">Data</span>
      </div>

      {/* Grid Area */}
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-900 relative">
        
        {/* Column Headers (A, B, C...) */}
        <div className="sticky top-0 z-10 flex bg-gray-100 dark:bg-slate-800 border-b border-gray-300 text-gray-600 dark:text-slate-300 text-xs text-center select-none font-medium">
          <div className="w-10 min-w-10 border-r border-gray-300 bg-gray-200"></div>
          <div className="w-16 min-w-16 border-r border-gray-300 py-1 hover:bg-gray-200">A</div>
          <div className="w-40 min-w-40 border-r border-gray-300 py-1 hover:bg-gray-200">B</div>
          <div className="w-40 min-w-40 border-r border-gray-300 py-1 hover:bg-gray-200">C</div>
          <div className="w-32 min-w-32 border-r border-gray-300 py-1 hover:bg-gray-200">D</div>
          <div className="w-32 min-w-32 border-r border-gray-300 py-1 hover:bg-gray-200">E</div>
          <div className="w-32 min-w-32 border-r border-gray-300 py-1 hover:bg-gray-200">F</div>
          <div className="w-32 min-w-32 border-r border-gray-300 py-1 hover:bg-gray-200">G</div>
          <div className="w-32 min-w-32 border-r border-gray-300 py-1 hover:bg-gray-200">H</div>
        </div>

        {/* Rows */}
        <div className="flex">
          {/* Row Headers (1, 2, 3...) */}
          <div className="sticky left-0 z-10 bg-gray-100 dark:bg-slate-800 border-r border-gray-300 text-gray-500 dark:text-slate-400 text-xs text-center select-none flex flex-col">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="h-7 border-b border-gray-300 flex items-center justify-center font-medium bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 w-10">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="flex flex-col text-sm text-gray-800 dark:text-slate-100">
            {/* Row 1 - Title */}
            <div className="flex h-7 border-b border-gray-200 dark:border-slate-700">
              <div className="w-16 border-r border-gray-200 dark:border-slate-700 px-1 py-0.5"></div>
              <div className="w-[1000px] font-bold text-lg px-2 py-0.5 overflow-visible whitespace-nowrap">LAPORAN TRANSAKSI RETRIBUSI SAMPAH</div>
            </div>
            {/* Row 2 - Date */}
            <div className="flex h-7 border-b border-gray-200 dark:border-slate-700">
              <div className="w-16 border-r border-gray-200 dark:border-slate-700 px-1 py-0.5"></div>
              <div className="w-[1000px] text-gray-600 dark:text-slate-300 px-2 py-0.5 overflow-visible whitespace-nowrap">Tanggal Tarik Data: {currentDate}</div>
            </div>
            {/* Row 3 - Empty */}
            <div className="flex h-7 border-b border-gray-200 dark:border-slate-700"><div className="w-[1000px]"></div></div>
            
            {/* Row 4 - Headers */}
            <div className="flex h-7 border-b-2 border-black bg-gray-50 dark:bg-slate-800 font-bold text-center">
              <div className="w-16 border-r border-black px-1 py-0.5 border-l">No</div>
              <div className="w-40 border-r border-black px-1 py-0.5">ID Transaksi</div>
              <div className="w-40 border-r border-black px-1 py-0.5">UPKP / KSM</div>
              <div className="w-32 border-r border-black px-1 py-0.5">Jenis Sampah</div>
              <div className="w-32 border-r border-black px-1 py-0.5">Setoran (Kg)</div>
              <div className="w-32 border-r border-black px-1 py-0.5">Total (Rp)</div>
              <div className="w-32 border-r border-black px-1 py-0.5">Metode Pembayaran</div>
              <div className="w-32 border-r border-black px-1 py-0.5">Status</div>
            </div>

            {/* Data Rows */}
            {[
              { id: "TRX-2026-0998", ksm: "UPKP Pusat", jenis: "Residu", jumlah: 12, total: 1800000, bayar: "QRIS", status: "Berhasil" },
              { id: "TRX-2026-0986", ksm: "UPKP Utara", jenis: "Organik", jumlah: 8, total: 1200000, bayar: "Kode Billing", status: "Pending" },
              { id: "TRX-2026-0987", ksm: "UPKP Selatan", jenis: "Murni", jumlah: 15, total: 2250000, bayar: "Kode Billing", status: "Gagal" },
              { id: "TRX-2026-0988", ksm: "UPKP Barat", jenis: "Anorganik", jumlah: 5, total: 750000, bayar: "QRIS", status: "Berhasil" },
              { id: "TRX-2026-0989", ksm: "UPKP Timur", jenis: "Murni", jumlah: 20, total: 3000000, bayar: "Kode Billing", status: "Pending" },
            ].map((row, idx) => (
              <div key={row.id} className="flex h-7 border-b border-gray-200 dark:border-slate-700 hover:bg-blue-50/30">
                <div className="w-16 border-r border-gray-200 dark:border-slate-700 border-l px-2 py-0.5 text-center">{idx + 1}</div>
                <div className="w-40 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5">{row.id}</div>
                <div className="w-40 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5">{row.ksm}</div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5">{row.jenis}</div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5 text-right">{row.jumlah}</div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5 text-right">Rp {row.total.toLocaleString("id-ID")}</div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5 text-center">{row.bayar}</div>
                <div className={`w-32 border-r border-gray-200 dark:border-slate-700 px-2 py-0.5 font-semibold text-center ${row.status === 'Berhasil' ? 'text-[#107c41]' : row.status === 'Gagal' ? 'text-red-600' : 'text-amber-600'}`}>{row.status}</div>
              </div>
            ))}

            {/* Total Row */}
            <div className="flex h-7 border-b-2 border-black bg-gray-100 dark:bg-slate-800 font-bold">
              <div className="w-[432px] border-r border-black border-l px-2 py-0.5 text-right">TOTAL KESELURUHAN</div>
              <div className="w-32 border-r border-black px-2 py-0.5 text-right">60</div>
              <div className="w-32 border-r border-black px-2 py-0.5 text-right">Rp 9.000.000</div>
              <div className="w-64 border-r border-black px-2 py-0.5 bg-gray-200"></div>
            </div>

            {/* Empty filler rows to make it look like a real spreadsheet */}
            {Array.from({length: 10}).map((_, i) => (
              <div key={i} className="flex h-7 border-b border-gray-200 dark:border-slate-700">
                <div className="w-16 border-r border-gray-200 dark:border-slate-700 border-l"></div>
                <div className="w-40 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-40 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700"></div>
                <div className="w-32 border-r border-gray-200 dark:border-slate-700"></div>
              </div>
            ))}

          </div>
        </div>
      </div>
      
      {/* Fake Status Bar */}
      <div className="bg-[#e1dfdd] text-gray-700 dark:text-slate-200 text-xs p-1 flex justify-between border-t border-gray-300">
        <span>SIAP</span>
        <div className="flex gap-4 px-4">
          <span>Rata-rata: 1.800.000</span>
          <span>Jumlah: 5</span>
          <span>Jumlah: 9.000.000</span>
          <span className="font-semibold">+ 100% -</span>
        </div>
      </div>
    </div>
  );
}
