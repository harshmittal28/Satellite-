import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const badgeDescriptions = {
  gold: { label: "Gold Badge", emoji: "🏅", earned: false },
  silver: { label: "Silver Badge", emoji: "🥈", earned: false },
};

function Badges() {
  const [badges, setBadges] = useState(badgeDescriptions);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const snapshot = await getDocs(collection(db, "results"));
        const earned = JSON.parse(JSON.stringify(badgeDescriptions)); // deep copy

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.badge && earned[data.badge]) {
            earned[data.badge].earned = true;
          }
        });

        setBadges(earned);
      } catch (err) {
        console.error("❌ Failed to fetch badges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-6">My Badges</h2>

      {loading ? (
        <p className="text-gray-300">Loading badges...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(badges).map(([key, badge]) => (
            <div
              key={key}
              className={`text-center p-4 rounded-lg shadow-md transition ${
                badge.earned ? "bg-green-700" : "bg-gray-700 opacity-50"
              }`}
            >
              <div className="text-5xl mb-2">{badge.emoji}</div>
              <p className="text-xl font-semibold">{badge.label}</p>
              <p className="text-sm mt-1">
                {badge.earned ? "Unlocked" : "Locked"}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200"
      >
        Back to Home
      </button>
    </motion.div>
  );
}

export default Badges;