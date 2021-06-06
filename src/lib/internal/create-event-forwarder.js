import { get_current_component } from 'svelte/internal'

/**
 * Returns a function that forwards the native event through a dispatch
 */
export function createEventForwarder() {
  const component = get_current_component()
  return (type, event) => {
    const callbacks = component.$$.callbacks[type]
    if (callbacks) {
      callbacks.slice().forEach((fn) => {
        fn.call(component, event)
      })
    }
  }
}
