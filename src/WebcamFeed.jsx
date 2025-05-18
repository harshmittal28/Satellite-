import React from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

const WebcamFeed = ({ onNext }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-6 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Camera Check</h2>
      <Webcam className="rounded-md shadow-lg w-full max-w-md" />
      <button
        onClick={onNext}
        className="mt-6 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Proceed
      </button>
    </motion.div>
  );
};

export default WebcamFeed;