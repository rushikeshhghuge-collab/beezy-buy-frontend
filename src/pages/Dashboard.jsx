import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import Sidebar from "../components/Sidebar"; // Make sure your path is correct here

export default function Dashboard() {
  // Use pure state to eliminate routing/search param sync issues completely
  const [currentTab, setCurrentTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inspectingProduct, setInspectingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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
            image:
              "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop&q=80",
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
            image:
              "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("beezy_products_v5", JSON.stringify(products));
  }, [products]);

  const handleAddProductSubmit = (newProd) => {
    if (!newProd.image) {
      newProd.image =
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80";
    }
    setProducts([newProd, ...products]);
    toast.success(`${newProd.name} added successfully!`);
    setCurrentTab("inventory");
  };

  // Triggers when ProductForm submits changes
  const handleEditProductSubmit = (updatedProd) => {
    setProducts(
      products.map((p) => (p.id === updatedProd.id ? updatedProd : p)),
    );

    toast.success("Changes saved! Product details updated successfully.", {
      style: {
        fontFamily: "'Outfit', sans-serif",
        fontSize: "14px",
        fontWeight: "600",
      },
    });

    setEditingProduct(null);
    setCurrentTab("inventory");
  };

  // Triggers when delete icon is hit inside ProductList
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));

      toast.error("Product has been removed from inventory.", {
        style: {
          fontFamily: "'Outfit', sans-serif",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] flex antialiased font-['Outfit',sans-serif]">
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Container for notifications to pop up onto screen view */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full flex min-h-screen">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="flex-1 flex flex-col bg-[#FAF9F5]">
          <header className="bg-white border-b border-stone-200/80 px-10 py-6">
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-3">
              <svg
                className="w-6 h-6 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Inventory Management
            </h2>
          </header>

          <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
            {currentTab === "inventory" && (
              <ProductList
                products={products}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setCurrentTab("edit-product"); // Instantly display edit window form block
                }}
                onDelete={handleDeleteProduct}
                onInspect={(p) => setInspectingProduct(p)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {currentTab === "add-product" && (
              <ProductForm onSubmit={handleAddProductSubmit} />
            )}

            {/* The edit-product frame view */}
            {currentTab === "edit-product" && (
              <ProductForm
                existingProduct={editingProduct}
                onSubmit={handleEditProductSubmit}
                onCancel={() => {
                  setEditingProduct(null);
                  setCurrentTab("inventory");
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
