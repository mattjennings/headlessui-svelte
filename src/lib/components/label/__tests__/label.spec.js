import { render } from '@testing-library/svelte'

import NoLabel from './NoLabel.test.svelte'
import SingleLabel from './SingleLabel.test.svelte'
import MultipleLabels from './MultipleLabels.test.svelte'

jest.mock('../../../internal/useId')
// there seems to be an extra wrapping div in these tests from the slot in LabelProvider,
// but doesnt happen on actual usage.
// not sure who's to blame - me? svelte-jester? jsdom? testing-library?

test('should be possible to use a LabelProvider without using a Label', () => {
  const { container } = render(NoLabel)

  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
      <div>
        No Label
      </div>
  `)
})

test('should be possible to use a LabelProvider and a single Label, and have them linked', () => {
  const { container } = render(SingleLabel)

  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
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

  expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
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

// it('should be possible to use a LabelProvider and multiple Label components, and have them linked', async () => {
//   function Component(props: { children: ReactNode }) {
//     let [labelledby, LabelProvider] = useLabels()

//     return (
//       <LabelProvider>
//         <div aria-labelledby={labelledby}>{props.children}</div>
//       </LabelProvider>
//     )
//   }

//   function Example() {
//     return (
//       <Component>
//         <Label>I am a label</Label>
//         <span>Contents</span>
//         <Label>I am also a label</Label>
//       </Component>
//     )
//   }

//   let { container } = render(<Example />)
//   expect(container.firstChild).toMatchInlineSnapshot(`
//     <div
//       aria-labelledby="headlessui-label-1 headlessui-label-2"
//     >
//       <label
//         id="headlessui-label-1"
//       >
//         I am a label
//       </label>
//       <span>
//         Contents
//       </span>
//       <label
//         id="headlessui-label-2"
//       >
//         I am also a label
//       </label>
//     </div>
//   `)
// })
