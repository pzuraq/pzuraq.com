<script context="module" lang="ts">
  import { formatPublishDate, formatTitle, formatReadingTime } from '$lib/format';
  import POST_META from '$virtual/post-meta.json';
</script>

<svelte:head>
  <title>pzuraq | blog</title>
</svelte:head>

<h1 class="text-secondary text-base">A blog about (mostly) computery things</h1>

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
        {formatPublishDate(blogPost.published)} • {@html formatReadingTime(blogPost.readingTime)}
      </span>
    </a>
  </div>
{/each}
