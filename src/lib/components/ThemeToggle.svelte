<script lang="ts" context="module">
  let uuid = 0;
  let globalHandlerExists = false;
  const theme = writable<string>('system');
</script>

<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const id = uuid++;

  let prefersTheme: string;

  if (browser) {
    theme.set(localStorage.getItem('theme') ?? 'system');
    prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const handleGlobalShortcut = (e: KeyboardEvent) => {
    if (e.code === 'KeyD' && e.ctrlKey && e.altKey) {
      toggleTheme();
    }
  };

  const toggleTheme = () => {
    document.body.classList.remove($theme);
    console.log(theme);

    if ($theme === 'system') {
      // If the theme is set to system, then set it to the preferred default
      // theme and toggle based on that.
      theme.set(prefersTheme);
    }

    theme.set($theme === 'light' ? 'dark' : 'light');

    document.body.classList.add($theme);
    localStorage.setItem('theme', $theme);
  };

  $: isDark = $theme === 'dark' || ($theme === 'system' && prefersTheme === 'dark');

  onMount(() => {
    if (globalHandlerExists) return;

    globalHandlerExists = true;

    document.addEventListener('keyup', handleGlobalShortcut);

    return () => document.removeEventListener('keyup', handleGlobalShortcut);
  });
</script>

<label class="toggle text-lg md:text-base" for="toggle-{id}">
  <input
    class="toggle__input"
    checked={isDark}
    type="checkbox"
    id="toggle-{id}"
    on:change={() => toggleTheme()}
  />
  <div class="toggle__fill" />
</label>

<style lang="postcss">

  .toggle {
    --width: 3em;
    --height: calc(var(--width) / 2);
    --border-radius: calc(var(--height) / 2);

    display: inline-block;
    cursor: pointer;
  }

  .toggle__input {
    display: none;
  }

  .toggle__fill {
    @apply bg-stone-150 dark:bg-midnight-600;
    image-rendering: pixelated;
    background-image: url('/assets/sun.svg'), url('/assets/moon.svg');
    background-repeat: no-repeat, no-repeat;
    background-position: top 0.3em right 0.4em, top 0.385em left 0.5em;
    background-size: 0.85em, 0.75em;
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    transition: background 0.2s;
    box-shadow: inset 0 0 1px rgb(0 0 0 / 20%);
  }

  .toggle__fill::after {
    @apply bg-white dark:bg-midnight-800;
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(var(--height) - 4px);
    width: calc(var(--height) - 4px);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
    box-shadow: 0 0 1px 1px rgb(0 0 0 / 5%);
  }

  .toggle__input:checked ~ .toggle__fill::after {
    transform: translateX(var(--height));
  }
</style>
