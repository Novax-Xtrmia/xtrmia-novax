"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { calculateLifePath } from "@/lib/utils/calculateLifePath";
import { getDefaultFrequency } from "@/lib/utils/getDefaultFrequency";
import { createPlayer } from "@/lib/api/players";

export default function XScannrPanel() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    location: "",
  });

  const [scanResult, setScanResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!formData.name || !formData.birthdate) return;

    setLoading(true);
    try {
      // 🧮 Calcul du chemin de vie
      const lifePath = calculateLifePath(formData.birthdate);
      const frequency = getDefaultFrequency(lifePath);

      // 🔐 Enregistrement du Player dans Supabase
      const player = await createPlayer({
        name: formData.name,
        birthdate: formData.birthdate,
        location: formData.location,
        life_path: lifePath,
        frequency: frequency,
      });

      // 🤖 Scan vibratoire NovaX
      const res = await axios.post("/api/novax", {
        message: `Analyse vibratoire complète du Player :
Nom : ${formData.name}
Date de naissance : ${formData.birthdate}
Lieu : ${formData.location}

Donne : Chemin de vie, état énergétique actuel, montée ou rechute, vibration dominante, actions recommandées pour aujourd’hui.`,
      });

      setScanResult(res.data.reply);
    } catch (err) {
      console.error("Erreur :", err);
      setScanResult("❌ Erreur lors du scan ou de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mt-10 bg-black/40 border border-emerald-400 rounded-2xl shadow-lg text-white space-y-4 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-emerald-400 text-center">
        🔎 SCAN PLAYER
      </h2>

      <div className="flex flex-col gap-4">
        <input
          className="bg-black/60 border border-emerald-600 rounded-lg px-4 py-3 text-lg"
          placeholder="Prénom (ex: Victoria)"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="bg-black/60 border border-emerald-600 rounded-lg px-4 py-3 text-lg"
          type="date"
          value={formData.birthdate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />
        <input
          className="bg-black/60 border border-emerald-600 rounded-lg px-4 py-3 text-lg"
          placeholder="Lieu de naissance (optionnel)"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <button
          onClick={handleScan}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 transition-colors py-3 rounded-xl text-xl font-semibold"
        >
          {loading ? "Analyse en cours..." : "⚡ Lancer le Scan"}
        </button>
      </div>

      {scanResult && (
        <motion.div
          className="mt-6 p-4 bg-emerald-900/50 rounded-xl border border-emerald-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong className="block mb-2 text-emerald-300">🧠 Résultat :</strong>
          <p className="whitespace-pre-line text-lg">{scanResult}</p>
        </motion.div>
      )}
    </div>
  );
}
