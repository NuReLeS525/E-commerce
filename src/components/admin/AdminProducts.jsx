import { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { ProductModal } from "../modalWindows";

const AdminProducts = () => {
  const {
    products,
    isLoadingProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    categories,
  } = useAdminStore();

  const [processing, setProcessing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      categoryId: "",
    });
    setEditingProduct(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      stockQuantity: product.stockQuantity?.toString() || "",
      categoryId: product.category?.id?.toString() || "",
    });
    setShowModal(true);
  };

   const closeModal = () => {
     setShowModal(false);
     resetForm();
   };

   const handleFormChange = (e) => {
     const { name, value } = e.target;
     setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();

     const productData = {
       name: form.name,
       description: form.description,
       price: parseFloat(form.price),
       stockQuantity: parseInt(form.stockQuantity),
       categoryId: parseInt(form.categoryId),
     };

     try {
       if (editingProduct) {
         await updateProduct(editingProduct.id, productData);
       } else {
         await createProduct(productData);
       }
       closeModal();
     } catch (error) {
       console.error("Error saving product:", error);
     }
   };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    setProcessing(productId);
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="fa fa-shopping-bag me-2"></i>
            Products Management
          </h4>
          <button className="btn btn-light btn-sm" onClick={openCreateModal}>
            <i className="fa fa-plus me-1"></i> Add Product
          </button>
        </div>
        <div className="card-body">
          {isLoadingProducts ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
              <h5>No Products</h5>
              <p className="text-muted">Start by adding your first product.</p>
              <button className="btn btn-success" onClick={openCreateModal}>
                <i className="fa fa-plus me-1"></i> Add Product
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <strong>{product.name}</strong>
                        {product.description && (
                          <small
                            className="d-block text-muted text-truncate"
                            style={{ maxWidth: "200px" }}
                          >
                            {product.description}
                          </small>
                        )}
                      </td>
                      <td>${parseFloat(product.price).toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${
                            product.stockQuantity > 10
                              ? "bg-success"
                              : product.stockQuantity > 0
                                ? "bg-warning"
                                : "bg-danger"
                          }`}
                        >
                          {product.stockQuantity}
                        </span>
                      </td>
                      <td>{product.category?.name || "N/A"}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => openEditModal(product)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(product.id)}
                            disabled={processing === product.id}
                          >
                            {processing === product.id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <i className="fa fa-trash"></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        editingProduct={editingProduct}
        form={form}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        categories={categories}
      />
    </>
  );
};

export default AdminProducts;
