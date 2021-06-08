import { render } from '@testing-library/svelte'
// @ts-ignore
import whitespace from 'dom-whitespace'
import {
  assertActiveElement,
  assertSwitch,
  getSwitch,
  getSwitchLabel,
  SwitchState
} from 'src/test-utils/accessibility-assertions'
import { click, Keys, press } from 'src/test-utils/interactions'

import { Switch } from '../index'
import ContentsAsLabel from './ContentsAsLabel.test.svelte'
import SwitchGroup from './SwitchGroup.test.svelte'
import SwitchAndButton from './SwitchAndButton.test.svelte'

jest.mock('src/lib/internal/use-id')
jest.mock('src/lib/components/elements')

describe('Safe guards', () => {
  it('should be possible to render a Switch without crashing', () => {
    render(Switch, { checked: false })
  })
})

describe('Rendering', () => {
  it('should be possible to render an (on) Switch using an `as` prop', () => {
    render(Switch, { as: 'span', checked: true })
    assertSwitch({ state: SwitchState.On, tag: 'span' })
  })

  it('should be possible to render an (off) Switch using an `as` prop', () => {
    render(Switch, { as: 'span', checked: false })
    assertSwitch({ state: SwitchState.Off, tag: 'span' })
  })

  it('should be possible to use the switch contents as the label', () => {
    render(ContentsAsLabel)
    assertSwitch({ state: SwitchState.Off, label: 'Enable notifications' })
  })

  describe('Render composition', () => {
    it('should be possible to render a Switch.Group, Switch and Switch.Label', () => {
      render(SwitchGroup, {
        labelAfter: 'Enable notifications'
      })
      assertSwitch({ state: SwitchState.Off, label: 'Enable notifications' })
    })

    it('should be possible to render a Switch.Group, Switch and Switch.Label (before the Switch)', () => {
      render(SwitchGroup, {
        labelBefore: 'Label B',
        switchContents: 'Label A'
      })
      // Warning! Using aria-label or aria-labelledby will hide any descendant content from assistive
      // technologies.
      //
      // Thus: Label A should not be part of the "label" in this case
      assertSwitch({ state: SwitchState.Off, label: 'Label B' })
    })

    it('should be possible to render a Switch.Group, Switch and Switch.Label (after the Switch)', () => {
      render(SwitchGroup, {
        labelAfter: 'Label B',
        switchContents: 'Label A'
      })
      // Warning! Using aria-label or aria-labelledby will hide any descendant content from assistive
      // technologies.
      //
      // Thus: Label A should not be part of the "label" in this case
      assertSwitch({ state: SwitchState.Off, label: 'Label B' })
    })

    it('should be possible to render a Switch.Group, Switch and Switch.Description (before the Switch)', async () => {
      render(SwitchGroup, {
        descriptionBefore: 'This is an important feature'
      })
      assertSwitch({ state: SwitchState.Off, description: 'This is an important feature' })
    })

    it('should be possible to render a Switch.Group, Switch and Switch.Description (after the Switch)', () => {
      render(SwitchGroup, {
        descriptionAfter: 'This is an important feature'
      })
      assertSwitch({ state: SwitchState.Off, description: 'This is an important feature' })
    })

    it('should be possible to render a Switch.Group, Switch, Switch.Label and Switch.Description', () => {
      render(SwitchGroup, {
        labelBefore: 'Label A',
        descriptionBefore: 'This is an important feature'
      })
      assertSwitch({
        state: SwitchState.Off,
        label: 'Label A',
        description: 'This is an important feature'
      })
    })
  })

  describe('Keyboard interactions', () => {
    describe('`Space` key', () => {
      it('should be possible to toggle the Switch with Space', async () => {
        render(SwitchGroup)
        // Ensure checkbox is off
        assertSwitch({ state: SwitchState.Off })
        // Focus the switch
        getSwitch()?.focus()
        // Toggle
        await press(Keys.Space)
        // Ensure state is on
        assertSwitch({ state: SwitchState.On })
        // Toggle
        await press(Keys.Space)
        // Ensure state is off
        assertSwitch({ state: SwitchState.Off })
      })
    })
  })

  describe('`Enter` key', () => {
    it('should not be possible to use Enter to toggle the Switch', async () => {
      const { component } = render(SwitchGroup)
      listen(component, 'change')

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off })
      // Focus the switch
      getSwitch()?.focus()
      // Try to toggle
      await press(Keys.Enter)

      expect(component).not.toHaveFiredEvent('change')
    })
  })

  describe('`Tab` key', () => {
    it('should be possible to tab away from the Switch', async () => {
      render(SwitchAndButton)

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off })
      // Focus the switch
      getSwitch()?.focus()
      // Expect the switch to be active
      assertActiveElement(getSwitch())
      // Toggle
      await press(Keys.Tab)
      // Expect the button to be active
      assertActiveElement(document.getElementById('btn'))
    })
  })

  describe('Mouse interactions', () => {
    it('should be possible to toggle the Switch with a click', async () => {
      render(SwitchGroup)
      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off })
      // Toggle
      await click(getSwitch())
      // Ensure state is on
      assertSwitch({ state: SwitchState.On })
      // Toggle
      await click(getSwitch())
      // Ensure state is off
      assertSwitch({ state: SwitchState.Off })
    })

    it('should be possible to toggle the Switch with a click on the Label', async () => {
      render(SwitchGroup, {
        labelAfter: 'the label'
      })

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off })
      // Toggle
      await click(getSwitchLabel())
      // Ensure the switch is focused
      assertActiveElement(getSwitch())
      // Ensure state is on
      assertSwitch({ state: SwitchState.On })
      // Toggle
      await click(getSwitchLabel())
      // Ensure the switch is focused
      assertActiveElement(getSwitch())
      // Ensure state is off
      assertSwitch({ state: SwitchState.Off })
    })

    it('should not be possible to toggle the Switch with a click on the Label (passive)', async () => {
      render(SwitchGroup, {
        labelAfter: 'the label',
        passive: true
      })
      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off })
      // Toggle
      await click(getSwitchLabel())
      // Ensure state is still off
      assertSwitch({ state: SwitchState.Off })
    })
  })
})
