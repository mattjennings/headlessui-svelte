<script context="module">
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export const DESCRIPTION_CONTEXT_KEY = 'headlessui-description'

  /**
   * @returns {import('./DescriptionProvider.svelte').DescriptionContext}
   */
  export function getDescriptionContext() {
    return getContext(DESCRIPTION_CONTEXT_KEY)
  }

</script>

<script>
  export let name = undefined
  export let props = {}

  let descriptionIds = []

  function register(id) {
    let clone = descriptionIds.slice()
    let idx = clone.indexOf(id)

    if (idx !== -1) {
      descriptionIds = [...clone.splice(idx, 1), id]
    } else {
      descriptionIds = [...descriptionIds, id]
    }
  }

  const context = writable({
    name,
    props,
    register
  })

  setContext(DESCRIPTION_CONTEXT_KEY, context)

  $: context.update((prev) => ({
    ...prev,
    name,
    props,
    describedby: descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined
  }))

</script>

<slot describedby={$context.describedby} />
