import type { TweetImage } from '@twitter-clone/shared';

export function TweetCardImages({ images }: { images?: TweetImage[] | [] }) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 mb-5 max-h-64 max-w-64">
      {images.map(({ tweetId, url }) => {
        return (
          <div
            className="w-40 h-40"
            key={tweetId}
          >
            <img
              alt="tweet images"
              key={tweetId}
              src={url}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        );
      })}
    </div>
  );
}
