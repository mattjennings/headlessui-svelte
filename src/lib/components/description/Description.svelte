<script>
  import { createEventForwarder } from '../../internal/create-event-forwarder'
  import Render from '../render/Render.svelte'
  import { useId } from '../../internal/use-id'
  import { getDescriptionContext } from './DescriptionProvider.svelte'

  export let as = 'p'

  const context = getDescriptionContext()
  const forwardEvent = createEventForwarder()

  if (!context) {
    let err = new Error(
      'You used a <Description /> component, but it is not inside a relevant parent.'
    )
    throw err
  }

  const idStore = useId()

  const id = `headlessui-description-${$idStore}`

  $context.register(id)

</script>

<!-- svelte-ignore a11y-description-has-associated-control -->
<Render
  {as}
  {id}
  on:click
  on:focus
  on:blur
  on:keypress
  on:keydown
  on:keyup
  {...$$restProps}
  on:click={(ev) => {
    $context.props?.onClick(ev)
    forwardEvent('click', ev)
  }}><slot /></Render
>
