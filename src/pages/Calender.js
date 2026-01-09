import React, { useState } from "react";

/* ================= HELPERS ================= */
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay() || 7; // Sunday = 7
  d.setDate(d.getDate() - day + 1); // Monday
  return d;
};

const getWeekDays = (baseDate) => {
  const start = getStartOfWeek(baseDate);
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const formatDate = (date) => date.toISOString().split("T")[0];

/* ================= STATIC DATA ================= */
const STATIC_STATS = {
  "2026-01-01": {
    posts: 22,
    likes: 310,
    comments: 48,
    whatsPosts: 6,
    registeredUsers: 5,
    campaignsBought: 2,
    coinsBought: 800,
    totalPayments: 4200
  },
  "2026-01-02": {
    posts: 34,
    likes: 420,
    comments: 89,
    whatsPosts: 12,
    registeredUsers: 7,
    campaignsBought: 3,
    coinsBought: 1200,
    totalPayments: 5600
  },
  "2026-01-03": {
    posts: 18,
    likes: 205,
    comments: 36,
    whatsPosts: 4,
    registeredUsers: 2,
    campaignsBought: 1,
    coinsBought: 300,
    totalPayments: 1500
  }
};

/* ================= COMPONENT ================= */
const Calendar = ({ darkMode }) => {
  const today = new Date();
  const todayStr = formatDate(today);

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [baseDate, setBaseDate] = useState(today);

  const weekDays = getWeekDays(baseDate);
  const stats = STATIC_STATS[selectedDate];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div
        className={`max-w-7xl mx-auto rounded-2xl shadow p-6
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">📅 Weekly Analytics</h1>
            <p className="text-sm text-gray-500">
              Select a date to view stats
            </p>
          </div>

          {/* DATE PICKER */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              const d = new Date(e.target.value);
              setSelectedDate(e.target.value);
              setBaseDate(d);
            }}
            className={`px-4 py-2 rounded-lg border text-sm
              ${darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"}
            `}
          />
        </div>

        {/* WEEK CALENDAR */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {weekDays.map((day) => {
            const dateStr = formatDate(day);
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex flex-col items-center py-3 rounded-xl text-sm font-medium transition
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span className="text-xs opacity-80">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{day.getDate()}</span>

                {isToday && !isSelected && (
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* STATS GRID */}
        {stats ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <StatCard label="Posts" value={stats.posts} darkMode={darkMode} />
            <StatCard label="Likes" value={stats.likes} darkMode={darkMode} />
            <StatCard label="Comments" value={stats.comments} darkMode={darkMode} />
            <StatCard label="WhatsApp Posts" value={stats.whatsPosts} darkMode={darkMode} />
            <StatCard label="Registered Users" value={stats.registeredUsers} darkMode={darkMode} />
            <StatCard label="Campaigns Bought" value={stats.campaignsBought} darkMode={darkMode} />
            <StatCard label="Coins Bought" value={stats.coinsBought} darkMode={darkMode} />
            <StatCard
              label="Total Payments"
              value={`₹${stats.totalPayments}`}
              highlight
              darkMode={darkMode}
            />
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No data for this date
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ label, value, darkMode, highlight }) => (
  <div
    className={`rounded-xl p-4 transition
      ${darkMode ? "bg-gray-700" : "bg-gray-100"}
      ${highlight ? "ring-2 ring-indigo-500/40" : ""}
    `}
  >
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold mt-1">{value ?? 0}</p>
  </div>
);

export default Calendar;
