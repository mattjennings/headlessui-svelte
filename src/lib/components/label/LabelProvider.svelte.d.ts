import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  name?: string
}

interface Events extends Record<string, any> {}

interface Slots {
  labbelledby: string
}

export interface LabelContext {
  register: (value: string) => void
  name?: string
  props?: Record<string, any>
}

export default class Component extends SvelteComponentTyped<Props, Events, Slots> {}
