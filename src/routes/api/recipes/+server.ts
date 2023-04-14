import { pool } from "$db/postgres";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: any = await request.json();
    const page = body.page;
    const offset = page * 12;

    // console.log("page: " + page);

    const recipe_query = await pool.query(
      `
        SELECT name, id, url_name, description, image_url, created_at
        FROM recipe
        ORDER by id ASC
        OFFSET $1
        LIMIT 12
        `,
      [offset]
    );

    for (const recipe of recipe_query.rows) {
      const ingredients = await pool.query(
        `
          SELECT recipe_ingredients.amount, recipe_ingredients.units, ingredients.name
          FROM recipe_ingredients
          JOIN ingredients ON recipe_ingredients.ingredient_name = ingredients.name
          WHERE recipe_ingredients.recipe_id = $1
        `,
        [recipe.id]
      );

      // Convert the ingredients to an array of objects
      const ingredientsArray = ingredients.rows.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        units: ingredient.units,
      }));

      // Add the ingredients array to the recipe object
      recipe.ingredients = ingredientsArray;
    }

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
