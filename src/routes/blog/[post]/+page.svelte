<script lang="ts">
  import type { PageData } from './$types';
  import { formatTitle, formatPublishDate } from '$lib/format';

  export let data: PageData;

  let title = formatTitle(data.metadata.title);
  let published = formatPublishDate(data.metadata.published);
</script>

<span class="text-secondary font-cursive relative -top-8 md:inline hidden">
  {published}
</span>

<h1 class="text-center">{title}</h1>

<span class="text-secondary font-cursive relative block text-center text-sm md:hidden -mb-2 -mt-1">
  {published}
</span>

<hr />

<svelte:component this={data.component} />

<hr />

<div class="text-center text-link pt-8 pb-12">
  <a href="/"> read some more </a>
</div>
