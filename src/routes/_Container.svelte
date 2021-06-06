<script>
  export let title

</script>

<div>
  <h2 class="text-white font-medium text-3xl">{title}</h2>
  <div
    class="py-16 h-full flex justify-center items-center mt-2 w-80 min-h-40 bg-gradient-to-r from-green-400 to-cyan-500 rounded-3xl"
  >
    <slot />
  </div>
</div>
