<script>
  import { Switch } from '../index'

  export let checked = false

</script>

<Switch.Group>
  <Switch bind:checked on:change />
  <Switch.Label>The label</Switch.Label>
</Switch.Group>
