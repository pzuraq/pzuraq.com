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
  import BlogLayout from '$lib/components/BlogLayout.svelte';
  import { formatTitle, formatPublishDate } from '$lib/format';

  export let component: SvelteComponent;
  export let metadata: BlogMetadata;

  let title = formatTitle(metadata.title);
  let published = formatPublishDate(metadata.published);
</script>

<span class="text-secondary font-cursive relative md:-top-8">
  {published}
</span>

<h1 class="text-center">{title}</h1>

<hr />

<BlogLayout>
  <svelte:component this={component} />
</BlogLayout>

<hr />

<a href="/"> read some more </a>
