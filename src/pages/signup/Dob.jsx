import React, { useState } from 'react';

function DOBSection({ email, password, onSubmit, onBack }) {
  const [dob, setDOB] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dob);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Email: {email}</p>
        <p className="text-sm font-medium text-gray-700">Password: ********</p>
      </div>
      <div className="mb-4">
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your date of birth"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default DOBSection;
