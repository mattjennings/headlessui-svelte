import { detach, insert, noop } from 'svelte/internal'

// todo: type if this ever gets used

export function createSlots(slots: any) {
  const svelteSlots: any = {}

  for (const slotName in slots) {
    svelteSlots[slotName] = [createSlotFn(slots[slotName])]
  }

  function createSlotFn(element: any) {
    return function () {
      return {
        c: noop,

        m: function mount(target: any, anchor: any) {
          insert(target, element, anchor)
        },

        d: function destroy(detaching: any) {
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
