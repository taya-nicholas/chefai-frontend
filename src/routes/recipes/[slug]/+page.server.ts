import type { PageServerLoad } from "./$types";
import { pool } from "$db/postgres";

export const load = (async ({ params }) => {
  const recipe_query = await pool.query(
    `
    SELECT *
    FROM recipe
    WHERE recipe.url_name = $1
    `,
    [params.slug]
  );

  let recipe = recipe_query.rows[0];

  // console.log(recipe)

  const tags_query = await pool.query(
    `
    SELECT tag_name
    FROM recipe_tags
    WHERE recipe_tags.recipe_id = $1
    `,
    [recipe.id]
  );

  let tags = tags_query.rows;
  // console.log(tags)

  const ingredients_query = await pool.query(
    `
    SELECT recipe_ingredients.amount, recipe_ingredients.units, ingredients.name
    FROM recipe_ingredients
    JOIN ingredients ON recipe_ingredients.ingredient_name = ingredients.name
    WHERE recipe_ingredients.recipe_id = $1
    `,
    [recipe.id]
  );

  let ingredients = ingredients_query.rows;

  const instructions_query = await pool.query(
    `
    SELECT instructions.position, instructions.content
    FROM instructions
    WHERE instructions.recipe_id = $1
    `,
    [recipe.id]
  );

  let instructions = instructions_query.rows;

  recipe.tags = tags;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;

  return { recipe: recipe };
}) satisfies PageServerLoad;
