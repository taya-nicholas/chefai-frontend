import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";

export const config = {
  isr: {
    expiration: 600,
  },
};

export const load = (async ({ params }) => {
  const recipes = await pool.query("SELECT * FROM recipe");

  return { recipes: recipes.rows };
}) satisfies PageServerLoad;
