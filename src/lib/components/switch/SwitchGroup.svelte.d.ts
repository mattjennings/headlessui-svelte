import { SvelteComponentTyped } from 'svelte'

type Props = Record<string, any>
export interface SwitchGroupContext {
  switch: HTMLButtonElement | null
  setSwitch(element: HTMLButtonElement): void
  labelledby: string | undefined
  describedby: string | undefined
}

export default class Component extends SvelteComponentTyped<Props> {}
