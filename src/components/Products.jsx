import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";

const Products = ({ hideFilter, externalCategory }) => {
  const { products, isLoadingProducts, getProducts } = useProductStore();
  const { isAuthenticated } = useAuthStore();
  const [filter, setFilter] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterProduct = (cat) => {
    if (cat === "all") {
      setFilter(products);
    } else {
      const updatedList = products.filter((item) => item.category === cat);
      setFilter(updatedList);
    }
    setActiveCategory(cat);
  };

  useEffect(() => {
    if (externalCategory) {
      filterProduct(externalCategory);
    }
  }, [externalCategory, products]);

  const handleFilter = (category) => {
    if (activeCategory === category) {
      filterProduct("all");
    } else {
      filterProduct(category);
    }
  };

  const addProduct = (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    dispatch(addCart(product));
    toast.success("Added to cart"); 
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    } else {
      setFilter(products);
    }
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div className="col-md-3 col-sm-6 col-12 mb-4" key={n}>
            <Skeleton height={400} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div
          className={`align-items-center justify-content-between ${
            hideFilter ? "d-none" : "d-flex"
          }`}
        >
          <div className="buttons py-5">
            {(() => {
              const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
              return categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm m-2 ${
                    activeCategory === cat ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => handleFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ));
            })()}
          </div>
          <Link className="btn btn-outline-success btn-sm m-2" to="/product">
            See all
          </Link>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-3 col-sm-6 col-12 mb-4"
              style={{ transition: "transform 0.2s" }}
            >
              <div
                className="bg-light rounded-3 overflow-hidden"
                style={{ height: "240px" }}
              >
                <img
                  className="w-100 h-100 p-4"
                  src={product.image}
                  alt={product.title}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="card-body px-1 py-3 text-start">
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <h6
                    className="card-title fw-bold mb-0 text-truncate"
                    style={{ maxWidth: "70%" }}
                  >
                    {product.title}
                  </h6>
                  <span className="fw-light text-muted">${product.price}</span>
                </div>

                <p
                  className="card-text small text-secondary mb-3"
                  style={{
                    minHeight: "50px",
                    maxHeight: "50px",
                    overflow: "hidden",
                  }}
                >
                  {product.description.substring(0, 60)}...
                </p>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm rounded-pill"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-link btn-sm text-decoration-none text-dark"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {isLoadingProducts ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
