<script>
  import "../app.css";
</script>

<body class="bg-white min-h-screen">
  <header
    class="navbar bg-white outline outline-sky-900 outline-1 fixed w-full z-20 top-0"
  >
    <div class="navbar-start p-1 flex ml-auto">
      <div class="dropdown">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabIndex={0} class="btn btn-ghost md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <ul
          tabIndex={0}
          class="menu menu-compact dropdown-content mt-3 p-4 m-2 shadow text-sky-800 bg-white rounded-box w-52 border border-slate-900"
        >
          <li>
            <a data-sveltekit-reload href="/recipes" class="hover:underline"
              >Recipes</a
            >
          </li>
          <li>
            <a class="hover:underline" href="/recommendations"
              >Recommendations</a
            >
          </li>
          <li><a class="hover:underline" href="/saved">Saved</a></li>
        </ul>
      </div>
      <a href="/" class="title btn btn-ghost normal-case text-sky-800 text-3xl"
        >ChefAI</a
      >
    </div>
    <div
      class="navbar-center hidden md:flex text-sky-800 font-semibold text-lg"
    >
      <ul class="flex space-x-6">
        <li><a class="hover:underline" href="/">Home</a></li>
        <li>
          <a data-sveltekit-reload href="/recipes" class="hover:underline"
            >Recipes</a
          >
        </li>
        <li>
          <a class="hover:underline" href="/recommendations">Recommendations</a>
        </li>
        <li><a class="hover:underline" href="/saved">Saved</a></li>
      </ul>
    </div>
    <div class="navbar-end" />
  </header>

  <div class="relative top-16 bg-white min-h-max w-full">
    <slot />
  </div>
</body>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap");
  .title {
    font-family: "Space Grotesk", sans-serif;
  }
</style>
