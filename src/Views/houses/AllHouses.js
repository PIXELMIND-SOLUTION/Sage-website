import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiCheckCircle, FiClock, FiList } from "react-icons/fi";

const TABS = {
  ALL: "all",
  APPROVED: "approved",
  PENDING: "pending",
};

const adminData = JSON.parse(sessionStorage.getItem("AdminData") || "{}");
const ADMIN_ID = adminData?._id || "";

const AllHouses = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(TABS.ALL);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://31.97.206.144:9174/api/getallproducts"
      );
      setProducts(res.data.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= FILTER BY TAB ================= */
  const filteredProducts = useMemo(() => {
    if (activeTab === TABS.APPROVED) {
      return products.filter((p) => p.isApproved === true);
    }
    if (activeTab === TABS.PENDING) {
      return products.filter((p) => !p.isApproved);
    }
    return products;
  }, [products, activeTab]);

  /* ================= APPROVE PRODUCT ================= */
  const approveProduct = async (productId) => {
    try {
      setActionLoading(productId);
      await axios.post(
        "http://31.97.206.144:9174/api/approve",
        {
          productId,
          adminId: ADMIN_ID,
          status: "approved",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      fetchProducts();
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`max-w-7xl mx-auto rounded-xl shadow p-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* ================= HEADER ================= */}
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Product Management
        </h2>

        {/* ================= NAVBAR TABS ================= */}
        <div className="flex gap-4 mb-6 border-b dark:border-gray-700">
          <TabButton
            active={activeTab === TABS.ALL}
            onClick={() => setActiveTab(TABS.ALL)}
            icon={<FiList />}
            label="All Products"
          />
          <TabButton
            active={activeTab === TABS.APPROVED}
            onClick={() => setActiveTab(TABS.APPROVED)}
            icon={<FiCheckCircle />}
            label="Approved"
          />
          <TabButton
            active={activeTab === TABS.PENDING}
            onClick={() => setActiveTab(TABS.PENDING)}
            icon={<FiClock />}
            label="Pending"
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className={darkMode ? "bg-gray-700" : "bg-blue-50"}>
              <tr>
                <Th>#</Th>
                <Th>Product</Th>
                <Th>Sub Category</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No Products Found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p, i) => (
                  <tr
                    key={p._id}
                    className="border-t dark:border-gray-700"
                  >
                    <Td>{i + 1}</Td>

                    <Td>
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          className="w-12 h-12 rounded object-cover"
                          alt=""
                        />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </Td>

                    <Td>{p.subCategory?.name}</Td>
                    <Td>{p.type || "-"}</Td>

                    <Td>
                      {p.isApproved ? (
                        <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
                          Approved
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </Td>

                    <Td>
                      {!p.isApproved ? (
                        <button
                          onClick={() => approveProduct(p._id)}
                          disabled={actionLoading === p._id}
                          className="px-4 py-1.5 rounded bg-green-600 text-white text-xs"
                        >
                          {actionLoading === p._id ? "Approving..." : "Approve"}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllHouses;

/* ================= UI HELPERS ================= */

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
      active
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-blue-600"
    }`}
  >
    {icon} {label}
  </button>
);

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left font-semibold">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3">
    {children}
  </td>
);
