<script context="module">
  import DescriptionProvider from '../description/DescriptionProvider.svelte'
  import LabelProvider from '../label/LabelProvider.svelte'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export const SWITCH_GROUP_CONTEXT_KEY = 'headlessui-switch-group'

  /**
   * @returns {import('svelte/store').Writable<import('./SwitchGroup.svelte').SwitchGroupContext>}
   */
  export function getGroupContext() {
    return getContext(SWITCH_GROUP_CONTEXT_KEY)
  }

</script>

<script>
  /**
   * @type {import('svelte/store').Writable<import('./SwitchGroup.svelte').SwitchGroupContext>}
   */
  const context = writable({
    switch: null
  })
  setContext(SWITCH_GROUP_CONTEXT_KEY, context)

</script>

<DescriptionProvider name="Switch.Description">
  <LabelProvider
    name="Switch.Label"
    props={{
      onClick() {
        if (!$context.switch) return
        // @ts-ignore - 'This expression is not callable.' seems like a false-positive?
        $context.switch.click()
        $context.switch.focus({ preventScroll: true })
      }
    }}
  >
    <slot />
  </LabelProvider>
</DescriptionProvider>
