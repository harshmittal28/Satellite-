import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const lessonSteps = [
  "Welcome to Lesson 1: Satellite Basics!",
  "Satellites are machines launched into space to orbit the Earth or other planets.",
  "They help with communication, weather monitoring, navigation, and even spying!",
  "A satellite has key parts: a power source (like solar panels), antennas to send and receive signals, and sensors for collecting data.",
  "Let's move on to the quiz and see what you've learned!"
];

const Lesson = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1.1;
    utterance.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak(lessonSteps[step]);
  }, [step]);

  const handleNextStep = () => {
    if (step < lessonSteps.length - 1) {
      setStep(step + 1);
    } else {
      if (onNext) {
        onNext();
      } else {
        navigate("/quiz");
      }
    }
  };

  return (
    <motion.div
      className="p-6 text-white text-center min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6">Lesson 1: Satellite Basics</h2>
      <p className="mb-8 max-w-xl">{lessonSteps[step]}</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white shadow-lg transition"
        onClick={handleNextStep}
      >
        {step < lessonSteps.length - 1 ? "Next" : "Take Quiz"}
      </button>
    </motion.div>
  );
};

export default Lesson;