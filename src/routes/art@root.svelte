<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div class="px-8 py-8 md:px-12 lg:px-20">
  <div class="max-w-2xl 2xl:max-w-3xl m-auto">
    <div class="flex justify-between mb-1">
      <a href="/" class="text-link"> go back </a>

      <ThemeToggle />
    </div>

    <h1 class="text-secondary text-base">some pixely doodles</h1>

    <hr />

    <div class="md:-mt-12">
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
    </div>
  </div>
</div>
