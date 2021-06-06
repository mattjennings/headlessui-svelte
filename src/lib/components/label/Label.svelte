<script>
  import { createEventForwarder } from '$lib/internal/create-event-forwarder'

  import { useId } from '../../internal/use-id'
  import { getLabelContext } from './LabelProvider.svelte'

  export let passive = false

  const context = getLabelContext()
  const forwarder = createEventForwarder()

  if (context === null) {
    let err = new Error('You used a <Label /> component, but it is not inside a relevant parent.')
    throw err
  }

  const idStore = useId()

  const id = `headlessui-label-${$idStore}`

  $context.register(id)

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  {id}
  {...$$restProps}
  on:click={(ev) => {
    if (!passive) {
      $context.props?.onClick?.(ev)
    }
    forwarder(ev)
  }}><slot /></label
>
