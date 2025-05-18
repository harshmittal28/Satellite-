import React from "react";

const ProgressBar = ({ step, totalSteps }) => {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-700 rounded h-4 mt-4">
      <div
        className="bg-green-500 h-4 rounded transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;