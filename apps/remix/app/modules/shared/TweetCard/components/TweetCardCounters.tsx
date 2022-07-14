import { Link } from '@remix-run/react';
import { links } from '~/helpers';

type TweetCardCountersProps = {
  likeCount: number;
  commentCount: number;
  saveCount: number;
  retweetCount: number;
};

export function TweetCardCounters({
  saveCount,
  likeCount,
  retweetCount,
  commentCount,
}: TweetCardCountersProps) {
  const counters = [
    {
      count: retweetCount,
      label: 'Retweets',
      url: links.dialogs.retweets,
    },
    { count: likeCount, label: 'Likes', url: links.dialogs.likes },
    { count: saveCount, label: 'Saves', url: links.dialogs.saves },
  ];

  return (
    <div className="flex justify-end pt-5 pb-2 text-xs md:text-base text-gray4">
      <div className="mr-4">
        <span className="mr-2">{commentCount}</span>
        <span>Comments</span>
      </div>
      {counters.map(({ count, label, url }) => {
        return (
          <Link
            state={{ disableScroll: true }}
            to={url}
            replace={true}
            key={label}
            className="mr-4 transition hover:text-gray3"
          >
            <span className="mr-2">{count}</span>
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
