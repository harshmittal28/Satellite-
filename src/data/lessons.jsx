import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lessons from "../data/lessons"; // Adjust path if needed
import { motion } from "framer-motion";

function Lesson() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const currentLesson = lessons[currentIndex];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel(); // Stop current speech
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak(`${currentLesson.title}. ${currentLesson.content}`);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/quiz");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4">{currentLesson.title}</h2>

      <img
        src={currentLesson.image}
        alt={currentLesson.title}
        className="w-64 h-64 object-contain rounded-lg shadow-md mb-4"
      />

      <p className="max-w-xl text-lg mb-6">{currentLesson.content}</p>

      <button
        onClick={handleNext}
        className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition"
      >
        {currentIndex < lessons.length - 1 ? "Next Lesson" : "Start Quiz"}
      </button>
    </motion.div>
  );
}

export default Lesson;