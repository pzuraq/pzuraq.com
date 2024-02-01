<script lang="ts">
  export let text: string;

  $: letters = text.split('');
</script>

<span class="text-effect">
  {#each letters as letter, index}
    <span style="--n: {index}">{letter === ' ' ? '\xa0' : letter}</span>
  {/each}
</span>

<style>
  .text-effect {
    border-radius: 12px;
    display: inline-flex;
    height: 88%;
    text-align: center;
  }

  .text-effect span {
    display: inline-block;
    animation: animate 2s ease-in-out infinite;
    animation-delay: calc(var(--n) * 0.2s);
  }

 @keyframes animate {
	 50%, 100% {
		 transform: translate(0, 0);
	}
	 0% {
		 transform: translate(0, 0);
	}
	 50% {
		 transform: translate(0, -0.2em);
	}
}

</style>
