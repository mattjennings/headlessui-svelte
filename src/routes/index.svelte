<script>
  import { Switch, RadioGroup } from '$lib/index'
  import Container from './_Container.svelte'

  let switchEnabled = true

  let plan = 'startup'

</script>

<h1 class="text-5xl text-white font-medium">Switch</h1>
<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-4">
  <Container title="Basic">
    <Switch
      as="button"
      bind:checked={switchEnabled}
      class={`${switchEnabled ? 'bg-teal-900' : 'bg-teal-700'}
      relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        class={`${switchEnabled ? 'translate-x-9' : 'translate-x-0'}
        pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  </Container>
  <Container title="Group">
    <Switch.Group>
      <div class="flex items-center">
        <Switch.Label class="mr-4">Enable notifications</Switch.Label>
        <Switch
          bind:checked={switchEnabled}
          class={`${
            switchEnabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            class={`${
              switchEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  </Container>
</div>

<h1 class="text-5xl text-white font-medium">RadioGroup</h1>
<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-4">
  <Container title="Basic">
    <RadioGroup bind:value={plan}>
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Option value="startup" let:checked>
        <span className={checked ? 'bg-blue-200' : ''}>Startup</span>
      </RadioGroup.Option>
      <RadioGroup.Option value="business" let:checked>
        <span className={checked ? 'bg-blue-200' : ''}>Business</span>
      </RadioGroup.Option>
      <RadioGroup.Option value="enterprise" let:checked>
        <span className={checked ? 'bg-blue-200' : ''}>Enterprise</span>
      </RadioGroup.Option>
    </RadioGroup>
  </Container>
</div>
