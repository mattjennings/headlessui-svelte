type AcceptNode = (
  node: HTMLElement
) =>
  | typeof NodeFilter.FILTER_ACCEPT
  | typeof NodeFilter.FILTER_SKIP
  | typeof NodeFilter.FILTER_REJECT

export function useTreeWalker({
  container,
  accept,
  walk,
  enabled = true
}: {
  container: HTMLElement
  accept: AcceptNode
  walk(node: HTMLElement): void
  enabled?: boolean
}) {
  return {
    update() {
      if (!container) return
      if (!enabled) return

      const acceptNode = Object.assign((node: HTMLElement) => accept(node), { acceptNode: accept })
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_ELEMENT,
        acceptNode,
        false
      )

      while (walker.nextNode()) walk(walker.currentNode as HTMLElement)
    }
  }
}
