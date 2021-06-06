<script>
  import { Switch } from '$lib/index'
  import Container from './_Container.svelte'

  let enabled = true

</script>

<h1 class="text-5xl text-white font-medium">Switch</h1>
<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-4">
  <Container title="Basic">
    <div class="py-16">
      <Switch
        bind:checked={enabled}
        class={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
      relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          class={`${enabled ? 'translate-x-9' : 'translate-x-0'}
        pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  </Container>
</div>
