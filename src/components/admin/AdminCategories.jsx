import { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { CategoryModal } from "../modalWindows";

const AdminCategories = () => {
  const {
    categories,
    isLoadingCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useAdminStore();

  const [processing, setProcessing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: "" });

  console.log(categories);

  const resetForm = () => {
    setForm({ name: "" });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setForm({ name: category.name || "" });
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

    const categoryData = { name: form.name };

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
      } else {
        await createCategory(categoryData);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? Categories with products cannot be deleted."
      )
    ) {
      return;
    }
    setProcessing(categoryId);
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-warning d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="fa fa-tags me-2"></i>
            Categories Management
          </h4>
          <button className="btn btn-dark btn-sm" onClick={openCreateModal}>
            <i className="fa fa-plus me-1"></i> Add Category
          </button>
        </div>
        <div className="card-body">
          {isLoadingCategories ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-folder-open fa-3x text-muted mb-3"></i>
              <h5>No Categories</h5>
              <p className="text-muted">Start by adding your first category.</p>
              <button className="btn btn-warning" onClick={openCreateModal}>
                <i className="fa fa-plus me-1"></i> Add Category
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>
                        <strong>{category.name}</strong>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => openEditModal(category)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
                            disabled={
                              processing === category.id ||
                              category.products?.length > 0
                            }
                            title={
                              category.products?.length > 0
                                ? "Cannot delete category with products"
                                : "Delete category"
                            }
                          >
                            {processing === category.id ? (
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

      {
        <CategoryModal
          show={showModal}
          editingCategory={editingCategory}
          onClose={closeModal}
          handleSubmit={handleSubmit}
          form={form}
          onChange={handleFormChange}
        />
      }
    </>
  );
};

export default AdminCategories;
