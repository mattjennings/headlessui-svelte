# headlessui-svelte

Unofficial [Headless UI](https://headlessui.dev) Svelte components. Very much a work in progress, use with caution.

```
npm install @mattjennings/headlessui-svelte
```

## Caveats

### Dynamic elements

Until [dynamic elements](https://github.com/sveltejs/svelte/issues/2324) are officially supported by svelte, I'm using [svelte-elements](https://github.com/timhall/svelte-elements) as a temporary dependency for the `as` prop.

### Event forwarding

With React/Vue, events are handled via props and can be forwarded by passing the props along to the child component. In svelte, events have to be explicitly forwarded (pending https://github.com/sveltejs/svelte/issues/2837).

It may have to mean that internal components manually forward each event type like so:

```svelte
<!-- Switch.svelte -->

<button {...props} on:click on:mousedown on:mouseup ... />
```

but perhaps there's a way to convert React/Vue-like `onXYZ` props to event listeners dynamically and workaround this. It's not the Svelte way, but manually typing all events on every component is not ideal.

### Typescript

- Typescript support is partial right now. While headlessui-specific props will be typed, they won't have types for inherited HTML attributes or events. I would like to use an existing types package to do those, but I haven't found one for Svelte yet.

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
