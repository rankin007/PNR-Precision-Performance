import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FoodMenuSummary = {
  id: string;
  name: string;
};

const fallbackMenus: FoodMenuSummary[] = [
  { id: "menu-sample-1", name: "Morning Conditioning Feed" },
  { id: "menu-sample-2", name: "Recovery Feed Mix" },
];

export async function getFoodMenuSummaries() {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      menus: fallbackMenus,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("food_menus")
    .select("id, name")
    .order("name");

  if (error) {
    return {
      envReady: true,
      menus: [] as FoodMenuSummary[],
      error: error.message,
    };
  }

  return {
    envReady: true,
    menus: data ?? [],
  };
}

