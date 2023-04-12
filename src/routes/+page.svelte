<script lang="ts">
  import Image from "sveltekit-image";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: recipes = data.recipes;
</script>

<main class="text-center flex flex-col justify-center items-center">
  <div class="grid grid-rows lg:grid-cols-2">
    <div
      class="col-span-1 dborder border-1 border-l-sky-900 border-b-sky-900 border-r-sky-900 bg-sky-900"
    >
      <Image
        class="w-full h-full"
        width={1000}
        height={1000}
        quality={100}
        eager={true}
        src="https://chefai.s3.ap-southeast-2.amazonaws.com/images/robot.png"
        alt="Robot chef making dinner"
      />
    </div>
    <div
      class="col-span-1 min-h-full mb-5 text-left pl-5 pt-5 pr-5 lg:p-12 xl:pl-16 xl:pt-20 xl:pr-24 bg-gradient-to-b from-pale-yellow to-white border border-1 border-r-sky-900 border-b-sky-900 border-l-sky-900 overflow-auto"
    >
      <h1
        class="title text-3xl pb-5 font-semibold text-zinc-900 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
      >
        The begginings of recipe automation
      </h1>
      <p
        class="text-sm pl-1 pt-4 text-zinc-700 sm:text-md md:text-lg xl:text-xl overflow-auto"
      >
        Welcome to ChefAI, the future of effortless meal planning and
        preparation! We are a cutting-edge website that harnesses the power of
        AI and automation to simplify your cooking experience and save you
        valuable time in the kitchen.
      </p>
    </div>
  </div>

  <div class="bg-gradient-to-b from-pale-yellow to-white w-full">
    <div class="max-w-screen-xl mx-auto">
      <h1
        class="text-3xl mb-5 text-zinc-800 font-medium pt-8 md:text-4xl lg:text-5xl"
      >
        Latest Recipes
        <p class="text-lg font-normal mt-2">
          A sample of fresh and exciting meals recently added to our collection.
        </p>
      </h1>
      <div class="bg-aqua h-1 rounded-lg outline outline-1 outline-black m-1" />

      <div class="carousel rounded-box m-5">
        {#each recipes as recipe}
          <div class="carousel-item h-96 w-72">
            <a class="" href="recipes/{recipe.url_name}">
              <Image
                class=""
                width={300}
                quality={70}
                eager={true}
                src={recipe.image_url}
                alt={recipe.name}
              />
              <p
                class="title h-7 overflow-clip hidden italic text-slate-800 font-thin text-md pl-1 m-0 text-left bg-yellow-300 border border-1 border-t-sky-900 border-r-sky-900 border-b-sky-900 border-l-sky-900"
              >
                {recipe.name}
              </p>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap");
  .title {
    font-family: "Space Grotesk", sans-serif;
  }

  .carousel-item:hover .hidden {
    display: block;
  }

  .carousel-item:hover a {
    transform: translateY(-28px);
  }
</style>
