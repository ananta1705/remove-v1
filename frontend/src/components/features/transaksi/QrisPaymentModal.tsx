"use client";

import { X, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRISPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominal: number;
  onPaymentSuccess?: () => void;
  kodeTransaksi?: string;
}

export function QRISPaymentModal({ isOpen, onClose, nominal, onPaymentSuccess, kodeTransaksi }: QRISPaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<"waiting" | "checking" | "success" | "failed">("waiting");
  const [countdown, setCountdown] = useState(300); // 5 minutes
  
  useEffect(() => {
    if (isOpen && paymentStatus === "waiting") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isOpen, paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    setCountdown(300);
    onClose();
  };

  if (!isOpen) return null;

  // Generate QR Code data (in production, this should come from payment gateway)
  const qrCodeData = `QRIS-${kodeTransaksi || Date.now()}-${nominal}`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14CC99] to-green-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Pembayaran QRIS</h3>
              <p className="text-sm text-green-50 mt-1">Scan QR Code untuk membayar</p>
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
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6 text-center border border-green-100">
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">Total Pembayaran</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              Rp {nominal.toLocaleString('id-ID')}
            </p>
          </div>

          {/* QR Code */}
          {paymentStatus === "waiting" || paymentStatus === "checking" ? (
            <div className="bg-white dark:bg-slate-900 border-4 border-gray-100 dark:border-slate-800 rounded-2xl p-6 mb-6 flex flex-col items-center">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl">
                <QRCodeSVG
                  value={qrCodeData}
                  size={220}
                  level="H"
                  includeMargin={false}
                  className="mx-auto"
                />
              </div>
              
              {/* Timer */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Berlaku: {formatTime(countdown)}</span>
              </div>
            </div>
          ) : paymentStatus === "success" ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Pembayaran Berhasil!</h4>
              <p className="text-sm text-green-600 text-center">
                Transaksi Anda telah dikonfirmasi
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <X className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-red-800 mb-2">Pembayaran Gagal</h4>
              <p className="text-sm text-red-600 text-center">
                Silakan coba lagi
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cara Pembayaran:</h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
              <div className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[#14CC99] text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                <p>Buka aplikasi mobile banking atau e-wallet Anda</p>
              </div>
              <div className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[#14CC99] text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                <p>Pilih menu "Scan QR" atau "Bayar dengan QRIS"</p>
              </div>
              <div className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[#14CC99] text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                <p>Scan QR Code di atas</p>
              </div>
              <div className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[#14CC99] text-white rounded-full flex items-center justify-center text-[10px]">4</span>
                <p>Konfirmasi pembayaran di aplikasi Anda</p>
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
