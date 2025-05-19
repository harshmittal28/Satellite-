import { motion } from "framer-motion";
import Webcam from "react-webcam";
import Lottie from "lottie-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import animationData from "./animation.json";

function AvatarGuide({ messages: customMessages }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const defaultMessages = [
    "Hi there! I'm your satellite guide!",
    "We'll explore how satellites are built, tested, and launched.",
    "I’ll ask you a few questions at the end. Let's get started!"
  ];

  const messages = customMessages || defaultMessages;

  const speak = (text) => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.voice = voices.find(voice => voice.lang.startsWith("en")) || voices[0];
    utterance.pitch = 1.1;
    utterance.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes("next") || transcript.includes("start")) {
        handleNext();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    const handleVoicesChanged = () => setVoicesLoaded(true);
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (voicesLoaded) {
      speak(messages[index]);
    }
  }, [index, voicesLoaded]);

  const handleNext = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/lesson"); // or another route if needed
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center text-white p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-72 mb-4">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Satellite Guide</h2>

      <div className="bg-white text-black p-4 mt-2 rounded-lg shadow-md max-w-md">
        {messages[index]}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          {index < messages.length - 1 ? "Next" : "Start Lesson"}
        </button>

        <button
          onClick={startListening}
          className={`px-4 py-2 rounded-lg shadow-md font-semibold transition ${
            listening ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {listening ? "Listening..." : "Use Voice"}
        </button>
      </div>
    </motion.div>
  );
}

export default AvatarGuide;