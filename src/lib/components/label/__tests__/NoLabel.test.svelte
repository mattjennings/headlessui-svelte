<script>
  import LabelProvider from '../LabelProvider.svelte'

</script>

<LabelProvider let:labelledby>
  <div aria-labelledby={labelledby}>No Label</div>
</LabelProvider>
