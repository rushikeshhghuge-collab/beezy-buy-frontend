import React, { useState, useEffect } from "react";
import { MdEdit, MdAdd, MdImage, MdCancel, MdSave } from "react-icons/md";

export default function ProductForm({ onSubmit, existingProduct, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setCategory(existingProduct.category);
      setBrand(existingProduct.brand);
      setPrice(existingProduct.price);
      setDiscount(existingProduct.discount ?? 0);
      setStock(existingProduct.stock);
      setWeight(existingProduct.weight || "");
      setStatus(existingProduct.status);
      setImagePreview(existingProduct.image || "");
    }
  }, [existingProduct]);

  const basePrice = parseFloat(price) || 0;
  const discountPct = parseFloat(discount) || 0;
  const finalPrice = (basePrice - basePrice * (discountPct / 100)).toFixed(2);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("brand", brand || "Generic Brand");
    fd.append("price", basePrice);
    fd.append("discountPercentage", discountPct);
    fd.append("stockQuantity", parseInt(stock, 10) || 0);
    fd.append("weight", weight || "N/A");
    fd.append("status", status);
    if (imageFile) fd.append("productImage", imageFile);
    // If editing and no new file, keep existing image URL
    if (!imageFile && existingProduct?.image) fd.append("productImage", existingProduct.image);

    if (existingProduct) {
      onSubmit(fd, existingProduct._id || existingProduct.id);
    } else {
      onSubmit(fd);
    }
  };

  const inputClass = "w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 outline-none font-medium text-stone-800 focus:border-amber-500 focus:bg-white transition-all";
  const labelClass = "block uppercase text-[11px] font-bold text-stone-400 tracking-wider mb-2";

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-8 max-w-3xl mx-auto shadow-md">
      <h3 className="text-base font-extrabold text-stone-900 uppercase tracking-wider mb-8 flex items-center gap-2.5">
        {existingProduct ? (
          <><MdEdit className="w-5 h-5 text-amber-500" /> Edit Product</>
        ) : (
          <><MdAdd className="w-5 h-5 text-amber-500" /> Add New Product</>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm font-semibold text-stone-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Product Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g. Lavender Hydrating Mist" required />
          </div>
          <div>
            <label className={labelClass}>Brand</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass} placeholder="e.g. BEEZY NATURALS" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              <option value="Skincare">Skincare</option>
              <option value="Body Care">Body Care</option>
              <option value="Beauty">Beauty</option>
              <option value="Hair Care">Hair Care</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Stock Count</label>
            <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} placeholder="Units..." required />
          </div>
          <div>
            <label className={labelClass}>Weight / Volume</label>
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="e.g. 50g, 100ml" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          <div>
            <label className={labelClass}>Base Price (₹)</label>
            <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Discount %</label>
            <input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} className={inputClass} />
          </div>
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-3 text-center">
            <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wide mb-1">Final Price</span>
            <span className="text-lg font-extrabold text-amber-600 font-mono">₹{finalPrice}</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Product Image</label>
          <div className="flex items-center gap-5 border-2 border-dashed border-stone-200 rounded-2xl p-4 bg-stone-50 hover:bg-stone-100/50 transition-colors">
            <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleImageChange} className="text-sm text-stone-500 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 file:transition-all" />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-md flex-shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-400 flex-shrink-0">
                <MdImage className="w-6 h-6" />
              </div>
            )}
          </div>
          {existingProduct?.image && !imageFile && (
            <p className="text-[11px] text-stone-400 mt-1 px-1">Current image will be kept if no new file is selected.</p>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          {onCancel && (
            <button type="button" onClick={onCancel} className="flex-1 flex items-center justify-center gap-2 bg-stone-100 text-stone-600 py-3.5 rounded-xl font-bold hover:bg-stone-200 text-xs transition-all uppercase tracking-wider border border-stone-200">
              <MdCancel className="text-base" /> Cancel
            </button>
          )}
          <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white py-3.5 rounded-xl font-bold text-xs shadow-md hover:brightness-105 transition-all uppercase tracking-wider">
            <MdSave className="text-base" />
            {existingProduct ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
