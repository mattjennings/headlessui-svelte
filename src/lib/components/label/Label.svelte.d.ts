import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  as?: string
  passive?: boolean
}

export default class Label extends SvelteComponentTyped<Props> {}
