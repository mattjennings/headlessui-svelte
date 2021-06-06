<script>
  import { useId } from '../../internal/use-id'
  import { getLabelContext } from './LabelProvider.svelte'

  const context = getLabelContext()

  if (context === null) {
    let err = new Error('You used a <Label /> component, but it is not inside a relevant parent.')
    throw err
  }

  const idStore = useId()

  const id = `headlessui-label-${$idStore}`

  $context.register(id)

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {id} {...$$restProps}><slot /></label>
