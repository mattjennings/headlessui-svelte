<script>
  import * as elements from '../elements'

  export let as
  export let id
  export let el = undefined

  if (!as) {
    throw Error(`"as" is a required prop`)
  }

</script>

<svelte:component this={elements[as]} bind:el {id} on:click on:blur on:focus {...$$restProps}>
  <slot />
</svelte:component>
