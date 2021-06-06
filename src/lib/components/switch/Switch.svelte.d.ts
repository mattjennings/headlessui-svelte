import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  checked?: boolean
}

export default class Component extends SvelteComponentTyped<Props> {}
