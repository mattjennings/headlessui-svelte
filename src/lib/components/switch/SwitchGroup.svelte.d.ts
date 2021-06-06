import { SvelteComponentTyped } from 'svelte'
import { Writable } from 'svelte/store'

type Props = Record<string, any>
export interface SwitchGroupContext {
  switch: HTMLButtonElement | null
}

export function getGroupContext(): Writable<SwitchGroupContext>

export default class Component extends SvelteComponentTyped<Props> {}
