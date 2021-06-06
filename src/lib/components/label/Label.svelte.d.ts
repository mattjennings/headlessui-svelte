import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  passive?: boolean
}

export default class Component extends SvelteComponentTyped<Props> {}
