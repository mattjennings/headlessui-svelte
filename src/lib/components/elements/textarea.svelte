<script>
  import { subscribe } from './utils'

  export let el = undefined
  export let listen = undefined

</script>

<!-- prettier-ignore see: https://github.com/sveltejs/svelte/issues/6276 -->
<textarea
  bind:this={el}
  on:focus
  on:blur
  on:keypress
  on:click
  use:subscribe={listen}
  {...$$restProps}
>
  <slot />
</textarea>
