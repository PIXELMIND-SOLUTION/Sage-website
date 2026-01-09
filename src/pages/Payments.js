import React from 'react';

const Payments = ({ darkMode, collapsed }) => {
  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Payments Management
      </h1>
      {/* Add Payments content */}
    </div>
  );
};

export default Payments;