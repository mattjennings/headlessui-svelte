import { get_current_component } from 'svelte/internal'

/**
 * Returns a function that forwards the native event through a dispatch
 */
export function createEventForwarder() {
  const component = get_current_component()
  return (type: string, event: Event) => {
    const callbacks = component.$$.callbacks[type]
    if (callbacks) {
      callbacks.slice().forEach((fn: (event: Event) => void) => {
        fn.call(component, event)
      })
    }
  }
}
