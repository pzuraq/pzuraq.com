<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;

  const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<label class="toggle" for="myToggle">
  <input
    class="toggle__input"
    {checked}
    type="checkbox"
    id="myToggle"
    on:change={() => dispatch('change', !checked)}
  />
  <div class="toggle__fill" />
</label>

<style>
  @mixin light {
    --toggle-foreground: theme('colors.white');
    --toggle-background: theme('colors.stone.150');
  }

  @mixin dark {
    --toggle-foreground: theme('colors.midnight.800');
    --toggle-background: theme('colors.midnight.600');
  }

  .toggle {
    --width: 3rem;
    --height: calc(var(--width) / 2);
    --border-radius: calc(var(--height) / 2);

    display: inline-block;
    cursor: pointer;
  }

  .toggle__input {
    display: none;
  }

  .toggle__fill {
    image-rendering: pixelated;
    background-image: url('/sun.svg'), url('/moon.svg');
    background-repeat: no-repeat, no-repeat;
    background-position: top 0.3rem right 0.45rem, top 0.37rem left 0.5rem;
    background-size: 0.75em, 0.7em;
    background-color: var(--toggle-background);
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    transition: background 0.2s;
    box-shadow: inset 0 0 1px rgb(0 0 0 / 20%);
  }

  .toggle__fill::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(var(--height) - 4px);
    width: calc(var(--height) - 4px);
    background: var(--toggle-foreground);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
    box-shadow: 0 0 1px 1px rgb(0 0 0 / 5%);
  }

  .toggle__input:checked ~ .toggle__fill::after {
    transform: translateX(var(--height));
  }
</style>
