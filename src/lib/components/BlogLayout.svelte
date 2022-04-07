<script>
  import { formatTitle } from '$lib/format';
  import { page } from '$app/stores';

  export let title;
  export let tagline;

  $: formattedTitle = title ? formatTitle(title) : '';
  $: blogTitle = typeof tagline === 'string' ? 'blog | ' : '';
</script>

<svelte:head>
  <title>pzuraq | {blogTitle}{formattedTitle}</title>

  <meta property="og:url" content="https://www.pzuraq.com{$page.url.pathname}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="pzuraq | {title.replaceAll('(nbsp)', ' ')}" />
  <meta property="og:image" content="https://www.pzuraq.com/assets/og-image.png" />
  <meta property="og:description" content={tagline || 'A blog about (mostly) computery things'} />

  <meta name="twitter:image" content="https://www.pzuraq.com/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pzuraq" />
  <meta name="twitter:creator" content="@pzuraq" />
</svelte:head>

<div class="blog-content">
  <slot />
</div>
