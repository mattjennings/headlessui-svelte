import { writable, get } from 'svelte/store'

export function useFlags(initialFlags = 0) {
  const flags = writable(initialFlags)

  return {
    addFlag(flag: number) {
      flags.update((flags) => flags | flag)
    },
    hasFlag(flag: number) {
      return Boolean(get(flags) & flag)
    },
    removeFlag(flag: number) {
      flags.update((flags) => flags & ~flag)
    },
    toggleFlag(flag: number) {
      flags.update((flags) => flags ^ flag)
    }
  }
}
