<script lang="ts">
  import NavLink from '$lib/components/NavLink.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  import '../styles/app.css';

  import SocialLinks from '$lib/components/SocialLinks.svelte';

  let menuOpen = false;
</script>

<nav
  class="w-full p-4 md:p-8 md:pr-0 2xl:w-80 lg:w-64 md:w-36 md:fixed md:h-screen font-cursive text-center flex flex-col-reverse md:flex-col overflow-y-auto"
>
  <a sveltekit:prefetch href="/art" class="-mt-8 -mb-4 mx-4 md:m-0 hover:scale-105">
    <img
      src="/assets/store-day.png"
      alt="A peaceful little bookstore"
      class="w-full only-light pixel aspect-square"
    />
    <img
      src="/assets/store-night.png"
      alt="A peaceful little bookstore"
      class="w-full only-dark pixel aspect-square"
    />
  </a>

  <div class="flex-grow -mt-10 md:mt-0">
    <a sveltekit:prefetch href="/" class="lg:text-4xl text-3xl"> pzuraq </a>
    <br />
    <a
      href="http://ipa-reader.xyz/?text=z%C9%99-r%C3%A4k&voice=Joanna"
      class="lg:text-xl text-lg hover:text-ochre-500">/zə-räk/</a
    >

    <div
      class="text-2xl md:text-base flex md:flex flex-col justify-center mt-4 items-center"
      class:hidden={!menuOpen}
    >
      <NavLink href="/" match={/^\/(blog\/.*)?$/} className="main-nav-link">
        <div class="square" />
        blog
      </NavLink>
      <NavLink href="/favs" className="main-nav-link">
        <div class="square" />
        favs
      </NavLink>
      <NavLink href="/about" className="main-nav-link">
        <div class="square" />
        about
      </NavLink>
    </div>
  </div>

  <SocialLinks className="pt-8 hidden md:flex md:flex-col lg:flex-row" />

  <div class="md:hidden flex justify-between p-4">
    <button on:click={() => (menuOpen = !menuOpen)} aria-label="Toggle menu" class="menu-btn">
      <i class={menuOpen ? 'icon-close' : 'icon-menu'} />
    </button>

    <ThemeToggle />
  </div>
</nav>

<div class="md:ml-36 lg:ml-64 xl:mr-48 2xl:mx-80 px-8 pb-8 md:py-8 md:px-12 lg:px-20">
  <div class="max-w-2xl 2xl:max-w-3xl m-auto">
    <div class="text-right hidden md:block">
      <ThemeToggle />
    </div>
    <slot />
    <SocialLinks className="p-8 md:hidden" />
  </div>
</div>

<style lang="postcss">
  @mixin light {
    --menu-btn-color: theme('colors.stone.400');
  }

  @mixin dark {
    --menu-btn-color: var(--color-primary);
  }

  .menu-btn {
    @apply text-sm;
    color: var(--menu-btn-color);
  }

  :global(.main-nav-link) {
    @apply relative;
  }

  :global(.main-nav-link:hover) {
    @apply text-ochre-500;
  }

  :global(.main-nav-link.active) {
    @apply text-ochre-500;
  }

  :global(.main-nav-link .square) {
    display: none;
  }

  :global(.main-nav-link.active .square) {
    top: 1.15rem;
    left: -0.75rem;
    display: block;
  }

  @screen md {
    :global(.main-nav-link.active .square) {
      top: 0.85rem;
      left: -0.75rem;
    }
  }
</style>
