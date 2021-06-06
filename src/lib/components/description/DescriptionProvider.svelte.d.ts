import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  name?: string
  props?: Record<string, any>
}

interface Events extends Record<string, any> {}

interface Slots {
  default: {
    describedby?: string
  }
}

export interface DescriptionContext {
  register: (value: string) => void
  describedby?: string
  name?: string
  props?: Record<string, any>
}

export function getDescriptionContext(): Writable<DescriptionContext>

export default class DescriptionProvider extends SvelteComponentTyped<Props, Events, Slots> {}
