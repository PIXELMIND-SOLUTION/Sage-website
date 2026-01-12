import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiPlus, FiX } from "react-icons/fi";

const CreateHouse = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    /* ================= ADMIN DATA ================= */
    const adminData = JSON.parse(sessionStorage.getItem("AdminData") || "{}");

    /* ================= SUB CATEGORIES ================= */
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(
        id || ""
    );

    /* ================= FORM STATE ================= */
    const [name, setName] = useState("");
    const [type, setType] = useState("Sale");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [images, setImages] = useState([]);
    const [featureNames, setFeatureNames] = useState([""]);
    const [featureImages, setFeatureImages] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const [loading, setLoading] = useState(false);

    /* ================= FETCH SUB CATEGORIES ================= */
    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const res = await axios.get(
                    "http://31.97.206.144:9174/api/auth/sub/all"
                );
                const subs = res.data.subCategories || [];
                setSubCategories(subs);

                // 🔑 find subCategory from param
                const match = subs.find(s => s._id === id);
                console.log("Matched Sub Category:", match);
                if (match) {
                    setSelectedSubCategory(match);
                }
            } catch (err) {
                console.error("Failed to load sub categories");
            }
        };
        fetchSubs();
    }, []);

    /* ================= FEATURE HANDLERS ================= */
    const addFeatureField = () => setFeatureNames([...featureNames, ""]);

    const removeFeatureField = (index) =>
        setFeatureNames(featureNames.filter((_, i) => i !== index));

    const handleFeatureChange = (index, value) => {
        const updated = [...featureNames];
        updated[index] = value;
        setFeatureNames(updated);
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !name ||
            !address ||
            !latitude ||
            !longitude ||
            !selectedSubCategoryId
        ) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const fd = new FormData();
            fd.append("name", name);
            fd.append("type", type);
            fd.append("address", address);
            fd.append("description", description);
            fd.append("latitude", latitude);
            fd.append("longitude", longitude);
            fd.append("userId", adminData.id);
            fd.append("featureNames", JSON.stringify(featureNames));

            images.forEach((img) => fd.append("images", img));
            featureImages.forEach((img) => fd.append("featureImages", img));

            await axios.post(
                `http://31.97.206.144:9174/api/create/${id}`,
                fd
            );

            navigate(-1);
        } catch (err) {
            alert("Failed to create house");
        } finally {
            setLoading(false);
        }
    };

    /* ================= INPUT STYLE ================= */
    const inputClass = `
    w-full rounded-2xl px-4 py-3 text-sm font-medium
    bg-gray-50 text-black dark:bg-gray-800 dark:text-white
    border border-gray-300 dark:border-gray-600
    outline-none
    focus:ring-2 focus:ring-blue-500
    transition
  `;

    return (
        <div
            className={`min-h-screen px-4 py-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
        >
            <div
                className={`max-w-6xl mx-auto rounded-2xl shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"
                    }`}
            >
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-4 border-b dark:border-gray-700">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FiArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold text-blue-600">Create House</h1>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-6 space-y-10">

                    {/* SUB CATEGORY */}
                    <Section title="Sub Category">
                        <Field label="Selected Sub Category">
                            <div
                                className={`
        w-full rounded-2xl px-4 py-3 text-sm font-semibold
        bg-gray-100 dark:bg-gray-700
        border border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-white
      `}
                            >
                                {selectedSubCategory
                                    ? `${selectedSubCategory.name} (${selectedSubCategory.category?.name})`
                                    : "Loading..."}
                            </div>
                        </Field>
                    </Section>

                    {/* BASIC INFO */}
                    <Section title="Basic Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="House Name *">
                                <input
                                    className={inputClass}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>

                            <Field label="Type">
                                <select
                                    className={inputClass}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="Sale">Sale</option>
                                    <option value="Rent">Rent</option>
                                </select>
                            </Field>
                        </div>

                        <Field label="Address *">
                            <input
                                className={inputClass}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                rows="4"
                                className={inputClass}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                    </Section>

                    {/* LOCATION */}
                    <Section title="Location Coordinates">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Latitude *">
                                <input
                                    className={inputClass}
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </Field>
                            <Field label="Longitude *">
                                <input
                                    className={inputClass}
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </Field>
                        </div>
                    </Section>

                    {/* HOUSE IMAGES */}
                    <Section title="House Images">
                        <UploadBox multiple onChange={(f) => setImages([...f])} />
                    </Section>

                    {/* FEATURES */}
                    <Section title="House Features">
                        <div className="space-y-3">
                            {featureNames.map((f, i) => (
                                <div key={i} className="flex gap-3">
                                    <input
                                        className={`${inputClass} flex-1`}
                                        value={f}
                                        placeholder="e.g. 3 Bedrooms"
                                        onChange={(e) =>
                                            handleFeatureChange(i, e.target.value)
                                        }
                                    />
                                    {featureNames.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeatureField(i)}
                                            className="p-3 rounded-xl bg-red-100 text-red-600"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addFeatureField}
                            className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold"
                        >
                            <FiPlus /> Add Feature
                        </button>
                    </Section>

                    {/* FEATURE ICONS */}
                    <Section title="Feature Icons">
                        <UploadBox multiple onChange={(f) => setFeatureImages([...f])} />
                    </Section>

                    {/* ACTIONS */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 rounded-xl border dark:border-gray-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold
              hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create House"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHouse;

/* ================= SMALL UI COMPONENTS ================= */

const Section = ({ title, children }) => (
    <div className="space-y-5">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
            {title}
        </h3>
        {children}
    </div>
);

const Field = ({ label, children }) => (
    <div>
        <label className="block mb-1 text-sm font-semibold">{label}</label>
        {children}
    </div>
);

const UploadBox = ({ multiple, onChange }) => (
    <label
        className="flex flex-col items-center justify-center
    w-full px-6 py-10 rounded-2xl cursor-pointer
    border-2 border-dashed
    border-gray-300 dark:border-gray-600
    bg-gray-50 dark:bg-gray-800
    hover:border-blue-500 transition"
    >
        <FiUpload className="text-3xl text-gray-400 mb-2" />
        <span className="text-sm font-medium text-gray-500">
            Click to upload {multiple ? "files" : "file"}
        </span>
        <input
            type="file"
            multiple={multiple}
            hidden
            onChange={(e) => onChange(e.target.files)}
        />
    </label>
);
