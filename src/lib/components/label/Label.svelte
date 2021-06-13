<script>
  import Render from '../render/Render.svelte'
  import { createEventForwarder } from '../../internal/create-event-forwarder'
  import { useId } from '../../internal/use-id'
  import { getLabelContext } from './LabelProvider.svelte'

  export let as = 'label'
  export let passive = false

  const context = getLabelContext()
  const forwardEvent = createEventForwarder()

  if (!context) {
    let err = new Error('You used a <Label /> component, but it is not inside a relevant parent.')
    throw err
  }

  const idStore = useId()

  $: id = `headlessui-label-${$idStore}`

  $context.register(id)

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Render
  {id}
  {as}
  name={$context.name}
  on:click
  on:focus
  on:blur
  on:keypress
  on:keydown
  on:keyup
  {...$$restProps}
  on:click={(ev) => {
    if (!passive) {
      $context.props?.onClick?.(ev)
    }
    forwardEvent('click', ev)
  }}
>
  <slot />
</Render>
