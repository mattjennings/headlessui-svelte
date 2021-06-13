<script>
  import { RadioGroup } from '$lib/index'

  const plans = [
    {
      name: 'Hobby',
      ram: '8GB',
      cpus: '4 CPUs',
      disk: '160 GB SSD disk',
      price: '$40'
    },
    {
      name: 'Startup',
      ram: '12GB',
      cpus: '6 CPUs',
      disk: '256 GB SSD disk',
      price: '$80'
    },
    {
      name: 'Business',
      ram: '16GB',
      cpus: '8 CPUs',
      disk: '512 GB SSD disk',
      price: '$160'
    },
    {
      name: 'Enterprise',
      ram: '32GB',
      cpus: '12 CPUs',
      disk: '1024 GB SSD disk',
      price: '$240'
    }
  ]

  let plan = plans[0]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

</script>

<!-- <RadioGroup bind:value={plan}>
  <RadioGroup.Label>Plan</RadioGroup.Label>
  <RadioGroup.Option value="startup" let:checked>
    <span class={checked ? 'bg-blue-200' : ''}>Startup</span>
  </RadioGroup.Option>
  <RadioGroup.Option value="business" let:checked>
    <span class={checked ? 'bg-blue-200' : ''}>Business</span>
  </RadioGroup.Option>
  <RadioGroup.Option value="enterprise" let:checked>
    <span class={checked ? 'bg-blue-200' : ''}>Enterprise</span>
  </RadioGroup.Option>
</RadioGroup> -->

<RadioGroup bind:value={plan}>
  <RadioGroup.Label class="sr-only">Server size</RadioGroup.Label>
  <div class="space-y-4">
    {#each plans as plan}
      <RadioGroup.Option
        let:checked
        key={plan.name}
        value={plan}
        class={({ active }) =>
          classNames(
            active ? 'ring-1 ring-offset-2 ring-indigo-500' : '',
            'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
          )}
      >
        <div class="flex items-center">
          <div class="text-sm">
            <RadioGroup.Label as="p" class="font-medium text-gray-900">
              {plan.name}
            </RadioGroup.Label>
            <RadioGroup.Description as="div" class="text-gray-500">
              <p class="sm:inline">
                {plan.ram} / {plan.cpus}
              </p>
              {' '}
              <span class="hidden sm:inline sm:mx-1" aria-hidden="true"> &middot; </span>{' '}
              <p class="sm:inline">{plan.disk}</p>
            </RadioGroup.Description>
          </div>
        </div>
        <RadioGroup.Description
          as="div"
          class="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
        >
          <div class="font-medium text-gray-900">{plan.price}</div>
          <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
        </RadioGroup.Description>
        <div
          class={classNames(
            checked ? 'border-indigo-500' : 'border-transparent',
            'absolute -inset-px rounded-lg border-2 pointer-events-none'
          )}
          aria-hidden="true"
        />
      </RadioGroup.Option>
    {/each}
  </div>
</RadioGroup>
