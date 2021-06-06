import { render } from '@testing-library/svelte'
import whitespace from 'dom-whitespace'

import NoDescription from './NoDescription.test.svelte'
import SingleDescription from './SingleDescription.test.svelte'
import MultipleDescriptions from './MultipleDescriptions.test.svelte'

jest.mock('../../../internal/use-id')
jest.mock('../../elements')

// there seems to be an extra wrapping div in these tests from the slot in DescriptionProvider,
// yet not in actual usage. so we need to drill down to container.firstChild.firstChild for assertions
// not sure who's to blame - me? svelte-jester? jsdom? testing-library?

test('should be possible to use a DescriptionProvider without using a Description', () => {
  const { container } = render(NoDescription)

  whitespace.remove(window.document)
  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
      <div>
        No Description
      </div>
  `)
})

test('should be possible to use a DescriptionProvider and a single Description, and have them linked', () => {
  const { container } = render(SingleDescription)

  whitespace.remove(window.document)
  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
      <div
        aria-describedby="headlessui-description-1"
      >
        <p
          id="headlessui-description-1"
        >
          I am a description
        </p>
        <span>
          Contents
        </span>
      </div>
  `)
})

test('should be possible to use a DescriptionProvider and multiple Description components, and have them linked', () => {
  const { container } = render(MultipleDescriptions)

  whitespace.remove(window.document)
  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
    <div
      aria-describedby="headlessui-description-1 headlessui-description-2"
    >
      <p
        id="headlessui-description-1"
      >
        I am a description
      </p>
      <span>
        Contents
      </span>
      <p
        id="headlessui-description-2"
      >
        I am also a description
      </p>
    </div>
  `)
})
