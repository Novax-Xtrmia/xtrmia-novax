import { supabase } from "../supabaseClient";

export async function createPlayer(player: {
  name: string;
  birthdate: string;
  location?: string;
  life_path?: number;
  frequency?: string;
}) {
  const { data, error } = await supabase
    .from("players")
    .insert([player])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllPlayers() {
  const { data, error } = await supabase.from("players").select("*");
  if (error) throw error;
  return data;
}
