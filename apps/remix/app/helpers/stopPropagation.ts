export function stopPropagation(event: Event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}
