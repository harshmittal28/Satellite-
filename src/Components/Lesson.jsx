// src/components/Lesson.jsx

import React from "react";

const Lesson = ({ title, content, image }) => {
  return (
    <div className="lesson-card p-4 bg-gray-900 rounded-md text-white max-w-xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {image && <img src={image} alt={title} className="mb-4 rounded" />}
      <p>{content}</p>
    </div>
  );
};

export default Lesson;