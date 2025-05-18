import React from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

const WebcamFeed = ({ onNext }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Camera Check</h2>

      <Webcam
        className="rounded-md shadow-lg w-full max-w-md"
        audio={false}
        mirrored={true}
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user"
        }}
      />

      <button
        onClick={onNext}
        className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
      >
        ✅ Proceed
      </button>
    </motion.div>
  );
};

export default WebcamFeed;