<script lang="ts">
  import NavLink from '$lib/components/NavLink.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  import '../styles/app.css';

  import { browser } from '$app/env';
  import SocialLinks from '$lib/components/SocialLinks.svelte';

  let menuOpen = false;
  let theme = 'system';
  let prefersTheme: string;

  if (browser) {
    theme = localStorage.getItem('theme') ?? theme;
    prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const handleGlobalShortcut = (e: KeyboardEvent) => {
    if (e.code === 'KeyD' && e.ctrlKey && e.altKey) {
      toggleTheme();
    }
  };

  const toggleTheme = () => {
    document.body.classList.remove(theme);
    console.log(theme);

    if (theme === 'system') {
      // If the theme is set to system, then set it to the preferred default
      // theme and toggle based on that.
      theme = prefersTheme;
    }

    theme = theme === 'light' ? 'dark' : 'light';

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  };

  $: isDark = theme === 'dark' || (theme === 'system' && prefersTheme === 'dark');
</script>

<svelte:window on:keyup={handleGlobalShortcut} />

<nav
  class="w-full p-4 md:p-8 md:pr-0 2xl:w-80 lg:w-64 md:w-36 md:fixed md:h-screen font-cursive text-center flex flex-col-reverse md:flex-col overflow-y-scroll"
>
  <div class="-mt-8 -mb-4 mx-4 md:m-0">
    <img src="/assets/store-day.png" alt="A peaceful little bookstore" class="w-full only-light" />
    <img src="/assets/store-night.png" alt="A peaceful little bookstore" class="w-full only-dark" />
  </div>

  <div class="flex-grow -mt-10 md:mt-0">
    <a sveltekit:prefetch href="/" class="md:text-4xl text-3xl"> pzuraq </a>
    <br />
    <a
      href="http://ipa-reader.xyz/?text=z%C9%99-r%C3%A4k&voice=Joanna"
      class="2xl:text-xl text-lg hover:text-ochre-500">/zə-räk/</a
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

  <SocialLinks className="pt-8 hidden md:block" />

  <div class="md:hidden flex justify-between p-4">
    <button on:click={() => (menuOpen = !menuOpen)} aria-label="Toggle menu" class="menu-btn">
      <i class={menuOpen ? 'icon-close' : 'icon-menu'} />
    </button>

    <Toggle checked={isDark} on:change={toggleTheme} />
  </div>
</nav>

<div class="md:ml-36 lg:ml-64 xl:mr-48 2xl:mx-80 px-8 pb-8 md:py-8 md:px-12 lg:px-20">
  <div class="max-w-2xl 2xl:max-w-3xl m-auto">
    <div class="text-right hidden md:block">
      <Toggle checked={isDark} on:change={toggleTheme} />
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

  img {
    aspect-ratio: 1;

    image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
    image-rendering: -moz-crisp-edges; /* Firefox                        */
    image-rendering: -o-crisp-edges; /* Opera                          */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated; /* Chrome */
    image-rendering: optimize-contrast; /* CSS3 Proposed                  */
  }
</style>
