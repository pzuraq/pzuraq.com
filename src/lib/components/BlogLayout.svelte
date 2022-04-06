<script>
  import { formatTitle } from '$lib/format';

  export let title;
  export let tagline;

  $: formattedTitle = title ? formatTitle(title) : '';
  $: blogTitle = typeof tagline === 'string' ? 'blog | ' : '';
</script>

<svelte:head>
  <title>pzuraq | {blogTitle}{formattedTitle}</title>
</svelte:head>

<div class="blog-content">
  <slot />
</div>
