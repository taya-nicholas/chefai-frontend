import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";

export const config = {
  isr: {
    expiration: 600,
  },
};
export const load = (async ({ params }) => {
  // Select all recipes
  const recipes = await pool.query("SELECT * FROM recipe");

  // Iterate over each recipe and get its ingredients
  for (const recipe of recipes.rows) {
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

  return { recipes: recipes.rows };
}) satisfies PageServerLoad;
