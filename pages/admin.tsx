"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

type Player = {
  id: string;
  name: string;
  birthdate: string;
  location: string;
  life_path: number;
  frequency: string;
  created_at: string;
};

type Pokuman = {
  archetype: string;
  element: string;
  zodiac: string;
  frequency: string;
  player_id: string;
};

type Scan = {
  result: string;
  created_at: string;
  player_id: string;
};

export default function AdminDashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pokumans, setPokumans] = useState<Record<string, Pokuman>>({});
  const [scans, setScans] = useState<Record<string, Scan>>({});
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [lifePathFilter, setLifePathFilter] = useState<number | null>(null);
  const [frequencyFilter, setFrequencyFilter] = useState<string | null>(null);

  const lifePathOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  const frequencyOptions = [
    "111",
    "222",
    "333",
    "444",
    "555",
    "666",
    "777",
    "888",
    "999",
    "1111",
    "2222",
    "3333",
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const { data: pData } = await supabase
        .from("players")
        .select("*")
        .order("created_at", { ascending: false });
      setPlayers(pData || []);

      const { data: cards } = await supabase.from("pokuman_cards").select("*");
      const cardsMap: Record<string, Pokuman> = {};
      cards?.forEach((card) => {
        cardsMap[card.player_id] = card;
      });
      setPokumans(cardsMap);

      const { data: sData } = await supabase
        .from("scans")
        .select("*")
        .order("created_at", { ascending: false });
      const scanMap: Record<string, Scan> = {};
      sData?.forEach((s) => {
        if (!scanMap[s.player_id]) scanMap[s.player_id] = s;
      });
      setScans(scanMap);

      setLoading(false);
    };

    fetchAll();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const matchName = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchLifePath = lifePathFilter
      ? player.life_path === lifePathFilter
      : true;
    const matchFrequency = frequencyFilter
      ? player.frequency === frequencyFilter
      : true;
    return matchName && matchLifePath && matchFrequency;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black p-6 text-white">
      <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">
        🧬 FULL PLAYER DASHBOARD
      </h1>

      {loading && <p className="text-center text-gray-400">Chargement...</p>}

      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="🔍 Rechercher un nom..."
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={lifePathFilter ?? ""}
          onChange={(e) =>
            setLifePathFilter(e.target.value ? parseInt(e.target.value) : null)
          }
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white"
        >
          <option value="">🌟 Tous Life Paths</option>
          {lifePathOptions.map((lp) => (
            <option key={lp} value={lp}>
              Life Path {lp}
            </option>
          ))}
        </select>

        <select
          value={frequencyFilter ?? ""}
          onChange={(e) => setFrequencyFilter(e.target.value || null)}
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white"
        >
          <option value="">🎵 Toutes Fréquences</option>
          {frequencyOptions.map((f) => (
            <option key={f} value={f}>
              {f} Hz
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => {
          const card = pokumans[player.id];
          const scan = scans[player.id];

          return (
            <motion.div
              key={player.id}
              className="bg-black/50 border border-emerald-600 rounded-xl p-4 shadow-xl backdrop-blur-md space-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-xl font-bold text-emerald-300">
                {player.name}
              </div>
              <div className="text-sm text-gray-400">🎂 {player.birthdate}</div>
              <div className="text-sm text-gray-400">📍 {player.location}</div>
              <div className="text-sm text-pink-400">
                🧬 Life Path: {player.life_path}
              </div>
              <div className="text-sm text-blue-400">
                🎵 Fréquence: {player.frequency} Hz
              </div>
              <div className="text-xs text-gray-500">
                ⏳ {new Date(player.created_at).toLocaleString()}
              </div>

              {card && (
                <div className="mt-3 border-t border-emerald-700 pt-3 space-y-1 text-sm">
                  <div className="text-purple-300 font-semibold">
                    🎴 Pokuman
                  </div>
                  <div>✨ Archetype: {card.archetype}</div>
                  <div>🔥 Élément: {card.element}</div>
                  <div>♓ Zodiac: {card.zodiac}</div>
                  <div>💠 Fréquence: {card.frequency} Hz</div>
                </div>
              )}

              {scan && (
                <div className="mt-3 border-t border-pink-700 pt-3 text-sm text-gray-200">
                  <div className="text-pink-300 font-semibold mb-1">
                    🧠 Dernier Scan
                  </div>
                  <p className="text-xs whitespace-pre-line">
                    {scan.result.slice(0, 250)}...
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
