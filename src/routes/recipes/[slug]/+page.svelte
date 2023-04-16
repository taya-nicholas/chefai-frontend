<script lang="ts">
  import type { PageData } from "./$types";
  import Image from "sveltekit-image";

  import { cart } from "../../../cart";

  let cart_arr: any = $cart;

  if (typeof cart_arr === "string") {
    cart_arr = cart_arr.split(",").map(Number);
  }

  export let data: PageData;
  $: recipe = data.recipe;
  $: ingredients = recipe.ingredients;
  $: instructions = recipe.instructions;
  $: tags = recipe.tags;

  function getDomainName(url: string) {
    let domain = "";
    if (url.indexOf("://") > -1) {
      domain = url.split("/")[2];
    } else {
      domain = url.split("/")[0];
    }
    domain = domain.split(":")[0];
    domain = domain.split("?")[0];
    domain = domain.replace("www.", "");
    return domain;
  }

  function updateCart(id: number) {
    let items = cart_arr;
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

<div class="bg-white min-h-screen pb-32 w-full">
  <front
    class="text-center flex flex-col justify-center min-h-full items-center"
  >
    <div
      class="grid grid-rows lg:grid-cols-2 bg-white border-b border-gray-600 pb-5 pt-10 lg:pt-1"
    >
      <div
        class="flex flex-col justify-center items-center dborder border-1 border-l-sky-900 border-b-sky-900 border-r-sky-900"
      >
        <div>
          <div class="flex space-x-3 text-center justify-center overflow-auto">
            {#each tags as tag}
              <p
                class="bg-aqua text-gray-700 px-1 text-sm md:text-md lg:text-lg hover:bg-yellow-300 hover:cursor-pointer"
              >
                {tag.tag_name}
              </p>
            {/each}
          </div>
          <h1 class="text-4xl font-serif text-black text-center font-bold p-3">
            {recipe.name}
          </h1>
          <p class="text-gray-700">
            From <a class="hover:text-blue-500" href={recipe.url}
              >{getDomainName(recipe.url)}</a
            >
          </p>
          <p class="text-gray-700 m-10 text-xl italic">{recipe.description}</p>
          <button
            class="btn btn-md lg:btn-lg mb-3 btn-ghost {cart_arr &&
            cart_arr.includes(recipe.id)
              ? 'bg-yellow-300 hover:bg-aqua'
              : 'bg-aqua hover:bg-yellow-300'} outline outline-1 outline-black text-slate-800"
            on:click={() => updateCart(recipe.id)}
          >
            {cart_arr && cart_arr.includes(recipe.id)
              ? "Remove from saved"
              : "Save"}
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <Image
          class="object-cover"
          width={800}
          height={800}
          quality={100}
          eager={true}
          src={recipe.image_url}
          alt="recipe image of {recipe.name}"
        />
      </div>
    </div>
  </front>

  <main class="text-zinc-800 mx-auto max-w-screen-xl">
    <h1 class="font-bold text-2xl p-3 md:text-4xl">Ingredients</h1>
    <div class="p-3">
      {#each ingredients as ing}
        <p class="pl-1 text-md md:text-lg">
          {ing.amount}
          {ing.units}
          {ing.name}
        </p>
      {/each}
    </div>

    <h1 class="font-bold text-2xl p-3 md:text-4xl">Instructions</h1>
    <div class="p-3">
      {#each instructions as instructions}
        <div class="flex space-x-4">
          <p class="font-bold text-lg md:text-xl">{instructions.position}.</p>
          <p class="text-lg md:text-xl font-light">{instructions.content}</p>
        </div>
      {/each}
    </div>
  </main>
</div>
