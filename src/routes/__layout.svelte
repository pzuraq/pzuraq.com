<script lang="ts">
  import NavLink from '$lib/components/NavLink.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Cookies from 'js-cookie';

  import '../styles/app.css';

  import { session } from '$app/stores';
  import { browser } from '$app/env';

  if (browser) {
    const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    session.set({
      ...$session,
      prefersTheme,
    });
  }

  let menuOpen = false;

  function handleGlobalShortcut(e: KeyboardEvent) {
    if (e.code === 'KeyD' && e.ctrlKey && e.altKey) {
      toggleTheme();
    }
  }

  function toggleTheme() {
    let { theme, prefersTheme } = $session;

    if (theme === 'system') {
      // If the theme is set to system, then set it to the preferred default
      // theme and toggle based on that.
      theme = prefersTheme;
    }

    theme = theme === 'light' ? 'dark' : 'light';

    Cookies.set('theme', theme, { secure: true, sameSite: 'Strict' });
    session.set({ ...$session, theme });
  }

  $: isDark =
    $session.theme === 'dark' || ($session.theme === 'system' && $session.prefersTheme === 'dark');
</script>

<svelte:window on:keyup={handleGlobalShortcut} />

<div class="{$session.theme} text-lg text-primary bg-inverse h-screen overflow-scroll">
  <nav
    class="w-full p-4 md:p-8 md:pr-0 2xl:w-80 lg:w-64 md:w-36 md:fixed md:h-screen font-cursive text-center flex flex-col-reverse md:flex-col overflow-y-scroll"
  >
    <div class="-my-6 md:my-0">
      <img src="/store-day.png" alt="A peaceful little bookstore" class="w-full only-light" />
      <img src="/store-night.png" alt="A peaceful little bookstore" class="w-full only-dark" />
    </div>

    <div class="md:block flex-grow" class:hidden={!menuOpen}>
      <a sveltekit:prefetch href="/" class="2xl:text-4xl text-4xl"> pzuraq </a>
      <br />
      <a
        href="http://ipa-reader.xyz/?text=z%C9%99-r%C3%A4k&voice=Joanna"
        class="2xl:text-xl text-lg hover:text-ochre-500">/zə-räk/</a
      >

      <div class="flex flex-col justify-center mt-4 items-center">
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

    <div class="text-center hidden md:block pt-8 text-secondary">
      <a href="https://twitter.com/pzuraq" class="hover:text-primary">
        <i class="icon-twitter mx-2" />
      </a>
      <a href="https://github.com/pzuraq" class="hover:text-primary">
        <i class="icon-github mx-2" />
      </a>
      <a href="https://matrix.to/#/@pzura:matrix.org" class="hover:text-primary">
        <i class="icon-matrix mx-2" />
      </a>
    </div>

    <div class="md:hidden flex justify-between p-4">
      <button on:click={() => (menuOpen = !menuOpen)} class="menu-btn">
        <i class={menuOpen ? 'icon-close' : 'icon-menu'} />
      </button>

      <Toggle checked={isDark} on:change={toggleTheme} />
    </div>
  </nav>

  <div class="md:ml-36 lg:ml-64 xl:mr-48 2xl:mx-80 p-8 md:py-8 md:px-12 lg:px-20">
    <div class="max-w-2xl 2xl:max-w-3xl m-auto">
      <div class="text-right hidden md:block">
        <Toggle checked={isDark} on:change={toggleTheme} />
      </div>
      <slot />
      <div class="p-8 text-center text-secondary md:hidden">
        <a href="https://twitter.com/pzuraq" class="hover:text-primary">
          <i class="icon-twitter mx-2" />
        </a>
        <a href="https://github.com/pzuraq" class="hover:text-primary">
          <i class="icon-github mx-2" />
        </a>
        <a href="https://matrix.to/#/@pzura:matrix.org" class="hover:text-primary">
          <i class="icon-matrix mx-2" />
        </a>
      </div>
    </div>
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
    top: 0.95rem;
    left: -0.75rem;
    display: block;
  }

  img {
    image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
    image-rendering: -moz-crisp-edges; /* Firefox                        */
    image-rendering: -o-crisp-edges; /* Opera                          */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated; /* Chrome */
    image-rendering: optimize-contrast; /* CSS3 Proposed                  */
  }
</style>
