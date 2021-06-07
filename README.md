# headlessui-svelte

Unofficial [Headless UI](https://headlessui.dev) Svelte components. Very much a work in progress, use with caution.

```
npm install @mattjennings/headlessui-svelte
```

## Usage

See [TODO](#TODO) for which components are available.

The goal is to keep the API as close to `@headlessui/react` as possible.

```html
<script>
  import { Switch } from "@mattjennings/headlessui-svelte";

  let enabled = false;
</script>

<Switch.Group>
  <div class="flex items-center">
    <Switch.Label class="mr-4">Enable notifications</Switch.Label>
    <Switch
      bind:checked={enabled}
      class={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
      <span
        class={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </Switch>
  </div>
</Switch.Group>
```

For comparison, this is the `@headlessui/react` version:

```jsx
import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function CustomLabelExample() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">Enable notifications</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
```

## Typescript

Typescript support is partial right now. While headlessui-specific props will be typed, they won't have types for inherited HTML attributes or events. I would like to use an existing types package to do those, but I haven't found one for Svelte yet.

## Caveats

### Event forwarding

Until the [on:\* syntax](https://github.com/sveltejs/svelte/issues/2837) is supported in Svelte, each internal component will need to explicitly forward every possible event so that they can be used. It would be nice to automate this somehow or find some workaround.

### Dynamic elements

Until [dynamic elements](https://github.com/sveltejs/svelte/issues/2324) are supported in Svelte, I'm using a modified internal version of [svelte-elements](https://github.com/timhall/svelte-elements) to support the `as` prop.

## TODO

### Components

- [x] Switch
- [ ] Menu
- [ ] Listbox
- [ ] Disclosure
- [ ] Dialog
- [ ] Popover
- [ ] Radio Group
- [ ] Transition
