<script>
  import { createEventForwarder } from '$lib/internal/createEventForwarder'

  import { getContext, createEventDispatcher } from 'svelte'

  /**
   * @event {EventDetail} change
   */
  const dispatch = createEventDispatcher()
  const forwardEvent = createEventForwarder()
  const groupContext = getContext('headlessui-switch')

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

</script>

<button
  role="switch"
  tabIndex={0}
  aria-checked={checked}
  aria-labelledby={groupContext?.labelledby}
  aria-describedby={groupContext?.describedby}
  on:click={handleClick}
  on:keyup={handleKeyUp}
  on:keypress={handleKeyPress}
  {...$$restProps}
>
  <slot />
</button>
