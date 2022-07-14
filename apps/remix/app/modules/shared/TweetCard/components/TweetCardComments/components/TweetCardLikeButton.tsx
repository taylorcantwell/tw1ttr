import { HeartIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useFetcher } from '@remix-run/react';
import { useAuthGuard } from '~/hooks';

export default function TweetCardLikeButton({
  likeCount,
  commentId,
  isLiked,
}: {
  likeCount: number;
  commentId: number;
  isLiked: boolean;
}) {
  const fetcher = useFetcher();
  const authGuard = useAuthGuard();
  const isFetching = fetcher.state !== 'idle';

  return (
    <div className="flex items-center gap-2 mt-1 text-sm transition-colors text-gray4">
      <button
        disabled={isFetching}
        onClick={() => {
          const user = authGuard();

          if (!user) {
            return null;
          }

          fetcher.submit(
            { commentId: commentId.toString(), actionType: 'likeComment' },
            { method: 'post' },
          );
        }}
        className={clsx({ 'opacity-50': isFetching }, 'flex items-center w-16 hover:text-gray3')}
      >
        <HeartIcon
          className={clsx('inline w-5 h-5 mr-1', {
            'text-red-400': isLiked,
          })}
        />
        <span>{isLiked ? 'Liked' : 'Like'}</span>
      </button>
      <span className="w-16">{likeCount} Likes</span>
    </div>
  );
}
