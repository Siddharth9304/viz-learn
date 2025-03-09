import React from "react";

const Controls = ({ onReset, onSort }) => {
  return (
    <div className="flex space-x-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={onReset}
      >
        Generate New Array
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={onSort}
      >
        Start Sorting
      </button>
    </div>
  );
};

export default Controls;
