import 'jest-svelte-events/extend-expect'
import { render } from '@testing-library/svelte'
import Interactions from './Interactions.test.svelte'
import { type, shift, Keys } from '../interactions'

type Events = 'onKeyDown' | 'onKeyUp' | 'onKeyPress' | 'onClick' | 'onBlur' | 'onFocus'
const events: Events[] = ['onKeyDown', 'onKeyUp', 'onKeyPress', 'onClick', 'onBlur', 'onFocus']

type Args = [
  string | Partial<KeyboardEvent>,
  (string | Partial<KeyboardEvent | MouseEvent>)[],
  Set<Events>
]

function key(input: string | Partial<KeyboardEvent>): Partial<KeyboardEvent> {
  if (typeof input === 'string') return { key: input }
  return input
}

function event(
  input: string | Partial<KeyboardEvent | MouseEvent>,
  target?: string
): Partial<KeyboardEvent | MouseEvent> {
  const e = typeof input === 'string' ? { type: input } : input

  if (target) {
    Object.defineProperty(e, 'target', {
      configurable: false,
      enumerable: true,
      get() {
        return document.getElementById(target!)
      }
    })
  }

  return e
}

describe('Keyboard', () => {
  describe('type', () => {
    it.each<Args>([
      // Default - no cancellation
      ['a', ['keydown', 'keypress', 'keyup'], new Set()],
      [Keys.Space, ['keydown', 'keypress', 'keyup', 'click'], new Set()],
      [Keys.Enter, ['keydown', 'keypress', 'click', 'keyup'], new Set()],
      [
        Keys.Tab,
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'after'),
          event('keyup', 'after')
        ],
        new Set()
      ],
      [
        shift(Keys.Tab),
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'before'),
          event('keyup', 'before')
        ],
        new Set()
      ],

      // Canceling keydown
      ['a', ['keydown', 'keyup'], new Set<Events>(['onKeyDown'])],
      [Keys.Space, ['keydown', 'keyup'], new Set<Events>(['onKeyDown'])],
      [Keys.Enter, ['keydown', 'keyup'], new Set<Events>(['onKeyDown'])],
      [Keys.Tab, ['keydown', 'keyup'], new Set<Events>(['onKeyDown'])],
      [shift(Keys.Tab), ['keydown', 'keyup'], new Set<Events>(['onKeyDown'])],

      // Canceling keypress
      ['a', ['keydown', 'keypress', 'keyup'], new Set<Events>(['onKeyPress'])],
      [Keys.Space, ['keydown', 'keypress', 'keyup', 'click'], new Set<Events>(['onKeyPress'])],
      [Keys.Enter, ['keydown', 'keypress', 'keyup'], new Set<Events>(['onKeyPress'])],
      [
        Keys.Tab,
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'after'),
          event('keyup', 'after')
        ],
        new Set<Events>(['onKeyPress'])
      ],
      [
        shift(Keys.Tab),
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'before'),
          event('keyup', 'before')
        ],
        new Set<Events>(['onKeyPress'])
      ],

      // Canceling keyup
      ['a', ['keydown', 'keypress', 'keyup'], new Set<Events>(['onKeyUp'])],
      [Keys.Space, ['keydown', 'keypress', 'keyup'], new Set<Events>(['onKeyUp'])],
      [Keys.Enter, ['keydown', 'keypress', 'click', 'keyup'], new Set<Events>(['onKeyUp'])],
      [
        Keys.Tab,
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'after'),
          event('keyup', 'after')
        ],
        new Set<Events>(['onKeyUp'])
      ],
      [
        shift(Keys.Tab),
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'before'),
          event('keyup', 'before')
        ],
        new Set<Events>(['onKeyUp'])
      ],

      // Cancelling blur
      [
        Keys.Tab,
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'after'),
          event('keyup', 'after')
        ],
        new Set<Events>(['onBlur'])
      ],
      [
        shift(Keys.Tab),
        [
          event('keydown', 'trigger'),
          event('blur', 'trigger'),
          event('focus', 'before'),
          event('keyup', 'before')
        ],
        new Set<Events>(['onBlur'])
      ]
    ])('should fire the correct events %#', async (input, result, prevents) => {
      const fired: (KeyboardEvent | MouseEvent)[] = []

      const state = { readyToCapture: false }

      function createProps() {
        return events.reduce((props: any, name) => {
          props[name] = (event: any) => {
            if (!state.readyToCapture) return
            if (prevents.has(name)) event.preventDefault()
            fired.push(event)
          }
          return props
        }, {})
      }

      render(Interactions, createProps())

      const trigger = document.getElementById('trigger')
      trigger?.focus()
      state.readyToCapture = true

      await type([key(input)])

      const expected = result.map((e) => event(e))

      expect(fired.length).toEqual(result.length)

      for (const [idx, event] of fired.entries()) {
        for (const key in expected[idx]) {
          const _key = key as keyof (KeyboardEvent | MouseEvent)
          expect(event[_key]).toBe(expected[idx][_key])
        }
      }
    })
  })
})
