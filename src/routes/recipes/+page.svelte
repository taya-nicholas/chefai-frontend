<script lang="ts">
  import type { PageData } from "./$types";
  import Image from "sveltekit-image";
  import { cart } from "../../cart";

  export let data: PageData;
  $: recipes = data.recipes;
  let cart_arr: number[] = Array.from($cart);

  function updateCart(id: number) {
    let items = $cart;
    const index = items.indexOf(id);

    if (index === -1) {
      items.push(id);
    } else {
      items.splice(index, 1);
    }

    $cart = items;
    cart_arr = Array.from($cart);
  }
</script>

<div class="bg-white h-max w-full">
  <div
    class="absolute top-0 left-0 bg-gradient-to-b from-pale-yellow to-transparent h-96 w-full z-0"
  />
  <main class="max-w-screen-xl mx-auto overflow-hidden relative z-1 w-full">
    <h1 class="text-3xl text-zinc-800 font-medium pt-8 md:text-4xl lg:text-5xl">
      Recipes
    </h1>

    <p
      class="text-base font-normal my-5 text-zinc-700 max-w-3xl pb-3 md:text-md lg:text-lg"
    >
      Discover a world of flavor with our recipe library. Whether you're looking
      for classic comfort food or something new and exciting, you're sure to
      find a recipe that will delight your taste buds.
    </p>
    <div class="bg-aqua h-1 rounded-lg outline outline-1 outline-black m-1" />
    <div
      class="grid grid-cols-2 grid-flow-row pt-10 md:grid-cols-3 lg:grid-cols-4"
    >
      {#each recipes as recipe (recipe.id)}
        <div class="flex flex-col">
          <div
            class="flex space-x-3 no-underline mx-3 justify-between items-center"
          >
            <p>
              {new Date(recipe.created_at).toLocaleDateString("en-nz", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <div class="flex flex-row items-center space-x-2">
              <button
                class="btn btn-sm btn-ghost {cart_arr.includes(recipe.id)
                  ? 'bg-yellow-300 hover:bg-aqua'
                  : 'bg-aqua hover:bg-yellow-300'} outline outline-1 outline-black text-slate-800"
                on:click={() => updateCart(recipe.id)}
              >
                {cart_arr.includes(recipe.id) ? "✓" : "+"}
              </button>

              <label for={String(recipe.id) + "id"} class="hover:cursor-pointer"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={2}
                  stroke="currentColor"
                  class="w-6 h-6 hover:text-black text-gray-800 hover:outline hover:outline-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg></label
              >

              <input
                type="checkbox"
                id={String(recipe.id) + "id"}
                class="modal-toggle"
              />
              <label
                for={String(recipe.id) + "id"}
                class="modal cursor-pointer"
              >
                <label
                  class="modal-box relative bg-white text-gray-900 p-5"
                  for=""
                >
                  <div class="flex flex-row">
                    <h1 class="text-lg font-semibold">
                      <p class="font-bold">Recipe Preview:</p>
                      {recipe.name}
                    </h1>
                  </div>
                  <p class="py-4">{recipe.description}</p>
                  <div>
                    <p class="text-xl text-gray-900 font-semibold">
                      Ingredients:
                    </p>
                    {#each recipe.ingredients as ingredient}
                      <p>{ingredient.name}</p>
                    {/each}
                  </div>
                </label>
              </label>
            </div>
          </div>
          <a
            class="flex flex-col m-3 mb-2 cursor-pointer hover:scale-105 text-center"
            href="/recipes/{recipe.url_name}"
          >
            <Image
              class="object-contain w-full"
              width={310}
              height={310}
              quality={45}
              eager={false}
              src={recipe.image_url}
              alt="recipe image of {recipe.name}"
            />
            <div class="h-20 flex flex-col justify-between">
              <div class="flex flex-row justify-between items-center">
                <p
                  class="mt-3 mb-2 font-semibold text-gray-800 text-md h-12 overflow-clip lg:text-lg lg:h-16"
                >
                  {recipe.name}
                </p>
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </main>
</div>
