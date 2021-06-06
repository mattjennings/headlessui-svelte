<script context="module">
  import DescriptionProvider from '../description/DescriptionProvider.svelte'
  import LabelProvider from '../label/LabelProvider.svelte'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export const SWITCH_GROUP_CONTEXT_KEY = 'headlessui-switch-group'

  /**
   * @returns {import('./SwitchGroup.svelte').SwitchGroupContext}
   */
  export function getGroupContext() {
    return getContext(SWITCH_GROUP_CONTEXT_KEY)
  }

</script>

<script>
  const context = writable({})
  setContext(SWITCH_GROUP_CONTEXT_KEY, context)

</script>

<DescriptionProvider name="Switch.Description">
  <LabelProvider
    name="Switch.Label"
    props={{
      onClick() {
        if (!$context.switch) return
        $context.switch.click()
        $context.switch.focus({ preventScroll: true })
      }
    }}
  >
    <slot />
  </LabelProvider>
</DescriptionProvider>
