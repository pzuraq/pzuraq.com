<script lang="ts">
  export let readingTime: number;

  let coffees: number;

  $: if (readingTime < 5) {
    coffees = 1;
  } else if (readingTime < 10) {
    coffees = 2;
  } else if (readingTime < 20) {
    coffees = 3;
  } else if (readingTime < 30) {
    coffees = 4;
  } else {
    coffees = 5;
  }
</script>

<span class="mr-1">{readingTime} min read</span>
<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{#each {length: coffees} as _}
  <img alt="coffee" src="/assets/coffee.svg" aria-hidden="true" class="h-4 w-4 inline-block -mt-1.5" />
{/each}
