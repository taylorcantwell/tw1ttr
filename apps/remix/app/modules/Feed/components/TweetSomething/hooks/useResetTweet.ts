import type { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';

type Fetcher = ReturnType<typeof useFetcher>;

export function useResetTweet(fetcher: Fetcher, clearContent: () => void, clearImages: () => void) {
  const submittedTweet = fetcher.type === 'done';
  const tweetContentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (submittedTweet) {
      tweetContentRef.current!.blur();
      clearContent();
      clearImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedTweet]);

  return tweetContentRef;
}
