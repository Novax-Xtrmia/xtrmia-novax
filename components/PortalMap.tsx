"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PortalMap() {
  const [location, setLocation] = useState("");
  const [portalResult, setPortalResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScanLocation = async () => {
    if (!location.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/novax", {
        message: `Scan vibratoire du lieu suivant : ${location}.
Donne une lecture énergétique : score (0–999), type d’énergie (tellurique, astrale, fractale…), 
potentiel de Portail (OUI/NON) et action recommandée si activation.`,
      });
      setPortalResult(res.data.reply);
    } catch (err) {
      setPortalResult("❌ Erreur lors du scan de lieu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mt-10 bg-black/40 border border-orange-500 rounded-2xl text-white backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">
        🗺️ SCAN DE PORTAIL COSMIQUE
      </h2>

      <div className="flex flex-col gap-4">
        <input
          className="bg-black/60 border border-orange-600 rounded-lg px-4 py-3 text-lg"
          placeholder="Ex: Machu Picchu, Mont Shasta, Gizeh, Paris..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={handleScanLocation}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 transition-colors py-3 rounded-xl text-xl font-semibold"
        >
          {loading ? "Analyse en cours..." : "🔍 Scanner ce Lieu"}
        </button>
      </div>

      {portalResult && (
        <motion.div
          className="mt-6 p-4 bg-orange-900/40 rounded-xl border border-orange-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong className="block mb-2 text-orange-300">📡 Lecture :</strong>
          <p className="whitespace-pre-line text-lg">{portalResult}</p>
        </motion.div>
      )}
    </div>
  );
}
