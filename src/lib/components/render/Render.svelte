<script>
  // todo: support render strategies

  import * as elements from '../elements'

  export let as
  export let id
  export let name
  export let el = undefined
  export let slotProps = undefined

  if (!as) {
    throw Error(`"as" is a required prop`)
  }

  $: _class = typeof $$restProps.class === 'function' ? $$props.class(slotProps) : $$restProps.class

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
  class={_class}
>
  <slot />
</svelte:component>
