# headlessui-svelte

Unofficial [Headless UI](https://headlessui.dev) Svelte components

## Caveats

- Until [dynamic elements](https://github.com/sveltejs/svelte/issues/2324) are officially supported by svelte, the `as` prop is not possible
  - currently looking into [svelte-elements](https://github.com/timhall/svelte-elements) as a temporary dependency

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

### Event forwarding

With React/Vue, events are handled via props and can be forwarded by passing the props along to the child component. In svelte, events have to be explicitly forwarded (pending https://github.com/sveltejs/svelte/issues/2837 if it ever gets merged).

It may have to mean that internal components manually forward each event type like so:

```svelte
<!-- SomeComponent.svelte -->

<div on:click on:mousedown on:mouseup ... />
```

but maybe there's a way to convert React/Vue-like `onXYZ` props to event listeners dynamically. Need to look into this.
