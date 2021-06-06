<script>
  import { useId } from '../../internal/useId'
  import { getLabelContext } from './LabelProvider.svelte'

  const context = getLabelContext()

  const idStore = useId()

  const id = `headlessui-label-${$idStore}`

  $context.register(id)

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {id} {...$$restProps}><slot /></label>
