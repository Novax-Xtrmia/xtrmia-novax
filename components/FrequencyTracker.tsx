"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function FrequencyTracker() {
  const [status, setStatus] = useState("");
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);

  const getVibe = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/novax", {
        message: `Fais une lecture rapide du champ énergétique du Player maintenant.
Donne :
– Fréquence actuelle (ex : 1440 Hz)
– État : montée / stabilisation / rechute
– Conseil immédiat pour optimiser son champ.`,
      });

      const reply = res.data.reply;
      setVibe(reply);
    } catch {
      setVibe("❌ Erreur de lecture vibratoire.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVibe();
    const interval = setInterval(getVibe, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-6 mt-10 bg-black/40 border border-pink-500 rounded-2xl text-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">
        🔥 LIVE FREQUENCY TRACKER
      </h2>

      <div className="text-center text-lg mb-4">
        Suivi en direct de ta vibration cosmique.
      </div>

      <button
        onClick={getVibe}
        disabled={loading}
        className="w-full bg-pink-500 hover:bg-pink-600 transition-colors py-3 rounded-xl text-xl font-semibold mb-6"
      >
        {loading ? "Scan en cours..." : "🔄 Re-scanner maintenant"}
      </button>

      {vibe && (
        <div className="bg-pink-900/40 border border-pink-600 rounded-xl p-4">
          <strong className="text-pink-300 block mb-2">🧬 Lecture :</strong>
          <p className="text-lg whitespace-pre-line">{vibe}</p>
        </div>
      )}
    </motion.div>
  );
}
