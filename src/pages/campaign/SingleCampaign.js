import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiEye,
  FiMousePointer,
  FiTrendingUp,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";

const API = "https://apisocial.atozkeysolution.com/api";

const SingleCampaignView = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`${API}/campaigns/${id}`);
        setCampaign(res.data.data);
      } catch (err) {
        console.error("Failed to fetch campaign", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading campaign…
      </div>
    );
  }

  if (!campaign) return null;

  const { stats, purchasedPackage } = campaign;

  return (
    <div className={`min-h-screen p-4 md:p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div
        className={`max-w-7xl mx-auto rounded-3xl shadow-xl p-6 md:p-8
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
      >
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:underline mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Campaign Details</h1>
            <p className="text-sm text-gray-500">
              Created on {new Date(campaign.createdAt).toLocaleString()}
            </p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm w-fit
              ${
                campaign.adminApprovalStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : campaign.adminApprovalStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {campaign.adminApprovalStatus.toUpperCase()}
          </span>
        </div>

        {/* USER + PACKAGE */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Info label="User Name" value={campaign.userId?.fullName} />
          <Info label="User Email" value={campaign.userId?.email} />
          <Info label="Package" value={purchasedPackage?.packageName} />
          <Info label="Payment Status" value={purchasedPackage?.paymentStatus} />
          <Info label="Target Users" value={purchasedPackage?.targetUsers} />
          <Info label="Duration (Hours)" value={purchasedPackage?.durationHours} />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Stat label="Impressions" value={stats.impressions} icon={<FiEye />} />
          <Stat label="Clicks" value={stats.clicks} icon={<FiMousePointer />} />
          <Stat label="Conversions" value={stats.conversions} icon={<FiTrendingUp />} />
          <Stat
            label="Time Spent"
            value={`${Math.floor(stats.totalTimeSpent / 60)}m ${stats.totalTimeSpent % 60}s`}
            icon={<FiClock />}
          />
        </div>

        {/* MEDIA */}
        {campaign.media?.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Campaign Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {campaign.media.map((m) =>
                m.type === "video" ? (
                  <video
                    key={m._id}
                    src={m.url}
                    controls
                    className="rounded-xl w-full h-56 object-cover"
                  />
                ) : (
                  <img
                    key={m._id}
                    src={m.url}
                    alt="Campaign Media"
                    className="rounded-xl w-full h-56 object-cover"
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        {campaign.faqs?.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-4">
              {campaign.faqs.map((f) => (
                <div
                  key={f._id}
                  className={`p-4 rounded-xl border
                    ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
                >
                  <p className="font-medium mb-2">{f.question}</p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {f.options.map((o, i) => (
                      <li
                        key={i}
                        className={o === f.answer ? "text-green-600 font-semibold" : ""}
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ADMIN NOTES */}
        {campaign.adminNotes && (
          <div
            className={`p-4 rounded-xl flex gap-2 items-start
              ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"}`}
          >
            <FiCheckCircle className="text-green-500 mt-1" />
            <div>
              <p className="font-semibold">Admin Notes</p>
              <p className="text-sm text-gray-500">{campaign.adminNotes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= SUB COMPONENTS ================= */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

const Stat = ({ label, value, icon }) => (
  <div className="p-4 rounded-xl border bg-gradient-to-br from-indigo-50 to-blue-50">
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm text-gray-500">{label}</p>
      {icon}
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default SingleCampaignView;
