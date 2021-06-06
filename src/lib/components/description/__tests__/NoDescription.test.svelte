<script>
  import DescriptionProvider from '../DescriptionProvider.svelte'

</script>

<DescriptionProvider let:describedby>
  <div aria-describedby={describedby}>No Description</div>
</DescriptionProvider>
