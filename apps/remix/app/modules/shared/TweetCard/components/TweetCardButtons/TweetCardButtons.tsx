import { BookmarkIcon, ChatAltIcon, HeartIcon, RefreshIcon } from '@heroicons/react/outline';
import { useLocation, useNavigate } from '@remix-run/react';
import { TweetCardButton } from './components/TweetCardButton';
import { links } from '~/helpers';

type TweetCardButtonsProps = {
  id: number;
  isLiked: boolean;
  isSaved: boolean;
  isRetweeted: boolean;
  likeCount: number;
  commentCount: number;
  saveCount: number;
  retweetCount: number;
  isTweetOpen: boolean;
  focusReply: () => void;
};

export function TweetCardButtons({
  id,
  isLiked,
  isSaved,
  isRetweeted,
  likeCount,
  commentCount,
  saveCount,
  retweetCount,
  isTweetOpen,
  focusReply,
}: TweetCardButtonsProps) {
  const tweetId = id.toString();
  const navigator = useNavigate();
  const location = useLocation();
  const isTweetBeingViewed = location.pathname.includes(tweetId);

  return (
    <div className="py-1 border-t border-b border-grayHover text-gray">
      <div className="flex justify-between">
        <TweetCardButton
          focusReply={focusReply}
          Icon={ChatAltIcon}
          label={isTweetOpen ? null : commentCount}
          onClick={() => {
            if (isTweetBeingViewed) return;
            navigator(links.tweet(tweetId), { state: { commenting: true } });
          }}
        />
        <TweetCardButton
          tweetId={tweetId}
          actionType="retweet"
          label={isTweetOpen ? null : retweetCount}
          Icon={RefreshIcon}
          isPressed={isRetweeted}
        />
        <TweetCardButton
          tweetId={tweetId}
          actionType="like"
          label={isTweetOpen ? null : likeCount}
          Icon={HeartIcon}
          isPressed={isLiked}
        />
        <TweetCardButton
          tweetId={tweetId}
          actionType="save"
          label={isTweetOpen ? null : saveCount}
          Icon={BookmarkIcon}
          isPressed={isSaved}
        />
      </div>
    </div>
  );
}
