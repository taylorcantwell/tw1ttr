import type { Tweet } from '@twitter-clone/shared';
import { TweetCard } from './TweetCard';

type TweetListProps = {
  tweets: Tweet[];
  variant?: 'profile' | 'home';
};

export function TweetList({ tweets, variant = 'home' }: TweetListProps) {
  if (!tweets || tweets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full mt-10 text-twitterBlue">
        {message[variant]}
      </div>
    );
  }

  return (
    <>
      {tweets.map((tweet) => {
        const key = `${tweet.id}${tweet.isRetweet ? '-retweet' : ''}`;
        return (
          <TweetCard
            key={key}
            tweet={tweet}
            variant={variant}
          />
        );
      })}
    </>
  );
}

const message = {
  profile: "User hasn't posted or retweeted.",
  home: 'No tweets to display.',
};
