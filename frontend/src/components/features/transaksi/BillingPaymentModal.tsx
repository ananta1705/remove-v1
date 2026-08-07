"use client";

import { X, Copy, CheckCircle, Loader2, RefreshCw, CreditCard } from "lucide-react";
import { useState } from "react";

interface BillingPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominal: number;
  onPaymentSuccess?: () => void;
  kodeTransaksi?: string;
}

export function BillingPaymentModal({ isOpen, onClose, nominal, onPaymentSuccess, kodeTransaksi }: BillingPaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<"waiting" | "checking" | "success" | "failed">("waiting");
  const [copied, setCopied] = useState(false);
  
  // Generate billing code (in production, this should come from payment gateway)
  const billingCode = kodeTransaksi || `BILL-${Date.now().toString().slice(-8)}`;
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);

  const handleCopy = () => {
    navigator.clipboard.writeText(billingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckStatus = () => {
    setPaymentStatus("checking");
    
    // Simulate payment check (replace with actual API call)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      if (isSuccess) {
        setPaymentStatus("success");
        setTimeout(() => {
          if (onPaymentSuccess) onPaymentSuccess();
          handleClose();
        }, 2000);
      } else {
        setPaymentStatus("failed");
        setTimeout(() => {
          setPaymentStatus("waiting");
        }, 2000);
      }
    }, 2000);
  };

  const handleClose = () => {
    setPaymentStatus("waiting");
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Kode Billing</h3>
                <p className="text-sm text-blue-50 mt-1">Bayar melalui ATM/Bank</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Payment Amount */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 text-center border border-blue-100">
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">Total Pembayaran</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              Rp {nominal.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Status Display */}
          {paymentStatus === "success" ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Pembayaran Berhasil!</h4>
              <p className="text-sm text-green-600 text-center">
                Transaksi Anda telah dikonfirmasi
              </p>
            </div>
          ) : paymentStatus === "failed" ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <X className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-red-800 mb-2">Pembayaran Belum Diterima</h4>
              <p className="text-sm text-red-600 text-center">
                Silakan periksa kembali atau coba lagi
              </p>
            </div>
          ) : (
            <>
              {/* Billing Code */}
              <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <p className="text-xs text-gray-600 dark:text-slate-300 mb-3 text-center">Kode Billing Anda</p>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 mb-3">
                  <p className="text-3xl font-mono font-bold text-center tracking-wider">
                    {billingCode}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="w-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-700 dark:text-slate-200 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Salin Kode
                    </>
                  )}
                </button>
              </div>

              {/* Expiry Info */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">⏰</span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-orange-800">Berlaku Hingga</p>
                  <p className="text-orange-600">
                    {expiryDate.toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cara Pembayaran:</h4>
            
            {/* ATM Instructions */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 dark:text-slate-200 mb-2">🏧 Melalui ATM:</p>
              <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300 ml-4">
                <div className="flex gap-2">
                  <span className="flex-shrink-0">1.</span>
                  <p>Pilih menu "Pembayaran"</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">2.</span>
                  <p>Pilih "Lainnya" atau "Multipayment"</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">3.</span>
                  <p>Masukkan kode billing</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">4.</span>
                  <p>Konfirmasi pembayaran</p>
                </div>
              </div>
            </div>

            {/* Mobile Banking Instructions */}
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-slate-200 mb-2">📱 Melalui Mobile Banking:</p>
              <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300 ml-4">
                <div className="flex gap-2">
                  <span className="flex-shrink-0">1.</span>
                  <p>Login ke aplikasi mobile banking</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">2.</span>
                  <p>Pilih menu "Pembayaran" atau "Transfer"</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">3.</span>
                  <p>Pilih "Billing" atau "Virtual Account"</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0">4.</span>
                  <p>Masukkan kode billing dan konfirmasi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {paymentStatus === "waiting" && (
            <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-slate-300 mb-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Menunggu pembayaran...</span>
            </div>
          )}

          {/* Check Status Button */}
          {paymentStatus !== "success" && (
            <button
              onClick={handleCheckStatus}
              disabled={paymentStatus === "checking"}
              className="w-full bg-[#14CC99] text-white py-4 rounded-xl hover:bg-[#12b589] transition-colors flex items-center justify-center gap-2 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {paymentStatus === "checking" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memeriksa Status...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Cek Status Pembayaran
                </>
              )}
            </button>
          )}

          {/* Cancel Button */}
          {paymentStatus === "waiting" && (
            <button
              onClick={handleClose}
              className="w-full mt-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Batalkan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
