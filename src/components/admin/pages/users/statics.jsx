import React from 'react';

const Statistics = ({ users }) => {
  const totalUsers = users.length;
  // const adminUsers = users?.filter(user => user.role === 'admin').length;
  const regularUsers = totalUsers

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900">{totalUsers}</p>
      </div>
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Admin Users</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
      </div>
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Regular Users</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900">{regularUsers}</p>
      </div>
    </div>
  );
};

export default Statistics;
