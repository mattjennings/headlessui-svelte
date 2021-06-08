import { render } from '@testing-library/svelte'
// @ts-ignore
import whitespace from 'dom-whitespace'
import NoLabel from './NoLabel.test.svelte'
import SingleLabel from './SingleLabel.test.svelte'
import MultipleLabels from './MultipleLabels.test.svelte'

jest.mock('../../../internal/use-id')
jest.mock('../../elements')

// there seems to be an extra wrapping div in these tests from the slot in LabelProvider,
// yet not in actual usage. so we need to drill down to container.firstChild.firstChild for assertions
// not sure who's to blame - me? svelte-jester? jsdom? testing-library?

test('should be possible to use a LabelProvider without using a Label', () => {
  const { container } = render(NoLabel)

  expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
      <div>
        No Label
      </div>
  `)
})

test('should be possible to use a LabelProvider and a single Label, and have them linked', () => {
  const { container } = render(SingleLabel)

  whitespace.remove(window.document)
  expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
      <div
        aria-labelledby="headlessui-label-1"
      >
        <label
          id="headlessui-label-1"
        >
          I am a label
        </label>
        <span>
          Contents
        </span>
      </div>
  `)
})

test('should be possible to use a LabelProvider and multiple Label components, and have them linked', () => {
  const { container } = render(MultipleLabels)

  whitespace.remove(window.document)
  expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
    <div
      aria-labelledby="headlessui-label-1 headlessui-label-2"
    >
      <label
        id="headlessui-label-1"
      >
        I am a label
      </label>
      <span>
        Contents
      </span>
      <label
        id="headlessui-label-2"
      >
        I am also a label
      </label>
    </div>
  `)
})
