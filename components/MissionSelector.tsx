"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const missions = [
  {
    id: "111",
    title: "⚡ Code 111 – Ancrage Cosmique",
    description:
      "Trouve un arbre puissant, pose ta main dessus, reste 3min en silence. Respire 9 fois. Upload ta vibration.",
    reward: "+111 Hz – Stabilité énergétique",
  },
  {
    id: "369",
    title: "🌀 Code 369 – Vortex Tesla",
    description:
      "Dessine 3 fois ce que tu veux manifester, écris 6 actions possibles, visualise pendant 9 min.",
    reward: "+369 Hz – Synchronisation Réalité",
  },
  {
    id: "999",
    title: "💀 Code 999 – Reset de la Ligne Temporelle",
    description:
      "Trouve un miroir. Regarde-toi droit dans l’âme. Dis : 'Je quitte le faux, je redeviens réel.'",
    reward: "+999 Hz – Accès Portail Fractal",
  },
];

export default function MissionSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mt-10 bg-black/40 border border-blue-500 rounded-2xl text-white backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">
        🪂 MISSIONS IRL XTRMIA
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {missions.map((m) => (
          <motion.div
            key={m.id}
            onClick={() => setSelected(m.id)}
            whileHover={{ scale: 1.03 }}
            className={`cursor-pointer border rounded-xl p-4 transition-all ${
              selected === m.id
                ? "border-blue-500 bg-blue-900/40"
                : "border-blue-800 bg-black/50"
            }`}
          >
            <div className="text-xl font-semibold text-blue-300">{m.title}</div>
            <div className="text-sm mt-2 text-gray-300">{m.description}</div>
            <div className="mt-3 text-sm text-blue-200 italic">{m.reward}</div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          className="mt-8 text-center text-lg font-semibold text-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✦ Mission activée : {missions.find((m) => m.id === selected)?.title}
        </motion.div>
      )}
    </div>
  );
}
