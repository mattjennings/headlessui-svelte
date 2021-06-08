<script>
  import { Switch } from '../index'

  export let checked = false
  export let labelBefore = undefined
  export let labelAfter = undefined
  export let descriptionBefore = undefined
  export let descriptionAfter = undefined

  export let switchContents = undefined
  export let passive = false

</script>

<Switch.Group>
  {#if descriptionBefore}
    <Switch.Description>{descriptionBefore}</Switch.Description>
  {/if}
  {#if labelBefore}
    <Switch.Label {passive}>{labelBefore}</Switch.Label>
  {/if}
  <Switch bind:checked>{switchContents}</Switch>
  {#if labelAfter}
    <Switch.Label {passive}>{labelAfter}</Switch.Label>
  {/if}
  {#if descriptionAfter}
    <Switch.Description>{descriptionAfter}</Switch.Description>
  {/if}
</Switch.Group>
