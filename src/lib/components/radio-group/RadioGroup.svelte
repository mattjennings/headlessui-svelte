<script context="module">
  import { getContext } from 'svelte'

  export const RADIO_GROUP_CONTEXT_KEY = 'headlessui-radio-group'

  /**
   * @returns {import('svelte/store').Writable<import('./RadioGroup.svelte').RadioGroupContext>}
   */
  export function getGroupContext() {
    const ctx = getContext(RADIO_GROUP_CONTEXT_KEY)

    if (!ctx) {
      throw new Error(`Component is missing a parent <RadioGroup /> component`)
    }

    return ctx
  }

</script>

<script>
  import DescriptionProvider from '../description/DescriptionProvider.svelte'
  import LabelProvider from '../label/LabelProvider.svelte'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import Render from '../render/Render.svelte'
  import { useId } from '../../internal/use-id'
  import { createEventDispatcher } from 'svelte'
  import { Keys } from '../keyboard'
  import { useTreeWalker } from '../../internal/use-tree-walker'
  import { focusIn, Focus, FocusResult } from '../../utils/focus-management'
  import { createEventForwarder } from '../../internal/create-event-forwarder'

  /**
   * @typedef Option
   * @property {string} id
   * @property { HTMLElement | null} element
   * @property {{ value: unknown; disabled: boolean }} propsRef:
   */

  /**
   * @type {string}
   */
  export let as = 'div'

  export let value

  export let disabled = false

  // ---

  let element

  const dispatch = createEventDispatcher()
  const forwardEvent = createEventForwarder()

  const idStore = useId()
  $: id = `headlessui-radiogroup-${$idStore}`

  /**
   * @type {Option[]}
   */
  let options = []

  $: firstOption = options.find((option) => {
    if (option.props.disabled) return false
    return true
  })

  $: containsCheckedOption = options.some((option) => option.props.value === value)

  $: useTreeWalker({
    container: element,
    accept(node) {
      if (node.getAttribute('role') === 'radio') return NodeFilter.FILTER_REJECT
      if (node.hasAttribute('role')) return NodeFilter.FILTER_SKIP
      return NodeFilter.FILTER_ACCEPT
    },
    walk(node) {
      node.setAttribute('role', 'none')
    }
  })

  // ---

  /**
   * @param {Option} option
   */
  function registerOption(option) {
    unregisterOption(option.id)
    options = [...options, { id: option.id, element: option.element, props: option.props }]
  }

  /**
   * @param {string} id
   */
  function unregisterOption(id) {
    let clone = options.slice()
    let idx = options.findIndex((radio) => radio.id === id)

    if (idx > -1) {
      options = clone.splice(idx, 1)
    }
  }

  function triggerChange(nextValue) {
    if (disabled) return false
    if (nextValue === value) return false
    let nextOption = options.find((option) => option.props.value === nextValue)?.props
    if (nextOption?.disabled) return false

    value = nextValue
    dispatch('change', nextValue)
    return true
  }

  /**
   * @param {KeyboardEvent}
   */
  function handleKeyDown(event) {
    let container = element
    if (!container) return

    let all = options
      .filter((option) => option.props.disabled === false)
      .map((radio) => radio.element)

    switch (event.key) {
      case Keys.ArrowLeft:
      case Keys.ArrowUp:
        {
          event.preventDefault()
          event.stopPropagation()

          let result = focusIn(all, Focus.Previous | Focus.WrapAround)

          if (result === FocusResult.Success) {
            let activeOption = options.find((option) => option.element === document.activeElement)
            if (activeOption) triggerChange(activeOption.props.value)
          }
        }
        break

      case Keys.ArrowRight:
      case Keys.ArrowDown:
        {
          event.preventDefault()
          event.stopPropagation()

          let result = focusIn(all, Focus.Next | Focus.WrapAround)

          if (result === FocusResult.Success) {
            let activeOption = options.find((option) => option.element === document.activeElement)
            if (activeOption) triggerChange(activeOption.props.value)
          }
        }
        break

      case Keys.Space:
        {
          event.preventDefault()
          event.stopPropagation()

          let activeOption = options.find((option) => option.element === document.activeElement)
          if (activeOption) triggerChange(activeOption.props.value)
        }
        break
    }

    forwardEvent('keydown', event)
  }
  // ---

  // ---

  /**
   * @type {import('svelte/store').Writable<import('./RadioGroup.svelte').RadioGroupContext>}
   */
  const context = writable({
    registerOption,
    firstOption,
    containsCheckedOption,
    change: triggerChange,
    disabled,
    value
  })
  setContext(RADIO_GROUP_CONTEXT_KEY, context)

  $: context.set({
    registerOption,
    firstOption,
    containsCheckedOption,
    change: triggerChange,
    disabled,
    value
  })

</script>

<DescriptionProvider name="RadioGroup.Description" let:describedby>
  <LabelProvider name="RadioGroup.Label" let:labelledby>
    <Render
      bind:el={element}
      {as}
      {id}
      name="RadioGroup"
      role="radiogroup"
      aria-labelledby={labelledby}
      aria-describedby={describedby}
      on:keydown={handleKeyDown}
      {...$$restProps}
    >
      <slot />
    </Render>
  </LabelProvider>
</DescriptionProvider>
