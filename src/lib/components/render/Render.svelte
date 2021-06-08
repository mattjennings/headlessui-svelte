<script>
  import * as elements from '../elements'

  export let as
  export let id
  export let el = undefined

  if (!as) {
    throw Error(`"as" is a required prop`)
  }

</script>

<svelte:component
  this={elements[as]}
  bind:el
  {id}
  on:click
  on:focus
  on:blur
  on:keypress
  on:keydown
  on:keyup
  {...$$restProps}
>
  <slot />
</svelte:component>
