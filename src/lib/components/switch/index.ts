import Description from '../description/Description.svelte'
import SwitchGroup from './SwitchGroup.svelte'
import Label from '../label/Label.svelte'
import Switch from './Switch.svelte'

// @ts-ignore
Switch.Group = SwitchGroup
// @ts-ignore
Switch.Description = Description
// @ts-ignore
Switch.Label = Label

export { Switch }
