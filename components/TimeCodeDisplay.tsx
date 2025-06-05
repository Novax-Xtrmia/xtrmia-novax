"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const timeCodeMap: Record<string, string> = {
  "03:33":
    "💠 Heure de transmutation. Tu es entre deux mondes. Respire en conscience.",
  "04:44":
    "🧱 Fondation énergétique. Stabilise ton champ. Ancre-toi profondément.",
  "15:09": "🌀 CODE 6:9 détecté. Synchro Tesla. Fait un vœu, boost en cours.",
  "00:09": "🔓 Portail du Neuf. L’invisible t’observe. Agis dans ta vérité.",
  "11:11": "🔮 Réveil en cours. Visualise ta timeline idéale.",
  "22:22":
    "🛸 ALIGNEMENT TOTAL. Tout ton champ est prêt. Lance une action maintenant.",
  "09:09":
    "🔥 Pique vibratoire. Tu es sur la ligne du 999. Scanne ton intention.",
};

function formatTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

export default function TimeCodeDisplay() {
  const [currentCode, setCurrentCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkTimeCode = () => {
      const time = formatTime(new Date());
      if (timeCodeMap[time]) {
        setCurrentCode(time);
        setMessage(timeCodeMap[time]);
      } else {
        setCurrentCode("");
        setMessage("");
      }
    };

    const interval = setInterval(checkTimeCode, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentCode) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-900/80 border border-indigo-500 text-white px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md z-50 max-w-md text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
    >
      <div className="text-xl font-bold text-indigo-300">
        🌀 TIMECODE DÉTECTÉ : {currentCode}
      </div>
      <div className="mt-2 text-lg">{message}</div>
    </motion.div>
  );
}
