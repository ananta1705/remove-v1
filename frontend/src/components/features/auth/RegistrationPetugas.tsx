"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, UserPlus, IdCard, Calendar, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
const logoImage = "/images/logo.png";

export function RegistrationPetugas() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    tanggalLahir: "",
    jenisKelamin: "",
    nip: "",
    jabatan: "",
    statusPegawai: "",
    wilayahTugas: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = "Tanggal lahir wajib diisi";
    }

    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = "Jenis kelamin wajib dipilih";
    }

    if (!formData.nip.trim()) {
      newErrors.nip = "NIP wajib diisi";
    } else if (!/^[0-9]{8,18}$/.test(formData.nip)) {
      newErrors.nip = "NIP tidak valid (8-18 digit)";
    }

    if (!formData.jabatan) {
      newErrors.jabatan = "Jabatan wajib dipilih";
    }

    if (!formData.statusPegawai) {
      newErrors.statusPegawai = "Status pegawai wajib dipilih";
    }

    if (!formData.wilayahTugas.trim()) {
      newErrors.wilayahTugas = "Wilayah tugas wajib diisi";
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
      alert(`Pendaftaran Petugas Berhasil!\n\nSelamat datang, ${formData.nama}!\nJabatan: ${formData.jabatan}\nNIP: ${formData.nip}\n\nSilakan login dengan email: ${formData.email}`);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src={logoImage} alt="ReMove Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Registrasi Petugas Kebersihan</h1>
          <p className="text-gray-600 dark:text-slate-300">Bergabung sebagai petugas dalam sistem ReMove</p>
        </div>

        {/* Registration Form */}
        <div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)"
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-700">
                <User className="w-5 h-5 text-[#14CC99]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Pribadi</h3>
              </div>

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

              {/* Email, Phone & Date of Birth - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                {/* Tanggal Lahir */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="tanggalLahir"
                      value={formData.tanggalLahir}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                        errors.tanggalLahir ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.tanggalLahir && <p className="mt-1 text-xs text-red-500">{errors.tanggalLahir}</p>}
                </div>
              </div>

              {/* Jenis Kelamin & Alamat - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.jenisKelamin ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  {errors.jenisKelamin && <p className="mt-1 text-xs text-red-500">{errors.jenisKelamin}</p>}
                </div>

                {/* Alamat */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      placeholder="Masukkan alamat lengkap"
                      className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                        errors.alamat ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat}</p>}
                </div>
              </div>
            </div>

            {/* Employment Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-700">
                <Briefcase className="w-5 h-5 text-[#14CC99]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Kepegawaian</h3>
              </div>

              {/* NIP & Jabatan - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NIP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    NIP <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nip"
                      value={formData.nip}
                      onChange={handleChange}
                      placeholder="Nomor Induk Pegawai (8-18 digit)"
                      className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                        errors.nip ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.nip && <p className="mt-1 text-xs text-red-500">{errors.nip}</p>}
                </div>

                {/* Jabatan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.jabatan ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  >
                    <option value="">Pilih jabatan</option>
                    <option value="Petugas Pengangkut">Petugas Pengangkut</option>
                    <option value="Petugas Sortir">Petugas Sortir</option>
                    <option value="Koordinator Lapangan">Koordinator Lapangan</option>
                    <option value="Driver">Driver</option>
                    <option value="Petugas TPS">Petugas TPS</option>
                  </select>
                  {errors.jabatan && <p className="mt-1 text-xs text-red-500">{errors.jabatan}</p>}
                </div>
              </div>

              {/* Status Pegawai & Wilayah Tugas - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Pegawai */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Status Pegawai <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="statusPegawai"
                    value={formData.statusPegawai}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                      errors.statusPegawai ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                    }`}
                  >
                    <option value="">Pilih status pegawai</option>
                    <option value="Tetap">Tetap</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Honorer">Honorer</option>
                    <option value="Magang">Magang</option>
                  </select>
                  {errors.statusPegawai && <p className="mt-1 text-xs text-red-500">{errors.statusPegawai}</p>}
                </div>

                {/* Wilayah Tugas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    Wilayah Tugas <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="wilayahTugas"
                      value={formData.wilayahTugas}
                      onChange={handleChange}
                      placeholder="Contoh: Kecamatan Menteng"
                      className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14CC99] transition-all ${
                        errors.wilayahTugas ? "border-red-300" : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.wilayahTugas && <p className="mt-1 text-xs text-red-500">{errors.wilayahTugas}</p>}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-700">
                <Lock className="w-5 h-5 text-[#14CC99]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Keamanan Akun</h3>
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
            </div>

            {/* Terms & Conditions */}
            <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <p className="text-xs text-gray-700 dark:text-slate-200 leading-relaxed">
                <span className="font-semibold text-[#14CC99]">Informasi Penting:</span> Dengan mendaftar sebagai petugas, Anda menyetujui untuk melaksanakan tugas sesuai dengan SOP yang berlaku dan bertanggung jawab atas wilayah tugas yang diberikan.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#14CC99] text-white py-4 rounded-xl font-medium hover:bg-[#12b589] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Daftar Sebagai Petugas
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Sudah terdaftar?{" "}
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
            Untuk pertanyaan terkait registrasi, hubungi Admin DLH di{" "}
            <span className="text-[#14CC99] font-medium">admin@remove.com</span>
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