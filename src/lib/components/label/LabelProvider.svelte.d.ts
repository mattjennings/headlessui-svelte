import { SvelteComponentTyped } from 'svelte'
import { Writable } from 'svelte/store'
interface Props extends Record<string, any> {
  name?: string
  props?: Record<string, any>
}

interface Events extends Record<string, any> {}

interface Slots {
  default: {
    labelledby?: string
  }
}

export interface LabelContext {
  register: (value: string) => void
  labelledby?: string
  name?: string
  props?: Record<string, any>
}

export function getLabelContext(): Writable<LabelContext>

export default class Component extends SvelteComponentTyped<Props, Events, Slots> {}
