"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Calculator, Receipt, CheckCircle2, QrCode, 
  Loader2, ArrowRight, Copy, Check, Info, 
  Truck, User, Calendar, AlertTriangle, 
  Trash2, ChevronRight, Save, RotateCcw, X, 
  AlertCircle, Hash, Building2, Weight
} from "lucide-react";

export function TrackingPetugas() {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Form State
  const [form, setForm] = useState({
    skrd: "SKRD-20260718-001",
    tanggal: new Date().toISOString().split('T')[0],
    upkp: "UPKP Pusat",
    kendaraan: "",
    supir: "",
    jenisSampah: "Sampah Murni",
    gross: "",
    tara: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Payment Selection
  const [selectedPayment, setSelectedPayment] = useState<"QRIS" | "BILLING" | null>(null);
  
  // Modals & Flows
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"WAITING" | "SUCCESS">("WAITING");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculations
  const grossNum = parseFloat(form.gross) || 0;
  const taraNum = parseFloat(form.tara) || 0;
  const netto = Math.max(0, grossNum - taraNum);
  const HARGA_PER_KG = form.jenisSampah === "Sampah Murni" ? 150 : 200;
  const estimasiTagihan = netto * HARGA_PER_KG;

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "kendaraan" && !value.trim()) error = "Nomor polisi wajib diisi";
    if (name === "supir" && !value.trim()) error = "Nama supir wajib diisi";
    if (name === "gross" && parseFloat(value) <= 0) error = "Berat gross harus lebih dari 0";
    if (name === "tara" && parseFloat(value) <= 0) error = "Berat tara harus lebih dari 0";
    if (name === "tara" && parseFloat(value) >= grossNum && grossNum > 0) error = "Tara tidak boleh melebihi Gross";
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleReset = () => {
    setForm({
      skrd: "SKRD-20260718-001",
      tanggal: new Date().toISOString().split('T')[0],
      upkp: "UPKP Pusat",
      kendaraan: "",
      supir: "",
      jenisSampah: "Sampah Murni",
      gross: "",
      tara: "",
    });
    setErrors({});
    setTouched({});
    setSelectedPayment(null);
    setResetDialogOpen(false);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus("SUCCESS");
      
      // Auto close payment modal and show final success dialog
      setTimeout(() => {
        setPaymentModalOpen(false);
        setSuccessDialogOpen(true);
      }, 1500);
    }, 2000);
  };

  const handleCopyBilling = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = 
    form.kendaraan.trim() && 
    form.supir.trim() && 
    grossNum > 0 && 
    taraNum > 0 && 
    netto > 0 &&
    !Object.values(errors).some(e => e);

  const isFormComplete = isFormValid && selectedPayment;

  if (isPageLoading) {
    return (
      <div className="space-y-6 pb-20 animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          </div>
          <div className="space-y-6">
            <div className="h-[500px] bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. PAGE HEADER */}
      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-slate-400 mb-2">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#10b981]">Input Sampah</span>
      </div>

      {/* 2. INFORMATION ALERT */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-[0_2px_10px_rgba(16,185,129,0.05)]">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">Formulir Input Data Sampah</h1>
          <p className="text-[13px] text-gray-600 dark:text-slate-400 mt-1 leading-relaxed">
            Lengkapi data operasional kendaraan dan berat timbangan secara akurat. Sistem akan menghitung netto dan estimasi retribusi secara otomatis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative items-start">
        
        {/* LEFT COLUMN: FORM CARDS */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Data Kendaraan Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight">Data Kendaraan</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Nomor SKRD</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" name="skrd" value={form.skrd} disabled
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-500 dark:text-slate-400 font-medium"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Tanggal Operasional <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="date" name="tanggal" value={form.tanggal} onChange={handleInputChange} onBlur={handleBlur}
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Lokasi TPS / UPKP Master <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <select name="upkp" value={form.upkp} onChange={handleInputChange} onBlur={handleBlur} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none">
                    <option value="TPS Purwokerto Selatan (UPKP Selatan)">TPS Purwokerto Selatan - UPKP Wilayah Selatan</option>
                    <option value="TPS Diponegoro (UPKP Timur)">TPS Diponegoro - UPKP Wilayah Timur</option>
                    <option value="TPS Ahmad Yani (UPKP Barat)">TPS Ahmad Yani - UPKP Wilayah Barat</option>
                    <option value="TPS Sudirman (UPKP Utara)">TPS Sudirman - UPKP Wilayah Utara</option>
                    <option value="TPS Gatot Subroto (UPKP Pusat)">TPS Gatot Subroto - UPKP Wilayah Pusat</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">No. Polisi Kendaraan <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Truck className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="text" name="kendaraan" value={form.kendaraan} onChange={handleInputChange} onBlur={handleBlur} placeholder="Contoh: R 1234 AB"
                    className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm font-medium outline-none transition-all ${errors.kendaraan ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`}
                  />
                  {errors.kendaraan && (
                    <div className="absolute right-3 top-3.5"><AlertCircle className="w-4 h-4 text-red-500" /></div>
                  )}
                </div>
                {errors.kendaraan && <p className="text-xs text-red-500 font-medium">{errors.kendaraan}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Nama Supir <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="text" name="supir" value={form.supir} onChange={handleInputChange} onBlur={handleBlur} placeholder="Nama lengkap supir"
                    className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm font-medium outline-none transition-all ${errors.supir ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`}
                  />
                  {errors.supir && (
                    <div className="absolute right-3 top-3.5"><AlertCircle className="w-4 h-4 text-red-500" /></div>
                  )}
                </div>
                {errors.supir && <p className="text-xs text-red-500 font-medium">{errors.supir}</p>}
              </div>
            </div>
          </div>

          {/* Data Sampah Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 dark:bg-amber-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight">Data Sampah</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Jenis Sampah <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Trash2 className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <select name="jenisSampah" value={form.jenisSampah} onChange={handleInputChange} onBlur={handleBlur} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none">
                    <option>Sampah Murni</option>
                    <option>Sampah Liar</option>
                    <option>Bahan RDF</option>
                    <option>Residu</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Berat Gross (Kg) <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Weight className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="number" name="gross" value={form.gross} onChange={handleInputChange} onBlur={handleBlur} placeholder="0" min="0" step="10"
                    className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border rounded-xl text-lg font-bold outline-none transition-all ${errors.gross ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-gray-400">Kg</span>
                  </div>
                </div>
                {errors.gross && <p className="text-xs text-red-500 font-medium">{errors.gross}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300">Berat Tara (Kg) <span className="text-red-500">*</span></label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Weight className="w-4 h-4 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="number" name="tara" value={form.tara} onChange={handleInputChange} onBlur={handleBlur} placeholder="0" min="0" step="10"
                    className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border rounded-xl text-lg font-bold outline-none transition-all ${errors.tara ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-gray-400">Kg</span>
                  </div>
                </div>
                {errors.tara && <p className="text-xs text-red-500 font-medium">{errors.tara}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CALCULATION, PAYMENT & SUMMARY */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-[96px]">
          
          {/* Kalkulasi Berat & Ringkasan */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight mb-5 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" /> Ringkasan Retribusi
            </h2>
            
            {/* Weight Flow Panel */}
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-gray-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-500 dark:text-slate-400 font-medium">Berat Kotor (Gross)</span>
                <span className="font-bold text-gray-900 dark:text-white">{grossNum || 0} Kg</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-500 dark:text-slate-400 font-medium">Berat Kosong (Tara)</span>
                <span className="font-bold text-gray-900 dark:text-white">- {taraNum || 0} Kg</span>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-slate-700 my-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">Berat Bersih (Netto)</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 transition-all duration-300 animate-in fade-in zoom-in">
                  {netto} Kg
                </span>
              </div>
            </div>

            {/* Warning Panel */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-3 mb-6 flex gap-3 items-start">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-yellow-700 dark:text-yellow-600/90 font-medium">
                Berat Netto dihitung secara otomatis. Pastikan data timbangan sesuai dengan layar jembatan timbang digital.
              </p>
            </div>

            {/* Cost Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[13px] text-gray-500 dark:text-slate-400">
                <span className="font-medium">Harga per Kg</span>
                <span className="font-bold text-gray-900 dark:text-white">Rp {HARGA_PER_KG}</span>
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-gray-100 dark:border-slate-800">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total Tagihan</span>
                <span className="text-3xl font-black text-[#10b981] tracking-tight">
                  Rp {estimasiTagihan.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <h3 className="text-[13px] font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Metode Pembayaran</h3>
            <div className="space-y-3 mb-8">
              <label 
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedPayment === "QRIS" ? "border-[#10b981] bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm" : "border-gray-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 bg-white dark:bg-slate-900"}`}
              >
                <input type="radio" name="payment" className="sr-only" onChange={() => setSelectedPayment("QRIS")} checked={selectedPayment === "QRIS"} />
                {selectedPayment === "QRIS" && <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/10 rounded-full blur-xl -mr-4 -mt-4" />}
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-2.5 rounded-xl transition-colors ${selectedPayment === "QRIS" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/30" : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400"}`}>
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">QRIS</h4>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-slate-400 mt-0.5">Bayar instan via e-wallet</p>
                  </div>
                  {selectedPayment === "QRIS" && <CheckCircle2 className="w-5 h-5 text-[#10b981] ml-auto" />}
                </div>
              </label>
              
              <label 
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedPayment === "BILLING" ? "border-[#10b981] bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm" : "border-gray-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 bg-white dark:bg-slate-900"}`}
              >
                <input type="radio" name="payment" className="sr-only" onChange={() => setSelectedPayment("BILLING")} checked={selectedPayment === "BILLING"} />
                {selectedPayment === "BILLING" && <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/10 rounded-full blur-xl -mr-4 -mt-4" />}
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-2.5 rounded-xl transition-colors ${selectedPayment === "BILLING" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/30" : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400"}`}>
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Kode Billing</h4>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-slate-400 mt-0.5">Transfer bank / tunai</p>
                  </div>
                  {selectedPayment === "BILLING" && <CheckCircle2 className="w-5 h-5 text-[#10b981] ml-auto" />}
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                disabled={!isFormComplete}
                onClick={() => {
                  setPaymentStatus("WAITING");
                  setPaymentModalOpen(true);
                }}
                className={`w-full py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${
                  isFormComplete 
                    ? "bg-[#10b981] text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5" 
                    : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                {isFormComplete && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
                <Save className="w-5 h-5 relative z-10" /> 
                <span className="relative z-10">Simpan Data</span>
              </button>
              
              <button
                onClick={() => setResetDialogOpen(true)}
                className="w-full py-3.5 bg-transparent border-2 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset Form
              </button>
            </div>
            
            {!isFormComplete && (
              <p className="text-[11px] text-center text-gray-400 font-medium mt-4">
                Lengkapi seluruh form dan metode pembayaran untuk menyimpan data.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RESET CONFIRMATION DIALOG */}
      {resetDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Reset Formulir?</h2>
            <p className="text-[13px] text-gray-500 dark:text-slate-400 mb-6 font-medium">Semua data yang telah diinput akan dihapus dan dikembalikan ke kondisi awal.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setResetDialogOpen(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT SIMULATION MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-300 relative border border-gray-100 dark:border-slate-800">
            <button onClick={() => setPaymentModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:text-slate-300 transition-colors bg-gray-50 dark:bg-slate-800 rounded-full p-1.5">
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">
              {selectedPayment === "QRIS" ? "Pembayaran QRIS" : "Kode Billing"}
            </h2>
            <p className="text-[13px] text-gray-500 dark:text-slate-400 mb-6 font-medium">Selesaikan pembayaran untuk menyimpan data operasional.</p>

            {/* QRIS View */}
            {selectedPayment === "QRIS" && (
              <div className="mb-6">
                <div className="w-56 h-56 bg-white border-2 border-gray-100 rounded-[20px] mx-auto flex items-center justify-center mb-4 shadow-sm p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-[shimmer_2s_infinite]" />
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ReMove-Tagihan-${estimasiTagihan}`} 
                    alt="QRIS Payment" 
                    className="w-full h-full object-contain relative z-10 rounded-xl"
                  />
                </div>
                
                <div className="mt-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 text-left border border-gray-100 dark:border-slate-700/50">
                  <p className="text-[12px] font-bold text-gray-700 dark:text-slate-300 mb-2">Cara Pembayaran QRIS:</p>
                  <ol className="text-[11px] text-gray-500 dark:text-slate-400 list-decimal list-inside space-y-1.5">
                    <li>Buka aplikasi e-wallet (GoPay, OVO, dll) atau Mobile Banking.</li>
                    <li>Pilih menu <strong className="text-gray-700 dark:text-slate-300">Scan QR</strong> atau <strong className="text-gray-700 dark:text-slate-300">Bayar</strong>.</li>
                    <li>Arahkan kamera ke QR Code di atas.</li>
                    <li>Periksa kembali nominal tagihan dan konfirmasi.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* BILLING View */}
            {selectedPayment === "BILLING" && (
              <div className="mb-6">
                <p className="text-[12px] font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wider text-left">Nomor Virtual Account / Billing</p>
                <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between mb-3 shadow-inner">
                  <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-widest">8801 2345 6789</span>
                  <button onClick={handleCopyBilling} className="p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-emerald-600 shadow-sm">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                
                <div className="mt-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 text-left border border-gray-100 dark:border-slate-700/50">
                  <p className="text-[12px] font-bold text-gray-700 dark:text-slate-300 mb-2">Cara Pembayaran via Transfer / ATM:</p>
                  <ol className="text-[11px] text-gray-500 dark:text-slate-400 list-decimal list-inside space-y-1.5">
                    <li>Pilih menu <strong className="text-gray-700 dark:text-slate-300">Transfer</strong> lalu <strong className="text-gray-700 dark:text-slate-300">Virtual Account</strong>.</li>
                    <li>Masukkan nomor Virtual Account di atas.</li>
                    <li>Periksa kembali institusi (ReMove) dan tagihan.</li>
                    <li>Lanjutkan dan konfirmasi pembayaran Anda.</li>
                  </ol>
                </div>
              </div>
            )}

            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5 mb-8 border border-emerald-100 dark:border-emerald-800/30">
              <p className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider">Total Pembayaran</p>
              <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">Rp {estimasiTagihan.toLocaleString('id-ID')}</p>
            </div>

            {paymentStatus === "WAITING" ? (
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg group relative overflow-hidden"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Simulasi Bayar Berhasil <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            ) : (
              <div className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 animate-in zoom-in">
                <CheckCircle2 className="w-6 h-6" /> Pembayaran Terverifikasi
              </div>
            )}
          </div>
        </div>
      )}

      {/* FINAL SUCCESS DIALOG */}
      {successDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-500 relative border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
            
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping" />
              <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Penyimpanan Sukses!</h2>
            <p className="text-[13px] text-gray-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
              Data operasional berhasil disimpan ke dalam sistem dan pembayaran telah terkonfirmasi.
            </p>
            
            <div className="space-y-3 relative z-10">
              <button
                onClick={() => router.push("/petugas")}
                className="w-full py-3.5 bg-[#10b981] text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Kembali ke Dashboard
              </button>
              <button
                onClick={() => router.push("/petugas/riwayat")}
                className="w-full py-3.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
              >
                Lihat Riwayat Input
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
