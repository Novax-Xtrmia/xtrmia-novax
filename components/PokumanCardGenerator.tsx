"use client";

import { motion } from "framer-motion";

type Props = {
  name: string;
  birthdate: string;
  archetype: string;
  element: string;
  lifePath: number;
  zodiac: string;
  frequency: string;
};

export default function PokumanCardGenerator({
  name,
  birthdate,
  archetype,
  element,
  lifePath,
  zodiac,
  frequency,
}: Props) {
  return (
    <motion.div
      className="w-[320px] h-[480px] bg-gradient-to-br from-black via-zinc-900 to-purple-900 rounded-3xl border-4 border-purple-600 p-4 shadow-xl flex flex-col justify-between text-white relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute top-2 right-4 text-xs text-purple-400">
        POKUMAN ∞
      </div>
      <div className="text-center text-xl font-bold tracking-wide text-purple-300">
        {name.toUpperCase()}
      </div>
      <div className="text-center text-sm text-gray-400">{birthdate}</div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-center">
        <div className="bg-purple-800/30 rounded-xl py-2">♓ {zodiac}</div>
        <div className="bg-emerald-800/30 rounded-xl py-2">
          🧬 {frequency} Hz
        </div>
        <div className="bg-pink-800/30 rounded-xl py-2">🔮 {archetype}</div>
        <div className="bg-yellow-800/30 rounded-xl py-2">🔥 {element}</div>
        <div className="bg-indigo-800/30 rounded-xl py-2 col-span-2">
          ✴️ Life Path : {lifePath}
        </div>
      </div>

      <div className="text-center mt-4 text-xs text-purple-400 italic">
        “Fractal being aligned with the cosmic game.”
      </div>
    </motion.div>
  );
}
