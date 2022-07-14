import { RefreshIcon } from '@heroicons/react/outline';
import { useNavigate } from '@remix-run/react';
import type { Comment, Tweet } from '@twitter-clone/shared';
import clsx from 'clsx';
import { TweetCardButtons } from './components/TweetCardButtons/TweetCardButtons';
import { TweetCardComments } from './components/TweetCardComments/TweetCardComments';
import { TweetCardContent } from './components/TweetCardContent';
import { TweetCardCounters } from './components/TweetCardCounters';
import { TweetCardImages } from './components/TweetCardImages';
import { TweetCardReply } from './components/TweetCardReply';
import { motion } from 'framer-motion';
import { useTweetReply } from './hooks/useTweetReply';

type TweetCardProps = {
  tweet: Tweet & { isRetweet?: boolean };
  comments?: Comment[];
  variant?: 'profile' | 'open' | 'home';
  idx?: number;
};

export function TweetCard({
  tweet: {
    id: tweetId,
    images,
    likeCount,
    commentCount,
    saveCount,
    retweetCount,
    isLiked,
    isSaved,
    isRetweeted,
    isRetweet,
    content,
    createdAt,
    author,
    avatarUrl,
  },
  variant,
  comments,
  idx,
}: TweetCardProps) {
  const navigate = useNavigate();
  const { replyRef, focusReply, clearReply } = useTweetReply();
  const isProfileTweets = variant === 'profile';
  const isTweetOpen = variant === 'open';
  const showRetweetedFlair = isProfileTweets && isRetweet;
  const isFirstCard = idx === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={clsx(!isFirstCard && 'mt-10')}
    >
      {showRetweetedFlair && (
        <div className="flex mb-2 font-extralight text-twitterBlue">
          <RefreshIcon className="w-6 h-6 mr-1" />
          <p>Retweeted</p>
        </div>
      )}

      <article
        onClick={() => (isTweetOpen ? null : navigate(`/tweet/${tweetId}`))}
        tabIndex={0}
        className={clsx(
          'bg-white shadow-sm cursor-pointer hover:bg-gray-400 p-7 rounded-2xl font-noto text-gray2',
          isTweetOpen && '!cursor-default',
        )}
      >
        <TweetCardContent
          content={content}
          author={author}
          createdAt={createdAt}
          avatarUrl={avatarUrl}
        />

        <TweetCardImages images={images} />

        {isTweetOpen && (
          <TweetCardCounters
            likeCount={likeCount}
            commentCount={commentCount}
            saveCount={saveCount}
            retweetCount={retweetCount}
          />
        )}

        <TweetCardButtons
          id={tweetId}
          isLiked={isLiked}
          isSaved={isSaved}
          isRetweeted={isRetweeted}
          likeCount={likeCount}
          commentCount={commentCount}
          saveCount={saveCount}
          retweetCount={retweetCount}
          isTweetOpen={isTweetOpen}
          focusReply={focusReply}
        />

        {isTweetOpen && (
          <>
            <TweetCardReply
              clearReply={clearReply}
              focusReply={focusReply}
              replyRef={replyRef}
              tweetId={tweetId}
            />

            <TweetCardComments tweetComments={comments} />
          </>
        )}
      </article>
    </motion.div>
  );
}
