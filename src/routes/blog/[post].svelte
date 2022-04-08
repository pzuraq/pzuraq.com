<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import type { SvelteComponent } from 'svelte';
  import POST_META from '$virtual/post-meta.json';

  export interface BlogMetadata {
    title: string;
    published: string;
  }

  export const load: Load = async ({ params }) => {
    const metadata = POST_META.find((m) => m.slug === params.post);

    if (!metadata) {
      return {
        status: 404,
      };
    }

    const { default: component } = await import(
      `./_posts/${metadata.published}-${metadata.slug}.svx`
    );

    return {
      props: {
        component,
        metadata,
      },
    };
  };
</script>

<script lang="ts">
  import { formatTitle, formatPublishDate } from '$lib/format';

  export let component: SvelteComponent;
  export let metadata: BlogMetadata;

  let title = formatTitle(metadata.title);
  let published = formatPublishDate(metadata.published);
</script>

<span class="text-secondary font-cursive relative -top-8 md:inline hidden">
  {published}
</span>

<h1 class="text-center">{title}</h1>

<span class="text-secondary font-cursive relative block text-center text-sm md:hidden -mb-2 -mt-1">
  {published}
</span>

<hr />

<svelte:component this={component} />

<hr />

<div class="text-center text-link pt-8 pb-12">
  <a href="/"> read some more </a>
</div>
