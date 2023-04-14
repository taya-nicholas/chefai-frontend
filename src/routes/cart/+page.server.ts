import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";


export const load = (async ({ cookies }) => {
  let cart_arr: any = cookies.get("cart");
  if (typeof cart_arr === "string") {
    cart_arr = cart_arr.split(",").map(Number);
    cart_arr = cart_arr.join(",");
  }

  if (cart_arr === undefined) {
    cart_arr = "";
    let recipe_rows: any = [];
    return { recipes: recipe_rows };
  } else {
    const recipes = await pool.query(
      `SELECT * FROM recipe WHERE ID IN (${cart_arr})`
    );
    let recipe_rows: any = recipes.rows;
    return { recipes: recipe_rows };
  }
}) satisfies PageServerLoad;
