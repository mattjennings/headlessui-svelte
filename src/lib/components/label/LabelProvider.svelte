<script context="module">
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export const LABEL_CONTEXT_KEY = 'headlessui-label'

  /**
   * @returns {import('./LabelProvider.svelte').LabelContext}
   */
  export function getLabelContext() {
    return getContext(LABEL_CONTEXT_KEY)
  }

</script>

<script>
  export let name = undefined
  export let props = {}

  let labelIds = []

  function register(id) {
    let clone = labelIds.slice()
    let idx = clone.indexOf(id)

    if (idx !== -1) {
      labelIds = [...clone.splice(idx, 1), id]
    } else {
      labelIds = [...labelIds, id]
    }
  }

  const context = writable({
    name,
    props,
    register
  })

  setContext(LABEL_CONTEXT_KEY, context)

  $: context.update((prev) => ({
    ...prev,
    name,
    props,
    labelledby: labelIds.length > 0 ? labelIds.join(' ') : undefined
  }))

</script>

<slot labelledby={$context.labelledby} />
