import { detach, insert, noop } from 'svelte/internal'

export function createSlots(slots) {
  const svelteSlots = {}

  for (const slotName in slots) {
    svelteSlots[slotName] = [createSlotFn(slots[slotName])]
  }

  function createSlotFn(element) {
    return function () {
      return {
        c: noop,

        m: function mount(target, anchor) {
          insert(target, element, anchor)
        },

        d: function destroy(detaching) {
          if (detaching) {
            detach(element)
          }
        },

        l: noop
      }
    }
  }
  return svelteSlots
}
