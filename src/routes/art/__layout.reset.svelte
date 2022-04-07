<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div class="px-8 py-8 md:px-12 lg:px-20">
  <div class="max-w-2xl 2xl:max-w-3xl m-auto">
    <div class="flex justify-between">
      <a href="/" class="text-link"> go back </a>

      <ThemeToggle />
    </div>
    <slot />
  </div>
</div>
