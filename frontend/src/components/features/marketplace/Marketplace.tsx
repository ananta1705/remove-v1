import { useState } from "react";
import { ShoppingBag, Search, Filter, Tag, Package, MapPin, Info } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: string;
  price: string;
  location: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Bahan RDF Grade A",
    category: "Bahan RDF",
    stock: "45 Ton",
    price: "Rp 450.000 / Ton",
    location: "TPST Purwokerto Pusat",
    description: "Refuse-Derived Fuel hasil olahan sampah anorganik terilah dengan nilai kalor tinggi untuk industri semen/pembangkit.",
  },
  {
    id: 2,
    name: "Pupuk Kompos Organik Super",
    category: "Kompos Organik",
    stock: "30 Ton",
    price: "Rp 850.000 / Ton",
    location: "TPS3R Wilayah Selatan",
    description: "Kompos matang dari fermentasi organik pasar, kaya unsur hara untuk pertanian dan perkebunan.",
  },
  {
    id: 3,
    name: "Biji Plastik PET Daur Ulang",
    category: "Daur Ulang Plastik",
    stock: "12 Ton",
    price: "Rp 6.500 / Kg",
    location: "TPST Wilayah Barat",
    description: "Cacahan plastik botol PET bersih siap cetak ulang untuk kebutuhan manufaktur kemasan.",
  },
  {
    id: 4,
    name: "Pupuk Organik Cair (POC)",
    category: "Kompos Organik",
    stock: "500 Liter",
    price: "Rp 15.000 / Liter",
    location: "TPS3R Wilayah Timur",
    description: "Cairan hasil ekstraksi sampah sisa makanan terolah bio-aktivator untuk penyubur daun & akar tanaman.",
  },
];

export function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "Semua Kategori" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#14CC99]" /> Marketplace Komoditas Olahan Sampah
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Katalog ketersediaan hasil olahan sampah (RDF, Kompos, & Plastik) untuk kemitraan industri & pertanian.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari komoditas olahan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white transition-all"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#14CC99]/50 dark:text-white cursor-pointer"
          >
            <option value="Semua Kategori">Semua Kategori</option>
            <option value="Bahan RDF">Bahan RDF</option>
            <option value="Kompos Organik">Kompos Organik</option>
            <option value="Daur Ulang Plastik">Daur Ulang Plastik</option>
          </select>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#14CC99]/10 text-[#14CC99]">
                  {p.category}
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-slate-400 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-blue-500" /> {p.stock}
                </span>
              </div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-2 group-hover:text-[#14CC99] transition-colors">{p.name}</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">{p.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {p.location}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-gray-400">Harga:</span>
                <span className="text-sm font-black text-[#14CC99]">{p.price}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(p)}
                className="w-full py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-[#14CC99] text-gray-700 dark:text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" /> Informasi Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#14CC99]/10 text-[#14CC99]">{selectedProduct.category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{selectedProduct.name}</h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1.5 bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-gray-600 rounded-full">✕</button>
            </div>

            <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">{selectedProduct.description}</p>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 text-xs border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Stok Ketersediaan:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedProduct.stock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lokasi Pengolahan:</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedProduct.location}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-slate-700">
                <span className="text-gray-500 font-bold">Harga Satuan:</span>
                <span className="font-black text-[#14CC99] text-sm">{selectedProduct.price}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full py-3 bg-[#14CC99] text-white text-xs font-bold rounded-xl hover:bg-[#12b589] transition-colors"
            >
              Tutup Informasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
