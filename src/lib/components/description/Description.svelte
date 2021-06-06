<script>
  import { createEventForwarder } from '$lib/internal/create-event-forwarder'

  import { useId } from '../../internal/use-id'
  import { getDescriptionContext } from './DescriptionProvider.svelte'

  const context = getDescriptionContext()
  const forwarder = createEventForwarder()

  if (context === null) {
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
<p
  {id}
  {...$$restProps}
  on:click={(ev) => {
    $context.props?.onClick(ev)
    forwarder(ev)
  }}
>
  <slot />
</p>
