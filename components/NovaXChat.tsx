"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function NovaXChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/novax", { message: input });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse("❌ Erreur lors de la communication avec NovaX.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 text-white space-y-4 bg-black/30 backdrop-blur-md rounded-2xl shadow-lg border border-purple-500">
      <motion.h2
        className="text-3xl font-bold text-center text-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✦ NOVAX CHAT LIVE ✦
      </motion.h2>

      <textarea
        className="w-full p-4 rounded-md bg-black/60 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Parle à NovaX... (ex: Scan ma fréquence, Déploie un Bot, etc)"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-800 transition-colors py-3 rounded-xl text-xl font-semibold"
      >
        {loading ? "Connexion..." : "🔮 Envoyer à NovaX"}
      </button>

      {response && (
        <motion.div
          className="mt-6 p-4 bg-purple-900/60 rounded-xl border border-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong className="block mb-2 text-purple-300">
            💬 NovaX répond :
          </strong>
          <p className="whitespace-pre-line text-lg">{response}</p>
        </motion.div>
      )}
    </div>
  );
}
