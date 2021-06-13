import Description from '../description/Description.svelte'
import RadioGroup from './RadioGroup.svelte'
import RadioOption from './RadioOption.svelte'
import Label from '../label/Label.svelte'

// @ts-ignore
RadioGroup.Description = Description
// @ts-ignore
RadioGroup.Label = Label
// @ts-ignore
RadioGroup.Option = RadioOption

export { RadioGroup }
