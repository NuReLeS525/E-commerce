import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const { currentProduct, isLoadingProduct, getProductById, products, getProducts } = useProductStore();
  const { isAuthenticated } = useAuthStore();
  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    getProductById(id);
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      let allProducts = products;
      if (products.length === 0) {
        allProducts = await getProducts();
      }

      if (currentProduct) {
        const similar = allProducts
          .filter((p) => 
            p.category === currentProduct.category && 
            p.id !== currentProduct.id
          )
          .slice(0, 4);
        setSimilarProducts(similar);
      }
    };

    if (currentProduct) {
      fetchSimilar();
    }
  }, [currentProduct, products]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    if (!currentProduct) return null;

    return (
      <div className="container my-md-5 my-3 py-2">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-md-6 order-1">
            <div
              className="bg-light rounded-4 p-4 p-md-5 d-flex align-items-center justify-content-center"
              style={{ minHeight: "350px", maxHeight: "600px" }}
            >
              <img
                className="img-fluid"
                src={currentProduct.image}
                alt={currentProduct.title}
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 order-2 px-3 px-md-5">
            <div className="py-2">
              <nav aria-label="breadcrumb" className="mb-2">
                <ol className="breadcrumb small text-uppercase mb-0">
                  <li className="breadcrumb-item text-muted">
                    {currentProduct.category}
                  </li>
                </ol>
              </nav>

              <h1 className="fw-bold display-6 mb-3 responsive-title">
                {currentProduct.title}
              </h1>

              <div className="d-flex align-items-center mb-4 gap-2">
                <span className="badge bg-dark rounded-pill">
                  {currentProduct.rating?.rate}{" "}
                  <i className="fa fa-star ms-1 small text-warning"></i>
                </span>
                <span className="text-muted small border-start ps-2">
                  {currentProduct.rating?.count} Reviews
                </span>
              </div>

              <h3 className="fw-light mb-4 text-primary">${currentProduct.price}</h3>

              <p className="text-secondary mb-4 description-text">
                {currentProduct.description}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <button
                    className="btn btn-dark btn-lg px-5 py-3 flex-grow-1 border-0 rounded-0"
                    style={{
                      letterSpacing: "2px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                    onClick={() => addProduct(currentProduct)}
                  >
                    ADD TO CART
                  </button>
                  <Link
                    to="/cart"
                    className="btn btn-outline-dark btn-lg px-4 py-3 rounded-0"
                    style={{ letterSpacing: "2px", fontSize: "0.9rem" }}
                  >
                    VIEW BAG
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{isLoadingProduct ? <Loading /> : <ShowProduct />}</div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
