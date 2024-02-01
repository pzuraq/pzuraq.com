<script context="module" lang="ts">
  import { formatPublishDate, formatTitle } from '$lib/format';
  import POST_META from '$virtual/post-meta.json';
  import ReadingTime from '$lib/components/ReadingTime.svelte';
</script>

<svelte:head>
  <title>pzuraq | blog</title>

  <meta property="og:url" content="https://www.pzuraq.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="pzuraq" />
  <meta property="og:image" content="https://www.pzuraq.com/assets/og-image.png" />
  <meta property="og:description" content="A blog about (mostly) computery things" />

  <meta name="twitter:image" content="https://www.pzuraq.com/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pzuraq" />
</svelte:head>

<h1 class="text-secondary text-base">a blog about (mostly) computery things</h1>

<hr />

{#each POST_META as blogPost}
  <div class="mb-8 text-center">
    <a href="/blog/{blogPost.slug}">
      <span class="text-2xl font-bold font-cursive hover:text-ochre-500"
        >{formatTitle(blogPost.title)}</span
      >

      <br />

      {#if blogPost.tagline}
        <span class="text-sm my-1">
          {blogPost.tagline}
        </span>

        <br />
      {/if}

      <span class="text-secondary text-sm font-cursive">
        {formatPublishDate(blogPost.published)} • <span class="mr-1"><ReadingTime readingTime={blogPost.readingTime}/></span>
      </span>
    </a>
  </div>
{/each}
