<script lang="ts">
  import type { PageData } from "./$types";
  import { cart } from "../../cart";
  let cart_arr: number[] = Array.from($cart);

  export let data: PageData;
  $: recipes = data.recipes;
  $: recipes_cart = recipes.filter((recipe) => cart_arr.includes(recipe.id));

  function clearCart() {
    $cart = [];
    cart_arr = Array.from($cart);
  }

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

<div>
  <div
    class="absolute top-0 left-0 bg-gradient-to-b from-pale-yellow to-transparent h-72 w-full z-0"
  />
  <div class="max-w-screen-xl mx-auto overflow-hidden z-1 relative">
    <h1
      class="text-3xl text-zinc-800 font-medium m-1 pt-8 md:text-4xl lg:text-5xl"
    >
      Cart
    </h1>
    <p
      class="text-base font-normal m-1 my-5 text-zinc-700 max-w-3xl pb-3 md:text-md lg:text-lg"
    >
      Your selected recipes are safely stored in your cart for easy access
      whenever you need them. You can modify them individually, or use the
      "clear" button below to remove all meals for a fresh start.
    </p>
    <button
      on:click={clearCart}
      class="btn bg-red-400 text-slate-800 hover:bg-red-600 hover:text-red-300 btn-md ml-2"
      >Clear</button
    >
    <div
      class="grid grid-cols-2 grid-flow-row pt-10 md:grid-cols-3 lg:grid-cols-4"
    >
      {#each recipes_cart as recipe}
        <div class="flex flex-col">
          <div class="flex space-x-3 justify-between no-underline mx-3">
            <p>
              {new Date(recipe.created_at).toLocaleDateString("en-nz", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <button
              class="btn btn-sm btn-ghost {cart_arr.includes(recipe.id)
                ? 'bg-yellow-300 hover:bg-aqua'
                : 'bg-aqua hover:bg-yellow-300'} outline outline-1 outline-black text-slate-800"
              on:click={() => updateCart(recipe.id)}
            >
              {cart_arr.includes(recipe.id) ? "✓" : "+"}
            </button>
          </div>
          <a
            class="flex flex-col m-3 mb-2 cursor-pointer hover:scale-105 text-center"
            href="/recipes/{recipe.url_name}"
          >
            <img
              class="object-contain w-full"
              src={recipe.image_url}
              alt="recipe image of {recipe.name}"
            />
            <div class="h-20 flex flex-col justify-between">
              <div class="flex flex-row justify-between items-center">
                <p class="mt-3 mb-2 font-semibold text-gray-800 text-lg">
                  {recipe.name}
                </p>
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>
