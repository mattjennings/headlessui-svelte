/// <reference types="svelte2tsx/svelte-jsx" />
import { SvelteComponentTyped } from 'svelte'

interface Props<As extends keyof HTMLElementTagNameMap = 'div'>
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap[As]> {
  as?: As
  checked?: boolean
}

export default class Switch extends SvelteComponentTyped<
  Props,
  {
    click: WindowEventMap['click']
    focus: WindowEventMap['focus']
    blur: WindowEventMap['blur']
    keypress: WindowEventMap['keypress']
    keydown: WindowEventMap['keydown']
    keyup: WindowEventMap['keyup']
    change: (ev: CustomEvent<boolean>) => void
  },
  {
    default: {
      checked?: boolean
      active?: boolean
      disabled?: boolean
    }
  }
> {}
