import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiX } from "react-icons/fi";

const Plans = ({ darkMode }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  /* CREATE MODAL */
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productLimit, setProductLimit] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= FETCH PLANS ================= */
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://31.97.206.144:9174/api/auth/plans"
      );
      setPlans(res.data.plans || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= CREATE PLAN ================= */
  const createPlan = async () => {
    if (!name || price === "" || !productLimit || !durationInDays) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);
      await axios.post(
        "http://31.97.206.144:9174/api/auth/plan",
        {
          name,
          price: Number(price),
          productLimit: Number(productLimit),
          durationInDays: Number(durationInDays),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setOpenCreate(false);
      setName("");
      setPrice("");
      setProductLimit("");
      setDurationInDays("");
      fetchPlans();
    } finally {
      setSaving(false);
    }
  };

  /* ================= INPUT STYLE ================= */
  const inputClass = `
    w-full rounded-xl px-4 py-2.5 text-sm
    border border-gray-300 dark:border-gray-600
    bg-gray-50 dark:bg-gray-800
    text-black dark:text-white
    outline-none
    focus:ring-2 focus:ring-blue-500
  `;

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`max-w-5xl mx-auto rounded-xl shadow p-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-600">Plans</h2>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            <FiPlus /> Add Plan
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className={darkMode ? "bg-gray-700" : "bg-blue-50"}>
              <tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Product Limit</Th>
                <Th>Duration (Days)</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No Plans Found
                  </td>
                </tr>
              ) : (
                plans.map((p, i) => (
                  <tr key={p._id} className="border-t dark:border-gray-700">
                    <Td>{i + 1}</Td>
                    <Td className="font-medium">{p.name}</Td>
                    <Td>₹{p.price}</Td>
                    <Td>{p.productLimit}</Td>
                    <Td>{p.durationInDays}</Td>
                    <Td>
                      {p.isActive ? (
                        <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded bg-red-100 text-red-700">
                          Inactive
                        </span>
                      )}
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CREATE PLAN MODAL ================= */}
      {openCreate && (
        <Modal title="Create Plan" onClose={() => setOpenCreate(false)}>
          <input
            className={inputClass}
            placeholder="Plan Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className={inputClass}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className={inputClass}
            placeholder="Product Limit"
            value={productLimit}
            onChange={(e) => setProductLimit(e.target.value)}
          />

          <input
            type="number"
            className={inputClass}
            placeholder="Duration (Days)"
            value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setOpenCreate(false)}
              className="flex-1 border rounded-lg py-2"
            >
              Cancel
            </button>
            <button
              onClick={createPlan}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white rounded-lg py-2"
            >
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Plans;

/* ================= UI HELPERS ================= */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onClose}>
          <FiX />
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left font-semibold">
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-3 ${className}`}>
    {children}
  </td>
);
