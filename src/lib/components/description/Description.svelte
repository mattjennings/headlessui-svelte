<script>
  import { useId } from '../../internal/useId'
  import { getDescriptionContext } from './DescriptionProvider.svelte'

  const context = getDescriptionContext()

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
<p {id} {...$$restProps}><slot /></p>
