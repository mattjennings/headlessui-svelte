<script>
  import { subscribe } from './utils'

  export let value
  export let el = undefined
  export let listen = undefined

</script>

<option
  {value}
  bind:this={el}
  on:click
  on:focus
  on:blur
  on:keypress
  on:keydown
  on:keyup
  use:subscribe={listen}
  {...$$restProps}><slot /></option
>
