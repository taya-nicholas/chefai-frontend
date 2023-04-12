import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";

export const load = (async ({ params }) => {
  const recipes = await pool.query(
    "SELECT * FROM recipe ORDER BY created_at DESC LIMIT 6"
  );

  return { recipes: recipes.rows };
}) satisfies PageServerLoad;
