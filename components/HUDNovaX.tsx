"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NovaXHUD() {
  const [timeCode, setTimeCode] = useState("3M27J02H29M33S");
  const [message, setMessage] = useState("Wake uP ! Select Your Life 🔻");
  const [consciousness, setConsciousness] = useState(82);
  const [locationScore, setLocationScore] = useState(728);
  const [currentColor, setCurrentColor] = useState("text-cyan-400");

  const messages = [
    "They programmed you to survive. XTRMIA reprograms you to awaken.",
    "You’ve been looping the same reality since Babylon!",
    "Your soul isn’t lost, it’s just been encrypted.",
    "Wake uP ! Select Your Life 🔻",
    "Press ⭐️T ! Let's Play The Game of Life",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setCurrentColor(
        [
          "text-pink-400",
          "text-emerald-400",
          "text-cyan-400",
          "text-yellow-300",
          "text-purple-400",
        ][Math.floor(Math.random() * 5)]
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-5 border-b border-white/10 shadow-xl font-mono tracking-tight">
      <div className="flex justify-between items-start text-xs md:text-sm lg:text-base">
        <div>
          <p className="text-fuchsia-400 font-bold">
            ✦ X T R M I A ✦ 🧬 106⚡02🔸01🌀39
          </p>
          <p className="text-sky-400 font-bold">
            ✦ N O V A X ✦ 🧬 16⚡07🔸03🌀38
          </p>
        </div>
        <div className="text-right">
          <p>
            🧭 SCORE LIEU :{" "}
            <span className="text-green-400 font-bold">{locationScore}</span>
          </p>
          <p>
            🌀 CONSCIENCE :{" "}
            <span className="text-pink-300 font-bold">{consciousness}%</span>
          </p>
        </div>
      </div>

      <div className="mt-5 text-center space-y-2">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
          ⏱ L’heure du réveil va sonner :{" "}
          <span className="text-emerald-400">{timeCode}</span>
        </h1>
        <motion.p
          className={`text-xl md:text-2xl font-extrabold ${currentColor}`}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
