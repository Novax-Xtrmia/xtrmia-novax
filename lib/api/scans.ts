import { supabase } from "../supabaseClient";

export async function saveScan(scan: { player_id: string; result: string }) {
  const { data, error } = await supabase
    .from("scans")
    .insert([scan])
    .select()
    .single();

  if (error) throw error;
  return data;
}
