<script lang="ts">
  import Image from "sveltekit-image";
  import { cart } from "../../cart";
  let cart_arr: number[] = Array.from($cart);
  let inds: Array<number> = [];
  let num_recipes = 3;

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

  async function getRecipeRecommendations() {
    let res_rec;
    const req = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num_recipes: num_recipes,
        iterations: 3,
      }),
    });
    const res = await req.json();
    if (res.statusCode === 200) {
      inds = res.body;
      const req_rec = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          indicies: inds,
        }),
      });
      let res_rec = await req_rec.json();
      console.log(res_rec);
      if (res_rec.message) {
        return res_rec.message;
      }
    }
    throw new Error("An error occurred.");
  }

  let promise: Promise<any>;

  function handleClick() {
    promise = getRecipeRecommendations();
  }

  function addAllToCart() {
    let items = $cart;
    for (let id of inds) {
      const index = items.indexOf(id);
      if (index === -1) {
        items.push(id);
      }
    }

    $cart = items;
    cart_arr = Array.from($cart);
  }
</script>

<div class="bg-white">
  <div class="bg-gradient-to-b from-pale-yellow to-white">
    <main class="max-w-screen-xl mx-auto overflow-hidden">
      <h1
        class="text-3xl text-zinc-800 font-medium m-1 pt-8 md:text-4xl lg:text-5xl"
      >
        Recommendations
      </h1>

      <p
        class="text-base font-normal m-1 my-5 text-zinc-700 max-w-3xl pb-3 md:text-md lg:text-lg"
      >
        Our Recommendations machine simplifies meal planning by generating a
        wide range of diverse and delicious recipes. You no longer have to worry
        about selecting meals that are nutritious and balanced because we've got
        you covered. Once you find recipes that you like, simply add them to
        your cart to keep track of them.
      </p>

      <div class="flex flex-row space-x-5 max-w-2xl">
        <button
          class="btn bg-aqua text-slate-800 hover:bg-yellow-300 btn-lg ml-2"
          on:click={handleClick}>Generate {num_recipes}</button
        >
        <div class="w-screen">
          <p class="pb-1 text-center italic text-gray-400">
            Select number of recipes to generate
          </p>
          <input
            type="range"
            min="2"
            max="7"
            bind:value={num_recipes}
            class="range range-accent range-sm"
            step="1"
          />
          <div class="w-full flex justify-between text-xs px-2 text-slate-800">
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
        </div>
      </div>
      {#await promise}
        <p class="pt-10">Generating...</p>
      {:then recipes}
        {#if recipes}
          <div
            class="grid grid-cols-2 grid-flow-row pt-10 md:grid-cols-3 lg:grid-cols-4"
          >
            {#each recipes as recipe}
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
                  <Image
                    class="object-contain w-full"
                    width={310}
                    height={310}
                    eager={false}
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
          <button on:click={addAllToCart} class="btn btn-md btn-accent m-5"
            >Add all to cart</button
          >
        {/if}
      {:catch error}
        <p>{error.message}</p>
      {/await}
    </main>
  </div>
</div>
