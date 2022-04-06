<script lang="ts" context="module">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = ({ error, status }) => {
    let title, message;

    if (status === 404) {
      title = "sorry, nebs couldn't find that page :(";
    } else {
      title = 'something went wrong';
      message = error.message;
    }

    return {
      props: {
        title,
        message,
      },
    };
  };
</script>

<script lang="ts">
  export let title: string;
  export let message: string | undefined;
</script>

<div class="flex items-center justify-center p-8">
  <div>
    <img src="/assets/nebs.png" alt="The best doggo" class="w-32 m-auto my-8" />
    <h1 class="text-xl mb-0">{title}</h1>

    {#if message}
      <div class="text-lg text-center">{message}</div>
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
