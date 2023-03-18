export function autoResizeTextarea(ref: React.RefObject<HTMLTextAreaElement>) {
  if (ref.current === null) return;
  ref.current.style.height = 'auto';
  const scrollHeight = ref.current.scrollHeight;
  const lineHeight = parseInt(window.getComputedStyle(ref.current).lineHeight);
  ref.current.rows = Math.floor(scrollHeight / lineHeight);
}

