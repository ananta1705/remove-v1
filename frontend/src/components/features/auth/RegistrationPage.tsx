"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
const logoImage = "/images/logo.png";

export function RegistrationPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.telepon.trim()) {
      newErrors.telepon = "Nomor telepon wajib diisi";
    } else if (!/^[0-9]{10,13}$/.test(formData.telepon.replace(/[-\s]/g, ""))) {
      newErrors.telepon = "Nomor telepon tidak valid (10-13 digit)";
    }

    if (!formData.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate registration success
      alert(`Pendaftaran berhasil!\n\nSelamat datang, ${formData.nama}!\nSilakan login dengan email: ${formData.email}`);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src={logoImage} alt="ReMove Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Daftar Akun ReMove</h1>
          <p className="text-gray-600 dark:text-slate-300">Bergabung dalam sistem pengelolaan sampah terintegrasi</p>
        </div>

        {/* Registration Form */}
        <div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)"
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                    errors.nama ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                  }`}
                />
              </div>
              {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
            </div>

            {/* Email & Phone - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.email ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.telepon ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  />
                </div>
                {errors.telepon && <p className="mt-1 text-xs text-red-500">{errors.telepon}</p>}
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap (jalan, nomor, RT/RW, kelurahan, kecamatan)"
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all resize-none ${
                    errors.alamat ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                  }`}
                />
              </div>
              {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat}</p>}
            </div>

            {/* Password & Confirm Password - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 karakter"
                    className={`w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.password ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Konfirmasi Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className={`w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.confirmPassword ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-slate-700">
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                Dengan mendaftar, Anda menyetujui{" "}
                <span className="text-[#14CC99] font-medium cursor-pointer hover:underline">Syarat & Ketentuan</span>
                {" "}dan{" "}
                <span className="text-[#14CC99] font-medium cursor-pointer hover:underline">Kebijakan Privasi</span>
                {" "}ReMove.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#14CC99] text-white py-4 rounded-xl font-medium hover:bg-[#12b589] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Daftar Sekarang
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Sudah punya akun?{" "}
              <button
                onClick={() => router.push("/")}
                className="text-[#14CC99] font-medium hover:underline"
              >
                Login di sini
              </button>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Butuh bantuan? Hubungi kami di{" "}
            <span className="text-[#14CC99] font-medium">support@remove.com</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            © 2026 <span className="font-bold text-gray-700 dark:text-slate-200">ReMove</span>. Sistem Pengelolaan Sampah Terintegrasi
          </p>
        </div>
      </div>
    </div>
  );
}