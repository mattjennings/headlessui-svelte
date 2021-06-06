<script>
  import LabelProvider from '$lib/components/label/LabelProvider.svelte'
  import Label from '$lib/components/label/Label.svelte'

</script>

<LabelProvider let:labelledby>
  <div aria-labelledby={labelledby}>
    <Label>I am a label</Label>
    <span>Contents</span>
  </div>
</LabelProvider>
