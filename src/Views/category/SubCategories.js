import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SubCategories = ({ category, onBack, darkMode }) => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://31.97.206.144:9174/api/auth/sub/category/${category._id}`
      );
      setSubs(res.data.subCategories || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, [category._id]);

  /* UPDATE SUB */
  const updateSub = async () => {
    await axios.put(
      `http://31.97.206.144:9174/api/auth/sub/${editId}`,
      { name }
    );
    setEditId(null);
    setName("");
    fetchSubs();
  };

  /* DELETE SUB */
  const deleteSub = async (id) => {
    if (!window.confirm("Delete this sub category?")) return;
    await axios.delete(
      `http://31.97.206.144:9174/api/auth/sub/${id}`
    );
    fetchSubs();
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`max-w-6xl mx-auto rounded-xl shadow p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
            <FiArrowLeft />
          </button>
          <h2 className="text-xl font-bold text-blue-600">
            Sub Categories – {category.name}
          </h2>
        </div>

        <table className="min-w-full text-sm">
          <thead className={darkMode ? "bg-gray-700" : "bg-blue-50"}>
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">Loading...</td>
              </tr>
            ) : (
              subs.map((s, i) => (
                <tr key={s._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3">{i + 1}</td>

                  <td className="px-4 py-3">
                    {editId === s._id ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                      />
                    ) : (
                      s.name
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <img src={s.image} className="w-12 h-12 rounded object-cover" />
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => 
                      {s.name === "house" ? 
                        navigate(`/admin/create-house/${s._id}`) 
                        : navigate(`/admin/dashboard`)
                      }}
                      className="p-2 bg-blue-100 text-blue-700 rounded"
                    >
                      Create Product
                    </button>
                    {editId === s._id ? (
                      <button
                        onClick={updateSub}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(s._id);
                          setName(s.name);
                        }}
                        className="p-2 bg-yellow-100 text-yellow-700 rounded"
                      >
                        <FiEdit />
                      </button>
                    )}

                    <button
                      onClick={() => deleteSub(s._id)}
                      className="p-2 bg-red-100 text-red-700 rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default SubCategories;
