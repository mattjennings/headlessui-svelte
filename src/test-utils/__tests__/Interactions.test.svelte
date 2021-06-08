<script>
  import { onMount } from 'svelte'

  export let onClick
  export let onKeyDown
  export let onKeyUp
  export let onKeyPress
  export let onBlur
  export let onFocus

</script>

<button
  id="before"
  on:click={onClick}
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
  on:keypress={onKeyPress}
  on:blur={onBlur}
  on:focus={onFocus}>Before</button
>
<button
  id="trigger"
  on:click={onClick}
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
  on:keypress={onKeyPress}
  on:blur={onBlur}
  on:focus={onFocus}>Trigger</button
>
<button
  id="after"
  on:click={onClick}
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
  on:keypress={onKeyPress}
  on:blur={onBlur}
  on:focus={onFocus}>After</button
>
