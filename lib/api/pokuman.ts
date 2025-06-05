import { supabase } from "../supabaseClient";

export async function createPokuman(card: {
  player_id: string;
  archetype: string;
  element: string;
  zodiac: string;
  frequency: string;
}) {
  const { data, error } = await supabase
    .from("pokuman_cards")
    .insert([card])
    .select()
    .single();

  if (error) throw error;
  return data;
}
