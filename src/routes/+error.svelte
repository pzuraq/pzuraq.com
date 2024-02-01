<script>
  import { page } from '$app/stores';

  $: message = $page.error?.message;
  $: is404 = message?.toLowerCase() === 'not found'
  $: title =
    is404 ? "sorry, nebs couldn't find that page :(" : 'something went wrong';
</script>

<div class="flex items-center justify-center p-8">
  <div>
    <img src="/favicon-16x16.png" alt="The best doggo" class="w-32 m-auto my-8" />
    <h1 class="text-xl mb-0">{title}</h1>

    {#if message && !is404}
      <div class="text-lg text-center error-message">{message}</div>
    {/if}
  </div>
</div>

<style lang="postcss">
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
