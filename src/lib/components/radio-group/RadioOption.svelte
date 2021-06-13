<script>
  import { createEventForwarder } from '../../internal/create-event-forwarder'
  import { useFlags } from '../../internal/use-flags'
  import { useId } from '../../internal/use-id'
  import DescriptionProvider from '../description/DescriptionProvider.svelte'
  import LabelProvider from '../label/LabelProvider.svelte'
  import Render from '../render/Render.svelte'
  import { getGroupContext } from './RadioGroup.svelte'

  // todo: when we can use lang=ts, use enum
  const OptionState = {
    Empty: 1 << 0,
    Active: 1 << 1
  }

  const forwardEvent = createEventForwarder()
  const groupContext = getGroupContext()
  const idStore = useId()

  // ---

  export let as = 'div'

  export let value

  export let disabled = false
  // ---

  let element
  let { addFlag, removeFlag, hasFlag } = useFlags(OptionState.Empty)

  $: id = `headlessui-radiogroup-option-${$idStore}`
  $: props = { value, disabled }

  function register({ id, element, props }) {
    $groupContext.registerOption({ id, element, props })
  }

  $: register({ id, element, props })

  $: radioGroupValue = $groupContext.value
  $: radioGroupDisabled = $groupContext.disabled
  $: checked = radioGroupValue === value
  $: isFirstOption = $groupContext.firstOption?.id === id
  $: isDisabled = radioGroupDisabled || disabled

  $: tabIndex = (() => {
    if (isDisabled) return -1
    if (checked) return 0
    if (!$groupContext.containsCheckedOption && isFirstOption) return 0
    return -1
  })()

  // --

  function handleClick(ev) {
    if (!$groupContext.change(value)) return

    addFlag(OptionState.Active)
    element?.focus()
    forwardEvent('click', ev)
  }

  function handleFocus(ev) {
    addFlag(OptionState.Active)
    forwardEvent('focus', ev)
  }

  function handleBlur(ev) {
    removeFlag(OptionState.Active)
    forwardEvent('blur', ev)
  }

  $: slotProps = {
    checked,
    disabled: isDisabled,
    active: hasFlag(OptionState.Active)
  }

  $: console.log(slotProps)

</script>

<DescriptionProvider name="RadioGroup.Description" let:describedby>
  <LabelProvider name="RadioGroup.Label" let:labelledby>
    <Render
      bind:el={element}
      {as}
      {id}
      name="RadioGroup.Option"
      role="radio"
      aria-labelledby={labelledby}
      aria-describedby={describedby}
      aria-checked={checked ? 'true' : 'false'}
      {tabIndex}
      on:click={isDisabled ? undefined : handleClick}
      on:focus={isDisabled ? undefined : handleFocus}
      on:blur={isDisabled ? undefined : handleBlur}
      {slotProps}
      {...$$restProps}
    >
      <slot {...slotProps} />
    </Render>
  </LabelProvider>
</DescriptionProvider>
