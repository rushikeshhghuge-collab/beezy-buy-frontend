import React, { useState, useEffect, useMemo, memo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MdInventory, MdDashboard, MdTrendingUp, MdWarning,
  MdCheckCircle, MdCategory, MdAttachMoney, MdLocalOffer
} from "react-icons/md";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import Sidebar from "../components/Sidebar";
import AdminProfile from "../components/AdminProfile";

const FIXED_CATEGORIES = ["Skincare", "Body Care", "Beauty", "Hair Care"];

const CATEGORY_COLORS = {
  "Skincare":   { bar: "from-pink-400 to-pink-500",   badge: "bg-pink-50 text-pink-600 border-pink-200" },
  "Body Care":  { bar: "from-amber-400 to-amber-500", badge: "bg-amber-50 text-amber-600 border-amber-200" },
  "Beauty":     { bar: "from-violet-400 to-violet-500", badge: "bg-violet-50 text-violet-600 border-violet-200" },
  "Hair Care":  { bar: "from-emerald-400 to-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

const DashboardStats = memo(function DashboardStats({ products }) {
  const total = products.length;
  const active = products.filter((p) => p.status === "Active").length;
  const lowStock = products.filter((p) => p.stock < 50).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const avgDiscount = total
    ? (products.reduce((s, p) => s + (p.discount || 0), 0) / total).toFixed(1)
    : 0;

  const categoryMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  // Always show all 4 fixed categories, even if count is 0
  const categories = FIXED_CATEGORIES.map((cat) => [cat, categoryMap[cat] || 0]);
  const maxCount = Math.max(...categories.map(([, c]) => c), 1);

  const statCards = [
    { label: "Total Products",  value: total,           icon: MdInventory,    bg: "bg-amber-50",   text: "text-amber-600",  border: "border-amber-200"  },
    { label: "Active Listings", value: active,          icon: MdCheckCircle,  bg: "bg-emerald-50", text: "text-emerald-600",border: "border-emerald-200"},
    { label: "Low Stock Items", value: lowStock,        icon: MdWarning,      bg: "bg-red-50",     text: "text-red-500",    border: "border-red-200"    },
    { label: "Avg. Discount",   value: `${avgDiscount}%`, icon: MdLocalOffer, bg: "bg-violet-50",  text: "text-violet-600", border: "border-violet-200" },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statCards.map(({ label, value, icon: Icon, bg, text, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-4 sm:p-5 flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-black text-stone-500 uppercase tracking-widest">{label}</p>
              <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <Icon className={`text-lg ${text}`} />
              </div>
            </div>
            <p className={`text-2xl sm:text-3xl font-black ${text}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Inventory Value Banner */}
      <div className="bg-gradient-to-r from-[#0A1A12] to-[#1a3a22] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
            <MdAttachMoney className="text-amber-400 text-2xl" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-emerald-400/70 uppercase tracking-widest">Total Inventory Value</p>
            <p className="text-2xl font-black text-white">₹{totalValue.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
          <MdTrendingUp className="text-emerald-400 text-base" />
          <span className="text-xs font-bold text-emerald-400">{active} of {total} active</span>
        </div>
      </div>

      {/* Category Breakdown + Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown — always shows all 4 */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MdCategory className="text-amber-500 text-lg" />
            <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest">By Category</h3>
          </div>
          <div className="space-y-4">
            {categories.map(([cat, count]) => {
              const pct = Math.round((count / maxCount) * 100);
              const colors = CATEGORY_COLORS[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${colors.badge}`}>{cat}</span>
                    <span className="text-xs font-black text-stone-700">{count} <span className="text-stone-400 font-medium">items</span></span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-700`}
                      style={{ width: count === 0 ? "4px" : `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MdDashboard className="text-amber-500 text-lg" />
            <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest">Recent Products</h3>
          </div>
          {products.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No products added yet</p>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-11 h-11 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&auto=format&fit=crop&q=80"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate">{p.name}</p>
                    <p className="text-[11px] text-stone-400 font-medium">{p.brand} · {p.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-black text-stone-800">₹{p.price}</p>
                    <p className={`text-[11px] font-bold ${p.stock < 50 ? "text-red-500" : "text-emerald-600"}`}>
                      {p.stock} units
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState(() => {
    const cached = localStorage.getItem("beezy_products_v5");
    return cached
      ? JSON.parse(cached)
      : [
          {
            id: 1,
            name: "Almond Body Lotion",
            category: "Body Care",
            brand: "HONEY SAYS",
            price: 599.0,
            discount: 11,
            stock: 1500,
            weight: "250g",
            status: "Active",
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop&q=80",
          },
          {
            id: 2,
            name: "Lavender Face Serum",
            category: "Skincare",
            brand: "SKINCARE LABS",
            price: 999.0,
            discount: 30,
            stock: 330,
            weight: "50ml",
            status: "Active",
            image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("beezy_products_v5", JSON.stringify(products));
  }, [products]);

  const handleAddProductSubmit = (newProd) => {
    if (!newProd.image) newProd.image = "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80";
    setProducts([newProd, ...products]);
    toast.success(`${newProd.name} added successfully!`, { duration: 2000 });
    setCurrentTab("inventory");
  };

  const handleEditProductSubmit = (updatedProd) => {
    setProducts(products.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    toast.success("Changes saved! Product details updated successfully.", { duration: 2000 });
    setEditingProduct(null);
    setCurrentTab("inventory");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.error("Product removed from inventory.", { duration: 2000 });
  };

  const tabTitles = {
    dashboard: "Dashboard Overview",
    inventory: "Product Inventory",
    "add-product": "Add New Product",
    "edit-product": "Edit Product",
  };

  return (
    <div className="w-full flex min-h-screen bg-[#FAF9F5]">
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-stone-200/80 px-4 sm:px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <span className="w-5 h-0.5 bg-stone-700 rounded" />
              <span className="w-5 h-0.5 bg-stone-700 rounded" />
              <span className="w-5 h-0.5 bg-stone-700 rounded" />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-black text-stone-800 uppercase tracking-wider">
                {tabTitles[currentTab] || "Dashboard"}
              </h2>
              <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5 hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
          <AdminProfile />
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {currentTab === "dashboard" && <DashboardStats products={products} />}

          {currentTab === "inventory" && (
            <ProductList
              products={products}
              onEdit={(p) => { setEditingProduct(p); setCurrentTab("edit-product"); }}
              onDelete={handleDeleteProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {currentTab === "add-product" && (
            <ProductForm onSubmit={handleAddProductSubmit} />
          )}

          {currentTab === "edit-product" && (
            <ProductForm
              existingProduct={editingProduct}
              onSubmit={handleEditProductSubmit}
              onCancel={() => { setEditingProduct(null); setCurrentTab("inventory"); }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
