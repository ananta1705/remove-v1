"use client";

import { Printer } from "lucide-react";

export default function PreviewPDF() {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="min-h-screen bg-gray-200 py-10 flex flex-col items-center font-serif text-gray-900 dark:text-white">
      
      {/* Print Button (Only visible on screen) */}
      <div className="w-[210mm] flex justify-end mb-4 print:hidden">
        <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 font-sans text-sm font-semibold">
          <Printer className="w-4 h-4" /> Cetak / Simpan sebagai PDF
        </button>
      </div>

      {/* A4 Paper Canvas */}
      <div className="w-[210mm] min-h-[297mm] bg-white dark:bg-slate-900 shadow-2xl p-[20mm] print:shadow-none print:m-0 print:p-0">
        
        {/* Kop Surat (Letterhead) */}
        <div className="border-b-4 border-gray-900 pb-4 mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest">ReMove System</h1>
          <p className="text-sm mt-1">Dinas Lingkungan Hidup Kabupaten / Kota</p>
          <p className="text-xs mt-1 italic">Jln. Lingkungan Bersih No. 123, Telepon: (021) 1234567, Email: info@remove.gov.id</p>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold underline underline-offset-4 uppercase">Laporan Transaksi Retribusi Sampah</h2>
          <p className="text-sm mt-2">Periode Cetak: {currentDate}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-8 mb-8 border border-gray-300 p-4">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Total Pemasukan</p>
            <p className="text-lg font-bold">Rp 124.500.000</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Total Transaksi Selesai</p>
            <p className="text-lg font-bold">8,420 Transaksi</p>
          </div>
        </div>

        {/* Data Table */}
        <table className="w-full text-sm border-collapse border border-gray-400 mb-8">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800">
              <th className="border border-gray-400 px-3 py-2 text-left">No</th>
              <th className="border border-gray-400 px-3 py-2 text-left">ID Transaksi</th>
              <th className="border border-gray-400 px-3 py-2 text-left">UPKP / KSM</th>
              <th className="border border-gray-400 px-3 py-2 text-center">Jenis Sampah</th>
              <th className="border border-gray-400 px-3 py-2 text-right">Setoran (Kg)</th>
              <th className="border border-gray-400 px-3 py-2 text-right">Total (Rp)</th>
              <th className="border border-gray-400 px-3 py-2 text-center">Metode</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "TRX-2026-0998", ksm: "UPKP Pusat", jenis: "Residu", jumlah: "12", total: "1.800.000", bayar: "QRIS" },
              { id: "TRX-2026-0986", ksm: "UPKP Utara", jenis: "Organik", jumlah: "8", total: "1.200.000", bayar: "Billing" },
              { id: "TRX-2026-0987", ksm: "UPKP Selatan", jenis: "Murni", jumlah: "15", total: "2.250.000", bayar: "Billing" },
              { id: "TRX-2026-0988", ksm: "UPKP Barat", jenis: "Anorganik", jumlah: "5", total: "750.000", bayar: "QRIS" },
              { id: "TRX-2026-0989", ksm: "UPKP Timur", jenis: "Murni", jumlah: "20", total: "3.000.000", bayar: "Billing" },
            ].map((row, idx) => (
              <tr key={row.id}>
                <td className="border border-gray-400 px-3 py-2 text-center">{idx + 1}</td>
                <td className="border border-gray-400 px-3 py-2">{row.id}</td>
                <td className="border border-gray-400 px-3 py-2">{row.ksm}</td>
                <td className="border border-gray-400 px-3 py-2 text-center">{row.jenis}</td>
                <td className="border border-gray-400 px-3 py-2 text-right">{row.jumlah}</td>
                <td className="border border-gray-400 px-3 py-2 text-right">{row.total}</td>
                <td className="border border-gray-400 px-3 py-2 text-center">{row.bayar}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 dark:bg-slate-800 font-bold">
              <td colSpan={4} className="border border-gray-400 px-3 py-2 text-right">TOTAL</td>
              <td className="border border-gray-400 px-3 py-2 text-right">60</td>
              <td className="border border-gray-400 px-3 py-2 text-right">9.000.000</td>
              <td className="border border-gray-400 px-3 py-2 bg-gray-300"></td>
            </tr>
          </tfoot>
        </table>

        {/* Signature Area */}
        <div className="flex justify-end mt-16">
          <div className="text-center">
            <p>Mengetahui,</p>
            <p className="font-bold mt-1">Kepala Dinas Lingkungan Hidup</p>
            <div className="h-24"></div> {/* Space for signature */}
            <p className="font-bold underline underline-offset-2">Ir. Ananta Puti Maharani, S.Kom</p>
            <p className="mt-1">NIP. 19700101 199503 1 001</p>
          </div>
        </div>

      </div>
    </div>
  );
}
