import { pool } from "$db/postgres";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: any = await request.json();
    const page = body.page;
    const offset = page * 8;
    const ids = body.ids;

    // console.log("page: " + page);

    const recipe_query = await pool.query(
      `
        SELECT name, id, url_name, description, image_url, created_at
        FROM recipe
        WHERE id = ANY($1)
        ORDER by id ASC
        OFFSET $2
        LIMIT 8
        `,
      [ids, offset]  // Pass the array of ids as a parameter
    );

    // console.log(recipe_query.rows);

    return new Response(JSON.stringify({ message: recipe_query.rows }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
