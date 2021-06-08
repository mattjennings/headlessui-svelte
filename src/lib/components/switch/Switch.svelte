<script>
  import { createEventForwarder } from '../../internal/create-event-forwarder'
  import Render from '../render/Render.svelte'
  import { createEventDispatcher } from 'svelte'
  import { getDescriptionContext } from '../description/DescriptionProvider.svelte'
  import { getLabelContext } from '../label/LabelProvider.svelte'
  import { getGroupContext } from './SwitchGroup.svelte'
  import { useId } from '../../internal/use-id'
  import { Keys } from '../keyboard'

  let element

  const dispatch = createEventDispatcher()
  const forwardEvent = createEventForwarder()
  const groupContext = getGroupContext()
  const labelContext = getLabelContext()
  const descriptionContext = getDescriptionContext()
  const idStore = useId()

  const id = `headlessui-description-${$idStore}`
  // ---

  /**
   * @type {boolean}
   */
  export let checked

  // ---

  function toggle() {
    checked = !checked
  }

  function handleClick(event) {
    event.preventDefault()
    toggle()
    forwardEvent('click', event)
  }

  function handleKeyUp(event) {
    if (event.key !== Keys.Tab) event.preventDefault()
    if (event.key === Keys.Space) toggle()
    forwardEvent('keyup', event)
  }

  // This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.
  function handleKeyPress(event) {
    event.preventDefault()
    forwardEvent('keypress', event)
  }

  // ---

  $: dispatch('change', checked)
  $: registerElement(element)

  function registerElement(element) {
    groupContext?.update((prev) => ({ ...prev, switch: element }))
  }

</script>

<Render
  {id}
  as="button"
  bind:el={element}
  role="switch"
  tabIndex={0}
  aria-checked={checked}
  aria-labelledby={$labelContext?.labelledby}
  aria-describedby={$descriptionContext?.describedby}
  on:click={handleClick}
  on:keyup={handleKeyUp}
  on:keypress={handleKeyPress}
  on:keydown
  on:focus
  on:blur
  {...$$restProps}
>
  <slot />
</Render>
