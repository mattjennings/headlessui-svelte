type Listener = () => void
type Listeners = Record<string, Listener>

export function subscribe(node: HTMLElement, listeners: Listeners) {
  let subscriptions = listen(node, listeners)

  return {
    update(listeners: Listeners) {
      unsubscribe(subscriptions)
      subscriptions = listen(node, listeners)
    },
    destroy() {
      unsubscribe(subscriptions)
    }
  }
}

function listen(node: HTMLElement, listeners: Listeners) {
  if (!listeners) return []

  return Object.keys(listeners).map((event) => {
    const handler = listeners[event]

    node.addEventListener(event, handler)
    return () => node.removeEventListener(event, handler)
  })
}

function unsubscribe(subscriptions: Listener[]) {
  return subscriptions.forEach((unsubscribe) => unsubscribe())
}
