import '@testing-library/jest-dom/extend-expect'
import 'jest-svelte-events/extend-expect'
import type { SvelteComponent } from 'svelte/internal'

// Assuming requestAnimationFrame is roughly 60 frames per second
let frame = 1000 / 60
let amountOfFrames = 2

let formatter = new Intl.NumberFormat('en')

expect.extend({
  toBeWithinRenderFrame(actual, expected) {
    let min = expected - frame * amountOfFrames
    let max = expected + frame * amountOfFrames

    let pass = actual >= min && actual <= max

    return {
      message: pass
        ? () => {
            return `expected ${actual} not to be within range of a frame ${formatter.format(
              min
            )} - ${formatter.format(max)}`
          }
        : () => {
            return `expected ${actual} not to be within range of a frame ${formatter.format(
              min
            )} - ${formatter.format(max)}`
          },
      pass
    }
  }
})

// types in 'jest-svelte-events/extend-expect' don't automatically work...
// have to copy & paste them into a global declaration
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveFiredEvent(event: string): R
      toHaveFiredEvents(events: string[]): R
      toHaveFiredEventsInOrder(events: string[]): R
      toHaveFiredEventTimes(event: string, times: number): R
      toHaveFiredEventWith(event: string, payload: any): R
      toHaveFiredLastEventWith(payload: any): R
      toHaveFiredNthEventWith(n: number, payload: any): R
    }
  }

  const listen: (component: SvelteComponent, event: string | string[]) => any
}
