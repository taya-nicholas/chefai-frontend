import { pool } from "$db/postgres";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: any = await request.json();
    const indicies = body.indicies;

    const recipe_query = await pool.query(
      `
        SELECT *
        FROM recipe
        WHERE recipe.id = ANY($1)
        `,
      [indicies]
    );

    let recipes = recipe_query.rows;

    return new Response(JSON.stringify({ message: recipes }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

