import { useCallback, useRef } from 'react';

export function useTweetReply() {
  const replyRef = useRef<HTMLInputElement>();

  const focusReply = useCallback(() => {
    if (replyRef.current) {
      replyRef.current.focus();
    }
  }, [replyRef]);

  const clearReply = useCallback(() => {
    if (replyRef.current) {
      replyRef.current.blur();
      replyRef.current.value = '';
    }
  }, [replyRef]);

  return { replyRef, focusReply, clearReply };
}
