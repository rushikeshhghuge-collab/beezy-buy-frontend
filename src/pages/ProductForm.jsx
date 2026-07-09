import React, { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, existingProduct, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState(""); // Configured weight tracker state hook
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setCategory(existingProduct.category);
      setBrand(existingProduct.brand);
      setPrice(existingProduct.price);
      setDiscount(existingProduct.discount);
      setStock(existingProduct.stock);
      setWeight(existingProduct.weight || "");
      setStatus(existingProduct.status);
      setImage(existingProduct.image || "");
    }
  }, [existingProduct]);

  const basePrice = parseFloat(price) || 0;
  const discountPct = parseFloat(discount) || 0;
  const liveBeezyPrice = (basePrice - basePrice * (discountPct / 100)).toFixed(
    2,
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: existingProduct ? existingProduct.id : Date.now(),
      name,
      category,
      brand: brand || "Generic Brand",
      price: basePrice,
      discount: discountPct,
      finalPrice: parseFloat(liveBeezyPrice),
      stock: parseInt(stock, 10) || 0,
      weight: weight || "N/A", // Attaches item metrics cleanly down to dashboard states
      status,
      image,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-8 max-w-3xl mx-auto shadow-md">
      <h3 className="text-base font-extrabold text-stone-900 uppercase tracking-wider mb-8 flex items-center gap-2.5">
        {existingProduct ? (
          <>
            <svg
              className="w-5 h-5 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Modify Selected Catalog Profile
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Register Brand New Product Entry
          </>
        )}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-sm font-semibold text-stone-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Product Name/Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all"
              placeholder="e.g. Lavender Hydrating Mist"
              required
            />
          </div>
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Brand Designation
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all"
              placeholder="e.g. BEEZY NATURALS"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Category Classification
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all"
            >
              <option value="Skincare">Skincare</option>
              <option value="Body Care">Body Care</option>
              <option value="Beauty">Beauty</option>
              <option value="Hair Care">Hair Care</option>
            </select>
          </div>
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Stock Inventory Count
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-bold text-stone-800 focus:border-amber-500 focus:bg-white transition-all font-mono"
              placeholder="Units configuration..."
              required
            />
          </div>
          {/* Newly integrated Weight Parameter entry configuration panel */}
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Net Weight / Volume Size
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all"
              placeholder="e.g. 50g, 100ml, 1kg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Base Cost Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all font-mono"
              required
            />
          </div>
          <div>
            <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
              Active Markdown Discount %
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all font-mono"
            />
          </div>
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-3 text-center">
            <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wide mb-1">
              Live Beezy Premium Valuation
            </span>
            <span className="text-lg font-extrabold text-amber-600 font-mono">
              ₹{liveBeezyPrice}
            </span>
          </div>
        </div>

        <div>
          <label className="block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2">
            Product Media Display Asset
          </label>
          <div className="flex items-center gap-5 border-2 border-dashed border-stone-200 rounded-2xl p-4 bg-stone-50 hover:bg-stone-100/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-stone-500 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 file:transition-all"
            />
            {image ? (
              <img
                src={image}
                alt="Upload preview"
                className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-md flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-400 flex-shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-stone-100 text-stone-600 py-3.5 rounded-xl font-bold hover:bg-stone-200 text-xs transition-all uppercase tracking-wider border border-stone-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white py-3.5 rounded-xl font-bold text-xs shadow-md hover:brightness-105 transition-all uppercase tracking-wider"
          >
            {existingProduct
              ? "Commit Target System Update"
              : "Inject to Live Index"}
          </button>
        </div>
      </form>
    </div>
  );
}
