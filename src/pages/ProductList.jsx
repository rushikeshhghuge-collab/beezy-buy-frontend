import React, { useState, useMemo } from "react";
import { MdSearch, MdEdit, MdDelete, MdInventory2, MdWarning } from "react-icons/md";

const CATEGORIES = ["All", "Skincare", "Body Care", "Beauty", "Hair Care"];

function DeleteModal({ product, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 max-w-sm w-full flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
          <MdWarning className="text-red-500 text-3xl" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-black text-stone-900 mb-1">Delete Product?</h3>
          <p className="text-sm text-stone-500 font-medium">
            <span className="font-bold text-stone-700">"{product.name}"</span> will be permanently removed. This cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 w-full pt-1">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-stone-100 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-200 transition-all border border-stone-200">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-all shadow-md">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductList({
  products, loading, onEdit, onDelete, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
}) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Use _id (MongoDB) or id (local fallback)
  const getId = (p) => p._id || p.id;

  const filtered = useMemo(() => products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [products, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-200 h-16 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {confirmDelete && (
        <DeleteModal
          product={confirmDelete}
          onConfirm={() => { onDelete(getId(confirmDelete)); setConfirmDelete(null); }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 w-full focus-within:bg-white focus-within:border-amber-500 transition-all">
          <MdSearch className="text-stone-400 text-lg mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-xs text-stone-700 font-medium placeholder-stone-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat ? "bg-amber-500 text-white shadow-md" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 flex flex-col items-center gap-3 text-stone-400">
          <MdInventory2 className="text-5xl opacity-30" />
          <p className="font-medium text-sm">No products match your search.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-6 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Product</th>
                    <th className="text-left px-4 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Category</th>
                    <th className="text-left px-4 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Price</th>
                    <th className="text-left px-4 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Stock</th>
                    <th className="text-left px-4 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Status</th>
                    <th className="text-right px-6 py-4 text-[11px] font-black text-stone-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((product) => (
                    <tr key={getId(product)} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || product.productImage}
                            alt={product.name}
                            loading="lazy"
                            className="w-10 h-10 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&auto=format&fit=crop&q=80"; }}
                          />
                          <div>
                            <p className="font-bold text-stone-800 text-xs">{product.name}</p>
                            <p className="text-[11px] text-stone-400 font-medium">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full whitespace-nowrap">{product.category}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-stone-800 text-xs">₹{product.price}</p>
                        {product.discount > 0 && <p className="text-[11px] text-emerald-600 font-bold">{product.discount}% off</p>}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-bold ${product.stock < 50 ? "text-red-500" : "text-stone-700"}`}>
                          {(product.stock ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${product.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEdit(product)}
                            className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap"
                          >
                            <MdEdit className="text-sm" /> Edit
                          </button>
                          <button
                            onClick={() => setConfirmDelete(product)}
                            className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap"
                          >
                            <MdDelete className="text-sm" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {filtered.map((product) => (
              <div key={getId(product)} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={product.image || product.productImage}
                    alt={product.name}
                    loading="lazy"
                    className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&auto=format&fit=crop&q=80"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-stone-400 font-medium">{product.brand}</p>
                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">{product.category}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${product.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                    {product.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-stone-800 text-sm">₹{product.price}</p>
                    {product.discount > 0 && <p className="text-[11px] text-emerald-600 font-bold">{product.discount}% off</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-stone-400 font-medium">Stock</p>
                    <p className={`text-sm font-bold ${product.stock < 50 ? "text-red-500" : "text-stone-700"}`}>{(product.stock ?? 0).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(product)} className="flex-1 flex items-center justify-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-lg transition-all">
                    <MdEdit className="text-sm" /> Edit
                  </button>
                  <button onClick={() => setConfirmDelete(product)} className="flex-1 flex items-center justify-center gap-1 text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-all">
                    <MdDelete className="text-sm" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
