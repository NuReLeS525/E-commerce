import React, { useState, useEffect } from "react";
import { Navbar, Footer, Product } from "../components";
import { useProductStore } from "../store/useProductStore";

const ProductsPage = () => {
  const [selectedCat, setSelectedCat] = useState("all");
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  // Get unique categories from products
  const categories = [
    { name: "All Products", value: "all" },
    ...[...new Set(products.map((p) => p.category))]
      .filter(Boolean)
      .map((cat) => ({
        name: cat,
        value: cat,
      })),
  ];

  return (
    <>
      <Navbar />
      <div className="container px-md-5 my-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5">Shop Our Collections</h2>
            <hr className="mx-auto" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-lg-2 mb-4">
            <div
              className="p-3 border rounded shadow-sm sticky-top"
              style={{ top: "100px", zIndex: "1" }}
            >
              <h5 className="mb-4 fw-bold">Categories</h5>
              <div className="category-list">
                {categories.map((cat) => (
                  <div className="form-check mb-3" key={cat.value}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="categoryRadio"
                      id={cat.value}
                      checked={selectedCat === cat.value}
                      onChange={() => setSelectedCat(cat.value)}
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      className={`form-check-label ${
                        selectedCat === cat.value
                          ? "fw-bold text-primary"
                          : "text-secondary"
                      }`}
                      htmlFor={cat.value}
                      style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-9 col-lg-10">
            <Product hideFilter={true} externalCategory={selectedCat} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
