<script lang="ts">
  import { navigating, page } from '$app/stores';

  export let href: string;
  export let className = '';
  export let activeClassName = 'active';
  export let match: RegExp | undefined = undefined;
  export let excludedQueryParams: string[] | null = null;

  $: [path, queryString] = href.split('?') as [string, string | undefined];
  $: queryParams = queryString ? new URLSearchParams(queryString) : null;
  $: active = isActive(path, queryParams, $page.url);

  // Sometimes the page store does not update properly/on time, appears to be due
  // to a timing issue. Subscribers are notified before the page store has actually
  // been updated.
  navigating.subscribe((navigating) => {
    if (!navigating) return;
    active = isActive(path, queryParams, navigating.to);
  });

  function isActive(path: string, queryParams: URLSearchParams | null, url: URL) {
    let isActive = match ? !!url.pathname.match(match) : url.pathname.startsWith(path);

    if (excludedQueryParams) {
      excludedQueryParams.forEach((param) => {
        isActive = isActive && !url.searchParams.has(param);
      });
    }

    if (queryParams) {
      queryParams.forEach((value, key) => {
        isActive = isActive && url.searchParams.get(key) === value;
      });
    }

    return isActive;
  }
</script>

<a sveltekit:prefetch {href} class="{className} {active ? activeClassName : ''}">
  <slot {active} />
</a>
