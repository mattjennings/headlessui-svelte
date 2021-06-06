<script>
  import DescriptionProvider from '../DescriptionProvider.svelte'
  import Description from '../Description.svelte'

</script>

<DescriptionProvider let:describedby>
  <div aria-describedby={describedby}>
    <Description>I am a description</Description>
    <span>Contents</span>
    <Description>I am also a description</Description>
  </div>
</DescriptionProvider>
