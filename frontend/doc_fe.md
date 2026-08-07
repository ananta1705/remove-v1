# Sistem Pengelolaan Sampah (ReMove) - Frontend

## 📁 Detail Struktur Folder & File (Root)

Berikut adalah struktur lengkap dan penjelasan mendetail mengenai file dan folder yang ada di direktori utama proyek `frontend`:

### 📄 File Konfigurasi (Root)
- **`package.json`** & **`package-lock.json`**: Jantung dari proyek Node.js. Menyimpan *scripts* (seperti `npm run dev`) dan daftar semua pustaka (*library* / dependensi) eksternal yang digunakan.
- **`next.config.ts`**: File konfigurasi utama Next.js. Digunakan untuk mengatur *environment variables*, konfigurasi domain gambar, dan pengaturan *build*.
- **`tailwind.config.ts`** & **`postcss.config.mjs`**: Konfigurasi *styling* sistem Tailwind CSS. Di sini kita mengatur palet warna tema, *font*, animasi kustom, dan plugin.
- **`tsconfig.json`**: Konfigurasi TypeScript. Mengatur aturan *typing* yang ketat dan alias direktori (contoh: `@/` yang menunjuk otomatis ke folder `src/`).
- **`eslint.config.mjs`**: Konfigurasi kode standar (*Linter*). Menjaga standar kualitas kode dengan mendeteksi dan mencegah *bad practice* (seperti variabel yang dideklarasikan namun tidak dipakai).
- **`next-env.d.ts`**: Tipe definisi khusus TypeScript dari Next.js. (Otomatis dibuat oleh sistem, **jangan diedit secara manual**).

### 📁 Folder Sistem Utama
- **`.next/`**: Folder hasil *build* kompilasi dan *cache* otomatis dari Next.js. **Jangan diedit manual**.
- **`node_modules/`**: Tempat semua pustaka eksternal NPM terpasang secara fisik.
- **`public/`**: Tempat menyimpan file statis publik (seperti logo, `favicon.ico`, robot.txt, dan gambar aset). File di sini bebas diakses langsung melalui URL tanpa diolah Webpack.

---

## 📁 Detail Struktur Source Code (`src/`)

Seluruh logika aplikasi (UI, Bisnis, Routing) ditempatkan di dalam folder `src/` menggunakan arsitektur *feature-driven* (berbasis fitur) agar lebih mudah dipelihara.

### 1. `app/` (Next.js App Router)
Folder ini menampung seluruh rute halaman (Pages) dan Layouts aplikasi. Tersusun berdasarkan *Role* (Peran):

- **`/admin`** (Halaman Admin)
  - `/laporan` - Laporan bank sampah.
  - `/marketplace` - Pengelolaan marketplace barang/sampah daur ulang.
  - `/monitoring` - Pemantauan operasional / TPS (Tempat Pembuangan Sementara).
  - `/notifikasi` - Pemberitahuan untuk admin.
  - `/pengaturan` - Pengaturan global platform.
  - `/pengguna` & `/petugas` - Manajemen data (Tambah, Edit, Lihat) untuk pengguna dan petugas.
  - `/transaksi` - Melihat seluruh riwayat transaksi.

- **`/pembeli`** (Halaman Masyarakat / Pembeli)
  - `/belanja` - Antarmuka marketplace untuk pembeli.
  - `/poin` - Manajemen poin reward (termasuk fitur tukar poin).
  - `/tracking` - Pelacakan transaksi / penjemputan sampah.
  - `/transaksi` - Riwayat transaksi pribadi.

- **`/petugas`** (Halaman Petugas Lapangan)
  - `/input` - Memasukkan data sampah yang disetorkan.
  - `/profil` & `/riwayat` - Profil petugas dan riwayat tugas mereka.
  - `/tracking` & `/notifikasi` - Fitur notifikasi dan pelacakan lapangan.

- **`/register`**
  - Akses pendaftaran pengguna baru atau petugas.

- **`layout.tsx` & `page.tsx`** (Root)
  - Layout dasar (penyedia *Theme/Providers*) dan Landing Page utama aplikasi.

### 2. `components/` (Komponen React)
Menyimpan semua komponen visual dan logika UI yang terisolasi.

- **`/features`** (Komponen Bisnis Spesifik)
  Di sini setiap fitur memiliki folder khusus. Ini membuat setiap logika bisnis tidak tercampur:
  - `auth/` - Formulir Login & Registrasi.
  - `dashboard/` - Tampilan Dashboard spesifik untuk Admin, Pembeli, dan Petugas.
  - `manajemen/` - Komponen tabel, form edit, form tambah untuk mengelola Pengguna & Petugas.
  - `marketplace/` - Katalog produk, Modal penambahan produk, tampilan belanja.
  - `transaksi/` - Komponen pembayaran (contoh: *QrisPaymentModal*, *BillingPaymentModal*).
  - Dan lain-lain (laporan, monitoring, pengaturan, poin, tracking).

- **`/layout`** (Komponen Layout / Pembungkus)
  - `AdminLayout.tsx` - Kerangka (Sidebar/Navbar) untuk admin.
  - `PembeliLayout.tsx` - Kerangka untuk pembeli.
  - `PetugasLayout.tsx` - Kerangka untuk petugas.
  - `Footer.tsx` - Footer aplikasi.

- **`/ui`** (Komponen Shadcn UI Dasar)
  - Kumpulan komponen dasar *reusable* dan *accessible* (Button, Card, Input, Dialog, Table, Drawer, dll). Di-generate oleh Shadcn CLI.

- **`providers.tsx`**
  - Membungkus aplikasi dengan Context, Theme Provider, atau Global State.

### 3. Folder Utilitas Tambahan
- **`constants/`** - Data statis (seperti daftar role, pengaturan menu, nilai *default*).
- **`context/`** - *React Context API* untuk state management skala kecil/menengah.
- **`hooks/`** - Kustomisasi *React Hooks* (misal: *hook* untuk auth atau notifikasi).
- **`lib/`** - Inisialisasi *library* luar (misal: utilitas `cn()` untuk Tailwind, konfigurasi *Axios*).
- **`services/`** - File-file fungsi untuk berkomunikasi dengan API/Backend (misal: `authService.ts`).
- **`types/`** - Definisi tipe `Interfaces` untuk TypeScript agar data memiliki struktur kuat.
- **`utils/`** - Fungsi helper (seperti pemformatan angka/mata uang Rupiah, atau format tanggal).

### 4. `middleware.ts`
Berfungsi sebagai gerbang keamanan (Router Guard). Skrip ini memverifikasi token dan *Role* (Peran) di level jaringan Next.js. Misalnya, mencegah 'Pembeli' membuka halaman `/admin`.

---

## 🛠️ Cara Menjalankan Proyek (Development)

Pastikan **Node.js** (rekomendasi LTS) sudah terinstal di komputer Anda.

1. **Instal Dependensi**
   Buka terminal, arahkan ke folder proyek ini, dan jalankan perintah:
   ```bash
   npm install
   ```

2. **Jalankan Server Development**
   Setelah semua dependensi siap, jalankan:
   ```bash
   npm run dev
   ```

3. **Akses Aplikasi**
   Buka browser favorit Anda (Chrome, Edge, dll) lalu ketikkan alamat:
   [http://localhost:3000](http://localhost:3000)
