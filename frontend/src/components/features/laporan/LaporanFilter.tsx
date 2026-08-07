"use client";

import { Calendar, X } from "lucide-react";
import { useState } from "react";

interface LaporanFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filterData: {
    filterType: "date" | "month" | "year";
    startDate?: string;
    endDate?: string;
    month?: string;
    year?: string;
  }) => void;
}

export function LaporanFilter({ isOpen, onClose, onApplyFilter }: LaporanFilterProps) {
  const [filterType, setFilterType] = useState<"date" | "month" | "year">("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const months = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleApply = () => {
    const filterData: any = { filterType };
    
    if (filterType === "date") {
      filterData.startDate = startDate;
      filterData.endDate = endDate;
    } else if (filterType === "month") {
      filterData.month = selectedMonth;
      filterData.year = selectedYear;
    } else {
      filterData.year = selectedYear;
    }

    onApplyFilter(filterData);
    onClose();
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSelectedMonth("");
    setSelectedYear(new Date().getFullYear().toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14CC99] to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Filter Laporan</h3>
                <p className="text-sm text-green-50">Pilih periode laporan</p>
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

        <div className="p-6 space-y-6">
          {/* Filter Type Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setFilterType("date")}
              className={`py-3 rounded-lg font-medium text-sm transition-all ${
                filterType === "date"
                  ? "bg-white dark:bg-slate-900 text-[#14CC99] shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:text-white"
              }`}
            >
              📅 Range Tanggal
            </button>
            <button
              onClick={() => setFilterType("month")}
              className={`py-3 rounded-lg font-medium text-sm transition-all ${
                filterType === "month"
                  ? "bg-white dark:bg-slate-900 text-[#14CC99] shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:text-white"
              }`}
            >
              📆 Bulanan
            </button>
            <button
              onClick={() => setFilterType("year")}
              className={`py-3 rounded-lg font-medium text-sm transition-all ${
                filterType === "year"
                  ? "bg-white dark:bg-slate-900 text-[#14CC99] shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:text-white"
              }`}
            >
              📊 Tahunan
            </button>
          </div>

          {/* Date Range Filter */}
          {filterType === "date" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Tanggal Akhir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                  required
                />
              </div>
            </div>
          )}

          {/* Monthly Filter */}
          {filterType === "month" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Bulan <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                  required
                >
                  <option value="">Pilih Bulan</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Tahun <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                  required
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Yearly Filter */}
          {filterType === "year" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Tahun <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99]"
                required
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Preview Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">💡 Catatan:</span> Laporan akan ditampilkan dan dapat diunduh dalam format Excel sesuai filter yang dipilih.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              disabled={
                (filterType === "date" && (!startDate || !endDate)) ||
                (filterType === "month" && !selectedMonth)
              }
              className="flex-1 px-6 py-3 bg-[#14CC99] text-white rounded-xl hover:bg-[#12b589] transition-colors font-medium shadow-lg shadow-[#14CC99]/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
