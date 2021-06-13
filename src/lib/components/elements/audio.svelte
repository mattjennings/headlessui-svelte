<script>
  import { subscribe } from './utils'

  export let el = undefined
  export let listen = undefined

</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
  bind:this={el}
  on:click
  on:focus
  on:blur
  on:keypress
  on:keydown
  on:keyup
  on:pause
  on:play
  use:subscribe={listen}
  {...$$restProps}><slot /></audio
>
