import React, { useState, useEffect, useCallback, memo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MdInventory, MdDashboard, MdTrendingUp, MdWarning,
  MdCheckCircle, MdCategory, MdAttachMoney, MdLocalOffer, MdRefresh,
} from "react-icons/md";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import Sidebar from "../components/Sidebar";
import AdminProfile from "../components/AdminProfile";
import axiosInstance from "../api";

const FIXED_CATEGORIES = ["Skincare", "Body Care", "Beauty", "Hair Care"];
const CATEGORY_COLORS = {
  "Skincare":  { bar: "from-pink-400 to-pink-500",     badge: "bg-pink-50 text-pink-600 border-pink-200" },
  "Body Care": { bar: "from-amber-400 to-amber-500",   badge: "bg-amber-50 text-amber-600 border-amber-200" },
  "Beauty":    { bar: "from-violet-400 to-violet-500", badge: "bg-violet-50 text-violet-600 border-violet-200" },
  "Hair Care": { bar: "from-emerald-400 to-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

// ── Normalize API product → UI shape ─────────────────────────────────────────
const normalize = (p) => ({
  id: p._id,
  _id: p._id,
  name: p.name,
  category: p.category,
  brand: p.brand,
  price: p.price,
  discount: p.discountPercentage ?? 0,
  stock: p.stockQuantity ?? 0,
  weight: p.weight || "",
  status: p.status,
  image: p.productImage || "",
});

// ── Dashboard Stats ───────────────────────────────────────────────────────────
const DashboardStats = memo(function DashboardStats({ stats, products, loading }) {
  const categoryMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categories = FIXED_CATEGORIES.map((cat) => [cat, categoryMap[cat] || 0]);
  const maxCount = Math.max(...categories.map(([, c]) => c), 1);

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const statCards = [
    { label: "Total Products",  value: stats.totalProducts ?? 0,   icon: MdInventory,   bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200"  },
    { label: "Active Listings", value: stats.activeProducts ?? 0,  icon: MdCheckCircle, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    { label: "Low Stock Items", value: stats.lowStock ?? 0,        icon: MdWarning,     bg: "bg-red-50",     text: "text-red-500",     border: "border-red-200"    },
    { label: "Total Stock",     value: stats.totalStock ?? 0,      icon: MdLocalOffer,  bg: "bg-violet-50",  text: "text-violet-600",  border: "border-violet-200" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {[1,2,3,4].map((i) => <div key={i} className="bg-stone-100 rounded-2xl p-5 h-28 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statCards.map(({ label, value, icon: Icon, bg, text, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-4 sm:p-5 flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] sm:text-[11px] font-black text-stone-500 uppercase tracking-widest">{label}</p>
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <Icon className={`text-base sm:text-lg ${text}`} />
              </div>
            </div>
            <p className={`text-2xl sm:text-3xl font-black ${text}`}>{value.toLocaleString()}</p>
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
            <p className="text-xl sm:text-2xl font-black text-white">₹{totalValue.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
          <MdTrendingUp className="text-emerald-400 text-base" />
          <span className="text-xs font-bold text-emerald-400">{stats.activeProducts ?? 0} of {stats.totalProducts ?? 0} active</span>
        </div>
      </div>

      {/* Category Breakdown + Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <div className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-700`} style={{ width: count === 0 ? "4px" : `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
                <div key={p._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-11 h-11 rounded-xl object-cover border border-stone-200 flex-shrink-0" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&auto=format&fit=crop&q=80"; }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate">{p.name}</p>
                    <p className="text-[11px] text-stone-400 font-medium">{p.brand} · {p.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-black text-stone-800">₹{p.price}</p>
                    <p className={`text-[11px] font-bold ${p.stock < 50 ? "text-red-500" : "text-emerald-600"}`}>{p.stock} units</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>{p.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // ── Fetch products ──────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/products?limit=100");
      setProducts((data.data || []).map(normalize));
    } catch {
      toast.error("Could not load products.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch stats ─────────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/products/stats");
      // Add lowStock count from products
      setStats(data.stats || {});
    } catch {
      // stats are non-critical, fail silently
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, [fetchProducts, fetchStats]);

  // Update lowStock in stats whenever products change
  useEffect(() => {
    if (products.length > 0) {
      setStats((prev) => ({ ...prev, lowStock: products.filter((p) => p.stock < 50).length }));
    }
  }, [products]);

  // ── Add product ─────────────────────────────────────────────────────────────
  const handleAddProductSubmit = async (formData) => {
    try {
      await axiosInstance.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added!", { duration: 2000 });
      fetchProducts();
      fetchStats();
      setCurrentTab("inventory");
    } catch (err) {
      toast.error(err || "Failed to add product.", { duration: 2000 });
    }
  };

  // ── Edit product ────────────────────────────────────────────────────────────
  const handleEditProductSubmit = async (formData, id) => {
    try {
      await axiosInstance.put(`/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated!", { duration: 2000 });
      fetchProducts();
      fetchStats();
      setEditingProduct(null);
      setCurrentTab("inventory");
    } catch (err) {
      toast.error(err || "Failed to update product.", { duration: 2000 });
    }
  };

  // ── Delete product ──────────────────────────────────────────────────────────
  const handleDeleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setStats((prev) => ({ ...prev, totalProducts: (prev.totalProducts || 1) - 1 }));
      toast.error("Product removed.", { duration: 2000 });
    } catch (err) {
      toast.error(err || "Failed to delete product.", { duration: 2000 });
    }
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
          <div className="flex items-center gap-2">
            <button onClick={() => { fetchProducts(); fetchStats(); }} title="Refresh" className="text-stone-400 hover:text-amber-600 transition-colors p-1.5 rounded-lg hover:bg-stone-100">
              <MdRefresh className="text-xl" />
            </button>
            <AdminProfile />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {currentTab === "dashboard" && (
            <DashboardStats stats={stats} products={products} loading={loading} />
          )}

          {currentTab === "inventory" && (
            <ProductList
              products={products}
              loading={loading}
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
