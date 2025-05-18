// ✅ Updated Quiz.jsx with TTS, STT, and Badge Logic
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./utils/firebase";

const quizQuestions = [
  {
    question: "What is the primary function of a satellite?",
    options: ["Entertainment", "Orbiting planets", "Communication", "Military attack"],
    answer: "Communication",
  },
  {
    question: "Which part of the satellite generates power?",
    options: ["Antenna", "Solar Panels", "Thruster", "Camera"],
    answer: "Solar Panels",
  },
  {
    question: "Why do satellites need testing?",
    options: ["To make them lighter", "For fun", "To survive space conditions", "To spy"],
    answer: "To survive space conditions",
  },
];

function Quiz() {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [setScore] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1.1;
    utterance.rate = 1;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const listen = (questionIndex) => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      const option = quizQuestions[questionIndex].options.find(opt => spoken.includes(opt.toLowerCase()));
      if (option) handleOptionSelect(questionIndex, option);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    quizQuestions.forEach((q, i) => speak(`${i + 1}. ${q.question}`));
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer === quizQuestions[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);

    // Determine badge
    const badge = newScore === 3 ? "gold" : newScore === 2 ? "silver" : null;

    try {
      const resultId = `result_${Date.now()}`;
      await setDoc(doc(db, "results", resultId), {
        score: newScore,
        total: quizQuestions.length,
        badge: badge,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      setError("Failed to save your score. Please try again later.");
    }

    setTimeout(() => {
      navigate("/summary", {
        state: { score: newScore, total: quizQuestions.length, badge: badge },
      });
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-6">Quick Quiz</h2>

      {quizQuestions.map((q, index) => (
        <div key={index} className="mb-6 w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-2">
            {index + 1}. {q.question}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(index, option)}
                className={`px-4 py-2 rounded-lg border ${
                  answers[index] === option
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={() => listen(index)}
            className="mt-2 px-4 py-1 bg-blue-600 rounded text-white"
          >
            🎤 Answer by Voice
          </button>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={answers.includes(null) || submitted}
        className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
      >
        Submit Quiz
      </button>

      {submitted && <p className="mt-4 text-green-400">Calculating your score...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </motion.div>
  );
}

export default Quiz;
