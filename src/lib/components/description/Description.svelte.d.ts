import { SvelteComponentTyped } from 'svelte'

interface Props extends Record<string, any> {
  as?: string
}

export default class Description extends SvelteComponentTyped<Props> {}
