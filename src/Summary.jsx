import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import badgeAnimation from "./animation.json"; // ✅ Can be changed to badge celebration

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, badge } = location.state || { score: 0, total: 1, badge: null };

  const getFeedback = () => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "🌟 Excellent! You nailed it!";
    if (percentage >= 70) return "🎉 Great job! You're almost an expert!";
    if (percentage >= 50) return "👏 Good effort! Keep practicing.";
    return "📘 Keep learning — you'll get there!";
  };

  const renderBadge = () => {
    if (badge === "gold") return <p className="text-yellow-400 text-xl">🏅 You earned a <strong>Gold Badge</strong>!</p>;
    if (badge === "silver") return <p className="text-gray-300 text-xl">🥈 You earned a <strong>Silver Badge</strong>!</p>;
    return <p className="text-gray-400 text-lg">No badge this time — try again to earn one!</p>;
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-72 mb-6">
        <Lottie animationData={badgeAnimation} loop={true} />
      </div>

      <h2 className="text-3xl font-bold mb-4">Quiz Summary</h2>

      <p className="text-xl mb-2">You scored <strong>{score}</strong> out of <strong>{total}</strong></p>
      <p className="text-lg mb-4 text-yellow-400">{getFeedback()}</p>

      {renderBadge()}

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-300"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate("/lesson")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Restart Lessons
        </button>
        <button
          onClick={() => navigate("/badges")}
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300"
        >
          View My Badges
        </button>
      </div>
    </motion.div>
  );
}

export default Summary;