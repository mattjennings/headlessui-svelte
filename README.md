# This project is no longer maintained
 
Please use [@rgossiaux/svelte-headlessui](https://github.com/rgossiaux/svelte-headlessui) instead as it is a full port of Headless UI. I had only managed to complete the Switch component, but [@rgossiaux](https://github.com/rgossiaux) has done a fantastic job in getting full API coverage.

---

# headlessui-svelte

Unofficial [Headless UI](https://headlessui.dev) Svelte components. Very much a work in progress, use with caution.

```
npm install @mattjennings/headlessui-svelte
```

## Usage

See [Components](#Components) for which are available.

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

## Caveats

### Event forwarding

Until the [on:\* syntax](https://github.com/sveltejs/svelte/issues/2837) is supported in Svelte, each internal component will need to explicitly forward every possible event so that they can be used. The scope of this package is small enough that I could do that, but it would be annoying.

One idea is to go the React-way and use [`on-*` props for event listeners](https://github.com/sveltejs/svelte/issues/2837#issuecomment-590605457). This would not be the ideal API, but it would work.

For now, components will at least emit the following events:

- `click`
- `focus`
- `blur`
- `keypress`
- `keydown`
- `keyup`

### Dynamic elements

Until [dynamic elements](https://github.com/sveltejs/svelte/issues/2324) are supported in Svelte, I'm using a modified internal version of [svelte-elements](https://github.com/timhall/svelte-elements) to support the `as` prop.

## SvelteKit

You might get the following error (or similar) when running in development with SvelteKit:

```
Cannot read property 'default' of null
```

This can be fixed by either restarting the dev server (for some reason it only happens the first time), or adding the library to `kit.vite.optimizeDeps.exclude` in svelte.config.js:

```js
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    vite: {
      optimizeDeps: {
        exclude: ['@mattjennings/headlessui-svelte']
      }
    }
  }
}
```

## Components

- [x] Switch
- [ ] Menu
- [ ] Listbox
- [ ] Disclosure
- [ ] Dialog
- [ ] Popover
- [ ] Radio Group
- [ ] Transition
