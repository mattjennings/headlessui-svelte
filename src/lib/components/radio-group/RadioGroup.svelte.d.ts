import { SvelteComponentTyped } from 'svelte'
import { Writable } from 'svelte/store'

type Props = Record<string, any>

interface Option {
  id: string
  element: HTMLElement | null
  props: { value: unknown; disabled: boolean }
}

export interface RadioGroupContext {
  registerOption(option: Option): () => void
  change(value: unknown): boolean
  value: unknown
  firstOption?: Option
  containsCheckedOption: boolean
  disabled: boolean
}

export function getGroupContext(): Writable<RadioGroupContext>

export default class RadioGroup extends SvelteComponentTyped<Props> {}
