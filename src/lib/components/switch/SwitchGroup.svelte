<script context="module">
  import { getContext } from 'svelte'

  export const SWITCH_GROUP_CONTEXT_KEY = 'headlessui-switch-group'

  /**
   * @returns {import('./SwitchGroup.svelte').SwitchGroupContext}
   */
  export function getGroupContext() {
    return getContext(SWITCH_GROUP_CONTEXT_KEY)
  }

</script>

<script>
  const context = getGroupContext()

</script>
