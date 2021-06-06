<script>
  import LabelProvider from '../LabelProvider.svelte'
  import Label from '../Label.svelte'

</script>

<LabelProvider let:labelledby>
  <div aria-labelledby={labelledby}>
    <Label>I am a label</Label>
    <span>Contents</span>
    <Label>I am also a label</Label>
  </div>
</LabelProvider>
