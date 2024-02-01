<script lang="ts">
  export let className = '';
</script>

<div class="text-center text-secondary flex justify-center gap-4 {className}">
  <a href="https://github.com/pzuraq" aria-label="My Github profile" class="hover:text-primary">
    <i class="icon-github" />
  </a>
  <a href="/rss" aria-label="My RSS feed" class="hover:text-primary">
    <i class="icon-rss" />
  </a>
  <a
    href="https://matrix.to/#/@pzura:matrix.org"
    aria-label="My Matrix profile"
    class="hover:text-primary"
  >
    <i class="icon-matrix" />
  </a>
</div>
