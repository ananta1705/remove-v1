"use client";

import { Trash2 } from "lucide-react";

interface DeleteTPSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tpsName: string;
}

export function DeleteTPSModal({ isOpen, onClose, onConfirm, tpsName }: DeleteTPSModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 relative" onClick={e => e.stopPropagation()}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-50 text-red-500">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Konfirmasi Hapus</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
          Apakah Anda yakin ingin menghapus data TPS bernama <strong>{tpsName}</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 text-white text-sm font-bold rounded-xl transition-colors shadow-md bg-red-500 hover:bg-red-600 shadow-red-500/20"
          >
            Hapus
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
