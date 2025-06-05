import { supabase } from "../supabaseClient";

export async function completeMission(entry: {
  player_id: string;
  mission_code: string;
  completed: boolean;
}) {
  const { data, error } = await supabase
    .from("missions")
    .insert([entry])
    .select()
    .single();

  if (error) throw error;
  return data;
}
