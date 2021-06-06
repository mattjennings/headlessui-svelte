import { onMount } from 'svelte'
import { writable, get } from 'svelte/store'

let id = 0
function generateId() {
  return ++id
}

/**
 * @return {import('svelte/store').Writable<number>}
 */
export function useId() {
  const id = writable(typeof window !== 'undefined' ? generateId() : null)

  onMount(() => {
    if (get(id) === null) {
      id.set(generateId())
    }
  })

  return id
}
