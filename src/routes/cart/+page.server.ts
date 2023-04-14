import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";

export const config = {
  isr: {
    expiration: 600,
  },
};

export const load = (async ({ cookies }) => {
  let cart_arr: any = cookies.get("cart");
  if (typeof cart_arr === "string") {
    cart_arr = cart_arr.split(",").map(Number);
  }
  const recipes = await pool.query(
    `SELECT * FROM recipe WHERE ID IN (${cart_arr.join(",")})`
  );

  return { recipes: recipes.rows };
}) satisfies PageServerLoad;
