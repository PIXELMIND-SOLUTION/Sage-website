import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiX,
  FiPlus
} from "react-icons/fi";
import SubCategories from "./SubCategories";

const Categories = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  /* ===== CREATE CATEGORY ===== */
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  /* ===== CREATE SUB CATEGORY ===== */
  const [openCreateSub, setOpenCreateSub] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subImage, setSubImage] = useState(null);
  const [parentCategory, setParentCategory] = useState("");

  /* ===== EDIT CATEGORY ===== */
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://31.97.206.144:9174/api/auth/getall-categories"
      );
      setCategories(res.data.categories || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= CREATE CATEGORY ================= */
  const createCategory = async () => {
    if (!newCategoryName.trim()) return;

    await axios.post(
      "http://31.97.206.144:9174/api/auth/category/create",
      { name: newCategoryName }
    );

    setOpenCreateCategory(false);
    setNewCategoryName("");
    fetchCategories();
  };

  /* ================= CREATE SUB CATEGORY ================= */
  const createSubCategory = async () => {
    if (!parentCategory || !subCategoryName || !subImage) return;

    const fd = new FormData();
    fd.append("categoryId", parentCategory);
    fd.append("name", subCategoryName);
    fd.append("image", subImage);

    await axios.post(
      "http://31.97.206.144:9174/api/auth/sub/create",
      fd
    );

    setOpenCreateSub(false);
    setSubCategoryName("");
    setSubImage(null);
    setParentCategory("");
  };

  /* ================= UPDATE CATEGORY ================= */
  const updateCategory = async () => {
    await axios.put(
      `http://31.97.206.144:9174/api/auth/category/${editId}`,
      { name: categoryName }
    );

    setOpenEdit(false);
    setEditId(null);
    setCategoryName("");
    fetchCategories();
  };

  /* ================= DELETE CATEGORY ================= */
  const deleteCategory = async () => {
    if (!window.confirm("Delete this category?")) return;

    await axios.delete(
      `http://31.97.206.144:9174/api/auth/category/${editId}`
    );

    setOpenEdit(false);
    setEditId(null);
    setCategoryName("");
    fetchCategories();
  };

  /* ================= SUB CATEGORY VIEW ================= */
  if (activeCategory) {
    return (
      <SubCategories
        category={activeCategory}
        darkMode={darkMode}
        onBack={() => setActiveCategory(null)}
      />
    );
  }

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`max-w-5xl mx-auto rounded-xl shadow p-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-600">Categories</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setOpenCreateCategory(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              <FiPlus /> Category
            </button>

            <button
              onClick={() => setOpenCreateSub(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              <FiPlus /> SubCategory
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="min-w-full text-sm">
          <thead className={darkMode ? "bg-gray-700" : "bg-blue-50"}>
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-10">Loading...</td>
              </tr>
            ) : (
              categories.map((c, i) => (
                <tr key={c._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setActiveCategory(c)}
                      className="p-2 rounded bg-blue-100 text-blue-700"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => {
                        setEditId(c._id);
                        setCategoryName(c.name);
                        setOpenEdit(true);
                      }}
                      className="p-2 rounded bg-yellow-100 text-yellow-700"
                    >
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CREATE CATEGORY MODAL ================= */}
      {openCreateCategory && (
        <Modal title="Create Category" onClose={() => setOpenCreateCategory(false)}>
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="Category name"
          />
          <ModalActions>
            <BtnGray onClick={() => setOpenCreateCategory(false)}>Cancel</BtnGray>
            <BtnBlue onClick={createCategory}>Save</BtnBlue>
          </ModalActions>
        </Modal>
      )}

      {/* ================= CREATE SUB CATEGORY MODAL ================= */}
      {openCreateSub && (
        <Modal title="Create Sub Category" onClose={() => setOpenCreateSub(false)}>
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="Sub category name"
          />

          <input
            type="file"
            onChange={(e) => setSubImage(e.target.files[0])}
          />

          <ModalActions>
            <BtnGray onClick={() => setOpenCreateSub(false)}>Cancel</BtnGray>
            <BtnGreen onClick={createSubCategory}>Save</BtnGreen>
          </ModalActions>
        </Modal>
      )}

      {/* ================= EDIT CATEGORY MODAL ================= */}
      {openEdit && (
        <Modal title="Update Category" onClose={() => setOpenEdit(false)}>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <ModalActions>
            <BtnRed onClick={deleteCategory}>
              <FiTrash2 /> Delete
            </BtnRed>
            <BtnBlue onClick={updateCategory}>Update</BtnBlue>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
};

export default Categories;

/* ================= UI HELPERS ================= */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-md p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onClose}><FiX /></button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

const ModalActions = ({ children }) => (
  <div className="flex gap-3 mt-4">{children}</div>
);

const BtnBlue = ({ children, onClick }) => (
  <button onClick={onClick} className="flex-1 bg-blue-600 text-white py-2 rounded">
    {children}
  </button>
);

const BtnGreen = ({ children, onClick }) => (
  <button onClick={onClick} className="flex-1 bg-green-600 text-white py-2 rounded">
    {children}
  </button>
);

const BtnRed = ({ children, onClick }) => (
  <button onClick={onClick} className="flex-1 bg-red-600 text-white py-2 rounded flex justify-center gap-2">
    {children}
  </button>
);

const BtnGray = ({ children, onClick }) => (
  <button onClick={onClick} className="flex-1 border py-2 rounded">
    {children}
  </button>
);
